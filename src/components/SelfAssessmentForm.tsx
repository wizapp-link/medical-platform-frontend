import { Box, Typography, Paper, CardContent, FormControl, RadioGroup, FormControlLabel, Radio, Stack, Button, CardActions } from "@mui/material";
import React, { useState } from "react";
import questions from "../constants/Questions";
import { ansList } from "../constants/Questions";

interface Props {
	answerArr: string[],
}

export default function SelfAssessmentForm(props: Props) {

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	// const [answerArr, setAnswerArr] = useState(['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c', 'c',]);
	const { answerArr } = props;

	const onPrevious = () => {
		setCurrentQuestionIndex(lastIndex => lastIndex - 1);
	}
	const onNext = () => {
		setCurrentQuestionIndex(lastIndex => lastIndex + 1);
	}

	return (
		<Box>
			<Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
				<CardContent sx={{ minHeight: "22rem" }}>
					<FormControl component="fieldset">
						<Typography variant="h5" pb={3}>{questions[currentQuestionIndex].text}</Typography>
						<RadioGroup
							name={`question-${currentQuestionIndex + 1}`}
							value={answerArr[currentQuestionIndex]}
						// onChange={(event) => onAnswerChange(event)}
						>
							{ansList.map((option, index) => (
								<FormControlLabel
									key={index}
									value={String.fromCharCode(97 + index)}
									control={<Radio />}
									label={`${String.fromCharCode(97 + index).toUpperCase()}. ${option}`}
								/>
							))}
						</RadioGroup>
					</FormControl>
				</CardContent>
				<CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Stack direction="row" justifyContent="space-between" spacing={2} >
						<Button variant="outlined"
							color="secondary"
							onClick={onPrevious}
							disabled={currentQuestionIndex === 0}
							sx={{ textTransform: "none" }}
						>
							Previous
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={onNext}
							sx={{ textTransform: "none" }}
							disabled={currentQuestionIndex === questions.length - 1}
						>
							{"Next"}
						</Button>
					</Stack>
				</CardActions>
			</Paper>

		</Box>
	);
}