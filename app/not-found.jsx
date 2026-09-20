import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <span className="eyebrow">404</span>
      <h1 className="h-display mt-4">Wandered off the farm.</h1>
      <p className="lead mt-4 max-w-md">That page isn't here. The pool, on the other hand, is exactly where we left it.</p>
      <Link href="/" className="btn-primary mt-8">Back home</Link>
    </section>
  );
}
