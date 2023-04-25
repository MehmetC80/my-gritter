import useLoginModal from '@/hooks/useLoginModal';
import react, { useCallback, useState } from 'react';
import Input from '../ui/Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      // code

      registerModal.onClose;
    } catch (err) {
      console.log('error');
    } finally {
      setIsloading(false);
    }
  }, [registerModal]);

  // body content
  const bodyContent = (
    <div className=' flex flex-col gap-4'>
      <Input
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        value='email'
        disabled={isLoading}
      />
      <Input
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        value='name'
        disabled={isLoading}
      />
      <Input
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        value='username'
        disabled={isLoading}
      />
      <Input
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        value='password'
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div
      className='
    text-neutral-400
    text-center
    mt-4
    '
    >
      <p>
        Already have an account?{' '}
        <span
          onClick={onToggle}
          className='text-white cursor-pointer hover:underline'
        >
          {' '}
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Create an Account'
      actionLabel='Register'
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default RegisterModal;
