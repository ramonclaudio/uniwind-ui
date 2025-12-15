import { ScrollView, type ScrollViewProps } from "react-native";
import { cn } from "@/lib/utils";

interface DocsPageProps extends ScrollViewProps {
  children: React.ReactNode;
  className?: string;
}

export function DocsPage({ children, className, ...props }: DocsPageProps) {
  return (
    <ScrollView
      className={cn("flex-1 bg-background", className)}
      contentContainerClassName="p-6 pb-20"
      {...props}
    >
      {children}
    </ScrollView>
  );
}
