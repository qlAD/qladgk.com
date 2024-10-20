import { Fancybox } from '@fancyapps/ui';
import clsx from 'clsx';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

import type { ImageProps as NextImageProps } from 'next/image';

import '@fancyapps/ui/dist/fancybox/fancybox.css';

export type ImageProps = NextImageProps & {
  immersive?: boolean;
  isArticleImage?: boolean;
};

export default function Image({
  immersive = true,
  className,
  src,
  alt,
  width,
  height,
  isArticleImage = false,
  onClick,
  style,
}: ImageProps) {
  const [image, setImage] = useState<string>('');
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);

  const handleClick = () => {
    Fancybox.show(
      images.map(({ src: imageSrc, alt: imageAlt }) => ({
        src: imageSrc,
        alt: imageAlt,
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

  useEffect(() => {
    if (isArticleImage) {
      const allImages = document.querySelectorAll(
        'img[data-article-image="true"]'
      );
      const imageArray = Array.from(allImages).map((img) => {
        const imageElement = img as HTMLImageElement;
        return {
          src: imageElement.src,
          alt: imageElement.alt || 'Image',
        };
      });
      setImages(imageArray);
    }
  }, [isArticleImage]);

  return (
    <div className={clsx('mdx-image relative mx-auto')}>
      {immersive && image ? (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={clsx(
            'absolute -inset-8 z-[-1] rounded-[20%] bg-[length:180%_180%] bg-center opacity-25 blur-2xl',
            'hidden', // disable immersive on light mode
            'dark:block'
          )}
        />
      ) : null}
      <NextImage
        src={src}
        alt={alt}
        className={clsx(
          'border-divider-light cursor-pointer rounded-lg border',
          'dark:border-divider-dark',
          className
        )}
        width={width}
        height={height}
        onClick={onClick || handleClick}
        onLoadingComplete={(img) => {
          setImage(img.currentSrc);
        }}
        data-article-image={isArticleImage ? 'true' : 'false'}
        style={style}
      />
    </div>
  );
}
