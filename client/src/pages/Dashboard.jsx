import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';

export default function Dashboard() {
     const location = useLocation();
     const [tab, setTab] = useState('');
     const dispatch = useDispatch();

     useEffect(() => {
          const urlParams = new URLSearchParams(location.search);
          const tabFromUrl = urlParams.get('tab');
          if (tabFromUrl) {
               setTab(tabFromUrl);
          }
     }, [location.search]);

     const handleSignOut = async () => {
          try {
               const res = await fetch('/api/user/signout', {
                    method: 'POST',
               });
               const data = res.json();
               if (!res.ok) {
                    console.log('Sign out failed');
               } else {
                    dispatch(signOutSuccess());
               }
          } catch (error) {
               console.log('Sign out failed:' + error);
          }
     };
     return (
          <div className="container gap-5 mx-auto md:flex">
               <div className="">
                    <DashSidebar tab={tab} setTab={setTab} signOut={handleSignOut} />
               </div>
               {tab === 'profile' && <DashProfile signOut={handleSignOut} />}
          </div>
     );
}
