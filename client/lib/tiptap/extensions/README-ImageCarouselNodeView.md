# 📖 README: `ImageCarouselNodeView.tsx` — 轮播图 Node 的 React 渲染组件

> **目的**：这是 `ImageCarouselNode` 的「脸」——用户在编辑器中看到和交互的 React 组件。包含三种状态：空态、编辑态、预览态。

---

## 🧠 NodeView 架构回顾

```
编辑器 (contenteditable)
  └── NodeViewWrapper          ← Tiptap 提供，自动隔离编辑区
       └── ImageCarouselNodeView ← 我们的 React 组件
            ├── 空状态：无图片时的占位
            ├── 编辑状态：表单（URL、alt、布局、宽度）
            └── 预览状态：图片 + hover 工具栏
```

---

## 📦 Import 解析

```tsx
"use client";
```
- 使用 React Hook (`useState`)，必须是客户端组件

```tsx
import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
```
- **`NodeViewWrapper`**：Tiptap 提供的包裹组件。把我们的内容包起来，防止点击/拖拽事件穿透到编辑器
- **`NodeViewProps`**：TypeScript 类型，描述传给 NodeView 组件的 props

```tsx
import { useState } from "react";
import type { CarouselImage, ImageLayout } from "./ImageCarouselNode";
```
- `CarouselImage` 和 `ImageLayout` 是从 `ImageCarouselNode.ts` 导出的类型

---

## 🎨 辅助函数：`containerClass`

```tsx
const containerClass = (layout: ImageLayout) => {
  switch (layout) {
    case "left":
      return "mr-left mr-5 mb-4";
    case "right":
      return "float-right ml-5 mb-4";
    default:
      return "block w-full clear-both";
  }
};
```

这个函数（**注意：实际代码中已被内联到 JSX 里，未使用此函数**）展示了 Tailwind 的浮动布局：
- `float-left` / `float-right`：CSS 浮动，让文字环绕图片
- `mr-5` / `ml-5`：右/左边距（Tailwind 的间距单位，5 = 1.25rem = 20px）
- `mb-4`：底部边距
- `clear-both`：清除浮动，防止和上下浮动元素重叠

---

## 🧩 组件主体

```tsx
export function ImageCarouselNodeView({
  node,
  updateAttributes,
  deleteNode,
}: NodeViewProps) {
```

Tiptap 注入的 3 个关键 props：

| Prop | 类型 | 用途 |
|------|------|------|
| `node` | ProseMirror Node | 当前 Node 的数据（`node.attrs` 获取属性） |
| `updateAttributes` | `(attrs) => void` | 更新 Node 的属性（会触发重新渲染 + JSON 更新） |
| `deleteNode` | `() => void` | 从文档中删除这个 Node |

### 数据读取

```tsx
const images = node.attrs.images as CarouselImage[];
const layout = (node.attrs.layout as ImageLayout) ?? "full";
const width = (node.attrs.width as string) ?? "100%";
const [isEditing, setIsEditing] = useState(images.length === 0);
```

- `node.attrs.images` — 读取图片数组
- `node.attrs.layout` — 读取布局
- `node.attrs.width` — 读取宽度
- `isEditing` — 控制编辑/预览状态。**如果 images 为空数组，自动进入编辑态**

### 操作方法

```tsx
const setLayout = (l: ImageLayout) => {
  updateAttributes({
    layout: l,
    width: l === "full" ? "100%" : "66%",  // 联动：切换布局自动改宽度
  });
};
```

- `updateAttributes` 一次可以更新**多个属性**
- 切换 `full` → 宽度自动变 `100%`
- 切换 `left/right` → 宽度自动变 `66%`

```tsx
const updateImage = (idx: number, field: "url" | "alt", value: string) => {
  const next = images.map((img, i) =>
    i === idx ? { ...img, [field]: value } : img,
  );
  updateAttributes({ images: next });
};
```

- **不可变更新**：不修改原数组，用 `.map()` 创建新数组
- `{ ...img, [field]: value }`：展开原对象，覆盖指定字段
- 这是 React 最佳实践：State/props 不直接修改

