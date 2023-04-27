import Bottombar from "@/components/bottombar";
import React, { useEffect, useState } from "react";
import styles from '@/styles/chats.module.css'
import { LucideArrowLeft, LucideSearch, LucideUser } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import firebase from "@/firebase/clientApp";
import 'firebase/firestore';
import auth from "@/firebase/detectSignin";
import { Timestamp } from "firebase/firestore";

export default function Chats() {

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

	interface Msg {
		createdAt: Timestamp
		displayName: string;
		photoURL: string;
		uid: string;
		to: string;
		to_photo: string;
		to_uid: string;
	}

	//let now = new Date();
	//let time = now.toTimeString().split(' ')[0];
	
	const router = useRouter();

	const onClickFunction = () => {
		router.replace('/chatbot');
	}

	const goBack = () => {
		router.replace('/home');
	}

	const firestore = firebase.firestore();

	const [user, setUser] = useState<User | null>();
	const [chats, setChats] = useState([]);
	const [msgs, setMsgs] = useState<Msg[] | null>([]);

	useEffect(() => {
		const authenticate = async () => {
		const currentUser = await auth.isLoggedIn();
		console.log('User object:', currentUser);
		setUser(currentUser);
    return currentUser;
		}
		authenticate();

		const fetchChats = async () => {
			if (!user) console.log('user not found')
			const db = firebase.firestore();
const querySnapshot = await db.collection('users').doc(user?.uid).collection('chat').get();
const msgArray: Msg[] = [];

querySnapshot.forEach(doc => {
  msgArray.push(doc.data() as Msg);
});
			// Update state with the array of messages
			setMsgs(msgArray);
			console.log('msgs:', msgs);
		  
		  };
		  
		fetchChats();
  }, [user]);

  
	
  

	return (
		<>
		<Head>
			<title>
				Chats
			</title>
		</Head>
		<div className={styles.header}>
			<div className={styles.top}>
				<LucideArrowLeft onClick={goBack} className={styles.arrow}/>
				<p>Chats</p>
			</div>
		</div>
		<div className={styles.search}>
			<div className={styles.searchInput}>
			<LucideSearch/>
			</div>
		</div>
		 <div className={styles.chatContainer}>
        <div className={styles.chatList}>
          <div className={styles.chat} onClick={onClickFunction}>
            <div className={styles.chatAvatar}>
				<LucideUser></LucideUser>
			</div>
            <div className={styles.chatInfo}>
              <div className={styles.chatName}>ChatBot</div>
              <div className={styles.chatPreview}>
                Hey, I am an AI therapist
              </div>
            </div>
            <div className={styles.chatTime}></div>
          </div>
		  {/* Here i want the list of chats from firestore, users => uid => chat => all the sender uids => messages => all msgs docs with displayName, photoUrl, text, createdAt and uid */}
			<br />
		  {msgs?.map((msg) => {
			const pfp = (msg: Msg) => {
				if (msg.uid === user?.uid) {
					return msg.to_photo
				} else {
					return msg.photoURL
				}
			}
			const name = (msg: Msg) => {
				if (msg.uid === user?.uid) {
					return msg.to
				} else {
					return msg.displayName
				}
			}

			const getUid = (msg: Msg) => {
				if (msg.uid === user?.uid) {
					return msg.to_uid
				} else {
					return msg.uid
				}
			}

			const Name = name(msg);
			const url = pfp(msg);

			const goToChat = () => {
				const uid =  getUid(msg);

				router.replace({
					pathname: '/chat',
					query: {
						therapistUid: uid,
						therapistName: Name,
					  therapistPhotoUrl: url
					  
					}
				  });
			
			  }
			
			return (
				<div>
			<div className={styles.chat} onClick={goToChat}>
			{/*<div className={styles.chatAvatar}>*/}
				<img className={styles.chatAvatar} src={url} alt="" />
			{/*</div>*/}
			<div className={styles.chatInfo}>
				<div className={styles.chatName}>{Name}</div>
				{/*<div className={styles.chatPreview}>{msg.text}</div>*/}
			</div>
			<div className={styles.chatTime}>{msg.createdAt.toDate().toLocaleString().split(',')[0]}</div>
			</div>
			<br />
			</div>
		  )})}
        </div>
        {/*<div className={styles.chatWindow}>
          <div className={styles.messageContainer}>
            <div className={styles.message}>
              <div className={styles.messageText}>
                Hey, how's it going?
              </div>
              <div className={styles.messageTime}>10:30 AM</div>
            </div>
            <div className={styles.message}>
              <div className={styles.messageText}>
                Not bad, you?
              </div>
              <div className={styles.messageTime}>10:31 AM</div>
            </div>
          </div>
          <div className={styles.messageInput}>
            <input type="text" placeholder="Type your message here" />
            <button>Send</button>
          </div>
        </div>*/}
      </div>
		<Bottombar/>
		</>
	)
}