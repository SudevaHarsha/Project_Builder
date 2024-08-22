import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/site','/agency/sign-in','/api/uploadthing']);

export default clerkMiddleware((auth, req) => {
  console.log('Request URL:', req.nextUrl.pathname);
  console.log('Is Public Route:', isPublicRoute(req));

  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers.get('host');

  console.log('Hostname:', hostname);

    const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

    console.log('Path with Search Params:', pathWithSearchParams);

    const hostnameParts = hostname?.split('.');
    hostnameParts?.pop();
    const customSubDomain = hostnameParts?.join('.');
   /*  if (hostnameParts) {
      hostnameParts.pop();
      customSubDomain = hostnameParts?.join('.');
    } */

    console.log('Custom Subdomain:', customSubDomain, hostnameParts);

    if (customSubDomain) {
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
      );
    }

  if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
    return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
  }

  
  if (url.pathname === '/' || (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)) {
    console.log('Navigated to /site');
    return NextResponse.rewrite(new URL('/site', req.url));
  }

  if (!isPublicRoute(req)) {
    // Check if user is authenticated
    const authStatus = auth().protect();
    console.log('Auth Status:', authStatus);

    if (url.pathname.startsWith('/agency') || url.pathname.startsWith('/subaccount')) {
      return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
