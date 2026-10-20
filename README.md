# LiangYou · Rex 首页组件

这里用于维护 **LiangYou** 的 Rex / Forward 首页模块。

## 已上线

- [豆瓣影院 · 海报优化模块](rex/LiangYou_Douban_PosterFix.js)
  - [Raw JS 地址](https://raw.githubusercontent.com/MaddestAlistar/Pages/main/rex/LiangYou_Douban_PosterFix.js)
  - 支持「正在上映 / 即将上映」，优先使用有海报的严格匹配 TMDB 结果，匹配失败时回退豆瓣封面
  - 已通过 JavaScript 语法、有效海报与豆瓣回退数据模拟测试；**Rex 真机及个别缺图影片恢复效果仍待验证**

- [原始豆瓣影院 JS 备份](rex/original/douban-cinema.js)（原文留存，当前推荐首页暂不直接使用）

## 首页版本说明（2026-10-21）

- 名称统一为 **LiangYou**（原来的首页标题是 MakkaPakka）。
- 推荐版基于已经成功导入的 89 组件版本，只替换豆瓣影院模块，猫眼电影保持原有工作配置。
- 豆瓣海报若无有效图片地址，或者原图受到防盗链限制，仍可能显示占位；不会用不匹配影片的图片冒充原海报。
- 「独播库」5 个组件原本使用 `FWENC2` 加密的 Forward 脚本，Rex 不能正常渲染。它们 **没有被宣布修复**；需要作者的 Rex 兼容模块或合法的可维护源码。
- 豆瓣的原始明文脚本已上传备份。猫眼原始明文脚本仍保留在交付 ZIP 中；当前首页的猫眼已经正常工作，因此未替换其在线模块。

## 原有猫眼工作模块

目前用户已验证的在线猫眼依赖公开的热门精选模块：

https://raw.githubusercontent.com/2kuai/ForwardWidgets/ed67616da888415f8345dd0cc5ec59bfd95588ee/Widgets/HotPicks.js

为了避免破坏已正常运行的组件，推荐版没有修改此链接。

## 备注

本仓库公开，请不要提交账号、Cookie、私有密钥或未经许可公开传播的加密模块。
