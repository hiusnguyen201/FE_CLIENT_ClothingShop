import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { colorMap } from "@/types/color";
import { ProductOption, ProductVariant } from "@/types/product";
import { mapOptionsToState } from "@/utils/product";
import clsx from "clsx";
import { useState, useMemo, useEffect } from "react";

interface ProductVariantsPickerProps {
  productOptions: ProductOption[];
  productVariants: ProductVariant[];
  setSelectedVariant: React.Dispatch<React.SetStateAction<ProductVariant | null>>;
}

const ProductVariantsPicker: React.FC<ProductVariantsPickerProps> = ({
  productOptions,
  productVariants,
  setSelectedVariant,
}) => {
  const [selected, setSelected] = useState<Record<string, string>>(() => mapOptionsToState(productOptions));

  const handleSelect = (optionName: string, valueName: string) => {
    setSelected((prev) => ({ ...prev, [optionName]: valueName }));
  };

  const selectedVariant = useMemo(() => {
    const entries = Object.entries(selected);
    if (!entries.length) return null;

    return productVariants.find((variant) =>
      entries.every(([opt, val]) =>
        variant.variantValues.some((v) => v.option.name === opt && v.optionValue.valueName === val)
      )
    );
  }, [selected, productVariants]);

  useEffect(() => {
    if (!selectedVariant) return;
    setSelectedVariant(selectedVariant);
  }, [selectedVariant, setSelectedVariant]);

  console.log(selected);

  return (
    <div className="space-y-4">
      {productOptions.map(({ option, optionValues }) => (
        <div key={option.id}>
          <h4 className="font-medium mb-2">{option.name}: </h4>
          <div className="flex flex-wrap gap-2">
            {optionValues.map((v) => {
              const isSelected = selected[option.name] === v.valueName;

              if (option.name === "Color") {
                return (
                  <Badge
                    key={v.id}
                    variant={"none"}
                    className={clsx("w-12 h-7 rounded-full cursor-pointer", isSelected && "ring-2 ring-offset-1")}
                    style={{
                      backgroundColor: colorMap[v.valueName],
                    }}
                    onClick={() => handleSelect(option.name, v.valueName)}
                  />
                );
              } else {
                return (
                  <Button
                    key={v.id}
                    onClick={() => handleSelect(option.name, v.valueName)}
                    className={clsx(
                      "px-8 py-4 border rounded-xl hover:bg-black hover:text-white",
                      isSelected ? "bg-black text-white" : "bg-neutral-300 text-neutral-600"
                    )}
                  >
                    {v.valueName}
                  </Button>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductVariantsPicker;
