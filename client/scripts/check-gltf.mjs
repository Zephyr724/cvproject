/**
 * GLB 验证工具（增强版：支持玻璃/透射材质检测）
 * 用法: node scripts/check-gltf.mjs [glb文件路径]
 *
 * 列出 GLB 文件中所有 mesh 名称、材质名称、Emission 信息、
 * 以及玻璃相关扩展（KHR_materials_transmission / ior / volume / dispersion）。
 */

import fs from "node:fs";

const glbPath = process.argv[2] || "public/models/house.glb";

if (!fs.existsSync(glbPath)) {
  console.error(`❌ 文件不存在: ${glbPath}`);
  process.exit(1);
}

const buf = fs.readFileSync(glbPath);

// GLB 二进制布局:
//   offset 0: magic (4 bytes, 0x46546C67 = "glTF")
//   offset 4: version (4 bytes)
//   offset 8: total length (4 bytes)
//   offset 12: JSON chunk length (4 bytes)
//   offset 16: JSON chunk type (4 bytes, 0x4E4F534A = "JSON")
//   offset 20: JSON data (variable)
if (buf.length < 20) {
  console.error("❌ 文件太小，不是有效的 GLB");
  process.exit(1);
}

// 验证 magic
const magic = buf.readUInt32LE(0);
if (magic !== 0x46546c67) {
  console.error(`❌ 无效的 GLB magic: 0x${magic.toString(16)}`);
  process.exit(1);
}

// 验证第一个 chunk 是 JSON
const jsonChunkLength = buf.readUInt32LE(12);
const jsonChunkType = buf.readUInt32LE(16);
if (jsonChunkType !== 0x4e4f534a) {
  console.error("❌ 第一个 chunk 不是 JSON");
  process.exit(1);
}

// 解析 JSON
const jsonStart = 20;
const jsonBuf = buf.slice(jsonStart, jsonStart + jsonChunkLength);
const gltf = JSON.parse(jsonBuf.toString("utf-8"));

console.log(`\n📦 GLB 文件: ${glbPath}`);
console.log(`   文件大小: ${(buf.length / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Meshes: ${(gltf.meshes || []).length}`);
console.log(`   Materials: ${(gltf.materials || []).length}`);
console.log(`   Nodes: ${(gltf.nodes || []).length}`);

// 收集所有使用的扩展
const allExtensions = new Set();
if (gltf.extensionsUsed) {
  gltf.extensionsUsed.forEach((ext) => allExtensions.add(ext));
}
if (gltf.extensionsRequired) {
  gltf.extensionsRequired.forEach((ext) => allExtensions.add(ext));
}

// 检查材质级别的扩展
(gltf.materials || []).forEach((mat) => {
  if (mat.extensions) {
    Object.keys(mat.extensions).forEach((ext) => allExtensions.add(ext));
  }
});

console.log(`\n🔌 GLB 使用的扩展:`);
if (allExtensions.size === 0) {
  console.log("   (无)");
} else {
  for (const ext of allExtensions) {
    const isGlassRelated = [
      "KHR_materials_transmission",
      "KHR_materials_ior",
      "KHR_materials_volume",
      "KHR_materials_dispersion",
    ].includes(ext);
    const mark = isGlassRelated ? " 🪟 玻璃扩展" : "";
    console.log(`   - ${ext}${mark}`);
  }
}

// 检查是否有玻璃相关扩展
const glassExtensions = [
  "KHR_materials_transmission",
  "KHR_materials_ior",
  "KHR_materials_volume",
  "KHR_materials_dispersion",
];
const hasGlassExtension = glassExtensions.some((ext) => allExtensions.has(ext));
if (!hasGlassExtension) {
  console.log(`\n❌ 未找到任何玻璃/透射相关扩展！`);
  console.log(`   → GLB 中不包含透明玻璃材质。`);
  console.log(`   → 请在 Blender 中确认：`);
  console.log(`     1. 材质节点使用 Principled BSDF（不是 Glass BSDF）`);
  console.log(`     2. Transmission Weight 设为 1.0`);
  console.log(`     3. Material Properties → Settings → Blend Mode 设为 Alpha Blend`);
  console.log(`     4. 导出 glTF 时确认材质选项均已启用`);
}

// 扩展名称中文映射
const extNameCN = {
  KHR_materials_transmission: "透射（玻璃透明度核心）",
  KHR_materials_ior: "折射率",
  KHR_materials_volume: "体积（厚度/衰减）",
  KHR_materials_dispersion: "色散（彩虹光）",
};

// 收集所有材质信息
const materialsInfo = (gltf.materials || []).map((mat, i) => {
  const emissive = mat.emissiveFactor || [0, 0, 0];
  const hasEmission = emissive.some((v) => v > 0);
  const emissiveHex =
    "#" +
    emissive
      .map((v) =>
        Math.round(Math.max(0, Math.min(1, v)) * 255)
          .toString(16)
          .padStart(2, "0")
      )
      .join("");

  // 检查玻璃相关扩展
  const matExtensions = mat.extensions || {};
  const transmission = matExtensions["KHR_materials_transmission"];
  const ior = matExtensions["KHR_materials_ior"];
  const volume = matExtensions["KHR_materials_volume"];

  // Alpha 模式
  const alphaMode = mat.alphaMode || "OPAQUE";
  const alphaCutoff = mat.alphaCutoff;

  return {
    index: i,
    name: mat.name || `(unnamed_${i})`,
    hasEmission,
    emissiveHex,
    emissiveStre: mat.emissiveStrength || null,
    alphaMode,
    alphaCutoff,
    transmission,
    ior,
    volume,
  };
});

