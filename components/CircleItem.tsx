import { useRouter } from "next/router";
import React from "react";
import tw from "tailwind-styled-components";

const CircleContainer = tw.div`
  flex-col
  justify-center
  items-center
  space-y-2
`;

const Circle = tw.div`
  bg-indigo-500
  flex
  rounded-full
  justify-center
  items-center
  h-20
  w-20
  hover:bg-indigo-700
  cursor-pointer
  
`;

const Text = tw.div`
  text-gray-500
  
`;

function CircleItem({ children, text, link }) {
  const router = useRouter();
  const onClickLink = () => {
    router.push(link);
  };

  return (
    <>
      <CircleContainer onClick={onClickLink}>
        <Circle>{children}</Circle>
        <Text>{text}</Text>
      </CircleContainer>
    </>
  );
}

export default CircleItem;
