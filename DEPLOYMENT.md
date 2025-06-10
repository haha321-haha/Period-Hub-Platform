# Period Hub 完整部署指南

## 📋 部署概览

本指南将帮助您将 Period Hub 网站部署到多个平台，包括 Vercel、GitHub Pages 和 Cloudflare，并配置自定义域名 `periodhub.health`。

### 技术栈
- **前端框架**: Next.js 14.2.29
- **部署平台**: Vercel (主要) + GitHub Pages (备用)
- **CDN/DNS**: Cloudflare
- **自定义域名**: periodhub.health

### 部署策略
1. **Vercel 部署** (推荐) - 支持完整的 Next.js 功能
2. **GitHub Pages 部署** (备用) - 静态导出版本
3. **Cloudflare 配置** - DNS 和 CDN 优化

## 🚀 方案一：Vercel 部署 (推荐)

### 第一步：准备 GitHub 仓库

1. **确认仓库设置**
   ```bash
   仓库地址: https://github.com/haha321-haha/Period-Hub-Platform.git
   分支: main
   可见性: Public
   ```

2. **推送最新代码**
   ```bash
   git add .
   git commit -m "🚀 准备 Vercel 部署"
   git push origin main
   ```

### 第二步：Vercel 部署设置

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 选择 `Period-Hub-Platform` 仓库

3. **配置部署设置**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm ci
   ```

4. **环境变量设置**
   ```
   NEXT_PUBLIC_BASE_URL=https://periodhub.health
   NODE_ENV=production
   ```

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成（约 3-5 分钟）

### 第三步：配置自定义域名

1. **在 Vercel 中添加域名**
   - 进入项目 Settings → Domains
   - 添加域名: `periodhub.health`
   - 添加域名: `www.periodhub.health`

2. **获取 DNS 配置信息**
   - Vercel 会提供 DNS 记录配置
   - 记录下 CNAME 目标地址

## 🔄 方案二：GitHub Pages 部署 (备用)

### 第一步：修改配置为静态导出

1. **更新 next.config.js**
   ```javascript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true },
     trailingSlash: true,
     // ... 其他配置
   };
   ```

2. **启用 GitHub Actions**
   - 进入仓库 Settings → Actions → General
   - 选择 "Allow all actions and reusable workflows"

### 第二步：配置 GitHub Pages

1. **设置 Pages 源**
   - 进入 Settings → Pages
   - Source 选择: "GitHub Actions"

2. **推送代码触发部署**
   ```bash
   git add .
   git commit -m "🚀 配置 GitHub Pages 部署"
   git push origin main
   ```

## 🌐 方案三：Cloudflare DNS 配置

### 配置 DNS 记录

**对于 Vercel 部署：**
```
类型: CNAME
名称: @
目标: cname.vercel-dns.com
代理状态: 已代理 (🟠)

类型: CNAME
名称: www
目标: cname.vercel-dns.com
代理状态: 已代理 (🟠)
```

**对于 GitHub Pages 部署：**
```
类型: CNAME
名称: @
目标: haha321-haha.github.io
代理状态: 已代理 (🟠)

类型: CNAME
名称: www
目标: haha321-haha.github.io
代理状态: 已代理 (🟠)
```

### SSL/TLS 设置
- 进入 SSL/TLS → 概述
- 加密模式选择: "完全(严格)"
- 启用 "始终使用 HTTPS"

### 第四步：推送代码触发部署

1. **提交所有更改**
   ```bash
   git add .
   git commit -m "🚀 配置 GitHub Pages 部署"
   git push origin main
   ```

2. **监控部署状态**
   - 进入 Actions 标签页
   - 查看 "Deploy Period Hub to GitHub Pages" 工作流
   - 等待构建和部署完成（约 3-5 分钟）

## 🔧 配置文件说明

### next.config.js 关键配置
```javascript
const nextConfig = {
  output: 'export',           // 启用静态导出
  images: { unoptimized: true }, // 禁用图片优化
  trailingSlash: true,        // 添加尾部斜杠
};
```

### GitHub Actions 工作流
- **文件位置**: `.github/workflows/deploy.yml`
- **触发条件**: 推送到 main 分支
- **构建命令**: `npm run build`
- **输出目录**: `./out`

## ✅ 部署验证清单

### 基础功能测试
- [ ] 主页加载: https://periodhub.health
- [ ] 中文版本: https://periodhub.health/zh
- [ ] 英文版本: https://periodhub.health/en
- [ ] 文章页面: https://periodhub.health/en/articles/
- [ ] 自然疗法页面: https://periodhub.health/en/natural-therapies

### 双语路由测试
- [ ] 语言切换功能正常
- [ ] URL 路径正确 (/zh/, /en/)
- [ ] 所有页面双语内容显示正确

### 性能和SEO测试
- [ ] HTTPS 证书有效
- [ ] 页面加载速度 < 3秒
- [ ] 移动端响应式设计正常
- [ ] 搜索引擎可访问

## 🔍 故障排除

### 常见问题

1. **404 错误**
   - 检查 CNAME 文件是否存在
   - 确认 DNS 记录配置正确
   - 等待 DNS 传播（最多 24 小时）

2. **构建失败**
   - 检查 Node.js 版本兼容性
   - 确认所有依赖已安装
   - 查看 Actions 日志详细错误信息

3. **样式丢失**
   - 确认 `trailingSlash: true` 配置
   - 检查资源路径是否正确
   - 验证 Cloudflare 缓存设置

### 调试命令
```bash
# 本地测试静态导出
npm run build
npx serve out

# 检查构建输出
ls -la out/

# 验证 CNAME 文件
cat public/CNAME
```

## 📈 部署后优化

### Cloudflare 优化设置
1. **缓存规则**
   - 静态资源缓存 30 天
   - HTML 文件缓存 1 小时

2. **性能优化**
   - 启用 Brotli 压缩
   - 启用 HTTP/2
   - 配置 Browser Cache TTL

### 监控和维护
- 设置 Cloudflare Analytics
- 配置 Uptime 监控
- 定期检查 SSL 证书状态

## 🎯 下一步计划

1. **SEO 优化**
   - 提交 sitemap 到搜索引擎
   - 配置 Google Analytics
   - 优化页面元数据

2. **性能监控**
   - 集成 Web Vitals 监控
   - 设置错误追踪
   - 配置性能预算

---

**部署完成后，Period Hub 将在 https://periodhub.health 上线！** 🎉
