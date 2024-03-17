import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const livestream = await db.livetream.findMany({
        select: {
          id: true,
          title: true,
          streamer: true,

          createdAt: true,
        },
      });

      return res.status(200).json({ livestream: livestream });
    } catch (error) {
      return res.status(500).end();
    }
  }
}
