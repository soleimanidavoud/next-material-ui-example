import { useRouter } from "next/router";
import { useEffect } from "react";

export const Index = (_) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/messages");
  }, []);

  return <></>;
};
