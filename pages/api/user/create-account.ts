import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
  ) {
    if (req.method === "POST"){
      const { email, username } = req.body;

      const user = await db.user.findUnique({
        where: {
          email
        }
      });

      if (user){
        return res.status(200).end();
      }

      await db.user.create({
        data: {
          username,
          email
        }
      });
      return res.status(201).end();
    }
    return res.status(405).end();
}
