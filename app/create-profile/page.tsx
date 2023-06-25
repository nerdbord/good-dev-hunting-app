'use client'
import styles from "./page.module.css";
import React, {useEffect} from 'react'
import { useSession } from "next-auth/react";


const CreateProfilePage = () => {
  const session = useSession();
  console.log(session);

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      window.location.href = '/'; 
    }
  }, [session]);

  if (session.status === 'loading') {
    return <div><p>Loading...</p></div>
  }

  if (session.status === 'authenticated') {
    return <div><p>Create Profile Page</p></div>
  }
}

export default CreateProfilePage;