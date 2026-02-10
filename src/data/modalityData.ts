import gazeHeatmap from './images/gaze-heatmap.png';
import facialIntensity from './images/facial positive intensity.png';

export const modalityData = {
  gaze: {
    image: gazeHeatmap,
    features: [
      {
        id: 'horizontal-gaze-angle',
        name: 'Horizontal gaze angle',
        detail: 'Variance',
        patient: '4.8 deg',
        control: '3.2 deg',
        asc: '5.1 deg',
      },
      {
        id: 'gaze-fixation-screen',
        name: 'Gaze fixation on the screen',
        detail: 'Time-wise %',
        patient: '62%',
        control: '71%',
        asc: '58%',
      },
      {
        id: 'gaze-fixation-partner',
        name: 'Gaze fixation on the interaction partner',
        detail: 'Time-wise %',
        patient: '21%',
        control: '18%',
        asc: '28%',
      },
    ],
  },
  facial: {
    image: facialIntensity,
    features: [
      {
        id: 'smile-intensity',
        name: 'Smile intensity of mouth and eye region',
        rows: [
          {
            id: 'smile-mean',
            label: 'Mean over time',
            patient: '0.62',
            control: '0.58',
            asc: '0.49',
          },
          {
            id: 'smile-variance',
            label: 'Variance over time',
            patient: '0.18',
            control: '0.14',
            asc: '0.22',
          },
        ],
      },
      {
        id: 'eyebrow-lowerer',
        name: 'Eye brown lowerer',
        rows: [
          {
            id: 'brow-mean',
            label: 'Mean over time',
            patient: '0.41',
            control: '0.37',
            asc: '0.52',
          },
          {
            id: 'brow-variance',
            label: 'Variance over time',
            patient: '0.12',
            control: '0.10',
            asc: '0.16',
          },
        ],
      },
      {
        id: 'general-facial-intensity',
        name: 'General facial intensity',
        rows: [
          {
            id: 'facial-mean',
            label: 'Mean over time',
            patient: '0.55',
            control: '0.51',
            asc: '0.47',
          },
          {
            id: 'facial-variance',
            label: 'Variance over time',
            patient: '0.15',
            control: '0.12',
            asc: '0.19',
          },
        ],
      },
    ],
  },
  vocal: null,
  head: null,
  mimicry: null,
} as const;
