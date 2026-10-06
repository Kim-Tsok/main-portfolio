import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { DemoForm, SampleBanner, WhatsAppFab } from "@/components/lawyers/demo-kit";

const serif = "font-(family-name:--d2-serif) tracking-tight";

const practice = [
  { name: "Corporate & M&A", body: "Company formation, restructuring, shareholder agreements and acquisitions." },
  { name: "Energy & Natural Resources", body: "Licensing, joint ventures and regulatory work across oil, gas and power." },
  { name: "Banking & Finance", body: "Facility agreements, security documentation and fintech regulation." },
  { name: "Dispute Resolution", body: "Commercial litigation and arbitration in Abuja, Lagos and beyond." },
  { name: "Real Estate", body: "Acquisitions, leases, title perfection and development agreements." },
  { name: "Employment & Immigration", body: "Expatriate quotas, contracts, policies and employment disputes." },
];

const team = [
  { name: "Amaka Eze", role: "Managing Partner", area: "Corporate & M&A", office: "Abuja" },
  { name: "Ibrahim Danjuma", role: "Partner", area: "Energy & Natural Resources", office: "Abuja" },
  { name: "Folake Adebayo", role: "Partner", area: "Dispute Resolution", office: "Lagos" },
  { name: "Chinedu Okeke", role: "Senior Associate", area: "Banking & Finance", office: "Lagos" },
  { name: "Halima Yusuf", role: "Associate", area: "Real Estate", office: "Abuja" },
  { name: "Tunde Bakare", role: "Associate", area: "Employment & Immigration", office: "Lagos" },
];

const offices = [
  { city: "Abuja", address: "4 Sample Crescent, Maitama, Abuja", phone: "+234 800 000 0001" },
  { city: "Lagos", address: "10 Sample Road, Victoria Island, Lagos", phone: "+234 800 000 0002" },
];

