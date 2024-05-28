import { signIn } from "@/auth"
import { SubmitButton } from "@/components/submitButton"
 
export function SignInServer() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("credentials", { redirectTo: "/profissional" })
      }}
    >
      <SubmitButton text="Login" />
    </form>
  )
}