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
      <m.circle cx="315" cy="310" r="100" variants={animation} custom={1} />

      <m.ellipse
        cx="315"
        cy="520"
        rx="150"
        ry="80"
        variants={animation}
        custom={2}
      />

      <m.polygon
        points="200,150 250,50 300,150"
        variants={animation}
        custom={3}
      />

      <m.polygon
        points="400,300 460,350 460,450 400,500 340,450 340,350"
        variants={animation}
        custom={4}
      />
    </m.svg>
  );
}

export default Projects;
