import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

import AvatarCircles from '@/components/magicui/AvatarCircles';
import TwikooComments from '@/components/TwikooComments';

import Disclaimer from './Disclaimer';
import Websites from './Websites';

function AvatarCirclesDemo() {
  return (
    <AvatarCircles
      numPeople={99}
      avatarUrls={Websites.slice(0, 10).map((site) => site.avatar)}
    />
  );
}

function GridList({
  category,
  items,
}: {
  category: string;
  items: typeof Websites;
}) {
  const [showPreviews, setShowPreviews] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleMouseEnter = (index: number) => {
    setShowPreviews((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setShowPreviews((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-bold">{`${category} (${items.length})`}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((site, index) => (
          <div
            key={site.name}
            className="relative"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
            >
              {category === '推荐' && (
                <Image
                  src={site.preview}
                  alt={`${site.name} preview`}
                  width={300}
                  height={150}
                  className="h-32 w-full object-cover"
                />
              )}
              <div className="flex items-center space-x-4 p-4">
                <Image
                  src={site.avatar}
                  alt={`${site.name} avatar`}
                  width={300}
                  height={150}
                  className="h-12 w-12 rounded-full border-2 border-white dark:border-gray-800"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {site.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {site.description}
                  </p>
                </div>
              </div>
            </a>

            {showPreviews[index] && category !== '推荐' && (
              <div
                className="absolute left-0 z-10 w-full transition-opacity duration-300"
                style={{ top: '100%' }}
              >
                <Image
                  src={site.preview}
                  alt={`${site.name} preview`}
                  width={300}
                  height={150}
                  className="h-32 w-full rounded-lg border object-cover shadow-md"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LinksContents() {
  const categories = ['推荐', '技术', '生活'];

  const groupedWebsites = categories.map((category) => ({
    category,
    items: Websites.filter((site) => site.category === category),
  }));

  return (
    <div className={clsx('content-wrapper mdx-contents')}>
      <AvatarCirclesDemo />

      {groupedWebsites.map((group) => (
        <GridList
          key={group.category}
          category={group.category}
          items={group.items}
        />
      ))}

      <h2 className="mt-12 text-xl font-bold">友链申请格式</h2>
      <div className="mt-4 rounded-lg border bg-gray-100 p-4 dark:bg-gray-700">
        <p>如果您希望与我交换友链，请使用以下格式申请：</p>
        <pre className="mt-4 rounded bg-gray-200 p-2 text-sm">
          <code>
            {JSON.stringify(
              {
                name: 'qlAD的技术笔记',
                url: 'https://www.qladgk.com',
                preview: 'https://',
                avatar: 'https://',
                description: '记录生活点滴。',
                category: '生活',
              },
              null,
              2
            )}
          </code>
        </pre>
        <p className="mt-4">
          发送申请至:{' '}
          <a href="mailto:your-email@example.com">qlad_adgk@163.com</a>{' '}
          或者在下方留言。
        </p>
      </div>

      <Disclaimer />

      <TwikooComments />
    </div>
  );
}

export default LinksContents;
