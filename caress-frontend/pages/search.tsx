import Bottombar from '@/components/bottombar';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/search.module.css';
import { LucideSearch, LucideMessageSquare } from 'lucide-react';
import { useRouter } from 'next/router';
import firebase from '@/firebase/clientApp';
import auth from '@/firebase/detectSignin'
import { query } from 'firebase/firestore';

export default function Search() {

	const router = useRouter();

	interface User {
		uid: string;
		email: string | null;
		displayName: string | null;
		photoURL: string | null;
		emailVerified: boolean;
		phoneNumber: string | null;
		isAnonymous: boolean;
		tenantId: string | null;
		providerData: any[];
	  }

	  interface Therapist {
		exists:  boolean;
		bio: string;
		photoURL: string;
		name: string;
		uid:  string;
	  }

	  const [user, setUser] = useState<User | null>(null);
	  const [therapist, setTherapist] = useState<Therapist[]>([]);
	  const [isLoading, setIsLoading] = useState(true);
	  const [therapistUids, setTherapistUids] = useState<string[]>([]);


	  const textTherapist = (therapist: Therapist) => {
		router.replace({
			pathname: '/chat',
			query: {
			  therapistUid: therapist.uid,
			  therapistName: therapist.name,
			  therapistPhotoUrl: therapist.photoURL
			}
		  });	  }
  

	  useEffect(() => {
		const getUser = async () => {
			const currentUser = await auth.isLoggedIn();
			console.log('User object:', currentUser);
			setUser(currentUser);
			setIsLoading(false);
		  };
		  getUser();
		
		  if (!user) {
			return;
		  }
		
		  const checkAuthentication = async () => {
			try {
			  await auth.isLoggedIn();
			} catch (error) {
			  router.replace('/login');
			} 
		  };
		  checkAuthentication();

		  const therapists = async () => {
			const querySnapshot = await firebase.firestore().collection('therapists').limit(25).get();
      const therapistsData = querySnapshot.docs.map(doc => doc.data() as Therapist);
      setTherapist(therapistsData);
      setIsLoading(false);
			// setTherapist(therapistUids);
		  }

		  
			therapists();
	}, [therapist, therapistUids, user])

	console.log();

    return (
        <>
		<Head>
			<title>
				Search For Therapists
			</title>
		</Head>
		<div className={styles.search}>
			<div className={styles.searchInput}>
			<LucideSearch/>
			</div>
		</div>
		{therapist.map((therapist, index) => (
			<div className={styles.card} key={index}>
				<div className={styles.row}>
				<img style={{borderRadius: "50%"}} src={(therapist as any)?.photoURL} alt="Profile picture" />
		<div className={styles.column}>
		
		<div className={styles.title}>
			{(therapist as any)?.name}
		</div>
		<div>
			{therapist?.bio}
		</div>
		</div>
		<div>
			<LucideMessageSquare onClick={() => textTherapist(therapist)}></LucideMessageSquare>
		</div>
				</div>
			</div>
		))
		}
		<Bottombar/>
		</>
    )
} 
