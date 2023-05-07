import {
  AnimationControls,
  MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import React, { MouseEventHandler, forwardRef } from "react";

type Props = {
  controls: AnimationControls;
};

const Visualizer = forwardRef<HTMLDivElement, Props>(({ controls }, ref) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = ({
    clientX,
    clientY,
    currentTarget,
  }) => {
    let { left, top } = currentTarget?.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      ref={ref}
      className="group relative card-pattern bg-[50%_center] bg-pattern border border-zinc-700 rounded-md bg-zinc-900/40 h-96"
      onMouseMove={handleMouseMove}
    >
      <div className="shining">
        <div className="shining-content">
          <div className="flex items-center p-4">
            <BackgroundMotion mouseX={mouseX} mouseY={mouseY} />

            <motion.div
              animate={controls}
              className="w-10 aspect-square rounded-full bg-zinc-300 border-[3px] border-zinc-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

const BackgroundMotion = ({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) => {
  return (
    <motion.div
      className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
      style={{
        background: useMotionTemplate`
radial-gradient(
500px circle at ${mouseX}px ${mouseY}px,
rgba(39, 39, 42, 0.13),
transparent 80%
)
`,
      }}
    />
  );
};

Visualizer.displayName = "Visualizer";

export default Visualizer;
