import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import tw from "tailwind-styled-components";
import Input from "../components/Input";
import { useRouter } from "next/router";

const LoginWrapper = tw.div`
  max-w-sm
  mx-auto
  bg-gray-100
  h-96
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
  pt-10
`;

const LoginForm = tw.form`
  space-y-4
  px-16
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
  
  rounded-md
  bg-indigo-400
`;

const Error = tw.div`
  text-red-500
  text-sm
  text-start
`;

interface ValidForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidForm>();
  const onValid = (validForm: ValidForm) => {
    console.log(validForm);
    router.replace("/");
  };
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>로그인| Social Service</title>
      </Head>
      <Layout>
        <LoginWrapper>
          <LogInHead>로그인</LogInHead>
          <LoginForm onSubmit={handleSubmit(onValid)}>
            <div>
              <Input
                register={register("email", {
                  required: "이메일을 입력해주세요",
                })}
                type="email"
                placeholder="Email"
                required={true}
              />
            </div>

            <div>
              <Input
                register={register("password", {
                  required: "비밀번호를 입력해주세요",
                })}
                type="password"
                placeholder="Password"
              />
            </div>
            <Error>{errors.password?.message}</Error>
            <Sign>계정이 없으신가요?</Sign>

            <SubmitButton>로그인</SubmitButton>
          </LoginForm>
        </LoginWrapper>
      </Layout>
    </>
  );
};
export default SignIn;
