import React, { useContext, useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from "../component/Title";
import { shopDataContext } from "./context/ShopContext";
import Card from "../component/Card";

function Collection() {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (showSearch && search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Apply sorting after filters
    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

 useEffect(() => {
  applyFilter();
}, [products, category, subCategory, search, showSearch, sortType]);


  return (
    <div className="w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden z-[2] pb-[110px]">
      {/* LEFT FILTER PANEL */}
      <div
        className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] ${
          showFilter ? "h-[45vh]" : "h-[8vh]"
        } p-[20px] border-r-[1px] border-gray-400 text-[#aaf5fa] lg:fixed`}
      >
        <p
          className="text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
          {!showFilter ? (
            <FaChevronRight className="text-[18px] md:hidden" />
          ) : (
            <FaChevronDown className="text-[18px] md:hidden" />
          )}
        </p>

        {/* CATEGORY FILTER */}
        <div
          className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa]">CATEGORIES</p>
          {["Men", "Women", "Kids"].map((cat) => (
            <label key={cat} className="flex gap-2 text-[16px] font-light">
              <input
                type="checkbox"
                value={cat}
                className="w-3"
                onChange={toggleCategory}
              />
              {cat}
            </label>
          ))}
        </div>

        {/* SUBCATEGORY FILTER */}
        <div
          className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa]">SUB-CATEGORIES</p>
          {["TopWear", "BottomWear", "WinterWear"].map((sub) => (
            <label key={sub} className="flex gap-2 text-[16px] font-light">
              <input
                type="checkbox"
                value={sub}
                className="w-3"
                onChange={toggleSubCategory}
              />
              {sub}
            </label>
          ))}
        </div>
      </div>

      {/* RIGHT COLLECTION DISPLAY */}
      <div className="lg:pl-[20%] md:py-[10px]">
        <div className="md:w-[80vw] w-[100vw] flex justify-between flex-col lg:flex-row lg:px-[50px]">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-white rounded-lg border-[2px]"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevance</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        <div className="lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]">
          {filteredProducts.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
