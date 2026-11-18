// Open roles shown on /careers and /careers/[slug].
export type Job = {
  slug: string;
  title: string;
  text: string;
  experience: string;
  type: string;
  location: string;
  /** "What this person does" list on the job page. */
  duties: string[];
};

const allLocations = "Baltimore MD, Washington DC, Houston TX & Detroit MI";

export const jobs: Job[] = [
  {
    slug: "kitchen-manager",
    title: "Kitchen Manager",
    text: "The Kitchen Manager runs the kitchen during service. They make sure every dish meets Jerk at Nite's standard of bold, fresh, consistent food.",
    experience: "5+ Years",
    type: "Full Time",
    location: allLocations,
    duties: [
      "Oversee all kitchen staff and manage the line during service",
      "Make sure every dish is prepared correctly and on time",
      "Train new kitchen team members on recipes and procedures",
      "Monitor food inventory and place orders before supplies run low",
      "Keep the kitchen clean, organized, and up to health code standards",
      "Work with the General Manager to improve kitchen operations",
      "Handle any kitchen issues quickly and professionally during service",
    ],
  },
  {
    slug: "server",
    title: "Server",
    text: "Servers take care of guests from the moment they sit down to the moment they leave. They know the Jerk at Nite menu inside and out.",
    experience: "5+ Years",
    type: "Full Time | Part Time",
    location: allLocations,
    duties: [
      "Take food and drink orders accurately and clearly",
      "Bring food and drinks to the table in a timely manner",
      "Know the full Jerk at Nite menu and make confident recommendations",
      "Check on guests throughout their meal and resolve any issues quickly",
      "Process payments and thank guests sincerely as they leave",
      "Keep the dining area clean and ready between seatings",
    ],
  },
  {
    slug: "hostess",
    title: "Hostess",
    text: "Same role as Host. The Hostess is the face of Jerk at Nite and creates a great first impression for every single guest who walks in.",
    experience: "5+ Years",
    type: "Full Time",
    location: allLocations,
    duties: [
      "Welcome guests with a warm, friendly greeting upon arrival",
      "Seat guests based on party size and table availability",
      "Manage both reservations and walk-in guests at the same time",
      "Communicate table readiness clearly to the server team",
      "Keep the entrance area tidy, organized, and professional",
      "Handle any guest concerns at the door with care and professionalism",
    ],
  },
  {
    slug: "host",
    title: "Host",
    text: "The Host is the first person guests see when they walk in. They set the tone for the whole dining experience and make sure every guest feels welcome.",
    experience: "5+ Years",
    type: "Full Time | Part Time",
    location: allLocations,
    duties: [
      "Greet guests at the door and make them feel welcome",
      "Manage reservations, the waitlist and seating",
      "Communicate wait times clearly and keep guests updated",
      "Work with servers to keep tables turning smoothly",
      "Answer phone calls and help with pickup orders",
    ],
  },
  {
    slug: "food-truck-support",
    title: "Food Truck Support",
    text: "Food Truck Support staff keep the Jerk at Nite food trucks running smoothly. They work directly on the truck during events and service hours.",
    experience: "5+ Years",
    type: "Full Time | Part Time | Weekends",
    location: allLocations,
    duties: [
      "Set up and break down the food truck before and after each shift",
      "Take customer orders accurately and handle payments",
      "Serve food and drinks quickly and with great energy",
      "Keep the truck clean and organized during service",
      "Restock supplies and communicate low inventory to the manager",
      "Represent Jerk at Nite with a positive attitude at every event",
    ],
  },
];
