# Claude Code + Chrome 集成设置指南

## ✅ 已完成
- [x] 升级 Claude Code 到 2.1.1
- [ ] 安装 Claude in Chrome 扩展
- [ ] 配置 Chrome 集成

## 📝 安装扩展步骤

1. 访问：https://claude.com/chrome 或 Chrome Web Store
2. 搜索 "Claude in Chrome"（由 Anthropic 发布）
3. 点击 "Add to Chrome"
4. 确认安装

## 🚀 启用集成

### 方法 1：一次性启用（每次会话）
```bash
claude --chrome
```

### 方法 2：永久启用（推荐）
在 Claude Code 对话中输入斜杠命令：
```
/settings
```
然后找到 Chrome 相关设置并启用

或者编辑配置文件：
```bash
# Linux/macOS
~/.config/claude-code/config.json

# Windows
%APPDATA%/claude-code/config.json
```

添加或修改：
```json
{
  "chrome": {
    "enabled": true
  }
}
```

## 🔧 首次连接

1. **启动 Claude Code**：
   ```bash
   claude --chrome
   ```

2. **等待 Native Messaging Host 安装**
   - 首次使用时会自动安装
   - 可能需要重启 Chrome

3. **打开 Chrome 浏览器**
   - 确保 Claude in Chrome 扩展已启用
   - 扩展图标应该在工具栏中

4. **验证连接**
   - 在 Claude Code 中请求浏览器操作
   - 扩展会显示连接状态

## 📍 配置文件位置

### Native Messaging Host 配置：
- **Linux**: `~/.config/google-chrome/NativeMessagingHosts/com.anthropic.claude_code_browser_extension.json`
- **macOS**: `~/Library/Application Support/Google/Chrome/NativeMessagingHosts/com.anthropic.claude_code_browser_extension.json`
- **Windows**: `%LOCALAPPDATA%\Google\Chrome\User Data\NativeMessagingHosts\com.anthropic.claude_code_browser_extension.json`

### Unix Socket（通信通道）：
- `/tmp/claude-mcp-browser-bridge-{username}`

## 🎯 使用示例

启用后，Claude Code 可以：

```bash
# 在 Claude Code 对话中
"请打开浏览器访问 example.com"
"点击页面上的登录按钮"
"查看浏览器控制台的错误信息"
"截取当前页面的截图"
```

## ⚠️ 故障排除

### 连接失败
1. 重启 Chrome 浏览器
2. 检查扩展是否已启用
3. 重新运行 `claude --chrome`

### Native Host 未安装
```bash
# 删除旧配置
rm -rf ~/.config/google-chrome/NativeMessagingHosts/com.anthropic.claude_code_browser_extension.json

# 重新启动 Claude Code
claude --chrome
```

### 权限错误
- 确保 Chrome 扩展有所需权限
- 检查系统防火墙设置

## 📚 更多资源

- 官方文档：https://code.claude.com/docs/en/chrome
- Chrome 扩展页面：https://claude.com/chrome
- 帮助中心：https://support.claude.com/en/articles/12012173-getting-started-with-claude-in-chrome

## 🆚 与自定义扩展的区别

### 官方扩展（Claude in Chrome）
- ✅ 完整的浏览器控制能力
- ✅ Native Messaging 集成
- ✅ 官方支持和更新
- ❌ 需要 Claude Code CLI

### 自定义扩展（我们创建的）
- ✅ 专为你的仪表板定制
- ✅ window.postMessage 通信
- ✅ 独立运行，不依赖 CLI
- ✅ 可自由修改和扩展
- ❌ 功能较为基础

## 💡 建议

两个扩展可以共存：
- **官方扩展**：用于 Claude Code 的浏览器自动化
- **自定义扩展**：用于仪表板的专属功能

根据需求选择使用！
