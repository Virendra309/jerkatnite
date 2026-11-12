// Catering menu & pricing, copied from the live jerkatnite.com/catering page.
// `price: null` = no price was visible in the reference; the card shows "Ask for price".
// `image: null` = shows the J logo placeholder (no matching photo yet; add one later).

import { images } from "./site";

export type CateringPrice = { label: string; price: string | null };
export type CateringItem = { id: string; name: string; description?: string; image: string | null; prices: CateringPrice[] };
export type CateringTab = { title: string; items: CateringItem[] };

const tray = (full: string | null, half?: string | null): CateringPrice[] =>
  half === undefined ? [{ label: "Full Tray", price: full }] : [
    { label: "Full Tray", price: full },
    { label: "Half Tray", price: half },
  ];
const MARKET = "Market Price";

export const catering: CateringTab[] = [
  {
    title: "Entrees",
    items: [
      { id: "curry-goat", name: "Curry Goat", image: images.catering, prices: tray("$320", "$175") },
      { id: "bbq-jerk-chicken", name: "Barbecue Jerk Chicken", description: "Tangy-sweet jerk BBQ glaze", image: null, prices: tray("$145", "$85") },
      { id: "rack-of-lamb", name: "Roasted Rack of Lamb", description: "7-day notice required", image: null, prices: tray(MARKET, MARKET) },
      { id: "rasta-salmon", name: "Rasta Pasta w/ Salmon", description: "Creamy pasta topped with seared salmon", image: null, prices: tray("$255", "$140") },
      { id: "rasta-chicken", name: "Rasta Pasta w/ Chicken", description: "Classic Rasta Pasta topped with jerk chicken", image: null, prices: tray("$160", "$105") },
      { id: "rasta-veg", name: "Rasta Pasta (Vegetarian)", description: "Creamy, cheesy, and loaded with fresh vegetables", image: null, prices: tray("$135", "$85") },
      { id: "whole-snapper", name: "Whole Snapper (Escovitch)", description: "Fried whole red snapper with escovitch sauce (7-day notice)", image: null, prices: tray("$290", "$175") },
      { id: "jerk-salmon", name: "Jerk Salmon", description: "Grilled salmon fillet", image: null, prices: tray("$250", "$130") },
      { id: "oxtail", name: "Oxtail", description: "Braised in rich brown sauce, slow-cooked tender", image: null, prices: tray(MARKET, MARKET) },
      { id: "smoked-jerk-chicken", name: "Smoked Jerk Chicken", description: "Our signature dish, slow-smoked and marinated overnight", image: images.wings, prices: tray("$145", "$85") },
      { id: "kingston-curry-chicken", name: "Kingston Curry Chicken", description: "Tangy-sweet jerk BBQ glaze", image: images.catering, prices: tray("$165", "$105") },
      { id: "brown-stew-chicken", name: "Brown Stew Chicken", description: "Savory brown gravy with herbs and spices", image: images.catering1, prices: tray("$150", "$90") },
    ],
  },
  {
    title: "Sides",
    items: [
      { id: "jammin-salmon-salad", name: "Jammin' Salmon Salad", description: "Fresh smokey jerk salmon with salad", image: null, prices: tray(null) },
      { id: "jerk-chicken-salad", name: "Jerk Chicken Salad", description: "Garden salad topped with jerk chicken", image: null, prices: tray(null) },
      { id: "island-garden-salad", name: "Island Garden Salad", description: "Fresh island-style garden salad", image: null, prices: tray(null) },
      { id: "cabbage-medley", name: "Cabbage Medley", description: "Sauteed cabbage with carrots and bell peppers", image: null, prices: tray(null) },
    ],
  },
  {
    title: "Appetizers",
    items: [
      { id: "wingettes", name: "Jerk Chicken Wingettes", description: "Smoked, seasoned, and perfectly crisp", image: null, prices: tray(null) },
      { id: "coco-bread", name: "Coco Bread", description: "Soft, buttery, and fresh-baked", image: null, prices: tray(null) },
      { id: "spinach-patties", name: "Vegetarian Spinach Patties", description: "Vegetarian spinach patties (5-day notice)", image: null, prices: tray(null) },
      { id: "beef-patties", name: "Beef Patties", description: "Classic Jamaican patties.", image: null, prices: tray(null) },
    ],
  },
  {
    title: "Desserts",
    items: [
      { id: "rum-cake", name: "Whole 10 Inch Vanilla Rum Cake", description: "Serves approximately 10–12 people", image: images.catering3, prices: [{ label: "Whole Cake", price: null }] },
    ],
  },
  {
    title: "Beverages",
    items: [
      { id: "pineapple-ginger", name: "Pineapple Ginger", description: "Freshly made, 3-day notice required", image: null, prices: [{ label: "Per Gallon", price: null }] },
      { id: "rum-punch", name: "Rum Punch (Made with Appleton Rum)", description: "Serves approximately 12–14 guests", image: null, prices: [{ label: "Per Batch", price: null }] },
    ],
  },
  {
    title: "Services",
    items: [
      { id: "buffet", name: "Buffet Package", description: "Contact us for a custom quote", image: null, prices: [{ label: "Package", price: "Custom quote" }] },
      { id: "food-truck", name: "Food Truck Rental (Contact for Quote)", description: "Minimum hours may apply — contact us for availability", image: null, prices: [{ label: "Rental", price: "Custom quote" }] },
    ],
  },
];
