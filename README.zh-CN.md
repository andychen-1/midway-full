# Midway Full React

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见以下链接：
* [Midway 文档][midway]
* [Midway ESModule使用指南][midway_esm]
* [Vite 文档][vite]
* [Vike 文档][vike]
* [React18 文档][react18]

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

## 框架与模块

> 正在更新中... 🎁