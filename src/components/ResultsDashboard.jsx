import { Lightbulb, Target } from 'lucide-react';
import ProgressRing from './ProgressRing';
import { MatchedSkill, MissingSkill } from './SkillCard';

export default function ResultsDashboard({ analysis }) {
  const { matchScore, matchedSkills, missingSkills, summary, topRecommendation } = analysis;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <ProgressRing score={matchScore} />
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Target className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Summary</h3>
            <p className="text-gray-300 leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Top Recommendation</h3>
            <p className="text-gray-300 leading-relaxed font-medium">{topRecommendation}</p>
          </div>
        </div>
      </div>

      {matchedSkills && matchedSkills.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Your Strengths</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {matchedSkills.map((skill, idx) => (
              <MatchedSkill key={idx} {...skill} />
            ))}
          </div>
        </div>
      )}

      {missingSkills && missingSkills.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Skills to Develop</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {missingSkills.map((skill, idx) => (
              <MissingSkill key={idx} {...skill} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
