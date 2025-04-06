export interface PromptProps {
  id: string;
  title: string;
  aiTool: string;
  description: string;
  content: string;
  userId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  user?: {
    name?: string | null;
    image?: string | null;
  };
}
