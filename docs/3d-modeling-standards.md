# CVProject 3D Modeling Standards

## 1. Scope

These standards apply to every Blender, GLB, glTF, and Three.js scene asset
used in the CVProject coffee-shop experience, including:

- Creating a new model.
- Editing or optimizing an existing model.
- Re-exporting a GLB.
- Changing scale, materials, hierarchy, pivots, or interaction structure.
- Producing standalone and in-context preview renders.

Unless the user explicitly requests otherwise, a modeling task does not
include:

- Changing React, Three.js, or other application code.
- Permanently placing the asset in the coffee-shop source model.
- Creating or baking animation.
- Modifying the original coffee-shop model.
- Changing unrelated assets.

## 2. Core objectives

Every asset must:

1. Match the established coffee-shop visual style.
2. Communicate its purpose quickly to an HR reviewer or ordinary visitor.
3. Use efficient geometry suitable for real-time web rendering.
4. Preserve the editability needed for future clicks, animation, and content
   replacement.
5. Use stable, meaningful names after import into Three.js.
6. Fit its intended position in the real coffee-shop scene, not only in a
   standalone preview.

Use this priority order:

```text
functional clarity
-> consistency with the scene
-> correct scale and placement
-> interaction and editability
-> geometry efficiency
-> decorative detail
```

Decorative detail must never compromise the first five priorities.

## 3. Mandatory workflow

### 3.1 Requirements review

Before modeling, confirm:

- The asset's purpose.
- What website content it represents.
- Its intended location and viewing direction.
- The role of each reference image.
- Required components and components that must be omitted.
- Expected future clicks or animation.
- Required delivery formats.
- Whether application-code changes are in scope.

If historical requirements conflict with a new explicit request, the newest
explicit user instruction wins.

Ask about unclear decisions before modeling. Do not invent important form,
function, placement, or interaction requirements.

### 3.2 Grayscale concept

Confirm the following before using Blender:

- Overall silhouette and proportions.
- Number and arrangement of major components.
- Front, side, and rear construction.
- Interactive components.
- Relationship to the intended scene location.
- Orientation toward the primary camera.

A grayscale concept is a design-approval artifact, not a Blender deliverable.

### 3.3 Color and material preview

Confirm:

- Primary and secondary colors.
- Material character.
- Labels and icons.
- Consistency with the coffee shop.
- Whether the asset's function is immediately understandable.

A generated concept image is not evidence that the Blender asset is complete.
Do not start modeling until the user approves the design direction.

### 3.4 Blender modeling

Build only the approved design. If the design cannot be implemented cleanly,
does not fit, or creates a meaningful performance problem, pause and explain
the issue instead of silently changing the design.

### 3.5 Verification and delivery

Before delivery, produce or verify:

- A render of the actual standalone Blender asset.
- A front or primary interaction view.
- An in-context coffee-shop scale and placement preview.
- Triangle count and object/material structure.
- A reopened `.blend` file.
- An independently re-imported final GLB, when a GLB is in scope.
- Independence of every interactive component.
- Materials, embedded textures, pivots, and runtime names.

## 4. Visual language

Match the established coffee-shop visual language:

- Miniature architectural-model character.
- Low-poly construction.
- Soft, restrained bevels.
- Slightly chunky, readable primary components.
- Simplified but recognizable silhouettes.
- Soft, low-saturation colors.
- A modest handmade quality.
- Stylization rather than photorealism.

Typical palette directions include:

- Cream or ivory.
- Muted petrol teal.
- Warm timber.
- Terracotta orange or brown.
- Warm gray stone.
- Restrained aged brass.
- Functional accent colors such as British postbox red.

Avoid:

- Heavy realistic wear, dirt, or splintered timber.
- Saturated game-like color coding.
- Unnecessary glossy metal.
- Complex photorealistic textures.
- Industrial-CAD detail that conflicts with the coffee shop.
- Detail added only to make an asset appear more sophisticated.

Reference images define design intent. They do not require copying every
detail, internal mechanism, material, or polygon from the real object.

## 5. Functional clarity

Interactive assets must not require visitors to solve a puzzle. Combine:

- A recognizable real-world object.
- Clear wording.
- Necessary icons.
- Logical placement in the scene.

Current functional mapping:

| Website content | Scene asset |
| --- | --- |
| Contact / email | British red postbox |
| Work experience | Vending machine |
| Education | Little Free Library |
| CV, GitHub, and LinkedIn | Order pickup stand |
| Scene navigation | Fingerpost road sign |

