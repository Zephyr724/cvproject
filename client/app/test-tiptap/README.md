# 📖 README: `page.tsx` — Tiptap 编辑器测试页面

> **目的**：这是整个 Tiptap 编辑器的「入口页面」。你打开 `/test-tiptap` 路由时，看到的就是这个文件渲染的内容。它是一个完整的、功能齐全的富文本编辑器（Rich Text Editor）。

---

## 🗺️ 整体结构总览

```
┌────────────────────────────────────────────┐
│                   页面                      │
│  ┌──────────────────────────────────────┐  │
│  │              Toolbar 工具栏            │  │
│  │  [B] [I] [H1] [H2] ... [🖼] [↕行高]  │  │
│  └──────────────────────────────────────┘  │
│  ┌──────────────────────────────────────┐  │
│  │                                     │  │
│  │           Editor 编辑区域            │  │
│  │     (Tiptap 渲染的 contenteditable)  │  │
│  │                                     │  │
│  └──────────────────────────────────────┘  │
│  [Clear]  [Copy JSON]                      │
│  ┌──────────────────────────────────────┐  │
│  │         Load JSON 输入框             │  │
│  └──────────────────────────────────────┘  │
│  ┌──────────────────────────────────────┐  │
│  │        Live JSON 实时预览            │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

---

## 📦 第一部分：Import 依赖解析

```tsx
"use client";
```
- **`"use client"`**：Next.js 的指令。表示这个组件是 **客户端组件**（Client Component），在浏览器中运行。
- 为什么需要它？因为 `useEditor` 是 React Hook，只能在客户端组件中使用。Tiptap 编辑器是纯浏览器端的，需要 DOM。

```tsx
import { useEditor, EditorContent } from "@tiptap/react";
```
- **`useEditor`**：Tiptap 提供的 React Hook，用于创建和管理编辑器实例。你传入配置对象，它返回 `editor` 对象。
- **`EditorContent`**：Tiptap 提供的 React 组件，用来渲染编辑器的 DOM。你传 `editor` 给它，它就在页面上渲染出可编辑区域。

```tsx
import StarterKit from "@tiptap/starter-kit";
```
- **`StarterKit`**：Tiptap 的「入门套件」。它是一个**扩展包**，里面包含了很多常用功能的集合：
  - 粗体 (Bold)
  - 斜体 (Italic)
  - 标题 (Heading h1-h6)
  - 列表 (Bullet List / Ordered List)
  - 引用 (Blockquote)
  - 代码块 (Code Block)
  - 水平线 (Horizontal Rule)
  - 撤销/重做 (Undo/Redo)
  - 等等...
- 不用一个个单独装，一个 `StarterKit` 就包含所有这些。

```tsx
import { TextStyleKit } from "@tiptap/extension-text-style/text-style-kit";
```
- **`TextStyleKit`**：文字样式扩展包。提供：
  - 文字颜色 (`setColor` / `unsetColor`)
  - 字体大小 (`setFontSize` / `unsetFontSize`)
  - 以及其他文字级样式

```tsx
import { ImageCarouselNode } from "@/lib/tiptap/extensions/ImageCarouselNode";
```
- **`ImageCarouselNode`**：我们**自定义**的 Tiptap 扩展（Node）。
- `@/` 是路径别名，指向 `client/` 目录。
- 这个扩展让编辑器支持插入一个「图片轮播」组件——这在普通 Tiptap 里是没有的，是我們自己写的。

```tsx
import { useCallback, useState } from "react";
```
- **`useState`**：React Hook，管理组件内部状态。
- **`useCallback`**：React Hook，缓存函数引用，避免不必要的重新渲染。

---

## 🔧 第二部分：Toolbar 工具栏定义

```tsx
const TOOLS = [
  { label: "B", action: "toggleBold", title: "Bold Ctrl+B" },
  { label: "I", action: "toggleItalic", title: "Italic Ctrl+I", className: "italic" },
  { label: "H1", action: "toggleHeading", attrs: { level: 1 }, title: "Heading 1" },
  { label: "H2", action: "toggleHeading", attrs: { level: 2 }, title: "Heading 2" },
  { label: "•", action: "toggleBulletList", title: "Bullet List" },
  { label: "1.", action: "toggleOrderedList", title: "Ordered List" },
  { label: "—", action: "setHorizontalRule", title: "Horizontal Rule" },
  { label: "❝", action: "toggleBlockquote", title: "Blockquote" },
  { label: "<>", action: "toggleCodeBlock", title: "Code Block" },
];
```

这是一个**配置数组**，定义了工具栏上的每个按钮。

| 字段 | 含义 | 示例 |
|------|------|------|
| `label` | 按钮上显示的文字 | `"B"` |
| `action` | 对应的 Tiptap 命令名 | `"toggleBold"` |
| `title` | 鼠标悬停提示 | `"Bold Ctrl+B"` |
| `className` | 额外的 CSS 类 | `"italic"` (让 I 按钮文字变斜体) |
| `attrs` | 命令参数 | `{ level: 1 }` 表示 Heading 1 |

**为什么用配置数组而不是一个个写 `<button>`？**
- 避免重复代码（DRY 原则）
- 如果要加新按钮，只需在数组里加一项
- 代码更清晰，一目了然

---

## 🧩 第三部分：编辑器初始化 (`useEditor`)

```tsx
const editor = useEditor({
  extensions: [StarterKit, TextStyleKit, ImageCarouselNode],
  content: "<p>Hello world! 🌈 Start editing here...</p>",
  onUpdate: ({ editor }) => {
    setJsonOutput(JSON.stringify(editor.getJSON(), null, 2));
  },
  editorProps: {
    attributes: {
      class: "tiptap max-w-none outline-none min-h-[200px] px-4 py-3",
      style: "--line-height: 1.6",
    },
  },
});
```

这是整个编辑器的**心脏**。逐行解释：

### `extensions: [StarterKit, TextStyleKit, ImageCarouselNode]`
- 告诉 Tiptap 加载哪些功能扩展
- 它们按顺序组合：StarterKit 提供基础富文本，TextStyleKit 提供样式，ImageCarouselNode 提供自定义轮播图

### `content: "<p>Hello world! 🌈 Start editing here...</p>"`
- 编辑器的**初始内容**，HTML 格式
- 也可以传 JSON 格式（ProseMirror Document 结构）

### `onUpdate: ({ editor }) => { ... }`
- **每次编辑器内容变化时**调用的回调函数
- `editor.getJSON()` 获取当前内容的 JSON 表示
- `JSON.stringify(json, null, 2)` 格式化 JSON（缩进 2 空格）
- `setJsonOutput(...)` 更新状态 → 页面右下角的 Live JSON 面板实时显示

### `editorProps.attributes`
- 设置编辑器最外层 `<div>` 的 HTML 属性
- `class: "tiptap ..."` — 给编辑器 contenteditable 区域加 CSS 类
- `style: "--line-height: 1.6"` — 设置 CSS 自定义属性（行高）

### 关于 `--line-height` CSS Variable
- 这是一**个 CSS 自定义属性（CSS Custom Property / CSS Variable）**
- 在 `globals.css` 中有 `.tiptap p { line-height: var(--line-height, 1.6); }`
- 工具栏的行高下拉框通过 JavaScript 动态改这个变量：
  ```tsx
  editor.view.dom.style.setProperty("--line-height", e.target.value);
  ```
- 这样**不需要修改 JSON 数据**就能改变行高显示

---

## 🎛️ 第四部分：Toolbar 渲染

### 基础按钮渲染

```tsx
{TOOLS.map((tool) => (
  <button
    key={tool.label}
    title={tool.title}
    className={`btn btn-sm btn-ghost ...`}
    onClick={() => {
      const cmd = editor.chain().focus();
      const fn = cmd[tool.action as keyof typeof cmd];
      if (typeof fn === "function") {
        (fn as Function).call(cmd, tool.attrs);
        cmd.run();
      }
    }}
  >
    {tool.label}
  </button>
))}
```

**关键概念**：`editor.chain().focus()`

1. **`.chain()`** — 启动一个**命令链**
2. **`.focus()`** — 先把焦点放回编辑器（否则点了按钮后编辑器可能失焦）
3. **`cmd["toggleBold"]`** — 动态调用命令方法
4. **`.run()`** — 执行整条命令链

**为什么用动态调用 `cmd[action]`？**
因为 `TOOLS` 数组中的 `action` 是字符串（如 `"toggleBold"`），我们需要把它变成真正的方法调用。`cmd["toggleBold"]` 和 `cmd.toggleBold` 在 JavaScript 中是一样的。

### 高亮状态 (`isActive`)

```tsx
editor.isActive(
  tool.action === "toggleHeading"
    ? "heading"
    : tool.action.replace("toggle", "").toLowerCase(),
  tool.attrs,
)
```

- `editor.isActive(name, attrs?)` 检查光标所在位置是否有某个格式
- 如果光标在粗体文字中，`editor.isActive("bold")` 返回 `true`
- 按钮会加上 `btn-active` 类（DaisyUI 的高亮样式）
- **特殊处理** Heading：Tiptap 中 `toggleHeading` 对应的是 `heading` 类型，所以要转换

### 文字颜色控件

```tsx
<label className="btn btn-sm btn-ghost cursor-pointer relative">
  <span style={{ color: editor.getAttributes("textStyle").color || "currentColor" }}>
    A
  </span>
  <input
    type="color"
    className="absolute inset-0 opacity-0 cursor-pointer"
    value={editor.getAttributes("textStyle").color || "#000000"}
    onInput={(e) =>
      editor.chain().focus().setColor(e.currentTarget.value).run()
    }
  />
