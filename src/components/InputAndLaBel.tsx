import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

interface InputAndLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const InputAndLabel: React.FC<InputAndLabelProps> = ({ label, className, ...props }) => {
  return (
    <div className="mb-2 space-y-2 lg:mb-0 mt-1">
      <label
        className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor={props.id}
      >
        {label}
      </label>
      <Input
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-md shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default InputAndLabel;
