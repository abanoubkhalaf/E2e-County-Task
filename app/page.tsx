import ItemsList from "@/components/items-list";
import { getItems } from "@/lib/get-Items";
import { Suspense } from "react";

export default async function Home() {
  const data = await getItems();

  return (
    <>
      <Suspense fallback={<div>Loading ....</div>}>
        <ItemsList items={data} />
      </Suspense>
    </>
  );
}
