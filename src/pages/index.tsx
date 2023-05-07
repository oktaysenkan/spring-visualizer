import { useCallback, useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useElementSize } from "usehooks-ts";

import useInitialValues from "@/hooks/useInitialValues";
import Visualizer from "@/components/Visualizer/Visualizer";
import Settings from "@/components/Settings/Settings";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

export default function Home() {
  const controls = useAnimation();
  const { mass, damping, stiffness } = useInitialValues();
  const [ref, { width }] = useElementSize();

  const reset = useCallback(async () => {
    await controls.start({
      translateX: 0,
      transition: {
        duration: 0.1,
        bounce: false,
      },
    });

    controls.set({
      translateX: 0,
    });

    controls.start({
      translateX: width - 72,
      transition: {
        type: "spring",
        damping,
        mass,
        stiffness,
        delay: 0.2,
      },
    });
  }, [controls, width, mass, damping, stiffness]);

  useEffect(() => {
    reset();
  }, [mass, damping, stiffness, width, controls, reset]);

  return (
    <>
      <Head>
        <title>Spring Visualizer</title>
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="container max-w-5xl grid grid-cols-4 gap-x-4 my-auto">
          <div className="col-span-3">
            <Visualizer ref={ref} controls={controls} />
          </div>

          <div className="col-span-1">
            <Settings
              mass={mass}
              damping={damping}
              stiffness={stiffness}
              onReset={reset}
            />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
