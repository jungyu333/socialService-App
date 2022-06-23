import React, { ReactNode } from "react";
import tw from "tailwind-styled-components";

const LoginWrapper = tw.div<WrapperProps>`
  max-w-sm
  mx-auto
  bg-gray-100
  mt-24
  
  space-y-10
  flex-col
  text-center
  rounded-md
  shadow-md
  sm:max-w-lg
  ${(p) => (p.$isLogIn ? " h-96" : "h-[40rem]")}
`;

const LogInHead = tw.div`
  text-2xl
  font-bold
  pt-10
`;

interface FormProps {
  headTitle: string;
  isLogIn?: boolean;
}

interface WrapperProps {
  $isLogIn: boolean;
}

function LogInForm({ children, headTitle, isLogIn = true }) {
  return (
    <>
      <LoginWrapper $isLogIn={isLogIn}>
        <LogInHead>{headTitle}</LogInHead>
        {children}
      </LoginWrapper>
    </>
  );
}

export default LogInForm;
