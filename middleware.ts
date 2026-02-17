import { NextResponse } from "next/server";

// Middleware desactivado temporalmente para evitar ejecutar NextAuth + Prisma en el runtime Edge
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
