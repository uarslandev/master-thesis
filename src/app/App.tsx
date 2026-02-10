import {
  Activity,
  AlertTriangle,
  Brain,
  Eye,
  Fingerprint,
  GraduationCap,
  Info,
  Layers,
  Mic,
  Move,
  Settings,
  Smile,
  Stethoscope,
  Theater,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    CartesianGrid,
    Line,
    LineChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    Tooltip as ReChartsTooltip,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts';
import { LanguageSwitcher } from './components/LanguageSwitcher';

// --- Types ---
type ViewMode = 'screening' | 'learning' | 'assessment';
type RouteView = 'model' | 'data';
type Modality = 'gaze' | 'facial' | 'vocal' | 'head' | 'mimicry';

// --- Mock Data ---
const CONFUSION_MATRIX = [
  { label: 'AI recommends ASC diagnosis', withASC: '36%', withoutASC: '12%', color: 'bg-teal-50/50' },
  { label: 'AI recommends no ASC diagnosis', withASC: '14%', withoutASC: '38%', color: 'bg-white' },
];

const BEHAVIORAL_TRAITS = [
  { trait: 'Gaze Patterns', patient: 45, average: 80, educational: 'Measures eye contact duration and consistency during interaction with the pre-recorded actor.' },
  { trait: 'Facial Expressivity', patient: 35, average: 70, educational: 'Quantifies the range and frequency of micro-expressions and emotional response.' },
  { trait: 'Vocal Prosody', patient: 65, average: 75, educational: 'Analyzes pitch variance and rhythm. Flat or atypical prosody is common in ASC.' },
  { trait: 'Head Movement', patient: 80, average: 30, educational: 'Tracks coordination and excessive or restricted movement during response phases.' },
  { trait: 'Social Reciprocity', patient: 40, average: 75, educational: 'The timing and quality of back-and-forth social interaction within the SIT paradigm.' },
];

const MODALITY_STRENGTHS = [
  { trait: 'Gaze', patient: 52, average: 70 },
  { trait: 'Facial Expressivity', patient: 38, average: 68 },
  { trait: 'Vocal Prosody', patient: 61, average: 73 },
  { trait: 'Head Movement', patient: 44, average: 58 },
  { trait: 'Mimicry', patient: 33, average: 60 },
];

const DIFFERENTIAL_DIAGNOSIS_DATA = [
  { name: 'ASC', probability: 72, color: '#0d9488' },
  { name: 'ADHD', probability: 45, color: '#0891b2' },
  { name: 'Social Anxiety', probability: 25, color: '#4f46e5' },
  { name: 'Depression', probability: 10, color: '#7c3aed' },
];

const TIME_SERIES_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  gaze: Math.random() * 100,
  movement: Math.random() * 100,
}));

// --- Sub-components ---

const ModeButton = ({ active, onClick, icon: Icon, label, description }: { 
  active: boolean, 
  onClick: () => void, 
  icon: any, 
  label: string, 
  description: string 
}) => (
  <button 
    onClick={onClick}
    className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
      active 
        ? 'border-teal-600 bg-teal-50/50 shadow-sm' 
        : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
    }`}
  >
    <div className={`p-2 rounded-lg ${active ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
      <Icon size={20} />
    </div>
    <div>
      <div className="font-semibold text-gray-900">{label}</div>
      <div className="text-xs text-gray-500 mt-0.5 leading-tight">{description}</div>
    </div>
  </button>
);

