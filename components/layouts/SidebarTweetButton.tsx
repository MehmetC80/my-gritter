import { useRouter } from 'next/router';
import { FaFeather } from 'react-icons/fa';

const SidebarTweetButton = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/')}>
      <div
        className='
      mt-6
      lg:hidden
      rounded-full
      w-14
      h-14
      p-4
      flex
      items-center
      justify-center
      bg-skype-500
      hover:bg-opacity-80
      transition
      cursor-pointer
      '
      >
        <FaFeather size={24} color='white' />
      </div>
      <div
        className='
      mt-6
      hidden
      lg:block
      px-4
      py-2
      transition
      rounded-full
      bg-sky-500
      hover:opacity-80
      cursor-pointer
      '
      >
        <p className='hidden lg:block text-center text-white font-semibold text-[20px] '>
          Tweet
        </p>
      </div>
    </div>
  );
};
export default SidebarTweetButton;
