// Extra content for the individual location pages (/locations/[slug]).

export type LocationPage = {
  /** Hero heading as [white part, gradient part]. Defaults to "Award-Winning Jamaican Restaurant in <city>". */
  title?: [string, string];
  /** Last breadcrumb label. Defaults to the city name. */
  crumb?: string;
  /** Gradient text for the second line of the Parking heading, e.g. "at Detroit". */
  accentCity?: string;
  /** Gradient city name in the Parking heading and "Questions" in the FAQ heading (Houston style). */
  accent?: boolean;
  /** Address card heading. Defaults to "Address & Timing". */
  timingTitle?: string;
  /** Hero paragraph. "{address}" is replaced with a Google Maps link to the address. */
  intro: string;
  /** "Parking & Arrival" block. Only shown when we have the details for that location. */
  /** image: photo beside the text (portrait photos get a tall frame). */
  arrival?: { image?: string; portrait?: boolean; parkingTitle?: string; parking: string; gettingHere: string };
  faqs: { q: string; a: string }[];
  /** Private Events teaser text for this city. */
  eventsText?: string;
  /** Social post captions for this city, keyed by image path. */
  captions?: Record<string, string>;
};

const halal = { q: "Does Jerk at Nite serve Halal Caribbean food?", a: "Yes. All of our food is 100% Halal, made fresh daily with no MSG." };
const different = {
  q: "What makes the Jerk at Nite experience different from other Caribbean restaurants?",
  a: "We blend authentic Jamaican flavors and Caribbean spices with American soul food. Everything is made fresh the same day, from smoky jerk chicken and slow-braised oxtail to rasta pasta and jerk tacos.",
};
const delivery = {
  q: "Can I get delivery from any location?",
  a: "Delivery is available through DoorDash and Uber Eats, depending on the location. Tap Order Now to see the options near you.",
};
const howard = {
  q: "Which location is closest to Howard University?",
  a: "Jerk at Nite started at Howard University in Washington DC. Our DC location is coming soon; until then, Baltimore (HQ) is the closest.",
};

