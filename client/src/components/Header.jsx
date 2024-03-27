import React from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
     const path = useLocation().pathname;
     const dispatch = useDispatch();
     const { currentTheme } = useSelector((state) => state.theme);
     const { currentUser } = useSelector((state) => state.user);
     return (
          <Navbar className="border-b-2">
               <Link to="/" className="self-center text-sm font-semibold whitespace-nowrap sm:text-xl dark:text-white">
                    <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Facus's</span>
                    Blog
               </Link>
               <form>
                    <TextInput type="text" placeholder="Search" rightIcon={AiOutlineSearch} className="hidden lg:inline " />
               </form>
               <Button className="w-12 h-10 lg:hidden" color="gray" pill>
                    <AiOutlineSearch />
               </Button>
               <div className="flex gap-2 md:order-2">
                    <Button className="hidden w-12 h-10 sm:inline" color="gray" pill onClick={() => dispatch(toggleTheme())}>
                         {currentTheme === 'light' ? <FaSun /> : <FaMoon />}
                    </Button>

                    {currentUser ? (
                         <Dropdown
                              arrowIcon={false}
                              inline
                              label={<Avatar className="avatar" alt="user" img={currentUser?.profilePicture} rounded></Avatar>}
                         >
                              <Dropdown.Header>
                                   <span className="block text-sm">@{currentUser?.username}</span>
                                   <span className="block text-sm truncate">@{currentUser?.email}</span>
                              </Dropdown.Header>
                              <Link to="/dashboard?tab=profile">
                                   <Dropdown.Item>Profile</Dropdown.Item>
                              </Link>
                              <Dropdown.Divider />
                              <Dropdown.Item>Sign Out</Dropdown.Item>
                         </Dropdown>
                    ) : (
                         <Link to="/sign-in">
                              <Button gradientDuoTone="purpleToBlue" outline>
                                   Sign in
                              </Button>
                         </Link>
                    )}

                    <Navbar.Toggle />
               </div>
               <Navbar.Collapse>
                    <Navbar.Link active={path === '/'} as={'div'}>
                         <Link to="/">Home</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/about'} as={'div'}>
                         <Link to="/about">about</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/projects'} as={'div'}>
                         <Link to="/projects">Projects</Link>
                    </Navbar.Link>
               </Navbar.Collapse>
          </Navbar>
     );
}
