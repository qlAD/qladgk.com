import clsx from 'clsx';
import Image from 'next/image';

import BlurFade from '@/components/magicui/BlurFade';

const images = Array.from({ length: 20 }, (_, i) => {
  const isLandscape = i % 2 === 0;
  const width = isLandscape ? 800 : 600;
  const height = isLandscape ? 600 : 800;
  return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
});

function BlurFadeDemo() {
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
              alt={`Random stock image ${idx + 1}`}
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
