import { Page } from "@/components/Page";
import { Form, Button, Card } from "@douyinfe/semi-ui";

export function Component() {
  return (
    <Page>
      <Card title="系统设置" className="w-full">
        <Form layout="vertical">
          <Form.Input field="minerUApi" label="MinerU接口" trigger="blur" />
          <Form.Input field="cacheDir" label="缓存路径" trigger="blur" />
          <Button type="primary" className="mt-2" htmlType="submit">
            保存配置
          </Button>
        </Form>
      </Card>
    </Page>
  );
}
