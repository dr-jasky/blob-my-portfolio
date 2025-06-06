
import React from 'react';

interface SectionProps {
  title: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitle?: string;
  titleAs?: 'h1' | 'h2' | 'h3'; 
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
    <section id={id} className={`py-16 sm:py-20 md:py-24 relative ${className}`}> {/* Increased padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-14 lg:mb-16">  {/* Adjusted bottom margin */}
          <TitleComponent className={`section-title-custom ${titleClassName}`}>
            {title}
          </TitleComponent>
          {subtitle && (
            <p className="text-md md:text-lg text-text-muted mt-3.5 max-w-3xl mx-auto leading-relaxed"> {/* Adjusted mt */}
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};
