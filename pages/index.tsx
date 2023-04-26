import Form from '@/components/Form';
import Header from '@/components/Header';
import Postfeed from '@/components/posts/Postfeed';

export default function Home() {
  return (
    <>
      <Header label='Home' />
      <Form placeholder='Whats happening?' />
      <Postfeed />
    </>
  );
}