If the metaphor may be ambiguous, add an explicit label. The coffee-shop
theme creates memorability; wording and iconography provide comprehension.

## 6. Geometry and performance

### 6.1 Required principles

- Use the lowest reasonable geometry that preserves silhouette and function.
- Do not model invisible detail.
- Remove unused interior structures and hidden end caps.
- Remove duplicate, overlapping, and coplanar faces.
- Do not allow z-fighting, black seams, or shading errors caused by overlap.
- Use restrained radial segments on simple cylinders.
- Use few bevel segments on small web assets.
- Do not use subdivision to inflate the exported mesh unless explicitly
  approved.
- Prefer a texture or simple plane for screens and dense text.
- Do not build large amounts of 3D text for dynamic content.
- Do not construct unseen machinery merely because animation may be added
  later.

### 6.2 Default triangle guidance

These are planning ranges, not automatic pass/fail thresholds:

| Asset type | Suggested triangles |
| --- | ---: |
| Simple prop | 500-2,000 |
| Medium interactive prop | 1,500-4,000 |
| Multi-part prop with doors, books, or similar elements | Aim near or below 5,000 where practical |
| More than 5,000 | Explain the reason before proceeding |

Historical references:

- Order pickup stand: approximately 1,471 triangles.
- Vending machine: approximately 3,792 triangles.

Triangle count is not the only cost. Also inspect:

- Mesh-node count.
- Material count.
- Primitive and draw-call count.
- Texture count and resolution.
- Duplicate geometry.
- The interaction boundaries that must remain independent.

Static, same-material parts that never need separate interaction may be
combined in the final GLB to reduce draw calls. Do not combine parts that must
be clicked, animated, rotated, hidden, or replaced independently.

## 7. Structure and editability

### 7.1 Asset root

Give every asset one clear root:

```text
asset_name_01_root
```

The root controls whole-asset translation, rotation, and uniform scale. Do not
reposition an asset by manually moving every child.

### 7.2 Independent parts

Keep these parts independent:

- Click targets.
- Parts that may rotate or translate later.
- Screens and replaceable content planes.
- Doors and hinge controllers.
- Books, bags, arrows, and similar parts that must remain selectable.
- Links with different actions.

The following may be combined in the final GLB when doing so does not break
editing or interaction:

- Fixed exterior shells.
- Static decoration that shares one material.
- Fixed pieces that form one continuous silhouette.

The `.blend` source should favor clear editability. The exported GLB may be
more aggressively optimized only where interaction boundaries are preserved.

## 8. Preparing for future interaction and animation

Animation is not included by default. Preserve only the structure required by
an explicitly anticipated interaction, for example:

- A clear postbox slot for a possible future letter animation.
- Real hinge pivots for the Little Free Library doors.
- An independent UV-mapped vending-machine screen.
- Independent road-sign arrows.
- Separately identifiable CV, GitHub, and LinkedIn bags.

Do not create the following for an unconfirmed future animation:

- Hidden mechanical assemblies.
- Complex internal geometry.
- Large polygon increases.
- Baked keyframes.
- Additional unrequested props.

The default preparation is correct pivots, hierarchy, and naming without
animation keyframes.

## 9. Naming

Runtime-critical names must be safe for Blender, GLB, and Three.js:

- Use English.
- Use lowercase ASCII letters, digits, and underscores.
- Do not use spaces, non-ASCII characters, periods, bullet characters, or
  decorative punctuation.
- Keep names unique within the asset and scene.
- Use two-digit suffixes for repeated instances.
- Include both asset and component meaning.

Recommended examples:

```text
asset_name_01_root
asset_name_01_body
asset_name_01_screen
asset_name_01_door_left
asset_name_01_door_right
asset_name_01_link_cv
asset_name_01_link_github
asset_name_01_link_linkedin
```

Do not depend on generated names such as `Cube.001` or `Plane.005` for runtime
interaction. User-facing capitalization and spaces belong in textures, text
content, or application copy, not in object identifiers.

## 10. Materials and textures

