/**
 * heroOrnaments.ts
 *
 * Single source of truth for all six Hero section ornament slots.
 *
 * Figma defines six decorative 3D objects in the "3d ornament" group (#46:79):
 *   Three spheres (rounded gradient blobs)
 *   Three cones (pointed/angled 3D shapes)
 *
 * To replace an asset with a new export:
 *   1. Drop the new file into src/assets/images/ornaments/
 *   2. Update the single import line for that slot below.
 *   No other file needs to change.
 *
 * ASSET STATUS (updated after real Figma exports were added):
 *   sphere-1.png  -- real Figma export (src/assets/images/ornaments/)
 *   sphere-2.png  -- real Figma export (src/assets/images/ornaments/)
 *   sphere-3.png  -- real Figma export (src/assets/images/ornaments/)
 *   cone-1.png    -- real Figma export (src/assets/images/ornaments/)
 *   cone-2.png    -- real Figma export (src/assets/images/ornaments/)
 *   cone-3.png    -- real Figma export (src/assets/images/ornaments/)
 *
 * Desktop positions are derived from Figma Hero_Frame (1440x1024px).
 * The "3d ornament" group is at x=-118, y=221 within Hero_Frame.
 * Absolute page position = group_offset + ornament_offset_within_group.
 *
 * The ornament wrapper is absolute inset-0 within the <section>, which
 * starts after the sticky Navbar (120px). Ornament positions are fixed
 * pixel values so they match Figma precisely at 1440px viewport width.
 *
 * Coordinate derivation for each ornament:
 *   left_px = frame_x_in_Hero_Frame
 *   top_px  = frame_y_in_Hero_Frame - 120   [120px = navbar height]
 *
 * IMPORTANT: Tailwind Preflight sets height:auto on all <img> elements.
 * The HTML width attribute fixes rendered width; height is calculated from
 * the PNG native aspect ratio. The real rendered heights differ from the
 * declared Figma frame heights -- see the desktopClasses JSDoc below.
 *
 * Ornaments are rendered at z-[1], behind all hero content (z-10).
 * They are visible lg+ only (>=1024px). pointer-events-none. aria-hidden.
 */

import sphere1Src from '../assets/images/ornaments/sphere-1.png'
import sphere2Src from '../assets/images/ornaments/sphere-2.png'
import sphere3Src from '../assets/images/ornaments/sphere-3.png'

import cone1Src from '../assets/images/ornaments/cone-1.png'
import cone2Src from '../assets/images/ornaments/cone-2.png'
import cone3Src from '../assets/images/ornaments/cone-3.png'

export type OrnamentType = 'sphere' | 'cone'

export interface OrnamentSlot {
  /** Stable identifier used as React key */
  id: string
  /** Asset src — one import per slot; replace import to swap asset */
  src: string
  /** Figma design width in px */
  width: number
  /** Figma design height in px */
  height: number
  /** Whether this slot is still showing a placeholder asset */
  isPlaceholder: boolean
  /** Figma ornament type */
  type: OrnamentType
  /**
   * Tailwind absolute-positioning classes applied on lg+ (>=1024px).
   * Positions are fixed pixel values derived directly from Figma Hero_Frame
   * coordinates so the composition matches Figma precisely at 1440px.
   * The containing element is absolute inset-0 within the section.
   *
   * NOTE: Tailwind Preflight sets height:auto on <img>, so only the CSS
   * width is fixed by the HTML width attribute. Each PNG renders at its
   * native aspect ratio. Real rendered heights (measured at width=declared):
   *   sphere-1: 330x346   sphere-2: 280x407   sphere-3: 175x175
   *   cone-1:   342x339   cone-2:   370x646   cone-3:   188x187
   * Positions were chosen so no ornament covers any content region
   * (heading, subtitle, form, photo, float cards) at 1024-1440px.
   */
  desktopClasses: string
  /** Whether the Figma position is confirmed vs estimated */
  positionKnown: boolean
}

