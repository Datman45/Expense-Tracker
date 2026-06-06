"use client";

import { AccountContext } from "@/contex/AccountContex";
import { AccountService } from "@/services/AccountService";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
  const accountService = new AccountService();
  const [errorMessage, setErrorMessage] = useState("");
  const { setAccountInfo } = useContext(AccountContext);
  const router = useRouter();

  type Inputs = {
    username: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await accountService.loginAsync(
        data.username,
        data.password,
      );

      if (result.errors) {
        setErrorMessage(result.errors[0]);
        return;
      }

      setAccountInfo!({
        token: result.data!.token,
        user: result.data!.user,
      });

      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed - " + (error as Error).message);
    }
  };

  return (
    <>
      <div className="text-centered-content">
        <h1>Login Page</h1>
        <p>Please enter your credentials to log in.</p>
        <div className="text-danger mb-2">{errorMessage}</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="inputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            placeholder="Enter username"
            {...register("username", { required: "Username is required" })}
          />

          {errors.username && (
            <span className="text-danger field-validation-valid">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
          />

          {errors.password && (
            <span className="text-danger field-validation-valid">
              {errors.password.message}
            </span>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
