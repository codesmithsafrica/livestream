import { createStreamerToken } from "@/app/actions";
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  token: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
      const room = req.query.room as string;
  // const username = req.query.username as string;
  const token = await createStreamerToken(room);
  res.status(200).json({ token:token })
}


