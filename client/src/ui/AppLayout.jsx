import { Outlet } from 'react-router-dom';

import Header from './Header';

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] ">
      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
