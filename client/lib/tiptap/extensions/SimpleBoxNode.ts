import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { SimpleBoxNodeView } from "./SimpleBoxNodeView";

// ── 可选：为 TypeScript 声明自定义命令的类型 ──
// 这样在 editor.chain().insertSimpleBox() 时会自动补全
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    simpleBox: {
      /**
       * 插入一个带自定义背景色的提示框
       * @param backgroundColor 背景色，默认 "#e0f0ff"
       */
      insertSimpleBox: (backgroundColor?: string) => ReturnType;
    };
  }
}

/**
 * SimpleBox — 最简自定义 Node 学习范例
 *
 * 这个 node 只有一个属性 `backgroundColor`，
 * 展示 TipTap 自定义 Node 的完整骨架：
 *
 *   name → addAttributes → renderHTML → addNodeView → addCommands
 */
export const SimpleBoxNode = Node.create({
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ① name：节点在 JSON 中的 type 字段
  //    JSON: { type: "simpleBox", attrs: { ... } }
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  name: "simpleBox",

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ② group："block" 表示块级元素，独占一行
  //    "inline" 表示行内元素，可以和文字混排
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  group: "block",

  // 允许拖拽移动（学习时可省略，默认 false）
  draggable: true,

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ③ addAttributes：定义节点存储的数据
  //
  //    每个属性需要提供：
  //    - default: 默认值
  //    - parseHTML: 如何从 HTML 读回属性（粘贴/加载时）
  //    - renderHTML: 如何把属性写入 HTML（导出/保存时）
  //
  //    如果属性是 string/number，可以简写为 { default: "xxx" }
  //    TipTap 会自动处理序列化。
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  addAttributes() {
    return {
      backgroundColor: {
        default: "#e0f0ff", // 默认浅蓝色
      },
    };
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ④ renderHTML：序列化为原生 HTML
  //
  //    谁调用？→ TipTap 内部自动调用，你不需要手动调用。
  //    什么时候调用？
  //      - editor.getHTML() 导出 HTML 时
  //      - 复制节点到剪贴板时
  //      - 粘贴到不支持 NodeView 的环境时
  //
  //    参数 HTMLAttributes 是什么？
  //      TipTap 会把 addAttributes 中每个属性的 renderHTML 返回值
  //      收集成一个对象，传到这里。
  //
  //      对于简单属性（只写了 default），TipTap 有默认的 renderHTML：
  //        属性名 → HTML 属性名（同名映射）
  //
  //      所以 HTMLAttributes 实际就是：
  //        { backgroundColor: "#e0f0ff" }  ← 当前节点存储的背景色值
  //
  //      如果 addAttributes 里自定义了 renderHTML（如 ImageCarouselNode），
  //      那 HTMLAttributes 里的 key 就是你自定义的 key。
  //
  //    返回值规范：["标签名", {属性}, 子内容]
  //      子内容为 0 表示这是一个"有洞"的元素，子节点由编辑器管理
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      {
        "data-type": "simple-box", // 标记这个 div 是 simpleBox 节点
        style: `background-color: ${HTMLAttributes.backgroundColor}; padding: 1rem; border-radius: 0.5rem;`,
      },
      0, // 0 = 空元素（有洞 hole），子内容由编辑器管理
    ];
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ⑤ addNodeView：用 React 组件渲染这个节点
  //
  //    ReactNodeViewRenderer 接收一个 React 组件，
  //    该组件会收到 node / updateAttributes / deleteNode 等 props
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  addNodeView() {
    return ReactNodeViewRenderer(SimpleBoxNodeView);
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ⑥ addCommands：注册命令，让工具栏按钮能操作这个节点
  //
  //    命令函数签名：
  //    (自定义参数) => ({ commands }) => 执行结果
  //
  //    commands.insertContent() 插入一个或多个节点
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  addCommands() {
    return {
      insertSimpleBox:
        (backgroundColor?: string) =>
        ({ commands }) =>
          commands.insertContent([
            // 插入 simpleBox 节点
            {
              type: this.name,
              attrs: backgroundColor
                ? { backgroundColor }
                : undefined, // undefined 会用 default 值
            },
            // 紧接着插入一个空段落，方便用户继续打字
            { type: "paragraph" },
          ]),
    };
  },
});