"use client";

import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { useState } from "react";

/**
 * SimpleBoxNodeView — SimpleBox 节点的 React 渲染组件
 *
 * NodeView 的三个核心 props：
 *   node           → 当前节点的 ProseMirror Node 对象
 *   updateAttributes → 修改节点属性（如改背景色）
 *   deleteNode     → 删除这个节点
 *
 * NodeViewWrapper 是必需的包裹组件，它负责：
 *   - 标记这块区域属于一个自定义节点
 *   - 处理拖拽 / 选中等交互
 */
export function SimpleBoxNodeView({
  node,
  updateAttributes,
  deleteNode,
}: NodeViewProps) {
  const backgroundColor = (node.attrs.backgroundColor as string) ?? "#e0f0ff";

  // ── 编辑状态：显示/隐藏颜色选择器 ──
  const [isEditing, setIsEditing] = useState(false);

  return (
    <NodeViewWrapper>
      <div
        className="relative rounded-lg p-4 min-h-[80px] group"
        style={{ backgroundColor }}
      >
        {/* ── 右上角悬浮工具栏 (hover 时显示) ── */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
          <button
            type="button"
            className="btn btn-xs btn-ghost bg-base-100/80"
            onClick={() => setIsEditing(!isEditing)}
            title="Edit Background Color"
          >
            🎨
          </button>
          <button
            type="button"
            className="btn btn-xs btn-ghost bg-base-100/80 text-error"
            onClick={() => deleteNode()}
            title="Delete Box"
          >
            ✕
          </button>
        </div>

        {/* ── 颜色编辑面板 ── */}
        {isEditing && (
          <div
            className="absolute top-10 right-2 z-20 bg-base-100 border border-base-300 rounded-lg p-2 shadow-lg flex items-center gap-2"
            contentEditable={false}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) =>
                updateAttributes({ backgroundColor: e.target.value })
              }
              className="w-8 h-8 cursor-pointer"
            />
            <button
              type="button"
              className="btn btn-xs btn-ghost"
              onClick={() => setIsEditing(false)}
            >
              Done
            </button>
          </div>
        )}

        {/* ── 这里会放置编辑器的实际内容（文字等） ── */}
        {/*    留空即可，TipTap 会自动把光标放在这里 */}
      </div>
    </NodeViewWrapper>
  );
}