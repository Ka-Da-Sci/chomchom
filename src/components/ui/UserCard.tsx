import { Image } from "@heroui/react";
import React from "react";

const UserCard: React.FC<{ srcTxt: string; userFullnames: string }> = ({
  srcTxt,
  userFullnames,
}) => {

  /* eslint-disable no-console */

  console.log(userFullnames, srcTxt);

  return (
    <div className="flex items-center gap-3 overflow-hidden w-full">
      <Image src={srcTxt} className="rounded-full max-w-10" />
      <p className="font-semibold antialiased font-poppins text-default-700 text-small hover:underline text-left text-ellipsis whitespace-nowrap overflow-hidden">
        {userFullnames}
      </p>
    </div>
  );
};

export default UserCard;
