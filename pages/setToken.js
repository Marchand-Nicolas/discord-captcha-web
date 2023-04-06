import { useRouter } from "next/router";
import { setCookie } from "../utils/cookies";

export default function SetToken() {
  const router = useRouter();
  const token = router.query.token;
  if (token) {
    setCookie("token", token, 3600);
    router.push("/");
  }
  return <></>;
}
