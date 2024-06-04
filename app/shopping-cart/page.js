import ShoppingCartList from "@/components/shopping-cart";
import { Suspense } from "react";

export const metadata = {
  title: "Shopping Cart",
  description: "Shopping cart description",
};
function ShoppingCartPage() {
  return <ShoppingCartList />;
}

export default ShoppingCartPage;
