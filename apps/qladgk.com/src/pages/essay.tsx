import EssayContents from '@/contents/essay';
import HeaderImage from '@/contents/essay/HeaderImage';
import Page from '@/contents-layouts/Page';

function Essay() {
  return (
    <Page
      frontMatter={{
        title: '回忆录',
        description: 'QQ 空间以及朋友圈的回忆录',
        caption: 'My',
      }}
      headerImage={<HeaderImage />}
    >
      <EssayContents />
    </Page>
  );
}

export default Essay;
