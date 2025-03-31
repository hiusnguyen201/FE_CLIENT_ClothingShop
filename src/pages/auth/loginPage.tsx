import React, { useState } from "react";

import loginImage from "@/assets/anhcaymia2.png";
import { Link } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  // const [message, setMessage] = useState("");
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(loginData);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    const data = loginData;
    console.log(data);
    e.preventDefault();
  };
  return (
    <div>
      <section className=" min-h-screen flex box-border justify-center items-center">
        <div className="bg__banner rounded-2xl flex max-w-4xl p-5 items-center">
          <div className="md:w-1/2 px-8">
            <h2 className="font-bold text-3xl text-text-dark">Login</h2>
            <p className="text-sm mt-4  text-text-dark">
              If you already a member, easily log in now.
            </p>

            <form
              action=""
              onSubmit={handleLogin}
              className="flex flex-col gap-4"
            >
              <input
                className="p-2 mt-8 rounded-xl border focus-visible:outline-none"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full focus-visible:outline-none"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                {/* {message && (
                  <p className="text-red-500 text-sm mt-3 pl-1">{message}</p>
                )} */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  id="togglePassword"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                </svg> */}
              </div>
              <button
                className="bg-red-500 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="mt-6  items-center text-gray-100">
              <hr className="border-gray-300" />
              <p className="text-center text-sm text-stone-900">OR</p>
              <hr className="border-gray-300" />
            </div>
            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 font-medium">
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Login with Google
            </button>
            <button className="bg-white border py-1 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 font-medium">
              <i className="ri-facebook-circle-fill text-2xl mr-2 text-sky-600"></i>
              Login with Facebook
            </button>
            <div className="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip">
              Forget password?
            </div>

            <div className="mt-4 text-sm flex justify-between items-center container-mr">
              <p className="mr-3 md:mr-0 ">If you don not have an account..</p>
              <Link
                to="/register"
                className="hover:border register text-white bg-red-500 hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#206ab1] font-semibold duration-300"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <img className="" src={loginImage} alt="login form image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
