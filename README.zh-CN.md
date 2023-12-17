# Midway Full React

> MidwayFull 是一个基于 Midwayjs + Vite + Vike + React + Antd 试验性的全栈项目，主要工作将围绕如何简化开发流程，快速开发一个B端应用而展开。

> MidwayFull 项目的灵感来自于 [Midway Hooks](https://midwayjs.org/docs/hooks/builtin-hooks), 通过 Midway Hooks 可动态生成前端可用的 API 模块, 有效缓解前后端对接中出现的协同问题，但美中不足的是， Midwayjs 没有提供成熟的前后端融合方案，例如在现有框架中引入 react 或 vue 等当下流行的前端架构，包括使用 development 与 production 两种模式。[Vite server-middlewaremode](https://cn.vitejs.dev/config/server-options.html#server-middlewaremode) 的出现，有效地解决了 node web 容器中(koa)启动前端框架的问题。 除此之外，[vike][vike] 提供的基于 [Vite](https://cn.vitejs.dev/guide/ssr.html) 的SSR 方案能消除 SPA 的一些痛点，例如加载性能与 SEO，甚至是应用的响应速度。此外，得益于前后端融合，应用中可以更好地使用 Midway Security 组件来加固应用的安全性，例如 XSS 与 CSRF 防护。

> 当然也不能无限制地夸大全栈开发的好处，学习成本与无法分解的工作量，将使开发者感受到很大的工作压力。由于前后端的耦合，也大大降低了后端接口的可复用性，使得应用的横向拆分变得相对复杂。

> 下一步，将使用 [TypeScript AST Parser](https://jordimarimon.github.io/ts-ast-parser/overview/) 来生成前端 API。由于 Typescript 的类型化处理，生成的前端API模块可直接查看其方法原型，将节省部分关于接口对接的工作开销。

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见以下链接：
* [Midway 文档][midway]
* [Midway ESModule使用指南][midway_esm]
* [Vite 文档][vite]
* [Vike 文档][vike]
* [React18 文档][react18]
* [Ant Design 5.0][antd5]

### 开发环境

* 不可缺省的安装
  + 安装 Nodejs (>= 18.0)
  + 安装 MySQL, 详细内容参见 [mysql8_usage.zh-CN.md](./docs/mysql8_usage.zh-CN.md)
* 推荐安装
  + 包管理工具推荐使用 pnpm (8.12.1)
  + IDE 推荐使用 Visual Studio Code (version 1.85.1)
  + 安装 vscode 插件:  ESlint, Prettier

### 本地开发

```bash
# 安装依赖 建议使用 pnpm 安装
$ pnpm install
## 全栈开发模式 (存在缺陷) 
# 全栈开发可能存在前后端编译器冲突, 运行一段时间后，编辑代码时 tsc 进程会出现重复多次编译的情况
$ npm run dev
## 前端开发模式
#  后端以生产模式启动，前端则为开发模式，如果仅开发前端，请使用此命令
$ npm run dev:front
# 默认地址
$ open http://localhost:7001/
```

### 部署

```bash
# 编译前后端代码
$ npm run build
# 生产模式启动
$ npm start
```

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。


[midway]: https://midwayjs.org/docs/intro
[midway_esm]: https://midwayjs.org/docs/esm
[vite]: https://cn.vitejs.dev/guide/
[vike]: https://vike.dev/
[react18]: https://zh-hans.react.dev/
[antd5]: https://ant-design.antgroup.com/index-cn

## 框架与模块

> 正在更新中... 🎁