</label>
```

**技巧解析**：
- 这是一个**原生 HTML 颜色选择器**（`<input type="color">`）
- 外层 `<label>` 用 DaisyUI 的 `btn` 类伪装成按钮
- `<input>` 设为 `opacity-0`（完全透明）但 `absolute inset-0`（覆盖整个按钮区域），所以点击按钮任何位置都触发颜色选择器
- `onInput` 在用户拖动颜色时实时改变文字颜色

### 字体大小下拉框

```tsx
<select
  className="select select-sm select-bordered w-20"
  value={editor.getAttributes("textStyle").fontSize || ""}
  onChange={(e) => {
    const val = e.target.value;
    if (val) editor.chain().focus().setFontSize(val).run();
    else editor.chain().focus().unsetFontSize().run();
  }}
>
  <option value="">Size</option>
  {["12px", "14px", ...].map((s) => <option key={s} value={s}>{s}</option>)}
</select>
```

- 用 DaisyUI 的 `select` 组件
- `value=""` 作为默认选项（清除字号）
- `unsetFontSize()` 恢复默认字号

### 行高下拉框 (CSS Variable 方案)

```tsx
<select
  className="select select-sm select-bordered w-20"
  onChange={(e) => {
    editor.view.dom.style.setProperty("--line-height", e.target.value);
  }}
  defaultValue="1.0"
