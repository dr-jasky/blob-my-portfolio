
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
    <section id={id} className={`py-20 sm:py-24 md:py-28 relative ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16 lg:mb-20">
          <TitleComponent className={`section-title-custom ${titleClassName}`}>
            {title}
          </TitleComponent>
          {subtitle && (
            <p className="text-md md:text-lg text-text-medium mt-5 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};
