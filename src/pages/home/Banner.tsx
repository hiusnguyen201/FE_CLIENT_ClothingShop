import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const bannersData = [
  {
    image:
      "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2025/Hero_Banner_-_Desktop-_mate.jpg",
    slug: "/category/men-clothes",
  },
  {
    image:
      "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2025/1920x788(1)promax.jpg",
    slug: "/category/men-clothes/sport-men",
  },
];

const Banner: React.FC = () => {
  return (
    <div className="w-full p-3">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="w-full aspect-[16/5] rounded-lg overflow-hidden relative [--swiper-navigation-size:20px]"
      >
        {bannersData.map((b, idx) => (
          <SwiperSlide key={idx}>
            <Link to={`${b.slug}`}>
              <img src={b.image} alt={`Banner ${idx}`} className="w-full h-full object-cover" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
