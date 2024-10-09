import { Empty } from "@douyinfe/semi-ui";
import { Link, useRouteError } from "react-router-dom";
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from "@douyinfe/semi-illustrations";

export function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Empty
        image={<IllustrationConstruction style={{ width: 150, height: 150 }} />}
        darkModeImage={
          <IllustrationConstructionDark style={{ width: 150, height: 150 }} />
        }
        title={"页面丢失了"}
        description={
          <div>
            <h1>出错了!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.message}</i>
            </p>
            <Link className="text-blue-500 cursor-pointer  hover:text-blue-700" to="/">点击此处返回。</Link>
          </div>
        }
      />
    </div>
  );
}
