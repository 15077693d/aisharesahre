"use client";
import type { PromptProps } from "@/lib/types";
import { Search } from "lucide-react";
import { useState } from "react";
import { PromptGrid } from "./_components";

const initialPrompts: PromptProps[] = [
  {
    id: "1",
    title: "Creative Story Writing",
    aiTool: "ChatGPT",
    description:
      "Generate engaging short stories with detailed character development",
    content:
      "Write a short story about [protagonist] who discovers [unusual object] and how it changes their life. Include vivid descriptions and emotional depth.",
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      name: "StoryMaster",
      image: "https://example.com/storymaster.jpg",
    },
  },
  {
    id: "2",
    title: "Professional Logo Design",
    aiTool: "Midjourney",
    description: "Create minimalist modern logos for tech companies",
    content:
      "Create a minimalist logo for a tech company named [company name], using geometric shapes, modern typography, and a cool color palette --v 5Create a minimalist logo for a tech company named [company name], using geometric shapes, modern typography, and a cool color palette --v 5Create a minimalist logo for a tech company named [company name], using geometric shapes, modern typography, and a cool color palette --v 5Create a minimalist logo for a tech company named [company name], using geometric shapes, modern typography, and a cool color palette --v 5Create a minimalist logo for a tech company named [company name], using geometric shapes, modern typography, and a cool color palette --v 5Create a minimalist logo for a tech company named [company name], using geometric shapes, modern typography, and a cool color palette --v 5",
    userId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      name: "DesignPro",
      image: "https://example.com/designpro.jpg",
    },
  },
];

function App() {
  const [prompts, setPrompts] = useState<PromptProps[]>(initialPrompts);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="py-8">
      {/* Header */}

      {/* Share Success Modal */}
      {/* {showShareSuccess && selectedPrompt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4 transform animate-scale-in">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto flex items-center justify-center">
                  <Share2 className="h-10 w-10 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Successfully Shared!
              </h3>
              <p className="text-gray-600 mb-6">
                Your prompt &quot;{selectedPrompt.title}&quot; has been shared
                with the community!
              </p>
              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-600">
                    {selectedPrompt.tool}
                  </span>
                  <span className="text-sm text-gray-500">
                    By {selectedPrompt.author}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{selectedPrompt.prompt}</p>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleCopyPrompt(selectedPrompt)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={() => setShowShareSuccess(false)}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View All Prompts</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Main Content */}
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search prompts by title, tool, or description..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Prompts Grid */}
      <PromptGrid prompts={prompts} />
    </div>
  );
}

export default App;
