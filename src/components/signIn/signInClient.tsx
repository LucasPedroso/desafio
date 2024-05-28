import { SubmitButton } from "@/components/submitButton"
import { signIn } from "next-auth/react"
 
export function SignInClient() {
  return (
      <SubmitButton text="Login" onClick={() => signIn("credentials", { redirectTo: "/profissional" })} />
  )
}