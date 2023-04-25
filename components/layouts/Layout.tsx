import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-screen bg-slate-900'>
      <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
        <div className='grid grild-cols-4 h-full'>
          <Sidebar />
          <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-700'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
