import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/withSession";
import db from "../../../lib/db";
import { ResponseType } from "../../../lib/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user }
  } = req;

  // req값 없으면
  if (!user?.id) {
    res.json({
      ok: false,
      error: "Email already taken.",
    });
  }

  // 유저 아이디 찾기
  const dbUser = await db.user.findUnique({
    where: {
      id: user?.id
    }
  });

  // 아이디 없으면 404
  if (!dbUser) {
    res.json({
      ok: false,
      error: "Email already taken.",
    });
  }
  res.json({
    ok: true,
    profile: dbUser
  });
}

export default withApiSession(handler);