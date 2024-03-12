"use client";

import { useState } from "react";
import { LogoContextProvider } from "@/store";
import { CreateAccountContainer, SignInContainer } from "@/layouts";

const Home = () => {
  const [shouldShowSignIn, setShouldShowSignIn] = useState(true);

  const handleShowSignIn = () => {
    setShouldShowSignIn(!shouldShowSignIn);
  };

  return (
    <LogoContextProvider>
      <div className="h-full bg-white">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          {shouldShowSignIn ? (
            <SignInContainer toggleScreen={handleShowSignIn} />
          ) : (
            <CreateAccountContainer toggleScreen={handleShowSignIn} />
          )}
        </div>
      </div>
    </LogoContextProvider>
  );
};

export default Home;
