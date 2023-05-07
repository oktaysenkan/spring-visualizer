import React from "react";
import { useEffectOnce } from "usehooks-ts";

type Props = {
  children: React.ReactNode;
};

const ShiningProvider = ({ children }: Props) => {
  useEffectOnce(() => {
    document.body.onmousemove = (e) => {
      document.querySelectorAll(".shining").forEach((element) => {
        const elementAsDiv = element as HTMLDivElement;

        const rect = elementAsDiv.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        elementAsDiv.style.setProperty("--mouse-x", `${x}px`);
        elementAsDiv.style.setProperty("--mouse-y", `${y}px`);
      });
    };
  });

  return <>{children}</>;
};

export default ShiningProvider;
