import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

interface ImageResponse {
  images: string[];
  error?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageResponse>
) {
  const imagesDirectory = path.join(
    process.cwd(),
    'public/assets/images/album'
  );

  try {
    const files = fs.readdirSync(imagesDirectory);
    const images = files
      .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file)) // 过滤图片文件
      .map((file) => `/assets/images/album/${file}`); // 构造路径

    res.status(200).json({ images });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('读取图片错误:', error);
    res.status(500).json({ images: [], error: '读取图片失败' });
  }
}
