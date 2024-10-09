import { Upload } from "@douyinfe/semi-ui";
import { Page } from "../../components/Page";

export function Component() {
  return (
    <Page>
      <div className="w-ful h-full flex  items-center flex-col justify-center gap-5">
        <h1 className="text-xl font-bold">上传PDF文件</h1>
        <p className="text-stone-500">
        支持文本/扫描型 PDF 解析，识别各类版面元素并转换为多模态 Markdown 格式
        </p>
        <Upload
            className="h-64 w-96"
          action="https://api.semi.design/upload"
          draggable={true}
          accept=".pdf"
          dragMainText={"点击上传PDF文件或拖拽PDF文件到这里"}
          dragSubText="目前仅支持PDF"
        ></Upload>
      </div>
    </Page>
  );
}
