import { iconColorMap, iconMap } from "#constants";
import { BsFillGearFill } from "react-icons/bs";


const RenderIcon = (techName, size = 18) => {
  const IconComponent = iconMap[techName];
  const colorClass = iconColorMap[techName] || "text-slate-400";

  if (!IconComponent) {
    return <BsFillGearFill className={`${colorClass}`} size={size} />;
  }

  return <IconComponent className={`${colorClass}`} size={size} />;
};
export default RenderIcon