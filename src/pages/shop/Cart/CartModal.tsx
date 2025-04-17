import { Button } from "@/components/ui/button";
import { Product } from "@/models/Products";
import React, { useState, useEffect } from "react";
import OrderSummary from "./OrderSumary";
// import OrderSummary from "./OrderSummary";

interface CartModalProps {
  isCartOpen: boolean;
  onClose: () => void;
  productsData: Product[];
}

const CartModal: React.FC<CartModalProps> = ({ isCartOpen, onClose, productsData }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => setShowAnimation(true), 3);
    } else {
      setShowAnimation(false);
    }
  }, [isCartOpen]);

  const [isDropdownMenuColor, setIsDropdownMenuColor] = useState<boolean>(false);
  const [isDropdownMenuSize, setIsDropdownMenuSize] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("White");
  const [selectedSize, setSelectedSize] = useState<string>("L");

  const handleToggleDropdownColor = () => {
    setIsDropdownMenuSize(false);
    setIsDropdownMenuColor(!isDropdownMenuColor);
  };

  const handleSelectColor = (option: string) => {
    setSelectedColor(option);
    setIsDropdownMenuColor(false);
  };

  const handleToggleDropdownSize = () => {
    setIsDropdownMenuColor(false);
    setIsDropdownMenuSize(!isDropdownMenuSize);
  };

  const handleSelectSize = (option: string) => {
    setSelectedSize(option);
    setIsDropdownMenuSize(false);
  };

  const sizeProduct = ["S", "M", "L", "Xl", "2Xl"];
  const colorProduct = ["White", "Black", "Green"];
  return (
    <div className="fixed inset-0 backdrop-blur-md transition-opacity z-[1000]" onClick={onClose}>
      {/* Modal chính */}
      <div
        className={`fixed right-0 w-full bg-white h-full overflow-y-auto transform transition-all duration-300 ease-in-out ${
          showAnimation ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col lg:flex-row-reverse gap-4 mt-5">
          <div className="items-center mb-4 w-full lg:w-1/2">
            <div className="flex justify-between mx-6">
              <h4 className="text-2xl font-semibold ">Your Cart</h4>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                <i className="ri-close-large-line p-2 ml-3 text-xl"></i>
              </button>
            </div>
            {/* cart product */}
            {productsData.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              <div>
                <div className="text-md text-gray-600 flex justify-between my-5 border-b border-gray-200 mx-6">
                  {/* header product */}
                  <div>
                    <input type="checkbox" className="w-4 h-4" />
                    <Button className="shadow-none p-4 text-md cursor-pointer">All Product</Button> |
                    <Button className="shadow-none p-4 text-md cursor-pointer">Clear</Button>
                  </div>
                  <span className="text-md">Quantity</span>
                  <span className="text-md ml-3">Price</span>
                </div>
                {/* product */}
                <div className="flex items-center justify-between border-b border-gray-200 py-4 gap-4 mx-6">
                  {/* Checkbox + Hình ảnh */}
                  <div className="flex items-center gap-4 ">
                    <input type="checkbox" className="size-4 mt-2 accent-primary" />
                    <div className="relative">
                      <img
                        src="https://media3.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/uploads/March2025/quan-nam-travel-short-7-inch-Xam_1.jpg"
                        alt="product"
                        className="w-40 h-40 rounded-md object-cover"
                      />
                      <span className="w-2.5 h-2.5 bg-purple-600 rounded-full absolute top-1 left-1"></span>
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className="flex flex-col justify-between">
                      <h4 className="font-medium text-md">Quần nam Travel Shorts 7inch</h4>
                      <p className="text-gray-500 text-sm">Xám / M</p>

                      <div className="flex items-center space-x-2 mt-2 relative">
                        {/* dropdown Color */}
                        <div
                          onClick={handleToggleDropdownColor}
                          className="flex items-center justify-between w-20 h-8 px-3 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                        >
                          <span>{selectedColor}</span>
                          <i
                            className={`ri-arrow-down-s-line transition-transform duration-300 ${
                              isDropdownMenuColor ? "rotate-180" : ""
                            }`}
                          ></i>
                        </div>

                        {isDropdownMenuColor && (
                          <div className="absolute z-10 w-34 origin-top-right top-10 rounded-2xl bg-white shadow-xl transition-all duration-300">
                            <ul className="py-2 text-md">
                              {colorProduct.map((option, index) => (
                                <li
                                  key={index}
                                  onClick={() => handleSelectColor(option)}
                                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                    option === selectedColor ? "bg-gray-100" : ""
                                  }`}
                                >
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {/* dropdown Size */}
                        <div
                          onClick={handleToggleDropdownSize}
                          className="flex items-center justify-between w-20 h-8 px-3 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                        >
                          <span>{selectedSize}</span>
                          <i
                            className={`ri-arrow-down-s-line transition-transform duration-300 ${
                              isDropdownMenuSize ? "rotate-180" : ""
                            }`}
                          ></i>
                        </div>

                        {isDropdownMenuSize && (
                          <div className="absolute z-10 w-34 left-0 origin-top-right top-10 rounded-2xl bg-white shadow-xl transition-all duration-300">
                            <ul className="py-2 text-md">
                              {sizeProduct.map((option, index) => (
                                <li
                                  key={index}
                                  onClick={() => handleSelectSize(option)}
                                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                    option === selectedColor ? "bg-gray-100" : ""
                                  }`}
                                >
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex items-center border rounded-full px-2 py-0.5 ml-5">
                          <button className="px-2 text-lg">-</button>
                          <span className="px-2">1</span>
                          <button className="px-2 text-lg">+</button>
                        </div>
                      </div>
                      <button className="flex items-center text-red-500 text-md hover:underline p-4">
                        <i className="ri-delete-bin-line mr-1 "></i> Xóa
                      </button>
                    </div>
                  </div>

                  {/* Giá và xóa */}
                  <div className="flex flex-col items-end justify-between h-full gap-2">
                    <p className="font-semibold text-lg">309.000đ</p>
                    <p className="line-through text-sm text-gray-400">349.000đ</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 py-4 gap-4 mx-6">
                  {/* Checkbox + Hình ảnh */}
                  <div className="flex items-center gap-4 ">
                    <input type="checkbox" className="size-4 mt-2 accent-primary" />
                    <div className="relative">
                      <img
                        src="https://media3.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/uploads/March2025/quan-nam-travel-short-7-inch-Xam_1.jpg"
                        alt="product"
                        className="w-40 h-40 rounded-md object-cover"
                      />
                      <span className="w-2.5 h-2.5 bg-purple-600 rounded-full absolute top-1 left-1"></span>
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className="flex flex-col justify-between">
                      <h4 className="font-medium text-md">Quần nam Travel Shorts 7inch</h4>
                      <p className="text-gray-500 text-sm">Xám / M</p>

                      <div className="flex items-center space-x-2 mt-2 relative">
                        {/* dropdown Color */}
                        <div
                          onClick={handleToggleDropdownColor}
                          className="flex items-center justify-between w-20 h-8 px-3 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                        >
                          <span>{selectedColor}</span>
                          <i
                            className={`ri-arrow-down-s-line transition-transform duration-300 ${
                              isDropdownMenuColor ? "rotate-180" : ""
                            }`}
                          ></i>
                        </div>

                        {isDropdownMenuColor && (
                          <div className="absolute z-10 w-34 origin-top-right top-10 rounded-2xl bg-white shadow-xl transition-all duration-300">
                            <ul className="py-2 text-md">
                              {colorProduct.map((option, index) => (
                                <li
                                  key={index}
                                  onClick={() => handleSelectColor(option)}
                                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                    option === selectedColor ? "bg-gray-100" : ""
                                  }`}
                                >
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {/* dropdown Size */}
                        <div
                          onClick={handleToggleDropdownSize}
                          className="flex items-center justify-between w-20 h-8 px-3 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                        >
                          <span>{selectedSize}</span>
                          <i
                            className={`ri-arrow-down-s-line transition-transform duration-300 ${
                              isDropdownMenuSize ? "rotate-180" : ""
                            }`}
                          ></i>
                        </div>

                        {isDropdownMenuSize && (
                          <div className="absolute z-10 w-34 left-0 origin-top-right top-10 rounded-2xl bg-white shadow-xl transition-all duration-300">
                            <ul className="py-2 text-md">
                              {sizeProduct.map((option, index) => (
                                <li
                                  key={index}
                                  onClick={() => handleSelectSize(option)}
                                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                    option === selectedColor ? "bg-gray-100" : ""
                                  }`}
                                >
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex items-center border rounded-full px-2 py-0.5 ml-5">
                          <button className="px-2 text-lg">-</button>
                          <span className="px-2">1</span>
                          <button className="px-2 text-lg">+</button>
                        </div>
                      </div>
                      <button className="flex items-center text-red-500 text-md hover:underline p-4">
                        <i className="ri-delete-bin-line mr-1 "></i> Xóa
                      </button>
                    </div>
                  </div>

                  {/* Giá và xóa */}
                  <div className="flex flex-col items-end justify-between h-full gap-2">
                    <p className="font-semibold text-lg">309.000đ</p>
                    <p className="line-through text-sm text-gray-400">349.000đ</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 py-4 gap-4 mx-6">
                  {/* Checkbox + Hình ảnh */}
                  <div className="flex items-center gap-4 ">
                    <input type="checkbox" className="size-4 mt-2 accent-primary" />
                    <div className="relative">
                      <img
                        src="https://media3.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/uploads/March2025/quan-nam-travel-short-7-inch-Xam_1.jpg"
                        alt="product"
                        className="w-40 h-40 rounded-md object-cover"
                      />
                      <span className="w-2.5 h-2.5 bg-purple-600 rounded-full absolute top-1 left-1"></span>
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className="flex flex-col justify-between">
                      <h4 className="font-medium text-md">Quần nam Travel Shorts 7inch</h4>
                      <p className="text-gray-500 text-sm">Xám / M</p>

                      <div className="flex items-center space-x-2 mt-2 relative">
                        {/* dropdown Color */}
                        <div
                          onClick={handleToggleDropdownColor}
                          className="flex items-center justify-between w-20 h-8 px-3 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                        >
                          <span>{selectedColor}</span>
                          <i
                            className={`ri-arrow-down-s-line transition-transform duration-300 ${
                              isDropdownMenuColor ? "rotate-180" : ""
                            }`}
                          ></i>
                        </div>

                        {isDropdownMenuColor && (
                          <div className="absolute z-10 w-34 origin-top-right top-10 rounded-2xl bg-white shadow-xl transition-all duration-300">
                            <ul className="py-2 text-md">
                              {colorProduct.map((option, index) => (
                                <li
                                  key={index}
                                  onClick={() => handleSelectColor(option)}
                                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                    option === selectedColor ? "bg-gray-100" : ""
                                  }`}
                                >
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {/* dropdown Size */}
                        <div
                          onClick={handleToggleDropdownSize}
                          className="flex items-center justify-between w-20 h-8 px-3 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                        >
                          <span>{selectedSize}</span>
                          <i
                            className={`ri-arrow-down-s-line transition-transform duration-300 ${
                              isDropdownMenuSize ? "rotate-180" : ""
                            }`}
                          ></i>
                        </div>

                        {isDropdownMenuSize && (
                          <div className="absolute z-10 w-34 left-0 origin-top-right top-10 rounded-2xl bg-white shadow-xl transition-all duration-300">
                            <ul className="py-2 text-md">
                              {sizeProduct.map((option, index) => (
                                <li
                                  key={index}
                                  onClick={() => handleSelectSize(option)}
                                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                    option === selectedColor ? "bg-gray-100" : ""
                                  }`}
                                >
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex items-center border rounded-full px-2 py-0.5 ml-5">
                          <button className="px-2 text-lg">-</button>
                          <span className="px-2">1</span>
                          <button className="px-2 text-lg">+</button>
                        </div>
                      </div>
                      <button className="flex items-center text-red-500 text-md hover:underline p-4">
                        <i className="ri-delete-bin-line mr-1 "></i> Xóa
                      </button>
                    </div>
                  </div>

                  {/* Giá và xóa */}
                  <div className="flex flex-col items-end justify-between h-full gap-2">
                    <p className="font-semibold text-lg">309.000đ</p>
                    <p className="line-through text-sm text-gray-400">349.000đ</p>
                  </div>
                </div>
              </div>
            )}
            <div>{productsData.length > 0 && <OrderSummary />}</div>
          </div>
          <div className="w-full lg:w-2/3">Thông tin đặt hàng</div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
