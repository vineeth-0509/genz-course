/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import React from "react";
import SigninButton from "./SigninButton";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  console.log(session);
  return (
    <nav className="fixed inset-x-0 dark:bg-gray-950 top-0 bg-white z-[10] border-b border-zinc-300 py-2">
      <div className="flex items-center justify-center h-full gap-2 px-8 mx-auto sm:justify-between max-w-7xl">
        <Link href="/gallery" className="items-center hidden gap-2 sm:flex">
          <p className="rounded-lg border-2 border-r-4 border-black px-2 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            Genz-Course
          </p>
        </Link>
        <div className="flex items-center">
          <Link href="/gallery" className="mr-3">
            Gallery
          </Link>
          {session?.user && (
            <>
              <Link href="/create" className="mr-3">
                Create Course
              </Link>
              <Link href="/settings" className="mr-3">
                Settings
              </Link>
            </>
          )}
          <ThemeToggle className='mr-3 ' />
          <div className="flex items-center">
            {session?.user? <UserAccountNav user={session.user}/> : <SigninButton/>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
