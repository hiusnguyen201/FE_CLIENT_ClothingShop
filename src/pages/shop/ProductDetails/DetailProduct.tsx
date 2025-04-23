import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const mockProduct = {
  name: "Men's Travel Shorts 7inch",
  price: 299000,
  originalPrice: 349000,
  discountPercent: 14,
  imageList: [
    "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2025/Thun_20.jpg",
    "https://images.unsplash.com/photo-1568251188392-ae32f898cb3b?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  totalReviews: 4,
  color: ["#ccc", "#222", "#007bff"],
  sizes: ["S", "M", "L", "XL", "2XL"],
};

const infoList = [
  { label: "MATERIAL", value: "92% Polyester 8% Spandex" },
  { label: "STYLE", value: "Regular\nLength 7 inches" },
  {
    label: "FIT",
    value: "Daily activities, beach travel, sports",
  },
  { label: "FEATURES", value: "Convenient side pockets" },
];

const highlights = [
  {
    title: "Fabric material",
    description: "Soft and elastic material, comfortable to wear",
    image: "https://mcdn.coolmate.me//image/March2025/quan-nam-travel-short-7-inch-thumb-3.jpg", // Thay ảnh bằng ảnh tương ứng
  },
  {
    title: "Logo",
    description: "Silicone logo material – flexible, durable, does not peel or fade over time",
    image: "https://mcdn.coolmate.me//image/March2025/quan-nam-travel-short-7-inch-thumb-3.jpg",
  },
  {
    title: "Style",
    description: "Dynamic, comfortable design, ideal for everyday activities and travel",
    image: "https://mcdn.coolmate.me//image/March2025/quan-nam-travel-short-7-inch-thumb-3.jpg",
  },
];

const ProductDetail: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState(mockProduct.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(mockProduct.color[0]);
  const [selectedImage, setSelectedImage] = useState(mockProduct.imageList[0]);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:mx-10 mx-5">
        {/* Left - Images */}
        <div className="flex gap-4 relative ml-10">
          <div className="flex flex-col gap-2 absolute w-15 top-5 left-5 lg:static">
            {mockProduct.imageList.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-20 rounded object-cover cursor-pointer transition-opacity duration-200 ${
                  selectedImage === img ? "opacity-100 border border-gray-200" : "opacity-60 hover:opacity-100"
                }`}
              />
            ))}
          </div>
          <div className="flex-1">
            <img src={selectedImage} className="rounded-xl w-full max-w-[500px] aspect-[3/4] object-cover" />
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="flex flex-col gap-4">
          <div className="space-x-2 ">
            <span className="link opacity-70">
              <Link to="/">Home</Link>
              <i className="ri-arrow-right-s-line"></i>
            </span>
            <span className="link opacity-70">
              <Link to={`/category/men-clothes`}>Men Clothes</Link>
              <i className="ri-arrow-right-s-line"></i>
            </span>
            <span className="link">
              <Link to={``} className="text-gray-900">
                {mockProduct.name}
              </Link>
            </span>
          </div>
          <h1 className="text-2xl font-bold">{mockProduct.name}</h1>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">{mockProduct.price.toLocaleString()}đ</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-orange-500 bg-orange-100 px-3 py-1 rounded-full">Freeship</span>
          </div>

          {/* Color Selection */}
          <div>
            <p className="mb-2 font-medium">
              Color: <span className="font-semibold">{selectedColor}</span>
            </p>
            <div className="flex gap-2">
              {mockProduct.color.map((color, i) => (
                <Badge
                  key={i}
                  defaultValue={selectedColor}
                  variant={selectedColor === color ? "default" : "outline"}
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? "2px solid black" : "none",
                  }}
                  className="w-8 h-8 rounded-4xl cursor-pointer"
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-4">
            <p className="mb-2 font-medium">Size:</p>
            <div className="flex flex-wrap gap-2">
              {mockProduct.sizes.map((size, i) => (
                <Button
                  key={i}
                  variant={selectedSize === size ? "outline" : "default"}
                  className="w-[48px] h-[44px]  font-semibold bg-gray-100 hover:bg-gray-200"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button className="mt-6 bg-gray-900 text-white w-full py-6 text-lg rounded-xl hover:bg-gray-800">
            Add to cart - Size: {selectedSize} - Color : {selectedColor}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:mx-10 mx-5 gap-10 mt-10">
        {/* Product info list */}
        <Card className="w-full">
          <h1 className="lg:text-4xl md:text-3xl text-2xl text-gray-700 text-center font-bold">Product description</h1>
          <CardContent className="p-6 space-y-4 text-sm text-gray-700">
            {infoList.map((info, idx) => (
              <div key={idx} className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">{info.label}</span>
                <span className="text-right whitespace-pre-line">{info.value}</span>
              </div>
            ))}
            <div className="pt-2 italic font-medium text-gray-800 text-sm">* Proudly Made In Vietnam</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {highlights.map((item, idx) => (
                <Card key={idx} className="overflow-hidden rounded-2xl border-none">
                  <div>
                    <img src={item.image} alt={item.title} className=" object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
