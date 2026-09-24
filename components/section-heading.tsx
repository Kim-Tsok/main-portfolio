import Reveal from "./reveal";

export default function SectionHeading({
  title,
  children,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <h2 className="max-w-3xl text-balance text-3xl font-semibold text-ink md:text-5xl md:leading-[1.08]">
        {title}
      </h2>
      {children && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-brown md:text-lg">
          {children}
        </p>
      )}
    </Reveal>
  );
}
