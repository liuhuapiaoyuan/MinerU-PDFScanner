import { Button } from "@douyinfe/semi-ui";
import { IconDarkMode } from "@douyinfe/semi-icons-lab";
import { useState } from "react";
import {IconSun} from "@douyinfe/semi-icons";
export function ThemeButton() {
    const [theme, setTheme] = useState("light");
  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
      setTheme("light");
    } else {
      body.setAttribute("theme-mode", "dark");
      setTheme("dark");
    }
  };

  return (
    <Button theme="borderless" onClick={switchMode}>
      {
        theme === "light"? <IconSun size="large" /> : <IconDarkMode size="large"  />
      }
    </Button>
  );
}
