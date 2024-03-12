import { JSX } from "react";

interface ICustomFormProps {
  action: string;
  children?: JSX.Element;
  method?: "GET" | "POST";
}

export const CustomForm = ({
  children,
  action,
  method = "GET",
}: ICustomFormProps) => (
  <form className="space-y-6" action={action} method={method}>
    {children}
  </form>
);
