import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePage from "@/pages/account/ProfilePage";
import AddressPage from "@/pages/address/AddressPage";
import HistoryOrderPage from "../orders/HistoryOrdersPage";
import { HistoryIcon, MapPinIcon, UserIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const tabsList = [
  { name: "Profile", value: "profile", icon: <UserIcon />, card: <ProfilePage /> },
  { name: "Order History", value: "orders", icon: <HistoryIcon />, card: <HistoryOrderPage /> },
  { name: "Address", value: "address", icon: <MapPinIcon />, card: <AddressPage /> },
];

const AccountTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabValue = searchParams.get("tab");
  const tab = tabsList.find((t) => t.value === tabValue)?.value || tabsList[0].value;

  const handleChangeTab = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Tabs defaultValue={tab} onValueChange={handleChangeTab} className="flex flex-col md:flex-row gap-4">
        {/* LEFT MENU */}
        <TabsList className="flex flex-col h-full">
          {tabsList.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="w-full justify-start md:min-w-64">
              <div className="flex gap-2 items-center">
                {tab.icon}
                <span>{tab.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* RIGHT CONTENT */}
        {tabsList.map((tab) => (
          <TabsContent className="flex-1 min-h-96" key={tab.value} value={tab.value}>
            {tab.card}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AccountTabs;
