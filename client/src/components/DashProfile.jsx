import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DashProfile() {
     const { currentUser } = useSelector((state) => state.user);
     console.log('currentUser', currentUser);
     return (
          <div className="flex flex-col items-center flex-1 pt-2 pb-10 space-y-5 md:pt-10">
               <h1 className="text-lg font-bold">Profile</h1>
               <form className="flex flex-col items-center max-w-[100%] px-[20px] w-[400px] space-y-3 md:space-y-4">
                    <div className="w-32 h-32 mb-3 overflow-hidden rounded-full shadow-md cursor-pointer">
                         <img
                              className="w-full h-full border-8 border-gray-200 rounded-full"
                              src={currentUser.profilePicture}
                              alt={currentUser.username}
                         />
                    </div>
                    <TextInput className="w-full" type="text" id="username" placeholder="Username" defaultValue={currentUser.username} />
                    <TextInput className="w-full" type="email" id="email" placeholder="Email" defaultValue={currentUser.email} />
                    <TextInput className="w-full" type="password" id="password" placeholder="Password" />
                    <Button type="submit" gradientDuoTone={'purpleToBlue'} outline>
                         Update
                    </Button>
                    <div className="flex justify-between w-full mt-5 text-red-500">
                         <span className="cursor-pointer">Delete Account</span>
                         <span className="cursor-pointer">Sign Out</span>
                    </div>
               </form>
          </div>
     );
}
