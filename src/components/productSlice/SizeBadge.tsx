import { Button } from "@/components/ui/button";
import React from "react";

interface SizeBadgeProps {
  title: string;
  className: string;
}

export const SizeBadge: React.FC<SizeBadgeProps> = ({ title, className }) => {
  return (
    <Button variant="secondary" className={className}>
      {title}
    </Button>
  );
};
