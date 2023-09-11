import { useState, useEffect } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import cssLogo from "../assets/css-logo.jpg";

const arrowAnimation = keyframes`
 0% { transform: translateY(0px) }
 50% { transform: translateY(-12px) }
 100% { transform: translateY(0px) }
`;

const ArrowStyled = styled.div`
  color: #000;
  position: absolute;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
  animation-name: ${arrowAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 1s;

  svg {
    font-size: 20px;
  }
`;

const MainContainer = styled.div`
  background-image: url(${cssLogo});
  min-height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  transition: all 1s;
`;

const FullPageNavbar = () => {
  const [hasUserScrolled, sethasUserScrolled] = useState(false);

  const handleScroll = () => {
    if (!hasUserScrolled) {
      sethasUserScrolled(true);
      window.removeEventListener("scroll", handleScroll);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <MainContainer>
        <ArrowStyled $isVisible={!hasUserScrolled}>
          <FaLongArrowAltDown />
        </ArrowStyled>
      </MainContainer>
    </>
  );
};

export default FullPageNavbar;
