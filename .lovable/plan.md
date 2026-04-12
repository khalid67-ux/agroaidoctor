

## Plan: Strengthen Leaf Detection Validation

### Current State
The app already has a `detectLeaf()` function with color-based heuristics (green ratio, saturation, blue/red rejection) and a threshold of 0.70. It returns `not_leaf` status with an error message. All UI handling for `not_leaf` is already in place.

### Problem
The current detection relies solely on simple color ratios, which can be fooled by:
- Green-colored non-leaf objects (green fabric, green toys)
- Photos with green backgrounds but no leaf (grass fields, forests from afar)
- Brown/yellow objects that mimic diseased leaf colors

### Proposed Improvements to `src/lib/diseaseData.ts`

#### 1. Add texture analysis to `detectLeaf()`
- Compute **edge density** using Sobel-like operators — real leaves have organic vein patterns with moderate edge density, while flat surfaces (walls, sky) have very low edges and cluttered scenes have very high edges
- Add a **color variance** check — leaves have gradual color transitions, not uniform blocks

#### 2. Add shape/structure checks
- Compute **foreground compactness** — leaves tend to have a connected, compact foreground region vs scattered objects
- Check **aspect ratio of the dominant color region** — very extreme aspect ratios (thin strips, perfect circles) are less likely to be leaves

#### 3. Raise the leaf confidence threshold
- Increase threshold from 0.70 to **0.75** for stricter gating
- Add an intermediate zone (0.60-0.75) that returns `uncertain` with the message: "⚠️ নিশ্চিত হওয়া যায়নি এটি পাতা কিনা। অনুগ্রহ করে পরিষ্কার পাতার ছবি দিন।"

#### 4. Add sky/skin tone detection
- Detect **sky-like pixels** (high blue, low green/red) — reject if dominant
- Detect **skin-tone pixels** — penalize if large portion of image matches skin color ranges

### Changes Summary

**Only file changed: `src/lib/diseaseData.ts`**

1. New helper: `computeEdgeDensity(data, width, height)` — returns ratio of high-gradient pixels
2. New helper: `detectSkyAndSkin(data)` — returns sky/skin pixel ratios
3. Updated `detectLeaf()`:
   - Add edge density scoring (moderate = leaf-like, very low/high = not leaf)
   - Add sky/skin penalty
   - Add color variance check
4. Updated `simulatePrediction()`:
   - Threshold raised to 0.75 for `not_leaf`
   - New zone 0.60-0.75 returns `uncertain` with leaf-doubt message

**No UI changes.** The existing ResultCard already handles all statuses correctly.

