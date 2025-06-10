# Period Hub 部署检查清单

## 📋 部署前检查

### 代码准备
- [ ] 所有代码已提交到 Git
- [ ] 构建测试通过 (`npm run build`)
- [ ] 本地开发服务器正常 (`npm run dev`)
- [ ] 所有 TypeScript 错误已修复
- [ ] ESLint 检查通过
- [ ] 依赖项已更新到最新稳定版本

### 配置文件检查
- [ ] `package.json` 版本号正确
- [ ] `next.config.js` 配置适合目标平台
- [ ] 环境变量已设置
- [ ] `.gitignore` 包含必要的忽略文件
- [ ] `vercel.json` 配置正确（如果使用 Vercel）

### 内容检查
- [ ] 所有页面内容完整
- [ ] 图片资源已优化
- [ ] 多语言内容同步
- [ ] 链接地址正确
- [ ] SEO 元数据完整

## 🚀 Vercel 部署清单

### 部署前准备
- [ ] GitHub 仓库已更新
- [ ] Vercel 账号已设置
- [ ] 项目已连接到 GitHub

### 部署配置
- [ ] Framework Preset: Next.js
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`
- [ ] Install Command: `npm ci`
- [ ] Node.js Version: 18.x

### 环境变量
- [ ] `NEXT_PUBLIC_BASE_URL=https://periodhub.health`
- [ ] `NODE_ENV=production`

### 域名配置
- [ ] 添加 `periodhub.health`
- [ ] 添加 `www.periodhub.health`
- [ ] DNS 记录已配置
- [ ] SSL 证书已生成

### 部署验证
- [ ] 构建成功完成
- [ ] 部署状态为 "Ready"
- [ ] 主域名可访问
- [ ] WWW 重定向正常
- [ ] HTTPS 强制启用

## 📄 GitHub Pages 部署清单

### 配置准备
- [ ] `next.config.js` 设置为静态导出
- [ ] GitHub Actions 工作流已配置
- [ ] `public/CNAME` 文件已创建
- [ ] `public/.nojekyll` 文件已创建

### 仓库设置
- [ ] 仓库为 Public
- [ ] GitHub Actions 已启用
- [ ] Pages 源设置为 "GitHub Actions"

### 部署验证
- [ ] Actions 工作流运行成功
- [ ] 静态文件已生成
- [ ] GitHub Pages 站点可访问
- [ ] 自定义域名正常工作

## 🌐 Cloudflare 配置清单

### DNS 设置
- [ ] A/CNAME 记录指向正确目标
- [ ] WWW 子域名已配置
- [ ] DNS 传播已完成
- [ ] 代理状态已启用（橙色云朵）

### SSL/TLS 配置
- [ ] 加密模式: "完全(严格)"
- [ ] "始终使用 HTTPS" 已启用
- [ ] SSL 证书状态: 有效
- [ ] HSTS 已启用

### 性能优化
- [ ] Brotli 压缩已启用
- [ ] 缓存规则已配置
- [ ] 页面规则已设置
- [ ] 速度优化已启用

### 安全设置
- [ ] WAF 规则已配置
- [ ] 安全级别: 中等
- [ ] Bot 管理已启用
- [ ] 安全头部已设置

## ✅ 部署后验证

### 功能测试
- [ ] 主页加载正常
- [ ] 中英文切换正常
- [ ] 所有导航链接有效
- [ ] 文章页面显示正确
- [ ] 交互工具功能正常
- [ ] 表单提交正常
- [ ] 搜索功能正常

### 性能测试
- [ ] 页面加载时间 < 3秒
- [ ] Core Web Vitals 评分良好
- [ ] 移动端响应式正常
- [ ] 图片加载优化
- [ ] 字体加载正常

### SEO 检查
- [ ] Meta 标题和描述正确
- [ ] Open Graph 标签完整
- [ ] 结构化数据有效
- [ ] Sitemap 可访问
- [ ] Robots.txt 正确
- [ ] 内部链接结构合理

### 兼容性测试
- [ ] Chrome 浏览器正常
- [ ] Firefox 浏览器正常
- [ ] Safari 浏览器正常
- [ ] Edge 浏览器正常
- [ ] 移动端 Chrome 正常
- [ ] 移动端 Safari 正常

### 安全检查
- [ ] HTTPS 强制重定向
- [ ] 安全头部正确设置
- [ ] 无混合内容警告
- [ ] 无 XSS 漏洞
- [ ] 无 CSRF 漏洞

## 🔧 故障排除清单

### 常见问题检查
- [ ] DNS 解析是否正确
- [ ] SSL 证书是否有效
- [ ] 缓存是否需要清除
- [ ] 环境变量是否正确
- [ ] 构建日志是否有错误

### 回滚准备
- [ ] 备份当前版本
- [ ] 回滚计划已制定
- [ ] 监控告警已设置
- [ ] 联系方式已准备

## 📊 监控设置

### 性能监控
- [ ] Vercel Analytics 已启用
- [ ] Google Analytics 已配置
- [ ] Core Web Vitals 监控
- [ ] 错误追踪已设置

### 可用性监控
- [ ] Uptime 监控已配置
- [ ] 告警通知已设置
- [ ] 状态页面已创建

## 📝 部署记录

### 部署信息
- 部署日期: ___________
- 部署版本: ___________
- 部署平台: ___________
- 部署人员: ___________

### 验证结果
- 功能测试: ✅ / ❌
- 性能测试: ✅ / ❌
- SEO 检查: ✅ / ❌
- 安全检查: ✅ / ❌

### 备注
_记录部署过程中的问题和解决方案_

---

**完成所有检查项后，Period Hub 即可正式上线！** 🎉
