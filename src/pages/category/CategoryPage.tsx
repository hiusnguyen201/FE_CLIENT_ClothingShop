import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getCategory } from "@/redux/category/category.thunk";
import { searchProducts } from "@/redux/search/search.thunk";
// import { GetListParams } from "@/types/response";
import { setPage } from "@/redux/search/search.slice";
import ProductCards from "../shop/ProductDetails/ProductCards";

const subCategories = ["Jean", "Shirt", "Trousers"];
const sizes = ["S", "M", "L", "XL"];
const colorOptions = [
  { label: "Phối màu", value: "#ff0000", gradient: true },
  { label: "Đen", value: "#000" },
  { label: "Xám", value: "#808080" },
  { label: "Trắng", value: "#fff" },
];

// interface DataItem {
//   name: string;
//   createdAt: string;
// }

// interface ExtendedGetListParams<TData> extends GetListParams<TData> {
//   category?: string | undefined;
// }

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.categories);
  const { products, limit, page, totalCount } = useAppSelector((state) => state.searchProducts);
  // const [searchParams] = useSearchParams();

  // const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // const [formState, setFormState] = useState<ExtendedGetListParams<DataItem>>(() => {
  //   return {
  //     page: Number(searchParams.get("page")) || 1,
  //     limit: Number(searchParams.get("limit")) || 10,
  //     keyword: searchParams.get("keyword") || "",
  //     category: searchParams.get("category") || "",
  //     sortBy: (searchParams.get("sortBy") as "name" | "createdAt" | undefined) || "createdAt",
  //     sortOrder: (searchParams.get("sortOrder") as "asc" | "desc" | undefined) || "desc",
  //   };
  // });

  // const updateFormState = (field: keyof ExtendedGetListParams<DataItem>, value: string) => {
  //   setFormState(prev => ({ ...prev, [field]: value }));
  // };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  useEffect(() => {
    if (!categoryName) {
      return;
    }
    dispatch(getCategory(categoryName));
  }, [dispatch, categoryName]);

  useEffect(() => {
    if (!category) {
      return;
    }
    dispatch(searchProducts({ category: category.id }));
  }, [dispatch, category]);

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

  const totalPages = Math.ceil(totalCount / limit);

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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-5">
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
        <section className="md:col-span-3 lg:mr-5">
          <div className="space-x-2">
            <span className="link opacity-70">
              <Link to="/">Home</Link>
              <i className="ri-arrow-right-s-line"></i>
            </span>

            <span className="link">
              <Link to={`/category/${category?.slug}`} className="text-gray-900">
                {category?.name}
              </Link>
            </span>
          </div>
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
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <ProductCards productsData={products} />

          <div className="flex items-center justify-between bg-white px-4 mt-2 sm:px-6">
            <div className="flex flex-1 justify-between ">
              <p className="text-sm text-gray-500 text-center lg:block">
                Showing {Math.min((page - 1) * limit + 1, totalCount)}-{Math.min(page * limit, totalCount)} of {totalCount} products
              </p>
            </div>
            <div className="lg:items-center bg-white">
              <nav className="isolate inline-flex -space-x-px rounded-md " aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(Math.max(page - 1, 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <i className="ri-arrow-left-s-line text-sm"></i>
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === pageNumber
                      ? "bg-blue-600 text-white"
                      : "text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                      } focus:z-20 focus:outline-offset-0`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <i className="ri-arrow-right-s-line text-sm"></i>
                </button>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoryPage;
