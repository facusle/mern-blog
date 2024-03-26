import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
     const { currentUser } = useSelector((state) => state.user);
     const [imageFile, setImageFile] = useState(null);
     const [imageUrl, setImageUrl] = useState(null);
     const [imageProcess, setImageProcess] = useState(0);
     console.log('imageProcess', imageProcess);
     const [imageUploadError, setImageUploadError] = useState('');
     const filePickerRef = useRef();

     const handleChangeImageFile = (e) => {
          const file = e.target?.files[0];
          if (file) {
               setImageFile(file);
               setImageUrl(URL.createObjectURL(file));
          }
     };
     useEffect(() => {
          if (imageFile) {
               uploadImage();
          }
     }, [imageFile]);
     const uploadImage = async () => {
          setImageUploadError(null);
          const storage = getStorage(app);
          const fileName = new Date().getTime() + imageFile.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, imageFile);
          uploadTask.on(
               'state_changed',
               (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    setImageProcess(progress.toFixed(0));
                    console.log('Upload is ' + progress.toFixed(0) + '/' + imageProcess + '% done');
                    switch (snapshot.state) {
                         case 'paused':
                              console.log('Upload is paused');
                              break;
                         case 'running':
                              console.log('Upload is running');
                              break;
                    }
               },
               (error) => {
                    // Handle unsuccessful uploads
                    setImageUploadError("Because dev too poor, image can't larger than 500kb ", error);
                    setImageProcess(0);
                    setImageUrl(null);
                    setImageFile(null);
               },
               () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                         console.log('Image upload sucessfully, link at:', downloadURL);
                         setImageUrl(downloadURL);
                    });
               },
          );
     };
     return (
          <div className="flex flex-col items-center flex-1 pt-2 pb-10 space-y-5 md:pt-10">
               <h1 className="text-lg font-bold">Profile</h1>
               <form className="flex flex-col items-center max-w-[100%] px-[20px] w-[400px] space-y-3 md:space-y-4">
                    <input type="file" accept="image/*" onChange={handleChangeImageFile} ref={filePickerRef} hidden />
                    <div
                         className="relative self-center w-32 h-32 mb-3 overflow-hidden rounded-full shadow-md cursor-pointer"
                         onClick={() => {
                              filePickerRef.current.click();
                         }}
                    >
                         {imageProcess > 0 && (
                              <CircularProgressbar
                                   value={imageProcess || 0}
                                   text={`${imageUploadError ? 'Failed' : imageProcess + '%'}`}
                                   strokeWidth={5}
                                   styles={{
                                        root: {
                                             width: '100%',
                                             height: '100%',
                                             position: 'absolute',
                                             top: 0,
                                             left: 0,
                                             right: 0,
                                             bottom: 0,
                                        },
                                        path: {
                                             stroke: `rgba(62,152,199, ${imageProcess / 100})`,
                                        },
                                        text: {
                                             fill: imageUploadError ? 'red' : '',
                                        },
                                   }}
                              />
                         )}
                         <img
                              className={`object-cover w-full h-full border-8 border-gray-200 rounded-full ${
                                   imageProcess && imageProcess < 100 && 'opacity-50'
                              }`}
                              src={imageUrl || currentUser.profilePicture}
                              alt={currentUser.username}
                         />
                    </div>
                    {imageUploadError && <Alert color={'failure'}>{imageUploadError}</Alert>}
                    <TextInput className="w-full" type="text" id="username" placeholder="Username" defaultValue={currentUser.username} />
                    <TextInput className="w-full" type="email" id="email" placeholder="Email" defaultValue={currentUser.email} />
                    <TextInput className="w-full" type="password" id="password" placeholder="Password" autoComplete="on" />
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
