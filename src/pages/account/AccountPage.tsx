import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import SideBarAccountPage from "./SideBarAccountPage";
import NavBar from "@/components/NavBar";
import UserInfo from "./UserInfoPage";
import UserAddress from "../address/UserAddress";
import HistoryOrderPage from "./HistoryOrdersPage";
import clsx from "clsx";
import { useState } from "react";

const AccountTabs = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [showMobileContent, setShowMobileContent] = useState(false);
  const cardContent = [
    { value: "account", card: <UserInfo /> },
    { value: "order-history", card: <HistoryOrderPage /> },
    { value: "address", card: <UserAddress /> },
  ];
  const handleTabClick = (value: string) => {
    setActiveTab(value);
    setShowMobileContent(true);
  };
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
        <Tabs defaultValue="lg:account" className="flex flex-col md:flex-row w-full min-h-screen p-4 gap-4">
          {/* LEFT MENU */}
          <SideBarAccountPage onTabClick={handleTabClick} />

          {/* RIGHT CONTENT */}
          <div
            className={clsx("flex-1 transition-all duration-300", "md:block", showMobileContent ? "block" : "hidden")}
          >
            {cardContent.map((c, i) => (
              <TabsContent key={i} value={c.value}>
                <Card className="p-10 bg-white rounded-xl border-none">{c.card}</Card>
              </TabsContent>
            ))}

            <TabsContent value="logout">
              <Card className="p-6 text-red-500">Bạn đã đăng xuất.</Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountTabs;
