import { Outlet } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import Sidebar from './Sidebar';

function InternalAppLayout() {
  return (
    <div className="h-screen">
      <Sidebar />

      <div className="absolute top-0  right-5 z-40 bg-transparent  mt-2 h-10 w-10 p-2">
        <DarkModeToggle size="w-7 h-7" />
      </div>

      <div className="overflow-scroll p-5 sm:ml-[190px] mt-8 ">
        <main className="md:pr-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default InternalAppLayout;
