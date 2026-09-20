import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AuthForm from "@/components/AuthForm";

export const metadata = { title: "Create an account", robots: { index: false } };

export default async function RegisterPage({ searchParams }) {
  const session = await auth();
  const raw = typeof searchParams?.next === "string" ? searchParams.next : typeof searchParams?.callbackUrl === "string" ? searchParams.callbackUrl : "";
  const next = raw.replace(/^https?:\/\/[^/]+/, "").startsWith("/") ? raw.replace(/^https?:\/\/[^/]+/, "") : "";
  if (session?.user) redirect(next && !next.startsWith("/admin") ? next : session.user.role === "admin" ? "/admin" : "/account");
  return (
    <section className="wrap flex min-h-[80vh] items-center justify-center pt-[76px]">
      <div className="w-full max-w-md py-16">
        <span className="eyebrow">Guests</span>
        <h1 className="h-section mt-3">Create an account.</h1>
        <p className="lead mt-3 !text-base">Check live availability, request a stay, and track it — all in one place.</p>
        <div className="mt-8"><AuthForm mode="register" next={next} /></div>
      </div>
    </section>
  );
}
