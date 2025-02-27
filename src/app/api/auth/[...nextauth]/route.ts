// any route that comes to the /api/auth that will be handled by the nextAuth including google callbacks and google redirects

import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
