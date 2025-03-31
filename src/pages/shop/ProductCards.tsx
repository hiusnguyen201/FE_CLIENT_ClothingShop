import { Product } from "@/models/Products";
import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "@/components/RatingStars";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/features/cart/cartSlice";

interface ProductCardsProps {
  productsData: Product[];
}

const ProductCards: React.FC<ProductCardsProps> = ({ productsData }) => {
  // const dispatch = useDispatch();

  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product));
  // };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {productsData.map((product, index) => (
        <div key={index} className="product__card">
          <div className="relative">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
              />
            </Link>
            <div className="absolute right-3 top-3 hover:block">
              <button
              // onClick={(e) => {
              //   e.stopPropagation();
              //   handleAddToCart(product);
              // }}
              >
                <i className="ri-shopping-cart-line bg-primary p-2 text-white hover:bg-primary-dark"></i>
              </button>
            </div>
          </div>

          {/* product desc */}
          <div className="product__card__content">
            <h4>{product.name}</h4>
            <p>
              ${product.price}{" "}
              {product?.oldPrice ? <s>${product?.oldPrice}</s> : null}
            </p>
            <RatingStars rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
