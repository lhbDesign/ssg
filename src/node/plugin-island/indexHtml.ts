import { readFile } from "fs/promises";
import { Plugin } from "vite";
import { CLIENT_ENTRY_PATH,DEFAULT_HTML_PATH } from "../constants";

// vite 插件
export function pluginIndexHtml(): Plugin {
  return {
    name: "island:index-html",
    apply: "serve",
    // 插入入口 script 标签
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
              src: `/@fs/${CLIENT_ENTRY_PATH}`,
            },
            injectTo: "body",
          },
        ],
      };
    },
    configureServer(server) {
      return () => {
        // 编写中间件， 写在这 return 的返回值是为了不影响自身带的中间件
        server.middlewares.use(async (req, res, next) => {
          // 读取 html 模板的内容， 通过建立的 res 对象， 响应 浏览器
          let html = await readFile(DEFAULT_HTML_PATH, "utf-8");

          try {
            // 这里的 await 是接入热更新做的更改
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            )
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    },
  };
}