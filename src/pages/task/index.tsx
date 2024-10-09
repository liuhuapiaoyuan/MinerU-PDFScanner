import React from "react";
import { List, Avatar, ButtonGroup, Button } from "@douyinfe/semi-ui";
import { Tag, Space } from "@douyinfe/semi-ui";
import { useMatch, useNavigate } from "react-router-dom";
import { taskRepository } from "@/service/task.repository";
import { useRequest } from "ahooks";

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
  const match= useMatch("/task/:status")
  const status = match?.params?.status??"processing"
  const tasksReq = useRequest(()=>taskRepository.list("status in ($1)",[status]),{
    refreshDeps:[status]
  }) 
  const navigate = useNavigate();
  return (
    <div>
      <List
        loading={tasksReq.loading}
        className="border m-5"
        dataSource={tasksReq.data}
        renderItem={(item) => (
          <List.Item
            header={<Avatar color="blue">PDF</Avatar>}
            main={
              <div className="">
                <div>{item.file_name}</div>
                <div>{StatusMap[item.status as "error"]}</div>
              </div>
            }
            extra={
              <ButtonGroup theme="borderless">
                <Button onClick={() => navigate(`/task/preview/${item.task_id}`)}>
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
