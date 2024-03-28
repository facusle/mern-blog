import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateFailure, updateSuccess, deleteStart, deleteSuccess, deleteFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashProfile({ signOut }) {
     const { currentUser } = useSelector((state) => state.user);
     const [imageFile, setImageFile] = useState(null);
     const [imageUrl, setImageUrl] = useState(null);
     const [imageProcess, setImageProcess] = useState(0);
     const [formData, setFormData] = useState({});
     const [imageUploadError, setImageUploadError] = useState('');
     const [imageUploading, setImageUploading] = useState(false);
     const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
     const [updateUserError, setUpdateUserError] = useState(null);
     // delete user
     const [showModal, setShowModal] = useState(false);
     // end delete user
     const filePickerRef = useRef();
     const dispatch = useDispatch();

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
          setImageUploading(true);
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
                    setImageUploading(false);
               },
               () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                         console.log('Image upload sucessfully, link at:', downloadURL);
                         setImageUrl(downloadURL);
                         setFormData({ ...formData, profilePicture: downloadURL });
                         setImageUploading(false);
                    });
               },
          );
     };
     const handleChangeForm = (e) => {
          setFormData({ ...formData, [e.target.id]: e.target.value });
     };
     const handleSubmitForm = async (e) => {
          e.preventDefault();
          setUpdateUserError(null);
          setUpdateUserSuccess(null);
          if (Object.keys(formData).length === 0) {
               setUpdateUserError('Nothing changes were made');
               return;
          }
          if (imageUploading) {
               setUpdateUserError('Please wait for image upload');
               return;
          }
          try {
               dispatch(updateStart());
               const res = await fetch(`/api/user/update/${currentUser._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
               });
               const data = await res.json();
               if (!res.ok) {
                    dispatch(updateFailure(data.message));
                    setUpdateUserError(data.message);
               } else {
                    dispatch(updateSuccess(data));
                    setUpdateUserSuccess("User's profile updated successfully");
               }
          } catch (error) {}
     };
     console.log('formData', formData);
     const handleDeleteUser = async (e) => {
          e.preventDefault();
          dispatch(deleteStart());
          const res = await fetch(`/api/user/delete/${currentUser._id}`, {
               method: 'DELETE',
               headers: { 'Content-Type': 'application/json' },
          });
          const data = res.json();
          if (!res.ok) {
               dispatch(deleteFailure(data.message));
               setUpdateUserError(data.message);
          } else {
               dispatch(deleteSuccess(data.message));
          }
     };
     return (
          <div className="flex flex-col items-center flex-1 pt-2 pb-10 space-y-5 md:pt-10">
               <h1 className="text-lg font-bold">Profile</h1>
               <form onSubmit={handleSubmitForm} className="flex flex-col items-center max-w-[100%] px-[20px] w-[400px] space-y-3 md:space-y-4">
                    <input type="file" accept="image/*" onChange={handleChangeImageFile} ref={filePickerRef} hidden />
                    <div
                         className="relative self-center w-32 h-32 mb-3 overflow-hidden rounded-full shadow-md cursor-pointer"
                         onClick={() => {
                              filePickerRef.current.click();
                         }}
                    >
                         {imageProcess > 0 && imageProcess < 100 && (
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
                    <TextInput
                         className="w-full"
                         type="text"
                         id="username"
                         placeholder="Username"
                         defaultValue={currentUser.username}
                         onChange={handleChangeForm}
                    />
                    <TextInput
                         className="w-full"
                         type="email"
                         id="email"
                         placeholder="Email"
                         defaultValue={currentUser.email}
                         onChange={handleChangeForm}
                    />
                    <TextInput
                         className="w-full"
                         type="password"
                         id="password"
                         placeholder="Password"
                         autoComplete="on"
                         onChange={handleChangeForm}
                    />
                    <Button type="submit" gradientDuoTone={'purpleToBlue'} outline>
                         Update
                    </Button>
               </form>
               <div className="p-5 flex justify-between max-w-full mt-5 text-red-500 w-[400px]">
                    <span onClick={() => setShowModal(true)} className="cursor-pointer">
                         Delete Account
                    </span>
                    <span className="cursor-pointer" onClick={signOut}>
                         Sign Out
                    </span>
               </div>
               {updateUserSuccess && (
                    <Alert color={'success'} className="mt-5">
                         {updateUserSuccess}
                    </Alert>
               )}
               {updateUserError && (
                    <Alert color={'failure'} className="mt-5">
                         {updateUserError}
                    </Alert>
               )}
               <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                         <div className="text-center">
                              <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure to delete this account?</h3>
                              <div className="flex justify-center gap-4">
                                   <Button color="failure" onClick={handleDeleteUser}>
                                        {"Yes, I'm sure"}
                                   </Button>
                                   <Button color="gray" onClick={() => setShowModal(false)}>
                                        No, cancel
                                   </Button>
                              </div>
                         </div>
                    </Modal.Body>
               </Modal>
          </div>
     );
}
