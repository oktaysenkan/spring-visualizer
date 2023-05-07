import { useRouter } from "next/router";
import { useMemo } from "react";

import {
  defaultDamping,
  defaultMass,
  defaultStiffness,
} from "@/configs/defaults";

const useInitialValues = () => {
  const router = useRouter();

  const initalValues = useMemo(() => {
    let mass = defaultMass;
    let damping = defaultDamping;
    let stiffness = defaultStiffness;

    if (!isNaN(Number(router.query.mass))) {
      mass = Number(router.query.mass);
    }

    if (!isNaN(Number(router.query.damping))) {
      damping = Number(router.query.damping);
    }

    if (!isNaN(Number(router.query.stiffness))) {
      stiffness = Number(router.query.stiffness);
    }

    return {
      mass,
      damping,
      stiffness,
    };
  }, [router.query]);

  return initalValues;
};

export default useInitialValues;
