# 贡献指南

感谢您对CreativeAI Suite项目的关注！我们欢迎各种形式的贡献，无论是功能建议、代码贡献、文档改进还是问题报告。

## 如何贡献

### 报告问题

如果您发现了问题或有功能建议，请遵循以下步骤：

1. 查看现有的[Issues](https://github.com/yourusername/creative-ai-suite/issues)，确保没有重复。
2. 如果是新问题，请创建一个新的Issue，并提供以下信息：
   - 清晰的标题和描述
   - 复现步骤（如适用）
   - 预期行为与实际行为的差异
   - 环境信息（操作系统、浏览器版本等）
   - 相关的日志或截图

### 提交代码

1. Fork本仓库
2. 创建您的特性分支：`git checkout -b feature/amazing-feature`
3. 提交您的更改：`git commit -m 'Add some amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交Pull Request

### Pull Request要求

- 确保代码遵循项目的代码风格
- 更新相关文档
- 添加适当的测试
- 在PR描述中详细说明您的更改

## 开发规范

### 分支命名规范

- `feature/*`: 新功能
- `bugfix/*`: 错误修复
- `docs/*`: 文档更新
- `refactor/*`: 代码重构
- `test/*`: 测试相关更改

### 代码风格

- **JavaScript/TypeScript**: 遵循ESLint规则
- **Python**: 遵循PEP 8标准
- **Go**: 遵循官方Go格式化规则

### 提交信息规范

请使用明确的提交信息，遵循以下格式：

```
<类型>: <简短描述>

<详细描述>

<关闭的Issue编号>
```

类型包括：
- `feat`: 新功能
- `fix`: 错误修复
- `docs`: 文档更改
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动

示例：
```
feat: 添加用户认证模块

实现了基于JWT的认证系统，包括登录、注册和密码重置功能。

Closes #123
```

## 本地开发环境设置

1. 安装依赖：
   ```bash
   # 安装根目录依赖
   npm install

   # 安装服务依赖
   cd services/text-engine && npm install
   cd ../image-generator && npm install
   # ... 其他服务
   ```

2. 启动开发环境：
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. 运行测试：
   ```bash
   npm test
   ```

## 代码审查流程

1. 所有提交的代码将由维护者审查
2. 可能需要根据反馈进行修改
3. 一旦获得批准，您的贡献将被合并

## 许可证

通过贡献您的代码，您同意将其授权给项目的MIT许可证。 