const ConfusionMatrix = () => {
  const { t } = useTranslation();
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50 text-gray-500">
          <th className="p-4 text-left font-medium"></th>
          <th className="p-4 text-center font-medium">{t('confusionMatrix.withASC')}</th>
          <th className="p-4 text-center font-medium">{t('confusionMatrix.withoutASC')}</th>
        </tr>
      </thead>
      <tbody>
        {CONFUSION_MATRIX.map((row, idx) => (
          <tr key={idx} className={row.color}>
            <td className="p-4 font-medium text-gray-700">{row.label}</td>
            <td className="p-4 text-center text-gray-600">{row.withASC}</td>
            <td className="p-4 text-center text-gray-600">{row.withoutASC}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

// --- Mode Views ---

const ScreeningView = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto">
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('screening.title')}</h2>
        <p className="text-gray-600 leading-relaxed mb-6 text-sm">
          {t('screening.description')}
        </p>
        <div className="p-5 bg-teal-50 border border-teal-100 rounded-xl mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-teal-900 uppercase tracking-tight">{t('screening.diagnosisProbability')}</span>
            <span className="text-xs font-semibold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">{t('screening.highConfidence')}</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-teal-900">74%</span>
            <span className="text-sm text-teal-700 mb-2 font-medium">{t('screening.likelihoodOfASC')}</span>
          </div>
          <p className="mt-4 text-xs text-teal-800 leading-relaxed">
            {t('screening.modelDescription')}
          </p>
        </div>
        <ConfusionMatrix />
      </section>
      
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('screening.biomarkerSignificance')}</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-orange-50/50 rounded-lg border border-orange-100">
            <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-orange-800">
              <span className="font-bold">{t('screening.maskingAlert')}</span> {t('screening.maskingAlertText')}
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-blue-800">
              {t('screening.aiModelNote')}
            </p>
          </div>
        </div>
      </section>
    </div>

    <div className="space-y-8">
      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
            <Activity className="text-teal-600" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{t('screening.screeningResult')}</h3>
            <p className="text-xs text-gray-500">{t('screening.basedOnSIT')}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center">
          <div className="text-sm text-gray-500 mb-2 uppercase tracking-widest font-bold">{t('screening.recommendedAction')}</div>
          <div className="text-2xl font-black text-gray-900 mb-4">{t('screening.proceedToInterview')}</div>
          <div className="text-sm text-gray-600 max-w-sm mx-auto">
            {t('screening.screeningSuggestion')}
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-teal-900 rounded-2xl text-white">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Fingerprint size={18} className="text-teal-400" />
          {t('screening.digitalBiomarker')}
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-teal-300">{t('screening.gazeConsistency')}</span>
            <span className="font-mono bg-teal-800 px-2 py-0.5 rounded">{t('screening.atypical')}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-teal-300">{t('screening.vocalPitchVariance')}</span>
            <span className="font-mono bg-teal-800 px-2 py-0.5 rounded">{t('screening.restricted')}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-teal-300">{t('screening.microExpressionLatency')}</span>
            <span className="font-mono bg-teal-800 px-2 py-0.5 rounded">{t('screening.delayed')}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const LearningView = () => {
  const { t } = useTranslation();
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">{t('learning.title')}</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          {t('learning.description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BEHAVIORAL_TRAITS.map((trait) => (
            <div key={trait.trait} className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-teal-200 transition-colors group">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-800">{trait.trait}</span>
                <Info size={16} className="text-gray-300 group-hover:text-teal-500 cursor-help" />
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-teal-500 transition-all duration-1000" 
                  style={{ width: `${trait.patient}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{trait.educational}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-teal-900 text-white p-6 rounded-2xl">
          <GraduationCap className="mb-4 text-teal-300" size={32} />
          <h3 className="text-lg font-bold mb-2">{t('learning.trainingModule')}</h3>
          <p className="text-sm text-teal-100 leading-relaxed mb-4">
            {t('learning.trainingDescription')}
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs bg-teal-800/50 p-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              {t('learning.identifyGaze')}
            </div>
            <div className="flex items-center gap-2 text-xs bg-teal-800/50 p-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              {t('learning.analyzeMicro')}
            </div>
          </div>
        </div>

        <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Brain size={18} className="text-teal-600" />
            {t('learning.theoreticalFramework')}
          </h4>
          <div className="space-y-4">
            <div className="text-sm">
              <div className="font-semibold text-gray-700 mb-1">{t('learning.camouflaging')}</div>
              <p className="text-gray-500 text-xs leading-relaxed">{t('learning.camouflaguingDesc')}</p>
            </div>
            <div className="text-sm">
              <div className="font-semibold text-gray-700 mb-1">{t('learning.digitalBiomarkers')}</div>
              <p className="text-gray-500 text-xs leading-relaxed">{t('learning.digitalBiomarkersDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const AssessmentView = () => {
  const { t } = useTranslation();
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Detailed Diagnostics */}
      <div className="lg:col-span-8 space-y-8">
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Layers size={18} className="text-teal-600" />
                {t('assessment.multimodalFusion')}
              </h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">SIT Task #G4</span>
                <span className="px-2 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded uppercase">74% Acc Model</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={BEHAVIORAL_TRAITS}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="trait" tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name={t('assessment.patientLabel')}
                  dataKey="patient"
                  stroke="#0d9488"
                  fill="#0d9488"
                  fillOpacity={0.6}
                />
                <Radar
                  name={t('assessment.neurotypicalAvg')}
                  dataKey="average"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.2}
                />
                <ReChartsTooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 text-sm">{t('assessment.gazeProsodySynchrony')}</h3>
              <Info size={14} className="text-gray-400" />
            </div>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TIME_SERIES_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Line type="monotone" dataKey="gaze" stroke="#0d9488" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="movement" stroke="#6366f1" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex gap-4 text-[10px] text-gray-500 justify-center">
              <div className="flex items-center gap-1"><div className="w-2 h-0.5 bg-teal-600" /> {t('assessment.gazePatterns')}</div>
              <div className="flex items-center gap-1"><div className="w-2 h-0.5 bg-indigo-500" /> {t('assessment.vocalIntensity')}</div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">{t('assessment.differentialDiagnosis')}</h3>
            <div className="space-y-4">
              {DIFFERENTIAL_DIAGNOSIS_DATA.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-bold text-gray-900">{item.probability}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${item.probability}%`, backgroundColor: item.color }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Sidebar Info */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-gray-900 text-white p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Stethoscope size={20} className="text-teal-400" />
            {t('assessment.clinicalNote')}
          </h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-teal-500">
              <p className="font-bold text-white mb-1">{t('assessment.maskingIndicator')}</p>
              <p className="text-xs leading-relaxed">{t('assessment.maskingIndicatorDesc')}</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-amber-500">
              <p className="font-bold text-white mb-1">{t('assessment.differentialAlert')}</p>
              <p className="text-xs leading-relaxed">{t('assessment.differentialAlertDesc')}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl">
          <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
            <Activity size={16} />
            {t('assessment.sitParameters')}
          </h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-2 bg-gray-50 rounded-lg text-center">
              <div className="text-[10px] text-gray-400 font-bold uppercase">{t('assessment.xgboostVersion')}</div>
              <div className="text-xs font-black">v4.2.0</div>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg text-center">
              <div className="text-[10px] text-gray-400 font-bold uppercase">{t('assessment.confidence')}</div>
              <div className="text-xs font-black">94.2%</div>
            </div>
          </div>
          <button className="w-full py-2 bg-teal-600 text-white rounded-lg text-xs font-bold hover:bg-teal-700 transition-colors">
            {t('assessment.generateReport')}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

const DataAssessmentView = () => {
  const { t } = useTranslation();
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 gap-8">
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Layers size={18} className="text-teal-600" />
                {t('dataAssessment.multimodalFusion')}
              </h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">SIT Task #G4</span>
                <span className="px-2 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded uppercase">74% Strength Index</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MODALITY_STRENGTHS}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="trait" tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name={t('dataAssessment.patientLabel')}
                  dataKey="patient"
                  stroke="#0d9488"
                  fill="#0d9488"
                  fillOpacity={0.6}
                />
                <Radar
                  name={t('dataAssessment.neurotypicalAvg')}
                  dataKey="average"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.2}
                />
                <ReChartsTooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 text-sm">{t('dataAssessment.gazeProsodySynchrony')}</h3>
              <Info size={14} className="text-gray-400" />
            </div>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TIME_SERIES_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Line type="monotone" dataKey="gaze" stroke="#0d9488" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="movement" stroke="#6366f1" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex gap-4 text-[10px] text-gray-500 justify-center">
              <div className="flex items-center gap-1"><div className="w-2 h-0.5 bg-teal-600" /> {t('dataAssessment.gazePatterns')}</div>
              <div className="flex items-center gap-1"><div className="w-2 h-0.5 bg-indigo-500" /> {t('dataAssessment.vocalIntensity')}</div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">{t('dataAssessment.differentialDiagnosis')}</h3>
            <div className="space-y-4">
              {DIFFERENTIAL_DIAGNOSIS_DATA.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-bold text-gray-900">{item.probability}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.probability}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const getRouteFromPath = (path: string): RouteView => {
    if (path.startsWith('/data-assessment')) {
      return 'data';
    }

    return 'model';
  };

  const initialRoute = typeof window === 'undefined'
    ? 'model'
    : getRouteFromPath(window.location.pathname);
  const [route, setRoute] = useState<RouteView>(initialRoute);
  const [activeMode, setActiveMode] = useState<ViewMode>('screening');
  const [dataMode, setDataMode] = useState<ViewMode>('assessment');
  const [activeModality, setActiveModality] = useState<Modality | null>(null);
  const { t } = useTranslation();

  const navigate = (nextRoute: RouteView) => {
    if (nextRoute === route) {
      return;
    }

    const nextPath = nextRoute === 'data' ? '/data-assessment' : '/';
    window.history.pushState({}, '', nextPath);
    setRoute(nextRoute);
  };

  React.useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  console.log("App component rendering");

  const modes = [
    { 
      id: 'screening', 
      label: t('modes.screening.label'), 
      icon: Activity, 
      desc: t('modes.screening.description') 
    },
    { 
      id: 'learning', 
      label: t('modes.learning.label'), 
      icon: GraduationCap, 
      desc: t('modes.learning.description') 
    },
    { 
      id: 'assessment', 
      label: t('modes.assessment.label'), 
      icon: Stethoscope, 
      desc: t('modes.assessment.description') 
    },
  ] as const;

  const isDataRoute = route === 'data';

  const modalities = [
    {
      id: 'gaze',
      label: t('modalities.gaze.label'),
      icon: Eye,
      desc: t('modalities.gaze.description'),
    },
    {
      id: 'facial',
      label: t('modalities.facial.label'),
      icon: Smile,
      desc: t('modalities.facial.description'),
    },
    {
      id: 'vocal',
      label: t('modalities.vocal.label'),
      icon: Mic,
      desc: t('modalities.vocal.description'),
    },
    {
      id: 'head',
      label: t('modalities.head.label'),
      icon: Move,
      desc: t('modalities.head.description'),
    },
    {
      id: 'mimicry',
      label: t('modalities.mimicry.label'),
      icon: Theater,
      desc: t('modalities.mimicry.description'),
    },
  ] as const;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-teal-100">
      {/* Header */}
      <header className="h-20 bg-[#121212] flex items-center justify-between px-8 border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Brain className="text-black" size={24} />
            </div>
            <span className="text-white font-black text-xl tracking-tight">SIT-CARE</span>
          </div>
          
          <nav className="hidden md:flex items-center bg-white/10 p-1 rounded-xl ml-4">
            <button
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                isDataRoute
                  ? 'text-white bg-teal-600 rounded-lg shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => navigate('data')}
            >
              {t('header.dataAssessment')}
            </button>
            <button
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                !isDataRoute
                  ? 'text-white bg-teal-600 rounded-lg shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => navigate('model')}
            >
              {t('header.modelAssessment')}
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <LanguageSwitcher />
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><User size={20} /></button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Settings size={20} /></button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-72 bg-gray-50 border-r border-gray-100 flex flex-col p-6 overflow-y-auto hidden lg:flex">
          <div className="mb-8">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">{t('sidebar.currentPatient')}</label>
            <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="font-black text-xl text-gray-900 mb-1">G532XHW</div>
              <div className="text-xs text-gray-500">{t('sidebar.lastAssessment')}: Jan 27, 2026</div>
            </div>
          </div>

          {isDataRoute && (
            <div className="mb-8">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">{t('sidebar.modality')}</label>
              <div className="space-y-2">
                {modalities.map((modality) => (
                  <ModeButton
                    key={modality.id}
                    active={activeModality === modality.id}
                    onClick={() => setActiveModality(modality.id)}
                    icon={modality.icon}
                    label={modality.label}
                    description={modality.desc}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">{t('sidebar.analysisMode')}</label>
            {modes.map((mode) => (
              <ModeButton 
                key={mode.id}
                active={(isDataRoute ? dataMode : activeMode) === mode.id}
                onClick={() => (isDataRoute ? setDataMode(mode.id) : setActiveMode(mode.id))}
                icon={mode.icon}
                label={mode.label}
                description={mode.desc}
              />
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-200">
            <div className="p-4 bg-teal-900 rounded-xl text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">{t('sidebar.aiStatus')}</span>
              </div>
              <div className="text-xs font-medium leading-relaxed">
                {t('sidebar.modelActive')}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Mode Switcher (Tab-like) */}
        <div className="lg:hidden flex overflow-x-auto p-4 gap-2 bg-gray-50 border-b border-gray-100">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => (isDataRoute ? setDataMode(mode.id) : setActiveMode(mode.id))}
              className={`flex-none px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${
                (isDataRoute ? dataMode : activeMode) === mode.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <mode.icon size={16} />
              {mode.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-white overflow-y-auto">
          {isDataRoute ? (
            <>
              {dataMode === 'screening' && <ScreeningView />}
              {dataMode === 'learning' && <LearningView />}
              {dataMode === 'assessment' && <DataAssessmentView />}
            </>
          ) : (
            <>
              {activeMode === 'screening' && <ScreeningView />}
              {activeMode === 'learning' && <LearningView />}
              {activeMode === 'assessment' && <AssessmentView />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
