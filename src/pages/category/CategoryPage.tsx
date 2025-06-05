import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getCategory } from "@/redux/category/category.thunk";
import ProductCards from "@/pages/shop/ProductDetails/ProductCards";
import Pagination from "@/components/Pagination";
import { getListProduct } from "@/redux/product/product.thunk";
import { SortByValue, SortOrderValue } from "@/types/response";
import { getValidSortBy, getValidSortOrder } from "@/utils/product";
import EmptyProducts from "@/components/EmptyProducts";
import { LoadingCenter } from "@/components/LoadingCenter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// const subCategories = ["Jean", "Shirt", "Trousers"];
// const sizes = ["S", "M", "L", "XL"];
// const colorOptions = [
//   { label: "Phối màu", value: "#ff0000", gradient: true },
//   { label: "Đen", value: "#000" },
//   { label: "Xám", value: "#808080" },
//   { label: "Trắng", value: "#fff" },
// ];

interface SearchFormState {
  page: number;
  limit: number;
  sortBy?: SortByValue;
  sortOrder?: SortOrderValue;
}

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { category, loading: categoryLoading } = useAppSelector((state) => state.categories);
  const { list, loading: productLoading, totalCount } = useAppSelector((state) => state.product);

  // const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  // const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  // const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  // const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [formState, setFormState] = useState<SearchFormState>(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      sortBy: getValidSortBy(searchParams.get("sortBy")),
      sortOrder: getValidSortOrder(searchParams.get("sortOrder")),
    }
  });

  useEffect(() => {
    if (!slug) return;
    dispatch(getCategory({ id: slug }));
  }, [slug]);

  useEffect(() => {
    if (!category?.id) return;

    const params = new URLSearchParams();
    if (formState.sortBy) params.set("sortBy", formState.sortBy);
    if (formState.sortOrder) params.set("sortOrder", formState.sortOrder);
    if (formState.page) params.set("page", formState.page.toString());
    if (formState.limit) params.set("limit", formState.limit.toString());

    setSearchParams(params);

    dispatch(getListProduct({
      ...formState,
      category: category.id
    }));
  }, [formState, category?.id]);


  if (!category && !categoryLoading.getCategory) {
    navigate("/404", { replace: true });
    return
  }

  // const toggleSub = (sub: string) => {
  //   setSelectedSubs((prev) =>
  //     prev.includes(sub.toLowerCase()) ? prev.filter((s) => s !== sub.toLowerCase()) : [...prev, sub.toLowerCase()]
  //   );
  // };

  // const toggleSize = (size: string) => {
  //   setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  // };

  // const toggleColor = (color: string) => {
  //   setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  // };

  const updateFormState = (field: keyof SearchFormState, value: string | number) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (newPage: number) => {
    updateFormState("page", newPage);
  };

  const totalPages = Math.ceil(totalCount / formState.limit);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* Mobile Filter Button */}
      {/* <div className="md:hidden">
        <Button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="text-sm"
        >
          <span>Filter Product</span>
        </Button>
      </div> */}

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Filter as Dropdown Accordion */}
        {/* <aside className={cn("space-y-6 md:block", showMobileFilter ? "block" : "hidden", "md:col-span-1 ")}>
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
        </aside> */}

        {/* Main Product */}
        <div className="w-full space-y-4">
          <Breadcrumb className="p-0 m-0">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/category/${category?.slug}`}>{category?.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{totalCount} {category?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="uppercase text-2xl font-bold border-b">
            {category?.name}
          </h1>

          <div className="flex justify-between items-center ">
            <p className="text-sm font-bold">
              {list.length} result
            </p>

            <div className="flex items-center gap-2 ">
              <div className="text-sm">Sort By</div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          {productLoading.getListProduct || categoryLoading.getCategory ? (
            <LoadingCenter />
          ) : (
            <>
              {list.length &&
                <>
                  <ProductCards productsData={list} />

                  <Pagination
                    currentPage={formState.page}
                    totalPages={totalPages}
                    totalCount={totalCount}
                    limit={formState.limit}
                    onPageChange={handlePageChange}
                  />
                </>
              }
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default CategoryPage;
