import { Nav } from "@douyinfe/semi-ui";
import {
  IconHome,
  IconHistogram,
  IconGithubLogo,
  IconSetting,
} from "@douyinfe/semi-icons";
import { useNavigate, useResolvedPath } from "react-router-dom";
import NavFooter from "@douyinfe/semi-ui/lib/es/navigation/Footer";

export function Menus() {
  const navigate = useNavigate();
  return (
    <Nav
      onSelect={(e) => {
        e.itemKey && navigate(e.itemKey.toString());
      }}
      className="h-full  max-w-60 "
      defaultSelectedKeys={["Home"]}
      items={[
        {
          itemKey: "/createTask",
          text: "创建任务",
          icon: <IconHome size="large" />,
        },
        {
          itemKey: "/task",
          text: "扫描历史",
          icon: <IconHistogram size="large" />,
          items: [
            { itemKey: "/task/processing", text: "进行中" },
            { itemKey: "/task/done", text: "已完成" },
            { itemKey: "/task/error", text: "失败" },
          ],
        },
        {
          itemKey: "setting",
          text: "设置",
          icon: <IconSetting size="large" />,
        } 
      ]}
      footer={
        <div className="w-full">
          <NavFooter className="!p-0" collapseButton />
          <div className="group p-2 cursor-pointer rounded-xl text-center border  hover:shadow-sm flex flex-wrap items-center justify-center">
            <IconGithubLogo size="large" />
            <span className="group-hover:text-[#3477EB] !text-[14px]">
              Github Star{" "}
            </span>
            <span className="!text-[14px] ml-[0.5rem]">🎉</span>
          </div>
        </div>
      }
    />
  );
}
