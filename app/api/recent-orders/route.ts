import { NextResponse } from "next/server";
import { getRecentOrders } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const orders = await getRecentOrders(10);
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error obteniendo compras recientes:", error);
    return NextResponse.json({ orders: [] });
  }
}
