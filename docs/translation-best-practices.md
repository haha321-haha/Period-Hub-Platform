# 翻译系统最佳实践指南

## 🎯 避免翻译问题的核心原则

### 1. **统一使用安全翻译Hook**
```typescript
// ✅ 推荐：使用安全翻译Hook
import { useSafeTranslations } from '@/hooks/useSafeTranslations';

function MyComponent() {
  const { t } = useSafeTranslations('painTracker.assessment');
  
  return (
    <div>
      <h1>{t('title', {}, '症状评估工具')}</h1>
      <p>{t('description', {}, '专业的症状分析工具')}</p>
    </div>
  );
}

// ❌ 避免：直接硬编码
function BadComponent() {
  return <h1>症状评估工具</h1>;
}
```

### 2. **翻译键命名规范**
```
页面.组件.功能.具体内容
例如：painTracker.assessment.result.title
```

### 3. **提供Fallback值**
```typescript
// 总是提供fallback，避免显示翻译键
const title = t('title', {}, '默认标题');
const message = t('resultMessages.mild', {}, '症状较轻');
```

## 🔧 快速修复工具

### 运行修复脚本
```bash
# 自动修复基本翻译问题
npm run migrate:translations

# 验证翻译完整性
npm run validate:translations

# 一键修复和验证
npm run fix:translations
```

### 手动修复步骤
1. **识别硬编码文本**：搜索代码中的中文字符
2. **添加翻译键**：在messages/zh.json和messages/en.json中添加
3. **使用安全Hook**：替换硬编码为翻译函数调用
4. **测试验证**：确保两种语言都正常显示

## 📋 开发检查清单

### 编写新组件时
- [ ] 使用`useSafeTranslations`Hook
- [ ] 所有文本都通过翻译函数
- [ ] 提供合理的fallback值
- [ ] 翻译键遵循命名规范

### 代码审查时
- [ ] 没有硬编码中文/英文文本
- [ ] 翻译键在两种语言文件中都存在
- [ ] 翻译内容准确且合适
- [ ] 没有显示翻译键的情况

### 发布前
- [ ] 运行`npm run fix:translations`
- [ ] 测试中英文版本
- [ ] 检查控制台无翻译警告
- [ ] 验证用户界面文本正确

## 🚨 常见问题解决

### 问题1：显示翻译键而不是文本
**症状**：页面显示`painTracker.assessment.title`而不是"症状评估工具"
**解决**：
1. 检查翻译文件中是否存在该键
2. 确认翻译Hook的namespace正确
3. 提供fallback值

### 问题2：英文版本缺少翻译
**症状**：中文版本正常，英文版本显示中文或翻译键
**解决**：
1. 运行`npm run migrate:translations`自动添加缺失键
2. 手动翻译placeholder内容

### 问题3：硬编码文本
**症状**：代码中直接写入中文文本
**解决**：
1. 使用翻译验证脚本识别
2. 逐个替换为翻译函数调用

## 🛠️ 实用工具函数

### 翻译数组
```typescript
import { translateArray } from '@/hooks/useSafeTranslations';

const { t } = useSafeTranslations('painTracker');
const steps = translateArray(
  t,
  ['step1', 'step2', 'step3'],
  ['步骤1', '步骤2', '步骤3'] // fallbacks
);
```

### 翻译对象
```typescript
import { translateObject } from '@/hooks/useSafeTranslations';

const { t } = useSafeTranslations('painTracker');
const labels = translateObject(
  t,
  {
    save: 'actions.save',
    cancel: 'actions.cancel',
    delete: 'actions.delete'
  },
  {
    save: '保存',
    cancel: '取消',
    delete: '删除'
  }
);
```

## 📈 长期维护策略

### 1. **自动化检查**
- 在CI/CD中集成翻译验证
- 定期运行翻译完整性检查
- 使用pre-commit hooks防止硬编码

### 2. **团队协作**
- 建立翻译审查流程
- 维护翻译术语表
- 定期更新翻译内容

### 3. **持续改进**
- 收集用户反馈
- 优化翻译质量
- 扩展支持的语言

## 🎯 成功指标

### 技术指标
- 零翻译键显示错误
- 零硬编码文本
- 100%翻译覆盖率

### 用户体验指标
- 界面文本自然流畅
- 多语言体验一致
- 无语言切换问题

## 📚 参考资源

- [Next-intl官方文档](https://next-intl-docs.vercel.app/)
- [React国际化最佳实践](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [翻译质量评估标准](https://www.w3.org/International/questions/qa-i18n)
