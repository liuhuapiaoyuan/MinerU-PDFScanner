import { createDatabase } from "./lib/db";
import { checkAndRelaunch } from "./lib/updater";

/**
 * 项目启动前初始化工作
 */
export async function bootstrap() {
    await createDatabase()
    await checkAndRelaunch()
}