import { TwitterOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import tw from "tailwind-styled-components";

const Wrapper = tw.div`
`;

const NavContainer = tw.nav`
  flex
  justify-between
  items-center
  border-b-1
  h-16
  px-10
  bg-gray-100
`;

const MenuContainer = tw.div`
  flex
  items-center
  w-full
  max-w-xl
  space-x-10
`;

const MenuItem = tw.div`
  hidden
  cursor-pointer
  sm:flex text-gray-500 hover:text-indigo-700 hover:border-b-[1px] hover:font-bold
`;

const MobileButton = tw.button`
  sm:hidden
`;

const SearchInput = tw.input`
  hidden
  sm:flex
  p-1
  bg-transparent
  placeholder:text-gray-400
  focus:outline-indigo-700
  rounded-md
`;

const MobileSearchInput = tw.input`
  p-1
  bg-transparent
  placeholder:text-gray-300
  focus:outline-indigo-700
  rounded-md
`;

const MobileNavContainer = tw.nav<IsToggeldProps>`
  ${(p) =>
    p.$isToggled
      ? "py-4 absolute w-full flex-col z-10 justify-center bg-gray-100 text-gray-500 space-y-2 px-2 "
      : "hidden"}
  sm:hidden
  
`;

interface IsToggeldProps {
  $isToggled: boolean;
}

const MobileMenuItem = tw.div`
  hover:font-bold 
  hover:text-indigo-700
  cursor-pointer
`;

const LogIn = tw.a<LogInProps>`
  ${(p) => (p.$isLogIn ? "hidden" : "visible")}
`;

interface LogInProps {
  $isLogIn: boolean;
}
const Layout = ({ children }) => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const onClickMenu = () => {
    setIsToggled(!isToggled);
  };

  return (
    <Wrapper>
      <NavContainer>
        <MenuContainer>
          <TwitterOutlined style={{ color: "#4F46E5 ", fontSize: "24px" }} />
          <MenuItem>
            <Link href="/">
              <a>홈</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/profile">
              <a>마이페이지</a>
            </Link>
          </MenuItem>
          {!isLogIn ? (
            <MenuItem>
              <Link href="/signin">
                <LogIn $isLogIn={isLogIn}>로그인</LogIn>
              </Link>
            </MenuItem>
          ) : (
            <MenuItem>
              <button>로그아웃</button>
            </MenuItem>
          )}
        </MenuContainer>
        <MobileButton onClick={onClickMenu}>
          {!isToggled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </MobileButton>
        <SearchInput placeholder="search" />
      </NavContainer>
      <MobileNavContainer $isToggled={isToggled}>
        <MobileMenuItem>
          <Link href="/">
            <a>홈</a>
          </Link>
        </MobileMenuItem>
        <MobileMenuItem>
          <Link href="/profile">
            <a>마이페이지</a>
          </Link>
        </MobileMenuItem>
        {!isLogIn ? (
          <MobileMenuItem>
            <Link href="/signin">
              <LogIn $isLogIn={isLogIn}>로그인</LogIn>
            </Link>
          </MobileMenuItem>
        ) : (
          <MobileMenuItem>
            <button>로그아웃</button>
          </MobileMenuItem>
        )}

        <MobileSearchInput placeholder="search" />
      </MobileNavContainer>
      {children}
    </Wrapper>
  );
};

export default Layout;
