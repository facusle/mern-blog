import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Signin() {
     const [formData, setFormData] = useState({});
     const { loading, error: errorMessage } = useSelector((state) => state.user);
     const dispatch = useDispatch();

     const navigate = useNavigate();
     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
     };
     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!formData.password || !formData.email) {
               return dispatch(signInFailure('Please fill all the required fields'));
          }
          try {
               dispatch(signInStart());
               const res = await fetch('/api/auth/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
               });
               const data = await res.json();
               if (data.success === false) {
                    dispatch(signInFailure(data.message));
               }

               if (res.ok) {
                    dispatch(signInSuccess(data));
                    navigate('/');
               }
          } catch (error) {
               dispatch(signInFailure(data.message));
          }
     };
     return (
          <div className="min-h-screen mt-20">
               <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
                    {/* left */}
                    <div className="flex-1">
                         <Link to="/" className="text-4xl font-bold dark:text-white">
                              <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                   Duong
                              </span>
                              Blog
                         </Link>
                         <p className="mt-5 text-sm">duong project with fking love</p>
                    </div>
                    {/* right */}
                    <div className="flex-1">
                         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                              <div>
                                   <Label value="Your Email" />
                                   <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
                              </div>
                              <div>
                                   <Label value="Your Password" />
                                   <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
                              </div>
                              <Button gradientDuoTone={'purpleToPink'} type="submit" disabled={loading}>
                                   {loading ? (
                                        <>
                                             <Spinner size="sm" /> <span>Loading...</span>
                                        </>
                                   ) : (
                                        'Sign In'
                                   )}
                              </Button>
                         </form>
                         <div className="flex gap-2 mt-4 text-sm">
                              <span>Doesn't have an account?</span>
                              <Link to="/sign-up" className="text-blue-500">
                                   Sign Up
                              </Link>
                         </div>
                         {errorMessage && (
                              <Alert className="mt-5" color="failure">
                                   {errorMessage}
                              </Alert>
                         )}
                    </div>
               </div>
          </div>
     );
}
