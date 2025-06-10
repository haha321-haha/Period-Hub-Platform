# 翻译系统架构规范

## 1. 统一翻译系统架构

### 目录结构
```
messages/
├── zh.json          # 中文翻译
├── en.json          # 英文翻译
└── index.ts         # 翻译类型定义
```

### 翻译键命名规范
```
页面.组件.功能.具体键
例如: painTracker.assessment.result.title
```

## 2. 类型安全的翻译系统

### 翻译类型定义
```typescript
// messages/index.ts
export interface Messages {
  painTracker: {
    assessment: {
      title: string;
      result: {
        title: string;
        yourScore: string;
        // ...
      };
      resultMessages: {
        mild: string;
        moderate: string;
        // ...
      };
    };
  };
  // ...
}
```

## 3. 翻译验证工具

### 自动检测脚本
- 检测缺失翻译键
- 检测硬编码文本
- 验证翻译键一致性

### 构建时验证
- CI/CD 集成翻译检查
- 阻止包含翻译问题的代码合并

## 4. 开发规范

### 组件开发规范
1. 禁止硬编码文本
2. 统一使用 useTranslations hook
3. 提供翻译键fallback机制

### 代码审查检查点
1. 是否存在硬编码文本
2. 翻译键是否正确
3. 是否提供了所有语言的翻译
