import Bottombar from '@/components/bottombar';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/quiz.module.css';
import Head from 'next/head';
import auth from '@/firebase/detectSignin';

let fields = [50, 50, 50, 50, 50, 50];

export default function Caress_quiz() {

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

	const questions = [
		// Sentiment and Emotional State
  // 1
  {
    question: 'Overall, how would you rate your emotional state this week?',
    answers: [
      {answer: 'Excellent', impact: [0, 0, 0, 0, 0, 10]},
      {answer: 'Good', impact: [0, 0, 0, 0, 0, 5]},
      {answer: 'Fair', impact: [0, 0, 0, 0, 0, 0]},
      {answer: 'Poor', impact: [0, 0, 0, 0, 0, -5]},
      {answer: 'Terrible', impact: [0, 0, 0, 0, 0, -10]}
    ],
  },
  // 2
  {
    question: 'Have you experienced any significant mood swings this week?',
    answers: [
      {answer: 'Extremely', impact: [0, 0, 0, 0, 0, -10]},
      {answer: 'Quite a bit', impact: [0, 0, 0, 0, 0, -5]},
      {answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
      {answer: 'A little', impact: [0, 0, 0, 0, 0, 10]},
      {answer: 'Not at all', impact: [0, 0, 0, 0, 0, 5]}
    ],
  },
  // 3
  {
    question: 'Have you felt easily irritable or frustrated this week?',
    answers: [
      {answer: 'Extremely', impact: [0, 0, 0, 0, 0, -10]},
      {answer: 'Quite a bit', impact: [0, 0, 0, 0, 0, -5]},
      {answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
      {answer: 'A little', impact: [0, 0, 0, 0, 0, 5]},
      {answer: 'Not at all', impact: [0, 0, 0, 0, 0, 10]}
    ],
  },
  // 4
  {
    question: 'Have you experienced any significant stress or anxiety this week?',
    answers: [
      {answer: 'Extremely', impact: [0, 0, 0, 0, 0, -10]},
      {answer: 'Quite a bit', impact: [0, 0, 0, 0, 0, -5]},
      {answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
      {answer: 'A little', impact: [0, 0, 0, 0, 0, 5]},
      {answer: 'Not at all', impact: [0, 0, 0, 0, 0, 10]}
    ],
  },
  // 5
  {
    question: 'Have you felt any significant sense of hopelessness or despair this week?',
    answers: [
      {answer: 'Extremely', impact: [0, 0, 0, 0, 0, -10]},
      {answer: 'Quite a bit', impact: [0, 0, 0, 0, 0, -5]},
      {answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
      {answer: 'A little', impact: [0, 0, 0, 0, 0, 5]},
      {answer: 'Not at all', impact: [0, 0, 0, 0, 0, 10]}
    ],
	},
		// Sleep
// 1
{
	question: 'Have you had trouble falling asleep this week?',
	answers: [
		{answer: 'Extremely', impact: [0, 0, 0, 0, -10, 0]},
		{answer: 'Quite a bit', impact: [0, 0, 0, 0, -5, 0]},
		{answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
		{answer: 'A little', impact: [0, 0, 0, 0, 5, 0]},
		{answer: 'None', impact: [0, 0, 0, 0, 10, 0]}
]
},
// 2
{
	question: 'Have you had trouble staying asleep this week?',
	answers: [
		{answer: 'Extremely', impact: [0, 0, 0, 0, -10, 0]},
		{answer: 'Quite a bit', impact: [0, 0, 0, 0, -5, 0]},
		{answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
		{answer: 'A little', impact: [0, 0, 0, 0, 5, 0]},
		{answer: 'None', impact: [0, 0, 0, 0, 10, 0]}
]
},
// 3
{
	question: 'Have you woken up feeling well-rested this week?',
	answers: [
			{answer: 'Every day', impact: [0, 0, 0, 0, 10, 0]},
			{answer: 'Most days', impact: [0, 0, 0, 0, 5, 0]},
			{answer: 'Some days', impact: [0, 0, 0, 0, 0, 0]},
			{answer: 'Few days', impact: [0, 0, 0, 0, -5, 0]},
			{answer: 'No days', impact: [0, 0, 0, 0, -10, 0]}
	],
},
// 4
{
	question: 'Have you had any nightmares or vivid dreams this week?',
	answers: [
		{answer: 'Extremely', impact: [0, 0, 0, 0, -10, 0]},
		{answer: 'Quite a bit', impact: [0, 0, 0, 0, -5, 0]},
		{answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
		{answer: 'A little', impact: [0, 0, 0, 0, 5, 0]},
		{answer: 'None', impact: [0, 0, 0, 0, 10, 0]}
],
},
// 5
{
	question: 'Have you experienced any sleepwalking or sleep-talking this week?',
	answers: [
		{answer: 'Extremely', impact: [0, 0, 0, 0, -10, 0]},
		{answer: 'Quite a bit', impact: [0, 0, 0, 0, -5, 0]},
		{answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
		{answer: 'A little', impact: [0, 0, 0, 0, 5, 0]},
		{answer: 'None', impact: [0, 0, 0, 0, 10, 0]}
],
},
// Appetite
{
  question: 'Have you had a healthy appetite this week?',
  answers: [
    { answer: 'Absolutely', impact: [0, 10, 0, 0, 0, 0] },
    { answer: 'Mostly yes', impact: [0, 5, 0, 0, 0, 0] },
    { answer: 'Somewhat', impact: [0, 0, 0, 0, 0, 0] },
    { answer: 'Mostly no', impact: [0, -5, 0, 0, 0, 0] },
    { answer: 'Not at all', impact: [0, -10, 0, 0, 0, 0] }
  ]
},
{
  question: 'Have you had any significant weight changes this week?',
  answers: [
    { answer: 'Gained a lot of Weight (I was normal/overweight)', impact: [0, -10, 0, 0, 0, 0] },
    { answer: 'Gained Weight (I was underweight)', impact: [0, 10, 0, 0, 0, 0] },
    { answer: 'No significant change (I was already at a healthy weight)', impact: [0, 10, 0, 0, 0, 0] },
		{ answer: 'No significant change (I was over/underweight)', impact: [0, -5, 0, 0, 0, 0] },
    { answer: 'Lost a lot of Weight (I was normal/underweight)', impact: [0, -10, 0, 0, 0, 0] },
    { answer: 'Lost Weight (I was overweight)', impact: [0, 10, 0, 0, 0, 0] }
  ]
},
{
  question: 'Have you had any difficulty eating or swallowing this week?',
  answers: [
    { answer: 'Extremely difficult', impact: [0, -10, 0, 0, 0, 0] },
    { answer: 'Somewhat difficult', impact: [0, -5, 0, 0, 0, 0] },
    { answer: 'No difficulty', impact: [0, 0, 0, 0, 0, 0] },
    { answer: 'Somewhat easy', impact: [0, 5, 0, 0, 0, 0] },
    { answer: 'Extremely easy', impact: [0, 10, 0, 0, 0, 0] }
  ]
},
{
  question: 'Have you had any noticeable changes in your eating habits this week?',
  answers: [
    { answer: 'Yes, more unhealthy food', impact: [0, -10, 0, 0, 0, 0] },
    { answer: 'Yes, more healthy food', impact: [0, 10, 0, 0, 0, 0] },
    { answer: 'No noticeable change', impact: [0, 0, 0, 0, 0, 0] },
    { answer: 'Yes, less healthy food', impact: [0, -5, 0, 0, 0, 0] },
    { answer: 'Yes, skipped meals', impact: [0, -10, 0, 0, 0, 0] }
  ]
},
{
  question: 'Have you experienced any significant cravings or aversions to certain foods this week?',
  answers: [
    { answer: 'Absolutely, cravings', impact: [0, -5, 0, 0, 0, 0] },
		{ answer: 'Somewhat, cravings', impact: [0, -2, 0, 0, 0, 0] },
		{ answer: 'None', impact: [0, 10, 0, 0, 0, 0] },
		{ answer: 'Somewhat, aversions', impact: [0, -2, 0, 0, 0, 0] },
		{ answer: 'Absolutely, aversions', impact: [0, -5, 0, 0, 0, 0] }
		]
		},

	// Energy and motivation

	{
		question: 'Overall, how would you rate your energy level this week?',
		answers: [
			{answer: 'Extremely high', impact: [0, 0, 0, 10, 0, 0]},
			{answer: 'Somewhat high', impact: [0, 0, 0, 5, 0, 0]},
			{answer: 'Neutral', impact: [0, 0, 0, 0, 0, 0]},
			{answer: 'Somewhat low', impact: [0, 0, 0, -5, 0, 0]},
			{answer: 'Extremely low', impact: [0, 0, 0, -10, 0, 0]}
	]
		},
		{
		question: 'Have you experienced any significant fatigue or lethargy this week?',
		answers: [
		{answer: 'Yes, frequently', impact: [0, 0, 0, -10, 0, 0]},
		{answer: 'Yes, occasionally', impact: [0, 0, 0, -5, 0, 0]},
		{answer: 'No', impact: [0, 0, 0, 10, 0, 0]}
		]
		},
		{
		question: 'Have you had any trouble concentrating or staying focused this week?',
		answers: [
		{answer: 'Yes, frequently', impact: [0, 0, 0, -10, 0, 0]},
		{answer: 'Yes, occasionally', impact: [0, 0, 0, -5, 0, 0]},
		{answer: 'No', impact: [0, 0, 0, 10, 0, 0]}
		]
		},
		{
		question: 'Have you felt a lack of motivation or drive this week?',
		answers: [
		{answer: 'Yes, frequently', impact: [0, 0, 0, -10, 0, 0]},
		{answer: 'Yes, occasionally', impact: [0, 0, 0, -5, 0, 0]},
		{answer: 'No', impact: [0, 0, 0, 10, 0, 0]},
		]
		},
		{
		question: 'Have you had any trouble completing daily tasks or responsibilities this week?',
		answers: [
		{answer: 'Yes, frequently', impact: [0, 0, 0, -10, 0, 0]},
		{answer: 'Yes, occasionally', impact: [0, 0, 0, -5, 0, 0]},
		{answer: 'No', impact: [0, 0, 0, 10, 0, 0]}
		]
		},

		// Relationships and Social Support
// 1
{
  question: 'Have you had any significant conflicts or disagreements with loved ones this week?',
  answers: [
    {answer: 'A lot', impact: [0, 0, -10, 0, 0, 0]},
    {answer: 'Quite a bit', impact: [0, 0, -5, 0, 0, 0]},
    {answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
    {answer: 'A little', impact: [0, 0, 5, 0, 0, 0]},
    {answer: 'None', impact: [0, 0, 10, 0, 0, 0]}
  ]
},
// 2
{
  question: 'Have you had any positive social interactions this week?',
  answers: [
    {answer: 'A lot', impact: [0, 0, 10, 0, 0, 0]},
    {answer: 'Quite a bit', impact: [0, 0, 5, 0, 0, 0]},
    {answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
    {answer: 'A little', impact: [0, 0, -5, 0, 0, 0]},
    {answer: 'None', impact: [0, 0, -10, 0, 0, 0]}
  ]
},
// 3
{
  question: 'Have you felt supported by your friends or family this week?',
  answers: [
    {answer: 'Extremely', impact: [0, 0, 10, 0, 0, 0]},
    {answer: 'Quite a bit', impact: [0, 0, 5, 0, 0, 0]},
    {answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
    {answer: 'A little', impact: [0, 0, -5, 0, 0, 0]},
    {answer: 'None', impact: [0, 0, -10, 0, 0, 0]}
  ]
},
// 4
{
  question: 'Have you felt a sense of loneliness or isolation this week?',
  answers: [
    {answer: 'Extremely', impact: [0, 0, -10, 0, 0, 0]},
    {answer: 'Quite a bit', impact: [0, 0, -5, 0, 0, 0]},
    {answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
    {answer: 'A little', impact: [0, 0, 5, 0, 0, 0]},
    {answer: 'None', impact: [0, 0, 10, 0, 0, 0]}
  ]
},
// 5
{
  question: 'Have you had any trouble maintaining healthy relationships this week?',
  answers: [
    {answer: 'Extremely', impact: [0, 0, -10, 0, 0, 0]},
    {answer: 'Quite a bit', impact: [0, 0, -5, 0, 0, 0]},
    {answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
    {answer: 'A little', impact: [0, 0, 5, 0, 0, 0]},
    {answer: 'None', impact: [0, 0, 10, 0, 0, 0]}
  ]
		},

		// Self-Care and Coping Strategies
// 1
{
	question: 'Have you engaged in any healthy self-care activities this week?',
	answers: [
	{answer: 'A lot', impact: [10, 0, 0, 0, 0, 0]},
	{answer: 'Quite a bit', impact: [5, 0, 0, 0, 0, 0]},
	{answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
	{answer: 'A little', impact: [-5, 0, 0, 0, 0, 0]},
	{answer: 'None', impact: [-10, 0, 0, 0, 0, 0]}
	]
	},
	// 2
	{
	question: 'Have you utilised any coping strategies to manage stress or difficult emotions this week?',
	answers: [
	{answer: 'A lot', impact: [10, 0, 0, 0, 0, 0]},
	{answer: 'Quite a bit', impact: [5, 0, 0, 0, 0, 0]},
	{answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
	{answer: 'A little', impact: [-5, 0, 0, 0, 0, 0]},
	{answer: 'None', impact: [-10, 0, 0, 0, 0, 0]}
	]
	},
	// 3
	{
	question: 'Have you struggled to implement healthy self-care habits this week?',
	answers: [
	{answer: 'Extremely', impact: [-10, 0, 0, 0, 0, 0]},
	{answer: 'Quite a bit', impact: [-5, 0, 0, 0, 0, 0]},
	{answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
	{answer: 'A little', impact: [5, 0, 0, 0, 0, 0]},
	{answer: 'None', impact: [10, 0, 0, 0, 0, 0]}
	]
	},
	// 4
	{
	question: 'Have you found any new coping strategies that have been helpful this week?',
	answers: [
	{answer: 'A lot', impact: [10, 0, 0, 0, 0, 0]},
	{answer: 'Quite a bit', impact: [5, 0, 0, 0, 0, 0]},
	{answer: 'Moderately', impact: [0, 0, 0, 0, 0, 0]},
	{answer: 'A little', impact: [-5, 0, 0, 0, 0, 0]},
	{answer: 'None', impact: [-10, 0, 0, 0, 0, 0]}
	]
	},
	// 5
	{
	question: 'Have you felt a sense of hope or optimism about your mental health this week?',
	answers: [
	{answer: 'A lot', impact: [10, 0, 0, 0, 0, 0]},
	{answer: 'Quite a bit', impact: [5, 0, 0, 0,0, 0]},
	{answer: 'Moderately', impact: [3, 0, 0, 0, 0, 0]},
	{answer: 'A little', impact: [1, 0, 0, 0, 0, 0]},
	{answer: 'Not at all', impact: [-5, 0, 0, 0, 0, 0]}
	]
	}

	]

	const [questionNumber, setQuestionNumber] = useState(0);

	const isClicked: number[] = Array(30).fill(0);

	const onClick = async (array: Array<number>) => {
		if (isClicked[questionNumber] === 0) {
			if (questionNumber + 1 === questions.length) {
			for (let i = 0; i < fields.length; i++) {
				fields[i] += array[i];
			  }
			isClicked[questionNumber] = 1;
		  router.replace({pathname: '/caress-result', query: { result: fields }});
		} else {
			for (let i = 0; i < fields.length; i++) {
				fields[i] += array[i];
			  }
			  isClicked[questionNumber] = 1;
			const n = questionNumber + 1
			setQuestionNumber(n);
		}}
	  };

	return (
		<div className={styles.content}>
			<Head>
				<title>Caress-Quiz</title>
			</Head>
			<div className={styles.progress_bar}>
  <div className={styles.progress} style={{ width: `${(questionNumber / questions.length) * 100}%` }}></div>
</div>

		<div className={styles.container}>
			<div className={styles.question}>
				Q{questionNumber + 1}) {questions[questionNumber].question}
			</div>
		</div>
		<div className={styles.answers}>
						{questions[questionNumber].answers.map((a) => (
							<button type="button" className={styles.btn} onClick={() => onClick(a.impact)}>{a.answer}</button>
						))}
					</div>
		<Bottombar/>
		</div>
	)
}