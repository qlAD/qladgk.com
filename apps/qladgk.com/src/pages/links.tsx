import LinksContents from '@/contents/links';
import HeaderImage from '@/contents/links/HeaderImage';
import Page from '@/contents-layouts/Page';

function Links() {
  return (
    <Page
      frontMatter={{
        title: '友情链接',
        description: '与数位博主共同进步。',
        caption: 'More',
      }}
      headerImage={<HeaderImage />}
    >
      <LinksContents />
    </Page>
  );
}

export default Links;
