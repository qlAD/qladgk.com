import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import BlurFade from '@/components/magicui/BlurFade';

interface ImageResponse {
  images: string[];
  error?: string;
}

function BlurFadeDemo() {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) throw new Error('网络错误');

        const data: ImageResponse = await response.json();
        setImages(data.images);
      } catch (error: any) {
        console.error('获取图片失败:', error);
        setError(error.message);
      }
    };

    fetchImages();
  }, []);

  if (error) return <p>图片加载失败: {error}</p>;

  return (
    <section id="photos">
      <div className="columns-2 gap-4 sm:columns-3">
        {images.map((imageUrl, idx) => (
          <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
            <Image
              className="size-full mb-4 rounded-lg object-contain"
              src={imageUrl}
              width={800}
              height={600}
              alt={`Album image ${idx + 1}`}
            />
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
