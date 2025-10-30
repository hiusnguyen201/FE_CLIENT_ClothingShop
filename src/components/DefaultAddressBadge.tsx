import React from "react";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";

const DefaultAddressBadge: React.FC = () => {
  return (
    <Badge variant="outline" className="border-gray-400 rounded-4xl">
      <div className="flex items-center gap-1 text-gray-700">
        <StarIcon className="w-4 h-4" />
        <span>Default</span>
      </div>
    </Badge>
  );
};

export default DefaultAddressBadge;
