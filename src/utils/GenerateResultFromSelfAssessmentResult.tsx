export type AssessmentSummary = {
	totalScore: number;
	description: string;
}

export default function generateResultFromSelfAssessmentResult(assessmentOptionsSelected: string[]): AssessmentSummary {
	let totalScore = 0;
	for (let i = 0; i < assessmentOptionsSelected.length; i++) {
		totalScore += (assessmentOptionsSelected[i].charCodeAt(0) - "a".charCodeAt(0))
	}

	const description = "";
	const assessmentSummary = {
		totalScore,
		description,
	}

	return assessmentSummary;
}