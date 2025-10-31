import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a mock credit score fetch
  const score = Math.floor(650 + Math.random() * 150); // 650-800
  const eligible = score >= 700;
  return NextResponse.json({ score, eligible }, { status: 200 });
}


