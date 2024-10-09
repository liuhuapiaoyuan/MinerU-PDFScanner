import { Input } from "@douyinfe/semi-ui";
import { HotKeys, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";
import { IconSearch } from "@douyinfe/semi-icons";
import { AutoComplete } from "@douyinfe/semi-ui";
import { useRequest } from "ahooks";
import { taskRepository } from "@/service/task.repository";
import { useNavigate } from "react-router-dom";

const hotKeys = [HotKeys.Keys.Control, HotKeys.Keys.K];

export function QuickLink() {
    const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const queryReq = useRequest(async (value:string)=>{
    if(!value || value.length<1){
        return []
    }
    return taskRepository.list("file_name LIKE $1",[`%${value}%`])
  },{
    manual:false
  })
 
  return (
    <>
      <div className=" cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          showDialog();
        }}
      >
        <Input
          onFocus={(e) => e.preventDefault()}
          prefix={
            <div className="mx-2 flex items-center gap-2">
              <IconSearch />
              <HotKeys hotKeys={hotKeys} onHotKey={showDialog}></HotKeys>
            </div>
          }
          showClear
          placeholder={"输入文件名直达"}
        ></Input>
      </div>

      <Modal
        title="文件直达"
        visible={visible}
        onOk={handleOk}
        footer={null}
        footerFill
        onCancel={handleCancel}
      >
        <AutoComplete<{label:string,value:string}>
          data={queryReq.data?.map(z=>({label:z.file_name,value:z.task_id}))}
          showClear
          autoFocus
          onSelect={(value)=>{
            setVisible(false)
            return navigate(`/task/preview/${value}`)
          }}
          onSearch={queryReq.run}
          prefix={<IconSearch />}
          placeholder="输入文件名直达... "
          className="w-full"
        />
      </Modal>
    </>
  );
}
