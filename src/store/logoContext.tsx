import { createContext, useState } from "react";

const blueLogoSrc =
  "https://cdn.wealthfront.com/vite/assets/wordmark-surface-light-2b8a7fbe.svg";
const greenLogoSrc =
  "https://banner2.cleanpng.com/20180505/pwq/kisspng-wealthfront-robo-advisor-investment-assets-under-m-fashion-logo-design-5aee69ceb838d1.8493342615255740947546.jpg";

export const LogoContext = createContext({
  logoSrc: blueLogoSrc,
  toggleLogo: () => {},
});

interface LogoPropsInterface {
  children?: JSX.Element | JSX.Element[];
}

// No point for this other than was having fun :)
export function LogoContextProvider(props: LogoPropsInterface) {
  const [logoSrc, setLogoSrc] = useState(blueLogoSrc);

  return (
    <LogoContext.Provider
      value={{
        logoSrc,
        toggleLogo: () =>
          setLogoSrc(logoSrc === blueLogoSrc ? greenLogoSrc : blueLogoSrc),
      }}
    >
      {props.children}
    </LogoContext.Provider>
  );
}
