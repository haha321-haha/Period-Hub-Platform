# PeriodHub Health - 痛经健康管理平台

一个专业的痛经健康管理和教育平台，提供科学的痛经缓解方案、互动工具和专业健康指导。

## 🌟 项目特色

### 🎯 核心功能
- **互动解决方案** - 症状评估问卷、痛经追踪器、数据可视化
- **情景解决方案** - 6种不同场景的专业痛经管理方案
- **自然疗法指南** - 基于科学证据的非药物缓解方法
- **健康教育资源** - 专业医学文章和PDF下载中心
- **多语言支持** - 中文/英文双语界面

### 🔬 专业内容
- 基于权威医学文献（Mayo Clinic、ACOG、PubMed）
- 整合传统中医理论与现代医学
- 涵盖15种自然疗法和管理策略
- 专业医学审核和持续更新

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: next-intl
- **图标**: Lucide React
- **部署**: Vercel / Cloudflare Pages

## 📦 安装与运行

### 环境要求
- Node.js 20.15.0+
- npm 或 yarn
- Git

### 本地开发
```bash
# 克隆项目
git clone https://github.com/haha321-hash/periodhub-health.git
cd periodhub-health

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建部署
```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 🌐 部署指南

### Vercel 部署
1. 连接GitHub仓库到Vercel
2. 设置构建命令: `npm run build`
3. 设置输出目录: `.next`
4. 配置环境变量（如需要）

### Cloudflare Pages 部署
1. 连接GitHub仓库到Cloudflare Pages
2. 构建命令: `npm run build`
3. 输出目录: `.next`
4. Node.js版本: `20.15.0`

## 📁 项目结构

```
periodhub-health/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 多语言路由
│   │   ├── articles/      # 文章页面
│   │   ├── interactive-tools/  # 互动工具
│   │   ├── scenario-solutions/ # 情景解决方案
│   │   ├── health-guide/  # 健康指南
│   │   └── ...
├── components/            # 可复用组件
│   ├── ui/               # UI基础组件
│   └── ...
├── content/              # 内容文件
│   ├── articles/         # 文章内容
│   └── ...
├── lib/                  # 工具函数
├── public/               # 静态资源
│   ├── locales/         # 翻译文件
│   └── images/          # 图片资源
└── ...
```

## 🎨 设计系统

### 颜色主题
- **主色调**: Pink/Purple 渐变
- **辅助色**: Blue, Green, Gray
- **语义色**: Success, Warning, Error

### 响应式设计
- 移动优先设计
- 支持桌面、平板、手机
- 流畅的交互体验

## 🌍 国际化

支持中文（zh）和英文（en）两种语言：
- 自动语言检测
- URL路径语言切换
- 完整的翻译覆盖

## 📊 功能模块

### 互动工具
- **症状评估问卷** - 智能评估痛经严重程度
- **痛经追踪器** - 记录和分析痛经模式
- **数据可视化** - 图表展示健康趋势

### 情景解决方案
1. 办公室痛经管理
2. 运动期间痛经应对
3. 睡眠质量改善
4. 社交场合处理
5. 通勤途中缓解
6. 不同生命阶段管理

### 健康指南
- 痛经基础知识
- 生活方式调整
- 医疗护理指导
- 全球文化视角
- 误区澄清

## 🔒 隐私与安全

- 本地数据存储
- 无个人信息收集
- 符合隐私保护标准
- 医疗免责声明

## 🤝 贡献指南

欢迎提交Issue和Pull Request：
1. Fork项目
2. 创建功能分支
3. 提交更改
4. 发起Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- **GitHub**: [@haha321-haha](https://github.com/haha321-haha)
- **项目地址**: [[https://github.com/haha321-hash/periodhub-health](https://github.com/haha321-haha/Period-Hub-Platform)]

## 🙏 致谢

感谢所有为女性健康事业做出贡献的医学专家和研究人员。

---

**免责声明**: 本平台提供的信息仅供教育参考，不能替代专业医疗建议。如有健康问题，请咨询合格的医疗专业人员。
