import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(
  request: NextRequest
) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value }) => {
              request.cookies.set(
                name,
                value
              );
            }
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(
            ({ name, value, options }) => {
              response.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  const {
    data: claimsData,
  } = await supabase.auth.getClaims();

  const claims = claimsData?.claims;

  const pathname = request.nextUrl.pathname;

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  const isLoginRoute =
    pathname === "/login";

  if (isAdminRoute && !isLoginRoute) {
    if (!claims) {
      const loginUrl = request.nextUrl.clone();

      loginUrl.pathname = "/login";
      loginUrl.searchParams.set(
        "next",
        pathname
      );

      return NextResponse.redirect(
        loginUrl
      );
    }

    const adminEmails =
      process.env.ADMIN_EMAILS
        ?.split(",")
        .map((email) =>
          email.trim().toLowerCase()
        )
        .filter(Boolean) ?? [];

    const userEmail =
      typeof claims.email === "string"
        ? claims.email.toLowerCase()
        : "";

    if (
      adminEmails.length === 0 ||
      !adminEmails.includes(userEmail)
    ) {
      const forbiddenUrl =
        request.nextUrl.clone();

      forbiddenUrl.pathname =
        "/forbidden";

      return NextResponse.redirect(
        forbiddenUrl
      );
    }
  }

  response.headers.set(
    "Cache-Control",
    "private, no-store"
  );

  return response;
}