- Keep material count low.
- Share materials where their appearance is identical.
- Do not create duplicate materials for the same color and properties.
- Use simple procedural/basic materials for flat colors.
- Use a separate UV plane for dynamic screens.
- Pack textures into the `.blend` or keep them at a stable project path.
- Verify that every exported texture is embedded or reliably loadable.
- Never depend on an operating-system temporary path.
- Retest transparency after import into Three.js.
- Do not use high-resolution textures for detail that is not visible at the
  normal camera distance.

## 11. Scale and scene fit

- Use `coffee_shop-all.glb` as the scale and style reference.
- Do not include the coffee shop in the delivered standalone asset.
- Test every asset at its intended scene location.
- Check top, side, rear, and ground clearances.
- Do not intersect walls, beams, curbs, or other assets.
- Do not block doors, the A-board, navigation, or important interaction areas.
- Place the asset on the correct road, pavement, platform, or floor surface.
- Never use non-uniform scale merely to force an asset to fit.
- Apply placement scale uniformly through the root.
- Record the asset's front axis and intended orientation.

The in-context scene is a verification environment only. Do not save changes
back to the reference coffee-shop file.

## 12. File safety and versioning

- Preserve the original model.
- Create a recoverable backup before material structural changes.
- Save a new version rather than overwriting the only approved copy.
- Do not modify `coffee_shop-all.glb` without explicit authorization.
- Do not modify application code without explicit authorization.
- Do not delete or clean up the user's existing assets without authorization.
- Do not present a temporary test file as the final deliverable.
- A build script must not overwrite an approved version unless replacement was
  explicitly authorized.

Recommended version names:

```text
asset-name.blend
asset-name-v2.blend
asset-name-optimized.blend
```

Update the canonical asset only after the replacement is approved.

## 13. Deliverables

### 13.1 Always provide

- An editable `.blend`.
- A render of the actual standalone Blender asset.
- An in-context coffee-shop scale preview.
- Triangle count.
- A short structure summary.
- Verification results.

### 13.2 When the website will load the asset

Also provide:

- A `.glb`.
- Independent GLB re-import results.
- Important runtime object names.
- Front-axis information.
- Recommended scene position and rotation, when known.
- A list of nodes that must remain independently clickable.

### 13.3 Do not include in the standalone export

- The reference coffee shop.
- Temporary floors or platforms.
- Preview cameras.
- Preview lights.
- Test labels or placeholder geometry.
- Unapproved animation.
- Unrelated assets.

## 14. Acceptance checklist

### Design

- [ ] Matches the approved concept.
- [ ] Matches the coffee-shop style.
- [ ] Has a clear silhouette.
- [ ] Communicates its function quickly.
- [ ] Contains no invented decoration.

### Geometry

- [ ] No overlapping or coplanar faces.
- [ ] No z-fighting or unexplained black seams.
- [ ] No unnecessary interior geometry.
- [ ] No unjustified polygon density.
- [ ] Correct normals and shading.
- [ ] Appropriate bevel and radial segmentation.

### Structure

- [ ] One usable asset root.
- [ ] Click targets remain independent.
- [ ] Animation candidates have correct pivots.
- [ ] Runtime names are stable and meaningful.
- [ ] No important default-generated object names remain.
- [ ] Dynamic content can be replaced cleanly.

### Scene fit

- [ ] Tested in the real coffee-shop reference scene.
- [ ] Correct scale.
- [ ] No wall, beam, ground, or asset intersection.
- [ ] Does not obstruct important scene content.
- [ ] Correct front direction and orientation.
- [ ] Original coffee-shop file remains unchanged.

### Files

- [ ] `.blend` reopens successfully.
- [ ] Textures are packed or use stable paths.
- [ ] GLB independently re-imports successfully.
- [ ] GLB contains no preview scene content.
- [ ] Materials display correctly after import.
- [ ] Critical names match the documented names.
- [ ] Original and backup versions still exist.

## Appendix A: Approved historical asset requirements

This appendix records confirmed project-specific decisions. These decisions
are requirements for the named assets, not universal rules for every future
asset.

### A.1 British red postbox

Purpose:

- Represents contact/email.
- May later support a letter-insertion animation, but the current asset does
  not include the letter or animation.

Approved requirements:

- Use a recognizable classic British red postbox silhouette.
- Use clear golden-yellow `email me` lettering rather than `POST`.
- Remove the unnecessary side handle and door-opening detail.
- Integrate the slot into the body as one shallow recess instead of four
  protruding rectangular blocks.
