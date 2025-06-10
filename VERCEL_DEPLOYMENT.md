# Vercel 部署详细指南 - Period Hub

## 🚀 快速部署步骤

### 第一步：准备工作

1. **确认代码已推送到 GitHub**
   ```bash
   git status
   git add .
   git commit -m "🚀 准备 Vercel 部署"
   git push origin main
   ```

2. **验证构建成功**
   ```bash
   npm run build
   # 确认构建无错误
   ```

### 第二步：Vercel 账号设置

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 点击 "Sign Up" 或 "Log In"

2. **使用 GitHub 登录**
   - 选择 "Continue with GitHub"
   - 授权 Vercel 访问您的 GitHub 账号
   - 选择要授权的仓库（建议选择 All repositories）

### 第三步：导入项目

1. **创建新项目**
   - 在 Vercel 仪表板点击 "New Project"
   - 在 "Import Git Repository" 部分找到 `Period-Hub-Platform`
   - 点击 "Import"

2. **配置项目设置**
   ```
   Project Name: period-hub-platform
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm ci
   Node.js Version: 18.x
   ```

### 第四步：环境变量配置

在 "Environment Variables" 部分添加：

```
NEXT_PUBLIC_BASE_URL=https://periodhub.health
NODE_ENV=production
```

### 第五步：部署

1. **开始部署**
   - 检查所有设置
   - 点击 "Deploy"
   - 等待构建完成（通常 3-5 分钟）

2. **监控部署状态**
   - 查看构建日志
   - 等待 "Your project has been deployed" 消息

### 第六步：配置自定义域名

1. **添加域名**
   - 进入项目 Settings → Domains
   - 点击 "Add Domain"
   - 输入 `periodhub.health`
   - 点击 "Add"

2. **添加 WWW 域名**
   - 再次点击 "Add Domain"
   - 输入 `www.periodhub.health`
   - 设置重定向到主域名

3. **获取 DNS 配置**
   - Vercel 会显示需要的 DNS 记录
   - 通常是 CNAME 记录指向 `cname.vercel-dns.com`

## 🔧 高级配置

### 性能优化设置

1. **函数配置**
   ```json
   {
     "functions": {
       "app/[locale]/page.tsx": {
         "maxDuration": 10
       }
     }
   }
   ```

2. **缓存配置**
   ```json
   {
     "headers": [
       {
         "source": "/_next/static/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=31536000, immutable"
           }
         ]
       }
     ]
   }
   ```

### 自动部署设置

1. **Git 集成**
   - 每次推送到 `main` 分支自动部署
   - 预览部署：推送到其他分支创建预览

2. **部署钩子**
   - 设置 Webhook 用于外部触发
   - 配置部署通知

## ✅ 部署验证

### 基础功能测试
- [ ] 主页加载: https://periodhub.health
- [ ] 中文版本: https://periodhub.health/zh
- [ ] 英文版本: https://periodhub.health/en
- [ ] 文章页面正常显示
- [ ] 交互工具功能正常

### 性能测试
- [ ] 页面加载速度 < 3秒
- [ ] Core Web Vitals 良好
- [ ] 移动端响应式正常

### SEO 测试
- [ ] Meta 标签正确
- [ ] 结构化数据有效
- [ ] Sitemap 可访问

## 🚨 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 检查本地构建
   npm run build
   
   # 检查依赖
   npm ci
   ```

2. **域名配置问题**
   - 检查 DNS 传播状态
   - 验证 CNAME 记录正确
   - 等待 DNS 更新（最多 48 小时）

3. **环境变量问题**
   - 确认所有必需的环境变量已设置
   - 重新部署以应用新的环境变量

### 调试工具
- **Vercel CLI**: `npx vercel --help`
- **构建日志**: 在 Vercel 仪表板查看详细日志
- **预览部署**: 测试功能而不影响生产环境

## 📈 部署后优化

### 监控设置
1. **Analytics**: 启用 Vercel Analytics
2. **Speed Insights**: 监控性能指标
3. **Error Tracking**: 集成错误监控

### 持续集成
1. **自动测试**: 部署前运行测试
2. **代码质量**: 集成 ESLint 和 Prettier
3. **安全扫描**: 定期检查依赖漏洞

---

**部署完成后，Period Hub 将在 https://periodhub.health 上线！** 🎉

### 下一步
1. 配置 Cloudflare DNS
2. 设置性能监控
3. 优化 SEO 设置
