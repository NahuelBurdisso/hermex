import { Outlet } from "@remix-run/react";

export default function CustomerHomeLayout() {
  return (
    <div className="m-12">
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">
          Customer Home
        </span>
      </div>

      <Outlet />
    </div>
  );
}
