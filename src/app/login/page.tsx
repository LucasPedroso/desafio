import { SignInForm } from "@/components/signInForm";

export default async function Login() {
  // const session = await auth();
  return (
    <main className="fixed h-[100vmax] w-[100vmax] top-0 left-0 bg-gray-100">
      <SignInForm /> 
    </main>
  );
}
