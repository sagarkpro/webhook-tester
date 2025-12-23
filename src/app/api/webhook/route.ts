import sql from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

function formDataToJson(formData: FormData) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      obj[key] = {
        name: value.name,
        type: value.type,
        size: value.size,
      };
    } else {
      obj[key] = value;
    }
  }

  return obj;
}

async function parseBody(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      console.log("parsing application/json body");
      return await req.json();
    }

    if (contentType.includes("multipart/form-data")) {
      console.log("parsing multipart/form-data body");
      const formData = await req.formData();
      return formDataToJson(formData);
    }

    if (contentType.includes("application/x-www-form-urlencoded")) {
      console.log("parsing application/x-www-form-urlencoded body");
      const text = await req.text();
      return Object.fromEntries(new URLSearchParams(text));
    }

    // fallback (raw text)
    const text = await req.text();
    return text ? { raw: text } : null;
  } catch {
    return { error: "Failed to parse body" };
  }
}

async function handleWebhook(req: Request) {
  const h = await headers();
  const body = await parseBody(req);

  const logItem = {
    timestamp: new Date().toISOString(),
    method: req.method,
    body: await parseBody(req),
    url: req.url,
    ip:
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      h.get("x-real-ip") ||
      "unknown",
    headers: Object.fromEntries(req.headers.entries()),
  };

  const [log] = await sql`
    INSERT INTO experiments.logs ("logItem")
    VALUES (${sql.json(logItem)})
    RETURNING *
  `;

  if (body?.challenge) {
    return NextResponse.json({ challenge: body.challenge }, { status: 200 })
  }

  return NextResponse.json(log, { status: 201 });
}

export async function POST(req: Request) {
  return await handleWebhook(req);
}

export async function PUT(req: Request) {
  return await handleWebhook(req);
}

export async function PATCH(req: Request) {
  return await handleWebhook(req);
}

export async function DELETE(req: Request) {
  return await handleWebhook(req);
}

export async function GET(req: Request) {
  return await handleWebhook(req);
}