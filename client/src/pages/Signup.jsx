import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function Signup() {
     const [formData, setFormData] = useState({});
     const [errorMessage, setErrorMessage] = useState(null);
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
     };
     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!formData.username || !formData.password || !formData.email) {
               return setErrorMessage('Please fill out all the fields');
          }
          try {
               setLoading(true);
               setErrorMessage(null);
               const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
               });
               const data = await res.json();
               if (data.success === false) {
                    return setErrorMessage(data.message);
               }
               setLoading(false);
               if (res.ok) {
                    navigate('/sign-in');
               }
          } catch (error) {
               setLoading(false);
               return setErrorMessage(error);
          }
     };
     return (
          <div className="min-h-screen mt-20">
               <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
                    {/* left */}
                    <div className="flex-1">
                         <Link to="/" className="text-4xl font-bold dark:text-white">
                              <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                   Aduma
                              </span>
                              VTEC
                         </Link>
                         <p className="mt-5 text-sm">duong project with fking love</p>
                    </div>
                    {/* right */}
                    <div className="flex-1">
                         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                              <div>
                                   <Label value="Your Username" />
                                   <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
                              </div>
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
                                        'Sign Up'
                                   )}
                              </Button>
                              <OAuth />
                         </form>
                         <div className="flex gap-2 mt-4 text-sm">
                              <span>Have an account?</span>
                              <Link to="/sign-in" className="text-blue-500">
                                   Sign In
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
