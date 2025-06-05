import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "@/components/form/auth/ForgotPasswordForm";
import { ArrowLeftIcon } from "lucide-react";

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Recovery password</h1>
        <p className="text-balance text-sm text-muted-foreground">Enter your email below to recovery your account</p>
      </div>
      <div className="grid gap-6">
        <ForgotPasswordForm />

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        </div>

        <Link
          to={"/auth/login"}
          className="flex gap-2 text-sm items-center max-w-max">
          <ArrowLeftIcon />
          <span>Login</span>
        </Link>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
