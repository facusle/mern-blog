import React from 'react';
('use client');
import { Link } from 'react-router-dom';
import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function Footers() {
     return (
          <Footer container className="shadow-none">
               <div className="w-full">
                    <div className="grid justify-between w-full sm:flex sm:justify-between md:flex md:grid-cols-1">
                         <div className="mb-5 md:mb-0">
                              <Link to="/" className="self-center block mt-3 text-sm font-semibold whitespace-nowrap sm:text-xl dark:text-white">
                                   <span className="inline-block px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                        Facus's
                                   </span>
                                   Blog
                              </Link>
                         </div>
                         <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                              <div>
                                   <Footer.Title title="about" />
                                   <Footer.LinkGroup col>
                                        <Footer.Link href="#">About</Footer.Link>
                                        <Footer.Link href="#">Services</Footer.Link>
                                   </Footer.LinkGroup>
                              </div>
                              <div>
                                   <Footer.Title title="Follow us" />
                                   <Footer.LinkGroup col>
                                        <Footer.Link href="#">Github</Footer.Link>
                                        <Footer.Link href="#">Discord</Footer.Link>
                                   </Footer.LinkGroup>
                              </div>
                              <div>
                                   <Footer.Title title="Legal" />
                                   <Footer.LinkGroup col>
                                        <Footer.Link href="#">Privacy Policy</Footer.Link>
                                        <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                                   </Footer.LinkGroup>
                              </div>
                         </div>
                    </div>
                    <Footer.Divider />
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                         <Footer.Copyright href="#" by="Facus" year={new Date().getFullYear()} />
                         <div className="flex mt-4 space-x-6 sm:mt-0 sm:justify-center">
                              <Footer.Icon href="#" icon={BsFacebook} />
                              <Footer.Icon href="#" icon={BsInstagram} />
                              <Footer.Icon href="#" icon={BsTwitter} />
                              <Footer.Icon href="#" icon={BsGithub} />
                              <Footer.Icon href="#" icon={BsDribbble} />
                         </div>
                    </div>
               </div>
          </Footer>
     );
}
