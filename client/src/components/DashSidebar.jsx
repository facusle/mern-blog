import React, { useState, useEffect } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { set } from 'mongoose';

export default function DashSidebar({ tab, setTab }) {
     const url = new URL(window.location.href);

     function handleOpenTab(id) {
          setTab(id);
          url.searchParams.set('tab', id);
          window.history.replaceState(null, '', url);
     }
     return (
          <div className="my-5 md:my-10">
               <Sidebar aria-label="Sidebar with logo branding example" className="w-full md:w-64">
                    <div className="flex p-2 mb-3 text-lg font-bold border-b border-gray-950 dark:border-white">
                         <svg
                              className="w-6 h-6 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                         >
                              <path
                                   fillRule="evenodd"
                                   d="M5.005 10.19a1 1 0 0 1 1 1v.233l5.998 3.464L18 11.423v-.232a1 1 0 1 1 2 0V12a1 1 0 0 1-.5.866l-6.997 4.042a1 1 0 0 1-1 0l-6.998-4.042a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1ZM5 15.15a1 1 0 0 1 1 1v.232l5.997 3.464 5.998-3.464v-.232a1 1 0 1 1 2 0v.81a1 1 0 0 1-.5.865l-6.998 4.042a1 1 0 0 1-1 0L4.5 17.824a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1Z"
                                   clipRule="evenodd"
                              />
                              <path d="M12.503 2.134a1 1 0 0 0-1 0L4.501 6.17A1 1 0 0 0 4.5 7.902l7.002 4.047a1 1 0 0 0 1 0l6.998-4.04a1 1 0 0 0 0-1.732l-6.997-4.042Z" />
                         </svg>
                         <p className="inline ml-2">DashBoard</p>
                    </div>

                    <Sidebar.Items>
                         <Sidebar.ItemGroup>
                              <Sidebar.Item
                                   className="cursor-pointer"
                                   id="profile"
                                   icon={HiUser}
                                   active={tab === 'profile'}
                                   onClick={(id) => handleOpenTab(id.currentTarget.id)}
                              >
                                   Profile
                              </Sidebar.Item>
                              <Sidebar.Item href="#" icon={HiViewBoards}>
                                   Kanban
                              </Sidebar.Item>
                              <Sidebar.Item href="#" icon={HiInbox}>
                                   Inbox
                              </Sidebar.Item>
                              <Sidebar.Item href="#" icon={HiShoppingBag}>
                                   Products
                              </Sidebar.Item>
                              <Sidebar.Item href="#" icon={HiArrowSmRight}>
                                   Sign In
                              </Sidebar.Item>
                              <Sidebar.Item href="#" icon={HiTable}>
                                   Sign Up
                              </Sidebar.Item>
                         </Sidebar.ItemGroup>
                    </Sidebar.Items>
               </Sidebar>
          </div>
     );
}
