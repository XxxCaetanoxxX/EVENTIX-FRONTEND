import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, await context.params);
}

export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, await context.params);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, await context.params);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, await context.params);
}

async function handleProxy(req: NextRequest, params: { path: string[] }) {
  const path = params.path.join("/");
  const url = `${BASE_URL}/${path}`;
  const token = (await cookies()).get("accessToken")?.value;

  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    if (!["host", "cookie"].includes(key.toLowerCase())) {
      headers[key] = value;
    }
  });

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const init: RequestInit = {
    method: req.method,
    headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    const body = await req.text();
    init.body = body;
  }

  const response = await fetch(url, init);
  const data = await response.text();

  return new NextResponse(data, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") || "application/json",
    },
  });
}
