import { useState } from "react";
import { ISignInValues } from "@/api/account";
import { checkEmailPattern } from "@/utilities";
import {
  CustomInput,
  CustomImage,
  CustomForm,
  CustomSubmitButton,
} from "@/components";

interface ISignInProps {
  toggleLogo: () => void;
  logoSrc: string;
  handleSubmit: (
    e: React.MouseEvent<HTMLElement>,
    formValues: ISignInValues,
    isValid: boolean
  ) => void;
  status: string;
  toggleScreen: () => void;
}

export const SignIn = ({
  toggleLogo,
  logoSrc,
  status,
  handleSubmit,
  toggleScreen,
}: ISignInProps) => {
  const [signinValues, setSigninValues] = useState<ISignInValues>({
    email: "",
    password: "",
  });
  const [hasValidEmail, setHasValidEmail] = useState(false);
  const [changeBtn, setChangeBtn] = useState(false);

  const handleSigninValues = (key: string, value: string) => {
    setSigninValues({
      ...signinValues,
      [key]: value,
    });
  };

  //  checking email validation
  const handleEmail = (val: string) => {
    handleSigninValues("email", val);
    setHasValidEmail(checkEmailPattern(val));
  };

  return (
    <>
      <h6 className="text-center text-gray-900">{status}</h6>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <CustomImage src={logoSrc} alt="Wealthfront" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <CustomForm action="#">
          <>
            <CustomInput
              identifier="Email address"
              type="email"
              handleChange={(val) => handleEmail(val)}
            />
            <CustomInput
              identifier="Password"
              type="password"
              handleChange={(val) => handleSigninValues("password", val)}
            />
            <CustomSubmitButton
              onClick={(e) => {
                // try to avoid fake network call by checking on the FE side
                const isValid =
                  hasValidEmail && signinValues.password.length > 0;
                isValid ? setChangeBtn(false) : setChangeBtn(true);
                if (!isValid) return;
                handleSubmit(
                  e,
                  signinValues,
                  hasValidEmail && signinValues.password.length > 0
                );
              }}
              disabled={changeBtn}
              text={changeBtn ? "Please fill out all fields" : "Sign in"}
            />
          </>
        </CustomForm>

        <p className="mt-10 text-center text-sm text-gray-500">
          New User?{" "}
          <button
            onClick={toggleScreen}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create account
          </button>
        </p>

        {/* Bonus: wanted to use Context / Provider for fun */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Change the logo using Context / Provider{" "}
          <button
            onClick={toggleLogo}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            here!
          </button>
        </p>
      </div>
    </>
  );
};
