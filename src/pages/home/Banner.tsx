import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2025/Hero_Banner_-_Desktop-_mate.jpg",
  "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2025/Hero_Banner_-_Desktop_-_yoga.jpg",
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
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Link to="">
              <img src={img} alt={`Banner ${idx}`} className="w-full h-full object-cover" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
