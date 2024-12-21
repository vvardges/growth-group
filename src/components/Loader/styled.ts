import styled from "styled-components";

export const Wrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isVisible',
})<{
    isVisible: boolean;
}>`
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  position: sticky;
  top: 0;
  width: 100%;
  height: 5px;
  z-index: 3;
`;

export const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(
    to right,
    orange 10%,
    red 30%,
    purple 50%,
    green 60%,
    darkblue 70%,
    blue 80%,
    yellow 90%
  );

  -webkit-animation: lineAnim 1s linear infinite;
  -moz-animation: lineAnim 1s linear infinite;
  animation: lineAnim 1s linear infinite;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;

  @keyframes lineAnim {
    0% {
      left: -40%;
    }
    50% {
      left: 20%;
      width: 80%;
    }
    100% {
      left: 100%;
      width: 100%;
    }
  }
`;