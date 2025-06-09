import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePage from "@/pages/account/ProfilePage";
import AddressPage from "@/pages/address/AddressPage";
import HistoryOrderPage from "../orders/HistoryOrdersPage";
import { HistoryIcon, MapPinIcon, UserIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const tabsList = [
  { name: "Profile", value: "profile", icon: <UserIcon />, card: <ProfilePage /> },
  { name: "Order History", value: "order-history", icon: <HistoryIcon />, card: <HistoryOrderPage /> },
  { name: "Address", value: "address", icon: <MapPinIcon />, card: <AddressPage /> },
];

const AccountPage = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { value } = tabsList.find((tab) => tab.value === id) || tabsList[0];

  const handleValueChange = (value: string) => {
    navigate(`/account/${value}`);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Tabs
        defaultValue={value}
        onValueChange={handleValueChange}
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
            className="flex-1 min-h-96"
            key={tab.value}
            value={tab.value}>
            {tab.card}
          </TabsContent>
        ))}

      </Tabs>
    </div>
  );
};

export default AccountPage;
