
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
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
