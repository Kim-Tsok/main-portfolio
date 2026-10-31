"use client";

import {useState,type FormEvent} from 'react';
import type {BusinessPageKey} from '@/lib/business-pages';
import styles from '@/app/business/[sector]/sector.module.css';
import demo from '@/app/business/[sector]/demo/demo.module.css';

export default function DemoEnquiry({sector}:{sector:BusinessPageKey}){
 const landscape=sector==='landscaping';
 const [summary,setSummary]=useState<string|null>(null);
 const today=new Date().toLocaleDateString('en-CA',{timeZone:'Africa/Lagos'});
 function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();const data=new FormData(event.currentTarget);
  setSummary(`${data.get('service')} · ${data.get(landscape?'yard':'property')} · ${landscape?'':`${data.get('size')} rooms · `}ZIP ${data.get('zip')} · ${data.get('date')}`);
 }
 return <form className={demo.form} onSubmit={submit} onChange={()=>setSummary(null)} aria-describedby="demo-form-note">
  <p id="demo-form-note">This is a demo. Nothing is sent, charged or booked.</p>
  <label>{landscape?'Service needed':'Type of clean'}<select name="service" required>{(landscape?['Lawn care','Seasonal cleanup','Planting & garden beds']:['Regular clean','Deep clean','Moving clean']).map(service=><option key={service}>{service}</option>)}</select></label>
  {landscape?<label>Approximate yard size<select name="yard" required><option>Small yard (under ¼ acre)</option><option>Medium yard (¼–½ acre)</option><option>Large yard (over ½ acre)</option><option>Not sure yet</option></select></label>:<>
   <label>Property type<select name="property" required><option>Apartment</option><option>House</option><option>Office</option></select></label>
   <label>Number of rooms<input name="size" type="number" min="1" max="50" required defaultValue={3}/></label>
  </>}
  <label>ZIP code<input name="zip" type="text" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} placeholder="e.g. 78701" required/><small>Enter five digits. This demo does not check real service coverage.</small></label>
  <label>Preferred date<input name="date" type="date" min={today} required/></label>
  <button type="submit" className={styles.button}>{landscape?'Preview estimate request':'Preview cleaning request'}</button>
  {summary&&<div className={demo.confirmation} role="status"><h3>Demo enquiry prepared</h3><p>{summary}</p><p>On a real site, this would go to the business for a reply. Availability and pricing would be confirmed separately.</p></div>}
 </form>;
}
