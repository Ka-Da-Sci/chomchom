import { Image } from "@heroui/react";
import xalphabetLogo from '../../assets/images/logo-trans.svg';
// import clsx from "clsx";

const BrandLogo = () => {
  return (
    <Image
      height={25}
      width={25}
      alt="xalphabet brand logo"
      src={xalphabetLogo}
    />
  );
};

export default BrandLogo;
