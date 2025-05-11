import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "../../api/auth";
import { toast } from "sonner";
import { useAuth } from "../../store";
import handleError from "../../utils/handleError";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [revealPassword, setRevealPassword] = useState(false);
  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };
  const onFormSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      if (res.status === 200) {
        toast.success(res.data.message);
        login(res.data.accessToken);
        navigate("/");
      }
      console.log(res);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="">
      <div className=" md:py-[40px] md:px-[28px] ">
        <form
          className="max-w-[300px] md:max-w-[400px] mx-auto mt-10 my-auto"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="mb-4">
            {" "}
            <label className="floating-label">
              <span>Username</span>
              <input
                type="text"
                placeholder="Username"
                className="input input-lg w-full"
                id="username"
                {...register("username")}
              />
            </label>
            {errors.username && (
              <span className="text-xs text-red-600">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            {" "}
            <label className="floating-label">
              <span>Password</span>
              <input
                type={revealPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-lg w-full"
                id="password"
                {...register("password")}
              />
            </label>
            <button
              className="absolute inset-y-0 right-2"
              onClick={togglePassword}
              type="button"
            >
              {" "}
              {revealPassword ? "hide" : "show"}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
          )}
          <button
            className="btn btn-secondary btn-lg w-full mt-4 bg-[#974FD0] mb-4"
            type="submit"
          >
            Log In
          </button>
        </form>
        <div className=" max-w-[300px] md:max-w-[400px]  h-[80px] border rounded-md border-[#A1A1A1] mt-4 flex items-center justify-center py-2 mx-auto">
          <p className="text-[20px] mr-2">Dont have an account? </p>{" "}
          <Link
            to="/auth/register"
            className="text-[#974FD0] text-bold text-[20px]"
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}
