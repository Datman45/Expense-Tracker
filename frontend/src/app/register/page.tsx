"use client";

import { AccountContext } from "@/contex/AccountContex";
import { AccountService } from "@/services/AccountService";
import { IAccount } from "@/types/domain/IAccount";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Register() {
  const accountService = new AccountService();
  const { setAccountInfo } = useContext(AccountContext);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAccount>({
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit: SubmitHandler<IAccount> = async (data) => {
    try {
      const response = await accountService.registerAsync(data);

      if (response.errors) {
        setErrorMessage(response.errors[0]);
        return;
      }

      setAccountInfo!({
        token: response.data?.token,
        user: response.data?.user,
      });

      router.push("/");
    } catch (error) {
      console.error("Register failed:", error);
      setErrorMessage("Register failed - " + (error as Error).message);
    }
  };

  return (
    <>
      <div className="text-centered-content">
        <h1> Register Page</h1>
        <p>Here you can register your account</p>
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
        <div className="form-group">
          <label htmlFor="inputFirstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="inputFirstName"
            placeholder="Enter first name"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && (
            <span className="text-danger field-validation-valid">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="inputLastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            placeholder="Enter last name"
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && (
            <span className="text-danger field-validation-valid">
              {errors.lastName.message}
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