```tsx
const addImage = () => {
  updateAttributes({ images: [...images, { url: "", alt: "" }] });
};
```

- 添加一个空白图片到数组末尾

```tsx
const removeImage = (idx: number) => {
  const next = images.filter((_, i) => i !== idx);
  if (next.length === 0) deleteNode();      // 全删了 → 删除整个 Node
  else updateAttributes({ images: next });  // 还有 → 更新数组
};
```

- 删除指定索引的图片
- 删完后如果数组空了，调用 `deleteNode()` 把整个轮播图删掉

---

## 🖼️ 三种渲染状态

### 状态 1：空状态（无图片）

```tsx
if (!currentImage) {
  return (
    <NodeViewWrapper>
      <div className="clear-both border border-dashed border-base-300 rounded-lg p-6 text-center text-base-content/50">
        🖼 Empty Carousel
        <button className="btn btn-sm btn-ghost mt-2" onClick={() => setIsEditing(true)}>
          Add Images
        </button>
      </div>
    </NodeViewWrapper>
  );
}
```

- `clear-both`：清除浮动（防止和上面的浮动图片重叠）
- `border-dashed`：虚线边框，暗示「这里可以添加内容」
- 点击「Add Images」进入编辑态

### 状态 2：编辑态

```tsx
if (isEditing) {
  return (
    <NodeViewWrapper>
      <div className="clear-both border border-info rounded-lg p-3 space-y-3 bg-base-200">
```

#### 布局控制

```tsx
<div className="flex items-center gap-2 flex-wrap"
     onMouseDown={(e) => e.stopPropagation()}>
```

**`onMouseDown={(e) => e.stopPropagation()}`** 是**关键代码**！解释：

- Tiptap 编辑器监听 `mousedown` 事件来移动光标
- 如果用户点击 `<select>` 或 `<button>`，正常应该操作控件，而不是移动光标
- `stopPropagation()` 阻止事件冒泡到编辑器，确保点击控件的操作不受干扰

```tsx
{(["full", "left", "right"] as ImageLayout[]).map((l) => (
  <button className={`btn btn-xs ${layout === l ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setLayout(l)}>
    {l === "full" ? "⬜ Full" : l === "left" ? "⬅ Left" : "➡ Right"}
  </button>
))}
```

- 三个布局按钮，当前选中的高亮（`btn-primary`）
- 图标用 emoji，直观

```tsx
<select
  className="select select-xs select-bordered"
  value={width}
  onChange={(e) => setWidth(e.target.value)}
  disabled={layout === "full"}                    // ← full 时禁用
  onMouseDown={(e) => e.stopPropagation()}        // ← 阻止事件冒泡
>
```

- `disabled={layout === "full"}`：width 只在 left/right 时才有意义（full 永远是 100%）
- DaisyUI 的 `disabled` 样式是灰色 + 不可点击

#### 图片列表表单

```tsx
{images.map((img, idx) => (
  <div key={idx} className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
    {img.url && (
      <img src={img.url} alt={img.alt ?? ""}
           className="w-12 h-8 object-cover rounded shrink-0" />
    )}
    <input className="input input-xs input-bordered flex-1 min-w-0"
           placeholder="Image URL"
           value={img.url}
           onChange={(e) => updateImage(idx, "url", e.target.value)}
           onMouseDown={(e) => e.stopPropagation()} />
    <input className="input input-xs input-bordered w-24 shrink-0"
           placeholder="alt"
           value={img.alt ?? ""}
           onChange={(e) => updateImage(idx, "alt", e.target.value)}
           onMouseDown={(e) => e.stopPropagation()} />
    <button className="btn btn-xs btn-ghost text-error shrink-0"
            onClick={() => removeImage(idx)}>
      ✕
    </button>
  </div>
))}
```

布局细节：

| 类 | 作用 |
|---|---|
| `flex items-center gap-2` | 水平排列，垂直居中，间距 2 (0.5rem) |
| `flex-wrap sm:flex-nowrap` | 小屏换行，大屏不换行 |
| `flex-1 min-w-0` | URL 输入框自动占满剩余空间，`min-w-0` 防止溢出 |
| `shrink-0` | alt 输入框和删除按钮不缩小 |
| `w-12 h-8 object-cover` | 缩略图 48×32px，裁剪填充 |

#### 底部操作栏

```tsx
<button className="btn btn-xs btn-outline" onClick={addImage}>
  + Add Image
