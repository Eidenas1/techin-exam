// "axios" using for make API queries
// if you do not want to use it
// you can use "fetch API"
//
// import axios from "axios";

// "react-hook-form" using for make easier
// make the same functionallity with JavaScript and HTML
// also posible

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import spruce_tree from "../../assets/spruce_tree.png";
const API_URL = import.meta.env.VITE_API_URL;
const LoginModal = ({ isOpen, onClose, onSwitchRegister, onLoginSuccess }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (!isOpen) {
      reset();
      setErrorMessage("");
    }
  }, [isOpen, reset]);

  const handleClose = () => {
    reset();
    setErrorMessage("");
    onClose();
  };
  if (!isOpen) return null;
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.status === "success") {
        onLoginSuccess();
        handleClose();
      }
    } catch (error) {
      const errors = error.response?.data?.errors;
      setErrorMessage(
        error.response?.data?.message ||
          (Array.isArray(errors)
            ? errors.map((e) => e.msg).join("\n")
            : "Login failed")
      );
      console.error("Login failed:", error.response?.data || error.message);
    }
  };
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center max-lg:p-4 bg-[#D9D9D9]/[var(--bg-opacity)] [--bg-opacity:40%] backdrop-blur-xs"
      onClick={handleClose}
    >
      <div
        className=" bg-black relative w-2/4 h-5/6 flex flex-col items-center max-xl:w-1/2 max-md:w-full max-md:h-full max-lg:w-3/4 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full h-full justify-center items-center">
          <button
          onClick={handleClose}
          className="text-[3rem] text-white w-max h-max justify-self-end self-start px-8"
        >
          x
        </button>
          <div className="flex flex-col items-center gap-4 justify-center justify-self-start self-start w-full h-1/2 border-white border-r-4 border-b-4">
            <h1 className="text-white text-4xl text-center">Login</h1>
          </div>
          <form
            className="flex flex-col h-1/2 w-full justify-center items-center gap-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="border-2 rounded-2xl h-4/16 w-6/10 p-8 text-white text-[2rem] "
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-white font-semibold text-2xl">
                Email is required
              </p>
            )}
            <input
              className="border-2 rounded-2xl p-8 h-4/16 w-6/10 text-white text-[2rem]"
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-white font-semibold tetext-2xl">
                Password is required
              </p>
            )}

            <div className="flex gap-2 text-[1.25rem] text-white">
              <p>Don't have an account?</p>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onSwitchRegister();
                }}
                className="text-white cursor-pointer underline-offset-3 underline"
              >
                Register here
              </button>
            </div>
            <input
              type="submit"
              value="Log in"
              className=" bg-white rounded-2xl border-2 h-3/16/16 w-3/16 text-[1.75rem] justify-center max-xl:text-[1.25rem] max-xl:h-3/16"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
