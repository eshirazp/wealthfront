import { useContext, useState, MouseEvent } from "react";
import { GET, ISignInValues } from "@/api";
import { LogoContext } from "@/store";
import { SignIn } from "./signin_manual";

interface ICreateAccountContainerProps {
  toggleScreen: () => void;
}

export const SignInContainer = ({
  toggleScreen,
}: ICreateAccountContainerProps) => {
  const [status, setStatus] = useState("");
  const { logoSrc, toggleLogo }: { logoSrc: string; toggleLogo: () => void } =
    useContext(LogoContext);

  /* 
    fake network call to check user creds. in prod, would not send password
    unencrypted - would use something like bcrypt
  */
  const getUser = async (signinValues: ISignInValues) => {
    try {
      await GET(signinValues);
      setStatus("Account found!");
    } catch (e) {
      console.error("Email or password incorrect");
      setStatus("Email or password incorrect");
    }
  };

  // handle form submit
  const handleSubmit = (
    e: MouseEvent<HTMLElement>,
    signinValues: ISignInValues,
    isValid: boolean
  ) => {
    e.preventDefault();
    getUser(signinValues);
  };

  return (
    <SignIn
      logoSrc={logoSrc}
      handleSubmit={handleSubmit}
      status={status}
      toggleLogo={toggleLogo}
      toggleScreen={toggleScreen}
    />
  );
};
