# 翻译系统开发指南

## 🎯 目标
建立统一、类型安全、易维护的翻译系统，避免翻译问题重复出现。

## 📁 文件结构
```
messages/
├── zh.json          # 中文翻译
├── en.json          # 英文翻译
└── index.ts         # 类型定义

types/
└── translations.ts  # 翻译类型定义

lib/
└── translation-utils.ts  # 翻译工具函数

scripts/
└── validate-translations.js  # 翻译验证脚本
```

## 🔧 开发规范

### 1. 翻译键命名规范
```
页面.组件.功能.具体键
例如: painTracker.assessment.result.title
```

### 2. 组件中使用翻译
```typescript
// ✅ 推荐方式
import { useSafeTranslations } from '@/lib/translation-utils';

function MyComponent() {
  const { t } = useSafeTranslations('painTracker.assessment');
  
  return (
    <div>
      <h1>{t('title', {}, '默认标题')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}

// ❌ 避免硬编码
function BadComponent() {
  return <h1>症状评估工具</h1>; // 硬编码中文
}
```

### 3. 添加新翻译的步骤
1. 在 `messages/zh.json` 和 `messages/en.json` 中添加翻译键
2. 更新 `types/translations.ts` 中的类型定义
3. 在组件中使用 `useSafeTranslations` Hook
4. 运行 `npm run validate:translations` 验证

### 4. 翻译验证
```bash
# 手动验证翻译
npm run validate:translations

# 构建前自动验证（已配置在 prebuild 中）
npm run build
```

## 🛠️ 工具和脚本

### 翻译验证脚本
- 检测缺失的翻译键
- 检测硬编码文本
- 验证翻译键一致性
- 检测未使用的翻译键

### 安全翻译Hook
- 提供fallback机制
- 错误处理
- 开发环境调试信息

## 🚨 常见问题和解决方案

### 1. 翻译键显示而不是翻译文本
**原因**: 翻译键不存在或路径错误
**解决**: 检查翻译文件中是否存在该键，验证路径是否正确

### 2. 硬编码文本
**原因**: 直接在组件中写入中文/英文文本
**解决**: 使用翻译键替换所有硬编码文本

### 3. 翻译键不一致
**原因**: 不同语言文件中翻译键结构不同
**解决**: 运行验证脚本，保持所有语言文件结构一致

## 📋 检查清单

### 开发时检查
- [ ] 没有硬编码文本
- [ ] 使用了正确的翻译Hook
- [ ] 提供了fallback值
- [ ] 翻译键命名符合规范

### 代码审查检查
- [ ] 所有文本都已翻译
- [ ] 翻译键在所有语言文件中都存在
- [ ] 没有未使用的翻译键
- [ ] 类型定义已更新

### 发布前检查
- [ ] 翻译验证脚本通过
- [ ] 所有语言版本功能正常
- [ ] 没有翻译相关的控制台错误

## 🔄 迁移现有代码

### 1. 识别硬编码文本
```bash
# 使用验证脚本自动检测
npm run validate:translations
```

### 2. 替换硬编码文本
```typescript
// 替换前
<h1>症状评估工具</h1>

// 替换后
const { t } = useSafeTranslations('painTracker.assessment');
<h1>{t('title')}</h1>
```

### 3. 添加翻译键
在 `messages/zh.json` 和 `messages/en.json` 中添加对应的翻译键。

## 🎯 最佳实践

1. **统一使用 `useSafeTranslations`**: 提供错误处理和fallback
2. **遵循命名规范**: 保持翻译键结构清晰
3. **定期运行验证**: 及时发现翻译问题
4. **类型安全**: 使用TypeScript确保翻译键正确
5. **文档更新**: 及时更新翻译相关文档
