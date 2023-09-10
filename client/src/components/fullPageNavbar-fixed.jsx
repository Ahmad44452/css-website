import { useState, useEffect } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const imgStyles = {
  maxWidth: "85%",
  maxHeight: "70%",
};

const arrowAnimation = keyframes`
 0% { transform: translateY(0px) }
 50% { transform: translateY(-12px) }
 100% { transform: translateY(0px) }
`;

const ArrowStyled = styled.div`
  color: #000;
  position: absolute;
  left: 50%;
  bottom: 10px;
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

const FullPageNavbar = () => {
  const minHeight = 85;
  const [isArrowVisible, setIsArrowVisible] = useState(true);

  const [styles, setStyles] = useState({
    height: `${Math.max(minHeight, window.innerHeight - window.scrollY)}px`,
    background: "#fff",
    color: "#fff",
    borderBottom: "1px solid #000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
  });

  const handleScroll = () => {
    if (isArrowVisible) setIsArrowVisible(false);

    setStyles({
      ...styles,
      height: `${Math.max(
        minHeight,
        parseInt(styles.height.substring(0, styles.height.length - 1)) -
          window.scrollY
      )}px`,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div style={styles}>
        <img style={imgStyles} src="./images/css-logo.jpg" />

        <ArrowStyled $isVisible={isArrowVisible}>
          <FaLongArrowAltDown />
        </ArrowStyled>
      </div>
    </>
  );
};

export default FullPageNavbar;
