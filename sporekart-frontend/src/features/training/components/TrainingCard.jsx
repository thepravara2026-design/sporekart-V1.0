import React from 'react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { Award, CheckCircle2, Clock, Calendar, MapPin } from 'lucide-react';

export default function TrainingCard({ batch = {}, onRegister }) {
  const title = batch.title || batch.batchName || 'Mushroom Cultivation Workshop';
  const status = batch.status || batch.batchStatus || 'ACTIVE';
  const startDate = batch.startDate || '2026-10-01';
  const duration = batch.duration || '2 Days';
  const mode = batch.mode || 'Lab & Farm';
  const fee = batch.fee ?? batch.courseFee ?? 3499;
  const level = batch.level || 'All Levels';

  const highlights = [
    'Growing basics & sterile environment',
    'Spawn handling & liquid culture inoculation',
    'Farm setup & temperature/humidity control',
    'Harvesting flushes & post-harvest care',
    'Market basics & commercial sales guidance',
  ];

  return (
    <div className="card-base bg-white p-6 border-[#E1E5DA] hover:border-[#1F4D35] flex flex-col justify-between h-full">
      <div>
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={status === 'FEATURED' ? 'gold' : status === 'ACTIVE' ? 'success' : 'warning'}>
            TRAINING • {status}
          </Badge>
          <span className="text-[12px] font-semibold text-[#59645B]">
            {level}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-[20px] text-[#172019] mb-3 leading-snug">
          {title}
        </h3>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#59645B] mb-5 bg-[#FCFCF8] p-3 rounded-[12px] border border-[#E1E5DA]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#1F4D35]" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#1F4D35]" />
            <span>{mode}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#1F4D35]" />
            <span>{startDate}</span>
          </div>
        </div>

        {/* Practical Learning Outcomes */}
        <div className="space-y-2 mb-6">
          <span className="text-[12px] font-bold text-[#172019] uppercase tracking-wider block">
            What You Will Learn:
          </span>
          <ul className="space-y-1.5">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] text-[#59645B]">
                <CheckCircle2 className="w-4 h-4 text-[#1F4D35] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="pt-4 border-t border-[#E1E5DA] flex items-center justify-between gap-4">
        <div>
          <span className="text-[12px] text-[#7C857D] block">Course Fee</span>
          <span className="text-[22px] font-bold text-[#172019]">
            ₹{Number(fee || 0).toLocaleString('en-IN')}
          </span>
        </div>

        <Button
          variant={status === 'COMPLETED' ? 'ghost' : 'primary'}
          size="md"
          icon={Award}
          isDisabled={status === 'COMPLETED'}
          onClick={() => onRegister && onRegister(batch)}
        >
          {status === 'COMPLETED' ? 'Completed' : 'View Training'}
        </Button>
      </div>
    </div>
  );
}
