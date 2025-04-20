import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { ProductBadge } from "@/components/productSlice/ProductBadge";
import { ColorBadge } from "@/components/productSlice/ColorBadge";
import { Product } from "@/types/products";
import { Button } from "@/components/ui/button";

interface ProductCardItemProps {
  product: Product;
}

const ProductCardItem: React.FC<ProductCardItemProps> = ({ product }) => {
  const controls = useAnimation();

  const handleHoverStart = () => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    });
  };

  const handleHoverEnd = () => {
    controls.start({
      y: 12,
      opacity: 0,
      transition: { duration: 0.3 },
    });
  };

  return (
    <div className="product__card">
      <motion.div className="relative" onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd}>
        <div className="absolute z-2 right-2 left-2 top-2 flex items-center justify-end flex-wrap gap-1">
          {product.discount && <ProductBadge title={product.discount} className="md:hidden flex " />}
          {product.isNew && <ProductBadge title="NEW" />}
        </div>
        <Link className="relative block" to={`/shop/${product._id}`}>
          <img src={product.image} alt="" className="object-cover rounded-lg h-full mb-2 w-full aspect-[3/4]" />
        </Link>
        <motion.div
          animate={controls}
          initial={{ y: 12, opacity: 0 }}
          style={{
            background: "linear-gradient(0deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1)), hsla(0, 0%, 100%, .4)",
          }}
          className="absolute p-3 mx-auto h-auto backdrop-blur-sm bottom-6 left-6 right-6 rounded md:block hidden"
        >
          <p className="text-sx mb-2 text-center font-normal">Thêm vào giỏ hàng +</p>
          <div className="flex flex-wrap gap-1">
            {(product.sizes || ["S", "M", "L", "XL", "2XL"]).map((size, i) => (
              <Button key={i} className=" mt-2 hover:bg-gray-300 bg-white w-[40px] h-[38px]">
                {size}
              </Button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col min-h-[94px]">
        <div className="flex mb-2 items-center gap-1 sm:gap-2 flex-wrap mt-2">
          {(product.colors || ["#000", "#ffffff", "#9FC5E8"]).map((color, i) => (
            <ColorBadge key={i} color={color} active={i === 0} />
          ))}
        </div>
        <Link to="#">
          <h4 className="line-clamp-2 mb-1">{product.name}</h4>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-bold text-md">{product.price.toFixed(3)}đ</span>
          {product.originalPrice && (
            <span className="text-[#c4c4c4] line-through">{product.originalPrice.toFixed(3)}đ</span>
          )}
          {product.discount && (
            <p className="text-white p-1 bg-red-500 md:flex hidden rounded-xl font-bold text-sm">-{product.discount}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardItem;
