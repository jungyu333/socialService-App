import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import tw from "tailwind-styled-components";
import LogInForm from "../../components/LogInForm";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useDispatch } from "react-redux";
import { editInfoRequestAction } from "../../action/editInfoActions";

const LoginForm = tw.form`
  space-y-4
  px-16
`;

const SubmitButton = tw.button`
  text-white
  hover:bg-indigo-600
  hover:font-bold
  border
  p-2
  px-4
  mt-8
  rounded-md
  bg-indigo-400
`;

const InputHead = tw.div`
  text-sm
  text-gray-500
  text-start
`;

interface ValidForm {
  email: string;
  name: string;
}

function editinfo() {
  const { me } = useSelector((state: RootState) => state.userReducer);
  const { register, handleSubmit, setValue } = useForm<ValidForm>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (me) {
      if (me.email) {
        setValue("email", me.email);
      }
      if (me.nickname) {
        setValue("name", me.nickname);
      }
    }
  }, [me]);

  const onValid = ({ email, name }: ValidForm) => {
    console.log(email, name);
    dispatch(editInfoRequestAction({ email, name }));
  };
  return (
    <Layout>
      <LogInForm headTitle="회원 정보 수정">
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <InputHead>Email ID</InputHead>
          <Input
            register={register("email")}
            type="email"
            placeholder="Email ID"
          />
          <InputHead>Nick Name</InputHead>
          <Input register={register("name")} type="text" placeholder="Name" />

          <div>
            <SubmitButton>수정하기</SubmitButton>
          </div>
        </LoginForm>
      </LogInForm>
    </Layout>
  );
}

export default editinfo;
