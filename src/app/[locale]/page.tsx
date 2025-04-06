import {
  Coffee,
  Copy,
  ExternalLink,
  Plus,
  Search,
  Share2,
  PenTool as Tool,
  X,
} from "lucide-react";
import React, { useState } from "react";

interface Prompt {
  id: number;
  title: string;
  tool: string;
  description: string;
  prompt: string;
  author: string;
  likes: number;
}

const initialPrompts: Prompt[] = [
  {
    id: 1,
    title: "Creative Story Writing",
    tool: "ChatGPT",
    description:
      "Generate engaging short stories with detailed character development",
    prompt:
      "Write a short story about [protagonist] who discovers [unusual object] and how it changes their life. Include vivid descriptions and emotional depth.",
    author: "StoryMaster",
    likes: 42,
  },
  {
    id: 2,
    title: "Professional Logo Design",
    tool: "Midjourney",
    description: "Create minimalist modern logos for tech companies",
    prompt:
      "Create a minimalist logo for a tech company named [company name], using geometric shapes, modern typography, and a cool color palette --v 5",
    author: "DesignPro",
    likes: 35,
  },
];

function App() {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [newPrompt, setNewPrompt] = useState({
    title: "",
    tool: "",
    description: "",
    prompt: "",
    author: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const promptToAdd: Prompt = {
      id: prompts.length + 1,
      ...newPrompt,
      likes: 0,
    };
    setPrompts([...prompts, promptToAdd]);
    setIsModalOpen(false);
    setShowShareSuccess(true);
    setSelectedPrompt(promptToAdd);
    setNewPrompt({
      title: "",
      tool: "",
      description: "",
      prompt: "",
      author: "",
    });
    setTimeout(() => setShowShareSuccess(false), 3000);
  };

  const handleCopyPrompt = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.prompt);
    setSelectedPrompt(prompt);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const handleSharePrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setShowShareSuccess(true);
    setTimeout(() => setShowShareSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Share2 className="h-6 w-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">AIShareShare</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Share Prompt</span>
            </button>
          </div>
        </div>
        {/* Buy Me a Coffee Banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a
              href="https://www.buymeacoffee.com/aishareshare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 text-gray-800 hover:text-gray-900 transition-colors"
            >
              <Coffee className="h-5 w-5" />
              <span className="font-medium">
                Support AIShareShare - Buy me a coffee! ☕️
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Copy Success Toast */}
      {showCopySuccess && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up">
          <Copy className="h-4 w-4" />
          <span>Prompt copied to clipboard!</span>
        </div>
      )}

      {/* Share Success Modal */}
      {showShareSuccess && selectedPrompt && (
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
      )}

      {/* Share Prompt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-900">
                Share Your Prompt
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newPrompt.title}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="tool"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  AI Tool
                </label>
                <input
                  type="text"
                  id="tool"
                  value={newPrompt.tool}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, tool: e.target.value })
                  }
                  placeholder="Enter AI tool name (e.g., ChatGPT, Midjourney, DALL-E)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={newPrompt.description}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Prompt
                </label>
                <textarea
                  id="prompt"
                  value={newPrompt.prompt}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, prompt: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="author"
                  value={newPrompt.author}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, author: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Share Prompt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {prompt.title}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Tool className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{prompt.tool}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">❤️ {prompt.likes}</span>
              </div>
              <p className="text-gray-600 mb-4">{prompt.description}</p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {prompt.prompt}
                </pre>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  By {prompt.author}
                </span>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleCopyPrompt(prompt)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={() => handleSharePrompt(prompt)}
                    className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
