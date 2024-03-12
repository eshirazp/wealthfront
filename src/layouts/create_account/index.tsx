import { MouseEvent, useId } from "react";
import { GET, POST } from "@/api";
import { CreateAccount } from "./create_account";

export interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordVerify: string;
  address: string;
}

interface CreateAccountContainerProps {
  toggleScreen: () => void;
}

export const CreateAccountContainer = ({
  toggleScreen,
}: CreateAccountContainerProps) => {
  const id = useId();

  /* call to hit the fake network call in API to backend. here I chose to assign 
     an id in the client code to push for optimistic UI with rollback for a more
     fluid user experience
  */
  const createUser = async (formValues: IFormValues) => {
    try {
      await POST({
        id,
        ...formValues,
      });
      toggleScreen();
    } catch (e) {
      console.error("Network call error");
    }
  };

  // handle form submit. if not valid, don't create user
  const handleSubmit = (
    e: MouseEvent<HTMLElement>,
    formValues: IFormValues,
    isValid: boolean
  ) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    createUser(formValues);
  };

  /* check if email is unique before calling to createUser */
  const checkNewEmail = async (formValues: IFormValues) => {
    try {
      await GET(formValues);
      return false;
    } catch {
      return true;
    }
  };

  return (
    <CreateAccount
      handleSubmit={handleSubmit}
      checkNewEmail={(formValues: IFormValues) => checkNewEmail(formValues)}
      toggleScreen={toggleScreen}
    />
  );
};
