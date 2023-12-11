import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      console.log("pathname: ", nextUrl.pathname)
      console.log("logged in: ", isLoggedIn, "onDashboard: ", isOnDashboard);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log('redirecting');
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  }
} satisfies NextAuthConfig;