import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import auth from '@/firebase/detectSignin';
import styles from '@/styles/profile.module.css';
import Bottombar from '@/components/bottombar';
import firebase from '@/firebase/clientApp';
import Head from 'next/head';
import { LucideArrowRight, LucideSettings } from 'lucide-react';
import Link from 'next/link';

export default function ProfileView() {

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

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
	const getUser = async () => {
	  const currentUser = await auth.isLoggedIn();
	  console.log('User object:', currentUser);
	  setUser(currentUser);
	};
	getUser();
}, []);


  interface QuizResult {
	date: string;
	openness: number;
	conscientiousness: number;
	extraversion: number;
	agreeableness: number;
	neuroticism: number;
	traits: Array<string>;
  }

  interface Mood {
	date: string;
	mood: string;
  }
  

  const [latestQuizResult, setLatestQuizResult] = useState<QuizResult | null>(null);

  const [moods, setMoods] = useState<Mood[]>([]);

  const [isTherapist, setIsTherapist] = useState(false);

  interface Therapist {
	exists: boolean;
	bio: string;
  }

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
  
	const getLatestQuizResult = async () => {
		try{
	const isTherapistRef = ((await firebase.firestore().collection('therapists').doc(user?.uid).get()).data() as Therapist).exists;
	if (isTherapistRef) {
	setIsTherapist(true);
	}
} catch(e) {

}
	  try {

		const today = new Date().toDateString();

		const emojiRef = firebase
						.firestore()
						.collection('users')
						.doc(user?.uid)
						.collection('mood').orderBy('date', 'asc').limit(7);
					const snapshot = await emojiRef.get();
					if (snapshot.empty) {
						console.log('emoji not done');
					}
					if (!snapshot.empty) {
						setMoods(snapshot.docs.map((doc) => doc.data() as Mood));
					}
		if (!latestQuizResult) {
		const latestResultRef = firebase.firestore().collection('users').doc(user?.uid).collection('ocean-results')
		  .orderBy('date', 'desc')
		  .limit(1);
  
		const snapshot = await latestResultRef.get();
  
		if (!snapshot.empty) {
		  const latestResult = snapshot.docs[0].data() as QuizResult;
		  setLatestQuizResult(latestResult);
		} else {
		  setLatestQuizResult(null);
		}
	}
	  } catch (error) {
		console.log('Error getting latest quiz result:', error);
		setLatestQuizResult(null);
	  }
	};
	getLatestQuizResult();
  }, [user]);
  
  



  const handleLogout = async () => {
	try {
	  await firebase.auth().signOut();
	  router.push('/login');
	} catch (error) {
	  console.error(error);
	}
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const Caress_results = () => {
	router.replace('/mental-health-reports');
  }

  const therapist = () => {
	if (isTherapist) {
		router.replace('/therapist');
	} else {
		router.replace('/therapist-profile');
	}
  }



  return (
	<>
	<Head>
		<title>Profile</title>
	</Head>
    <div className={styles.container}>
      <div className={styles.header}>
        {/*<img src="/logo.png" alt="Logo" />*/}
		<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
		<img src={(user as any)?.photoURL} alt="Profile picture" />
        <div>
          <p>{(user as any)?.displayName ?? 'Unknown'}</p>
          {/*<p>{(user as any)?.email ?? 'Unknown'}</p>*/}
        </div>
		</div>
		<LucideSettings onClick={() => router.replace('/settings')} style={{marginRight: '10px'}}/>
        {/*<h1>Profile</h1>*/}
        {/*<button className={styles.signout_btn} onClick={handleLogout}>Log Out</button>*/}
      </div>
      <div className={styles.card} onClick={Caress_results}>
		<div className={styles.row}>
			<div>
				<p>Mental Health Reports</p>
			</div>
			<div>
				<LucideArrowRight/>
			</div>
		</div>
      </div>
    </div>
	<div className={styles.container} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5px'}}>
	<a className={styles.link} onClick={therapist}>
		Are you a Licensed Therapist?
	</a>
	</div>
	<div className={styles.card}>
	<div className={styles.title}>
		Past Moods
	</div>
	{moods?.map((mood, index) => (
		<div>
			<br />
			<div className={styles.row}>
				<div className={styles.title} style={{fontSize: '18px', fontWeight: '420', color: 'black'}}>
					{mood.date}
				</div>
				<div className={styles.emoji}>
					{mood.mood}
				</div>
			</div>
			{/*<br />*/}
		</div>
	))}
	</div>
	<br />
	{latestQuizResult && (
<div className={styles.card}>
  <div className={styles.columns}>
    <div className={styles.title}>
      Personality Traits
    </div>
    <div className={styles.scores}>
      <ul className={styles.my_list}>
        <li className={styles.li}>Openness: {latestQuizResult.openness}</li>
        <li className={styles.li}>Conscientiousness: {latestQuizResult.conscientiousness}</li>
        <li className={styles.li}>Extraversion: {latestQuizResult.extraversion}</li>
        <li className={styles.li}>Agreeableness: {latestQuizResult.agreeableness}</li>
        <li className={styles.li}>Neuroticism: {latestQuizResult.neuroticism}</li>
      </ul>
	  
    </div>
	<br />
	<div>
		1) {latestQuizResult.traits[0]}
	  </div>
	  <br />
	  <div>
		2) {latestQuizResult.traits[1]}
	  </div>
	  <br />
	  <div>
		3) {latestQuizResult.traits[2]}
	  </div>
	  <br />
	  <div>
		4) {latestQuizResult.traits[3]}
	  </div>
	  <br />
	  <div>
		5) {latestQuizResult.traits[4]}
	  </div>
	  <br />
  </div>
</div>
)}
	<br />
	<br />
	<br />
	<br />
	<br />
	<Bottombar/>
	</>
  );
}
