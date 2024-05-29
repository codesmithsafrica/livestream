import { createStreamerToken } from "@/app/actions";
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/lib/db";

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const room = req.query.room as string;
  const username = req.query.username as string;
  // find stream
  const stream = await db.livetream.findFirst({
    where: {
      title: room,
      streamer: username

    },
  })
  // const deleteStream = await db.livetream.delete({
  //   where: {
  //     id: stream?.id,
  //   },
  // })
  console.log('livestream', stream)
  res.status(200).json({ message: 'delete' })

}



