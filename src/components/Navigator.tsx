import { Nav, Button, Avatar } from "@douyinfe/semi-ui";
import { IconGithubLogo, IconHelpCircle } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";

export function Navigator() {
  const navigate = useNavigate()
  return (
    <>
      <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
        <Nav.Header>
          <img src="/mineru.png" className="h-9 mr-2" />
          <span>PDF扫描助理</span>
        </Nav.Header>
   
        <Nav.Footer>
          <Button 
            onClick={()=>navigate("https://github.com/liuhuapiaoyuan/MinerU-PDFScanner")}
            theme="borderless"
            icon={<IconGithubLogo size="large" />}
          />
         
        </Nav.Footer>
      </Nav>
    </>
  );
}
