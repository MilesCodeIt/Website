import { createSignal, onMount, onCleanup } from "solid-js";

interface ScrambleTextProps {
  text: string;
  scrambleSpeed?: number; // milliseconds per frame
  revealSpeed?: number; // characters revealed per iteration
  delay?: number; // delay before starting animation in ms
}

const ScrambleText = (props: ScrambleTextProps) => {
  const scrambleChars = "010111000";
  const [displayText, setDisplayText] = createSignal(props.text.split("").map(() => scrambleChars[
    Math.floor(Math.random() * scrambleChars.length)
  ]).join(""));
  const speed = props.scrambleSpeed || 30;
  const revealSpeed = props.revealSpeed || 1;

  let animationFrame: number | null = null;
  let timeoutId: number | null = null;
  let revealedIndex = 0;

  const scramble = () => {
    const targetText = props.text;
    let iteration = 0;

    const animate = () => {
      const result = targetText
        .split("")
        .map((char, index) => {
          if (index < revealedIndex) {
            return char;
          }

          if (char === " " || char === "\n") {
            return char
          }

          return scrambleChars[
            Math.floor(Math.random() * scrambleChars.length)
          ];
        })
        .join("");

      setDisplayText(result);

      // Gradually reveal characters
      if (iteration % 3 === 0) {
        revealedIndex += revealSpeed;
      }

      iteration++;

      // Continue animation if not all characters are revealed
      if (revealedIndex < targetText.length) {
        timeoutId = window.setTimeout(() => {
          animationFrame = requestAnimationFrame(animate);
        }, speed);
      } else {
        // Ensure final text is correct
        setDisplayText(targetText);
      }
    };

    animate();
  };

  const startAnimation = () => {
    revealedIndex = 0;
    const delay = props.delay || 0;

    if (delay > 0) {
      timeoutId = window.setTimeout(() => {
        scramble();
      }, delay);
    } else {
      scramble();
    }
  };

  onMount(() => {
    startAnimation();
  })


  onCleanup(() => {
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  });

  return <>{displayText()}</>;
};

export default ScrambleText;
