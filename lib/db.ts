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
