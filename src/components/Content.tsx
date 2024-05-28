import remarkGfm from "remark-gfm";
import { MessageSquareText } from "lucide-react";
import ReactMarkdown, { Options } from "react-markdown";
import { FC, memo } from "react";

const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

export const Content = ({ content }: { content: string }) => {
  return (
    <div className="">
      <div className="float-left mr-4">
        <MessageSquareText color="#475569" size={36} />
      </div>
      <div className="text-sm text-slate-700">
        <MemoizedReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            table({ children }) {
              return (
                <table className="border-collapse border border-zinc-600  px-3 py-1 ">
                  {children}
                </table>
              );
            },
            th({ children }) {
              return (
                <th className="break-words border border-zinc-600 px-3 py-1 text-foreground">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="break-words border border-zinc-600  px-3 py-1 ">
                  {children}
                </td>
              );
            },

            ol({ children }) {
              return <ol className="list-decimal list-inside">{children}</ol>;
            },
          }}
        >
          {content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
};
