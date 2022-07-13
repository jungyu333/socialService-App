import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import tw from "tailwind-styled-components";
import {
  addPostRequestAction,
  postImageDeleteAction,
  postImageUploadRequestAction,
} from "../action/postActions";
import { myInfoLoadRequestAction } from "../action/userAction";
import { RootState } from "../reducers";

const Wrapper = tw.div`
  max-w-sm
  mx-auto
  sm:max-w-md
  mt-10
`;

const FormContainer = tw.form`
  space-y-1
`;

const TextArea = tw.textarea`
  w-full
  p-2
  focus:outline-none
  focus:ring-2
  focus:ring-indigo-500
  rounded-md
  border-[1px]
  border-gray-400
  
`;

const SubmitButtonContainer = tw.div`
  flex
  items-center
  justify-between
`;

const SubmitButton = tw.button`
  bg-indigo-400
  hover:bg-indigo-600
  text-white
  p-2
  px-4
  rounded-md
`;

const PlusPhoto = tw(PlusSquareOutlined)`
  text-indigo-400
  hover:text-indigo-700
  text-3xl
  cursor-pointer
`;

const ImageInput = tw.input`
  hidden
`;

const PreImage = tw.img`
  w-28
  h-28
  bg-cover
`;

interface ValidForm {
  content: string;
}

function PostForm() {
  const { imagePaths } = useSelector((state: RootState) => state.postReducer);
  const dispatch = useDispatch();
  const photoInput = useRef<HTMLInputElement>();
  const { register, handleSubmit, reset } = useForm<ValidForm>();
  const onClickPhoto = useCallback(() => {
    photoInput.current.click();
  }, [photoInput.current]);
  const onValid = ({ content }: ValidForm) => {
    if (!imagePaths) {
      dispatch(addPostRequestAction({ content }));
    } else {
      const formData = new FormData();
      imagePaths.forEach((image) => {
        formData.append("image", image);
      });
      formData.append("content", content);
      dispatch(addPostRequestAction(formData));
    }
    reset();
  };
  const onChangePhoto = (e) => {
    const formData = new FormData();
    [].forEach.call(e.target.files, (file) => {
      formData.append("postimg", file);
    });
    dispatch(postImageUploadRequestAction(formData));
    e.target.value = "";
  };
  const onClickPostImgDelete = (index) => {
    dispatch(postImageDeleteAction(index));
  };

  return (
    <Wrapper>
      <FormContainer
        onSubmit={handleSubmit(onValid)}
        encType="multipart/form-data"
      >
        <TextArea {...register("content")} rows={4} />
        <SubmitButtonContainer>
          <PlusPhoto onClick={onClickPhoto} />
          <ImageInput
            multiple
            type="file"
            ref={photoInput}
            name="postimg"
            accept="image/*"
            onChange={onChangePhoto}
          />
          <SubmitButton>짹짹</SubmitButton>
        </SubmitButtonContainer>
      </FormContainer>
      <div>
        {imagePaths.length !== 0 ? (
          <div className="flex px-2 items-center space-x-2 mt-2 overflow-auto scrollbar-thin  scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {imagePaths.map((image) => (
              <div key={image} className="h-36 w-28 min-w-max mb-2">
                <PreImage src={`http://localhost:4000/${image}`} />
                <button
                  onClick={() => onClickPostImgDelete(image)}
                  className="text-lg text-gray-400 hover:text-red-500"
                >
                  <DeleteOutlined />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
}

export default PostForm;
