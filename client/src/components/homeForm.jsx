import styled, { keyframes } from "styled-components";
import InputMask from "react-input-mask";

const loaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingScreen = styled.div`
  z-index: 100;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    width: 48px;
    height: 48px;
    border: 5px solid #8e2de2;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${loaderAnimation} 1s linear infinite;
  }
`;

export const HomeFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #000;
  padding: 1rem 4rem;
  background: #8e2de2;
  background: -webkit-linear-gradient(to right, #4a00e0, #8e2de2);
  background: linear-gradient(to right, #4a00e0, #8e2de2);

  @media only screen and (max-width: 425px) {
    padding: 1rem 2rem;
  }
`;

export const HomeForm = styled.form`
  /* height: 2000px; */
  width: 100%;
`;

export const JoinUsTitle = styled.h1`
  color: #fff;
  font-size: 8rem;
  font-weight: 900;
  margin-bottom: 5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: #fff;
    background: -webkit-linear-gradient(
      to right,
      #fff 0%,
      rgba(255, 255, 255, 0) 50%
    );
    background: linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 50%);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: ${(props) => props.$marginBottom || "3rem"};
`;

export const InputGroup = styled.div`
  /* width: 50%; */
  width: 2rem;
  min-width: 25rem;
  flex-grow: 1;
`;

export const InputLabel = styled.label`
  font-size: 1.8rem;
  color: #fff;
  margin-left: 0.2rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  font-weight: 600;
`;

export const FormTextInput = styled.input`
  padding: 1rem 1rem;
  font-size: 1.8rem;
  border-radius: 2px;
  outline: none;
  border: none;
  width: 100%;
  font-family: "Inter", sans-serif;
`;

export const MaskedInput = styled(InputMask)`
  padding: 1rem 1rem;
  font-size: 1.8rem;
  border-radius: 2px;
  outline: none;
  border: none;
  width: 100%;
  font-family: "Inter", sans-serif;
`;

export const UploadImage = styled.div`
  display: block;
  /* background-color: #f6f8fb; */
  background-color: transparent;
  border: 1px dashed #fff;
  width: 100%;
  cursor: pointer;
  padding: 2rem 0;
  border-radius: 8px;
  text-align: center;

  svg {
    width: 12rem;
    height: 12rem;
    fill: #fff;
    pointer-events: none;
  }

  p {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 18px;
    letter-spacing: -0.035em;
    color: #fff;
    pointer-events: none;
  }
`;

export const SubmitButton = styled.input`
  padding: 1rem 1rem;
  font-size: 1.8rem;
  border-radius: 2px;
  outline: none;
  border: none;
  width: 100%;
  font-family: "Inter", sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid #fff;
  color: #fff;
  background-color: transparent;
  transition: all 0.2s;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

export const SubmissionError = styled.p`
  color: #ff9b9b;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 3rem;
`;

export const SubmissionSuccess = styled.p`
  color: #a6ff96;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 3rem;
`;
