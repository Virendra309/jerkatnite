// Extra content for the individual location pages (/locations/[slug]).

export type LocationPage = {
  /** Hero paragraph. "{address}" is replaced with a Google Maps link to the address. */
  intro: string;
  /** "Parking & Arrival" block. Only shown when we have the details for that location. */
  arrival?: { parking: string; gettingHere: string };
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
    intro:
      "Looking for Jamaican food in Houston, TX? Jerk at Nite H-Town is at {address}. Taste bold jerk chicken, slow-braised oxtail and rasta pasta made fresh daily. Halal, no MSG.",
    faqs: [
      { q: "Where is Jerk at Nite Houston?", a: "Jerk at Nite Houston is at 12970 Westheimer Rd, Houston, TX." },
      { q: "What are the Houston hours?", a: "Hours vary by day. See the Address & Timing section above for this week's hours." },
      halal,
      different,
      delivery,
      { q: "Does Jerk at Nite Houston offer catering?", a: "Yes. Houston is one of our catering locations. Build your order on the Catering page." },
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
