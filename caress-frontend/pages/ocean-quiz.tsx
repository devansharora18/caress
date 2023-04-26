import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '@/styles/quiz.module.css';
import Bottombar from '@/components/bottombar';
import Head from 'next/head';

let fields = [50, 50, 50, 50, 50];


export default function Ocean_quiz() {

	const questions = [
		// 1
		{
			question: 'You enjoy trying out new things',
			answers: [
				{answer: 'Totally Agree', impact: [10, 0, 0, 0, 0]},
				{answer: 'Somewhat Agree', impact: [5, 0, 0, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [-5, 0, 0, 0, 0]},
				{answer: 'Totally Disagree', impact: [-10, 0, 0, 0, 0]}
			],
		},
		// 2
		{
			question: 'You like art',
			answers: [
				{answer: 'Totally Agree', impact: [10, 0, 0, 0, 0]},
				{answer: 'Somewhat Agree', impact: [5, 0, 0, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [-5, 0, 0, 0, 0]},
				{answer: 'Totally Disagree', impact: [-10, 0, 0, 0, 0]}
			],
		},
		// 3
		{
			question: 'You have a curious nature and are interested in many things',
			answers: [
				{answer: 'Totally Agree', impact: [10, 0, 0, 0, 0]},
				{answer: 'Somewhat Agree', impact: [5, 0, 0, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [-5, 0, 0, 0, 0]},
				{answer: 'Totally Disagree', impact: [-10, 0, 0, 0, 0]}
			],
		},
		// 4
		{
			question: 'You dislike change',
			answers: [
				{answer: 'Totally Agree', impact: [-10, 0, 0, 0, 0]},
				{answer: 'Somewhat Agree', impact: [-5, 0, 0, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [5, 0, 0, 0, 0]},
				{answer: 'Totally Disagree', impact: [10, 0, 0, 0, 0]}
			],
		},
		// 5
		{
			question: 'You are open to experiencing different cultures and ways of life',
			answers: [
				{answer: 'Totally Agree', impact: [10, 0, 0, 0, 0]},
				{answer: 'Somewhat Agree', impact: [5, 0, 0, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [-5, 0, 0, 0, 0]},
				{answer: 'Totally Disagree', impact: [-10, 0, 0, 0, 0]}
			],
		},
		// 6
		{
			question: 'You like order and follow a structured way of doing things',
			answers: [
				{answer: 'Totally Agree', impact: [0, 10, 0, 0, 0]},
				{answer: 'Somewhat Agree', impact: [0, 5, 0, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, -5, 0, 0, 0]},
				{answer: 'Totally Disagree', impact: [0, -10, 0, 0, 0]}
			],
		},
		// 7
		{
			question: 'You like to always be prepared',
			answers: [
				{answer: 'Totally Agree', impact: [0, 10, 0, 0, 0]},
				{answer: 'Somewhat Agree', impact: [0, 5, 0, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, -5, 0, 0, 0]},
				{answer: 'Totally Disagree', impact: [0, -10, 0, 0, 0]}
			],
		},
		// 8
		{
			question: 'You are often careless about things',
			answers: [
				{answer: 'Totally Agree', impact: [0, -10, 0, 0, 0]},
				{answer: 'Somewhat Agree', impact: [0, -5, 0, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 5, 0, 0, 0]},
				{answer: 'Totally Disagree', impact: [0, 10, 0, 0, 0]}
			],
		},
		// 9
		{
			question: 'You like to finish your tasks as soon as possible',
			answers: [
				{answer: 'Totally Agree', impact: [0, 10, 0, 0, 0]},
				{answer: 'Somewhat Agree', impact: [0, 5, 0, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, -5, 0, 0, 0]},
				{answer: 'Totally Disagree', impact: [0, -10, 0, 0, 0]}
			],
		},
		// 10
		{
			question: 'You are very competitive in everything you do',
			answers: [
				{answer: 'Totally Agree', impact: [0, 10, 0, 0, 0]},
				{answer: 'Somewhat Agree', impact: [0, 5, 0, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, -5, 0, 0, 0]},
				{answer: 'Totally Disagree', impact: [0, -10, 0, 0, 0]}
			],
		},
		// 11
		{
			question: 'You think a lot before speaking anything',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, -10, 0, 0]},
				{answer: 'Somewhat Agree', impact: [0, 0, -5, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 5, 0, 0]},
				{answer: 'Totally Disagree', impact: [0, 0, 10, 0, 0]}
			],
		},
		// 12
		{
			question: 'You like to start conversations',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 10, 0, 0]},
				{answer: 'Somewhat Agree', impact: [0, 0, 5, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, -5, 0, 0]},
				{answer: 'Totally Disagree', impact: [0, 0, -10, 0, 0]}
			],
		},
		// 13
		{
			question: 'You prefer working alone',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, -10, 0, 0]},
				{answer: 'Somewhat Agree', impact: [0, 0, -5, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 5, 0, 0]},
				{answer: 'Totally Disagree', impact: [0, 0, 10, 0, 0]}
			],
		},
		// 14
		{
			question: 'You like to socialise at parties',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 10, 0, 0]},
				{answer: 'Somewhat Agree', impact: [0, 0, 5, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, -5, 0, 0]},
				{answer: 'Totally Disagree', impact: [0, 0, -10, 0, 0]}
			],
		},
		// 15
		{
			question: 'You try not to stand out',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, -10, 0, 0]},
				{answer: 'Somewhat Agree', impact: [0, 0, -5, 0, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 5, 0, 0]},
				{answer: 'Totally Disagree', impact: [0, 0, 10, 0, 0]}
			],
		},
		// 16
		{
			question: 'You are generally interested in others',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 0, 10, 0]},
				{answer: 'Somewhat Agree', impact: [0, 0, 0, 5, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 0, -5, 0]},
				{answer: 'Totally Disagree', impact: [0, 0, 0, -10, 0]}
			],
		},
		// 17
		{
			question: 'You stop what you are doing to help other people',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 0, 10, 0]},
				{answer: 'Somewhat Agree', impact: [0, 0, 0, 5, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 0, -5, 0]},
				{answer: 'Totally Disagree', impact: [0, 0, 0, -10, 0]}
			],
		},
		// 18
		{
			question: 'You like to treat everyone with kindness',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 0, 10, 0]},
				{answer: 'Somewhat Agree', impact: [0, 0, 0, 5, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 0, -5, 0]},
				{answer: 'Totally Disagree', impact: [0, 0, 0, -10, 0]}
			],
		},
		// 19
		{
			question: 'You avoid conflicts',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 0, -10, 0]},
				{answer: 'Somewhat Agree', impact: [0, 0, 0, -5, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 0, 5, 0]},
				{answer: 'Totally Disagree', impact: [0, 0, 0, 10, 0]}
			],
		},
		// 20
		{
			question: 'You generally don\'t care about how others feel',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 0, -10, 0]},
				{answer: 'Somewhat Agree', impact: [0, 0, 0, -5, 0]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 0, 5, 0]},
				{answer: 'Totally Disagree', impact: [0, 0, 0, 10, 0]}
			],
		},
		// 21
		{
			question: 'Your mood changes easily',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 0, 0, 10]},
				{answer: 'Somewhat Agree', impact: [0, 0, 0, 0, 5]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 0, 0, -5]},
				{answer: 'Totally Disagree', impact: [0, 0, 0, 0, -10]}
			],
		},
		// 22
		{
			question: 'You get irritated easily',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 0, 0, 10]},
				{answer: 'Somewhat Agree', impact: [0, 0, 0, 0, 5]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 0, 0, -5]},
				{answer: 'Totally Disagree', impact: [0, 0, 0, 0, -10]}
			],
		},
		// 23
		{
			question: 'You often worry about things unnecessarily',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 0, 0, 10]},
				{answer: 'Somewhat Agree', impact: [0, 0, 0, 0, 5]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 0, 0, -5]},
				{answer: 'Totally Disagree', impact: [0, 0, 0, 0, -10]}
			],
		},
		// 24
		{
			question: 'You are able to handle stress well',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 0, 0, -10]},
				{answer: 'Somewhat Agree', impact: [0, 0, 0, 0, -5]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 0, 0, 5]},
				{answer: 'Totally Disagree', impact: [0, 0, 0, 0, 10]}
			],
		},
		// 25
		{
			question: 'You get upset easily',
			answers: [
				{answer: 'Totally Agree', impact: [0, 0, 0, 0, 10]},
				{answer: 'Somewhat Agree', impact: [0, 0, 0, 0, 5]},
				{answer: 'Neutral', impact: [0, 0, 0, 0, 0]},
				{answer: 'Somewhat Disagree', impact: [0, 0, 0, 0, -5]},
				{answer: 'Totally Disagree', impact: [0, 0, 0, 0, -10]}
			],
		},
	]

	const [questionNumber, setQuestionNumber] = useState(0);

	const isClicked: number[] = Array(25).fill(0);
	const router = useRouter();

	const onClick = async (array: Array<number>) => {
		if (isClicked[questionNumber] === 0) {
			if (questionNumber + 1 === questions.length) {
			for (let i = 0; i < fields.length; i++) {
				fields[i] += array[i];
			  }
			isClicked[questionNumber] = 1;
		  router.replace({pathname: '/ocean-result', query: { result: fields }});
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
				<title>Ocean-Quiz</title>
				
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