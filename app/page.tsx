import HeroSection  from '@/components/home/hero-section';
import { FeaturesSection } from '@/components/home/features-section';
import { fetchStories } from '@/lib/api';
import AnimatedImages from '@/components/home/AnimatedImages';

export default async function Home() {
      const stories = await fetchStories();
  return (
    <div className="flex flex-col">
      <div className="flex flex-row max-h-screen h-screen overflow-hidden ">
        <AnimatedImages stories={stories} />
        <HeroSection />
      </div>
      <FeaturesSection />
    </div>
  );
}