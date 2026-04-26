import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import type { Database } from "@/types/database";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            void options;
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/dashboard") ||
      (request.nextUrl.pathname.startsWith("/admin") &&
        request.nextUrl.pathname !== "/admin"))
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = request.nextUrl.pathname.startsWith("/admin")
      ? "/admin"
      : "/login";
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);

    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};
