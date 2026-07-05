# 📖 README: `ImageCarouselNode.ts` — Tiptap 自定义 Node 定义

> **目的**：定义「图片轮播」这个自定义内容块——它是什么、有哪些属性、怎么插入到编辑器里。

---

## 🧠 核心概念：什么是 Tiptap Node？

在 Tiptap/ProseMirror 里，文档是一棵树：

```
doc (根节点)
├── paragraph (段落 node)
│   └── text (文字标记)
├── heading (标题 node)
│   └── text
├── imageCarousel (我们的自定义 node！)
│   ├── attrs.images: [{ url, alt }, ...]
│   ├── attrs.layout: "full" | "left" | "right"
│   └── attrs.width: "66%"
└── paragraph
    └── text
```

- **Node** = 文档的「块级」结构单元（段落、标题、图片、列表、自定义块）
- **Mark** = 施加在文字上的「内联」标记（粗体、斜体、颜色）
- **Extension** = 既不是 Node 也不是 Mark 的扩展（如键盘快捷键、协作功能）

`ImageCarouselNode` 就是一个 **自定义 Node**。

---

## 📦 逐行代码解析

### TypeScript 类型定义

```ts
export interface CarouselImage {
  url: string;
  alt?: string;
}
```

定义每张图片的数据结构：
- `url`：图片地址（必填）
- `alt`：替代文字（可选，`?` 表示可选）

```ts
export type ImageLayout = "full" | "left" | "right";
```

定义布局类型：
- `"full"` → 图片占满整行宽度
- `"left"` → 图片左浮动，文字环绕
- `"right"` → 图片右浮动，文字环绕

### TypeScript 模块增强（Module Augmentation）

```ts
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageCarousel: {
      insertImageCarousel: (images: CarouselImage[]) => ReturnType;
    };
  }
}
```

**这是 TypeScript 的高级技巧**：`declare module` 告诉 TypeScript：「`@tiptap/core` 这个包里的 `Commands` 接口，要新增一个 `imageCarousel` 属性」。

**为什么需要这个？**
- Tiptap 的 `Commands` 类型是官方的，原本不包含 `insertImageCarousel`
- 我们自定义了命令，但 TypeScript 不知道
- 通过 `declare module`，我们「增强」了原始类型，TypeScript 就能识别 `editor.commands.insertImageCarousel(...)` 了
- 否则会报 TS 错误：「Property 'insertImageCarousel' does not exist」

### Node 创建

```ts
export const ImageCarouselNode = Node.create({
```

- `Node.create({...})` 是 Tiptap 的工厂方法
- 传入一个配置对象，返回一个 Node 定义
- 这个 Node 可以像官方 extension 一样放进 `extensions: [...]` 数组

---

## 🔧 Node 配置详解

### `name: "imageCarousel"`

- Node 的**唯一标识符**（字符串）
- 在整个编辑器里必须唯一
- 用于 JSON 输出：`{ "type": "imageCarousel", ... }`
- 用于查找：`editor.state.doc.descendants((node) => node.type.name === "imageCarousel")`

### `group: "block"`

- Tiptap 的 Node 分组系统
- `"block"` 表示这是一个**块级元素**（占一整行）
- 其他选项：`"inline"`（内联，如文字）、`"list"`（列表项）
- 决定了这个 Node 能和哪些 Node 放一起

### `draggable: true`

- **启用 ProseMirror 原生拖拽排序**
- 设为 `true` 后，鼠标移到 Node 左侧会出现一个拖拽手柄
- 用户可以拖拽这个 Node 到文档的任何位置
- 比自己做 HTML5 drag & drop 简单可靠 100 倍

---

## 📋 addAttributes() — 属性定义

```ts
addAttributes() {
  return {
    images: { ... },
    layout: { ... },
    width:  { ... },
  };
}
```

**Attributes 是 Node 的「属性/数据」**。就像 HTML 元素有 `src`、`alt` 属性一样，Tiptap Node 也有自己的 attributes。它们会被序列化到 JSON 中。

### 属性 1: `images` — 图片列表

```ts
images: {
  default: [] as CarouselImage[],
  parseHTML: (el) => {
    const data = el.getAttribute("data-images");
    return data ? JSON.parse(data) : [];
  },
  renderHTML: ({ images }: { images: CarouselImage[] }) => ({
    "data-images": JSON.stringify(images),
  }),
},
```

三个字段的含义：

| 字段 | 何时调用 | 作用 |
|------|---------|------|
| `default` | 创建新 Node 时 | 默认值：空数组 `[]` |
| `parseHTML` | 从 HTML 粘贴/解析时 | 从 `data-images` 属性读取并解析 JSON |
| `renderHTML` | 导出为 HTML 时 | 把图片数组序列化为 `data-images="[...]"` |

**这个设计保证了数据的双向转换**：
- **HTML → Tiptap**：`parseHTML` 把 `data-images="[...]"` 还原为 TypeScript 数组
- **Tiptap → HTML**：`renderHTML` 把 TypeScript 数组序列化为 `data-images="[...]"`

### 属性 2: `layout` — 布局方式

```ts
layout: {
  default: "full" as ImageLayout,
  parseHTML: (el) =>
    (el.getAttribute("data-layout") as ImageLayout) ?? "full",
  renderHTML: ({ layout }: { layout: ImageLayout }) => ({
    "data-layout": layout,
  }),
},
```

