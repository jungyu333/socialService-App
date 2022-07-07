import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import tw from "tailwind-styled-components";
import Input from "../components/Input";
import { useRouter } from "next/router";
import LogInForm from "../components/LogInForm";
import { useDispatch } from "react-redux";
import {
  logInErrorInitAction,
  logInRequestAction,
  userInfoLoadAction,
} from "../action/userAction";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { signUpErrorInitAction } from "../action/signUpAction";

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
  const { me, logInLoading } = useSelector(
    (state: RootState) => state.userReducer
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidForm>();
  const onValid = ({ email, password }: ValidForm) => {
    dispatch(logInRequestAction({ email, password }));
  };
  const onClickNewUser = () => {
    router.push("createuser");
  };
  useEffect(() => {
    if (me) {
      router.replace("/");
    }
  }, [me]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>로그인| Social Service</title>
      </Head>
      <Layout>
        <LogInForm headTitle="로그인">
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
            <Sign onClick={onClickNewUser}>계정이 없으신가요?</Sign>

            <SubmitButton>
              {logInLoading ? "Loading..." : "로그인"}
            </SubmitButton>
          </LoginForm>
        </LogInForm>
      </Layout>
    </>
  );
};
export default SignIn;
