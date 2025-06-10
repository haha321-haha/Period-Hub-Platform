# Cloudflare 配置指南 - Period Hub

## 🌐 DNS 配置

### 主要 DNS 记录
```
类型: CNAME
名称: @
目标: haha321-haha.github.io
代理状态: 已代理 (🟠)
TTL: 自动

类型: CNAME
名称: www
目标: haha321-haha.github.io  
代理状态: 已代理 (🟠)
TTL: 自动
```

### 验证 DNS 配置
```bash
# 检查 DNS 解析
nslookup periodhub.health
dig periodhub.health

# 检查 CNAME 记录
dig CNAME periodhub.health
```

## 🔒 SSL/TLS 配置

### 加密设置
1. **加密模式**: 完全(严格)
2. **最低 TLS 版本**: 1.2
3. **机会性加密**: 开启
4. **TLS 1.3**: 开启
5. **自动 HTTPS 重写**: 开启
6. **始终使用 HTTPS**: 开启

### SSL 证书
- **类型**: Universal SSL (免费)
- **有效期**: 自动续期
- **覆盖域名**: periodhub.health, *.periodhub.health

## ⚡ 性能优化

### 缓存配置
```
# 静态资源缓存规则
URL 模式: *.css, *.js, *.png, *.jpg, *.svg, *.ico
缓存级别: 标准
边缘缓存 TTL: 30 天
浏览器缓存 TTL: 30 天

# HTML 文件缓存
URL 模式: *.html, /
缓存级别: 标准  
边缘缓存 TTL: 1 小时
浏览器缓存 TTL: 1 小时
```

### 压缩设置
- **Brotli**: 开启
- **Gzip**: 开启
- **压缩级别**: 最大

## 🚀 页面规则配置

### 重定向规则
```
# 强制 HTTPS
URL: http://periodhub.health/*
设置: 始终使用 HTTPS

# WWW 重定向
URL: www.periodhub.health/*
设置: 转发 URL (301 重定向)
目标: https://periodhub.health/$1
```

### 缓存规则
```
# 静态资源
URL: periodhub.health/_next/static/*
设置: 
- 缓存级别: 缓存所有内容
- 边缘缓存 TTL: 1 年
- 浏览器缓存 TTL: 1 年

# API 路由 (如果有)
URL: periodhub.health/api/*
设置:
- 缓存级别: 绕过
```

## 🛡️ 安全配置

### 安全头部
```javascript
// 通过 Transform Rules 添加
{
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff", 
  "Referrer-Policy": "origin-when-cross-origin",
  "X-XSS-Protection": "1; mode=block",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
}
```

### WAF 规则
- **安全级别**: 中等
- **质询通过**: 开启
- **浏览器完整性检查**: 开启

## 📊 分析和监控

### Cloudflare Analytics
- **Web Analytics**: 开启
- **Core Web Vitals**: 监控
- **Bot 管理**: 开启

### 监控设置
```
# Uptime 监控
URL: https://periodhub.health
检查间隔: 1 分钟
通知方式: 邮件

# 性能监控
指标: 响应时间, 可用性
阈值: 响应时间 > 3秒
```

## 🔧 高级配置

### Workers (可选)
```javascript
// 自定义重定向和优化
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 处理特殊路由
  // 添加安全头部
  // 性能优化
}
```

### 负载均衡 (未来扩展)
```
# 如果需要多个源站
源站池:
- GitHub Pages: haha321-haha.github.io
- 备用源站: backup.periodhub.health

健康检查:
- 路径: /health
- 间隔: 30 秒
```

## ✅ 配置验证清单

### DNS 验证
- [ ] A/CNAME 记录指向正确
- [ ] WWW 重定向工作正常
- [ ] DNS 传播完成

### SSL 验证  
- [ ] HTTPS 证书有效
- [ ] 强制 HTTPS 重定向
- [ ] SSL Labs 评级 A+

### 性能验证
- [ ] 静态资源缓存正常
- [ ] Gzip/Brotli 压缩开启
- [ ] Core Web Vitals 良好

### 安全验证
- [ ] 安全头部正确设置
- [ ] WAF 规则生效
- [ ] 无安全漏洞

## 🚨 故障排除

### 常见问题

1. **DNS 解析失败**
   ```bash
   # 清除本地 DNS 缓存
   sudo dscacheutil -flushcache  # macOS
   ipconfig /flushdns            # Windows
   ```

2. **SSL 证书问题**
   - 检查证书状态
   - 验证域名验证记录
   - 等待证书颁发（最多 24 小时）

3. **缓存问题**
   ```bash
   # 清除 Cloudflare 缓存
   # 在 Cloudflare 面板: 缓存 → 清除缓存 → 清除所有内容
   ```

### 调试工具
- **Cloudflare Trace**: periodhub.health/cdn-cgi/trace
- **SSL 检查**: ssllabs.com/ssltest/
- **DNS 检查**: whatsmydns.net

---

**配置完成后，Period Hub 将通过 Cloudflare 获得全球 CDN 加速和安全保护！** 🌍
