import MessagesContents from '@/contents/messages';
import HeaderImage from '@/contents/messages/HeaderImage';
import Page from '@/contents-layouts/Page';

function Messages() {
  return (
    <Page
      frontMatter={{
        title: '留言反馈',
        description: '欢迎在留言板上分享您的意见或建议',
        caption: 'More',
      }}
      headerImage={<HeaderImage />}
    >
      <MessagesContents />
    </Page>
  );
}

export default Messages;
