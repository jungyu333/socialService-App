import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import tw from "tailwind-styled-components";

const LoginWrapper = tw.div`
  max-w-sm
  mx-auto
  bg-gray-100
  h-80
  mt-24
  space-y-10
  flex-col
  text-center
  rounded-md
  shadow-md
  sm:max-w-lg
`;

const LogInHead = tw.div`
  text-2xl
  font-bold
  pt-5
`;

const LoginForm = tw.form`
  space-y-4
  px-16
`;

const Input = tw.input`
  w-full
  rounded-md
  p-2
  placeholder:text-gray-300
  focus:outline-indigo-700
`;

const Sign = tw.div`
  cursor-pointer
  text-sm
  text-start
  text-gray-500
  hover:text-indigo-500
`;

const SubmitButton = tw.button`
  text-white
  hover:bg-indigo-600
  hover:font-bold
  border
  p-2
  px-4
  mt-4
  rounded-md
  bg-indigo-400
`;

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>로그인| Social Service</title>
      </Head>
      <Layout>
        <LoginWrapper>
          <LogInHead>로그인</LogInHead>
          <LoginForm>
            <div>
              <Input type="email" placeholder="Email" />
            </div>
            <div>
              <Input type="password" placeholder="Password" />
            </div>
            <Sign>계정이 없으신가요?</Sign>

            <SubmitButton>로그인</SubmitButton>
          </LoginForm>
        </LoginWrapper>
      </Layout>
    </>
  );
};
export default SignIn;