export const locationPages: Record<string, LocationPage> = {
  "baltimore-md": {
    intro:
      "Looking for the best Jamaican restaurant in Baltimore, MD? Jerk at Nite is right in downtown Baltimore at {address}, across from the Hippodrome Theatre. Dine in, sit down, and taste bold jerk chicken, slow-braised oxtail and rasta pasta made fresh daily at our award-winning flagship location. Halal, no MSG.",
    arrival: {
      parking:
        "The Baltimore HQ is in downtown Baltimore across from the Hippodrome Theatre. Street parking and paid garages are available throughout the surrounding blocks, including multiple Hippodrome-area decks within a short walk.",
      gettingHere:
        "The location sits on N Eutaw St in downtown Baltimore, easily accessible from I-83 and I-395. Multiple MTA bus routes stop nearby and the Charles Center Metro Subway station is a short walk away. We are wheelchair accessible with street-level entry.",
    },
    faqs: [
      {
        q: "Is Jerk at Nite Baltimore the best Jamaican restaurant in the city?",
        a: "Our guests think so. Baltimore is our award-winning flagship, serving smoky jerk chicken, oxtail and rasta pasta made fresh daily, 100% Halal with no MSG.",
      },
      {
        q: "Is Jerk at Nite Baltimore location good for a special occasion dinner?",
        a: "Yes. A full dine-in experience, a lively atmosphere and table reservations through OpenTable make it a great pick for birthdays, date nights and celebrations.",
      },
      {
        q: "Can I host a birthday party or corporate dinner at Jerk at Nite Baltimore?",
        a: "Yes. Tell us about your event on the Private Events page and we'll handle the food and the vibes.",
      },
      { q: "Which location is best for dine-in?", a: "Baltimore (HQ) is our flagship for dine-in and the only location that takes reservations through OpenTable." },
      halal,
      different,
      delivery,
      howard,
      {
        q: "Does Jerk at Nite Baltimore take walk-ins or do I need a reservation?",
        a: "You can book a table through OpenTable to be sure of a seat. For walk-in availability on busy nights, give us a call at +1 (443) 835-1398.",
      },
      {
        q: "Is the Baltimore location accessible by public transit?",
        a: "Yes. Multiple MTA bus routes stop nearby and the Charles Center Metro Subway station is a short walk away.",
      },
    ],
  },
  "houston-tx": {
    title: ["Get Jerked in", "Houston, TX"],
    crumb: "H-Town",
    accent: true,
    timingTitle: "Address & Hours",
    intro:
      "Looking for the best Jamaican restaurant in Houston, TX? Jerk at Nite is right at {address}. Dine in or order bold jerk chicken, slow-braised oxtail and rasta pasta made fresh daily at our H-Town location. Halal, no MSG.",
    arrival: {
      image: "/images/locations/houston-storefront.jpg",
      portrait: true,
      parkingTitle: "Parking Near Us",
      parking:
        "Parking is available on and around Westheimer Rd and in the surrounding lots, with more options nearby during busy evenings and weekends. Uber and Lyft drop-offs are welcome right at our entrance.",
      gettingHere:
        "We're on Westheimer Rd in west Houston, easy to reach from major roads including Beltway 8 and I-10. We offer wheelchair-accessible street-level entry for a smooth and comfortable arrival.",
    },
    faqs: [
      { q: "Where is the Jerk at Nite H-Town location?", a: "Jerk at Nite H-Town is at 12970 Westheimer Rd, Houston, TX." },
      {
        q: "What Jamaican dishes are available at the H-Town location?",
        a: "Our signature jerk chicken, slow-braised oxtail, rasta pasta, jerk wings and tacos, plus rice and peas and other Caribbean sides. See the full Menu page.",
      },
      {
        q: "Can I order food online from the H-Town Houston location?",
        a: "Tap Order Now to see the current pickup and delivery options, or stop by during opening hours.",
      },
      {
        q: "What are the opening hours for Jerk at Nite H-Town?",
        a: "Tuesday 5:30 PM - 10:30 PM, Saturday 5:00 PM - 1:00 AM and Sunday 4:00 PM - 10:00 PM. Closed Monday, Wednesday, Thursday and Friday.",
      },
      { q: "Does Jerk at Nite H-Town offer catering in Houston?", a: "Yes. Houston is one of our catering locations. Build your order on the Catering page." },
      { q: "Can I host a private event at the H-Town location?", a: "Yes. Tell us about your birthday, corporate dinner or group gathering on the Private Events page." },
      { q: "Is the food at H-Town made fresh daily?", a: "Yes. Everything is made fresh the same day, 100% Halal with no MSG." },
      {
        q: "How is the H-Town location different from other Jerk at Nite spots?",
        a: "Same bold recipes as our Baltimore HQ, served with Houston hours and the H-Town vibe.",
      },
      {
        q: "Does Jerk at Nite H-Town have vegetarian or allergy-friendly options?",
        a: "Several dishes can be made with veggies instead of meat. Please tell our team about any allergy when you order so we can help you choose.",
      },
      {
        q: "How do I stay updated on Jerk at Nite H-Town specials and new hours?",
        a: "Follow @jerkatnite on Instagram, TikTok and Facebook for specials, events and hour changes.",
      },
    ],
  },
  "detroit-mi": {
    eventsText:
      "From intimate birthday dinners to full-scale corporate mixers, Jerk at Nite Detroit brings bold Caribbean flavor to your next occasion in the Motor City. Great food, great energy, and a vibe Detroit has never tasted before.",
    captions: {
      "/images/locations/reel-jamaican-way.jpg": "The Avenue of Fashion just got a new reason to visit. Smoked jerk chicken straight from the source.",
    },
    title: ["Get Jerked in", "Detroit, MI"],
    accentCity: "at Detroit",
    intro:
      "Looking for the best Jamaican restaurant in Detroit, MI? Jerk at Nite is right at {address} on the historic Avenue of Fashion near the University of Detroit Mercy. Dine in or order bold jerk chicken, slow-braised oxtail and rasta pasta made fresh daily at our Detroit location. Halal, no MSG.",
    arrival: {
      image: "/images/locations/detroit-storefront.jpg",
      parkingTitle: "Parking Near Us",
      parking:
        "Free parking is available along Livernois Ave and on nearby side streets. The location sits on Detroit's Avenue of Fashion, a well-known commercial corridor that is easy to access by car.",
      gettingHere:
        "Livernois Ave is a main artery in northwest Detroit, easily accessible from I-96, M-10 and the surrounding neighborhoods. Ride share drop-offs are convenient right at the entrance. The location is wheelchair accessible.",
    },
    faqs: [
      { q: "Where is Jerk at Nite located in Detroit?", a: "At 19163 Livernois Ave, Detroit, MI 48221, on the Avenue of Fashion near the University of Detroit Mercy." },
      {
        q: "What is the most popular dish at Jerk at Nite Detroit?",
        a: "Guest favorites include our smoky jerk chicken, slow-braised oxtail and rasta pasta, all made fresh daily.",
      },
      {
        q: "Can I get Jamaican food delivery in Detroit from Jerk at Nite?",
        a: "Yes. Order delivery or pickup through DoorDash, Uber Eats or Toast. Tap Order Now and choose Detroit.",
      },
      {
        q: "Which location is best for dine-in?",
        a: "Baltimore (HQ) is our flagship for dine-in with OpenTable reservations. In Detroit you can dine in or order pickup and delivery.",
      },
      { q: "Does Jerk at Nite Detroit offer catering for events in Michigan?", a: "Yes. Detroit is one of our catering locations. Build your order on the Catering page." },
      {
        q: "Is Jerk at Nite Detroit connected to the DC and Baltimore locations?",
        a: "Yes. Detroit is part of the same Jerk at Nite family that started at Howard University in DC, with our HQ in Baltimore. Same recipes, same bold flavors.",
      },
      {
        q: "Is late-night Jamaican food delivery available across Detroit?",
        a: "Delivery runs during Detroit opening hours, up to 11:00 PM on Fridays and Saturdays, through DoorDash and Uber Eats.",
      },
      howard,
      {
        q: "What are the opening hours for Jerk at Nite Detroit?",
        a: "Tuesday to Thursday 12:00 PM - 9:00 PM, Friday and Saturday 12:00 PM - 11:00 PM, Sunday 12:00 PM - 6:00 PM. Closed Monday.",
      },
      { q: "Is Jerk at Nite expanding to any other cities soon?", a: "Yes, Washington DC is next. Follow @jerkatnite on Instagram for announcements." },
    ],
  },
  "washington-dc": {
    intro: "Jerk at Nite started at Howard University, and we're bringing the island vibes back to Washington, DC soon. Follow us on social for opening news.",
    faqs: [howard, halal, different],
  },
};
