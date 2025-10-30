import { LoaderCircle } from "lucide-react";
import clsx from "clsx";

export function LoadingCenter({ className = "" }) {
  return <LoaderCircle className={clsx("mx-auto animate-spin", className)} />;
}
