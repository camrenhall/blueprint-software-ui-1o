import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MessageContentProps {
  content: string;
  className?: string;
}

export default function MessageContent({
  content,
  className,
}: MessageContentProps) {
  return (
    <div className={cn("prose prose-sm max-w-none", className)}>
      <ReactMarkdown
        components={{
          // Customize paragraph styling
          p: ({ children }) => (
            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap mb-2 last:mb-0">
              {children}
            </p>
          ),
          // Customize headings
          h1: ({ children }) => (
            <h1 className="text-base font-semibold mb-2 text-current">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm font-semibold mb-2 text-current">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-medium mb-1 text-current">
              {children}
            </h3>
          ),
          // Customize lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-2 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-sm leading-relaxed">{children}</li>
          ),
          // Customize code
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-black/10 px-1 py-0.5 rounded text-xs font-mono">
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-black/10 p-2 rounded text-xs font-mono overflow-x-auto mb-2">
                <code>{children}</code>
              </pre>
            );
          },
          // Customize blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-current/20 pl-3 italic mb-2">
              {children}
            </blockquote>
          ),
          // Customize links
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-current underline underline-offset-2 hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          // Customize strong/bold
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          // Customize emphasis/italic
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
