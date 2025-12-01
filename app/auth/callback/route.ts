import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const url = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/admin";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/admin";
  }

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // check if is admin
      const isAdmin =
        data.user?.user_metadata?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

      // if the signed-in user is not the configured admin, delete the created user and bail out
      if (!isAdmin) {
        try {
          const admin = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          );
          // use the admin auth API to remove the user that was just created by the OAuth flow
          // this requires the service role key
          await admin.auth.admin.deleteUser(data.user.id);
        } catch (e) {
          // swallow errors — deletion is best-effort here
        } finally {
          // redirect to the login page with an error message when not authorized
          const message = encodeURIComponent("This account is not authorized");
          return NextResponse.redirect(`${origin}/login?error=${message}`);
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
