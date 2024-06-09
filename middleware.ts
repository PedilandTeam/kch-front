import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    let string = ''
    request.headers.forEach((value, key) => {
        string += `${key}: ${value}\n`
    })
  return NextResponse.next()
  
}
