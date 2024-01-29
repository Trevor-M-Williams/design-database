import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Get" });
}

export async function POST(request: Request) {
  console.log(request);
  try {
    const res = await request.json();
    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
