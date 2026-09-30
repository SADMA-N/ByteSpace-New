/**
 * AvatarStack
 *
 * Used on the Home page:
 *   sm 32px / dark overflow — course card "26+"
 *   md 43px / lime overflow — hero "Happy Students 2K+"
 *
 * Negative margin overlap is applied from the second item onward in JS,
 * since Tailwind's sibling-selector utilities cannot target non-first children
 * without a custom plugin.
 *
 * Accessibility: role="img" with aria-label describing the number of people.
 */

export interface AvatarStackProps {
  avatars: string[]
  maxShown?: number
  overflowLabel?: string
  size?: 'sm' | 'md'
  overflowBg?: 'dark' | 'lime'
  className?: string
}

const sizeConfig = {
  sm: {
    img:      'w-8 h-8',      /* 32px */
    overflow: 'w-8 h-8 text-label-xs',
    overlap:  '-ml-2',        /* -8px */
  },
  md: {
    img:      'w-[43px] h-[43px]',
    overflow: 'w-[43px] h-[43px] text-label-xs',
    overlap:  '-ml-4',        /* -16px */
  },
}

const overflowBgClasses = {
  dark: 'bg-shuttle-950 text-white',
  lime: 'bg-lime-400 text-shuttle-950',
}

const AvatarStack = ({
  avatars,
  maxShown = 4,
  overflowLabel,
  size = 'sm',
  overflowBg = 'dark',
  className = '',
}: AvatarStackProps) => {
  const visible = avatars.slice(0, maxShown)
  const cfg = sizeConfig[size]
  const totalDescription = overflowLabel ? `${maxShown}+ people` : `${visible.length} people`

  return (
    <div
      className={['inline-flex items-center', className].filter(Boolean).join(' ')}
      role="img"
      aria-label={totalDescription}
    >
      {visible.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={[
            'rounded-full border-2 border-white object-cover shrink-0',
            cfg.img,
            i > 0 ? cfg.overlap : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      ))}
      {overflowLabel !== undefined && (
        <span
          className={[
            'inline-flex items-center justify-center',
            'rounded-full border-2 border-white',
            'font-body font-medium shrink-0',
            cfg.overflow,
            cfg.overlap,
            overflowBgClasses[overflowBg],
          ].join(' ')}
          aria-hidden="true"
        >
          {overflowLabel}
        </span>
      )}
    </div>
  )
}

export default AvatarStack
