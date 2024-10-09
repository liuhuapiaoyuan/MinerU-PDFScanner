import React from "react";
import { List, Avatar, ButtonGroup, Button } from "@douyinfe/semi-ui";
import { Tag, Space } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";

const StatusMap = {
  done: (
    <Tag size="large" color="green">
      {" "}
      已完成{" "}
    </Tag>
  ),
  processing: (
    <Tag size="large" color="blue">
      {" "}
      处理中{" "}
    </Tag>
  ),
  error: (
    <Tag size="large" color="red">
      {" "}
      失败{" "}
    </Tag>
  ),
};

export function Component() {
  const data = [
    { file: "文件1.pdf", status: "done" },
    { file: "文件2.pdf", status: "processing" },
  ];
  const navigate = useNavigate();
  return (
    <div>
      <List
        className="border m-5"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            header={<Avatar color="blue">PDF</Avatar>}
            main={
              <div className="">
                <div>{item.file}</div>
                <div>{StatusMap[item.status as "error"]}</div>
              </div>
            }
            extra={
              <ButtonGroup theme="borderless">
                <Button onClick={() => navigate("/task/preview/1")}>
                  预览
                </Button>
                <Button>取消</Button>
              </ButtonGroup>
            }
          />
        )}
      />
    </div>
  );
}
