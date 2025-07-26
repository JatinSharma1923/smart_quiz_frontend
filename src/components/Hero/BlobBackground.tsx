import * as React from 'react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BlobBackground: React.FC = () => {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blobs = [blob1Ref.current, blob2Ref.current, blob3Ref.current];
    blobs.forEach((blob, index) => {
      if (blob) {
        gsap.fromTo(blob, 
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 1.5,
            delay: index * 0.3,
            ease: "power3.out"
          }
        );
        gsap.to(blob, {
          y: index % 2 === 0 ? -30 : 30,
          x: index % 2 === 0 ? 20 : -20,
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
        gsap.to(blob, {
          scale: 1.1,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
        gsap.to(blob, {
          rotation: index % 2 === 0 ? 360 : -360,
          duration: 20 + index * 5,
          repeat: -1,
          ease: "none"
        });
      }
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={blob1Ref}
        className="absolute w-96 h-96 md:w-[600px] md:h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #a855f7 0%, #a855f7 40%, transparent 100%)',
          top: '10%',
          left: '10%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute w-80 h-80 md:w-[500px] md:h-[500px] rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, #06b6d4 40%, transparent 100%)',
          top: '60%',
          right: '10%',
          transform: 'translate(50%, -50%)'
        }}
      />
      <div
        ref={blob3Ref}
        className="absolute w-64 h-64 md:w-[400px] md:h-[400px] rounded-full blur-2xl opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(14, 116, 144, 0.4) 50%, transparent 100%)',
          bottom: '20%',
          left: '50%',
          transform: 'translate(-50%, 50%)'
        }}
      />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 blur-sm animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
};

export default BlobBackground;
