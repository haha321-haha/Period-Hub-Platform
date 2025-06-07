# 🎨 PeriodHub Health 网站图片需求完整清单

## 📋 总体设计规范

### 🎯 设计风格指导
- **色彩主题**: 温暖粉色系 (#F8BBD9, #E879F9) + 专业蓝色系 (#3B82F6, #1E40AF)
- **设计风格**: 现代简约、温馨专业、医疗级别的可信度
- **情感调性**: 关怀、专业、希望、力量

### 📐 技术规格标准
- **格式要求**: SVG(图标/图表) | JPG(照片) | PNG(透明背景)
- **色彩模式**: RGB (网页显示)
- **分辨率**: 72-150 DPI (网页优化)
- **压缩**: 优化文件大小，保持视觉质量

## 🏠 首页 (Homepage) 图片需求

### 1. Hero Section 主视觉
**文件名**: `hero-main-banner.jpg`
**尺寸**: 1920x800px (桌面) + 768x600px (移动端)
**存放路径**: `/public/images/hero/`
**提示词**: "Warm and professional healthcare illustration, young diverse women in comfortable poses, soft pink and blue gradient background, modern minimalist style, conveying comfort and medical trust, high quality digital art"
**要点**: 
- 展现多元化女性形象
- 温暖而专业的医疗氛围
- 避免过于临床的感觉

### 2. 功能特色图标组
**文件名**: `feature-[功能名].svg`
**尺寸**: 64x64px
**存放路径**: `/public/images/icons/features/`

#### 2.1 互动工具图标
- `feature-assessment.svg` - 症状评估
- `feature-tracker.svg` - 痛经追踪
- `feature-visualization.svg` - 数据可视化
**提示词**: "Medical assessment icon, clean line art style, pink and blue color scheme, professional healthcare symbol"

#### 2.2 解决方案图标
- `feature-scenarios.svg` - 情景解决方案
- `feature-natural-care.svg` - 自然疗法
- `feature-health-guide.svg` - 健康指南
**提示词**: "Healthcare solution icon, modern flat design, warm colors, user-friendly medical symbol"

### 3. 统计数据可视化
**文件名**: `stats-infographic.svg`
**尺寸**: 800x400px
**存放路径**: `/public/images/infographics/`
**提示词**: "Medical statistics infographic, clean data visualization, pink and blue color scheme, professional charts and graphs showing women's health data"

## 🔧 互动工具页面图片需求

### 1. 症状评估工具
**文件名**: `assessment-illustration.jpg`
**尺寸**: 600x400px
**存放路径**: `/public/images/tools/`
**提示词**: "Woman using digital health assessment tool, modern tablet interface, comfortable home setting, soft lighting, professional medical app design"

### 2. 痛经追踪器
**文件名**: `pain-tracker-dashboard.jpg`
**尺寸**: 800x500px
**存放路径**: `/public/images/tools/`
**提示词**: "Digital health tracking dashboard, clean UI design, data charts and calendars, pink and blue color scheme, modern healthcare technology"

### 3. 数据可视化图表
**文件名**: `data-charts-[类型].svg`
**尺寸**: 400x300px
**存放路径**: `/public/images/charts/`
- `data-charts-pain-levels.svg`
- `data-charts-cycle-tracking.svg`
- `data-charts-treatment-progress.svg`
**提示词**: "Medical data visualization chart, clean modern design, pink and blue gradients, professional healthcare analytics"

## 📚 文章内容图片需求

### 1. 文章分类封面图
**文件名**: `category-[分类名]-cover.jpg`
**尺寸**: 800x450px
**存放路径**: `/public/images/articles/categories/`

#### 1.1 医学指南类
- `category-medical-guide-cover.jpg`
**提示词**: "Medical textbook and stethoscope on clean desk, professional healthcare setting, soft natural lighting, pink and blue accents"

#### 1.2 自然疗法类
- `category-natural-therapy-cover.jpg`
**提示词**: "Natural healing elements, herbal tea, essential oils, yoga mat, serene spa-like setting, warm natural lighting"

#### 1.3 生活方式类
- `category-lifestyle-cover.jpg`
**提示词**: "Healthy lifestyle elements, fresh fruits, exercise equipment, journal, bright modern kitchen setting"

### 2. 治疗方法图解
**文件名**: `treatment-[方法名].jpg`
**尺寸**: 600x400px
**存放路径**: `/public/images/treatments/`

#### 2.1 热敷疗法
- `treatment-heat-therapy.jpg`
**提示词**: "Woman applying heating pad to lower abdomen, comfortable home setting, soft warm lighting, relaxed expression"

#### 2.2 按摩疗法
- `treatment-massage-therapy.jpg`
**提示词**: "Gentle abdominal massage technique demonstration, professional spa setting, hands showing proper massage movements"

#### 2.3 瑜伽体式
- `treatment-yoga-poses.jpg`
**提示词**: "Woman in yoga pose for menstrual pain relief, peaceful studio setting, natural lighting, demonstrating proper form"

### 3. 中医疗法图解
**文件名**: `tcm-[疗法名].jpg`
**尺寸**: 600x400px
**存放路径**: `/public/images/tcm/`

#### 3.1 针灸治疗
- `tcm-acupuncture.jpg`
**提示词**: "Professional acupuncture treatment, clean clinical setting, traditional Chinese medicine elements, professional and trustworthy"

#### 3.2 中药材
- `tcm-herbal-medicine.jpg`
**提示词**: "Traditional Chinese herbs and medicine preparation, wooden bowls, natural ingredients, warm traditional setting"

#### 3.3 穴位按摩
- `tcm-acupoint-massage.jpg`
**提示词**: "Acupoint massage demonstration, hands showing pressure points, traditional Chinese medicine diagram overlay"

## 🏥 健康指南图片需求

### 1. 解剖结构图
**文件名**: `anatomy-[部位].svg`
**尺寸**: 500x600px
**存放路径**: `/public/images/anatomy/`

#### 1.1 女性生殖系统
- `anatomy-reproductive-system.svg`
**提示词**: "Medical illustration of female reproductive system, clean educational diagram, pink and blue color coding, professional medical textbook style"

#### 1.2 痛经机制图
- `anatomy-pain-mechanism.svg`
**提示词**: "Medical diagram showing menstrual pain mechanism, prostaglandin pathways, educational illustration style"

### 2. 生活场景图
**文件名**: `lifestyle-[场景].jpg`
**尺寸**: 600x400px
**存放路径**: `/public/images/lifestyle/`

#### 2.1 健康饮食
- `lifestyle-healthy-diet.jpg`
**提示词**: "Nutritious meal for menstrual health, colorful vegetables, whole grains, anti-inflammatory foods, bright kitchen setting"

#### 2.2 适度运动
- `lifestyle-gentle-exercise.jpg`
**提示词**: "Woman doing gentle exercise during menstruation, comfortable workout clothes, home gym setting, positive mood"

#### 2.3 充足睡眠
- `lifestyle-quality-sleep.jpg`
**提示词**: "Peaceful bedroom setting, comfortable bed, soft lighting, sleep hygiene elements, relaxing atmosphere"

## 🎭 情景解决方案图片需求

### 1. 场景插图
**文件名**: `scenario-[场景名].jpg`
**尺寸**: 600x400px
**存放路径**: `/public/images/scenarios/`

#### 1.1 办公室场景
- `scenario-office.jpg`
**提示词**: "Professional woman managing menstrual discomfort at office, discrete pain relief methods, modern workplace setting"

#### 1.2 运动场景
- `scenario-exercise.jpg`
**提示词**: "Woman adapting exercise routine during menstruation, gym setting, showing modified workout techniques"

#### 1.3 社交场景
- `scenario-social.jpg`
**提示词**: "Woman confidently participating in social activities, restaurant or cafe setting, showing comfort and confidence"

#### 1.4 睡眠场景
- `scenario-sleep.jpg`
**提示词**: "Comfortable sleep setup for menstrual pain relief, cozy bedroom, heating pad, comfortable pillows"

#### 1.5 通勤场景
- `scenario-commute.jpg`
**提示词**: "Woman managing menstrual discomfort during commute, public transport or car, discrete comfort measures"

#### 1.6 生命阶段场景
- `scenario-life-stages.jpg`
**提示词**: "Women of different ages dealing with menstrual changes, multi-generational illustration, supportive atmosphere"

## 🌿 自然疗法图片需求

### 1. 草药植物图
**文件名**: `herb-[植物名].jpg`
**尺寸**: 400x400px
**存放路径**: `/public/images/herbs/`

#### 1.1 常用草药
- `herb-ginger.jpg` - 生姜
- `herb-turmeric.jpg` - 姜黄
- `herb-chamomile.jpg` - 洋甘菊
- `herb-cinnamon.jpg` - 肉桂
**提示词**: "High quality botanical photography of [herb name], natural lighting, clean white background, medicinal plant illustration style"

### 2. 精油疗法
**文件名**: `essential-oils-therapy.jpg`
**尺寸**: 600x400px
**存放路径**: `/public/images/aromatherapy/`
**提示词**: "Essential oil bottles with lavender and other healing herbs, spa setting, soft natural lighting, therapeutic atmosphere"

### 3. 传统功法图解
**文件名**: `exercise-[功法名].jpg`
**尺寸**: 800x600px
**存放路径**: `/public/images/traditional-exercises/`

#### 3.1 站桩功法
- `exercise-zhan-zhuang.jpg`
**提示词**: "Woman demonstrating standing meditation posture, traditional Chinese exercise, peaceful outdoor setting, proper form illustration"

#### 3.2 八段锦
- `exercise-baduanjin.jpg`
**提示词**: "Traditional Chinese Baduanjin exercise demonstration, step-by-step movement illustration, traditional costume, serene background"

## 📱 移动端优化图片

### 1. 移动端Hero图
**文件名**: `hero-mobile.jpg`
**尺寸**: 375x500px
**存放路径**: `/public/images/mobile/`
**提示词**: "Mobile-optimized hero image, vertical composition, woman using health app on phone, modern mobile interface"

### 2. 移动端功能图标
**文件名**: `mobile-icon-[功能].svg`
**尺寸**: 32x32px
**存放路径**: `/public/images/mobile/icons/`
**提示词**: "Mobile app icon, simple clean design, single color, optimized for small screens"

## 🎨 装饰性图片需求

### 1. 背景纹理
**文件名**: `bg-[类型].svg`
**尺寸**: 1920x1080px
**存放路径**: `/public/images/backgrounds/`

#### 1.1 渐变背景
- `bg-gradient-pink-blue.svg`
**提示词**: "Subtle gradient background, pink to blue transition, soft and professional, web-safe colors"

#### 1.2 几何图案
- `bg-geometric-pattern.svg`
**提示词**: "Subtle geometric pattern, medical cross and circle elements, very light opacity, professional healthcare design"

### 2. 分隔线和装饰元素
**文件名**: `divider-[样式].svg`
**尺寸**: 800x20px
**存放路径**: `/public/images/decorative/`
**提示词**: "Elegant section divider, medical theme, pink and blue colors, professional healthcare design"

## 📊 数据可视化图片

### 1. 统计图表
**文件名**: `chart-[类型].svg`
**尺寸**: 600x400px
**存放路径**: `/public/images/charts/`

#### 1.1 痛经统计
- `chart-pain-statistics.svg`
**提示词**: "Medical statistics chart, menstrual pain prevalence data, clean infographic style, pink and blue color scheme"

#### 1.2 治疗效果对比
- `chart-treatment-comparison.svg`
**提示词**: "Treatment effectiveness comparison chart, bar graph or pie chart, professional medical data visualization"

## 🔧 技术实现要求

### 1. 响应式图片
- 提供多种尺寸版本 (@1x, @2x, @3x)
- 使用WebP格式优化加载速度
- 实现懒加载(Lazy Loading)

### 2. SEO优化
- 所有图片添加alt属性
- 使用描述性文件名
- 添加图片结构化数据

### 3. 无障碍访问
- 高对比度版本
- 屏幕阅读器友好的描述
- 键盘导航支持

## 📝 图片命名规则

### 命名格式
```
[类型]-[具体内容]-[尺寸].[格式]
例如: feature-assessment-64x64.svg
     hero-main-banner-1920x800.jpg
     treatment-heat-therapy-600x400.jpg
```

### 文件夹结构
```
/public/images/
├── hero/              # 主视觉图片
├── icons/             # 图标文件
│   ├── features/      # 功能图标
│   └── ui/           # UI图标
├── articles/          # 文章相关图片
│   ├── categories/    # 分类封面
│   └── content/      # 文章内容图片
├── treatments/        # 治疗方法图片
├── tcm/              # 中医疗法图片
├── anatomy/          # 解剖图解
├── lifestyle/        # 生活方式图片
├── scenarios/        # 情景图片
├── herbs/            # 草药图片
├── charts/           # 图表数据
├── backgrounds/      # 背景图片
├── mobile/           # 移动端优化
└── decorative/       # 装饰元素
```

## 🎯 优先级排序

### 高优先级 (立即需要)
1. Hero主视觉图片
2. 核心功能图标
3. 文章分类封面图
4. 基础治疗方法图解

### 中优先级 (1-2周内)
1. 情景解决方案图片
2. 中医疗法图解
3. 解剖结构图
4. 生活方式图片

### 低优先级 (1个月内)
1. 装饰性图片
2. 背景纹理
3. 移动端优化图片
4. 高级数据可视化

---

**总计图片需求**: 约80-100张图片
**预估制作时间**: 2-4周
**建议预算**: 根据图片质量要求和制作方式确定