console.log(`\n📋 材质列表:`);
materialsInfo.forEach((mat) => {
  const parts = [];
  if (mat.hasEmission) {
    parts.push(`✨发光`);
  }
  if (mat.alphaMode !== "OPAQUE") {
    parts.push(`🔲alpha=${mat.alphaMode}`);
  }
  if (mat.transmission !== undefined) {
    const tf =
      typeof mat.transmission === "object"
        ? mat.transmission.transmissionFactor
        : mat.transmission;
    parts.push(`🪟透射=${tf}`);
  }
  if (mat.ior !== undefined) {
    const iorVal = typeof mat.ior === "object" ? mat.ior.ior : mat.ior;
    parts.push(`🔬IOR=${iorVal}`);
  }
  if (mat.volume !== undefined) {
    parts.push(`🧊体积`);
  }
  const tagStr = parts.length > 0 ? ` [${parts.join(", ")}]` : "";

  console.log(`   [${mat.index}] ${mat.name}${tagStr}`);

  // 详细输出玻璃材质参数
  if (mat.transmission !== undefined) {
    const tf =
      typeof mat.transmission === "object"
        ? mat.transmission
        : { transmissionFactor: mat.transmission };
    console.log(`        KHR_materials_transmission:`, JSON.stringify(tf));
  }
  if (mat.ior !== undefined) {
    const iorObj =
      typeof mat.ior === "object" ? mat.ior : { ior: mat.ior };
    console.log(`        KHR_materials_ior:`, JSON.stringify(iorObj));
  }
  if (mat.volume !== undefined) {
    console.log(`        KHR_materials_volume:`, JSON.stringify(mat.volume));
  }
});

// 遍历节点找出所有 mesh
console.log(`\n📋 Mesh 列表 (按节点层级):`);

function traverseNodes(nodeIndices, indent = "   ") {
  if (!nodeIndices) return;

  for (const nodeIdx of nodeIndices) {
    const node = gltf.nodes[nodeIdx];
    const nodeName = node.name || `(unnamed_${nodeIdx})`;
    const meshIdx = node.mesh;

    if (meshIdx !== undefined) {
      const mesh = gltf.meshes[meshIdx];
      const meshName = mesh?.name || `(unnamed_mesh_${meshIdx})`;

      // 获取 mesh 的 primitives 和它们对应的材质
      const primitives = mesh?.primitives || [];
      const matNames = primitives
        .map((p) => {
          const matIdx = p.material;
          if (matIdx !== undefined && matIdx < materialsInfo.length) {
            const mat = materialsInfo[matIdx];
            const flags = [];
            if (mat.hasEmission) flags.push("✨");
            if (mat.transmission !== undefined) flags.push("🪟玻璃");
            if (mat.alphaMode !== "OPAQUE") flags.push("🔲半透明");

            const flagStr = flags.length > 0 ? ` ${flags.join("")}` : "";
            return `${mat.name}${flagStr}`;
          }
          return "(无材质)";
        })
        .join(", ");

      console.log(`${indent}${nodeName} → mesh="${meshName}" [材质: ${matNames}]`);
    } else {
      console.log(`${indent}${nodeName} (空节点)`);
    }

    // 递归子节点
    if (node.children && Array.isArray(node.children)) {
      traverseNodes(node.children, indent + "  ");
    }
  }
}

// 从根节点 scene 开始遍历
const sceneIdx = gltf.scene !== undefined ? gltf.scene : 0;
const scene = gltf.scenes?.[sceneIdx];
if (scene && scene.nodes) {
  traverseNodes(scene.nodes);
}

if (!scene || !scene.nodes) {
  console.log("⚠️ 场景没有定义根节点，遍历所有顶级节点");
  traverseNodes(Array.from({ length: gltf.nodes?.length || 0 }, (_, i) => i));
}

// 总结
console.log(`\n===== 玻璃材质诊断 =====`);
if (hasGlassExtension) {
  console.log(`✅ GLB 包含玻璃/透射扩展:`);
  glassExtensions.forEach((ext) => {
    if (allExtensions.has(ext)) {
      console.log(`   ✅ ${ext} (${extNameCN[ext] || ""})`);
    }
  });

  const glassMats = materialsInfo.filter((m) => m.transmission !== undefined);
  if (glassMats.length > 0) {
    console.log(`\n🪟 含透射的材质: ${glassMats.map((m) => `"${m.name}"`).join(", ")}`);
    console.log(`   → Three.js 应该已将其解析为 MeshPhysicalMaterial`);
    console.log(`   → 如果仍不透明，问题可能在 Three.js 场景:`);
    console.log(`     1. scene.environment 未设置（玻璃需要环境贴图才有反射）`);
    console.log(`     2. Canvas 的 gl.toneMapping 参数可能影响`);
  }
} else {
  console.log(`❌ GLB 中没有玻璃/透射材质`);
  console.log(`   请在 Blender (4.0+) 中按以下步骤设置玻璃:`);
  console.log(``);
  console.log(`   Shader Editor:`);
  console.log(`     Principled BSDF → Transmission Weight = 1.0`);
  console.log(`     Roughness = 0~0.1`);
  console.log(`     IOR = 1.45`);
  console.log(``);
  console.log(`   Material Properties → Settings:`);
  console.log(`     Blend Mode = Alpha Blend`);
  console.log(`     Shadow Mode = Alpha Blend`);
  console.log(``);
  console.log(`   导出 glTF → Data → Material: Export`);
}