// Central content for the site. Edit this file to update locations, hours,
// links, reviews and FAQs — every page reads from here.

export const site = {
  name: "Jerk at Nite",
  url: "https://jerkatnite.com",
  tagline: "Bold Spices. Island Vibes.",
  description:
    "Award-winning Caribbean & Jamaican food made fresh daily. Smoky jerk chicken, oxtail, rasta pasta & more. All Halal, no MSG. Order pickup or delivery now.",
  phone: "+1 (443) 835-1398",
  phoneHref: "tel:+14438351398",
  email: "catering@jerkatniteinc.com",
  openTable: "https://www.opentable.com/r/jerk-at-nite-baltimore",
  heroVideo: "https://player.vimeo.com/video/1193550185?muted=1&autoplay=1&dnt=1&loop=1&background=1",
};


// Links taken from the live jerkatnite.com (Facebook / Instagram confirmed in the reference video).
// Phone screenshots are the live site's images.
const socialUp = "https://jerkatnite.com/wp-content/uploads/2026/03";
export const socials = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/jerkatnite/", followers: "7.1K", phone: `${socialUp}/PHONE.png` },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/jerkatnite/", followers: "502K", phone: `${socialUp}/iphone16pro.png` },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@jerkatnite", followers: "16.3K", phone: `${socialUp}/PsdNE.png` },
  { id: "x", label: "X (Twitter)", href: "https://x.com/JerkAtNite", followers: "3.1K", phone: `${socialUp}/iphonzcro.png` },
] as const;
export const youtube = "https://www.youtube.com/hashtag/jerkatnite";

// Images are currently served from the existing WordPress site.
// Move them into /public/images when the old site is retired.
const up = "https://jerkatnite.com/wp-content/uploads";
export const images = {
  logo: `${up}/2026/03/image-49.png`,
  tacos: `${up}/2026/05/DSC03448-1024x683.jpg`,
  wings: `${up}/2026/04/DSC03458-1024x683.jpg`,
  restaurant: `${up}/2026/05/Jerk@NiteRestaurantLine-1024x585.png`,
  catering: `${up}/2026/05/DSC03785-1024x748.jpg`,
  about: `${up}/2026/03/Group-1000001399-982x1024.png`,
  events: `${up}/2026/03/Group-1000001394-1014x1024.png`,
  qr: `${up}/2026/05/Jerk-at-nite-menu-QR-Code-e1778970732746.png`,
  catering1: `${up}/2026/05/DSC03488-1024x683.jpg`,
  catering2: `${up}/2026/04/DSC03696-1024x683.jpg`,
  catering3: `${up}/2026/04/DSC03815-1024x683.jpg`,
  instagramPhone: `${up}/2026/03/iphone16pro.png`,
  star: `${up}/2026/03/Vectosar.png`,
  eventThumb: `${up}/2026/03/Rectangle-39433.png`,
  google: `${up}/2026/03/Rectangled-39428.png`,
};

/** Hours indexed by day of week: 0 = Sunday … 6 = Saturday. `null` = closed. */
export type WeekHours = [string | null, string | null, string | null, string | null, string | null, string | null, string | null];

export type Location = {
  slug: string;
  city: string;
  address: string | null;
  mapsQuery: string;
  comingSoon?: boolean;
  reservations?: boolean;
  hours: WeekHours | null;
  /** Short name shown in the Order Now popup, e.g. "Baltimore". */
  short: string;
  /** Phone number as shown on the live site (catering cards). */
  phone?: string;
  /** IANA time zone the hours are in, used for the live "Open now" badge. */
  timeZone: string;
  /** Background photo for the location card. */
  image: string;
  hq?: boolean;
  /** Set to false to hide this location from the Order Now popup (as on the live site). */
  orderPopup?: boolean;
  /** Online ordering links per mode. Replace "#" with the real store URLs. */
  order: { pickup: OrderLink[]; delivery: OrderLink[] };
};

export type PlatformId = "doordash" | "ubereats" | "toast" | "direct";
export type OrderLink = { platform: PlatformId; href: string };

const pickupAll: OrderLink[] = [
  { platform: "doordash", href: "#" },
  { platform: "ubereats", href: "#" },
  { platform: "toast", href: "#" },
  { platform: "direct", href: "#" },
];
const deliveryAll: OrderLink[] = [
  { platform: "doordash", href: "#" },
  { platform: "ubereats", href: "#" },
];

