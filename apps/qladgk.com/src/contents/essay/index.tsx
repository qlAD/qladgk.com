import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';

import 'react-medium-image-zoom/dist/styles.css'; // 引入样式

function EssayContents() {
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/assets/data/essays.json');
        if (!response.ok) throw new Error('网络错误');
        const data = await response.json();
        setEssays(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>加载中...</p>;
  if (error) return <p>出错了: {error}</p>;

  return (
    <div className={clsx('content-wrapper mdx-contents')}>
      {essays.map((essay, index) => (
        <div key={index} className="essay">
          <div className="header">
            <div className="avatar-wrapper">
              {' '}
              {/* 使用容器包裹头像 */}
              <Image
                src={essay.avatar_url}
                alt={`${essay.username} 的头像`}
                width={50}
                height={50}
                className="avatar" // 添加类名
              />
            </div>
            <div>
              <h2>{essay.username}</h2>
              <p>{essay.time}</p>
            </div>
          </div>
          <p className="content">{essay.content}</p>

          {essay.images && (
            <div className="images-container">
              {(Array.isArray(essay.images)
                ? essay.images
                : [essay.images]
              ).map((img, imgIndex) => (
                <Zoom key={imgIndex}>
                  {essay.images.length > 1 ? ( // 判断图片数量
                    <div className="image-wrapper">
                      <Image
                        src={img}
                        alt={`图片 ${imgIndex + 1}`}
                        layout="fill" // 使图片填充父元素
                        objectFit="cover" // 裁剪以适应正方形
                        className="zoomable-image"
                      />
                    </div>
                  ) : (
                    <Image
                      src={img}
                      alt={`图片 ${imgIndex + 1}`}
                      width={200} // 单张图片时宽度为200
                      height={100} // 高度可以设定为100或其他
                      className="zoomable-image"
                    />
                  )}
                </Zoom>
              ))}
            </div>
          )}
        </div>
      ))}
      <style jsx>{`
        .content-wrapper {
          padding: 20px;
        }
        .essay {
          margin-bottom: 30px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .content {
          margin: 10px 0;
        }
        .images-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }
        .image-wrapper {
          width: 100px;
          height: 100px;
          position: relative;
          overflow: hidden;
        }
        .zoomable-image {
          position: absolute;
          top: 0;
          left: 0;
        }
        .avatar-wrapper {
          border-radius: 10px;
          overflow: hidden;
          width: 50px;
          height: 50px;
          position: relative;
        }
      `}</style>
    </div>
  );
}

export default EssayContents;
