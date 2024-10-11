declare module 'vitepress-carbon/config' {
    import { UserConfig } from 'vitepress'
    const config: () => Promise<UserConfig>
    export default config
}