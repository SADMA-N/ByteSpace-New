/**
 * heroOrnaments.ts
 *
 * Single source of truth for all six Hero section ornament slots.
 *
 * Figma defines six decorative 3D objects in the "3d ornament" group (#46:79):
 *   Three spheres (rounded gradient blobs)
 *   Three cones (pointed/angled 3D shapes)
 *
 * To replace a placeholder with the final asset:
 *   1. Drop the new file into src/assets/images/
 *   2. Update the single import line for that slot below.
 *   No other file needs to change.
 *
 * PLACEHOLDER STATUS (as of T3+T4):
 *   sphere-1.svg  -- placeholder circle gradient  (final: sphere image from Figma)
 *   sphere-2.svg  -- placeholder circle gradient  (final: sphere image from Figma)
 *   sphere-3.svg  -- placeholder circle gradient  (final: sphere image from Figma)
 *   cone-1 slot   -- REUSES sphere-1.svg          (final: cone/torus PNG from Figma)
 *   cone-2 slot   -- REUSES sphere-2.svg          (final: cone/torus PNG from Figma)
 *   cone-3 slot   -- REUSES sphere-3.svg          (final: cone/torus PNG from Figma)
 *
 * Desktop positions are derived from Figma Hero_Frame (1440x1024px).
 * The "3d ornament" group is at x=-118, y=221 within Hero_Frame.
 * Absolute page position = group_offset + ornament_offset_within_group.
 *
 * The ornament wrapper is absolute inset-0 within the <section>, which
 * starts after the sticky Navbar (120px). Ornament top positions are
 * expressed as percentages of the section height (904px = 1024 - 120).
 * Ornament left positions are percentages of the 1440px frame width.
 *
 * Percentage formula:
 *   left = (frame_x) / 1440 * 100
 *   top  = (frame_y - 120) / 904 * 100   [120px = navbar height]
 *
 * Ornaments are rendered at z-[1], behind all hero content (z-10).
 * They are visible md+ only. pointer-events-none. aria-hidden.
 */

import sphere1Src from '../assets/images/sphere-1.svg'
import sphere2Src from '../assets/images/sphere-2.svg'
import sphere3Src from '../assets/images/sphere-3.svg'

// Cone slots: replace these three imports with the final cone assets.
import conePlaceholder1Src from '../assets/images/sphere-1.svg'
import conePlaceholder2Src from '../assets/images/sphere-2.svg'
import conePlaceholder3Src from '../assets/images/sphere-3.svg'

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
   * Tailwind absolute-positioning classes applied on md+.
   * Expressed as percentages of section width (1440px) and height (904px).
   * The containing element is absolute inset-0 within the section.
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
     *   percentages: left=1127/1440=78.3%, top=552/904=61.1%
     *   size: 330x330
     */
    id: 'sphere-1',
    src: sphere1Src,
    width: 330,
    height: 330,
    isPlaceholder: true,
    type: 'sphere',
    desktopClasses: 'left-[78%] top-[61%]',
    positionKnown: true,
  },
  {
    /*
     * Frame #46:90 — template element; exact position not available at Figma depth 4.
     * Original estimate (right-[5%] top-[3%]) caused sphere left edge to overlap
     * the final letter of "Hundreds" at 1280px–1366px viewport widths.
     *
     * Repositioned to right-0 top-[22%]:
     *   left edge = viewport_width - 280px
     *   At 1280px: left=1000px, heading ends at ~975px → 25px horizontal gap
     *   At 1366px: left=1086px, heading ends at ~1018px → 68px gap
     *   At 1440px: left=1160px, heading ends at ~1055px → 105px gap
     *   top-[22%] of section (960px) = 211px, just below heading bottom (~222px)
     *
     * Recorded as deviation: sphere-2 position unknown, placed in non-content
     * upper-right area to avoid heading overlap at all specified widths.
     */
    id: 'sphere-2',
    src: sphere2Src,
    width: 280,
    height: 280,
    isPlaceholder: true,
    type: 'sphere',
    desktopClasses: 'right-0 top-[22%]',
    positionKnown: false,
  },
  {
    /*
     * Frame #46:95 within group:
     *   group offset: x=-118, y=221
     *   frame offset within group: x=301, y=256
     *   absolute in Hero_Frame: x=183, y=477
     *   in section (y - 120): y=357
     *   percentages: left=183/1440=12.7%, top=357/904=39.5%
     *   size: 175x175
     */
    id: 'sphere-3',
    src: sphere3Src,
    width: 175,
    height: 175,
    isPlaceholder: true,
    type: 'sphere',
    desktopClasses: 'left-[13%] top-[39%]',
    positionKnown: true,
  },
  {
    /*
     * Cone #46:105 within group:
     *   group offset: x=-118, y=221
     *   frame offset within group: x=136, y=461
     *   absolute in Hero_Frame: x=18, y=682
     *   in section (y - 120): y=562
     *   percentages: left=18/1440=1.25%, top=562/904=62.2%
     *   size: 342x342
     * PLACEHOLDER: replace conePlaceholder1Src with final cone asset.
     */
    id: 'cone-1',
    src: conePlaceholder1Src,
    width: 342,
    height: 342,
    isPlaceholder: true,
    type: 'cone',
    desktopClasses: 'left-[1%] top-[62%]',
    positionKnown: true,
  },
  {
    /*
     * Cone #46:110 within group:
     *   group offset: x=-118, y=221
     *   frame offset within group: x=1349, y=0
     *   absolute in Hero_Frame: x=1231, y=221
     *   in section (y - 120): y=101
     *   percentages: left=1231/1440=85.5%, top=101/904=11.2%
     *   size: 370x370
     * PLACEHOLDER: replace conePlaceholder2Src with final cone asset.
     */
    id: 'cone-2',
    src: conePlaceholder2Src,
    width: 370,
    height: 370,
    isPlaceholder: true,
    type: 'cone',
    desktopClasses: 'left-[85%] top-[11%]',
    positionKnown: true,
  },
  {
    /*
     * Cone #46:80 within group:
     *   group offset: x=-118, y=221
     *   frame offset within group: x=1224, y=243
     *   absolute in Hero_Frame: x=1106, y=464
     *   in section (y - 120): y=344
     *   percentages: left=1106/1440=76.8%, top=344/904=38.1%
     *   size: 188x188
     * PLACEHOLDER: replace conePlaceholder3Src with final cone asset.
     */
    id: 'cone-3',
    src: conePlaceholder3Src,
    width: 188,
    height: 188,
    isPlaceholder: true,
    type: 'cone',
    desktopClasses: 'left-[77%] top-[38%]',
    positionKnown: true,
  },
]
