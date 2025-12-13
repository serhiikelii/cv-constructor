"use client";

import { useState, KeyboardEvent, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  SKILLS_DATABASE,
  type SkillSuggestion,
  type SkillCategory,
  searchSkills,
} from "@/data/skillsDb";

type SkillType = "skills" | "tools";

interface SkillsInputProps {
  // Skills
  skills: string[];
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
  onReorderSkills: (startIndex: number, endIndex: number) => void;

  // Tools
  tools: string[];
  onAddTool: (tool: string) => void;
  onRemoveTool: (tool: string) => void;
  onReorderTools: (startIndex: number, endIndex: number) => void;
}

// Sortable Skill Chip Component
interface SortableSkillChipProps {
  skill: string;
  onRemove: () => void;
}

function SortableSkillChip({ skill, onRemove }: SortableSkillChipProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: skill });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 cursor-move hover:bg-blue-200 transition-colors"
    >
      <span
        {...attributes}
        {...listeners}
        className="flex-1 select-none"
      >
        {skill}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="hover:text-blue-900 cursor-pointer flex-shrink-0"
        aria-label={`Remove ${skill}`}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

export default function SkillsInput(props: SkillsInputProps) {
  const [activeTab, setActiveTab] = useState<SkillType>("skills");
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [customSkillInput, setCustomSkillInput] = useState("");

  // Setup drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Get current tab data
  const getCurrentData = () => {
    switch (activeTab) {
      case "skills":
        return {
          skills: props.skills,
          onAdd: props.onAddSkill,
          onRemove: props.onRemoveSkill,
          onReorder: props.onReorderSkills,
          label: "Skills",
          placeholder: "e.g., React, TypeScript, Team Leadership...",
        };
      case "tools":
        return {
          skills: props.tools,
          onAdd: props.onAddTool,
          onRemove: props.onRemoveTool,
          onReorder: props.onReorderTools,
          label: "Tools",
          placeholder: "e.g., Jira, Figma, VS Code...",
        };
    }
  };

  const currentData = getCurrentData();

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = currentData.skills.indexOf(active.id as string);
      const newIndex = currentData.skills.indexOf(over.id as string);
      currentData.onReorder(oldIndex, newIndex);
    }
  };

  // Filter suggestions based on search query, skill type, and category
  const filteredSuggestions = useMemo(() => {
    let suggestions: SkillSuggestion[] = [];

    // Filter by search query or get all
    if (searchQuery.trim()) {
      suggestions = searchSkills(searchQuery);
    } else {
      suggestions = SKILLS_DATABASE;
    }

    // Filter by skill type
    if (activeTab === "skills") {
      // Show skills: hard skills and soft skills (not tools)
      suggestions = suggestions.filter(
        (s) => s.subcategory === "hard" || s.subcategory === "soft" || (!s.subcategory && s.category !== "Soft Skills" && s.subcategory !== "tool")
      );

      // Filter by category if not "All"
      if (selectedCategory !== "All") {
        suggestions = suggestions.filter((s) => s.category === selectedCategory);
      }
    } else if (activeTab === "tools") {
      // Show only tools
      suggestions = suggestions.filter((s) => s.subcategory === "tool");
    }

    // Exclude already selected items
    const selectedSkills = currentData.skills || [];
    suggestions = suggestions.filter(
      (skill) => !selectedSkills.includes(skill.name)
    );

    // Sort by popular first
    return suggestions.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  }, [searchQuery, activeTab, selectedCategory, currentData.skills]);

  // Handle adding custom skill from dedicated input
  const handleAddCustomSkill = () => {
    const trimmed = customSkillInput.trim();
    if (!trimmed) return;

    // Check if already added
    if (currentData.skills.includes(trimmed)) {
      setCustomSkillInput("");
      return;
    }

    // Add as custom skill (exactly as typed)
    currentData.onAdd(trimmed);
    setCustomSkillInput("");
  };

  // Handle adding from suggestions (search field)
  const handleAddFromSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    // If there are suggestions, add the FIRST one (most intuitive UX)
    if (filteredSuggestions.length > 0) {
      const firstSuggestion = filteredSuggestions[0].name;
      if (!currentData.skills.includes(firstSuggestion)) {
        currentData.onAdd(firstSuggestion);
        setSearchQuery("");
      }
    }
  };

  // Handle key press in search input (for suggestions)
  const handleSearchKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFromSearch();
    }
  };

  // Handle key press in custom skill input
  const handleCustomKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomSkill();
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={(v) => {
        setActiveTab(v as SkillType);
        setSelectedCategory("All"); // Reset category filter when changing tabs
      }}>
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        {/* Content is the same for all tabs, just data changes */}
        <TabsContent value={activeTab} className="space-y-4">
          {/* My Skills Section (Selected with Drag & Drop) */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              My {currentData.label}
            </Label>
            <p className="text-xs text-gray-500">
              Drag to reorder. Most important first.
            </p>

            {(currentData.skills && currentData.skills.length > 0) ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={currentData.skills}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="flex flex-wrap gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg min-h-[60px] bg-gray-50">
                    {currentData.skills.map((skill) => (
                      <SortableSkillChip
                        key={skill}
                        skill={skill}
                        onRemove={() => currentData.onRemove(skill)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-400">
                Click on suggestions below to add {currentData.label.toLowerCase()}
              </div>
            )}
          </div>

          {/* Category Filter for Skills Tab */}
          {activeTab === "skills" && (
            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                variant={selectedCategory === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("All")}
              >
                All
              </Button>
              <Button
                type="button"
                variant={selectedCategory === "Development" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Development")}
              >
                Development
              </Button>
              <Button
                type="button"
                variant={selectedCategory === "Design" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Design")}
              >
                Design
              </Button>
              <Button
                type="button"
                variant={selectedCategory === "Marketing" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Marketing")}
              >
                Marketing
              </Button>
              <Button
                type="button"
                variant={selectedCategory === "Management" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Management")}
              >
                Management
              </Button>
              <Button
                type="button"
                variant={selectedCategory === "Soft Skills" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Soft Skills")}
              >
                Soft Skills
              </Button>
            </div>
          )}

          {/* Suggestions Section */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Suggestions</Label>
            <p className="text-xs text-gray-500">
              Search and press Enter to add the first match
            </p>

            {/* Search/Filter Input */}
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              placeholder={currentData.placeholder}
            />

            {/* Skills Cloud */}
            <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-white min-h-[120px] max-h-[300px] overflow-y-auto">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => currentData.onAdd(skill.name)}
                    className="px-3 py-1 text-sm rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    {skill.name}
                  </button>
                ))
              ) : (
                <p className="text-gray-400 text-sm">
                  {searchQuery
                    ? `No ${currentData.label.toLowerCase()} found for "${searchQuery}".`
                    : `Select a category or search for ${currentData.label.toLowerCase()}`}
                </p>
              )}
            </div>
          </div>

          {/* Add Custom Skill Section - SEPARATE & EXPLICIT */}
          <div className="space-y-3 pt-4 border-t">
            <div>
              <Label className="text-base font-semibold">
                Add Your Own {currentData.label === "Skills" ? "Skill" : "Tool"}
              </Label>
              <p className="text-xs text-gray-500">
                Not in the list? Add your custom {currentData.label.toLowerCase().slice(0, -1)} here
              </p>
            </div>

            <div className="flex gap-2">
              <Input
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                onKeyPress={handleCustomKeyPress}
                placeholder={`e.g., ${currentData.label === "Skills" ? "Your unique skill" : "Custom tool name"}...`}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddCustomSkill}
                disabled={!customSkillInput.trim()}
                variant="default"
              >
                Add Custom
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
