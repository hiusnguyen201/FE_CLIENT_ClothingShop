import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserInfo from "@/pages/account/UserInfoPage";
import UserAddress from "@/pages/address/UserAddress";
import HistoryOrderPage from "../orders/HistoryOrdersPage";
import { HistoryIcon, MapPinIcon, UserIcon } from "lucide-react";

const tabsList = [
  { name: "Information User", value: "account", icon: <UserIcon />, card: <UserInfo /> },
  { name: "Order History", value: "order-history", icon: <HistoryIcon />, card: <HistoryOrderPage /> },
  { name: "Address", value: "address", icon: <MapPinIcon />, card: <UserAddress /> },
];

const AccountTabs = () => {

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Tabs
        defaultValue={tabsList[0].value}
        className="flex flex-col md:flex-row gap-4"
      >
        {/* LEFT MENU */}
        <TabsList className="flex flex-col h-full">
          {tabsList.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="w-full justify-start md:min-w-64"
            >
              <div className="flex gap-2 items-center">
                {tab.icon}
                <span>{tab.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* RIGHT CONTENT */}
        {tabsList.map((tab) => (
          <TabsContent
            className="flex-1"
            key={tab.value}
            value={tab.value}>
            {tab.card}
          </TabsContent>
        ))}

      </Tabs>
    </div>
  );
};

export default AccountTabs;
