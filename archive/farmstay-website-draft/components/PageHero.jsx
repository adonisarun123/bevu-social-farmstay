import Image from "next/image";

// Compact hero banner for inner pages.
export default function PageHero({ title, subtitle, image, alt }) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden pb-12 pt-32">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-forest/75" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-semibold leading-tight text-offwhite sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-beige/90 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
