// import NextAuth from "next-auth"
// import { options } from '../../../../../lib/auth/options';
//
// const handler = NextAuth(options)
//
// export { handler as GET, handler as POST }
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({});
}

