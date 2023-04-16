import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
        const tweets = await db.tweet.findMany({});
        res.json({
          ok: true,
          tweets,
        });
        console.log(tweets)
  }

  if (req.method === "POST") {
    const {
      body: {text },
      session: { user },
    } = req;
    await db.tweet.create({
      data: {
        text,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.status(201).end();
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);