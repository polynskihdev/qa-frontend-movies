'use client';

import Link from 'next/link';

import useRoutes from '@/hooks/useRoutes';

function SideBar() {
  const routes = useRoutes();

  return (
    <aside className="w-1/6 py-5 pr-5 border-r-2  box-border">
      <ul className="">
        {routes.map(({
          label, href, icon: Icon, active,
        }) => (
          <li
            className="w-full mt-2 first:mt-0"
            key={label}
          >
            <Link
              href={href}
              className={`text-base flex items-center rounded-md w-full py-3 px-3 transition duration-200 ${active ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-200 hover:text-black'}`}
            >
              <Icon size={18} className="" />
              <h3 className="ml-4">{label}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
