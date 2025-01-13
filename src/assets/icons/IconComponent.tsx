import IconTypeScript from "./IconTypeScript";
import IconNet from "./IconNet";
import IconPhotoshop from "./IconPhotoshop";
import IconXd from "./IconXd";
import IconAgility from "./IconAgility";
import IconContenful from "./IconContentful";
import IconGsap from "./IconGsap";
import IconLottie from "./IconLottie";
import IconFlash from "./IconFlash";

export default function IconComponent({
  name,
  color,
}: {
  name: string;
  color: string;
}) {
  function getIcon() {
    switch (name) {
      case "ts":
        return <IconTypeScript color={color} />;
      case "net":
        return <IconNet color={color} />;
      case "psd":
        return <IconPhotoshop color={color} />;
      case "xd":
        return <IconXd color={color} />;
      case "agility":
        return <IconAgility color={color} />;
      case "contentful":
        return <IconContenful color={color} />;
      case "gsap":
        return <IconGsap color={color} />;
      case "lottie":
        return <IconLottie color={color} />;
      case "flash":
        return <IconFlash color={color} />;
    }
  }

  return <>{getIcon()}</>;
}
