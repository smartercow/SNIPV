import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/clientApp";

export default function Middleware() {
/*     const [user] = useAuthState(auth)
  const { pathname } = useRouter();
  const router = useRouter();

  const ProtectedRoutes = ["/snips", "/folders"];

  if (!user && ProtectedRoutes.includes(pathname)) {
    router.push("/");
  } */
}
