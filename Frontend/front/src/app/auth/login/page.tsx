"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import login from "./login";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(login, { message: "" });

  return (
    <form action={formAction}>
      <h1>Login</h1>
      <input type="email" name="email" placeholder="Email" required />
      <br />
      <input type="password" name="password" placeholder="Password" required />
      <br />
      <button type="submit">Login</button>
      <p>{state?.message}</p>
    </form>
  );
}
