// import { NextApiRequest, NextApiResponse } from "next"

import { _createViewerToken } from "@/app/actions";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     return res.status(500).end()
//   }
//   const room = req.query.room as string;
//   const username = req.query.username as string;
//   const token = await createViewerToken(room,username);
//    console.log('watch token',token)
//  return  res.status(200).json({ token: token })

// }

import type { NextApiRequest, NextApiResponse } from 'next'
 
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
  const token = await _createViewerToken(room,username,url);
  return res.status(200).json({ token:token })

}