export const locations: Location[] = [
  {
    slug: "baltimore-md",
    city: "Baltimore, MD",
    address: "21 N Eutaw St, Baltimore, MD 21201",
    mapsQuery: "21 N Eutaw St, Baltimore, MD 21201",
    short: "Baltimore",
    phone: "+1 (443) 835 1398",
    image: images.catering1,
    timeZone: "America/New_York",
    hq: true,
    reservations: true,
    hours: ["3:00 PM – 10:00 PM", null, null, "4:00 PM – 10:00 PM", "4:00 PM – 10:00 PM", null, "5:00 PM – 1:00 AM"],
    // Verified Baltimore store pages. Direct Pickup opens the restaurant in Google Maps, as on jerkatnite.com.
    order: {
      pickup: [
        { platform: "doordash", href: "https://www.doordash.com/store/jerk-at-nite-31800073/" },
        { platform: "ubereats", href: "https://www.ubereats.com/store/jerk-at-nite-21-n-eutaw-st/M3h02048Uk6hRRmJ30N5vg?diningMode=PICKUP" },
        { platform: "toast", href: "https://toast.app/r/jerk-at-night-baltimore-21-north-eutaw-street" },
        { platform: "direct", href: "https://www.google.com/maps/place/Jerk+at+Nite/@39.2898,-76.6196,17z/data=!3m1!4b1!4m6!3m5!1s0x89c805b7f38709fd:0x510f77eb265294d0" },
      ],
      delivery: [
        { platform: "doordash", href: "https://www.doordash.com/store/jerk-at-nite-31800073/" },
        { platform: "ubereats", href: "https://www.ubereats.com/store/jerk-at-nite-21-n-eutaw-st/M3h02048Uk6hRRmJ30N5vg?diningMode=DELIVERY" },
      ],
    },
  },
  {
    slug: "washington-dc",
    city: "Washington, DC",
    address: null,
    mapsQuery: "Washington, DC",
    short: "Washington DC",
    image: images.catering,
    timeZone: "America/New_York",
    comingSoon: true,
    hours: null,
    order: { pickup: [], delivery: [] },
  },
  {
    slug: "houston-tx",
    city: "Houston, TX",
    // Copied from the current site; double-check the ZIP (77007 vs 77077).
    address: "12970 Westheimer Rd, Houston, TX 77007",
    mapsQuery: "12970 Westheimer Rd, Houston, TX",
    short: "Houston",
    image: images.tacos,
    timeZone: "America/Chicago",
    orderPopup: false,
    hours: ["4:00 PM – 10:00 PM", null, "5:30 PM – 10:30 PM", null, null, null, "5:00 PM – 1:00 AM"],
    order: { pickup: pickupAll.filter((o) => o.platform !== "toast"), delivery: deliveryAll },
  },
  {
    slug: "detroit-mi",
    city: "Detroit, MI",
    address: "19163 Livernois Ave, Detroit, MI 48221",
    mapsQuery: "19163 Livernois Ave, Detroit, MI 48221",
    short: "Detroit",
    phone: "+1 (313) 739-6021",
    image: images.wings,
    timeZone: "America/Detroit",
    hours: ["12:00 PM – 6:00 PM", null, "12:00 PM – 9:00 PM", "12:00 PM – 9:00 PM", "12:00 PM – 9:00 PM", "12:00 PM – 11:00 PM", "12:00 PM – 11:00 PM"],
    // Store pages taken from the live site's Order Now popup (Jerkatnite Detroit, 19163 Livernois Ave).
    order: {
      pickup: [
        { platform: "doordash", href: "https://order.online/store/jerkatnite-detroit-detroit-32158157/?pickup=true" },
        { platform: "ubereats", href: "https://www.ubereats.com/store/jerk-at-nite/ik__cPG1VTyFGwPeqjQOLw?diningMode=PICKUP" },
        { platform: "toast", href: "https://order.toasttab.com/online/jerk-at-nite-detroit-19163-livernois-ave?diningOption=takeout" },
        { platform: "direct", href: "https://www.google.com/maps/place/JerkatNite+Detroit/@42.4326293,-83.1444195,17z/data=!3m1!4b1!4m6!3m5!1s0x8824cf4677790669:0xc7467c2ca320eb7f" },
      ],
      delivery: [
        { platform: "doordash", href: "https://order.online/store/jerkatnite-detroit-detroit-32158157/" },
        { platform: "ubereats", href: "https://www.ubereats.com/store/jerk-at-nite/ik__cPG1VTyFGwPeqjQOLw?diningMode=DELIVERY" },
      ],
    },
  },
];

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Media logos for the "As Featured or Seen In" strip (from the live site). `light` = dark logo that needs a white card. */
export const press = [
  { name: "WUSA9 (CBS Washington DC)", logo: `${up}/2026/05/WUSA9-CBS-Washington-DC.png` },
  { name: "NBC4 Washington", logo: `${up}/2026/05/NBC4-Washington-WRC.webp` },
  { name: "FOX 45 Baltimore", logo: `${up}/2026/05/Fox-45-Baltimore-WBFF.svg` },
  { name: "FOX 5 Washington DC", logo: `${up}/2026/05/Fox-5-Washington-DC.svg` },
  { name: "Baltimore Times", logo: `${up}/2026/05/Baltimore-Times.png` , light: true },
  { name: "AfroTech", logo: `${up}/2026/05/AfroTech.svg` },
  { name: "Baltimore Fishbowl", logo: `${up}/2026/05/Baltimore_Fishbowl-removebg-preview.png` },
  { name: "South Baltimore", logo: `${up}/2026/05/South_Baltimore-removebg-preview.png` , light: true },
];

