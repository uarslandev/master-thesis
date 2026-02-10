import gazeHeatmap from './images/gaze-heatmap.png';

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
  facial: null,
  vocal: null,
  head: null,
  mimicry: null,
} as const;
