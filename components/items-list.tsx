"use client";

import { LIST_ITEM, LIST } from "@/types";
import React, { useEffect, useState } from "react";
import Item from "./item";
import { usePathname } from "next/navigation";

export default function ItemsList({ items }: LIST) {
  const [userInput, setUserInput] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sort, setSort] = useState("");
  const [sortedAndFilteredData, setSortedAndFilteredData] = useState<
    LIST_ITEM[]
  >([]);
  const pathURL = usePathname();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSortedAndFilteredData(
      items.filter((item) => item.name.toLowerCase().includes(inputValue))
    );
    setUserInput(inputValue);
  };
  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    if (sortValue === "price") {
      setSortedAndFilteredData(
        sortedAndFilteredData.length > 0
          ? [...sortedAndFilteredData].sort((a, b) => a.price - b.price)
          : [...items].sort((a, b) => a.price - b.price)
      );
    } else if (sortValue === "name") {
      setSortedAndFilteredData(
        sortedAndFilteredData.length > 0
          ? sortedAndFilteredData.sort((a, b) => a.name.localeCompare(b.name))
          : [...items].sort((a, b) => a.name.localeCompare(b.name))
      );
    }

    setSort(sortValue);
  };
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = parseFloat(event.target.value) || 0; // Ensure valid number or default to 0
    setMinPrice(newMinPrice);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = parseFloat(event.target.value) || Infinity;
    setMaxPrice(newMaxPrice);
  };

  const HandleFilterPricByRange = () => {
    setSortedAndFilteredData(
      sortedAndFilteredData.length > 0
        ? sortedAndFilteredData.filter(
            (item) => item.price >= minPrice && item.price <= maxPrice
          )
        : items.filter(
            (item) => item.price >= minPrice && item.price <= maxPrice
          )
    );
  };

  useEffect(() => {
    HandleFilterPricByRange();
  }, [minPrice, maxPrice]);

  return (
    <div className="flex flex-col gap-3 p-2 ">
      {!pathURL.startsWith("/shopping-cart") && (
        <>
          <div className="">
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-black"
            >
              First name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search By Name"
              value={userInput}
              onChange={handleChange}
            />
            <label
              htmlFor="sortby"
              className="block my-1 text-sm font-medium text-black"
            >
              Select an option
            </label>
            <select
              id="sortby"
              name="sortby"
              value={sort}
              onChange={handleSort}
              className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose a sort</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div className="flex justify-between items-center gap-3 flex-col sm:flex-row">
            <div>
              <label
                htmlFor="Filter by Min Price"
                className="block  text-sm font-medium text-black mb-1"
              >
                Minimum Price
              </label>
              <input
                type="number"
                id="minimumPrice"
                name="minimumPrice"
                value={minPrice}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Minimum Price"
                onChange={handleMinPriceChange}
              />
            </div>
            <div>
              <label
                htmlFor="Filter by Max Price"
                className="block  text-sm font-medium text-black mb-1"
              >
                Maximum Price
              </label>
              <input
                type="number"
                id="maximumPrice"
                name="maximumPrice"
                value={maxPrice}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Maximum Price"
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
        </>
      )}
      {sortedAndFilteredData?.length > 0
        ? sortedAndFilteredData?.map((item: LIST_ITEM) => (
            <Item item={item} key={item.id} />
          ))
        : items?.map((item: LIST_ITEM) => {
            return <Item item={item} key={item.id} />;
          })}
    </div>
  );
}
