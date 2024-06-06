import { createStreamerToken } from "@/app/actions";
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/lib/db";
 
type ResponseData = {
  token: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const room = req.query.room as string;
  const username = req.query.username as string;
  const url = req.query.url as string;
  const token = await createStreamerToken(room,username,url);

  const livestream = await db.livetream.create({
    data: {
      title:room,
      streamer:username,
      url:url,
    },
  });
  res.status(200).json({ token:token })

}



