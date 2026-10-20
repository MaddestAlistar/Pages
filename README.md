# LiangYouTech · Rex 首页模块

此仓库保存用户授权公开的 **LiangYouTech** 首页扩展脚本。最新版首页名称为 **𝙇𝙞𝙖𝙣𝙜𝙔𝙤𝙪𝙏𝙚𝙘𝙝**，首页图标使用良友科技原 Logo（在首页文件的 `home.json.avatarData` 内嵌）。

## 海报修复脚本

- [猫眼电影 · 海报兼容](rex/LiangYou_Maoyan_PosterFix.js)：沿用目前可用的公开院线电影数据；修复完整 HTTPS 图片地址误放入 TMDB `backdropPath` 的问题，必要时回退到 TMDB 海报。
- [豆瓣影院 · 海报兼容](rex/LiangYou_Douban_PosterFix.js)：优先选择带海报的匹配影片，检查 `posterPath` / `backdropPath` 格式，并在无匹配结果时尝试使用豆瓣原图。
- [原始豆瓣影院 JS 备份](rex/original/douban-cinema.js)（保持原始内容备查）。

## 直接引用地址

猫眼：
`https://raw.githubusercontent.com/MaddestAlistar/Pages/main/rex/LiangYou_Maoyan_PosterFix.js`

豆瓣：
`https://raw.githubusercontent.com/MaddestAlistar/Pages/main/rex/LiangYou_Douban_PosterFix.js`

## 兼容情况（2026-10-21）

- 新版首页保留 34 个分区、89 个组件；仅修改猫眼和豆瓣这两项的脚本地址与对应模块 ID，其他 87 个组件不变。
- 首页导入文件同时提供 `.rex` 与 `.fwd`：**两个文件的内部 ZIP64 内容完全一样，区别只有扩展名**。能否通过某一扩展名导入，须以用户 Rex 版本的实际文件选择器为准。
- 已验证 ZIP/JSON 结构、内嵌 PNG 以及 JS 语法；猫眼实际数据样本和豆瓣模拟数据的图片路径校验通过。**这不是全部远程海报真实可访问的保证**，部分影片缺图可能受图床、防盗链、缓存和影片元数据影响。
- 「独播库」5 个加密的 Forward 专有组件仍未恢复，不要将 FWENC2 误称为 Rex 原生兼容。
- 此公开仓库不要提交账户信息、私密 API key、Cookie 或未经许可公开传播的加密脚本。

## 说明

首页完整导入文件由用户在聊天中获取；公开仓库主要托管 JS 模块及其维护说明，避免公开分享首页配置中可能存在的私人参数。
