import NavBar from "@/components/NavBar";
import OrderDetailPage from "./OrderDetailPage";

const GetOrders = () => {
  return (
    <div className="bg-gray-100">
      <NavBar />
      <div className="section__container">
        <section className="bg-white px-10 py-6 shadow">
          <h2 className="text-xl lg:text-2xl">Hi , User Name</h2>
          <div className="w-15 h-15">
            <img src="https://mcdn.coolmate.me/image/October2023/mceclip0_92.png" alt="" />
          </div>
        </section>
        <section className="bg-white px-10 py-6 shadow">
          <OrderDetailPage />
        </section>
      </div>
    </div>
  );
};

export default GetOrders;
