import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useParams } from "react-router-dom";
import { Product } from "@/types/products";
import ProductCards from "@/pages/shop/productDetails/ProductCards";

import productsData from "@/data/product.json";
import SubCategories from "@/pages/subCategory/FilterCategories";
import EmptyProducts from "@/components/EmptyProducts";

const subSubCategories = [
  {
    name: "Shirt Tanktop",
    category: "men-clothes",
    subSubCategory: "shirt-tanktop",
    image: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image-ao-thun-1_18.jpg",
  },
  {
    name: "Shirt Polo",
    category: "men-clothes",
    subSubCategory: "shirt-polo",
    image: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image-ao-thun-1_18.jpg",
  },
];
const sizes = ["S", "M", "L", "XL"];
const colorOptions = [
  { label: "Phối màu", value: "#ff0000", gradient: true },
  { label: "Đen", value: "#000" },
  { label: "Xám", value: "#808080" },
  { label: "Trắng", value: "#fff" },
  { label: "Be", value: "#f5f5dc" },
  { label: "Xanh lam", value: "#0000cd" },
  { label: "Xanh lá", value: "#2e8b57" },
  { label: "Xanh ngọc", value: "#40e0d0" },
  { label: "Đỏ", value: "#b22222" },
  { label: "Cam", value: "#ff8c00" },
  { label: "Vàng", value: "#ffff00" },
  { label: "Tím", value: "#9370db" },
  { label: "Nâu", value: "#8b4513" },
  { label: "Hồng", value: "#ff69b4" },
  { label: "Xanh sáng", value: "#87cefa" },
  { label: "Xanh đậm", value: "#001f3f" },
  { label: "Đen xám", value: "#2f2f2f" },
];

const SubCategoryPage: React.FC = () => {
  const { subCategoryName, categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSubSubs, setSelectedSubSubs] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    const filtered = (productsData as Product[]).filter(
      (product) => product.sub_category_id === subCategoryName?.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [subCategoryName]);

  const toggleSubSub = (sub: string) => {
    setSelectedSubSubs((prev) =>
      prev.includes(sub.toLowerCase()) ? prev.filter((s) => s !== sub.toLowerCase()) : [...prev, sub.toLowerCase()]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  };

  const filter = filteredProducts.filter((product) => {
    const matchSub =
      selectedSubSubs.length === 0 || selectedSubSubs.includes(product?.sub_sub_category_id.toLowerCase());
    const matchSize = selectedSizes.length === 0 || product.sizes?.some((size: string) => selectedSizes.includes(size));
    const matchColor =
      selectedColors.length === 0 || product.colors?.some((color: string) => selectedColors.includes(color));
    return matchSub && matchSize && matchColor;
  });

  const sortedProducts = [...filter].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "best-selling":
        return (b.total_sold || 0) - (a.total_sold || 0);
      case "newest":
      default:
        return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
    }
  });

  return (
    <div className="my-5">
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="text-sm flex justify-between bg-gray-100 hover:bg-gray-200 p-4 min-w-40 rounded-4xl "
        >
          <span> Filter Product</span>
          <i className="ri-equalizer-2-line"></i>
        </Button>
      </div>
      {sortedProducts.length >= 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-5">
          {/* Sidebar Filter as Dropdown Accordion */}
          <aside className={cn("space-y-6 md:block", showMobileFilter ? "block" : "hidden", "md:col-span-1 ")}>
            <Accordion
              type="multiple"
              className="w-full space-y-4 divide-y divide-gray-200"
              defaultValue={["subSubCategory"]}
            >
              {/* sub subcategory */}
              <AccordionItem value="subSubCategory">
                <AccordionTrigger className="bg-white text-gray-500 mx-5">Product group</AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="space-y-2">
                    {subSubCategories.map((sub, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Checkbox
                          checked={selectedSubSubs.includes(sub.subSubCategory.toLowerCase())}
                          onCheckedChange={() => toggleSubSub(sub.subSubCategory)}
                          id={`sub-${i}`}
                        />
                        <Label htmlFor={`sub-${i}`}>{sub.name.toUpperCase()}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* size */}
              <AccordionItem value="size">
                <AccordionTrigger className="bg-white text-gray-500 mx-5">Sizes</AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="space-y-2">
                    {sizes.map((size, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Checkbox
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={() => toggleSize(size)}
                          id={`size-${i}`}
                        />
                        <Label htmlFor={`size-${i}`}>{size}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* color */}
              <AccordionItem value="color">
                <AccordionTrigger className="bg-white text-gray-500 px-5">Colors</AccordionTrigger>
                <AccordionContent className="py-1">
                  <div className="grid grid-cols-4 gap-3">
                    {colorOptions.map(({ label, value, gradient }, i) => (
                      <div key={i} className="flex flex-col items-center text-center gap-1">
                        <Badge
                          onClick={() => toggleColor(value)}
                          className={cn(
                            "w-7 h-7 rounded-full cursor-pointer border border-gray-300",
                            selectedColors.includes(value) ? "ring-2 ring-black" : ""
                          )}
                          style={{
                            background: gradient ? "linear-gradient(45deg, red, yellow, green, blue)" : value,
                          }}
                        />
                        <span className="text-xs text-gray-700">{label}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </aside>

          {/* Main Product Grid */}

          <section className="md:col-span-3 lg:mr-5">
            <div className="space-x-2">
              <span className="link opacity-70">
                <Link to="/">Home</Link>
                <i className="ri-arrow-right-s-line"></i>
              </span>
              <span className="link opacity-70">
                <Link to={`/category/${categoryName}`}>Men Clothes</Link>
                <i className="ri-arrow-right-s-line"></i>
              </span>
              <span className="link">
                <Link to={`/category/${categoryName}`} className="text-gray-900">
                  {filteredProducts.length} {subCategoryName}
                </Link>
              </span>
            </div>
            <h1 className="uppercase lg:text-4xl md:text-3xl text-2xl font-bold text-gray-700 border-b border-gray-100 py-10">
              {subCategoryName}
            </h1>
            <div className="w-full overflow-x-auto flex h-72">
              {subSubCategories.map((ss, i) => (
                <SubCategories
                  key={i}
                  name={ss.name}
                  image={ss.image}
                  subSubCategory={ss.subSubCategory}
                  category={categoryName}
                  toggleSubSub={toggleSubSub}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{filter.length} result</h2>
              {/* Top sort bar */}
              <div className="flex justify-start mb-4 mt-5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium border-gray-100">Sort By</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] ">
                      <SelectValue placeholder="Sắp xếp theo" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-100">
                      <SelectItem value="newest">Newest </SelectItem>
                      <SelectItem value="best-selling">Best Selling</SelectItem>
                      <SelectItem value="price-asc">Price Asc</SelectItem>
                      <SelectItem value="price-desc">Price Desc</SelectItem>
                      <SelectItem value="discount-desc">%Discount Desc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <ProductCards productsData={sortedProducts} />
          </section>
        </div>
      ) : (
        <EmptyProducts />
      )}
    </div>
  );
};

export default SubCategoryPage;
