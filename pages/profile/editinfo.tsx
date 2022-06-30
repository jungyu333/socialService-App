import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import tw from "tailwind-styled-components";
import LogInForm from "../../components/LogInForm";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useDispatch } from "react-redux";
import { editInfoRequestAction } from "../../action/userAction";
import { useRouter } from "next/router";

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
  nickname: string;
}

function editinfo() {
  const router = useRouter();
  const { me } = useSelector((state: RootState) => state.userReducer);
  const { editLoading, editDone, editError } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { register, handleSubmit, setValue } = useForm<ValidForm>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (me) {
      if (me.nickname) {
        setValue("nickname", me.nickname);
      }
    }
  }, [me]);

  const onValid = ({ nickname }: ValidForm) => {
    dispatch(editInfoRequestAction({ nickname }));
    if (editDone) {
      router.push("/profile");
    }
  };

  return (
    <Layout>
      <LogInForm headTitle="회원 정보 수정">
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <InputHead>Nick Name</InputHead>
          <Input
            register={register("nickname")}
            type="text"
            placeholder="Name"
          />

          <div>
            <SubmitButton>수정하기</SubmitButton>
          </div>
        </LoginForm>
      </LogInForm>
    </Layout>
  );
}

export default editinfo;
