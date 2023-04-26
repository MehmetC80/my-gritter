import useCurrentUser from './useCurrentUser';
import useUser from './useUser';
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    // check if we are logged in
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete('/api/follows', { data: { userId } });
      } else {
        request = () => axios.post('/api/follows', { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Success');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModal,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};
export default useFollow;
