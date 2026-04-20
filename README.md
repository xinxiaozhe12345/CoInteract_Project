# Project Page 部署指南

## 项目结构

```
project-page/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # 交互脚本
└── assets/             # 资源文件夹（视频、图片）
```

## 占位符说明

### 1. 主演示视频区域 (Hero Video)
- **位置**: 首页 Hero 区域右侧
- **建议内容**: 项目核心 Demo 视频，如效果展示、交互演示
- **推荐尺寸**: 16:9 比例，建议 1920x1080 或 1280x720
- **格式**: MP4 (H.264)

### 2. 演示视频卡片 (Demo Videos)
- **位置**: Demo 展示区域的 8 个视频卡片
- **分类**:
  - 对话演示 (Dialogue): 展示语音驱动的角色对话
  - 表演生成 (Performance): 展示表情和肢体动作生成
  - 歌唱同步 (Singing): 展示与音频同步的口型
  - 倾听行为 (Listening): 展示角色倾听时的反应
- **推荐尺寸**: 16:9 比例
- **格式**: MP4 (H.264)

### 3. 技术架构图 (Architecture Diagram)
- **位置**: 技术架构区域
- **建议内容类型**:
  - 系统整体架构图 (System Architecture)
  - 模型结构示意图 (Model Architecture)
  - 数据流程图 (Data Pipeline)
  - 模块关系图 (Module Diagram)
- **推荐尺寸**: 宽度 800-1200px，高度自适应
- **格式**: PNG 或 SVG（推荐矢量图）

### 4. 团队成员头像 (Team Avatars)
- **位置**: 团队成员区域
- **推荐尺寸**: 200x200px 或更大
- **格式**: JPG 或 PNG

---

## 如何发布到公网 (GitHub Pages)

### 步骤 1: 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com/)
2. 点击右上角 "+" → "New repository"
3. 填写仓库名称，例如: `your-project-name`
4. 选择 "Public"
5. 点击 "Create repository"

### 步骤 2: 上传项目文件

**方式 A: 通过 GitHub 网页上传**

1. 进入刚创建的仓库页面
2. 点击 "uploading an existing file"
3. 将 `project-page` 文件夹内的所有文件拖入上传区域
4. 提交更改 (Commit changes)

**方式 B: 通过 Git 命令行**

```bash
# 克隆仓库
git clone https://github.com/your-username/your-project-name.git

# 进入目录
cd your-project-name

# 复制项目文件
# (将 project-page 内的文件复制到此目录)

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 推送到 GitHub
git push origin main
```

### 步骤 3: 启用 GitHub Pages

1. 进入仓库页面 → 点击 "Settings"
2. 左侧菜单选择 "Pages"
3. 在 "Build and deployment" 部分:
   - Source: 选择 "Deploy from a branch"
   - Branch: 选择 "main" (或 "master")
   - Folder: 选择 "/ (root)"
4. 点击 "Save"

### 步骤 4: 访问你的网站

等待约 1-2 分钟，GitHub 会通过邮件通知你部署完成。

访问地址: `https://your-username.github.io/your-project-name/`

---

## 自定义修改

### 修改项目名称和描述

编辑 `index.html`:
```html
<title>你的项目名称 - 开源项目</title>
<!-- 以及 Hero 区域的内容 -->
```

### 修改 GitHub 链接

在 `index.html` 中找到并修改:
```html
<a href="https://github.com/your-repo" target="_blank" class="btn-github">
```

### 添加更多团队成员

在 `index.html` 的团队区域添加更多 `.team-card`:
```html
<div class="team-card">
    <div class="team-avatar">
        <div class="avatar-placeholder">👤</div>
    </div>
    <h4 class="team-name">成员姓名</h4>
    <p class="team-role">角色</p>
    <div class="team-links">
        <a href="#" class="team-link">Google Scholar</a>
    </div>
</div>
```

### 替换视频占位符

将视频文件放入 `assets/` 目录，然后修改 HTML:
```html
<!-- 替换前 -->
<div class="video-placeholder">...</div>

<!-- 替换后 -->
<video src="assets/demo-video.mp4" controls autoplay loop muted></video>
```

---

## 技术栈

- **字体**: Orbitron (标题), Rajdhani (正文)
- **背景**: Canvas 粒子动画
- **动画**: CSS3 + JavaScript Intersection Observer
- **响应式**: 支持桌面端和移动端

---

## 注意事项

1. 视频文件建议压缩后再上传，GitHub 单文件限制 100MB
2. 建议使用 Web 友好的视频格式 (MP4 H.264)
3. 图片建议使用 PNG 或 SVG 格式
4. 确保所有外部链接 (论文、GitHub 等) 真实有效