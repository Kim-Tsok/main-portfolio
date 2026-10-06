import { Plus } from "lucide-react";
import { faqs } from "@/lib/lawyers";

export default function Faq() {
  return (
    <ul className="border-t border-line">
      {faqs.map((f) => (
        <li key={f.q} className="border-b border-line">
          <details className="group py-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium text-ink md:text-xl [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus className="mt-1 size-5 shrink-0 text-tan transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="mt-4 max-w-2xl leading-relaxed text-brown">{f.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
