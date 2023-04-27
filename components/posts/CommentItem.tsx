import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import Avatar from '../Avatar';

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const gotoUser = useCallback(
    (event: any) => {
      // is UseFull if we have a clickable innerChild to stop the event popagation the parent container
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
      // if (!currentUser) {
      //   return loginModel.onOpen();
      // }
    },
    [router, data.user.id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div className='border-b-[1px] p-5 cursor-pointer hover:bg-neutral-900 border-neutral-800 transition'>
      <div className='flex flex-row items-start gap-3 '>
        <Avatar userId={data.userId} />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p
              onClick={gotoUser}
              className='font-semibold cursor-pointer hover:underline'
            >
              {data.username}
            </p>
            <span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>
              @{data.username}
            </span>
            <span className='text-neutral-500 text-sm'>{createdAt}</span>
          </div>
          <div className='mt-1'>{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
