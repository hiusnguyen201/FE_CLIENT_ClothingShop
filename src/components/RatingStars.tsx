import React from "react";

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating); // Số lượng sao đầy
  const halfStar = rating % 1 >= 0.5; // Nếu số dư >= 0.5, hiển thị nửa sao
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);
  const stars = [];
  // Thêm sao đầy
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={`full-${i}`} className="ri-star-fill"></i>);
  }
  // Thêm nửa sao nếu có
  if (halfStar) {
    stars.push(<i key="half" className="ri-star-half-line"></i>);
  }
  // Thêm sao trống
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={`empty-${i}`} className="ri-star-line"></i>);
  }
  return <div className="product__rating">{stars}</div>;
};

export default RatingStars;
