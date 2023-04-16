import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const tweet = await db.tweet.findMany({
    where: {
      userId: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true
        },
      },
    },
  });
  console.log(tweet);
  res.json({ ok: true, tweet });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);