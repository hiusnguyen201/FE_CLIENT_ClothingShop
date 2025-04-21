import React from "react";
import { FaUser, FaHistory, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SideBarAccountProps {
  onTabClick: (value: string) => void;
}

const SideBarAccountPage: React.FC<SideBarAccountProps> = ({ onTabClick }) => {
  const tabsList = [
    { name: "Information User", value: "account", icon: <FaUser /> },
    { name: "Order History", value: "order-history", icon: <FaHistory /> },
    { name: "Address", value: "address", icon: <FaMapMarkerAlt /> },
    { name: "Logout", value: "logout", icon: <FaSignOutAlt /> },
  ];
  return (
    <>
      <TabsList className="flex flex-col w-full md:w-1/4 rounded-xl p-2 shadow">
        {tabsList.map((t, i) => (
          <TabsTrigger
            key={i}
            value={t.value}
            onClick={() => onTabClick(t.value)}
            className="flex gap-2 justify-between w-full bg-white h-30 mt-3 data-[state=active]:bg-gray-400 data-[state=active]:text-white rounded-lg transition-all"
          >
            <div className="flex gap-3 items-center">
              {t.icon} <span>{t.name}</span>
            </div>
            <i className="ri-arrow-right-long-line text-gray-900 text-2x"></i>
          </TabsTrigger>
        ))}
      </TabsList>
    </>
  );
};

export default SideBarAccountPage;
