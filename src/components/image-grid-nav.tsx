import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ImageGridNav({
  data,
  setFilteredData,
}: {
  data: ImageMetadata[];
  setFilteredData: React.Dispatch<React.SetStateAction<ImageMetadata[]>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean;
  }>({});

  const filterSections = {
    Sections: ["contact", "cta", "features", "footer", "hero", "team"],
    Elements: [
      "banner",
      "button",
      "card",
      "form",
      "grid",
      "menu",
      "multi-step form",
      "nav",
      "sidebar",
      "slider",
      "tabs",
    ],
    Colors: ["colorful", "dark", "light", "muted", "gradient", "vibrant"],
    Styles: ["brutalist", "flat", "glass", "minimal", "modern"],
    Themes: [
      "artistic",
      "corporate",
      "eco",
      "elegant",
      "designer",
      "fun",
      "luxury",
      "tech",
    ],
    Animations: ["load", "parallax", "scroll", "transition"],
    Misc: [
      "accent",
      "background",
      "icon",
      "illustration",
      "logo",
      "photography",
      "typography",
    ],
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const applyFilters = () => {
    if (Object.values(selectedFilters).every((value) => !value)) {
      setFilteredData(data);
      setIsModalOpen(false);
      return;
    }

    const activeFilters = Object.entries(selectedFilters)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    const filtered = data.filter((item) =>
      activeFilters.every((filter) => item.tags.includes(filter))
    );
    setFilteredData(filtered);
    setIsModalOpen(false);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFilters]);

  return (
    <div className="">
      <Dialog>
        <DialogTrigger>
          <Button
            variant={"outline"}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Filters
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="max-h-[75vh] overflow-auto">
            {Object.entries(filterSections).map(
              ([section, filters], sectionIndex) => (
                <div key={sectionIndex} className="mb-2">
                  <h3 className="font-semibold">{section}</h3>
                  <div className="grid grid-cols-4 gap-x-6">
                    {filters.map((filter, filterIndex) => (
                      <div
                        key={filterIndex}
                        className="flex hover:text-blue-700"
                      >
                        <input
                          type="checkbox"
                          id={filter}
                          checked={selectedFilters[filter] || false}
                          onChange={() => toggleFilter(filter)}
                        />
                        <label htmlFor={filter} className="ml-1 flex-grow ">
                          {filter}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
