import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";

interface BasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const BasicButton: React.FC<BasicButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      size={"lg"}
      className={cn(
        "focus-visible:ring-0 focus-visible:ring-offset-0 bg-[transparent] hover:bg-[transparent]",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default BasicButton;
