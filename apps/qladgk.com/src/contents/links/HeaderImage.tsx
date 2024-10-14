import clsx from 'clsx';
import { m } from 'framer-motion';

const animation = {
  hide: { pathLength: 0.2 },
  show: (i) => {
    const delay = 0.2 + i * 0.1;
    return {
      pathLength: 1,
      transition: {
        pathLength: { delay, duration: 0.8 },
      },
    };
  },
};

function Projects() {
  return (
    <m.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 631 620"
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
      <m.rect
        x="100"
        y="50"
        width="150"
        height="300"
        rx="20"
        fill="none"
        variants={animation}
        custom={1}
      />

      <m.line
        x1="300"
        y1="50"
        x2="300"
        y2="350"
        variants={animation}
        custom={2}
      />

      <m.circle
        cx="450"
        cy="200"
        r="100"
        fill="none"
        variants={animation}
        custom={3}
      />

      <m.ellipse
        cx="450"
        cy="500"
        rx="100"
        ry="50"
        fill="none"
        variants={animation}
        custom={4}
      />
    </m.svg>
  );
}

export default Projects;
