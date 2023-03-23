import {
  createTheme,
  ThemeProvider,
  colors,
  Container,
  Paper,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel, Radio, Snackbar
} from "@mui/material";
import * as React from "react";
import { patientTheme } from "../Themes";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import {
  setCurrentQuestionIndex,
  setAnswer,
  submitAssessment,
  setAllAnswer, removeAssessment, reset
} from "../features/patient/assessmentSlice";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUserLogIn } from "../features/auth/userLogInSlice";
import { redirect } from "react-router";
import { useNavigate } from "react-router-dom";
import { roleToPosition } from "../constants/PositionRoleMap";
import { userRegisterReset } from "../features/auth/userRegisterSlice";
import { listAllPersonnel } from "../features/manager/personnelsSlice";

export const questions = [
  {
    id: 1,
    text: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Little interest or pleasure in doing things?"
  },
  {
    id: 2,
    text: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling down, depressed or hopeless?"
  },
  {
    id: 3,
    text: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble falling asleep, staying asleep, or sleeping too much?"
  },
  {
    id: 4,
    text: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling tired or having little energy?"
  },
  {
    id: 5,
    text: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Poor appetite or overeating?"
  },
  {
    id: 6,
    text: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling bad about yourself - or that you're a failure or have let yourself or your family down?"
  },
  {
    id: 7,
    text: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble concentrating on things, such as reading the newspaper or watching television?"
  },
  {
    id: 8,
    text: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual?"
  },
  {
    id: 9,
    text: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Thoughts that you would be better off dead or of hurting yourself in some way?"
  }

];

export const ansList = ["Not At all", "Several Days", "More Than Half the Days", "Nearly Every Day"];
export default function PatientAssessmentScreen(props: any) {
  const { userInfo } = useAppSelector(selectUserLogIn)
  const dispatch: AppDispatch = useDispatch();
  const assessment = useAppSelector((state: RootState) => state.assessment);
  const { currentQuestionIndex, answers, message, loading, error, success, cancelSuccess } = assessment;
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const [answer, setAnswerText] = useState(answers[currentQuestion.id] || "");

  const [snackBar, setSnackBar] = useState(false);
  const navigate = useNavigate();
  const [taken, setTaken] = useState<boolean | undefined>(userInfo?.userData.assessmentTaken);

  const handleSnackbarClose = () => {
    setSnackBar(false);
  }

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
    if (userInfo) {
      const email = userInfo.userData.email;
      const assessmentOptionsSelected = questions.map((question) => answers[question.id]);
      dispatch(submitAssessment({ email, assessmentOptionsSelected }, userInfo.token));
      setTimeout(() => {
        setSnackBar(true);
      }, 1000)

    }
  };
  const onCancel = () => {
    if(userInfo){
      const email = userInfo.userData.email;
      dispatch(removeAssessment(email, userInfo.token));
      setTimeout(() => {
        setSnackBar(true);
      }, 1000)
      if(cancelSuccess){
        dispatch(setCurrentQuestionIndex(0));
        setShowSummary(false);
        setTaken(false);
        dispatch(reset());
      }
    }
  }

  const onReview = () => {
    dispatch(setAnswer({ index: currentQuestion.id, answer }));
    setShowSummary(true);
  };

  useEffect(() => {
    setAnswerText(answers[currentQuestion.id] || "");
  }, [currentQuestionIndex, answers]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/patient/dashboard");
      }, 4000);
    }
  }, [success])
  const renderContent = () => {
    if(userInfo){
      if(taken) {
        dispatch(setAllAnswer(userInfo.userData.assessmentOptionsSelected));
        dispatch(setCurrentQuestionIndex(8));
        dispatch(setAllAnswer([]));
      }
    }
    if (showSummary || taken || success) {
      return (
        <Box>
          <Typography variant="h4" my={5}>Summary</Typography>
          <Stack spacing={2}>
            {questions.map((question) => (
              <Paper key={question.id} sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">{question.text}</Typography>
                <Typography
                  variant="body1">{answers[question.id] ? `${answers[question.id].toUpperCase()}. ${ansList[answers[question.id].charCodeAt(0) - 97]}` : ""}</Typography>
              </Paper>
            ))}
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2} mt={2}>
            <Button variant="contained"
              color="primary"
              onClick={onSubmit}
              sx={{ textTransform: "none" }}>
              Submit
            </Button>
            <Button variant="contained"
              color="primary"
              onClick={onCancel}
              sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setShowSummary(false);
              }}
              sx={{ textTransform: "none" }}
              disabled={success || taken}
            >
              Edit Answers
            </Button>
          </Stack>
        </Box>
      )
        ;
    }
    return (
      <Box>
        <Typography variant="h4" my={5}>Self-Assessment Form</Typography>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <CardContent>
            <FormControl component="fieldset">
              <Typography variant="h5" pb={3}>{currentQuestion.text}</Typography>
              <RadioGroup
                name={`question-${currentQuestion.id}`}
                value={answer}
                onChange={(event) => onAnswerChange(event)}
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
        </Paper>
        <Stack direction="row" justifyContent="space-between" spacing={2} mt={2}>
          <Button variant="outlined"
            color="secondary"
            onClick={onPrevious}
            disabled={currentQuestionIndex === 0}
            sx={{ textTransform: "none" }}>
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={currentQuestionIndex === questions.length - 1 ? onReview : onNext}
            sx={{ textTransform: "none" }}
            disabled={!answer}
          >
            {currentQuestionIndex === questions.length - 1 ? "Review" : "Next"}
          </Button>
        </Stack>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={patientTheme}>
      <Container>
        {renderContent()}
        <Snackbar
          open={snackBar}
          message={message}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        />

      </Container>
    </ThemeProvider>
  );


}

