import { useState } from 'react';
import { cn } from '@/lib/utils';

const imageTypeMapping: { [key: string]: string } = {
  '3d_rendered': 'سه بعدی',
  cartoon: 'کارتونی',
  chibi: 'فانتزی',
  'flat_design': 'تخت',
  'hand_drawn': 'دست‌ساز',
  real: 'رئال',
  'storybook_illustration': 'تصویرسازی',
  'vector_art': 'وکتور',
  watercolor: 'آبرنگ',
};

const imageTypes = Object.keys(imageTypeMapping);

interface ImageTypeButtonsProps {
  onImageTypeChange: (imageType: string) => void;
}

export function ImageTypeButtons({ onImageTypeChange }: ImageTypeButtonsProps) {
  const [activeImageType, setActiveImageType] = useState('3d_rendered');

  const handleImageTypeClick = (imageType: string) => {
    setActiveImageType(imageType);
    onImageTypeChange(imageType);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {imageTypes.map((type) => (
        <button
          key={type}
          className={cn(
            'px-4 py-2 rounded-md transition-colors',
            activeImageType === type
              ? 'bg-primary text-primary-foreground'
              : 'border hover:bg-primary/10'
          )}
          onClick={() => handleImageTypeClick(type)}
        >
          {imageTypeMapping[type]}
        </button>
      ))}
    </div>
  );
}