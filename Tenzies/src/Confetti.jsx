import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

// https://github.com/alampros/react-confetti#readme  the react confetti implementation is there

export default function ConfettiEffect() {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
}