>
  <option value="0.2">0.2</option>
  ...
  <option value="2.5">2.5</option>
</select>
```

- `editor.view.dom` — 获取编辑器的最外层 DOM 元素
- `.style.setProperty("--line-height", ...)` — 动态设置 CSS 变量
- 不需要 Tiptap extension！纯粹靠 CSS

### 插入图片轮播按钮

```tsx
<button
  className="btn btn-sm btn-ghost"
  onClick={() =>
    editor.chain().focus()
      .insertImageCarousel([{ url: "https://picsum.photos/800/450", alt: "Demo image" }])
      .run()
  }
>
  🖼
</button>
```

- 调用我们在 `ImageCarouselNode` 里定义的 `insertImageCarousel` 命令
- 传入一个图片数组，每个图片有 `url` 和 `alt`
- `picsum.photos` 是免费的占位图服务

---

## 📝 第五部分：编辑器渲染

```tsx
<div className="border border-base-300 rounded-lg bg-base-100 overflow-hidden">
  <EditorContent editor={editor} />
</div>
```

- `<EditorContent editor={editor} />` 是 Tiptap 的 React 组件
- 它在内部渲染一个 `contenteditable="true"` 的 div
- 外层 div 加了圆角、边框、背景色

---

## 🧪 第六部分：JSON 导入/导出

### 实时 JSON 输出

```tsx
const [jsonOutput, setJsonOutput] = useState("");
```

在 `onUpdate` 中每次更新内容时自动同步。底部 `<pre>` 标签显示格式化后的 JSON。

### 复制 JSON

```tsx
<button onClick={() => {
  const json = editor.getJSON();
  setJsonOutput(JSON.stringify(json, null, 2));
  navigator.clipboard.writeText(JSON.stringify(json));
}}>
  Copy JSON
