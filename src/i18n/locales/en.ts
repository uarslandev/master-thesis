export default {
  header: {
    dataAssessment: "Data-based Assessment",
    modelAssessment: "Model-based Assessment",
  },
  sidebar: {
    currentPatient: "Current Patient",
    lastAssessment: "Last Assessment",
    analysisMode: "Analysis Mode",
    aiStatus: "AI Status",
    modelActive: "Model v4.2.0 active. Processing confidence: 94%.",
  },
  modes: {
    screening: {
      label: "Screening",
      description: "Early-stage screening & support",
    },
    learning: {
      label: "Learning",
      description: "Educational views for training",
    },
    assessment: {
      label: "In-depth",
      description: "Complex cases & diagnosis",
    },
  },
  screening: {
    title: "AI-Assisted Screening Overview",
    subtitle: "Based on non-invasive SIT recordings and automated behavioral analysis.",
    metrics: {
      title: "Key Metrics",
      signalQuality: "Signal Quality",
      processingTime: "Processing Time",
      confidence: "AI Confidence",
    },
    confusionMatrix: {
      title: "Performance Overview: Confusion Matrix",
      withASC: "With ASC diagnosis",
      withoutASC: "Without ASC diagnosis",
      aiRecommendsASC: "AI recommends ASC diagnosis",
      aiRecommendsNoASC: "AI recommends no ASC diagnosis",
    },
    aiAssessment: {
      title: "AI Assessment",
      elevated: "ELEVATED INDICATION",
      description: "The AI model indicates an elevated likelihood of autistic features based on gaze, movement, and facial expressivity data.",
      clinicalGuidance: "CLINICAL GUIDANCE",
      guidanceText: "This is a screening result, not a clinical diagnosis. Follow-up with clinical assessment is recommended.",
      generateReport: "Generate Detailed Clinical Report",
    },
  },
  learning: {
    title: "Educational Insights: Understanding the Assessment",
    traits: {
      title: "Behavioral Traits & Quantification",
      patient: "Patient",
      average: "Average",
      educational: "Educational Notes",
      gazePatterns: "Gaze Patterns",
      facialExpressivity: "Facial Expressivity",
      vocalProsody: "Vocal Prosody",
      headMovement: "Head Movement",
      socialReciprocity: "Social Reciprocity",
    },
    differentialDiagnosis: {
      title: "Differential Diagnosis Probabilities",
      description: "These probabilities help guide clinical reasoning but are not definitive. They represent the likelihood that certain conditions could explain the observed behavioral patterns.",
    },
    timeSeries: {
      title: "Behavioral Signal Over Time",
      gaze: "Gaze",
      movement: "Movement",
    },
  },
  assessment: {
    title: "In-Depth Clinical Assessment",
    complexity: "High Complexity Case Analysis",
    description: "Detailed multi-modal assessment combining behavioral, developmental, and contextual factors for complex diagnostic cases.",
  },
};
