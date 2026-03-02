export type Product = {
  id: string;
  name: string;
  description: string;
  displayPrice: string;
  stripePriceId: string;
  tag: string;
};

export const products: Product[] = [
  {
    id: "curvy-faja-sculpt",
    name: "Curvy Faja Sculpt",
    description: "Compresion suave para uso diario y ajuste comodo.",
    displayPrice: "$39.99",
    stripePriceId: import.meta.env.STRIPE_PRICE_CURVY_FAJA_SCULPT ?? "",
    tag: "Best Seller",
  },
  {
    id: "sweet-bodysuit-lift",
    name: "Sweet Bodysuit Lift",
    description: "Moldea cintura y cadera con tela elastica premium.",
    displayPrice: "$49.99",
    stripePriceId: import.meta.env.STRIPE_PRICE_SWEET_BODYSUIT_LIFT ?? "",
    tag: "Nuevo",
  },
  {
    id: "curvy-set-rose",
    name: "Curvy Set Rose",
    description: "Set completo con acabado satinado y ajuste firme.",
    displayPrice: "$59.99",
    stripePriceId: import.meta.env.STRIPE_PRICE_CURVY_SET_ROSE ?? "",
    tag: "Oferta",
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
