export const businessPages = {
 cleaning: {
  title:'Websites for cleaning businesses', name:'Cleaning businesses',
  headline:'Make it easy to ask for a clean.',
  description:'I build websites for residential and commercial cleaners, including businesses serving the United States. Clear services, service areas and a useful quote form give visitors a straightforward next step.',
  image:'/business/cleaning-interior.jpg', alt:'A bright, tidy living room with plants and a brown sofa',
  demoName:'Sunday Cleaning', demoHeadline:'Come home to a clean space.',
  demoIntro:'Regular home cleaning, a deeper reset or a fresh start after moving. Choose what your space needs and tell us a little about it.',
  features:[
   {title:'Services people can compare',body:'Give regular cleans, deep cleans and move-out work their own clear descriptions. Explain what is included before someone gets in touch.'},
   {title:'A useful quote request',body:'Collect the property type, service and preferred date together, so you can respond with fewer follow-up questions.'},
   {title:'Your service area, explained',body:'Show the neighbourhoods you cover, how to reach you and what happens after an enquiry.'},
  ],
  services:[{title:'Regular clean',body:'The everyday jobs: kitchen surfaces, bathrooms, floors and dusting.'},{title:'Deep clean',body:'More time for the corners, surfaces and details that need extra attention.'},{title:'Moving clean',body:'A clean, empty space before moving in or handing the keys back.'}],
  faq:[{q:'Can customers request a clean from their phone?',a:'Yes. The form is designed for a phone first, with short fields and clear choices.'},{q:'Can I change my services and photos?',a:'Content editing can be included in the project scope, so you can update services, coverage and photos yourself.'},{q:'Does a quote request automatically become a booking?',a:'No. You review the request and confirm the scope, price and availability with the customer.'}],
 },
 landscaping: {
  title:'Websites for landscaping and lawn-care companies', name:'Landscaping & lawn care',
  headline:'Show the work. Make the next enquiry simple.',
  description:'A website for your landscaping or lawn-care business, built around service areas, project photos and estimate requests. I work with service businesses, including companies serving customers across the United States.',
  image:'/business/landscaping-lawn.jpg', alt:'A close view of a green lawn beside a modern building',
  demoName:'Fieldwork Lawn & Landscape', demoHeadline:'Good care for the space outside.',
  demoIntro:'Routine lawn care, seasonal cleanups and planting for the spaces around your home. Start with the work you need and we’ll take it from there.',
  features:[
   {title:'Make your work easy to see',body:'A project gallery with your own photos, clear service descriptions and genuine before-and-after pairs where you have them.'},
   {title:'A better estimate request',body:'Ask what kind of work is needed, the approximate yard size and the ZIP code, so you can decide on the next step.'},
   {title:'Be clear about where you work',body:'Give service areas and seasonal services a clear place on the site, with a straightforward way to contact you.'},
  ],
  services:[{title:'Lawn care',body:'Mowing, edging and routine upkeep for a yard that needs regular attention.'},{title:'Seasonal cleanup',body:'Leaf clearing, bed tidying and a fresh start as the seasons change.'},{title:'Planting & garden beds',body:'Thoughtful planting and garden-bed care, planned around the space you have.'}],
  faq:[{q:'Can I add photos of completed projects?',a:'Yes. The site can include a gallery you can update with your own photos, descriptions and genuine before-and-after pairs.'},{q:'Can the site list all the areas we serve?',a:'Yes. We can organise service areas around the cities, neighbourhoods or ZIP codes your business actually covers.'},{q:'Will requests include a final price?',a:'No. The form collects enough information to start an estimate. You confirm the scope and price, including a site visit where needed.'}],
 },
} as const;
export type BusinessPageKey=keyof typeof businessPages;
export function isBusinessPage(value:string):value is BusinessPageKey{return Object.hasOwn(businessPages,value);}
