import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

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
        <Button
          key={type}
          variant={activeImageType === type ? 'default' : 'outline'}
          onClick={() => handleImageTypeClick(type)}
        >
          {imageTypeMapping[type]}
        </Button>
      ))}
    </div>
  );
}