const insights = [
  { date: "Sep 2026", tag: "Corporate", title: "What the latest CAC filing changes mean for small companies" },
  { date: "Aug 2026", tag: "Employment", title: "Five clauses every Nigerian employment contract should have" },
  { date: "Jul 2026", tag: "Real Estate", title: "A short guide to Governor's consent in Lagos and Abuja" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

const field =
  "w-full rounded-xl border border-[#14201b]/15 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0e3b2f] focus:ring-2 focus:ring-[#0e3b2f]/15";

export default function Demo2() {
  return (
    <>
      <SampleBanner />

      <header className="sticky top-0 z-40 border-b border-[#14201b]/10 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-2.5">
            <span className={`${serif} grid size-9 place-items-center rounded-lg bg-[#0e3b2f] text-lg font-semibold text-white`}>
              A
            </span>
            <span className="font-bold tracking-tight">Ashby Lane Partners</span>
          </a>
          <ul className="hidden gap-7 text-sm font-medium text-[#14201b]/70 lg:flex">
            <li><a href="#practice" className="hover:text-[#0e3b2f]">Expertise</a></li>
            <li><a href="#people" className="hover:text-[#0e3b2f]">People</a></li>
            <li><a href="#insights" className="hover:text-[#0e3b2f]">Insights</a></li>
            <li><a href="#offices" className="hover:text-[#0e3b2f]">Offices</a></li>
          </ul>
          <a
            href="#book"
            className="hidden rounded-full bg-[#0e3b2f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a2c23] sm:block"
          >
            Book a consultation
          </a>
        </nav>
      </header>

      <main>
        <section className="bg-[#0e3b2f] text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-sm font-semibold text-[#c8d9a6]">Abuja · Lagos</p>
              <h1 className={`${serif} mt-5 text-5xl font-medium leading-[1.02] md:text-7xl`}>
                Commercial counsel for businesses working in Nigeria.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-lg leading-relaxed text-white/75">
                A team of 12 lawyers advising companies, investors and public
                bodies from offices in Abuja and Lagos.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a href="#book" className="rounded-full bg-[#c8d9a6] px-6 py-3.5 text-center font-semibold text-[#0e3b2f] hover:bg-[#d9e6bf]">
                  Book a consultation
                </a>
                <a href="#practice" className="rounded-full border border-white/30 px-6 py-3.5 text-center font-semibold hover:border-white">
                  Our expertise
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="practice" className="mx-auto max-w-7xl px-5 py-20 md:py-28">
          <h2 className={`${serif} max-w-2xl text-4xl font-medium md:text-5xl`}>Expertise</h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {practice.map((p) => (
              <li key={p.name}>
                <a href="#book" className="group flex h-full flex-col rounded-2xl border border-[#14201b]/10 bg-[#f6f4ee] p-7 transition hover:border-[#0e3b2f]/40 hover:bg-[#eef1e6]">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-[#14201b]/70">{p.body}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e3b2f]">
                    Read more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="people" className="bg-[#f6f4ee]">
          <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className={`${serif} text-4xl font-medium md:text-5xl`}>Our people</h2>
              <p className="max-w-md text-[#14201b]/70">
                Each lawyer gets a profile page with their photo, practice areas,
                year of call and publications.
              </p>
            </div>
            <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
              {team.map((m) => (
                <li key={m.name} className="overflow-hidden rounded-2xl bg-white">
                  <div className="grid aspect-[4/3] place-items-center bg-[#dfe6d3]">
                    <span className={`${serif} text-4xl font-medium text-[#0e3b2f]/40 md:text-5xl`}>
                      {initials(m.name)}
                    </span>
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="font-bold md:text-lg">{m.name}</h3>
                    <p className="text-sm font-medium text-[#0e3b2f]">{m.role}</p>
                    <p className="mt-2 text-sm text-[#14201b]/60">
                      {m.area} · {m.office}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="insights" className="mx-auto max-w-7xl px-5 py-20 md:py-28">
          <h2 className={`${serif} text-4xl font-medium md:text-5xl`}>Insights</h2>
          <ul className="mt-12 border-t border-[#14201b]/10">
            {insights.map((post) => (
              <li key={post.title} className="border-b border-[#14201b]/10">
                <a href="#" className="group grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6">
                  <span className="text-sm text-[#14201b]/55 md:col-span-2">{post.date}</span>
                  <span className="text-sm font-semibold text-[#0e3b2f] md:col-span-2">{post.tag}</span>
                  <span className="flex items-start justify-between gap-4 text-lg font-semibold md:col-span-8 md:text-xl">
                    {post.title}
                    <ArrowUpRight className="mt-1 size-5 shrink-0 text-[#14201b]/40 transition group-hover:text-[#0e3b2f]" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="book" className="bg-[#0e3b2f] text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className={`${serif} text-4xl font-medium md:text-5xl`}>Book a consultation</h2>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                Choose an office and a date that suits you. We confirm every
                booking by phone or email within one working day.
              </p>
              <ul id="offices" className="mt-10 space-y-6">
                {offices.map((o) => (
                  <li key={o.city} className="flex gap-3">
                    <MapPin className="mt-1 size-5 shrink-0 text-[#c8d9a6]" />
                    <div>
                      <p className="font-bold">{o.city} office</p>
                      <p className="text-white/70">{o.address}</p>
                      <p className="text-white/70">{o.phone}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <DemoForm
                className="grid gap-4 rounded-3xl bg-white p-6 text-[#14201b] sm:grid-cols-2 md:p-8"
                noticeClassName="rounded-3xl bg-white p-8 text-lg leading-relaxed text-[#14201b]"
              >
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Full name</span>
                  <input required className={field} autoComplete="name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Email</span>
                  <input required type="email" className={field} autoComplete="email" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Phone</span>
                  <input type="tel" className={field} autoComplete="tel" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Area of law</span>
                  <select className={field} defaultValue="">
                    <option value="" disabled>Choose one</option>
                    {practice.map((p) => (
                      <option key={p.name}>{p.name}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Office</span>
                  <select className={field}>
                    {offices.map((o) => (
                      <option key={o.city}>{o.city}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Preferred date</span>
                  <input required type="date" className={field} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold">Briefly, what is the matter about?</span>
                  <textarea rows={4} className={field} />
                </label>
                <button
                  type="submit"
                  className="rounded-full bg-[#0e3b2f] py-3.5 font-semibold text-white hover:bg-[#0a2c23] sm:col-span-2"
                >
                  Request booking
                </button>
              </DemoForm>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-10 text-sm text-[#14201b]/60 sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Ashby Lane Partners</p>
        <p>Information on this site is not legal advice.</p>
      </footer>

      <WhatsAppFab firm="Ashby Lane Partners" />
    </>
  );
}
