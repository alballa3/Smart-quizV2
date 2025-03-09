import { useSession } from "@/lib/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
export function AuthLayout({ childen }: { childen: React.PropsWithChildren }) {
  const router = useRouter();
  useEffect(() => {
    const session = async () => {
      const { isAuth } = await useSession();
      if (!isAuth) {
        router.push("/auth/login");
      }
    };
    session();
  }, []);
  return <>{childen}</>;
}
