import { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  block: {
    // Handle different block styles
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="mb-6 text-4xl font-bold text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-5 text-3xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 text-2xl font-bold text-gray-900">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-4 text-xl font-bold text-gray-900">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-gray-200 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-4 list-disc space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-4 list-decimal space-y-2 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }) => <li className="leading-relaxed">{children}</li>,
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-800">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};
