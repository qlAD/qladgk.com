import clsx from 'clsx';
import { m } from 'framer-motion';

const animation = {
  hide: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.2, duration: 0.6, ease: 'easeInOut' },
      opacity: { delay: i * 0.2, duration: 0.4 },
    },
  }),
};

function ArtGeometry() {
  return (
    <m.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      fill="none"
      initial="hide"
      animate="show"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(
        'stroke-accent-500 -mt-20 h-full opacity-60',
        'dark:opacity-40'
      )}
    >
      <m.circle cx="80" cy="80" r="30" variants={animation} custom={1} />

      <m.path
        d="M 150 300 A 50 50 0 0 1 250 300"
        variants={animation}
        custom={2}
      />

      <m.rect
        x="280"
        y="50"
        width="60"
        height="20"
        rx="5"
        variants={animation}
        custom={3}
      />

      <m.circle cx="300" cy="300" r="30" variants={animation} custom={4} />

      <m.line
        x1="110"
        y1="110"
        x2="200"
        y2="200"
        variants={animation}
        custom={5}
      />

      <m.line
        x1="200"
        y1="200"
        x2="300"
        y2="70"
        variants={animation}
        custom={6}
      />

      <m.line
        x1="200"
        y1="200"
        x2="300"
        y2="300"
        variants={animation}
        custom={7}
      />
    </m.svg>
  );
}

export default ArtGeometry;
