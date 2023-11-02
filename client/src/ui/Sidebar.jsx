import { NavLink } from 'react-router-dom';
import {
  HiOutlineBars3BottomLeft,
  HiOutlineCurrencyEuro,
  HiCalendarDays,
} from 'react-icons/hi2';
import { LiaPiggyBankSolid } from 'react-icons/lia';
import { IoStatsChartOutline } from 'react-icons/io5';
import { AiOutlineUser } from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react';
import Logout from '../features/authentication/Logout';
import UserAvatar from '../features/authentication/UserAvatar';

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className=" inline-flex items-center sticky top-0 z-40 p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
          onClick={toggleSidebar}
        >
          <HiOutlineBars3BottomLeft
            className="w-8 h-8"
            aria-hidden="true"
            fill="currentColor"
          ></HiOutlineBars3BottomLeft>
        </button>
      </div>
      <aside
        id="default-sidebar"
        ref={sidebarRef}
        className={`bg-gray-100 dark:bg-gray-800 fixed top-0 left-0 z-40 w-55 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-8 py-4">
          <div className="h-full pb-5 flex flex-col justify-between">
            <ul className="space-y-3  ">
              <li className="flex justify-center py-8">
                <UserAvatar />
              </li>

              <li>
                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-2 text-lg"
                  onClick={toggleSidebar}
                >
                  <IoStatsChartOutline className="w-5 h-5" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/transactions"
                  className="flex items-center gap-2 text-lg"
                  onClick={toggleSidebar}
                >
                  <HiOutlineCurrencyEuro className="w-5 h-5" />
                  <span>Transactions</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calendar"
                  className="flex items-center gap-2 text-lg"
                  onClick={toggleSidebar}
                >
                  <HiCalendarDays className="w-5 h-5" />
                  <span>Calendar</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/budget"
                  className="flex items-center gap-2 text-lg"
                  onClick={toggleSidebar}
                >
                  <LiaPiggyBankSolid className="w-5 h-5" />
                  <span>Budget</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/account"
                  className="flex items-center gap-2 text-lg"
                  onClick={toggleSidebar}
                >
                  <AiOutlineUser className="w-5 h-5" />
                  <span>Account</span>
                </NavLink>
              </li>
            </ul>
            <ul className="mt-3 space-y-5">
              <li>
                <div className="flex items-center gap-2 text-lg">
                  <Logout />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