export const HERO_ORNAMENTS: OrnamentSlot[] = [
  {
    /*
     * Frame #46:85 within group:
     *   group offset: x=-118, y=221
     *   frame offset within group: x=1245, y=451
     *   absolute in Hero_Frame: x=1127, y=672
     *   in section (y - 120): y=552
     *   Figma frame size: 330x330 (renders as 330x346 due to PNG native ratio)
     *   At 1440px: x=1127-1457 (17px clipped right), y=552-898. Clear of all content.
     */
    id: 'sphere-1',
    src: sphere1Src,
    width: 330,
    height: 330,
    isPlaceholder: false,
    type: 'sphere',
    desktopClasses: 'left-[1127px] top-[552px]',
    positionKnown: true,
  },
  {
    /*
     * Frame #46:90 -- template element; exact position not available at Figma depth 4.
     * Frame #46:90 -- template element; exact Figma position unavailable.
     * PNG renders as 280x407 (native ratio ~1:1.45, taller than wide).
     *
     * Placed at right-0 top-[230px]:
     *   top-[230px] = 8px below heading bottom (222px) -- no vertical heading overlap.
     *   Per-breakpoint left-edge vs heading-right analysis (heading max-w-[935px]):
     *     1440px: left=1160px, heading right=~1175px -> 15px horizontal gap, y-clear ✓
     *     1366px: left=1086px, heading right=~1138px -> 52px gap, y-clear ✓
     *     1280px: left=1000px, heading right=~1095px -> 95px gap, y-clear ✓
     *     1100px: left=820px,  heading right=~1055px -> 235px gap, y-clear ✓
     *     1024px: left=744px,  heading right=~983px  -> 239px gap, y-clear ✓
     *   At 1440px rendered extent: x=1160-1440, y=230-637. No content overlap.
     *   Photo (x=432-1010, y=440+) vs sphere (x=1160+): no horizontal overlap ✓
     *   Float cards all at x<=1050: sphere at x>=1160, no overlap ✓
     *
     * Recorded as deviation: sphere-2 Figma position unknown; top moved from
     * estimated 22% (211px) to 230px to clear heading bottom at all breakpoints.
     */
    id: 'sphere-2',
    src: sphere2Src,
    width: 280,
    height: 280,
    isPlaceholder: false,
    type: 'sphere',
    desktopClasses: 'right-0 top-[230px]',
    positionKnown: false,
  },
  {
    /*
     * Frame #46:95 within group:
     *   group offset: x=-118, y=221
     *   frame offset within group: x=301, y=256
     *   absolute in Hero_Frame: x=183, y=477
     *   in section (y - 120): y=357
     *   Figma frame size: 175x175 (PNG renders square, no ratio distortion)
     *
     * Deviation: Figma places sphere-3 at section-y=357, which puts it
     * inside the search form zone (form: y=371-423). The real 3D spiral PNG
     * is visually prominent and cannot be hidden purely via z-index without
     * appearing to interfere with the input. Top moved from 357px to 520px
     * (163px lower) to place the ornament fully below the form at all
     * specified breakpoints (1024-1440px). Left kept at Figma value 183px.
     *   At 1440px: x=183-358, y=520-695. Clear of form (bottom 423px) ✓
     *   At 1024px: x=183-358, y=520-695. Clear of form (bottom ~508px) ✓
     *   Photo at x=432+: sphere right=358 < photo left=432. No overlap ✓
     *   Happy Students card at y=717+: sphere bottom=695 < 717. No overlap ✓
     */
    id: 'sphere-3',
    src: sphere3Src,
    width: 175,
    height: 175,
    isPlaceholder: false,
    type: 'sphere',
    desktopClasses: 'left-[183px] top-[520px]',
    positionKnown: true,
  },
  {
    /*
     * Cone #46:105 within group:
     *   group offset: x=-118, y=221
     *   frame offset within group: x=136, y=461
     *   absolute in Hero_Frame: x=18, y=682
     *   in section (y - 120): y=562
     *   Figma frame size: 342x342 (renders as 342x339, nearly square)
     *   At 1440px: x=18-360, y=562-901. Below form (423px) ✓
     *   Photo at x=432+: cone right=360 < photo left=432. No overlap ✓
     */
    id: 'cone-1',
    src: cone1Src,
    width: 342,
    height: 342,
    isPlaceholder: false,
    type: 'cone',
    desktopClasses: 'left-[18px] top-[562px]',
    positionKnown: true,
  },
  {
    /*
     * Cone #46:110 within group:
     *   group offset: x=-118, y=221
     *   frame offset within group: x=1349, y=0
     *   absolute in Hero_Frame: x=1231, y=221
     *   in section (y - 120): y=101
     *   Figma frame size: 370x370. PNG renders as 370x646 (native ratio ~1:1.75).
     *   At 1440px: x=1231-1601 (161px off-screen right), y=101-747.
     *   Visible portion at 1440px: 209px wide at far-right edge. Clear of content ✓
     *   At 1366px: visible from x=1231-1366 (135px), heading right=1138. Gap=93px ✓
     *   At 1280px: visible from x=1231-1280 (49px), heading right=1095. Gap=136px ✓
     *   At <=1100px: x=1231 > viewport, completely off-screen ✓
     */
    id: 'cone-2',
    src: cone2Src,
    width: 370,
    height: 370,
    isPlaceholder: false,
    type: 'cone',
    desktopClasses: 'left-[1231px] top-[101px]',
    positionKnown: true,
  },
  {
    /*
     * Cone #46:80 within group:
     *   group offset: x=-118, y=221
     *   frame offset within group: x=1224, y=243
     *   absolute in Hero_Frame: x=1106, y=464
     *   in section (y - 120): y=344
     *   Figma frame size: 188x188 (renders as 188x187, nearly square)
     *   At 1440px: x=1106-1294, y=344-531. Heading right=1175; cone left=1106.
     *     Horizontal overlap 1106-1175 (69px) but heading bottom=222 < cone top=344 ✓
     *   At 1366px: x=1106-1294 (clipped at 1366). Heading right=1138; cone left=1106.
     *     Gap=32px. Heading y-bottom=222 < cone y-top=344 ✓
     *   At 1280px: x=1106-1280 (clipped 14px). Heading right=1095; cone left=1106.
     *     Gap=11px. Heading bottom=222 < cone top=344 ✓
     *   At 1100px: x=1106>1100, off-screen ✓. At 1024px: off-screen ✓
     *   Form: x=240-720 at 1440px. Cone x=1106 > 720. No overlap ✓
     *   Photo: x=432-1010 at 1440px. Cone x=1106 > 1010. No overlap ✓
     */
    id: 'cone-3',
    src: cone3Src,
    width: 188,
    height: 188,
    isPlaceholder: false,
    type: 'cone',
    desktopClasses: 'left-[1106px] top-[344px]',
    positionKnown: true,
  },
]
