import { defineConfig } from "vite";
import compressionBuild from "rollup-plugin-compression";
import vue from "@vitejs/plugin-vue";
const option = {
  sourceName: `dist`,
  type: "zip",
  targetName: `dist-portal`,
};
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), compressionBuild.default(option)],
  server: {
    // https: true,
    proxy: {
      "/xkbapp": {
        // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: "http://10.0.100.96", // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
      },
    },
  },
});
