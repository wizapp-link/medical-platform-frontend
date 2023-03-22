export type AssessmentSummary = {
	totalScore: number;
	description: string;
}

export default function generateResultFromSelfAssessmentResult(assessmentOptionsSelected: string[]): AssessmentSummary {
	let totalScore = 0;
	for (let i = 0; i < assessmentOptionsSelected.length; i++) {
		totalScore += (assessmentOptionsSelected[i].charCodeAt(0) - "a".charCodeAt(0))
	}

	let description = "";
	const assessmentSummary = {
		totalScore,
		description,
	}

	if (totalScore >= 0 && totalScore <= 4){
		description = "None-minimal; None"
	}
	else if(totalScore >= 5 && totalScore <= 9){
		description = "Mild; Watchful waiting; repeat self-assessment at follow-up"
	}
	else if(totalScore >= 10 && totalScore <= 14){
		description = "Moderate; Treatment plan, considering counseling, follow-up and/or pharmacotherapy"
	}
	else if(totalScore >= 15 && totalScore <= 19){
		description = "Moderately Severe; Active treatment with pharmacotherapy and/or psychotherapy"
	}
	else if(totalScore >= 20 && totalScore <= 27){
		description = "Severe; Immediate initiation of pharmacotherapy and, if severe impairment or poor response to therapy, expedited referral to a mental health specialist for psychotherapy and/or collaborative management"
	}

	return assessmentSummary;
}