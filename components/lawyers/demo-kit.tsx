"use client";

import { useState } from "react";
import Link from "next/link";
import { waLink } from "@/lib/site";

// Strip shown above every sample site so nobody mistakes the firm for a real one.
export function SampleBanner() {
  return (
    <div className="bg-[#1c1613] px-4 py-2.5 text-center text-xs text-[#eadfd8] sm:text-sm">
      Sample site by Kim Tsok. The firm and people here are made up.{" "}
      <Link href="/lawyers" className="font-medium text-[#d6b79c] underline underline-offset-2">
        Get one for your firm
      </Link>
    </div>
  );
}

// Forms on the samples don't send anything; they say what the real one would do.
export function DemoForm({
  className,
  noticeClassName,
  children,
}: {
  className?: string;
  noticeClassName?: string;
  children: React.ReactNode;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className={noticeClassName}>
        This is a sample form. On your firm&apos;s site, this enquiry would go
        straight to your inbox and the client would get an automatic reply.
      </div>
    );
  }

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {children}
    </form>
  );
}

export function WhatsAppFab({ firm }: { firm: string }) {
  return (
    <a
      href={waLink(`Hello Kim, I saw the ${firm} sample site and I'd like one for my firm.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.48-.23-.36a9.43 9.43 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.38 9.38 0 0 1 6.67 2.77 9.38 9.38 0 0 1 2.77 6.68c0 5.2-4.24 9.43-9.46 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.6 23.6l6-1.57a11.33 11.33 0 0 0 5.44 1.39h.01c6.26 0 11.36-5.1 11.37-11.36a11.3 11.3 0 0 0-3.33-8.04" />
      </svg>
    </a>
  );
}
