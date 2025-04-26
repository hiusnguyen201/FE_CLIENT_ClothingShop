import { FC } from "react";
import { Link } from "react-router-dom"; // Nếu bạn dùng react-router
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFoundPage: FC = () => {
  return (
    <>
      <NavBar />
      <div className="h-130 flex flex-col items-center justify-center bg-white text-black px-4">
        <h1 className="text-[100px] sm:text-[120px] font-bold leading-none">404</h1>
        <p className="text-xl sm:text-2xl font-semibold mt-4 text-center">Sorry, Page not found!</p>
        <p className="text-base sm:text-lg text-gray-600 mt-2 text-center max-w-md">
          The page you are looking for has been deleted or renamed or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="mt-6 bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition"
        >
          Return to home page
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
