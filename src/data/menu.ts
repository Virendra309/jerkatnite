// Menu content, grouped into the tabs shown on the Menu page.
//
// "Lunch Time" items and descriptions are taken from the live jerkatnite.com menu.
// Descriptions ending in "…" were cut off in the reference — paste in the full text.
// The other tabs are placeholders: replace them with the real dishes and photos.

import { images } from "./site";

export type MenuItem = {
  name: string;
  description: string;
  image: string;
  /** Choices shown under "View More" (protein, sides…). */
  options?: string[];
  /** Heading above the options, and how many can be picked. */
  optionsLabel?: string;
  pick?: number;
};
export type MenuTab = { title: string; items: MenuItem[] };

export const menu: MenuTab[] = [
  {
    title: "Lunch Time",
    items: [
      {
        name: "Jerk Tacos",
        description: "2 big soft tacos filled with your choice of shredded meat, sautéed onions, peppers, and melted cheese.",
        image: images.tacos,
        options: ["Chicken", "Veggies", "Salmon", "Oxtail"],
        optionsLabel: "Choose your filling",
      },
      {
        name: "Kingston Kurry",
        description: "Slow cooked in rich flavorful curry sauce, with an array of herbs and spices. Chicken & Goat Options",
        image: images.catering1,
        options: ["Chicken", "Goat"],
        optionsLabel: "Choose your protein",
      },
      {
        name: "Alfredo Rasta Pasta",
        description:
          "Penne pasta tossed in extra virgin olive oil, housemade jerk Parmesan Alfredo sauce, fresh mozzarella, sautéed onions, and…",
        image: images.catering,
        options: ["Jerk Seasoned Chicken", "Oxtail", "Jerk Salmon & Chicken"],
        optionsLabel: "Choose your protein",
      },
      {
        name: "Slowly Braised Nanny Oxtails",
        description: "Tender oxtails braised low and slow in rich brown gravy with peppers, onions, garlic, thyme, scotch bonnet, and…",
        image: images.catering3,
      },
      {
        name: "Jerk Mac & Cheese",
        description: "Smoked Jerk Chicken, Seasoned Mac and Cheese, served with a slice of Soft Rasta Bread",
        image: images.catering1,
      },
      {
        name: "Jammin Salmon",
        description: "Jerk-Teriyaki sauteed 6 oz. Salmon Fillet served with Organic Scallions and Peppers. Comes with two side options…",
        image: images.catering,
        options: ["Cabbage", "Rice and Peas", "Ja'Mac & Cheese", "Plantains"],
        optionsLabel: "Pick two sides",
        pick: 2,
      },
    ],
  },
  {
    title: "Entrees",
    items: [
      { name: "Jerk Chicken", description: "Our signature smoky jerk chicken with rice & peas and cabbage.", image: images.catering1 },
      { name: "Curry Goat", description: "Tender goat slow-simmered in Jamaican curry.", image: images.catering },
      { name: "Rack of Lamb", description: "Jerk-seasoned lamb, grilled and served with two sides.", image: images.catering3 },
    ],
  },
  {
    title: "Little Tings",
    items: [
      { name: "Jerk Wings", description: "Crispy wings tossed in jerk seasoning.", image: images.wings },
      { name: "Sweet Plantains", description: "Caramelized ripe plantains.", image: images.catering2 },
      { name: "Festival", description: "Sweet fried Jamaican dumplings.", image: images.catering1 },
    ],
  },
  {
    title: "Desserts",
    items: [{ name: "Rum Cake", description: "Moist Caribbean rum cake.", image: images.catering3 }],
  },
];
