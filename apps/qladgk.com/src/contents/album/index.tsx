import { Fancybox } from '@fancyapps/ui';
import clsx from 'clsx';
import Image from 'next/image';

import BlurFade from '@/components/magicui/BlurFade';

import externalImages from './ExternalImages';

import '@fancyapps/ui/dist/fancybox/fancybox.css';

function BlurFadeDemo() {
  const handleImageClick = (imageUrls) => {
    Fancybox.show(
      imageUrls.map((src) => ({
        src,
        opts: {
          caption: '相册图片',
        },
      })),
      {
        Toolbar: {
          display: {
            left: ['infobar'],
            middle: ['zoomIn', 'zoomOut'],
            right: ['download', 'close'],
          },
        },
      }
    );
  };

  const handleKeyDown = (event, imageUrls) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleImageClick(imageUrls);
    }
  };

  return (
    <section id="photos">
      <div className="columns-2 gap-4 sm:columns-3">
        {externalImages.map((imageUrl, idx) => (
          <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
            <div
              className="cursor-pointer"
              onClick={() => handleImageClick(externalImages)}
              onKeyDown={(event) => handleKeyDown(event, externalImages)}
              role="button"
              tabIndex={0}
              aria-label={`查看相册图片 ${idx + 1}`}
            >
              <Image
                className="size-full mb-4 rounded-lg object-contain"
                src={imageUrl}
                width={800}
                height={600}
                alt={`Album image ${idx + 1}`}
              />
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}

function AlbumContents() {
  return (
    <div className={clsx('content-wrapper mdx-contents')}>
      <BlurFadeDemo />
    </div>
  );
}

export default AlbumContents;
