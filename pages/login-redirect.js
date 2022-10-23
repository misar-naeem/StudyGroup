import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginRedirect() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session != null) {
    if (session.user.role === "staff") {
      router.push("/admin-dashboard");
    } else {
      router.push("/student-dashboard");
    }
  }
}
