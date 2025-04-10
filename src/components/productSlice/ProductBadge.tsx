import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductBadgeProps {
  title: string;
  className?: string;
}

export function ProductBadge({ title, className }: ProductBadgeProps) {
  const isMobile = useIsMobile();

  return (
    <Badge
      style={{
        fontSize: isMobile ? 10 : 12,
      }}
      className={cn("bg-red-500 hover:bg-red-400 px-1 py-0  text-white", className)}
    >
      {title}
    </Badge>
  );
}
