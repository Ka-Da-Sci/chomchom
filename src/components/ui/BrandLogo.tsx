import { Image } from "@heroui/react";
import xalphabetLogo from '../../assets/images/logo-trans.svg';
// import clsx from "clsx";

const BrandLogo = ({height, width}: {height?: number, width?: number}) => {
  return (
    <Image
      height={height ? height : 25}
      width={width ? width : 25}
      alt="xalphabet brand logo"
      src={xalphabetLogo}
    />
  );
};

export default BrandLogo;
