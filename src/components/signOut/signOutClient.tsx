import { SubmitButton } from "@/components/submitButton"
import { signOut } from "next-auth/react"
 
export function SignOutClient() {
  return (
      <SubmitButton text="Login" onClick={() => signOut()} />
  )
}