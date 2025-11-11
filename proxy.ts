import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkUserAuthBySession, logOutUserByAxios } from './utils/services/customer-services/customer-services';
import { checkAdminAuthBySession, logOutAdminByAxios } from './utils/services/admin-services/admin-services';

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();
  const userSessionId = cookieStore.get('userSessionId');
  const adminSessionId = cookieStore.get('adminSessionId');

  const { pathname } = req.nextUrl;

  const exceptionUserRoutes = ['/user/log-in', '/user/sign-in'];
  const exceptionAdminRoutes = ['/admin/log-in', '/admin/sign-in'];

  const isUserRoute = pathname.startsWith('/user');
  const isAdminRoute = pathname.startsWith('/admin');

  const isUserException = exceptionUserRoutes.includes(pathname);
  const isAdminException = exceptionAdminRoutes.includes(pathname);

  const isUserLogout = pathname == '/user/log-out';
  const isAdminLogout = pathname == '/admin/log-out';

  if (isUserRoute) {
    if (isUserLogout && userSessionId) {
      const userSession = await checkUserAuthBySession(userSessionId.value);
      if (userSession?.status == 200 || userSession != 'not-authorized') {
        await logOutUserByAxios(userSession.userId);
        cookieStore.delete('userSessionId');
        cookieStore.delete('userId');
      }
      // const loginUrl = new URL('/user/log-in', req.url);
      // return NextResponse.redirect(loginUrl);
    }

    if (!userSessionId && !isUserException) {
      const loginUrl = new URL('/user/log-in', req.url);
      // return NextResponse.redirect(loginUrl);
    }

    if (userSessionId) {
      const userSession = await checkUserAuthBySession(userSessionId.value);
      if (userSession?.status == 200 && isUserException) {
        const homeUrl = new URL('/user/home', req.url);
        // return NextResponse.redirect(homeUrl);
      }
      if (userSession?.status == 401 && !isUserException) {
        const loginUrl = new URL('/user/log-in', req.url);
        // return NextResponse.redirect(loginUrl);
      }
    }
  }

  if (isAdminRoute) {
    if (isAdminLogout && adminSessionId) {
      const adminSession = await checkAdminAuthBySession(adminSessionId.value);
      if (adminSession?.status == 200 || adminSession != 'not-authorized') {
        await logOutAdminByAxios(adminSession.userId);
        cookieStore.delete('adminSessionId');
        cookieStore.delete('adminId');
      }
      // const loginUrl = new URL('/admin/log-in', req.url);
      // return NextResponse.redirect(loginUrl);
    }

    if (!adminSessionId && !isAdminException) {
      const loginUrl = new URL('/admin/log-in', req.url);
      // return NextResponse.redirect(loginUrl);
    }

    if (adminSessionId) {
      const adminSession = await checkAdminAuthBySession(adminSessionId.value);
      if (adminSession?.status == 200 && isAdminException) {
        const dashboardUrl = new URL('/admin/dashboard', req.url);
        // return NextResponse.redirect(dashboardUrl);
      }
      if (adminSession?.status == 401 && !isAdminException) {
        const loginUrl = new URL('/admin/log-in', req.url);
        // return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}
