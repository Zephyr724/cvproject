# CVProject instructions

Before creating, editing, optimizing, exporting, or reviewing any Blender,
GLB, glTF, or Three.js scene asset, read:

- `docs/3d-modeling-standards.md`

The modeling standards are mandatory for all 3D asset work in this repository.

Key rules:

- Confirm unclear requirements before modeling.
- Follow the approved sequence: grayscale concept, color/material preview,
  user approval, Blender modeling, and verification.
- Match the existing coffee-shop miniature low-poly style.
- Do not modify `coffee_shop-all.glb` or application code unless explicitly
  requested.
- Preserve editable source structure and keep interactive parts independently
  named.
- Remove unnecessary hidden geometry, overlapping faces, and avoidable polygon
  cost.
- Test scale and placement against the coffee shop without saving changes to
  the reference file.
- Reopen and verify the `.blend`; independently re-import and verify every
  final GLB.
- Preserve original files and create a recoverable version before material
  changes.