- Remove unnecessary bucket interior and hidden construction.
- Optimize the entire asset, not only the areas highlighted in feedback.
- Preserve the earlier approved version and create an optimized version rather
  than overwriting the only copy.

### A.2 Vending machine

Purpose:

- Represents work experience.
- The screen may later receive job, company, and date content from Three.js.

Approved requirements:

- Cream body and front panel.
- Orange limited to the small slot and recessed lower collection opening.
- Narrow front with believable body depth.
- Four work-experience entries on the left.
- Speaker, sensor area, and keypad in the narrow right control section.
- Keep one confirmed square module beneath the keypad; do not restore the
  already removed extra lower-right module.
- Use a genuine but simple recess for the lower opening.
- Use an independent four-vertex UV-mapped plane for the screen.
- Use a texture for example screen content rather than dense text geometry.
- Keep the asset below the rear wall beam with visible clearance.
- Deliver the asset independently; do not change application code as part of
  the modeling task.

Historical result: approximately 3,792 triangles.

### A.3 Order pickup stand

Purpose:

- Represents CV, GitHub, and LinkedIn actions.
- The three bags may later act as independent click targets.

Approved structure:

- Two continuous petrol-teal uprights.
- Three warm timber boards with equal width, depth, and thickness.
- Top board empty, CV in the middle, GitHub and LinkedIn on the bottom.
- A two-tier blue/teal base.
- Overall height aligned with the historical scene MenuStand.

Approved bag construction:

- Read as simple takeaway paper bags.
- Compressed mouth with one clearly visible front fold.
- Use few triangular side faces to suggest gathering.
- No complex wrinkles or paper textures.
- Preserve labels and icons.
- Only the CV bag carries the download icon.
- Final approved depth is 200% of the earlier bag depth while width, height,
  position, and stand geometry remain unchanged.
- Increasing depth must not increase triangle count unnecessarily.

Geometry requirements:

- No overlap or black seams where boards meet posts.
- Teal uprights must read as continuous from bottom to top.
- Boards must be notched or constructed around the uprights instead of
  occupying the same exterior volume.

Historical result: approximately 1,471 triangles.

### A.4 Little Free Library

Purpose and location:

- Represents education.
- Stands behind the coffee shop, to the viewer's right of the vending machine.

Approved requirements:

- Use the approved small-house form, not the minimal rectangular alternative.
- Freestanding on its own timber post and braces; it is not wall-mounted.
- Use a small concrete foot, not a separate large white platform.
- Do not include shrubs or unrelated decoration.
- Retain the pitched roof, double glazed doors, two shelves, and visible books.
- Use cream, terracotta, warm timber, and muted teal materials.
- Keep each door independent with its pivot at the physical hinge.
- Local Z rotation of zero closes each door; an outward angle near 105 degrees
  is the approved open presentation.
- Do not bake animation keyframes.
- Keep books independently editable; the approved historical model contains
  18 books.
- Use one root for whole-asset placement.
- Scale the asset uniformly to leave a clear gap below the coffee-shop beam.

### A.5 Fingerpost road sign

Purpose:

- Provides navigation for visitors who cannot immediately find portfolio
  content.
- Each arrow is an independent click target that moves the camera to the
  relevant content.
- It must read as CV navigation, not as a game prop.

Approved form and style:

- A classic UK/New Zealand-recognizable fingerpost.
- Rounded, slightly chunky miniature construction matching the coffee shop.
- Warm timber post, cream faces, muted petrol-teal borders and lettering,
  restrained aged-brass bolts, and a warm light-gray stone base.
- Follow the proportions and arrangement of the approved color concept.

Approved copy:

```text
MY PORTFOLIO
CLICK TO EXPLORE
PROJECTS
EXPERIENCE
CONTACT ME
EDUCATION
CV & LINKS
```

Interaction and direction:

- Keep all five arrows independent after GLB export.
- `CONTACT ME` points approximately toward the postbox.
- `CV & LINKS` points approximately toward the CV/GitHub/LinkedIn stand.
- Adjust the remaining arrows to the actual target positions when those
  mappings are finalized.
- `CV & LINKS` first focuses the full stand; the visitor then selects CV,
  GitHub, or LinkedIn.

Placement:

- Place the sign on the viewer's left, visually balancing the postbox on the
  right.
- The entire sign and footing belong on the road outside the white curb.
- Do not place any part on the raised white coffee-shop platform.
- Do not obstruct the entrance, A-board, CV stand, or important architecture.
