import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  for (const key in request.headers.keys()) {
    console.log(`${key}: ${request.headers.get(key)}`);
  }
  return NextResponse.next()
  
}
