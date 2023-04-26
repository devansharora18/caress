import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styles from '@/styles/results.module.css'
import auth from '@/firebase/detectSignin';
import firebase from '@/firebase/clientApp';

export default function Caress_result() {

	const router = useRouter();

	useEffect(() => {
		const checkAuthentication = async () => {
		  try {
			const user = await auth.isLoggedIn();
		  } catch (error) {
			router.replace('/login');
		  } 
		  
		};
	
		checkAuthentication();
	  }, []);

	let results = router.query.result;

	if (results == undefined) {
		results = [0,0,0,0,0,0];
	}
	let mhc = (0.1 * results[0]) + (0.15 * results[1]) + (0.15 * results[2]) + (0.25 * results[3]) + (0.2 * results[4]) + (0.15 * results[5])



	const user = firebase.auth().currentUser;

	const now = new Date();
  const quizResult = {
    copingStrategies: results[0],
    appetite: results[1],
    relationships: results[2],
    energy: results[3],
    sleep: results[4],
    sentiment: results[5],
    mhScore: mhc,
    date: now.toDateString(),
  };

//  firebase.firestore().collection('users').doc(user.uid).collection('caress-results').add(quizResult);

  useEffect(() => {
	const latestResultRef = firebase.firestore().collection('users').doc(user.uid).collection('caress-results')
.orderBy('date', 'desc')
.limit(1);

latestResultRef.get().then((snapshot) => {
if (!snapshot.empty) {
  const latestResult = snapshot.docs[0].data();
  const latestResultDate = new Date(latestResult.date);
  const daysDiff = Math.floor((now.getTime() - latestResultDate.getTime()) / (1000 * 3600 * 24));

  if (daysDiff > 7) {
	firebase.firestore().collection('users').doc(user.uid).collection('caress-results').doc(now.toDateString()).set(quizResult);
  }
} else {
  firebase.firestore().collection('users').doc(user.uid).collection('caress-results').doc(now.toDateString()).set(quizResult);
}
}).catch((error) => {
console.log('Error getting latest quiz result:', error);
});
  }, [user])

	return (
		<div className={styles.content}>
  <Head>
    <title>Caress-Results</title>
  </Head>

  <div className={styles.container}>
  <h1 className={styles.title}>Quiz Results</h1>

  <div className={styles.resultContainer}>
    <div className={styles.result}>
      <div className={styles.label}>Coping Strategies & Self-Care:</div>
      <div className={styles.value}>{results[0]}</div>
    </div>
    <div className={styles.result}>
      <div className={styles.label}>Appetite & Eating Habits:</div>
      <div className={styles.value}>{results[1]}</div>
    </div>
    <div className={styles.result}>
      <div className={styles.label}>Relationships & Social Support:</div>
      <div className={styles.value}>{results[2]}</div>
    </div>
    <div className={styles.result}>
      <div className={styles.label}>Energy & Motivation:</div>
      <div className={styles.value}>{results[3]}</div>
    </div>
    <div className={styles.result}>
      <div className={styles.label}>Sleep:</div>
      <div className={styles.value}>{results[4]}</div>
    </div>
    <div className={styles.result}>
      <div className={styles.label}>Sentiment & Emotional State:</div>
      <div className={styles.value}>{results[5]}</div>
    </div>
  </div>

  <div className={styles.score}>
    <span className={styles.label}>Mental Health Score:</span>
    <span className={styles.value}>{mhc}/100</span>
  </div>
</div>

</div>

	)
}