</button>
<button className="btn btn-xs btn-success" onClick={() => setIsEditing(false)}>
  Done
</button>
<button className="btn btn-xs btn-error" onClick={() => deleteNode()}>
  Delete Carousel
</button>
```

- Done：退出编辑态，回到预览
- Delete Carousel：直接调用 `deleteNode()`

### 状态 3：预览态

```tsx
const isFloating = layout === "left" || layout === "right";

return (
  <NodeViewWrapper
    className={`relative group border border-base-300 rounded-lg overflow-hidden ${
      layout === "full"
        ? "w-full"
        : isFloating
          ? `${layout === "left" ? "float-left mr-5 mb-4" : "float-right ml-5 mb-4"}`
          : ""
    }`}
    style={isFloating ? { width } : undefined}
  >
```

- **`group`**：Tailwind 的 group 类，用于 hover 联动
  - 子元素用 `group-hover:opacity-100` → 鼠标悬停在容器上时显示
- **浮动布局**：`float-left` / `float-right` 实现文字环绕
- **`style={isFloating ? { width } : undefined}`**：只有浮动时设置宽度

#### 图片显示

```tsx
<div className="aspect-video bg-base-200 relative">
  <img src={currentImage.url} alt={currentImage.alt ?? ""}
       className="absolute inset-0 w-full h-full object-cover" />
  {images.length > 1 && (
    <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
      1/{images.length}
    </span>
  )}
</div>
```

- `aspect-video`：16:9 比例（Tailwind 内置）
- `absolute inset-0`：图片铺满父容器
- `object-cover`：裁剪填充，保持比例
- 多图时显示「1/N」角标

#### Hover 工具栏

```tsx
<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
  <button className="btn btn-xs btn-ghost bg-base-100/80"
          onClick={() => setIsEditing(true)}>
    ✏️ Edit
  </button>
  <button className="btn btn-xs btn-ghost bg-base-100/80 text-error"
          onClick={() => deleteNode()}>
    ✕
  </button>
</div>
```

- `opacity-0`：默认隐藏
- `group-hover:opacity-100`：鼠标悬停在外层 `group` 容器时显示
- `transition-opacity`：淡入淡出动画
- `bg-base-100/80`：80% 不透明度的白色背景

---

## 🔄 数据流

```
用户操作 UI
    │
    ▼
updateAttributes({ ... })
    │
    ▼
Tiptap 更新 node.attrs
    │
    ├── 触发 React 重新渲染 (NodeView)
    │   └── UI 更新
    │
    └── editor.getJSON() 返回最新数据
        └── onUpdate 回调 → 保存到后端
```

---

## 🎯 设计模式总结

| 模式 | 应用位置 |
|------|---------|
| **不可变更新** | `updateImage()` 用 `.map()` 而非 `.push()` |
| **状态机** | 三种状态：empty → editing → preview |
| **联动逻辑** | `setLayout` 自动调整 `width` |
| **条件禁用** | `layout === "full"` 时 width 下拉框 disabled |
| **事件隔离** | `onMouseDown(stopPropagation)` 防止 UI 控件触发编辑器行为 |
| **Hover 显示** | Tailwind `group` + `group-hover:opacity-100` |

---

## 🔗 关联文件

```
ImageCarouselNodeView.tsx
  ├── 从 ImageCarouselNode.ts 引入类型 (CarouselImage, ImageLayout)
  ├── 被 ImageCarouselNode.addNodeView() 绑定
  └── 被 page.tsx 的编辑器实例渲染