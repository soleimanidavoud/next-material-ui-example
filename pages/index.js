import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = (_) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/messages");
  }, []);

  return <></>;
};
export default Index;
