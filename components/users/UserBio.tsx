import React, { useMemo } from 'react';
import { format } from 'date-fns';

import useUser from '@/hooks/useUser';

import useCurrentUser from '@/hooks/useCurrentUser';

import Button from '../ui/Button';
import { BiCalendar } from 'react-icons/bi';
import useEditUserModal from '@/hooks/useEditUser.Modal';

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editUserModal = useEditUserModal();

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt]);

  return (
    <div className='border-b-[1px] border-neutral-700 pb-4'>
      <div className=' flex justify-end  p-2'>
        {currentUser?.id === userId ? (
          <Button secondary label='Edit' onClick={editUserModal.onOpen} />
        ) : (
          <Button label='Follow' onClick={() => {}} secondary />
        )}
      </div>
      <div className='mt-8 px-4 '>
        <div className='flex flex-col'>
          <p className='text-white text-2xl font-semibold'>
            {fetchedUser.name}
          </p>
          <p className='text-md text-neutral-500'>@{fetchedUser?.username}</p>
        </div>
        <div className='flex flex-col mt-4'>
          <p className='text-white'>{fetchedUser?.bio}</p>
          <div className='flex flex-row items-center gap-2 mt-4 text-neutral-500'>
            <BiCalendar size={24} />
            <p className=''>Joinded {createdAt}</p>
          </div>
        </div>
        <div className='flex flex-row items-center mt-4 gap-6'>
          <div className='flex flex-row  items-center gap-2'>
            <p>{fetchedUser?.followingIds?.length} </p>
            <p className='text-neutral-500 '>Following</p>
          </div>
          <div className='flex flex-row  items-center gap-2'>
            <p>{fetchedUser?.followersCount || 0} </p>
            <p className='text-neutral-500 '>Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserBio;
