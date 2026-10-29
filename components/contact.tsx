import {getSettings} from "@/lib/content";
import ScrollSurface from "./scroll-surface";
import Link from "next/link";
import { ArrowUpRight, ArrowUp, CalendarDays } from "lucide-react";
import { site, socials } from "@/lib/site";

export default async function Contact() {
  const settings=await getSettings();
  return <ScrollSurface as="footer" treatment="footer" id="contact" className="closing-section" labelledBy="closing-title">
    <div className="closing-panel">
      <div className="closing-topline"><span className="closing-suits" aria-hidden="true">♠ <i>♥</i> ♣ <i>♦</i></span></div>
      <div className="closing-main">
        <div className="closing-copy"><h2 id="closing-title">YOUR<br/>MOVE<span>.</span></h2></div>
        <div className="closing-invitation"><a href={`mailto:${site.email}`} className="hello-card" aria-label={`Say hello by email: ${site.email}`}><span className="hello-corner" aria-hidden="true">A<span>♠</span></span><span className="hello-arrow" aria-hidden="true"><ArrowUpRight/></span><span className="hello-card-title">Say hello.</span><span className="hello-corner hello-corner-bottom" aria-hidden="true">A<span>♠</span></span></a></div>
      </div>
      <div className="closing-connect"><a href={`mailto:${site.email}`} className="closing-email">{site.email}<ArrowUpRight size={20}/></a><div className="closing-extras"><Link href={settings.resume_url}>View résumé<ArrowUpRight size={14}/></Link>{settings.booking_url && <a href={settings.booking_url} target="_blank" rel="noopener noreferrer">Book a call<CalendarDays size={14}/></a>}</div></div>
      <div className="closing-bottom"><nav aria-label="Social profiles">{socials.filter(s=>["GitHub","X / Twitter","Substack"].includes(s.label)).map(s=><a href={s.href} key={s.label} target="_blank" rel="noopener noreferrer">{s.label==="X / Twitter"?"Twitter":s.label}<ArrowUpRight size={12}/></a>)}</nav><a href="#top" className="closing-back">Back to top<ArrowUp size={15}/></a></div>
    </div>
    <div className="closing-colophon"><span>© {new Date().getFullYear()} {site.fullName}</span><Link href="/business">Are you a business?<ArrowUpRight size={12}/></Link></div>
  </ScrollSurface>;
}
