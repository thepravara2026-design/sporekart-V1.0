import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import TrainingCard from '../../features/training/components/TrainingCard';

export default function TrainingSection({ batches = [], onRegisterBatch }) {
  const defaultBatches = [
    {
      id: 101,
      title: 'Advanced Mycology & Tissue Culture Mastery',
      status: 'FEATURED',
      startDate: '2026-10-01',
      duration: '3 Days',
      mode: 'Sterile Lab Workshop',
      fee: 4999,
      level: 'Intermediate to Advanced',
    },
    {
      id: 102,
      title: 'Commercial Shiitake & Button Farming Workshop',
      status: 'ACTIVE',
      startDate: '2026-09-20',
      duration: '2 Days',
      mode: 'Farm Field & Practical',
      fee: 3499,
      level: 'All Levels',
    },
    {
      id: 103,
      title: 'Basic Mushroom Cultivation Starter Program 101',
      status: 'COMPLETED',
      startDate: '2026-08-15',
      duration: '2 Days',
      mode: 'Online Live & Kit',
      fee: 1999,
      level: 'Beginner',
    },
  ];

  const list = batches.length > 0 ? batches : defaultBatches;

  return (
    <section id="training-section" className="bg-[#F6F2E8] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E1E5DA]">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          eyebrow="MUSHROOM TRAINING"
          title="Learn. Grow. Improve."
          subtitle="Practical training for beginners, growers and entrepreneurs led by experienced mycologists."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((batch) => (
            <TrainingCard
              key={batch.id}
              batch={batch}
              onRegister={onRegisterBatch}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
