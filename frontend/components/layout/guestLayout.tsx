import { useSession } from "@/lib/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
export function GuestLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const session = async () => {
      const { isAuth } = await useSession();
      if (isAuth) {
        router.push("/");
      }
    };
    session();
  }, []);
  return <>{children}</>;
}
