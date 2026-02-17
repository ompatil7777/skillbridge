import { Briefcase } from 'lucide-react';

export default function JobInput({ value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-lg font-medium text-white">
        <Briefcase className="w-5 h-5 text-blue-400" />
        Dream Job Description
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the full job description here, or simply type your dream role (e.g., 'Senior Frontend Engineer at Google')"
        className="w-full h-40 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
      />
    </div>
  );
}
