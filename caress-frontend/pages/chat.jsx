import Head from 'next/head';
import React, { useRef, useState, useEffect } from 'react';
import styles from '@/styles/chats.module.css';
import { LucideArrowLeft, LucideSend, LucideUser } from 'lucide-react';
import { useRouter } from 'next/router';
import firebase from '@/firebase/clientApp';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Query } from '@firebase/firestore';
import 'firebase/firestore';
import auth from '@/firebase/detectSignin';

export default function ChatBot() {
  const router = useRouter();

  const goBack = () => {
    router.replace("/chats");
  }

  const [user, setUser] = useState(null);
  const [formValue, setFormValue] = useState('');
  const dummy = useRef();
  const firestore = firebase.firestore();



  useEffect(() => {
    const authenticate = async () => {
      const currentUser = await auth.isLoggedIn();
      console.log('User object:', currentUser);
      setUser(currentUser);
      return currentUser;
    }
    authenticate();
  }, []);

	const { therapistUid, therapistName, therapistPhotoUrl } = router.query;
  const therapistId = therapistUid; // Update this with the selected therapist's ID
	const messagesRef = firestore.collection('users').doc(user?.uid).collection('chat').doc(therapistId).collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(25);
	let [messages] = useCollectionData(query, { idField: 'id' });
  //messages = messages?.reverse();
  const [data, setData] = useState("");

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, displayName, photoURL } = user;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      displayName,
      photoURL,
    });

		firestore.collection('users').doc(user?.uid).collection('chat').doc(therapistId).set({
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			displayName,
			photoURL,
			uid,
			to: therapistName,
			to_photo:  therapistPhotoUrl,
			to_uid: therapistId,
		})

		firestore.collection('users').doc(therapistId).collection('chat').doc(user?.uid).collection('messages').add({
			text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      displayName,
      photoURL,
			
		})

		firestore.collection('users').doc(therapistId).collection('chat').doc(user?.uid).set({
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			displayName : therapistName,
			photoURL: therapistPhotoUrl,
			uid: therapistId,
			to: displayName,
			to_photo:  photoURL,
			to_uid: uid,
		})
  
  
      dummy.current.scrollIntoView({ behavior: 'smooth' })


    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  const photoURL = user?.photoURL;

  function ChatMessage(props) {
		const { text, uid, displayName, photoURL } = props.message;
		const messageClass = uid === user.uid ? styles.sent : styles.received;


return (
  <div className={`${styles.message} ${messageClass}`}>
{photoURL ? <img className={styles.img} src={photoURL} /> : <div className={styles.chatAvatars}> <LucideUser/> </div>}
				<p className={styles.text}>{text}</p>
			</div>
);
	}

	return (
		<>
		<Head>
			<title>
				Chat
			</title>
		</Head>
		<div className={styles.headerr}>
			<div className={styles.icon}>
				<LucideArrowLeft onClick={goBack} className={styles.arrow} />
				{/*<div className={styles.chatAvatar}>*/}
					<img className={styles.chatAvatar} src={therapistPhotoUrl} alt="" />
				{/*</div>*/}
				<p className={styles.name}>
					{therapistName}
				</p>
			</div>
		</div>
		<div className={styles.messageArea}>
		{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
		</div>
<span ref={dummy}></span>
		<form className={styles.form} onSubmit={sendMessage}>

      <input className={styles.input} value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message..." />

      <button className={styles.button} type="submit" disabled={!formValue}><LucideSend/></button>

    </form>
		</>
	);
				}