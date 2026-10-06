import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { DemoForm, SampleBanner, WhatsAppFab } from "@/components/lawyers/demo-kit";

const serif = "font-(family-name:--d1-serif) tracking-normal";

const practice = [
  { name: "Property & Conveyancing", body: "Searches, deeds of assignment, Governor's consent and tenancy agreements." },
  { name: "Corporate & Commercial", body: "CAC registration, contracts, compliance filings and business advisory." },
  { name: "Litigation", body: "Representation before Magistrate, High and Appellate Courts in Lagos State." },
  { name: "Family & Probate", body: "Wills, letters of administration, divorce and custody matters." },
  { name: "Employment", body: "Employment contracts, staff handbooks and workplace disputes." },
  { name: "Debt Recovery", body: "Demand letters, negotiation and recovery proceedings." },
];

const input =
  "w-full rounded-md border border-[#15233b]/20 bg-white px-4 py-3 text-base outline-none transition focus:border-[#a8834a] focus:ring-2 focus:ring-[#a8834a]/25";

export default function Demo1() {
  return (
    <>
      <SampleBanner />

      <header className="border-b border-[#15233b]/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a href="#" className="leading-none">
            <span className={`${serif} block text-2xl font-semibold`}>Kestrel Chambers</span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#a8834a]">
              Barristers &amp; Solicitors
            </span>
          </a>
          <ul className="hidden gap-8 text-sm md:flex">
            <li><a href="#practice" className="hover:text-[#a8834a]">Practice areas</a></li>
            <li><a href="#about" className="hover:text-[#a8834a]">About</a></li>
            <li><a href="#contact" className="hover:text-[#a8834a]">Contact</a></li>
          </ul>
          <a
            href="#contact"
            className="rounded-md bg-[#15233b] px-4 py-2.5 text-sm font-semibold text-[#f5efe3] hover:bg-[#0c1626]"
          >
            <span className="sm:hidden">Enquire</span>
            <span className="hidden sm:inline">Book a consultation</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="text-sm uppercase tracking-[0.2em] text-[#a8834a]">Ikeja, Lagos</p>
          <h1 className={`${serif} mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl`}>
            Practical legal advice for individuals and small businesses.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#15233b]/75">
            Kestrel Chambers handles property, business and family matters for
            clients across Lagos. Speak with a lawyer about your matter this week.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="rounded-md bg-[#a8834a] px-7 py-3.5 text-center font-semibold text-white hover:bg-[#8f6e3b]"
            >
              Send an enquiry
            </a>
            <a
              href="tel:+2348000000000"
              className="rounded-md border border-[#15233b]/25 px-7 py-3.5 text-center font-semibold hover:border-[#15233b]"
            >
              Call the chambers
            </a>
          </div>
        </section>

        <section id="practice" className="bg-[#15233b] text-[#f5efe3]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
            <h2 className={`${serif} text-4xl font-semibold md:text-5xl`}>Practice areas</h2>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-lg bg-[#f5efe3]/15 sm:grid-cols-2 lg:grid-cols-3">
              {practice.map((p) => (
                <li key={p.name} className="bg-[#15233b] p-7">
                  <h3 className={`${serif} text-2xl font-semibold text-[#d9bd8c]`}>{p.name}</h3>
                  <p className="mt-3 leading-relaxed text-[#f5efe3]/75">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <div className="grid aspect-[4/5] place-items-center rounded-lg bg-[#e8dfcd]">
              <span className={`${serif} text-7xl font-semibold text-[#15233b]/30`}>TO</span>
            </div>
            <p className="mt-3 text-sm text-[#15233b]/60">Your photo goes here</p>
          </div>
          <div className="md:col-span-8">
            <h2 className={`${serif} text-4xl font-semibold md:text-5xl`}>About the chambers</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#15233b]/80">
              Kestrel Chambers was founded in 2016 by Tobi Olumide, who was called
              to the Nigerian Bar in 2011. The chambers works with families,
              landlords, traders and growing companies who want clear advice and
              steady updates on their matters.
            </p>
            <dl className="mt-10 grid gap-6 border-t border-[#15233b]/15 pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-[#15233b]/60">Principal</dt>
                <dd className="mt-1 font-semibold">Tobi Olumide</dd>
              </div>
              <div>
                <dt className="text-sm text-[#15233b]/60">Called to the Bar</dt>
                <dd className="mt-1 font-semibold">2011</dd>
              </div>
              <div>
                <dt className="text-sm text-[#15233b]/60">Languages</dt>
                <dd className="mt-1 font-semibold">English, Yoruba</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="contact" className="border-t border-[#15233b]/10 bg-[#efe6d5]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
            <div>
              <h2 className={`${serif} text-4xl font-semibold md:text-5xl`}>Visit or write to us</h2>
              <ul className="mt-8 space-y-4">
                <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-[#a8834a]" />12 Sample Street, off Allen Avenue, Ikeja, Lagos</li>
                <li className="flex gap-3"><Phone className="mt-0.5 size-5 shrink-0 text-[#a8834a]" />+234 800 000 0000</li>
                <li className="flex gap-3"><Mail className="mt-0.5 size-5 shrink-0 text-[#a8834a]" />info@kestrelchambers.example</li>
                <li className="flex gap-3"><Clock className="mt-0.5 size-5 shrink-0 text-[#a8834a]" />Monday to Friday, 8:30am to 5:30pm</li>
              </ul>
              <iframe
                title="Map of the chambers"
                src="https://maps.google.com/maps?q=Allen%20Avenue%20Ikeja%20Lagos&output=embed"
                loading="lazy"
                className="mt-8 h-64 w-full rounded-lg border-0 grayscale"
              />
            </div>

            <DemoForm
              className="space-y-4 rounded-lg bg-white p-6 shadow-sm md:p-8"
              noticeClassName="self-start rounded-lg bg-white p-8 text-lg leading-relaxed shadow-sm"
            >
              <h3 className={`${serif} text-3xl font-semibold`}>Send an enquiry</h3>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Full name</span>
                <input required className={input} autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Phone or WhatsApp</span>
                <input required type="tel" className={input} autoComplete="tel" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">What do you need help with?</span>
                <textarea required rows={4} className={input} />
              </label>
              <button
                type="submit"
                className="w-full rounded-md bg-[#15233b] py-3.5 font-semibold text-[#f5efe3] hover:bg-[#0c1626]"
              >
                Send enquiry
              </button>
            </DemoForm>
          </div>
        </section>
      </main>

      <footer className="bg-[#15233b] px-5 py-10 text-sm text-[#f5efe3]/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Kestrel Chambers</p>
          <p>The content of this site is general information, not legal advice.</p>
        </div>
      </footer>

      <WhatsAppFab firm="Kestrel Chambers" />
    </>
  );
}
