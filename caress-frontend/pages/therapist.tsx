import React, { useEffect, useState } from "react";
import styles from "@/styles/profile.module.css"
import { LucideArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import auth from '@/firebase/detectSignin'
import firebase from '@/firebase/clientApp'
import Head from "next/head";

export default function TherapistView() {

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
		uid: string;
	  }

	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [therapist, setTherapist] = useState<Therapist | null>(null);


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

		  const photoURL = user.photoURL;
		  const name = user.displayName;
		  

		  const therapistBio = async () => {
			const isTherapistRef = ((await firebase.firestore().collection('therapists').doc(user?.uid).get()).data() as Therapist);
			setTherapist(isTherapistRef);
			const bio = isTherapistRef.bio;
			return  bio
		  }

		  


		  const bio = therapistBio();

		  bio.then((bio) => {
			firebase.firestore().collection('therapists').doc(user?.uid).set({
				photoURL : photoURL,
				bio: bio,
				exists: true,
				name: name,
				uid: user?.uid
			  })
		  })
	}, [user])

	return (
		<>
		<Head>
			<title>
				Therapist Profile
			</title>
		</Head>
		<div className={styles.container}>
		<div className={styles.row}>
			<div style={{display:  'flex', alignItems: 'center', cursor: 'pointer', flexDirection: 'column',justifyContent: 'center', alignSelf:  'flex-start', marginTop: '2px', marginLeft: '10px', width: '30px'}} onClick={() => router.replace('/profile')}>
				<LucideArrowLeft></LucideArrowLeft>
			</div>
		<div className={styles.titles}>
			Therapist Profile
		</div>
		<div style={{width: '40px'}}></div>
		</div>
		</div>
		<div className={styles.card}>
		<img style={{borderRadius: "50%"}} src={(user as any)?.photoURL} alt="Profile picture" />
		<div className={styles.title}>
			{(user as any)?.displayName}
		</div>
		
		<div className={styles.scores}>
			{therapist?.bio}
		</div>
		</div>
		</>
	)
}