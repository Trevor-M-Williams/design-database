import React, { useState, useEffect } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import ClearFiltersIcon from "@mui/icons-material/DeleteOutlined";
import RemoveFilterIcon from "@mui/icons-material/HighlightOff";

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
    Sections: [
      "contact",
      "cta",
      "features",
      "footer",
      "hero",
      "logos",
      "team",
      "text",
    ],
    Elements: [
      "banner",
      "button",
      "card",
      "form",
      "grid",
      "image",
      "menu",
      "nav",
      "slider",
      "tabs",
    ],
    Colors: ["colorful", "dark", "gradient", "muted", "vibrant"],
    Styles: [
      "corporate",
      "designer",
      "elegant",
      "flat",
      "fun",
      "glass",
      "minimal",
      "tech",
    ],
    Misc: [
      "accent",
      "background",
      "icon",
      "illustration",
      "overlap",
      "photography",
      "rounded",
      "sharp",
      "typography",
      "whitespace",
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
    <div className="flex flex-grow items-center overflow-hidden">
      <Dialog>
        <DialogTrigger>
          <div
            className="border rounded hover:bg-secondary px-3 py-2"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Filters
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className="flex justify-between max-h-[75vh] overflow-auto p-4">
            {Object.entries(filterSections).map(
              ([section, filters], sectionIndex) => (
                <div key={sectionIndex} className="mb-2">
                  <h3 className="text-lg font-semibold">{section}</h3>
                  <div className="">
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

      <Button
        variant={"outline"}
        size={"icon"}
        className="ml-2"
        onClick={() => {
          setFilteredData(data);
          setSelectedFilters({});
        }}
      >
        <ClearFiltersIcon />
      </Button>

      <div className="flex w-full gap-2 overflow-x-auto ml-2">
        {Object.entries(selectedFilters).map(([filter, active], i) => {
          if (active) {
            return (
              <div
                key={i}
                className="flex items-center bg-secondary rounded px-2 py-1"
              >
                {filter}

                <RemoveFilterIcon
                  fontSize="small"
                  className="ml-2 cursor-pointer"
                  onClick={() => {
                    toggleFilter(filter);
                  }}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
