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
			results = [0,0,0,0,0];
		}

	  const user = firebase.auth().currentUser;

	  let openness = '';
	  let conscientiousness = '';
	  let extraversion = '';
	  let agreeableness = '';
	  let neuroticism = '';
  
	  if (results[0] < 40) {
		  openness = 'You don\'t like changes and are not interested in new things. Your imagination might be low but you are very consistent and cautious. You prefer concrete thinking and practicality. You have tendency to conform to social norms and traditions'
	  } else if (results[0] >= 40 && results[0] <= 60) {
		  openness = 'You are somewhat both inventive and consistent and curious with cautiousness. You have a balance between routine and novelty, a willingness to conform to social norms, but also to question them and moderate level of creativity and imagination.'
	  } else if (results[0] > 60) {
		  openness = 'You have high levels of creativity and imagination, a love of learning and deep curiosity about the world. You are willing to to question authority and challenge convention and have a preference for novelty and variety.'
	  }
  
	  if (results[1] < 40) {
	  conscientiousness = 'You tend to be disorganized and impulsive, with a preference for spontaneity and living in the moment over planning and following through on commitments. You may have lower self-control and willpower and less focus on work and career success.'
  } else if (results[1] >= 40 && results[1] <= 60) {
	  conscientiousness = 'You have a moderate level of responsibility and self-discipline, with a balance between being organized and flexible. You tend to set goals and follow through on commitments, but are also willing to adjust plans as needed.'
  } else if (results[1] > 60) {
	  conscientiousness = 'You have a strong sense of responsibility and self-discipline, with a preference for planning ahead and following through on commitments. You have a high level of self-control and willpower, strong attention to detail and a focus on accuracy, and a strong work ethic and drive to succeed.'
  }
  
  // Agreeableness
  if (results[3] < 40) {
	  agreeableness = 'You tend to be skeptical and competitive, with a focus on self-interest over the interests of others. You may be less likely to compromise and more likely to stand your ground on issues.'
  } else if (results[3] >= 40 && results[3] <= 60) {
	  agreeableness = 'You have a moderate level of compassion and cooperation, with a balance between being assertive and accommodating. You tend to be empathetic and considerate of others, but also willing to speak your mind and stand up for yourself.'
  } else if (results[3] > 60) {
	  agreeableness = 'You tend to be empathetic and compassionate, with a focus on the interests of others over your own. You may be more willing to compromise and avoid conflict in order to maintain harmony and build positive relationships.'
  }
  
  // Neuroticism
  if (results[4] < 40) {
	  neuroticism = 'You tend to be emotionally stable and resilient, with a relatively calm and steady demeanor. You may be less likely to experience negative emotions such as anxiety, depression, and anger.'
  } else if (results[4] >= 40 && results[4] <= 60) {
	  neuroticism = 'You have a moderate level of emotional stability, with a balance between being calm and anxious, happy and sad, and confident and self-doubting. You may experience a range of emotions in response to different situations and stressors.'
  } else if (results[4] > 60) {
	  neuroticism = 'You tend to be more emotionally reactive and vulnerable, with a greater likelihood of experiencing negative emotions such as anxiety, depression, and anger. You may be more sensitive to stress and more easily overwhelmed by challenges.'
  }
  
  // Extraversion
  if (results[2] < 40) {
	  extraversion = 'You are introverted and reserved, preferring solitary activities and small groups of close friends. You might find socializing draining and need alone time to recharge. You tend to be more serious and reflective than outgoing and talkative.'
  } else if (results[2] >= 40 && results[2] <= 60) {
	  extraversion = 'You are balanced between extraversion and introversion. You enjoy socializing and spending time with others, but also appreciate alone time to recharge. You tend to be adaptable and flexible in social situations and can adjust your behavior to fit the context.'
  } else if (results[2] > 60) {
	  extraversion = 'You are outgoing and sociable, enjoying large groups of people and being the center of attention. You tend to be assertive and expressive, and may find solitude or downtime less appealing than social activities. You gain energy from socializing and being around others.'
  }

  const traits = [openness, conscientiousness, extraversion, agreeableness, neuroticism];

  const now = new Date();

	const quizResult = {
		date: now.toDateString(),
		traits: traits,
		openness: results[0],
		conscientiousness: results[1],
		extraversion: results[2],
		agreeableness: results[3],
		neuroticism: results[4],
		}

  useEffect(() => {
	firebase.firestore().collection('users').doc(user.uid).collection('ocean-results').doc(now.toDateString()).set(quizResult);
  }, [user])



  return (
	<div className={styles.content}>
<Head>
<title>Ocean-Results</title>
</Head>

<div className={styles.row}>


<div className={styles.container}>
<h1 className={styles.title}>Quiz Results</h1>

<div className={styles.resultContainer}>
<div className={styles.result}>
  <div className={styles.label}>Openness:</div>
  <div className={styles.value}>{results[0]}</div>
</div>
<div className={styles.result}>
  <div className={styles.label}>Conscientiousness:</div>
  <div className={styles.value}>{results[1]}</div>
</div>
<div className={styles.result}>
  <div className={styles.label}>Extraversion:</div>
  <div className={styles.value}>{results[2]}</div>
</div>
<div className={styles.result}>
  <div className={styles.label}>Agreeableness:</div>
  <div className={styles.value}>{results[3]}</div>
</div>
<div className={styles.result}>
  <div className={styles.label}>Neuroticism:</div>
  <div className={styles.value}>{results[4]}</div>
</div>

</div>
</div>
{/*<br/>*/}


<div className={styles.container}>
	<div className={styles.resultContainer}>
		<div className={styles.label}>
			Traits
		</div>
		<div className={styles.resultContainer}>
			<br/>
			<div className={styles.result}>
				1) {openness}
			</div>
			<br/>
			<div className={styles.result}>
				2) {conscientiousness}
			</div>
			<br />
			<div className={styles.result}>
				3) {extraversion}
			</div>
			<br />
			<div className={styles.result}>
				4) {agreeableness}
			</div>
			<br />
			<div className={styles.result}>
				5) {neuroticism}
			</div>
		</div>
	</div>
</div>
</div>

</div>

)
  

}