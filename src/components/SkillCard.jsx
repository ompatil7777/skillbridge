import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

export function MatchedSkill({ skill, proficiency, evidence }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
          <h4 className="font-semibold text-white">{skill}</h4>
        </div>
        <span className="text-sm font-medium text-green-400">{proficiency}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full transition-all duration-700"
          style={{ width: `${proficiency}%` }}
        />
      </div>
      <p className="text-sm text-gray-400 italic">{evidence}</p>
    </div>
  );
}

export function MissingSkill({ skill, priority, reason, learnResource }) {
  const priorityConfig = {
    high: { color: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/30' },
    medium: { color: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    low: { color: 'bg-gray-500', text: 'text-gray-400', border: 'border-gray-500/30' },
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <div className={`bg-gray-800/50 border ${config.border} rounded-lg p-4 hover:border-opacity-60 transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className={`w-5 h-5 ${config.text} flex-shrink-0`} />
          <h4 className="font-semibold text-white">{skill}</h4>
        </div>
        <span className={`${config.color} text-white text-xs px-2 py-1 rounded-full uppercase font-medium`}>
          {priority}
        </span>
      </div>
      <p className="text-sm text-gray-300 mb-3">{reason}</p>
      <a
        href={learnResource.startsWith('http') ? learnResource : `https://${learnResource}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
      >
        <TrendingUp className="w-4 h-4" />
        Learn It →
      </a>
    </div>
  );
}
