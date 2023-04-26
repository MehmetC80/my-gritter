import React, { useCallback, useMemo } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import { formatDistance, formatDistanceToNowStrict } from 'date-fns';
import Avatar from '../Avatar';
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
  const router = useRouter();
  const loginModel = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  //goto user methode
  const gotoUser = useCallback(
    (event: any) => {
      // is UseFull if we have a clickable innerChild to stop the event popagation the parent container
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  //goto post methode

  const gotoPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: any) => {
      // is UseFull if we have a clickable innerChild to stop the event popagation the parent container
      event.stopPropagation();

      loginModel.onOpen();
    },
    [loginModel]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      onClick={gotoPost}
      className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'
    >
      <div className='flex flex-row items-start gap-3'>
        <Avatar userId={data?.user.id} />
      </div>
      <div className='flex flex-row items-center gap-2'>
        <p
          onClick={gotoUser}
          className='font-semibold text-white cursor-pointer hover:underline'
        >
          {data.user.name}
        </p>
        <span
          onClick={gotoUser}
          className='text-neutral-500 cursor-pointer hover:underline hidden md:block'
        >
          @{data.user.username}
        </span>
        <span className='text-neutral-500 text-sm '>{createdAt}</span>
      </div>
      <div className='text-md mt-1'>{data.body}</div>
      <div className='flex flex-row items-center mt-3 gap-10'>
        <div className='flex flex-orw items-center text-neutral-500 gap-2 transition hover:text-sky-500 cursor-pointer'>
          <AiOutlineMessage size={24} />
          <p>{data.coments?.length || 0}</p>
        </div>
        <div
          onClick={onLike}
          className='flex flex-orw items-center text-neutral-500 gap-2 transition hover:text-red-800 cursor-pointer'
        >
          <AiOutlineHeart size={24} />
          <p>{data.coments?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
