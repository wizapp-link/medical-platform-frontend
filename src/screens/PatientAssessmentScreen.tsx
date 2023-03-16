import { createTheme, ThemeProvider, colors, Container, Paper, Stack } from "@mui/material";
import * as React from "react";
import { patientTheme } from "../Themes";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { setCurrentQuestionIndex, setAnswer, submitAssessment } from "../features/patient/assessmentSlice";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";

const questions = [
  { id: 1, text: "Question 1" },
  { id: 2, text: "Question 2" },
  { id: 3, text: "Question 3" }
];
export default function PatientAssessmentScreen(props: any) {
  const dispatch: AppDispatch = useDispatch();
  const assessment = useAppSelector((state: RootState) => state.assessment)
  const { currentQuestionIndex, answers, errorMessage, loading, error } = assessment;
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const [answer, setAnswerText] = useState(answers[currentQuestion.id] || "");

  const onAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerText(event.target.value);
  };

  const onNext = () => {
    dispatch(setAnswer({ index: currentQuestion.id, answer }));
    dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
  };

  const onPrevious = () => {
    dispatch(setAnswer({ index: currentQuestion.id, answer }));
    dispatch(setCurrentQuestionIndex(currentQuestionIndex - 1));
  };

  const onSubmit = () => {
    dispatch(
      submitAssessment(
        questions.map((question) => ({
          questionId: question.id,
          answer: answers[question.id],
        }))
      )
    );
    // if(error == false)

  };

  const onReview = () => {
    dispatch(setAnswer({ index: currentQuestion.id, answer }));
    setShowSummary(true);
  };

  useEffect(() => {
    setAnswerText(answers[currentQuestion.id] || "");
  }, [currentQuestionIndex, answers]);
  const renderContent = () => {

    if (showSummary) {
      return (
        <Box>
          <Typography variant="h4" mb={2}>Summary</Typography>
          <Stack spacing={2}>
            {questions.map((question) => (
              <Paper key={question.id} sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">{question.text}</Typography>
                <Typography variant="body1">{answers[question.id]}</Typography>
              </Paper>
            ))}
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2} mt={2}>
            <Button variant="contained" color="primary" onClick={onSubmit} sx={{ textTransform: 'none' }}>
              Submit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setShowSummary(false);
              }}
              sx={{ textTransform: 'none' }}
            >
              Edit Answers
            </Button>
          </Stack>
        </Box>
      );
    }
      return (
        <Box>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5">{currentQuestion.text}</Typography>
              <TextField
                label="Answer"
                multiline
                rows={4}
                value={answer}
                onChange={onAnswerChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </CardContent>
          </Paper>
          <Stack direction="row" justifyContent="space-between" spacing={2} mt={2}>
            <Button variant="outlined" color="secondary" onClick={onPrevious} disabled={currentQuestionIndex === 0} sx={{ textTransform: 'none' }}>
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={currentQuestionIndex === questions.length - 1 ? onReview : onNext}
              sx={{ textTransform: 'none' }}
            >
              {currentQuestionIndex === questions.length - 1 ? "Review" : "Next"}
            </Button>
          </Stack>
        </Box>
      );
  }

  return (
    <ThemeProvider theme={patientTheme}>
      <Container>
        {renderContent()}
      </Container>
    </ThemeProvider>
  );



}

