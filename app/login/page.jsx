import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AuthForm from "@/components/AuthForm";

export const metadata = { title: "Sign in", robots: { index: false } };

export default async function LoginPage({ searchParams }) {
  const session = await auth();
  const raw = typeof searchParams?.next === "string" ? searchParams.next : typeof searchParams?.callbackUrl === "string" ? searchParams.callbackUrl : "";
  const next = raw.replace(/^https?:\/\/[^/]+/, "").startsWith("/") ? raw.replace(/^https?:\/\/[^/]+/, "") : "";
  if (session?.user) {
    const home = session.user.role === "admin" ? "/admin" : "/account";
    const safe = next && !(next.startsWith("/admin") && session.user.role !== "admin") ? next : home;
    redirect(safe);
  }
  return (
    <section className="wrap flex min-h-[80vh] items-center justify-center pt-[76px]">
      <div className="w-full max-w-md py-16">
        <span className="eyebrow">Guests</span>
        <h1 className="h-section mt-3">Welcome back.</h1>
        <p className="lead mt-3 !text-base">Sign in to request a stay or check on a booking.</p>
        <div className="mt-8"><AuthForm mode="login" next={next} /></div>
      </div>
    </section>
  );
}
