"use client";
import { Button, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'


const SignupPage = () => {
  
  const router = useRouter()

  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cPassword: "",
  });

  const [errorFormData, setErrorFormData] = useState({
    email: "",
    password: "",
    cPassword: "",
  });

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const onChangeInput = (value, type) => {
    switch (type) {
      case "email":
        const isEmail = validateEmail(value);
        setFormData({ ...formData, email: value });
        if (isEmail) {
          setErrorFormData({ ...errorFormData, email: "" });
        } else setErrorFormData({ ...errorFormData, email: "Email not valid" });
        break;
      case "password":
        setFormData({ ...formData, password: value });
        setErrorFormData({ ...errorFormData, password: "" });
        break;
      case "cPassword":
        setFormData({ ...formData, cPassword: value });
        if (value !== formData.password) {
          setErrorFormData({
            ...errorFormData,
            cPassword: "Password Mismatch!",
          });
        } else setErrorFormData({ ...errorFormData, cPassword: "" });
        break;
      default:
        break;
    }
  };

  const checkForErrors = (errorState) => {
    let hasError = false;
    for (const key in errorState) {
      if (errorState[key]) {
        hasError = true;
      }
    }
    for (const key in formData) {
      if (!formData[key]) {
        hasError = true;
      }
    }
    // No error values found
    return hasError;
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    const hasFormError = checkForErrors(errorFormData);
    if (hasFormError) return;
    const { email, password } = formData;
    handleRegisterApi({ email, password });
  };

  const handleRegisterApi = async (payload) => {
    setLoader(true);
    const PortalURI = process.env.NEXT_PUBLIC_PORTAL_URI;
    try {
      const response = await fetch(`${PortalURI}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(payload),
      });
      setLoader(false);
      setFormData({
        email: "",
        password: "",
        cPassword: "",
      });
      router.push('/login')
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <TextInput
                  placeholder="name@company.com"
                  value={formData.email}
                  required
                  color=""
                  helperText={
                    <>
                      <span>{errorFormData.email}</span>
                    </>
                  }
                  onChange={(e) => onChangeInput(e.target.value, "email")}
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <TextInput
                  value={formData.password}
                  type="password"
                  placeholder="••••••••"
                  required
                  color="success"
                  helperText={
                    <>
                      <span>{errorFormData.password}</span>
                    </>
                  }
                  onChange={(e) => onChangeInput(e.target.value, "password")}
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <TextInput
                  value={formData.cPassword}
                  type="confirm-password"
                  placeholder="••••••••"
                  required
                  color=""
                  helperText={
                    <>
                      <span>{errorFormData.cPassword}</span>
                    </>
                  }
                  onChange={(e) => onChangeInput(e.target.value, "cPassword")}
                />
              </div>

              <Button
                // disabled={disableSubmit}
                isProcessing={loader}
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
