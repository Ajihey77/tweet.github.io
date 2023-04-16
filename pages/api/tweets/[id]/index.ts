import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/db";
import { withApiSession } from "../../../../lib/withSession";
import withHandler, { ResponseType } from "../../../../lib/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
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
  const isLiked = Boolean(
    await db.like.findFirst({
      where: {
        tweetId: +id.toString(),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  console.log(tweet);
  res.json({ ok: true, tweet, isLiked });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);