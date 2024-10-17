import clsx from 'clsx';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useMemo, useState } from 'react';

import useContentMeta from '@/hooks/useContentMeta';

import { getPostsByCategory, getSortedPosts } from '@/lib/posts';

import PostPreview from '@/contents/blog/PostPreview';
import Page from '@/contents-layouts/Page';

import type { TPostFrontMatter } from '@/types';

const POSTS_PER_PAGE = 5;

type CategoryPageProps = {
  category: string;
  posts: Array<{
    slug: string;
    frontMatter: TPostFrontMatter;
  }>;
};

export default function CategoryPage({ category, posts }: CategoryPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useContentMeta();
  const enhancedPosts = useMemo(
    () =>
      posts.map(({ slug, frontMatter }) => {
        const { views = 0, shares = 0 } = data[slug]?.meta || {};
        return { slug, views, shares, frontMatter };
      }),
    [posts, data]
  );

  const totalPages = Math.ceil(enhancedPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = enhancedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const renderPageButtons = () => {
    const buttons = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        buttons.push(
          <button
            type="button"
            key={i}
            style={{
              padding: '0 15px',
              backgroundColor: i === currentPage ? '#3B82F6' : '#E5E7EB',
              color: i === currentPage ? 'white' : 'black',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onClick={() => setCurrentPage(i)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#D1D5DB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                i === currentPage ? '#3B82F6' : '#E5E7EB';
            }}
          >
            {i}
          </button>
        );
      } else if (
        buttons[buttons.length - 1]?.key !== '...' &&
        (i === 2 ||
          i === totalPages - 1 ||
          i === currentPage - 2 ||
          i === currentPage + 2)
      ) {
        buttons.push(<span key="...">...</span>);
      }
    }
    return buttons;
  };

  return (
    <Page
      frontMatter={{
        title: `分类：${category}`,
        description: `所有与 "${category}" 有关的文章如下`,
        caption: 'Category',
      }}
    >
      <div className={clsx('content-wrapper')}>
        <div
          className={clsx(
            'flex flex-col gap-8',
            'md:flex-row md:gap-8 lg:gap-24'
          )}
        >
          <div className={clsx('flex-1')}>
            {currentPosts.map(({ slug, frontMatter, views, shares }) => (
              <div
                key={slug}
                className={clsx(
                  'mb-8 flex items-start gap-4',
                  'md:mb-4 md:gap-6'
                )}
              >
                <div
                  className={clsx(
                    'border-divider-light mt-14 hidden w-8 -translate-y-1 border-b',
                    'md:mt-16 md:w-20 lg:block',
                    'dark:border-divider-dark'
                  )}
                />
                <div className={clsx('flex-1')}>
                  <PostPreview
                    slug={slug}
                    category={frontMatter.category}
                    title={frontMatter.title}
                    description={frontMatter.description}
                    date={frontMatter.date}
                    lang={frontMatter.lang}
                    tags={frontMatter.tags}
                    views={views}
                    shares={shares}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="flex justify-center space-x-2">
            <button
              type="button"
              className={clsx('btn rounded-md px-4 py-2', {
                'cursor-not-allowed opacity-50': currentPage === 1,
              })}
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
            >
              上一页
            </button>

            {renderPageButtons()}

            <button
              type="button"
              className={clsx('btn rounded-md px-4 py-2', {
                'cursor-not-allowed opacity-50': currentPage === totalPages,
              })}
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              下一页
            </button>
          </div>
          <div className="mt-2 text-sm">
            {`第 ${currentPage} 页，共 ${totalPages} 页`}
          </div>
        </div>
      </div>
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getSortedPosts();
  const categoriesArray = Array.from(
    new Set(posts.map((p) => p.frontMatter.category))
  );
  const paths = categoriesArray.map((category) => ({ params: { category } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getPostsByCategory(params.category as string);
  return { props: { category: params.category, posts } };
};
