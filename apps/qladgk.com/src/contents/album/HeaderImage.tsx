import clsx from 'clsx';
import { m } from 'framer-motion';

const animation = {
  hide: { pathLength: 0 },
  show: (i) => ({
    pathLength: 1,
    transition: {
      pathLength: { delay: i * 0.2, duration: 0.6 },
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
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx('stroke-accent-500 h-full opacity-80', 'dark:opacity-40')}
    >
      <m.circle cx="150" cy="160" r="40" variants={animation} custom={1} />

      <m.polygon
        points="250,100 200,200 300,200"
        variants={animation}
        custom={2}
      />

      <m.rect
        x="50"
        y="250"
        width="80"
        height="20"
        rx="10"
        variants={animation}
        custom={3}
      />

      <m.circle cx="250" cy="300" r="25" variants={animation} custom={4} />
    </m.svg>
  );
}

export default ArtGeometry;
