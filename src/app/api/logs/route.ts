export const dynamic = "force-dynamic";

import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  console.log(`[${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata",})}]: making db call to fetch logs`);
  
  const logs = await sql`
  SELECT "id", "created_at", "log_item"
  FROM cursed.webhook_logs
  ORDER BY "created_at" DESC
`;

  return NextResponse.json(logs);
}

export async function DELETE(req: Request) {
  const id = (await req.json()).id;

  await sql`
    DELETE FROM experiments.logs WHERE id = ${id}
  `;

  return NextResponse.json({ success: true });
}
