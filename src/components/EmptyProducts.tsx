import React from "react";
import { Link } from "react-router-dom";

const EmptyProducts: React.FC = () => {
  return (
    <div className="section__subheader items-center">
      <img
        src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
        alt="404"
        className="w-64 m-auto object-cover min-w-32  min-h-32"
      />
      <h4 className="section__header capitalize ">Sorry, no result found!</h4>
      <Link className="btn mt-4" to="/">
        Go to Home
      </Link>
    </div>
  );
};

export default EmptyProducts;
