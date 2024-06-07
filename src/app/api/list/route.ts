import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function GET(request: Request) {
//   return new Response(`Hello from`);
try {
    const livestream = await db.livetream.findMany({
      select: {
        id: true,
        title: true,
        streamer: true,
        url:true,
        createdAt: true,
      },
    });

    return  NextResponse.json({ livestream: livestream });
  } catch (error) {
    return new Response(`error`);
  }
}