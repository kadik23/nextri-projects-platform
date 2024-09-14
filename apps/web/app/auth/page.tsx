"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FC, SetStateAction, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import MiniSpinner from "@/app/_components/MiniSpinner";
import {
  getGithubRedirectUrl,
  getGoogleRedirectUrl,
  requestMagicLink,
} from "../_api/authFns";
import toast from "react-hot-toast";
import { displayErrorToast } from "../_lib/Toasts";

const Signin: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggingWithGoogle, setIsLoggingWithGoogle] =
    useState<boolean>(false);
  const [isLoggingWithGithub, setIsLoggingWithGithub] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateEmail = (email: string) => {
    if (email === "") {
      setErrorMessage("Email Adress is required");
      return false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) setErrorMessage("Invalid Email Adress");

      return emailRegex.test(email);
    }
  };

  useEffect(
    function () {
      setErrorMessage("");
    },
    [email]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const data = await requestMagicLink(email);
        console.log("this is the data from this field");
        console.log(data);
        if (data?.success) {
          router.push("/auth/check-email");

          console.log("Magic link sent successfully!");
        } else {
          displayErrorToast("Failed to send magic link");
        }
      } catch (err) {
        displayErrorToast();
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage("Invalid email address");
    }
  };
  ////////
  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingWithGoogle(true);
    try {
      const data = await getGoogleRedirectUrl();
      console.log(data);
      router.push(data.url);
    } catch (err) {
      displayErrorToast();
    } finally {
      setIsLoggingWithGoogle(false);
    }
  };
  ///////
  const handleGithubLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingWithGithub(true);
    try {
      const data = await getGithubRedirectUrl();
      console.log(data);
      router.push(data.url);
    } catch (err) {
      displayErrorToast();
    } finally {
      setIsLoggingWithGithub(false);
    }
  };

  return (
    <main className="h-screen flex flex-col pt-10 items-center gap-2  ">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-wider text-center">
        Welcome AT NEXTRI PROJECTS
      </h1>
      <p className="text-sm sm:text-base text-center">
        Sign in or create an account and start building projects!
      </p>

      <form className="space-y-4 my-5 w-[80%] max-w-xl" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Input
            id="email"
            placeholder="Enter your email"
            className={`${errorMessage ? "border-red-600 placeholder:text-red-600" : ""}`}
            value={email}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setEmail(e.target.value)
            }
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full disabled:cursor-not-allowed flex gap-2"
          disabled={isLoading}
        >
          {isLoading && <MiniSpinner />}
          Send Link
        </Button>
      </form>

      <div className="space-y-2  w-[80%] max-w-xl">
        <Separator className="mb-4" />

        <Button
          variant="outline"
          className="w-full flex gap-2"
          disabled={isLoggingWithGoogle}
          onClick={handleGithubLogin}
        >
          {isLoggingWithGithub ? (
            <MiniSpinner />
          ) : (
            <GithubIcon className=" h-4 w-4" />
          )}
          Sign in with Github
        </Button>
        <Button
          variant="outline"
          className="w-full flex gap-2"
          disabled={isLoggingWithGoogle}
          onClick={handleGoogleLogin}
        >
          {isLoggingWithGoogle ? (
            <MiniSpinner />
          ) : (
            <ChromeIcon className=" h-4 w-4" />
          )}
          Sign in with Google
        </Button>
      </div>
    </main>
  );
};

const ChromeIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" x2="12" y1="8" y2="8" />
    <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
    <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
  </svg>
);

const GithubIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    role="img"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export default Signin;
