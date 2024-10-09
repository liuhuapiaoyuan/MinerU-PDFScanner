import { Nav } from "@douyinfe/semi-ui";
import {
  IconHome,
  IconHistogram,
  IconLive,
  IconSetting,
} from "@douyinfe/semi-icons";
import { useNavigate, useResolvedPath } from "react-router-dom";

export function Menus() {
  const navigate = useNavigate()
  return (
    <Nav
      onSelect={e=>{
        e.itemKey && navigate(e.itemKey.toString())
      }}
      className="h-full  max-w-60 "
      defaultSelectedKeys={["Home"]}
      items={[
        { itemKey: "/createTask", text: "创建任务", icon: <IconHome size="large" /> },
        {
          itemKey: "/task",
          text: "扫描历史",
          icon: <IconHistogram size="large" />,
          items:[
            { itemKey: "/task/processing", text: "进行中" },
            { itemKey: "/task/done", text: "已完成" },
            { itemKey: "/task/error", text: "失败" },
          ]
        },
        {
          itemKey: "setting",
          text: "设置",
          icon: <IconSetting size="large" />,
        },
        {
          itemKey: "/task/preview/1",
          text: "预览",
          icon: <IconSetting size="large" />,
        },
      ]}
      footer={{
        collapseButton: true,
      }}
    />
  );
}
