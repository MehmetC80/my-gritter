import { useCallback, useEffect, useState } from 'react';
import Input from '../ui/Input';
import Modal from '../Modal';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import useEditUserModal from '@/hooks/useEditUser.Modal';
import ImageUpload from '../ImageUpload';

const EditUserModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatedFetchedUser } = useUser(currentUser?.id);
  const editUserModal = useEditUserModal();

  const [profilImage, setProfilImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  // fill the fields from currentUser
  useEffect(() => {
    setProfilImage(currentUser?.profilImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.profilImage,
    currentUser?.coverImage,
    currentUser?.bio,
  ]);

  const [isloading, setIsloading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsloading(true);
      // update user

      // patch to edit route
      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        coverImage,
        profilImage,
      });

      // call user again so data are actual
      mutatedFetchedUser();

      //  succes toaster message
      toast.success('Updated user succesfully');

      editUserModal.onClose;
    } catch (err) {
      console.log(err);
      toast.error('Updated failed');
    } finally {
      setIsloading(false);
    }
  }, [
    editUserModal,
    coverImage,
    profilImage,
    bio,
    name,
    username,
    mutatedFetchedUser,
  ]);

  // body content
  const bodyContent = (
    <div className=' flex flex-col gap-4'>
      <ImageUpload
        value={profilImage}
        disabled={isloading}
        onChange={(image) => setProfilImage(image)}
        label='Upload profile image'
      />
      <ImageUpload
        value={coverImage}
        disabled={isloading}
        onChange={(image) => setCoverImage(image)}
        label='Upload cover image'
      />
      <Input
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isloading}
      />
      <Input
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isloading}
      />

      <Input
        placeholder='Biographie'
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isloading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isloading}
      isOpen={editUserModal.isOpen}
      title='Update your profil'
      actionLabel='Save'
      onClose={editUserModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};
export default EditUserModal;
