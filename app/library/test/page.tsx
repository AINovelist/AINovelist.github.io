"use client";
import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./App.css";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const App = () => {
  const [selected, setSelected] = useState(0);
  const [storyPages, setStoryPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storyList, setStoryList] = useState([]); // Store all stories here
  const [selectedStory, setSelectedStory] = useState(null);
  const [imageStyle, setImageStyle] = useState("3d_rendered");

  useEffect(() => {
    // Fetch story data from the API
    const fetchStory = async () => {
      try {
        const response = await fetch("https://api.ainovelist.ir/paged");
        const data = await response.json();

        // Get all available stories
        { /* @ts-ignore */ }
        const storyListData = data.map((story) => ({
          name: story.name,
          downloadUrl: story.download_url,
          images: story.images,
          content: story.content.pages,
          title: story.content.title,
        }));

        setStoryList(storyListData); // Set the stories list
        setSelectedStory(storyListData[0]); // Set the first story as the default
        setStoryPages(storyListData[0].content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching story:", error);
        setLoading(false);
      }
    };

    fetchStory();
  }, []);
  { /* @ts-ignore */ }
  const handleStoryChange = (storyIndex) => {
    const story = storyList[storyIndex]; // Update selected story using the index
    setSelectedStory(story);
    { /* @ts-ignore */ }
    setStoryPages(story.content);
    setSelected(0);
  };

  const back = () => {
    setSelected((selected) => Math.max(selected - 1, 0));
  };

  const next = () => {
    setSelected((selected) => Math.min(selected + 1, storyPages.length - 1));
  };
  { /* @ts-ignore */ }
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
        <CardHeader>
          {/* @ts-ignore */}
          <CardTitle>{selectedStory.title}</CardTitle>
        </CardHeader>
        <div className="pages">
          <FlippingPages
            direction="left-to-right"
            onSwipeEnd={setSelected}
            selected={selected}
          >
            {storyPages.map((page, index) => (
              <div
                key={index}
                className={`page ${
                  index === 0 || index === storyPages.length - 1
                    ? "cover-page"
                    : ""
                }`}
              >
                {/* First or Last Page: Full-width image with title */}
                {/* @ts-ignore */}
                {index === 0 || index === storyPages.length - 1 ? ( <div className="cover-page-wrapper" style={{ backgroundImage: `url(https://storage.ainovelist.ir/g/AINovelist/stories/main/kids/Animal%20Protection/pagedstory/${selectedStory.images[imageStyle][index]})`, height: "100%", }} >
                    <h1 className="text-4xl font-bold">
                      {/* @ts-ignore */}
                      {selectedStory.title}
                    </h1>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="w-1/2">
                      {/* @ts-ignore */}
                      <div className="p-4" dangerouslySetInnerHTML={{ __html: page.content.response, }} />
                    </div>
                    <div className="w-1/2">
                      {/* @ts-ignore */}
                      <Image src={`https://storage.ainovelist.ir/g/AINovelist/stories/main/kids/Animal%20Protection/pagedstory/${selectedStory.images[imageStyle][index]}`}
                        alt={`Image for page ${index}`}
                        className="object-cover w-full h-full"
                        width={160}
                        height={90}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </FlippingPages>
        </div>
        <CardFooter className="flex justify-between items-center">
          {selected > 0 && (
            <Button variant="destructive" size="lg" onClick={back}>
              <ChevronRight className="h-4 w-4" />
              قبلی
            </Button>
          )}

          {selected < storyPages.length - 1 && (
            <Button variant="destructive" size="lg" onClick={next}>
              بعدی
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
