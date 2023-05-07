import { Slider } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";

import {
  defaultDamping,
  defaultMass,
  defaultStiffness,
} from "@/configs/defaults";

type Props = {
  mass: number;
  damping: number;
  stiffness: number;
  onReset: () => void;
};

const formatMassValue = (value: number) => {
  if (value <= 100) {
    return value / 100;
  }

  return 1 + (value - 100) / 10;
};

const reverseMassValue = (value: number) => {
  if (value <= 1) {
    return +(value * 100).toFixed(2);
  }

  return 100 + (value - 1) * 10;
};

const Settings = ({ mass, damping, stiffness, onReset }: Props) => {
  const router = useRouter();

  const hasChanged =
    mass !== defaultMass ||
    damping !== defaultDamping ||
    stiffness !== defaultStiffness;

  return (
    <div className="flex flex-col gap-y-3 px-4 h-full">
      <div className="flex flex-col space-y-1 bg-zinc-900/40 px-4 py-2 border-zinc-700 border rounded">
        <div className="flex justify-between">
          <label className="text-zinc-300 text-sm">Mass</label>
          <label className="text-zinc-400 text-sm">{mass}</label>
        </div>

        <Slider
          className="text-zinc-400"
          step={10}
          min={10}
          max={1090}
          value={reverseMassValue(mass)}
          onChange={(e, value) => {
            router.push({
              query: { ...router.query, mass: formatMassValue(+value) },
            });
          }}
        />
      </div>

      <div className="flex flex-col space-y-1 bg-zinc-900/40 px-4 py-2 border-zinc-700 border rounded">
        <div className="flex justify-between">
          <label className="text-zinc-300 text-sm">Damping</label>
          <label className="text-zinc-400 text-sm">{damping}</label>
        </div>

        <Slider
          className="text-zinc-400"
          step={1}
          min={1}
          max={100}
          value={damping}
          onChange={(e, value) =>
            router.push({ query: { ...router.query, damping: value } })
          }
        />
      </div>

      <div className="flex flex-col space-y-1 bg-zinc-900/40 px-4 py-2 border-zinc-700 border rounded">
        <div className="flex justify-between">
          <label className="text-zinc-300 text-sm">Stiffness</label>
          <label className="text-zinc-400 text-sm">{stiffness}</label>
        </div>

        <Slider
          className="text-zinc-400"
          step={1}
          min={1}
          max={1000}
          value={stiffness}
          onChange={(e, value) =>
            router.push({ query: { ...router.query, stiffness: value } })
          }
        />
      </div>

      <motion.div className="flex mt-auto gap-2">
        <button
          className="bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2 rounded w-full"
          onClick={onReset}
        >
          <p>Restart</p>
        </button>

        {hasChanged && (
          <button
            className="bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2 rounded w-1/2"
            onClick={() => {
              router.push({
                query: {},
              });
            }}
          >
            Reset
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Settings;
