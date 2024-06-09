import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    request.headers.forEach((value, key) => {
        console.log(key, value);
        
    })
  return NextResponse.next()
  
}
