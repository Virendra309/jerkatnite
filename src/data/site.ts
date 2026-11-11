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


export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/jerkatnite/", followers: "502k" },
  { label: "TikTok", href: "https://www.tiktok.com/@jerkatnite", followers: "16.3k" },
  { label: "Facebook", href: "https://www.facebook.com/jerkatnite/", followers: "7.1k" },
  { label: "X (Twitter)", href: "https://x.com/JerkAtNite", followers: "3.1k" },
];

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
  /** Online ordering links. Fill in the real store URLs. */
  order: { label: string; href: string }[];
};

export const locations: Location[] = [
  {
    slug: "baltimore-md",
    city: "Baltimore, MD",
    address: "21 N Eutaw St, Baltimore, MD 21201",
    mapsQuery: "21 N Eutaw St, Baltimore, MD 21201",
    reservations: true,
    hours: ["3:00 PM – 10:00 PM", null, null, "4:00 PM – 10:00 PM", "4:00 PM – 10:00 PM", null, "5:00 PM – 1:00 AM"],
    order: [
      { label: "DoorDash", href: "#" },
      { label: "Uber Eats", href: "#" },
      { label: "Grubhub", href: "#" },
      { label: "Toast (Pickup)", href: "#" },
    ],
  },
  {
    slug: "washington-dc",
    city: "Washington, DC",
    address: null,
    mapsQuery: "Washington, DC",
    comingSoon: true,
    hours: null,
    order: [],
  },
  {
    slug: "houston-tx",
    city: "Houston, TX",
    // Copied from the current site; double-check the ZIP (77007 vs 77077).
    address: "12970 Westheimer Rd, Houston, TX 77007",
    mapsQuery: "12970 Westheimer Rd, Houston, TX",
    hours: ["4:00 PM – 10:00 PM", null, "5:30 PM – 10:30 PM", null, null, null, "5:00 PM – 1:00 AM"],
    order: [
      { label: "DoorDash", href: "#" },
      { label: "Uber Eats", href: "#" },
    ],
  },
  {
    slug: "detroit-mi",
    city: "Detroit, MI",
    address: "19163 Livernois Ave, Detroit, MI 48221",
    mapsQuery: "19163 Livernois Ave, Detroit, MI 48221",
    hours: ["12:00 PM – 6:00 PM", null, "12:00 PM – 9:00 PM", "12:00 PM – 9:00 PM", "12:00 PM – 9:00 PM", "12:00 PM – 11:00 PM", "12:00 PM – 11:00 PM"],
    order: [
      { label: "DoorDash", href: "#" },
      { label: "Uber Eats", href: "#" },
    ],
  },
];

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const press = ["WUSA9", "NBC4 Washington", "FOX 45 Baltimore", "FOX 5 DC", "Baltimore Times", "AfroTech", "Baltimore Fishbowl", "South Baltimore"];

export const reviews = [
  "Absolutely amazing food! The jerk chicken was perfectly seasoned and full of flavor. You can really taste the authenticity in every bite.",
  "One of the best Jamaican spots I've tried. The oxtail was tender, the rice and peas were perfect, and the service was super friendly.",
  "I love the variety on the menu. There are so many options and everything we ordered was delicious. Highly recommend the jerk wings!",
  "This place is a must-visit if you love Caribbean food. The portions are generous, the flavors are bold, and the atmosphere is great.",
];

export const faqs = [
  {
    q: "What kind of food does Jerk at Nite serve?",
    a: "A fusion of authentic Jamaican flavors, Caribbean spices and American soul food — jerk chicken, tender oxtail, tacos, wings and more, made fresh daily.",
  },
  {
    q: "Is all the food Halal?",
    a: "Yes. 100% of the menu is Halal, and it has been that way since day one.",
  },
  {
    q: "What are the hours of operation?",
    a: "Hours vary by location, with extended late-night hours on weekends at select spots. Check the Locations page for today's hours near you.",
  },
  {
    q: "Can I order online or get delivery?",
    a: "Yes. Order through DoorDash, Grubhub, Uber Eats, Toast, or pick up directly depending on your location — just hit Order Now.",
  },
  {
    q: "Is Jerk at Nite good for first-time Caribbean food eaters?",
    a: "Absolutely. Dishes like rasta pasta, jerk tacos, and rice and peas are an easy way in, and our chefs have 12+ years of experience making Caribbean flavors approachable.",
  },
  {
    q: "Do you use MSG or preservatives?",
    a: "Never. Every dish is made fresh with natural ingredients and real Caribbean spices.",
  },
  {
    q: "Do you offer catering?",
    a: "Yes — from office lunches to wedding receptions, we bring fresh trays of bold Jamaican dishes straight to your event.",
  },
  {
    q: "Can I host a private event?",
    a: "Yes. Birthdays, corporate mixers, sports events, weddings and more. A private room is available for special events.",
  },
  {
    q: "How do I make a reservation?",
    a: "Reservations are available at the Baltimore (HQ) location through OpenTable. Walk-ins are welcome everywhere else.",
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
