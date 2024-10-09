import { Layout } from "@douyinfe/semi-ui";
import { PropsWithChildren } from "react";
import { Copyright } from "./components/Copyright";
import { Menus } from "./components/Menus";
import { Navigator } from "./components/Navigator";
const { Header, Footer, Sider, Content } = Layout;
const BaseLayout = (props: PropsWithChildren) => {
  return (
    <Layout className="h-screen">
      <Header>
        <Navigator />
      </Header>
      <Layout  className="flex-1 h-1">
        <Sider>
          <Menus />
        </Sider>
        <Content>{props.children}</Content>
      </Layout>
      <Footer className="bg-gray-50 text-sm p-3">
        <Copyright />
      </Footer>
    </Layout>
  );
};

export { BaseLayout as Layout };
