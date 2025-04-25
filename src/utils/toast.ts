import { toast } from "@/hooks/use-toast";

export const showToast = (isSuccess: boolean, message: string) => {
    toast({
        title: message,
        variant: isSuccess ? "default" : "destructive",
    });
};