import Link from "next/link";
import { ResetForm } from "@/components/PasswordForms";

export const metadata = { title: "Set a new password", robots: { index: false } };

export default function ResetPasswordPage({ searchParams }) {
  const token = typeof searchParams?.token === "string" ? searchParams.token : "";
  return (
    <section className="wrap flex min-h-[80vh] items-center justify-center pt-[76px]">
      <div className="w-full max-w-md py-16">
        <span className="eyebrow">Guests</span>
        <h1 className="h-section mt-3">Choose a new password.</h1>
        <div className="mt-8">{token ? <ResetForm token={token} /> : <p className="text-sm text-bark/75">This link is missing its token. <Link href="/forgot-password" className="text-brick">Request a new one.</Link></p>}</div>
      </div>
    </section>
  );
}
