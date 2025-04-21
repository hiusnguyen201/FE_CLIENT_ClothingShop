import { useState } from "react";
import ProductCards from "../shop/productDetails/ProductCards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import productsData from "@/data/product.json";
import { Input } from "@/components/ui/input";

const SearchPage: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const filtered = productsData.filter(
    (p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase()) &&
      (category === "" || p.sub_category_id === category.toLocaleLowerCase())
  );
  const categories = ["Shirt", "Trousers", "Sơ Mi"];
  return (
    <div className="space-y-6 section__container">
      <h1 className="text-3xl font-bold">Sản phẩm</h1>
      <section className="section__container">
        <div className="mb-12 w-full flex flex-col justify-between md:flex-row gap-4 lg:w-120">
          <div className="">
            <Input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for products..."
              className="w-80 border-gray-500 rounded-md focus-visible:outline-none p-5"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-52 p-5 border-gray-500">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent className="bg-white border-none">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <h2 className="text-2xl font-semibold mt-6 text-gray-700 mb-10">Kết quả</h2>
        <div>
          {filtered.length === 0 ? (
            <div>
              <p className="section__subheader">Sorry, no result found!</p>
              <h4 className="text-lg font-normal">Other products</h4>
            </div>
          ) : (
            <ProductCards productsData={filtered} />
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
