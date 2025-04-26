import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPasswordSchema } from "./schema/forgotPasswordSchema";
import { Label } from "@/components/ui/label";

const ForgotPasswordPage: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });
  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">Enter your email below to reset your password</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="w-full space-y-6">
            {/* email */}
            <div className="w-full">
              <Label htmlFor="email" className="text-md text-gray-700 mb-1">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="border border-gray-400 p-3 rounded-md pr-12"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>
          </div>
          <Button
            className="inline-flex uppercase items-center cursor-pointer justify-center rounded-md text-sm font-medium bg-slate-950 text-white shadow hover:bg-slate-800 hover:scale-105 duration-300 h-9 px-4 py-2 ml-auto w-full disabled:opacity-75"
            type="submit"
          >
            {/* {<Loader className="w-6 h-6 animate-spin" />} */}
            Sign up
          </Button>
        </form>
        <span className="px-8 text-center text-md text-muted-foreground">
          Already have an account?&nbsp;
          <Link to="/auth/login" className=" text__underline hover:text-primary">
            Login.
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
