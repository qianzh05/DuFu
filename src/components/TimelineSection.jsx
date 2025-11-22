import React from 'react';

export const TimelineSection = () => {
  const events = [
    { year: '712', event: 'Du Fu is born in Gongxian, Henan Province, into a scholarly family.' },
    { year: '736', event: 'Fails the imperial examination for the first time. Begins years of wandering and poetry.' },
    { year: '755', event: 'The An Lushan Rebellion erupts, plunging the Tang Dynasty into chaos.' },
    { year: '757', event: 'Brief service under Emperor Suzong; soon falls out of favor and leaves the capital.' },
    { year: '759', event: 'Flees war-torn northern China; begins journey to Chengdu in Sichuan.' },
    { year: '765', event: 'Leaves Chengdu after his patron Yan Wu dies; travels down the Yangtze.' },
    { year: '766', event: 'Arrives in Kuizhou; writes "Autumn Stirrings" (秋興八首) during autumn.' },
    { year: '770', event: 'Dies on a boat on the Xiang River, aged 58, in poverty and illness.' }
  ];

  return (
    <section className="timeline-section" id="timeline">
      <div className="timeline-title">
        <h2>Du Fu's Journey</h2>
      </div>
      <div className="timeline">
        {events.map((item, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-year">{item.year}</div>
              <p className="timeline-event">{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
