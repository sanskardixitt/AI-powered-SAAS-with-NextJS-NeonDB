"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => router.push("/");
  const handleSignOut = async () => signOut();

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-base-100">
        <header className="w-full bg-base-200 shadow-md sticky top-0 z-30">
          <div className="navbar max-w-7xl mx-auto">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <MenuIcon />
              </label>
            </div>
            <div className="flex-1">
              <div
                onClick={handleLogoClick}
                className="btn btn-ghost text-xl font-bold tracking-tight normal-case cursor-pointer text-primary"
              >
                Cloudinary Showcase
              </div>
            </div>
            <div className="flex-none flex items-center space-x-3">
              {user && (
                <>
                  <span className="text-sm font-medium text-base-content hidden sm:inline">
                    {user.username || user.emailAddresses[0].emailAddress}
                  </span>
                  <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={user.imageUrl}
                        alt={user.username || "User avatar"}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="sidebar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="bg-base-200 w-64 min-h-full flex flex-col">
          <div className="flex items-center justify-center h-20 shadow-md">
            <ImageIcon className="w-10 h-10 text-primary" />
          </div>
          <ul className="menu p-4 flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? "active" : ""}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-4 border-t border-base-300">
            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-error w-full"
            >
              <LogOutIcon className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
