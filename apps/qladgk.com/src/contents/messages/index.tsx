import clsx from 'clsx';

import TwikooComments from '@/components/TwikooComments';

function MessagesContents() {
  return (
    <div className={clsx('content-wrapper mdx-contents')}>
      <TwikooComments />
    </div>
  );
}

export default MessagesContents;
