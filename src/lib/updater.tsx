import { Button, Card, MarkdownRender, Modal, Toast } from "@douyinfe/semi-ui";
import { relaunch } from "@tauri-apps/plugin-process";
import { check } from "@tauri-apps/plugin-updater";
import { useBoolean, useRequest } from "ahooks";
import { PropsWithChildren, useEffect, useState } from "react";
import { Banner } from "@douyinfe/semi-ui";

export { check } from "@tauri-apps/plugin-updater";

/**
 *  检测版本并且启动
 */
export async function checkAndRelaunch() {
  const update = await check();

  if (update?.available) {
    Modal.confirm({
      title: "发现新版本",
      content: (
        <div>
          <div>是否更新到：{update.version}</div>
          <Card title="更新内容">
            <MarkdownRender raw={update.body} />
          </Card>
        </div>
      ),
      onOk: async () => {
        await update.downloadAndInstall();
        await relaunch();
      },
    });
  }
}

export function useCheckRelaunch() {
  useEffect(() => {
    checkAndRelaunch();
  }, []);
}

export function UpdateChecker(
  props: PropsWithChildren<{
    autoCheck?: boolean;
    showButton?: boolean;
  }>
) {
  const { autoCheck = true, showButton = false } = props;
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [show, showAction] = useBoolean();
  const [event, setEvent] = useState<string | undefined>();
  const checkReq = useRequest(check, {
    manual: !autoCheck,
    cacheKey: "CHECK_VERSION",
    cacheTime: 1000 * 60,
    onSuccess(z) {
      if (!autoCheck && !z?.available) {
        Toast.info("当前已是最新版本");
      }
      showAction.set(!!z?.available);
    },
  });
  const update = checkReq.data;
  const updateReq = useRequest(
    async () => {
      return update
        ?.downloadAndInstall((e) => {
          setEvent(e.event);
          if (e.event == "Started") {
            setProgress(0);
            setTotal(e.data?.contentLength ?? 0);
          }
          if (e.event === "Finished") {
            setProgress(0);
          }
          if (e.event === "Progress") {
            setProgress((z) => z + e.data.chunkLength);
          }
        })
        .then(() => relaunch());
    },
    {
      manual: true,
      onError(e) {
        const msg = typeof e === "string" ? e : e.message;
        Modal.error({
          title: "更新失败",
          content: msg ?? "未知错误，请联系管理员。",
        });
      },
    }
  );
  return (
    <>
      {showButton && (
        <Button
          loading={checkReq.loading}
          onClick={() => checkReq.run()}
          size="small"
          className="ml-2"
          type="primary"
        >
          检查更新
        </Button>
      )}
      <Modal
        onCancel={() => {
          showAction.setFalse();
        }}
        visible={show}
        footer={null}
        title="发现新版本"
      >
        <div>
          <Card title="更新内容">
            <MarkdownRender raw={update?.body ?? ""} />
          </Card>
        </div>
        <div className="mt-5">
          <Banner
            description={
              <div className="flex ">
                <div>是否更新到版本：{update?.version}</div>
                <Button
                  type="primary"
                  loading={updateReq.loading}
                  disabled={!!event}
                  onClick={() => {
                    updateReq.run();
                  }}
                >
                  立即更新
                  {progress > 0 && (
                    <span>{((progress * 100) / total).toFixed(1)}%</span>
                  )}
                </Button>
              </div>
            }
          />
        </div>
      </Modal>
    </>
  );
}
