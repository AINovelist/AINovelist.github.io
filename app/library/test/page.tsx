"use client";
import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./App.css";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const App = () => {
  const [selected, setSelected] = useState(0);
  const [storyPages, setStoryPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch story data from the API
    const fetchStory = async () => {
      try {
        const response = await fetch("https://api.ainovelist.ir/paged");
        const data = await response.json();

        // Assuming there's only one story, get its content and pages
        const storyContent = data[0].content.pages;

        // Set the story pages
        setStoryPages(storyContent);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching story:", error);
        setLoading(false);
      }
    };

    fetchStory();
  }, []);

  const back = () => {
    setSelected((selected) => Math.max(selected - 1, 0));
  };

  const next = () => {
    setSelected((selected) => Math.min(selected + 1, storyPages.length - 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="container mx-auto px-4 py-8">
    //   <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    //     <h1 className="text-3xl font-bold">کتابخانه</h1>
    //     </div>
    //     </div>

    <div className="container mx-auto px-4 py-8">
      <Card>
        <div className="pages">
          <FlippingPages
            direction="left-to-right"
            onSwipeEnd={setSelected}
            selected={selected}
          >
            {storyPages.map((page, index) => (
              <div key={index} className="page">
                {/* @ts-ignore */}
                <h2 className="text-3xl font-bold">{page.title}</h2>
                <div className="flex">
                  <div className="w-1/2 p-4">
                    {/* @ts-ignore */}
                    <div dangerouslySetInnerHTML={{__html: page.content.response, }}
                    />
                  </div>
                  <div className="w-1/2">
                    <Image
                      src={`https://storage.ainovelist.ir/g/AINovelist/stories/main/kids/Animal%20Protection/pagedstory/javid-6-in-coastal-area-24590748/${
                        index + 1
                      }-3d_rendered.png`}
                      alt={`Image for page ${index}`}
                      className="w-full h-auto"
                      width={160}
                      height={90}
                    />
                  </div>
                </div>
              </div>
            ))}
          </FlippingPages>
        </div>
        <CardFooter>
          <Button variant="outline" size="icon" onClick={back}>
            <ChevronRight className="h-4 w-4" />
            قبلی
          </Button>

          <Button variant="outline" size="icon" onClick={next}>
            بعدی
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
