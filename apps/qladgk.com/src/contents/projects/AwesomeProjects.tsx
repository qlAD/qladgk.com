import Image from 'next/image';

import Marquee from '@/components/magicui/Marquee';

import { cn } from '@/lib/utils';

const projects = [
  {
    name: 'TheAlgorithms',
    username: '@TheAlgorithms/Python',
    body: '多语言算法库',
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'awesome-remote-job',
    username: '@lukasz-madon/awesome-remote-job',
    body: '远程工作指南',
    img: 'https://avatar.vercel.sh/jill',
  },
  {
    name: 'shardeum',
    username: '@shardeum/shardeum',
    body: '自动扩展区块链',
    img: 'https://avatar.vercel.sh/john',
  },
  {
    name: 'Huly platform',
    username: '@hcengineering/platform',
    body: '一体化项目管理平台',
    img: 'https://avatar.vercel.sh/jane',
  },
  {
    name: 'manim',
    username: '@ManimCommunity/manim',
    body: '数学动画引擎',
    img: 'https://avatar.vercel.sh/jenny',
  },
];

const firstRow = projects.slice(0, projects.length / 2);
const secondRow = projects.slice(projects.length / 2);

function ProjectCard({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) {
  return (
    <figure
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
}

export default function MarqueeDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((project) => (
          <ProjectCard
            key={project.username}
            img={project.img}
            name={project.name}
            username={project.username}
            body={project.body}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((project) => (
          <ProjectCard
            key={project.username}
            img={project.img}
            name={project.name}
            username={project.username}
            body={project.body}
          />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((project) => (
          <ProjectCard
            key={project.username}
            img={project.img}
            name={project.name}
            username={project.username}
            body={project.body}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-[#0f172a]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-[#0f172a]" />
    </div>
  );
}
