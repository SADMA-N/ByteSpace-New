/**
 * LogoIcon — ByteSpace vector mark as an inline SVG React component.
 *
 * Using inline SVG allows the fill color to be controlled via CSS
 * without an <img> src constraint. Default fill is Electric Lime (#D4FB20).
 */

interface LogoIconProps {
  /** Width in pixels. Height is calculated proportionally (default: 29). */
  width?: number
  /** Override the fill color. Defaults to Electric Lime. */
  color?: string
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

const LogoIcon = ({
  width = 29,
  color = '#D4FB20',
  className,
  'aria-hidden': ariaHidden,
}: LogoIconProps) => {
  const height = Math.round((width / 29) * 32)

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path
        d="M10.5455 10.5455C10.5455 4.72136 5.82409 0 0 0V21.0909C0 26.915 4.72136 31.6364 10.5455 31.6364V10.5455Z"
        fill={color}
      />
      <path
        d="M18.4545 10.5455C24.2786 10.5455 29 15.2668 29 21.0909H21.0909C15.2668 21.0909 10.5455 16.3696 10.5455 10.5455L18.4545 10.5455Z"
        fill={color}
      />
      <path
        d="M18.4545 31.6364C24.2786 31.6364 29 26.915 29 21.0909H21.0909C15.2668 21.0909 10.5455 25.8123 10.5455 31.6364L18.4545 31.6364Z"
        fill={color}
      />
    </svg>
  )
}

export default LogoIcon
