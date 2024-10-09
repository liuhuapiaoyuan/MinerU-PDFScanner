import { PropsWithChildren } from "react";
import { Banner } from "@douyinfe/semi-ui";

export function Page(props: PropsWithChildren) {
  return (
    <div className="w-full h-full flex flex-col">
      <Banner className="!p-2"
        type="info"
        description="感谢使用PDF扫描器，请加个star🎉🎉🎉🎉"
      />
      <div className="w-full p-5 flex-1 h-1">{props.children}</div>
    </div>
  );
}