- 默认值 `"full"`
- `?? "full"` 是 TS 的 **空值合并运算符**：如果读取到 `null` 或 `undefined`，就用 `"full"`
- 存为 HTML 属性 `data-layout`

### 属性 3: `width` — 宽度

```ts
width: {
  default: "100%",
  parseHTML: (el) => el.getAttribute("data-width") ?? "100%",
  renderHTML: ({ width }: { width: string }) => ({
    "data-width": width,
  }),
},
```

- 默认 `"100%"`
- 只在 `left` / `right` 布局时生效
- 存为 HTML 属性 `data-width`

---

## 🖥️ renderHTML() — 输出 HTML

```ts
renderHTML({ HTMLAttributes }) {
  return ["div", { "data-type": "image-carousel", ...HTMLAttributes }];
},
```

**这个方法是 Tiptap 用来导出 HTML 的**。

返回值的格式是 ProseMirror 的 **DOM 表示法**（数组形式）：
```
[标签名, 属性对象, ...子元素]
```

这里返回：
```
["div", { "data-type": "image-carousel", "data-images": "[...]", ... }]
```

- `HTMLAttributes` 自动包含了 `addAttributes` 里所有 `renderHTML` 的返回值
- `"data-type": "image-carousel"` 是额外标识，方便 CSS 选择器

---

## 🎨 addNodeView() — 绑定 React 组件

```ts
addNodeView() {
  return ReactNodeViewRenderer(ImageCarouselNodeView);
},
```

**这是 Tiptap 和 React 的桥梁**。

- `ReactNodeViewRenderer`：Tiptap 提供的工具，把 React 组件渲染到编辑器中
- `ImageCarouselNodeView`：我们自己写的 React 组件（在 `ImageCarouselNodeView.tsx`）
- 编辑器遇到 `imageCarousel` Node 时，不渲染默认 DOM，而是渲染我们的 React 组件

**NodeView 架构**：
```
编辑器 DOM
  └── NodeViewWrapper  ← Tiptap 提供的容器
       └── ImageCarouselNodeView  ← 我们的 React 组件
            ├── 空状态（无图片）
            ├── 编辑状态（表单）
            └── 预览状态（图片 + 工具栏）
```

---

## 🎮 addCommands() — 自定义命令

```ts
addCommands() {
  return {
    insertImageCarousel:
      (images: CarouselImage[]) =>
      ({ commands }) =>
        commands.insertContent([
          { type: this.name, attrs: { images } },
          { type: "paragraph" },
        ]),
  };
},
```

**定义一个名为 `insertImageCarousel` 的命令**。

逐层拆解：

1. **`insertImageCarousel: (images: CarouselImage[]) => ...`**
   - 命令接收一个图片数组作为参数

2. **`({ commands }) => ...`**
   - Tiptap 注入的上下文对象，`commands` 是内置的命令集合

3. **`commands.insertContent([...])`**
   - 在光标位置插入内容
   - 内容是 ProseMirror 的 JSON 格式数组

4. **插入的内容**：
   ```ts
   [
     { type: this.name, attrs: { images } },  // 我们的轮播图 Node
     { type: "paragraph" },                     // 后面跟一个空段落（方便继续编辑）
   ]
   ```

**调用方式**：
```ts
editor.chain().focus().insertImageCarousel([
  { url: "https://example.com/photo.jpg", alt: "My photo" }
]).run();
```

---

## 🧠 完整 JSON 输出示例

当你在编辑器中插入一个图片轮播后，`editor.getJSON()` 输出的结构：

```json
{
  "type": "doc",
  "content": [
    {
      "type": "imageCarousel",
      "attrs": {
        "images": [
          { "url": "https://picsum.photos/800/450", "alt": "Demo image" }
        ],
        "layout": "full",
        "width": "100%"
      }
    },
    {
      "type": "paragraph"
    }
  ]
}
```

注意：
- `imageCarousel` 和 `paragraph` 是**平级的**，同属 `doc.content` 数组
- 插入命令自动加了后面的空 paragraph
- `attrs` 里的数据完全由 `addAttributes` 定义

---

## 🔌 如何使用这个 Node

在任何 Tiptap 编辑器中：

```ts
import { ImageCarouselNode } from "@/lib/tiptap/extensions/ImageCarouselNode";

const editor = useEditor({
  extensions: [
    StarterKit,
    ImageCarouselNode,  // ← 加入扩展列表
  ],
});
```

然后通过命令插入：

```ts
editor.chain().focus().insertImageCarousel([
  { url: "/images/1.jpg", alt: "Photo 1" },
  { url: "/images/2.jpg", alt: "Photo 2" },
]).run();
```

---

## 📚 关键 API 速查

| API | 用途 |
|-----|------|
| `Node.create({...})` | 创建自定义 Node |
| `addAttributes()` | 定义 Node 的数据属性 |
| `addNodeView()` | 绑定 React 渲染组件 |
| `addCommands()` | 定义自定义命令 |
| `renderHTML()` | 导出 HTML 时的渲染逻辑 |
| `parseHTML()` | 从 HTML 解析回属性的逻辑 |
| `ReactNodeViewRenderer()` | 把 React 组件变成 NodeView |
| `commands.insertContent()` | 在光标位置插入内容 |

---

## 🔗 关联文件

```
ImageCarouselNode.ts
  ├── ImageCarouselNodeView.tsx    ← 绑定为 NodeView
  └── page.tsx                      ← 在 extensions 中使用