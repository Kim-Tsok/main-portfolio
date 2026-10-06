import { ArrowUpRight, Check } from "lucide-react";
import { included, launchOffer, quoteMessage, tiers } from "@/lib/lawyers";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import Reveal from "../reveal";

export default function Pricing() {
  return (
    <>
      {launchOffer.active && (
        <Reveal className="mb-8 rounded-2xl border border-tan/40 bg-paper-deep px-5 py-4 text-sm font-medium text-brown-deep md:text-base">
          {launchOffer.text}
        </Reveal>
      )}

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier, i) => (
          <li key={tier.name}>
            <Reveal
              delay={(i % 3) * 0.06}
              className={cn(
                "flex h-full flex-col rounded-[1.5rem] border p-6 md:p-7",
                tier.featured
                  ? "border-brown-deep bg-brown-deep text-paper"
                  : "border-line bg-paper/70"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <h3
                  className={cn(
                    "text-2xl font-semibold",
                    tier.featured ? "text-white" : "text-ink"
                  )}
                >
                  {tier.name}
                </h3>
                {tier.featured && (
                  <span className="rounded-full bg-tan px-3 py-1 text-xs font-medium text-white">
                    Most chosen
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed",
                  tier.featured ? "text-paper/75" : "text-brown"
                )}
              >
                {tier.forWho}
              </p>

              <p
                className={cn(
                  "mt-6 font-heading text-3xl font-semibold tracking-tight",
                  tier.featured ? "text-white" : "text-ink"
                )}
              >
                {tier.priceLabel}
              </p>
              <p
                className={cn(
                  "mt-1 text-sm",
                  tier.featured ? "text-paper/60" : "text-brown/80"
                )}
              >
                One-off · {tier.delivery} · {tier.edits}
              </p>

              <ul className="mt-6 flex-1 space-y-3 text-sm leading-relaxed">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        tier.featured ? "text-tan" : "text-brown"
                      )}
                    />
                    <span className={tier.featured ? "text-paper/90" : "text-ink/85"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={waLink(quoteMessage(tier.name))}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-medium transition-colors",
                  tier.featured
                    ? "bg-paper text-ink hover:bg-white"
                    : "bg-brown text-white hover:bg-brown-deep"
                )}
              >
                Get a quote
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="mt-10 border-t border-line pt-6">
        <p className="text-sm font-medium text-ink">Every package includes</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {included.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-paper/70 px-3.5 py-1.5 text-sm text-brown"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  );
}
