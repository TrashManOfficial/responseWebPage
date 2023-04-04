import { defineConfig } from "vite";
import compressionBuild from "rollup-plugin-compression";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import viteCompression from "vite-plugin-compression";
const option = {
  sourceName: `dist`,
  type: "zip",
  targetName: `dist-portal`,
};
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    // compressionBuild.default(option),
    viteCompression(),
    legacy({
      targets: ["defaults", "ie >= 11", "chrome 52"],
    }),
  ],
  server: {
    // https: true,
    proxy: {
      "/xkbapp": {
        // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: "https://app.xkb.com.cn", // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
      },
      "/fundapis": {
        // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: "https://app.xkb.com.cn", // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
      },
    },
  },
});
