import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductCards from "@/pages/shop/productDetails/ProductCards";
import { Product } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getCategory } from "@/redux/category/category.thunk";
import { searchProducts } from "@/redux/search/search.thunk";
import { GetListParams } from "@/types/response";

const subCategories = ["Jean", "Shirt", "Trousers", "Áo Polo", "Quần Lót"];
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

interface DataItem {
  name: string;
  createdAt: string;
}

interface ExtendedGetListParams<TData> extends GetListParams<TData> {
  category?: string | undefined;
}

const CollectionPage: React.FC = () => {
  const { collectionName } = useParams<{ collectionName?: string }>();
  const dispatch = useAppDispatch();
  const { category, loading: categoryLoading } = useAppSelector((state) => state.categories);
  const { products, loading: productsLoading } = useAppSelector((state) => state.searchProducts);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [formState, setFormState] = useState<ExtendedGetListParams<DataItem>>(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      keyword: searchParams.get("keyword") || "",
      category: searchParams.get("category") || "",
      sortBy: (searchParams.get("sortBy") as "name" | "createdAt" | undefined) || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc" | undefined) || "desc",
    };
  });

  const updateFormState = (field: keyof ExtendedGetListParams<DataItem>, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!collectionName) {
      return;
    }
    dispatch(getCategory(collectionName));
  }, [dispatch, collectionName]);

  useEffect(() => {
    if (!category) {
      setFilteredProducts([]);
      return;
    }
    dispatch(searchProducts({ category: category.id }));
  }, [dispatch, category]);

  useEffect(() => {
    if (category) {
      const filtered = (products as Product[]).filter((product) => product.category.id === category.id);
      setFilteredProducts(filtered);
    }
  }, [products, category]);

  const toggleSub = (sub: string) => {
    setSelectedSubs((prev) =>
      prev.includes(sub.toLowerCase()) ? prev.filter((s) => s !== sub.toLowerCase()) : [...prev, sub.toLowerCase()]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  };

  // const filter = filteredProducts.filter((product) => {
  //   const matchSub = selectedSubs.length === 0 || selectedSubs.includes(product.sub_category_id.toLowerCase());
  //   const matchSize = selectedSizes.length === 0 || product.sizes?.some((size: string) => selectedSizes.includes(size));
  //   const matchColor =
  //     selectedColors.length === 0 || product.colors?.some((color: string) => selectedColors.includes(color));
  //   return matchSub && matchSize && matchColor;
  // });

  // const sortedProducts = [...filter].sort((a, b) => {
  //   switch (sortBy) {
  //     case "price-asc":
  //       return a.price - b.price;
  //     case "price-desc":
  //       return b.price - a.price;
  //     case "discount-desc":
  //       return (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice;
  //     case "best-selling":
  //       return (b.total_sold || 0) - (a.total_sold || 0);
  //     case "newest":
  //     default:
  //       return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
  //   }
  // });

  return (
    <div className="p-4">
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filter as Dropdown Accordion */}
        <aside className={cn("space-y-6 md:block", showMobileFilter ? "block" : "hidden", "md:col-span-1 ")}>
          <Accordion
            type="multiple"
            className="w-full space-y-4 divide-y divide-gray-200"
            defaultValue={["subCategory"]}
          >
            <AccordionItem value="subCategory">
              <AccordionTrigger className="bg-white text-gray-500 mx-5">Product group</AccordionTrigger>
              <AccordionContent className="px-4">
                <div className="space-y-2">
                  {subCategories.map((sub, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Checkbox
                        checked={selectedSubs.includes(sub.toLowerCase())}
                        onCheckedChange={() => toggleSub(sub)}
                        id={`sub-${i}`}
                      />
                      <Label htmlFor={`sub-${i}`}>{sub.toUpperCase()}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

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
        <section className="md:col-span-3">
          <Link to="/" className="text-gray-500 ">
            Home /{" "}
            <span className="text-md text-gray-800">
              {products.length} {category?.name}
            </span>
          </Link>
          <h1 className="uppercase lg:text-4xl md:text-3xl text-2xl font-bold text-gray-700 border-b border-gray-100 py-10">
            {category?.name}
          </h1>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{products.length} result</h2>
            {/* Top sort bar */}
            <div className="flex justify-start mb-4 mt-5">
              <div className="flex items-center gap-2 ">
                <span className="text-sm font-medium border-gray-100">Sort By</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] ">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-100">
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="best-selling">Bán chạy</SelectItem>
                    <SelectItem value="price-asc">Giá thấp đến cao</SelectItem>
                    <SelectItem value="price-desc">Giá cao đến thấp</SelectItem>
                    <SelectItem value="discount-desc">%Giảm giá nhiều</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <ProductCards productsData={products} />
        </section>
      </div>
    </div>
  );
};

export default CollectionPage;
