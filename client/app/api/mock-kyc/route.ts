import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // In a real app, you'd parse FormData. Here we just simulate success.
  await new Promise((r) => setTimeout(r, 700));
  return NextResponse.json({ verified: true, message: 'KYC verified successfully' }, { status: 200 });
}


