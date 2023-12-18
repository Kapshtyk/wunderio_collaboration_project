import clsx from "clsx";

import Icon1 from "@/styles/illustrations/1.svg";
import Icon2 from "@/styles/illustrations/2.svg";
import Icon3 from "@/styles/illustrations/3.svg";

export const RandomIcon = ({ className = null }) => {
  //eslint-disable-next-line
  const icons = [<Icon1 />, <Icon2 />, <Icon3 />];
  return (
    <div className={clsx("w-[101%", className)}>
      {icons[Math.floor(Math.random() * icons.length)]}
    </div>
  );
};
