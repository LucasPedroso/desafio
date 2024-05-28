import { auth } from "@/auth";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';

export default auth((req) => {
 const { nextUrl } = req;

 // Posso criar regras para permitir ou redirecionar de acordo com a role do usuário
 const role = req.auth?.user?.role;

 const isAuthenticated = !!req.auth;
 const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

 if (!isAuthenticated && nextUrl.pathname !== '/login' ) return Response.redirect(new URL('/login', nextUrl));

 if (isPublicRoute && isAuthenticated)
  return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

 if (!isAuthenticated && !isPublicRoute)
  return Response.redirect(new URL(ROOT, nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}