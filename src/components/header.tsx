import { auth, signOut } from "@/auth";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { SubmitButton } from "./submitButton";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirectTo: "/login",
        });
      }}
    >
      <SubmitButton text="Sign Out" variant="contained" />
    </form>
  );
}

export const Header = async () => {
  const session = await auth();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" className="flex-grow">
          <Link href="/" className="text-decoration-none">
            Inicio
          </Link>
        </Typography>
        <Typography variant="h6" component="div" className="flex-grow">
          <Link href="/profissional" className="text-decoration-none">
            Profissionais
          </Link>
        </Typography>
        <Typography variant="h6" component="div" className="flex-grow">
          <Link href="/account" className="text-decoration-none">
            Account
          </Link>
        </Typography>
        {session?.user ? (
          <Typography variant="h6" component="div" className="flex-grow">
            {session.user.name && session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={32}
                height={32}
              />
            )}
            <SignOut />
          </Typography>
        ) : (

          <Link href="/api/auth/signin">
            <SubmitButton text="Sign In" variant='contained' color="secondary" />
          </Link>
        )}
      </Toolbar>
    </AppBar>
    // <nav>
    //   <div>
    //     <Link href="/">
    //       <h1>Home</h1>
    //     </Link>
    //     <div>
    //       {session?.user ? (
    //         <div>
    //           {session.user.name && session.user.image && (
    //             <Image
    //               src={session.user.image}
    //               alt={session.user.name}
    //               width={32}
    //               height={32}
    //             />
    //           )}
    //           <SignOut />
    //         </div>
    //       ) : (
    //         <Link href="/api/auth/signin">
    //           <SubmitButton text="Sign In" />
    //         </Link>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
};

{
  /* <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" className="flex-grow">
          <Link href="/" className="text-decoration-none">
            Inicio
          </Link>
        </Typography>
        <Typography variant="h6" component="div" className="flex-grow">
          
          <Link href="/profissional" className="text-decoration-none">
            Profissionais
          </Link>
        </Typography>
        <Typography variant="h6" component="div" className="flex-grow">
          <Link href="/account" className="text-decoration-none">
            Account
          </Link>
        </Typography>
      </Toolbar>
    </AppBar> */
}
