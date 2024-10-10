import { Page } from "@/components/Page";
import { Config, configService } from "@/service/config.service";
import { Form, Button, Card, Toast } from "@douyinfe/semi-ui";
import { useRequest } from "ahooks";
import { useLoaderData } from "react-router-dom";

export function Component() {
  const data = useLoaderData() as Config;
  const configSetReq = useRequest(
    (config: Config) => configService.set(config),
    {
      manual: true,
      onSuccess(){
        Toast.success("配置保存成功");
      }
    }
  );
  console.log("data", data);
  return (
    <Page>
      <Card title="系统设置" className="w-full">
        <Form
          onSubmit={(values) => {
            configSetReq.run(values);
          }}
          initValues={data}
          layout="vertical"
        >
          <Form.Input field="uploadUrl" label="识别接口" trigger="blur" />
          <Form.Input
            field="queryTaskUrl"
            label="任务查询接口"
            trigger="blur"
          />
          <Form.Input field="fileUrl" label="资源文件接口" trigger="blur" />
          <Form.Input field="cacheDir" label="缓存目录" trigger="blur" />
          <Button
            type="primary"
            loading={configSetReq.loading}
            className="mt-2"
            htmlType="submit"
          >
            保存配置
          </Button>
        </Form>
      </Card>
    </Page>
  );
}
