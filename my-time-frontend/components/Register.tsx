"use client";
import React, { useState } from "react";
import "@/public/css/app.css";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { registerSchema } from "../zodSchema/register";
import Image from "next/image";
import dashboardMeetImage from "@/public/images/illustrations/dashboard-meet.svg";
import dashboardMeetDarkImage from "@/public/images/illustrations/dashboard-meet-dark.svg";
import googleLogoImage from "@/public/images/logos/google.svg";
import githubLogoImage from "@/public/images/logos/github.svg";
import { API_URL } from "@/config";
import { notification } from "antd";
// import "antd/dist/antd.css";

import logoImage from "@/public/images/app-logo.svg";
type FormData = z.infer<typeof registerSchema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const [isLoaded, setIsLoaded] = useState(false);

  async function onSubmit(data: FormData) {
    console.log(isSubmitting);
    if (data.password !== data.passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    // Display loading notification
    const loadingNotification = notification.info({
      message: "Loading...",
      duration: 3, // Set duration to null to make it persistent until manually closed
    });

    try {
      setIsLoaded(true);
      const res = await axios.post(`${API_URL}/auth/register`, {
        ...data,
      });
      notification.success({
        message: "Success",
        duration: 3,
        description:
          "You have successfully registered. verify your email to login.",
      });
    } catch (error) {
    } finally {
      setIsLoaded(false);
    }
  }
  // Watch the password and confirmPassword fields for changes
  const password = watch("password", "");
  const confirmPassword = watch("passwordConfirm", "");

  return (
    <div>
      <div>
        <div>
          <div
            id="root"
            className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900"
            // x-cloak=""
          >
            <div className="fixed top-0 hidden p-6 lg:block lg:px-12">
              <a href="#" className="flex items-center space-x-2">
                {/* <img
                  className="h-12 w-12"
                  src="images/app-logo.svg"
                  alt="logo"
                /> */}
                <Image src={logoImage} alt="logo" width={48} height={48} />
                <p className="text-xl font-semibold uppercase text-slate-700 dark:text-navy-100">
                  My Time
                </p>
              </a>
            </div>
            <div className="hidden w-full place-items-center lg:grid">
              <div className="w-full max-w-lg p-6">
                <Image
                  className="w-full h-24"
                  x-show="!$store.global.isDarkModeEnabled"
                  src={dashboardMeetImage}
                  alt="image"
                  width={100}
                  height={100}
                />
                <Image
                  className="w-full h-24"
                  x-show="$store.global.isDarkModeEnabled"
                  src={dashboardMeetDarkImage}
                  alt="image"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <main className="flex w-full flex-col items-center bg-white dark:bg-navy-700 lg:max-w-md">
              <div className="flex w-full max-w-sm grow flex-col justify-center p-5">
                <div className="text-center">
                  <Image
                    className="mx-auto h-16 w-16 lg:hidden"
                    src={logoImage}
                    width={64}
                    height={64}
                    alt="logo"
                  />
                  <div className="mt-4">
                    <h2 className="text-2xl font-semibold text-slate-600 dark:text-navy-100">
                      Welcome To My Time
                    </h2>
                    <p className="text-slate-400 dark:text-navy-300">
                      Please sign up to continue
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex space-x-4">
                  <button className="btn w-full space-x-3 border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
                    <Image
                      className="h-5.5 w-5.5"
                      src={googleLogoImage}
                      width={22}
                      height={22}
                      alt="logo"
                    />
                    <span>Google</span>
                  </button>
                  <button className="btn w-full space-x-3 border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
                    <Image
                      className="h-5.5 w-5.5"
                      src={githubLogoImage}
                      width={22}
                      height={22}
                      alt="logo"
                    />
                    <span>Github</span>
                  </button>
                </div>
                <div className="my-7 flex items-center space-x-3">
                  <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
                  <p className="text-tiny+ uppercase">or sign up with email</p>

                  <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-4 space-y-4">
                    <label className="relative flex">
                      <input
                        {...register("firstName", { required: true })}
                        className="form-input peer w-full rounded-lg bg-slate-150 px-3 py-2 pl-9 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900"
                        placeholder="Username"
                        type="text"
                      />
                      <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 transition-colors duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                    </label>
                    {errors?.firstName && (
                      <div
                        style={{ color: "red", marginTop: "0px" }}
                        className="text-red-600 text-sm"
                      >
                        {errors?.firstName?.message}
                      </div>
                    )}
                    <label className="relative flex">
                      <input
                        {...register("lastName", { required: true })}
                        className="form-input peer w-full rounded-lg bg-slate-150 px-3 py-2 pl-9 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900"
                        placeholder="lastName"
                        type="text"
                      />
                      <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 transition-colors duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                    </label>
                    {errors?.lastName && (
                      <div
                        style={{ color: "red", marginTop: "0px" }}
                        className="text-red-600 text-sm"
                      >
                        {errors?.lastName?.message}
                      </div>
                    )}
                    <label className="relative flex">
                      <input
                        className="form-input peer w-full rounded-lg bg-slate-150 px-3 py-2 pl-9 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900"
                        placeholder="Email"
                        type="email"
                        {...register("email", { required: true })}
                      />
                      <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 transition-colors duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                    </label>
                    {errors?.email && (
                      <div
                        style={{ color: "red", marginTop: "0px" }}
                        className="text-red-600 text-sm"
                      >
                        {errors?.email?.message}
                      </div>
                    )}
                    <label className="relative flex">
                      <input
                        className="form-input peer w-full rounded-lg bg-slate-150 px-3 py-2 pl-9 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900"
                        placeholder="Password"
                        type="password"
                        {...register("password", { required: true })}
                      />
                      <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 transition-colors duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                    </label>
                    {errors?.password && (
                      <div
                        style={{ color: "red", marginTop: "0px" }}
                        className="text-red-600 text-sm"
                      >
                        {errors?.password?.message}
                      </div>
                    )}

                    <label className="relative flex">
                      <input
                        className="form-input peer w-full rounded-lg bg-slate-150 px-3 py-2 pl-9 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900"
                        placeholder="Repeat Password"
                        type="password"
                        {...register("passwordConfirm", {
                          required: true,
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                      />
                      <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 transition-colors duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                    </label>
                    {errors?.passwordConfirm && (
                      <div
                        style={{ color: "red", marginTop: "0px" }}
                        className="text-red-600 text-sm"
                      >
                        {errors?.passwordConfirm?.message}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoaded}
                    className={`btn mt-10 h-10 w-full font-medium text-white ${
                      isLoaded
                        ? "bg-success hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 cursor-not-allowed"
                        : "bg-primary hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                    }`}
                  >
                    {isLoaded ? "Loading..." : "Sign In"}
                  </button>
                </form>
                <div className="mt-4 text-center text-xs+">
                  <p className="line-clamp-1">
                    <span>Already have an account? </span>
                    <a
                      className="text-primary transition-colors hover:text-primary-focus dark:text-accent-light dark:hover:text-accent"
                      href="pages-login-2.html"
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