export const reviews = [
  "Absolutely amazing food! The jerk chicken was perfectly seasoned and full of flavor. You can really taste the authenticity in every bite.",
  "One of the best Jamaican spots I've tried. The oxtail was tender, the rice and peas were perfect, and the service was super friendly.",
  "I love the variety on the menu. There are so many options and everything we ordered was delicious. Highly recommend the jerk wings!",
  "This place is a must-visit if you love Caribbean food. The portions are generous, the flavors are bold, and the atmosphere is great.",
];

// Questions and answers as on the live site.
export const faqs = [
  {
    q: "What kind of food does Jerk at Nite serve?",
    a: "Jerk at Nite serves a unique fusion of authentic Jamaican flavors, Caribbean spices, and American soul food. Our menu is packed with bold, smoky dishes made fresh daily, ranging from traditional favorites to creative culinary twists — jerk chicken, tender oxtail, tacos, wings and more.",
  },
  {
    q: "Is all the food served at Jerk at Nite Halal-certified?",
    a: "Yes, 100% of the menu at Jerk at Nite is completely Halal. We are committed to maintaining strict sourcing and preparation standards so that our community can enjoy clean, wholesome Caribbean food with total peace of mind.",
  },
  {
    q: "What are the hours of operation?",
    a: "Most locations are open from 4 PM to 10 PM daily, with extended hours on weekends at select spots. Hours can vary by location, so check the Locations page for the latest hours near you.",
  },
  {
    q: "Does Jerk at Nite serve halal food?",
    a: "Yes, all meat at Jerk at Nite is 100% halal. It has been that way since day one because we believe great food should be for everyone.",
  },
  {
    q: "Can I order online or get delivery?",
    a: "Yes. You can order through DoorDash, Uber Eats, Toast, or direct pickup depending on your location. Just hit Order Now to pick your nearest spot and preferred platform.",
  },
  {
    q: "Is Jerk at Nite good for first-time Caribbean food eaters?",
    a: "Absolutely. The fusion menu makes it really easy to ease in, especially with dishes like rasta pasta, jerk tacos, and rice and peas. Our chefs have 12+ years of experience making Caribbean flavors feel approachable and unforgettable.",
  },
  {
    q: "Does Jerk at Nite use MSG or preservatives?",
    a: "Never. Every dish is made fresh with natural ingredients and real Caribbean spices, zero shortcuts. It is one of the things that makes the food taste genuinely different.",
  },
  {
    q: "Does Jerk at Nite offer catering?",
    a: "Yes, and we are really good at it. From office lunches to wedding receptions, we bring fresh trays of bold Jamaican dishes straight to your event. See the Catering page to request a quote.",
  },
  {
    q: "Can I host a private event at Jerk at Nite?",
    a: "We certainly do. From birthdays and corporate mixers to celebrity gatherings, sports events, and weddings, we accommodate all types of occasions. Visit the Private Events page to submit a booking inquiry.",
  },
  {
    q: "How do I make a reservation?",
    a: "Reservations are currently available at the Baltimore (HQ) location through OpenTable. Walk-ins are welcome everywhere else, but weekends fill up fast.",
  },
];

export type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

export const nav: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Locations",
    href: "/locations",
    children: locations.map((l) => ({ label: l.city, href: `/locations/${l.slug}` })),
  },
  { label: "Catering", href: "/catering" },
  { label: "Private Events", href: "/private-events" },
  { label: "Menu", href: "/menu" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

/** Every page link in the menu, flattened and de-duplicated (for the footer and sitemap). */
export const pageLinks = [
  ...new Map(
    nav.flatMap((n) => [n, ...(n.children ?? [])]).filter((l) => !l.href.startsWith("/locations/")).map((l) => [l.href, l]),
  ).values(),
];
