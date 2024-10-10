import { SettingsStore } from "@/lib/storage";
import { appDataDir } from "@tauri-apps/api/path";
import { clearCache } from "ahooks";

export type Config = {

    apiKey?: string;
    apiSecret?: string;
    /**
     * 文件路径
     */
    fileUrl?: string;
    /**
     * 上传路径
     */
    uploadUrl?: string
    /**
     * 任务查询
     */
    queryTaskUrl?: string

    /**
     * 缓存目录
     */
    cacheDir?: string
}

export class ConfigService {
    store: SettingsStore<Config>

    constructor() {
        this.store = new SettingsStore<Config>('config')
    }


    async get() {
        const appData = await appDataDir()
        const data = await this.store.get()
        return Object.assign({
            fileUrl: "http://127.0.0.1:8080/file",
            uploadUrl: "http://127.0.0.1:8080",
            queryTaskUrl: "http://127.0.0.1:8080/task",
            cacheDir: appData
        }, data)
    }

    set(config: Config) {
        clearCache("CONFIG")
        return this.store.set(config)
    }
}

export const configService = new ConfigService()