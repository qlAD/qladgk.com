import clsx from 'clsx';
import { m } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import Card from './Card'; // 导入公共组件

interface RecentArticle {
  title: string;
  url: string;
}

interface IArticle {
  title: string;
  slug: string;
}

interface SidebarProps {
  show: string[]; // 接收要显示的卡片名称
}

function Sidebar({ show }: SidebarProps) {
  const imageUrl = 'https://oss.qladgk.com/images/gongzhonghao.png';
  const [recentArticles, setRecentArticles] = useState<RecentArticle[]>([]);
  const [tagsWithCount, setTagsWithCount] = useState<Record<string, number>>(
    {}
  );
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [categoriesWithCount, setCategoriesWithCount] = useState<
    Record<string, number>
  >({});
  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);

  // 获取文章
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/content/latest');
        const data = await response.json();
        const articles = data.slice(0, 5).map((article: IArticle) => ({
          title: article.title,
          url: `/blog/${article.slug}`,
        }));
        setRecentArticles(articles);
      } catch (error) {
        // console.error('Error fetching recent articles:', error);
      }
    }

    fetchArticles();
  }, []);

  // 获取标签，并按数量降序排列
  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('/api/tags');
      const data = await response.json();
      const sortedTags = Object.entries(data).sort(
        ([, countA], [, countB]) => Number(countB) - Number(countA)
      );

      setTagsWithCount(data);
      setVisibleTags(sortedTags.slice(0, 25).map(([tag]) => tag));
    };

    fetchTags();
  }, []);

  // 点击按钮显示更多标签
  const handleShowMore = () => {
    setShowMore(true);
    const sortedTags = Object.entries(tagsWithCount).sort(
      ([, countA], [, countB]) => countB - countA
    );
    setVisibleTags(sortedTags.map(([tag]) => tag));
  };

  // 获取分类
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategoriesWithCount(data);
      setVisibleCategories(Object.keys(data));
    };

    fetchCategories();
  }, []);

  return (
    <aside
      aria-label="Sidebar with multiple sections"
      className={clsx('space-y-6')}
    >
      {/* 分类部分 */}
      {show.includes('categories') && (
        <Card title="分类">
          <div className="flex flex-wrap space-x-4">
            {visibleCategories.map((category) => (
              <span
                key={category}
                className="relative text-blue-500 hover:underline"
              >
                <a href={`/blog/category/${category}`}>{category}</a>
                <span className="ml-1 text-gray-400">
                  ({categoriesWithCount[category]})
                </span>
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* 标签部分 */}
      {show.includes('tags') && (
        <Card title="标签" className="hidden md:block">
          <div className="relative max-h-[100px] overflow-hidden">
            <div className="flex flex-wrap space-x-4">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="relative text-blue-500 hover:underline"
                >
                  <a href={`/blog/tag/${tag}`}>{tag}</a>
                  <sup className="absolute -top-0 -right-2 text-xs text-gray-400">
                    {tagsWithCount[tag]}
                  </sup>
                </span>
              ))}
            </div>

            {!showMore && Object.keys(tagsWithCount).length > 25 && (
              <div className="relative -mt-8 flex justify-center">
                <div className="pointer-events-none absolute bottom-5 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-white dark:to-[#161e31]" />
                <button
                  type="button"
                  onClick={handleShowMore}
                  className={clsx(
                    'z-10 w-full max-w-[90%] rounded-lg bg-slate-200 p-1.5 text-slate-800',
                    'hover:bg-slate-300 sm:ml-0',
                    'dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                  )}
                >
                  查看全部
                </button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 最新文章部分 */}
      {show.includes('recentArticles') && (
        <Card title="最新文章" className="hidden md:block">
          <ul className="space-y-2">
            {recentArticles.map((article) => (
              <li key={article.url}>
                <a
                  href={article.url}
                  className="group inline-flex items-center truncate"
                  title={article.title}
                >
                  <span className="bg-accent-100 text-accent-900 group-hover:bg-accent-900 group-hover:text-accent-100 dark:bg-accent-800 dark:text-accent-100 dark:group-hover:bg-accent-100 dark:group-hover:text-accent-800 flex h-5 items-center rounded-md px-1.5 text-[10px] font-black">
                    新文章 🔥
                  </span>
                  <span className="ml-2 max-w-[170px] overflow-hidden truncate text-ellipsis whitespace-nowrap hover:underline">
                    {article.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* 公众号部分 */}
      {show.includes('publicAccount') && (
        <Card title="公众号" className="hidden md:block">
          <div className="flex items-center justify-center">
            <m.img
              src={imageUrl}
              alt="Sidebar Image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg"
            />
          </div>
        </Card>
      )}
    </aside>
  );
}

export default Sidebar;
