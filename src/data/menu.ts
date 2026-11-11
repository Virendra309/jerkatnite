// Menu content. Prices are placeholders — replace them with the real menu.

export type MenuItem = { name: string; description: string; price?: string; tags?: string[] };
export type MenuSection = { title: string; items: MenuItem[] };

export const menu: MenuSection[] = [
  {
    title: "Signature Plates",
    items: [
      { name: "Jerk Chicken", description: "Our signature smoky jerk chicken, served with rice & peas and cabbage.", tags: ["Signature"] },
      { name: "Oxtail", description: "Slow-braised, fall-off-the-bone oxtail in rich brown gravy.", tags: ["Fan favorite"] },
      { name: "Jammin' Salmon", description: "Seared salmon glazed with island spices." },
      { name: "Curry Chicken", description: "Tender chicken simmered in Jamaican curry." },
    ],
  },
  {
    title: "Fusion",
    items: [
      { name: "Rasta Pasta", description: "Creamy, spicy pasta with peppers and your choice of jerk protein." },
      { name: "Jerk Tacos", description: "Jerk chicken tacos with slaw and house sauce." },
      { name: "Jerk Wings", description: "Crispy wings tossed in jerk seasoning.", tags: ["Spicy"] },
    ],
  },
  {
    title: "Sides",
    items: [
      { name: "Rice & Peas", description: "Coconut rice cooked with kidney beans and thyme." },
      { name: "Sweet Plantains", description: "Caramelized ripe plantains." },
      { name: "Mac & Cheese", description: "Baked, golden and cheesy." },
      { name: "Festival", description: "Sweet fried Jamaican dumplings." },
    ],
  },
];
