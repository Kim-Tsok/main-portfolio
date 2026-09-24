import type { Service } from "@/lib/data";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

export default function Services({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          title={
            <>
              How I can{" "}
              <span className="font-serif font-normal italic tracking-normal">
                help
              </span>
            </>
          }
        >
          From a first sketch to a site that&apos;s live, fast and easy to
          maintain.
        </SectionHeading>

        <ol className="border-t border-line">
          {services.map((service, i) => (
            <li key={service.id} className="border-b border-line">
              <Reveal
                delay={i * 0.06}
                className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
              >
                <h3 className="text-2xl font-medium text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:col-span-5 md:text-3xl">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-brown md:col-span-7 md:text-lg">
                  {service.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
