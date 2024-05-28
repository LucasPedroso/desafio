import { signOut } from "@/auth"
import { SubmitButton } from "../submitButton.js"
 
export function SignOutServer() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <SubmitButton text="Login" />
    </form>
  )
}