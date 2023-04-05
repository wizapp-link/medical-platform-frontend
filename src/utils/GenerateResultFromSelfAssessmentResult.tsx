export type AssessmentSummary = {
	totalScore: number;
	description: string;
	status: string;
}

export default function generateResultFromSelfAssessmentResult(assessmentOptionsSelected: string[]): AssessmentSummary {
	let totalScore = 0;
	for (let i = 0; i < assessmentOptionsSelected.length; i++) {
		if (assessmentOptionsSelected[i]) {
			totalScore += (assessmentOptionsSelected[i].charCodeAt(0) - "a".charCodeAt(0));
		}
	}

	const assessmentSummary = {
		totalScore,
		status: "",
		description: ""
	}

	if (totalScore >= 0 && totalScore <= 4) {
		assessmentSummary.status = "None-minimal";
		assessmentSummary.description = "None"
	}
	else if (totalScore >= 5 && totalScore <= 9) {
		assessmentSummary.status = "Mild";
		assessmentSummary.description = "Watchful waiting; repeat self-assessment at follow-up"
	}
	else if (totalScore >= 10 && totalScore <= 14) {
		assessmentSummary.status = "Moderate";
		assessmentSummary.description = "Treatment plan, considering counseling, follow-up and/or pharmacotherapy"
	}
	else if (totalScore >= 15 && totalScore <= 19) {
		assessmentSummary.status = "Moderately Severe";
		assessmentSummary.description = "Active treatment with pharmacotherapy and/or psychotherapy"
	}
	else if (totalScore >= 20 && totalScore <= 27) {
		assessmentSummary.status = "Severe";
		assessmentSummary.description = "Immediate initiation of pharmacotherapy and, if severe impairment or poor response to therapy, expedited referral to a mental health specialist for psychotherapy and/or collaborative management"
	}

	return assessmentSummary;
}