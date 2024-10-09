import { Nav, Button } from "@douyinfe/semi-ui";
import { IconGithubLogo } from "@douyinfe/semi-icons";
import { useMatch, useNavigate } from "react-router-dom";
import { QuickLink } from "./QuickLink";
import { IconIntro } from "@douyinfe/semi-icons-lab";

export function Navigator() {
  const navigate = useNavigate();
  const match = useMatch("/task/preview/:taskId")
  return (
    <>
      <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
        <Nav.Header>
          <img src="/mineru.png" className="h-9 mr-2" />
          <span>PDF扫描助理</span>
        </Nav.Header>
        <QuickLink />
        <Nav.Footer>
          {
            match && <Button className="mr-2"
            icon={<IconIntro />}
            onClick={() => navigate("/")} >返回首页</Button>
          }
          <Button
            onClick={() =>
              navigate("https://github.com/liuhuapiaoyuan/MinerU-PDFScanner")
            }
            theme="borderless"
            icon={<IconGithubLogo size="large" />}
          />
        </Nav.Footer>
      </Nav>
    </>
  );
}
