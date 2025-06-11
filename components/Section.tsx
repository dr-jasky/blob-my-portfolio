
import React from 'react';

interface SectionProps {
  title: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitle?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
  titleAlignment?: 'center' | 'left';
}

export const Section: React.FC<SectionProps> = ({ 
  title, 
  id, 
  children, 
  className = '', 
  titleClassName = '', 
  subtitle,
  titleAs = 'h2',
  titleAlignment = 'center'
}) => {
  const TitleComponent = titleAs;

  return (
    <section id={id} className={`py-20 sm:py-24 md:py-28 relative ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-14 md:mb-16 lg:mb-20 ${titleAlignment === 'center' ? 'text-center' : 'text-left'}`}>
          <TitleComponent className={`section-title-custom ${titleClassName}`}>
            {title}
          </TitleComponent>
          {subtitle && (
            <p className={`text-md md:text-lg text-text-medium mt-5 ${titleAlignment === 'center' ? 'max-w-3xl mx-auto' : 'max-w-none'} leading-relaxed`}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};
