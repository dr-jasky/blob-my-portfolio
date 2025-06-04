
import React from 'react';

interface SectionProps {
  title: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitle?: string;
  titleAs?: 'h1' | 'h2' | 'h3'; // Allow choosing the heading level
}

export const Section: React.FC<SectionProps> = ({ 
  title, 
  id, 
  children, 
  className = '', 
  titleClassName = '', 
  subtitle ,
  titleAs = 'h2'
}) => {
  const TitleComponent = titleAs;

  return (
    <section id={id} className={`py-16 md:py-20 relative ${className}`}> {/* Increased padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <TitleComponent className={`section-title-custom ${titleClassName}`}>
            {title}
          </TitleComponent>
          {subtitle && <p className="text-lg md:text-xl text-muted mt-0 max-w-3xl mx-auto -translate-y-8">{subtitle}</p>} {/* Adjusted subtitle position */}
        </div>
        {children}
      </div>
    </section>
  );
};