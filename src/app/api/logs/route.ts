export const dynamic = "force-dynamic";

import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  console.log(`[${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata",})}]: making db call to fetch logs`);
  
  const logs = await sql`
  SELECT "id", "timestamp", "logItem"
  FROM experiments.logs
  ORDER BY "timestamp" DESC
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
