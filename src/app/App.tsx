import {
    Activity,
    AlertTriangle,
    Brain,
    Fingerprint,
    GraduationCap,
    Info,
    Layers,
    Settings,
    Stethoscope,
    User
} from 'lucide-react';
import { useState } from 'react';
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

const ConfusionMatrix = () => (
  <div className="border border-gray-100 rounded-lg overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50 text-gray-500">
          <th className="p-4 text-left font-medium"></th>
          <th className="p-4 text-center font-medium">With ASC diagnosis</th>
          <th className="p-4 text-center font-medium">Without ASC diagnosis</th>
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

// --- Mode Views ---

const ScreeningView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto">
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Clinical Decision Support Summary</h2>
        <p className="text-gray-600 leading-relaxed mb-6 text-sm">
          SIT-CARE analyzes multimodal data (facial, prosody, gaze) collected during the Simulated Interaction Task. 
          The model assesses subtle behavioral markers that may be missed during manual observation, 
          especially in adults who utilize compensatory strategies.
        </p>
        <div className="p-5 bg-teal-50 border border-teal-100 rounded-xl mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-teal-900 uppercase tracking-tight">Diagnosis Probability</span>
            <span className="text-xs font-semibold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">High Confidence</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-teal-900">74%</span>
            <span className="text-sm text-teal-700 mb-2 font-medium">Likelihood of ASC</span>
          </div>
          <p className="mt-4 text-xs text-teal-800 leading-relaxed">
            The model identifies patterns consistent with ASC presentations in adults, 
            accounting for potential masking in vocal prosody and gaze stability.
          </p>
        </div>
        <ConfusionMatrix />
      </section>
      
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Biomarker Significance</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-orange-50/50 rounded-lg border border-orange-100">
            <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-orange-800">
              <span className="font-bold">Masking Alert:</span> Patient shows high facial expressivity scores, which may indicate high compensation (camouflaging) during the first 5 minutes of SIT interaction.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-blue-800">
              The AI model refers exclusively to non-verbal behaviors captured during actor interaction. Discrepancies with self-reports (ADI-R) are common in high-masking adults.
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
            <h3 className="font-bold text-gray-900">Screening Result</h3>
            <p className="text-xs text-gray-500">Based on SIT Multimodal Fusion</p>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center">
          <div className="text-sm text-gray-500 mb-2 uppercase tracking-widest font-bold">Recommended Action</div>
          <div className="text-2xl font-black text-gray-900 mb-4">Proceed to Full Diagnostic Interview</div>
          <div className="text-sm text-gray-600 max-w-sm mx-auto">
            The automated screening suggests that clinical observation (ADOS-2) is warranted despite potential camouflaging.
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-teal-900 rounded-2xl text-white">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Fingerprint size={18} className="text-teal-400" />
          Digital Biomarker Profile
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-teal-300">Gaze Consistency</span>
            <span className="font-mono bg-teal-800 px-2 py-0.5 rounded">Atypical</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-teal-300">Vocal Pitch Variance</span>
            <span className="font-mono bg-teal-800 px-2 py-0.5 rounded">Restricted</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-teal-300">Micro-expression Latency</span>
            <span className="font-mono bg-teal-800 px-2 py-0.5 rounded">Delayed</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LearningView = () => (
  <div className="p-8 max-w-7xl mx-auto space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Identifying Subtle ASC Markers in Adults</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Adults with ASC often use <strong>camouflaging</strong> to mask social difficulties. The SIT task reveals "leakage" in non-verbal channels that are difficult to consciously control.
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
          <h3 className="text-lg font-bold mb-2">Training Module: Masking</h3>
          <p className="text-sm text-teal-100 leading-relaxed mb-4">
            Learn to detect the discrepancy between high "Social Reciprocity" scores (compensatory) and atypical "Vocal Prosody" (objective biomarker).
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs bg-teal-800/50 p-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              Identify compensatory gaze patterns
            </div>
            <div className="flex items-center gap-2 text-xs bg-teal-800/50 p-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              Analyze micro-expression latency
            </div>
          </div>
        </div>

        <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Brain size={18} className="text-teal-600" />
            Theoretical Framework
          </h4>
          <div className="space-y-4">
            <div className="text-sm">
              <div className="font-semibold text-gray-700 mb-1">Camouflaging (Masking)</div>
              <p className="text-gray-500 text-xs leading-relaxed">Cognitive strategies used to hide social challenges. SIT-CARE looks for the "cost" of masking in physiological and motor data.</p>
            </div>
            <div className="text-sm">
              <div className="font-semibold text-gray-700 mb-1">Digital Biomarkers</div>
              <p className="text-gray-500 text-xs leading-relaxed">Objective, quantifiable data points extracted via computer vision that correlate with clinical diagnosis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AssessmentView = () => (
  <div className="p-8 max-w-7xl mx-auto space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Detailed Diagnostics */}
      <div className="lg:col-span-8 space-y-8">
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Layers size={18} className="text-teal-600" />
                Multimodal Fusion Analysis
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
                  name="Patient G532XHW"
                  dataKey="patient"
                  stroke="#0d9488"
                  fill="#0d9488"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Neurotypical Avg"
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
              <h3 className="font-bold text-gray-900 text-sm">Gaze & Prosody Synchrony</h3>
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
              <div className="flex items-center gap-1"><div className="w-2 h-0.5 bg-teal-600" /> Gaze Patterns</div>
              <div className="flex items-center gap-1"><div className="w-2 h-0.5 bg-indigo-500" /> Vocal Intensity</div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Differential Diagnosis Comparison</h3>
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
            Clinical CDSS Note
          </h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-teal-500">
              <p className="font-bold text-white mb-1">Masking Indicator (High)</p>
              <p className="text-xs leading-relaxed">The discrepancy between Social Reciprocity (40%) and Vocal Prosody (65%) suggests significant cognitive effort to mask symptoms during SIT interaction.</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-amber-500">
              <p className="font-bold text-white mb-1">Differential diagnosis alert</p>
              <p className="text-xs leading-relaxed">High overlap with ADHD markers observed in head movement patterns. Recommend screening for executive dysfunction.</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl">
          <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
            <Activity size={16} />
            SIT-CARE Parameters
          </h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-2 bg-gray-50 rounded-lg text-center">
              <div className="text-[10px] text-gray-400 font-bold uppercase">XGBoost Ver</div>
              <div className="text-xs font-black">v4.2.0</div>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg text-center">
              <div className="text-[10px] text-gray-400 font-bold uppercase">Confidence</div>
              <div className="text-xs font-black">94.2%</div>
            </div>
          </div>
          <button className="w-full py-2 bg-teal-600 text-white rounded-lg text-xs font-bold hover:bg-teal-700 transition-colors">
            Generate Detailed Clinical Report
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeMode, setActiveMode] = useState<ViewMode>('screening');
  const { t } = useTranslation();

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
            <button className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">{t('header.dataAssessment')}</button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg shadow-lg">{t('header.modelAssessment')}</button>
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

          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">{t('sidebar.analysisMode')}</label>
            {modes.map((mode) => (
              <ModeButton 
                key={mode.id}
                active={activeMode === mode.id}
                onClick={() => setActiveMode(mode.id)}
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
              onClick={() => setActiveMode(mode.id)}
              className={`flex-none px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${
                activeMode === mode.id ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <mode.icon size={16} />
              {mode.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-white overflow-y-auto">
          {activeMode === 'screening' && <ScreeningView />}
          {activeMode === 'learning' && <LearningView />}
          {activeMode === 'assessment' && <AssessmentView />}
        </main>
      </div>
    </div>
  );
}
