"use client";
import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./App.css";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { topicTranslations } from '../../../lib/types';

const App = () => {
  const [selected, setSelected] = useState(0);
  const [storyPages, setStoryPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storyList, setStoryList] = useState([]); // Store all stories here
  const [selectedStory, setSelectedStory] = useState(null);
  const [basePath, setBasePath] = useState();
  const [imageStyle, setImageStyle] = useState("3d_rendered");

  useEffect(() => {
    // Fetch story data from the API
    const fetchStory = async () => {
      try {
        const response = await fetch("https://api.ainovelist.ir/paged");
        const data = await response.json();
        // Get all available stories
        {/* @ts-ignore */}
        const storyListData = data.map((story) => ({
          name: story.name,
          downloadUrl: story.download_url,
          images: story.images,
          content: story.content.pages,
          title: story.content.title,
          topic: story.topic,
          imagebase: 'https://storage.ainovelist.ir/g/AINovelist/stories/main/kids/'+story.topic+'/pagedstory'
        }));

        setStoryList(storyListData); // Set the stories list
        console.log(storyListData);
        setSelectedStory(storyListData[0]); // Set the first story as the default
        setBasePath(storyListData[0].imagebase);
        setStoryPages(storyListData[0].content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching story:", error);
        setLoading(false);
      }
    };

    fetchStory();
  }, []);
  {/* @ts-ignore */}
  const handleStoryChange = (storyIndex) => {
    const story = storyList[storyIndex]; // Update selected story using the index
    setSelectedStory(story);
    {/* @ts-ignore */}
    setBasePath(story.imagebase);
    {/* @ts-ignore */}
    setStoryPages(story.content);
    setSelected(0);
  };
  const back = () => {
    setSelected((selected) => Math.max(selected - 1, 0));
  };
  

  const next = () => {
    setSelected((selected) => Math.min(selected + 1, storyPages.length + 1));
  };
  {/* @ts-ignore */}
  const handleImageStyleChange = (style) => {
    setImageStyle(style); // Update the selected image style
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">قصه‌های موجود</h2>
          <div className="flex space-x-4 mb-4">
            {storyList.map((story, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleStoryChange(index)}
              >
                {/* @ts-ignore */}
                {story.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">مدل تصاویر</h2>
          <div className="mb-4">
            <select
              value={imageStyle}
              onChange={(e) => handleImageStyleChange(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="3d_rendered">سه بعدی</option>
              <option value="cartoon">کارتونی</option>
              <option value="chibi">فانتزی</option>
              <option value="flat_design">تخت</option>
              <option value="hand_drawn">دستی</option>
              <option value="real">رئال</option>
              <option value="storybook_illustration">کتاب قصه</option>
              <option value="vector_art">وکتور</option>
              <option value="watercolor">آبرنگ</option>
            </select>
          </div>
        </div>
      </div>
      <Card>
        {/* @ts-ignore */}
        <CardHeader><CardTitle>{selectedStory.title}</CardTitle></CardHeader>

        <div className="pages">
          <FlippingPages
            direction="left-to-right"
            onSwipeEnd={setSelected}
            selected={selected}
          >         
           {/* Cover Page as Slideshow */}
            <div className="relative h-full w-full overflow-hidden">
              {/* Slideshow Container */}
              <div className="flex w-[500%] h-full animate-slide">
                {/* @ts-ignore */}
                {selectedStory.images[imageStyle].map((image, index) => ( <div key={index} className="h-full w-[20%] flex-shrink-0 bg-cover bg-center" style={{backgroundImage: `url(${basePath}/${image})`, }}></div>
                ))}
              </div>

              {/* Title Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <h1 className="text-5xl font-extrabold text-white text-center drop-shadow-2xl">
                  {/* @ts-ignore */}
                  {selectedStory.title}
                </h1>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <h3 className="font-extrabold text-white text-center drop-shadow-2xl mt-20">
                  {/* @ts-ignore */}
                  {selectedStory.topic}
                </h3>
              </div>
            </div>

            {/* All Story Pages */}
            {storyPages.map((page, index) => (
              <div key={index} className="page">
                <div className="flex">
                  <div className="w-1/2 p-4">
                  {/* @ts-ignore */}
                  <h4 className="text-2xl font-bold">{page.title}</h4>
                  {/* @ts-ignore */}
                    <div className="leading-8" dangerouslySetInnerHTML={{ __html: page.content.response, }} />
                  </div>
                  <div className="w-1/2 h-full">
                  {/* @ts-ignore */}
                    <Image src={`https://storage.ainovelist.ir/g/AINovelist/stories/main/kids/${selectedStory.topic}/pagedstory/${selectedStory.images[imageStyle][index]}`}
                      alt={`Image for page ${index}`}
                      className="w-full h-full object-cover"
                      width={160}
                      height={90}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Last Cover Page */}
            {/* @ts-ignore */}
            <div className="flex items-center justify-center h-full bg-cover bg-center relative" style={{ backgroundImage: `url(https://storage.ainovelist.ir/g/AINovelist/stories/main/kids/${selectedStory.topic}/pagedstory/${selectedStory.images[imageStyle][selectedStory.images[imageStyle].length - 1]})` }}>
            <div className="absolute inset-0 bg-black/50 filter brightness-75"></div>
            

            <div className="grid h-full grid-cols-3 gap-0">
              <div className="flex flex-col col-span-1">
                {/* @ts-ignore */}
                <div className="bg-cover bg-center h-full bg-gray-200 p-4" style={{ backgroundImage: `url(https://storage.ainovelist.ir/g/AINovelist/stories/main/kids/${selectedStory.topic}/pagedstory/${selectedStory.images[imageStyle][0]})` }}></div>
                {/* @ts-ignore */}
                <div className="bg-cover bg-center h-full bg-gray-200 p-4" style={{ backgroundImage: `url(https://storage.ainovelist.ir/g/AINovelist/stories/main/kids/${selectedStory.topic}/pagedstory/${selectedStory.images[imageStyle][1]})` }}></div>
              </div>
              <div className="align-middle p-4"><h1 className="relative text-5xl font-extrabold text-white text-center drop-shadow-2xl">پایان داستان</h1></div>
              <div className="flex flex-col col-span-1">
                {/* @ts-ignore */}
                <div className="bg-cover bg-center h-full bg-gray-200 p-4" style={{ backgroundImage: `url(https://storage.ainovelist.ir/g/AINovelist/stories/main/kids/${selectedStory.topic}/pagedstory/${selectedStory.images[imageStyle][2]})` }}></div>
                {/* @ts-ignore */}
                <div className="bg-cover bg-center h-full bg-gray-200 p-4" style={{ backgroundImage: `url(https://storage.ainovelist.ir/g/AINovelist/stories/main/kids/${selectedStory.topic}/pagedstory/${selectedStory.images[imageStyle][3]})` }}></div>
              </div>
            </div>
            
          </div>
          </FlippingPages>
        </div>

        {/* Conditional Back and Next Buttons */}
        <CardFooter className="flex justify-between items-center">
            <Button variant="destructive" size="lg" onClick={back}>
              <ChevronRight className="h-4 w-4" />
              صفحه قبل قصه
            </Button>
            <Button variant="destructive" size="lg" onClick={next}>
              صفحه بعد قصه
              <ChevronLeft className="h-4 w-4" />
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
