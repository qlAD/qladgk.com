import clsx from 'clsx';
import { useState } from 'react';

import useContentMeta from '@/hooks/useContentMeta';

import PostPreview from '@/contents/blog/PostPreview';

import type { TPostFrontMatter } from '@/types';

const PINNED_POST = 'the-2024-retrospective';
const POSTS_PER_PAGE = 10;

export type BlogContentsProps = {
  posts: Array<{
    slug: string;
    frontMatter: TPostFrontMatter;
  }>;
};

type TPostPreview = TPostFrontMatter & {
  slug: string;
  shares: number;
  views: number;
};

function BlogContents({ posts }: BlogContentsProps) {
  const { data } = useContentMeta();
  const [currentPage, setCurrentPage] = useState(1);

  let pinnedPost: TPostPreview;
  const postsPreview: Array<TPostPreview> = [];

  posts.forEach(({ slug, frontMatter }) => {
    const { shares, views } = data[slug]
      ? data[slug].meta
      : { shares: 0, views: 0 };
    const preview: TPostPreview = { slug, views, shares, ...frontMatter };

    if (slug === PINNED_POST) {
      pinnedPost = preview;
    } else {
      postsPreview.push(preview);
    }
  });

  const totalPages = Math.ceil(postsPreview.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = postsPreview.slice(startIndex, endIndex);

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
    <div className={clsx('content-wrapper')}>
      <div
        className={clsx(
          'flex flex-col gap-8',
          'md:flex-row md:gap-8 lg:gap-24'
        )}
      >
        <div className={clsx('md:w-64')}>{/* TODO: Filter Posts */}</div>
        <div className={clsx('flex-1')}>
          {pinnedPost && (
            <div
              className={clsx(
                'mb-8 flex items-start gap-4',
                'md:mb-12 md:gap-6'
              )}
            >
              <div className={clsx('flex-1')}>
                <PostPreview
                  pinned
                  slug={pinnedPost.slug}
                  category={pinnedPost.category}
                  title={pinnedPost.title}
                  description={pinnedPost.description}
                  date={pinnedPost.date}
                  lang={pinnedPost.lang}
                  tags={pinnedPost.tags}
                  views={pinnedPost.views}
                  shares={pinnedPost.shares}
                />
              </div>
            </div>
          )}

          {currentPosts.map(
            ({
              slug,
              category,
              title,
              description,
              date,
              lang,
              tags,
              views,
              shares,
            }) => (
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
                    category={category}
                    title={title}
                    description={description}
                    date={date}
                    lang={lang}
                    tags={tags}
                    views={views}
                    shares={shares}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="flex justify-center space-x-2">
          <button
            type="button" // Add type attribute
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
            type="button" // Add type attribute
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
  );
}

export default BlogContents;
