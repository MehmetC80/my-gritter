import useUsers from '@/hooks/useUsers';
import Avatar from '../Avatar';

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  // check if users are not null
  if (users.length === 0) {
    return null;
  }

  return (
    <div className='px-6 py-4 hidden lg:block '>
      <div className='bg-neutral-800 rounded-xl p-4'>
        <h2 className='text-white text-xl font-semibold'>Who you follow</h2>
        <div className='flex flex-col gap-6 mt-4'>
          {users.map((user: Record<string, any>) => {
            return (
              <div className='flex flex-row gap-4' key={user.id}>
                <Avatar userId={user.id} />
                <div className=' flex felx-col gap-2 '>
                  <p className='text-white font-semibold text-sm'>
                    {user.name}
                  </p>
                  <p className='text-neutral-400  text-sm'>{user.username}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default FollowBar;
