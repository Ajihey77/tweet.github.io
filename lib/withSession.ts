import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "tweetsession",
  password: "ThisShouldBeAVeryLongText1111111!!!"
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}