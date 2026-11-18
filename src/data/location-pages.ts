// Extra content for the individual location pages (/locations/[slug]).

export type LocationPage = {
  /** Hero heading as [white part, gradient part]. Defaults to "Award-Winning Jamaican Restaurant in <city>". */
  title?: [string, string];
  /** Last breadcrumb label. Defaults to the city name. */
  crumb?: string;
  /** Gradient city name in the Parking heading and "Questions" in the FAQ heading (Houston style). */
  accent?: boolean;
  /** Address card heading. Defaults to "Address & Timing". */
  timingTitle?: string;
  /** Hero paragraph. "{address}" is replaced with a Google Maps link to the address. */
  intro: string;
  /** "Parking & Arrival" block. Only shown when we have the details for that location. */
  arrival?: { parkingTitle?: string; parking: string; gettingHere: string };
  faqs: { q: string; a: string }[];
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
    intro:
      "Looking for Jamaican food in Detroit, MI? Jerk at Nite Detroit is at {address}. Order pickup or delivery and taste bold jerk chicken, slow-braised oxtail and rasta pasta made fresh daily. Halal, no MSG.",
    faqs: [
      { q: "Does Jerk at Nite have a location in Detroit?", a: "Yes, at 19163 Livernois Ave, Detroit, MI 48221." },
      { q: "What are the Detroit hours?", a: "Hours vary by day. See the Address & Timing section above for this week's hours." },
      { q: "What is the phone number for Jerk at Nite Detroit?", a: "You can reach the Detroit location at +1 (313) 739-6021." },
      halal,
      different,
      delivery,
      { q: "Does Jerk at Nite Detroit offer catering?", a: "Yes. Detroit is one of our catering locations. Build your order on the Catering page." },
    ],
  },
  "washington-dc": {
    intro: "Jerk at Nite started at Howard University, and we're bringing the island vibes back to Washington, DC soon. Follow us on social for opening news.",
    faqs: [howard, halal, different],
  },
};
