import { useState } from "react";
import {
  CustomInput,
  CustomForm,
  CustomSubmitButton,
  DataCheck,
  DataUncheck,
} from "@/components";
import { checkEmailPattern } from "@/utilities";
import { IFormValues } from ".";

interface ICreateAccountProps {
  handleSubmit: (
    e: React.MouseEvent<HTMLElement>,
    formValues: IFormValues,
    isValid: boolean
  ) => void;
  checkNewEmail: (formValues: IFormValues) => Promise<boolean | undefined>;
  toggleScreen: () => void;
}

export const CreateAccount = ({
  handleSubmit,
  checkNewEmail,
  toggleScreen,
}: ICreateAccountProps) => {
  const createAccountCta = "Create account";
  const [formValues, setFormValues] = useState<IFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordVerify: "",
    address: "",
  });
  const [pwReq, setPwReq] = useState({
    hasPwDigit: false,
    hasPwLetter: false,
    hasPwMatch: false,
  });
  const [hasValidEmail, setHasValidEmail] = useState(false);
  const [msg, setMsg] = useState(createAccountCta);

  //  updating state values while restarting submit button
  const handleFormValues = (key: string, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
    setMsg(createAccountCta);
  };

  //  checking email validation
  const handleEmail = (val: string) => {
    handleFormValues("email", val);
    setHasValidEmail(checkEmailPattern(val));
  };

  // checking password validation
  const handlePassword = (val: string) => {
    handleFormValues("password", val);
    setPwReq({
      hasPwDigit: /[0-9]/g.test(val),
      hasPwLetter: /[A-z]/g.test(val),
      hasPwMatch: !!(val === formValues.passwordVerify && val.length > 0),
    });
  };

  // checking passwords match
  const handlePasswordMatch = (val: string) => {
    handleFormValues("passwordVerify", val);
    val === formValues.password && val.length > 0
      ? setPwReq({ ...pwReq, hasPwMatch: true })
      : setPwReq({ ...pwReq, hasPwMatch: false });
  };

  // updating the submit btn cta when the user clicks the button
  const handleMsg = () => {
    const { hasPwDigit, hasPwLetter, hasPwMatch } = pwReq;
    const { firstName, lastName } = formValues;
    if (!(firstName.length > 0 && lastName.length > 0)) {
      setMsg("Name is not of proper length");
    } else if (!hasValidEmail) {
      setMsg("Email is not valid");
    } else if (!(hasPwDigit && hasPwLetter && hasPwMatch)) {
      setMsg("Password is not valid");
    } else {
      setMsg("");
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>

        {/* Submit form */}
        <CustomForm action="/" method="POST">
          <div className="grid grid-cols-2 grid-rows-5 gap-4">
            <div>
              <CustomInput
                identifier="First Name"
                type="text"
                handleChange={(val) => handleFormValues("firstName", val)}
              />
            </div>
            <div>
              <CustomInput
                identifier="Last Name"
                type="text"
                handleChange={(val) => handleFormValues("lastName", val)}
              />
            </div>
            <div className="col-span-2">
              <CustomInput
                identifier="Email address"
                type="email"
                handleChange={(val) => handleEmail(val)}
              />
            </div>
            <div className="row-start-3">
              <CustomInput
                identifier="Password"
                type="password"
                handleChange={(val) => handlePassword(val)}
              />
            </div>
            <div className="col-start-1 row-start-4">
              <CustomInput
                identifier="Confirm password"
                type="password"
                handleChange={(val) => handlePasswordMatch(val)}
              />
            </div>

            {/* Password verification element */}
            <div className="row-span-2 col-start-2 row-start-3 rounded-md border-0 p-6 shadow-sm ring-1 ring-inset ring-gray-300">
              <div>
                <h4 className="my-2 text-sm font-semibold text-gray-900">
                  Your password must contain:
                </h4>
                <ul className="space-y-1 text-sm text-gray-500">
                  <li
                    className={`${
                      pwReq.hasPwDigit && "text-indigo-500"
                    } flex items-center gap-x-2`}
                  >
                    {pwReq.hasPwDigit ? <DataCheck /> : <DataUncheck />}
                    Must contain a number digit.
                  </li>
                  <li
                    className={`${
                      pwReq.hasPwLetter && "text-indigo-500"
                    } flex items-center gap-x-2`}
                  >
                    {pwReq.hasPwLetter ? <DataCheck /> : <DataUncheck />}
                    Must contain a letter.
                  </li>
                  <li
                    className={`${
                      pwReq.hasPwMatch && "text-indigo-500"
                    } flex items-center gap-x-2`}
                  >
                    {pwReq.hasPwMatch ? <DataCheck /> : <DataUncheck />}
                    Confirm password matches.
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-2 row-start-5">
              <CustomInput
                identifier="Address (optional)"
                type="text"
                isRequired={false}
                handleChange={(val) => handleFormValues("address", val)}
              />
            </div>
            <div className="col-start-1 col-span-2 row-start-6">
              <CustomSubmitButton
                onClick={async (e) => {
                  handleMsg();
                  const { hasPwDigit, hasPwLetter, hasPwMatch } = pwReq;
                  if (msg !== "Create account") {
                    e.preventDefault();
                  } else {
                    /* only check if its a unique email AFTER all other checks have passed to
                       avoid extra fake network call 
                    */
                    const isNewEmail = await checkNewEmail(formValues);
                    if (!isNewEmail) {
                      e.preventDefault();
                      setMsg("Email already exists");
                      return;
                    }
                    handleSubmit(
                      e,
                      formValues,
                      hasPwDigit && hasPwLetter && hasPwMatch && hasValidEmail
                    );
                  }
                }}
                disabled={msg !== "Create account"}
                text={msg}
              />
            </div>
          </div>
        </CustomForm>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already a user? {/* go back to Sign in page */}
          <button
            onClick={toggleScreen}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </button>
        </p>
      </div>
    </>
  );
};
