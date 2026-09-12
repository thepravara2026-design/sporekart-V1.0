import React from 'react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { Calendar, Clock, MapPin, Users, Award } from 'lucide-react';

export default function TrainingCard({ batch, onRegister }) {
  const { title, status, startDate, duration, mode, seatsRemaining, fee, level } = batch;

  const statusVariantMap = {
    FEATURED: 'brand',
    ACTIVE: 'success',
    COMPLETED: 'neutral',
  };

  return (
    <div className="card-base bg-white p-6 border-[#DDE2DC] hover:border-[#234D3C]/40 transition flex flex-col justify-between">
      <div>
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={statusVariantMap[status] || 'info'}>
            {status} BATCH
          </Badge>
          <span className="text-xs font-medium text-[#536057]">
            {level || 'Beginner to Intermediate'}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl text-[#17231D] mb-4">
          {title}
        </h3>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs text-[#536057] mb-6 bg-[#F4F4EF] p-3.5 rounded-md border border-[#DDE2DC]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#234D3C]" />
            <span>Duration: <strong>{duration || '2 Days'}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#234D3C]" />
            <span>Mode: <strong>{mode || 'Practical Workshop'}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#234D3C]" />
            <span>Start: <strong>{startDate}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#234D3C]" />
            <span>Seats: <strong>{seatsRemaining || '12 remaining'}</strong></span>
          </div>
        </div>
      </div>

      {/* Footer Area */}
      <div className="pt-4 border-t border-[#DDE2DC] flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-[#7A847D] block">Course Fee</span>
          <span className="text-2xl font-bold text-[#17231D]">
            ₹{fee.toLocaleString('en-IN')}
          </span>
        </div>

        {status !== 'COMPLETED' ? (
          <Button
            variant="primary"
            size="md"
            icon={Award}
            onClick={() => onRegister(batch)}
          >
            Register Now
          </Button>
        ) : (
          <Button variant="ghost" size="md" isDisabled>
            Batch Completed
          </Button>
        )}
      </div>
    </div>
  );
}
