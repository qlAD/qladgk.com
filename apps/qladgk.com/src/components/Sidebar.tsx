import clsx from 'clsx';
import { m } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RecentArticle {
  title: string;
  url: string;
}

interface IArticle {
  title: string;
  slug: string;
}

function Sidebar() {
  const imageUrl = 'https://oss.qladgk.com/images/gongzhonghao.png';
  const [recentArticles, setRecentArticles] = useState<RecentArticle[]>([]);

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
        // eslint-disable-next-line no-console
        console.error('Error fetching recent articles:', error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <aside
      aria-label="Sidebar with fixed image and recent articles"
      className={clsx(
        'border-divider-light rounded-xl border bg-white',
        'dark:border-divider-dark dark:bg-[#161e31]',
        'p-5'
      )}
    >
      <div className="mb-5 flex items-center justify-center">
        <m.img
          src={imageUrl}
          alt="Sidebar Image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg"
        />
      </div>

      <div>
        <ul className="space-y-2">
          {recentArticles.map((article) => (
            <li key={article.url}>
              <a
                href={article.url}
                className={clsx(
                  'text-accent-700 dark:text-accent-400 group inline-flex items-center ',
                  'truncate'
                )}
                title={article.title}
              >
                <span
                  className={clsx(
                    'bg-accent-100 text-accent-900 group-hover:bg-accent-900 group-hover:text-accent-100 flex h-5 items-center rounded-md px-1.5 text-[10px] font-black',
                    'dark:bg-accent-800 dark:text-accent-100 dark:group-hover:bg-accent-100 dark:group-hover:text-accent-800'
                  )}
                >
                  新文章 &nbsp; 🔥
                </span>
                <span className="ml-2 hover:underline">{article.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
