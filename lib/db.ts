import { neon } from "@neondatabase/serverless";

export interface Order {
  payment_id: string;
  email: string;
  product_type: string;
  amount: number;
  status: string;
  payer_name: string | null;
  created_at: string;
}

export interface RecentOrder {
  displayName: string;
  product_type: string;
  created_at: string;
}

function getSql() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL no está configurada.");
  }
  return neon(connectionString);
}

async function ensureOrdersTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      payment_id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      product_type TEXT NOT NULL,
      amount NUMERIC NOT NULL,
      status TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await sql`
    ALTER TABLE orders ADD COLUMN IF NOT EXISTS payer_name TEXT;
  `;
}

export async function getOrderByPaymentId(
  paymentId: string
): Promise<Order | null> {
  const sql = getSql();
  await ensureOrdersTable();
  const rows = (await sql`
    SELECT * FROM orders WHERE payment_id = ${paymentId};
  `) as unknown as Order[];
  return rows[0] ?? null;
}

export async function createOrder(order: {
  paymentId: string;
  email: string;
  productType: string;
  amount: number;
  status: string;
  payerName?: string | null;
}): Promise<void> {
  const sql = getSql();
  await ensureOrdersTable();
  await sql`
    INSERT INTO orders (payment_id, email, product_type, amount, status, payer_name)
    VALUES (${order.paymentId}, ${order.email}, ${order.productType}, ${order.amount}, ${order.status}, ${order.payerName ?? null})
    ON CONFLICT (payment_id) DO NOTHING;
  `;
}

// Solo expone nombre + inicial (nunca el email) para uso público en el
// widget de compras recientes. Devuelve [] si no hay compras reales todavía
// — nunca hay que rellenar esto con datos inventados.
export async function getRecentOrders(limit = 10): Promise<RecentOrder[]> {
  const sql = getSql();
  await ensureOrdersTable();
  const rows = (await sql`
    SELECT payer_name, email, product_type, created_at
    FROM orders
    WHERE status = 'approved'
      AND created_at > now() - interval '7 days'
    ORDER BY created_at DESC
    LIMIT ${limit};
  `) as unknown as Array<{
    payer_name: string | null;
    email: string;
    product_type: string;
    created_at: string;
  }>;

  return rows.map((row) => {
    const name = row.payer_name?.trim();
    let displayName = "Alguien";
    if (name) {
      const parts = name.split(/\s+/);
      const first = parts[0];
      const lastInitial = parts[1] ? `${parts[1][0]}.` : "";
      displayName = [first, lastInitial].filter(Boolean).join(" ");
    }
    return {
      displayName,
      product_type: row.product_type,
      created_at: row.created_at,
    };
  });
}
