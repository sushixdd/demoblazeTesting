// not 100% sure if types are needed, but were implemented when I ran into some issues
// something did not work without types, worked after types were implemented and seemingly kept working without them

type selectorsNavbar = {
  signUp: string;
  logIn: string;
  cart: string;
  aboutUs: string;
  contact: string;
  home: string;
  productStore: string;
};

type selectorCategories = {
  header: string;
  phones: string;
  laptops: string;
  monitors: string;
};

type selectorFooter = {
  footer: string;
  aboutUs: string;
  contact: string;
  productStore: string;
  footerCopyright: string;
};

// selectors for Navbar
export const selectorsNavbar = {
  signUp: "#signin2",
  logIn: "#login2",
  cart: "#cartur",
  aboutUs: '[data-target="#videoModal"]', // missing id
  contact: '[data-target="#exampleModal"]', // missing id
  home: '[class="nav-link"],[href="index.html"]', // missing id, not sure how to properly construct selector for Home
  productStore: "#nava", // top left icon
};

// selectors for Product Categories
// all categories share id="itemc", I'd prefer unique IDs
export const selectorCategories = {
  header: "#cat",
  phones: `[onclick="byCat('phone')"]`,
  notebooks: `[onclick="byCat('notebook')"]`,
  monitors: `[onclick="byCat('monitor')"]`,
};

// selectors for Footer
export const selectorFooter = {
  footer: "#footc",
  aboutUs: "h4.grrrr", // yes, the class is correct
  contact: "h4.grrrr", // i'd prefer unique id or at least unique class name
  productStore: 'img[src="bm.png"]',
  footerCopyright: "footer",
};
