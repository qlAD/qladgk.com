import clsx from 'clsx';
import Link from 'next/link';

import { BilibiliIcon, ExternalLink, GitHubIcon } from '@/components/Icons';

import dayjs from '@/utils/dayjs';

function LastUpdate() {
  return (
    <div>
      <a
        href="https://github.com/enjidev/enji.dev"
        target="_blank"
        rel="noreferrer nofollow"
        className={clsx('hover:underline')}
      >
        <span>查看原仓库</span>
      </a>
      <br />
      <a
        href="https://github.com/qlad/qladgk.com/commits"
        target="_blank"
        rel="noreferrer nofollow"
        className={clsx('hover:underline')}
      >
        <span>查看 GitHub 更新</span>
      </a>
      <br />
      <a
        href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans"
        target="_blank"
        rel="noreferrer nofollow"
        className={clsx('hover:underline')}
      >
        <span>CC BY-NC-ND</span>
      </a>
    </div>
  );
}

interface FooterLinkProps {
  title: string;
  href: string;
  label?: 'new' | 'soon';
  isInternal?: boolean;
}

function FooterLink({
  title,
  href,
  label = undefined,
  isInternal = true,
}: FooterLinkProps) {
  if (label === 'soon') {
    return (
      <span className={clsx('footer-link footer-link--soon')}>
        {title}
        <span className={clsx('footer-link__label')}>{label}</span>
      </span>
    );
  }

  if (isInternal) {
    return (
      <Link href={href} className={clsx('footer-link')}>
        {title}
        {label && <span className={clsx('footer-link__label')}>{label}</span>}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer nofollow"
      className={clsx('footer-link')}
    >
      {title}
      <ExternalLink className={clsx('h-3.5 w-3.5')} />
      {label && <span className={clsx('footer-link__label')}>{label}</span>}
    </a>
  );
}

interface FooterGroupProps {
  title: string;
  links: Array<FooterLinkProps>;
}

function FooterGroup({ title, links }: FooterGroupProps) {
  return (
    <div className={clsx('flex-1')}>
      <div
        className={clsx(
          'mb-2 px-2 text-[13px] text-slate-600',
          'dark:text-slate-400'
        )}
      >
        {title}
      </div>
      <ul className={clsx('flex flex-col')}>
        {links.map(({ title: linkTitle, href, label, isInternal }) => (
          <li key={href}>
            <FooterLink
              title={linkTitle}
              href={href}
              label={label}
              isInternal={isInternal}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterDescription() {
  return (
    <div className={clsx('max-w-[348px]')}>
      <div
        className={clsx(
          'mb-3 text-[13px] text-slate-600',
          'dark:text-slate-400'
        )}
      >
        关于我
      </div>
      <p className={clsx('mb-4 font-normal leading-relaxed')}>
        我是 qlAD, 一名小小的 <strong>计算机爱好者</strong>{' '}
        ，致力于探索能改变世界的代码。
      </p>
      <ul className={clsx('-ml-2 flex gap-1')}>
        <li>
          <a
            href="https://github.com/qlAD"
            target="_blank"
            rel="noreferrer nofollow"
            className={clsx('flex h-9 w-9 items-center justify-center')}
            aria-label="My GitHub profile"
            title="My GitHub profile"
          >
            <GitHubIcon className={clsx('h-5 w-5')} />
          </a>
        </li>
        <li>
          <a
            href="https://space.bilibili.com/505243833"
            target="_blank"
            rel="noreferrer nofollow"
            className={clsx('flex h-9 w-9 items-center justify-center')}
            aria-label="My Bilibili profile"
            title="My Bilibili profile"
          >
            <BilibiliIcon className={clsx('h-5 w-5')} />
          </a>
        </li>
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer
      className={clsx(
        'background-grid background-grid--fade-in border-divider-light mt-24 pt-16 text-sm text-slate-900',
        'dark:border-divider-dark dark:text-slate-200'
      )}
    >
      <div className={clsx('content-wrapper')}>
        <div className={clsx('py-10 font-semibold')}>
          <div className={clsx('flex flex-col-reverse gap-16', 'lg:flex-row')}>
            <div className={clsx('flex-1')}>
              <FooterDescription />
            </div>
            <div
              className={clsx(
                '-mx-2 flex flex-1 flex-col gap-8',
                'sm:flex-row sm:gap-16 lg:mx-0'
              )}
            >
              <div className={clsx('flex', 'sm:gap-16')}>
                <FooterGroup
                  title="导航"
                  links={[
                    { title: '博客', href: '/blog' },
                    { title: '日记', href: '/today-i-learned' },
                    { title: '在线工具', href: '/tlink' },
                  ]}
                />
                <FooterGroup
                  title="我的"
                  links={[
                    { title: '回忆录', href: '/essay', label: 'new' },
                    { title: '相册集', href: '/album', label: 'new' },
                    { title: '书影音', href: '/media', label: 'new' },
                  ]}
                />
                <FooterGroup
                  title="更多"
                  links={[
                    { title: '宝藏项目', href: '/projects' },
                    { title: '友情链接', href: '/links', label: 'new' },
                    { title: '留言反馈', href: '/message-board' },
                  ]}
                />
              </div>
              <div className={clsx('flex', 'sm:gap-16')}>
                <FooterGroup
                  title="协议"
                  links={[
                    {
                      title: '版权信息',
                      href: '/copyright',
                    },
                    {
                      title: '隐私政策',
                      href: '/privacy-policy',
                    },
                    {
                      title: 'Cookies',
                      href: '/cookies',
                    },
                  ]}
                />
                <FooterGroup
                  title="服务"
                  links={[
                    {
                      title: '十年之约',
                      href: 'https://foreverblog.cn/go.html',
                      isInternal: false,
                    },
                    {
                      title: '开往',
                      href: 'https://www.travellings.cn/go.html',
                      isInternal: false,
                    },
                    {
                      title: 'Status',
                      href: 'https://stats.uptimerobot.com/koN8GN5WwV',
                      isInternal: false,
                    },
                  ]}
                />
                <FooterGroup
                  title="此网站"
                  links={[
                    {
                      title: '源代码',
                      href: 'https://github.com/enjidev/enji.dev',
                      isInternal: false,
                    },
                    {
                      title: '致谢',
                      href: '/credits',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            'border-divider-light flex justify-between border-t py-6 text-xs',
            'dark:border-divider-dark'
          )}
        >
          <div className={clsx('font-semibold')}>
            &copy; 2020 - {dayjs().format('YYYY')}, qlADgk.com 版权所有
            <div>
              <span>
                ICP 备案号:{' '}
                <a
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  陕ICP备2024050194号
                </a>
              </span>
              <br />
              <span>
                公安备案号:{' '}
                <a
                  href="http://www.mps.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  陕公网安备号
                </a>
              </span>
            </div>
          </div>
          <div className={clsx('text-slate-500', 'dark:text-slate-400')}>
            <LastUpdate />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