</button>
```

- `editor.getJSON()` 返回 ProseMirror 文档结构
- `navigator.clipboard.writeText()` 复制到剪贴板

### 加载 JSON

```tsx
const handleLoadJson = useCallback(() => {
  if (!editor || !loadInput.trim()) return;
  try {
    const json = JSON.parse(loadInput);
    editor.commands.setContent(json);
  } catch {
    alert("Invalid JSON!");
  }
}, [editor, loadInput]);
```

- `editor.commands.setContent(json)` 替换编辑器全部内容
- `useCallback` 避免每次渲染都创建新函数
- 依赖数组 `[editor, loadInput]`：当 editor 或 loadInput 变化时重新创建

---

## 🧠 核心概念总结

| 概念 | 说明 |
|------|------|
| **Tiptap** | 基于 ProseMirror 的富文本编辑器框架 |
| **ProseMirror** | Tiptap 底层使用的编辑器引擎 |
| **Extension** | Tiptap 的功能模块（插件） |
| **Node** | 文档结构单元（段落、标题、图片、自定义组件） |
| **Mark** | 文本级标记（粗体、斜体、颜色） |
| **Command** | 对编辑器执行操作（`toggleBold`, `setContent`） |
| **Chain** | 命令链：把多个命令串联起来一次执行 |
| **EditorProps** | 编辑器 DOM 元素的属性配置 |
| **editor.getJSON()** | 获取文档的 JSON 表示（可存储、传输） |
| **editor.commands.setContent()** | 用 JSON 或 HTML 设置编辑器内容 |

---

## 🔗 文件关系

```
page.tsx
   │
   ├── 使用 StarterKit（Tiptap 官方）
   ├── 使用 TextStyleKit（Tiptap 官方）
   └── 使用 ImageCarouselNode（我们自定义）
        │
        ├── ImageCarouselNode.ts       ← Node 定义（数据结构 + 命令）
        └── ImageCarouselNodeView.tsx  ← Node View（渲染组件）
```

---

## 📚 延伸阅读

- [Tiptap 官方文档](https://tiptap.dev/docs)
- [ProseMirror 指南](https://prosemirror.net/docs/guide/)
- [DaisyUI 组件库](https://daisyui.com/components/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React useCallback](https://react.dev/reference/react/useCallback)

---

## ❓ 常见问题

**Q: 为什么用 `editor.chain().focus().xxx().run()` 而不是 `editor.commands.xxx()`？**
A: `chain()` 允许把多个命令串联（如先 focus 再 toggleBold），`commands.xxx()` 一次只能执行一个命令。`chain().run()` 更灵活。

**Q: 为什么 toolbar 按钮不直接硬编码而要存数组？**
A: 减少重复代码，方便增删按钮，符合 DRY 原则。

**Q: `--line-height` CSS variable 和 `setFontSize` 有什么区别？**
A: `setFontSize` 通过 Tiptap extension 把字号存入 JSON 数据，可持久化。`--line-height` 只改 CSS 显示，不存入 JSON——纯视觉效果。