interface ICustomSubmitButton {
  text?: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}

export const CustomSubmitButton = ({
  text = "Sign in",
  onClick,
  disabled = false,
}: ICustomSubmitButton) => (
  <button
    type="submit"
    onClick={(e) => onClick(e)}
    className={`flex w-full justify-center rounded-md ${
      disabled ? "bg-red-600" : "bg-indigo-600"
    } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
      disabled ? "hover:bg-red-500" : "hover:bg-indigo-500"
    } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
  >
    {text}
  </button>
);
