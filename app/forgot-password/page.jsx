import { ForgotForm } from "@/components/PasswordForms";

export const metadata = { title: "Forgot password", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <section className="wrap flex min-h-[80vh] items-center justify-center pt-[76px]">
      <div className="w-full max-w-md py-16">
        <span className="eyebrow">Guests</span>
        <h1 className="h-section mt-3">Reset your password.</h1>
        <p className="lead mt-3 !text-base">Enter your email and we'll send a link that works for one hour.</p>
        <div className="mt-8"><ForgotForm /></div>
      </div>
    </section>
  );
}
