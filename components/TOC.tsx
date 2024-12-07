import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
  children?: Heading[];
}

const buildHierarchy = (headings: Heading[]): Heading[] => {
  const root: Heading[] = [];
  const stack: Heading[] = [];

  headings.forEach((heading) => {
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }
    if (stack.length === 0) {
      root.push(heading);
    } else {
      const parent = stack[stack.length - 1];
      parent.children = parent.children || [];
      parent.children.push(heading);
    }
    stack.push(heading);
  });

  return root;
};

const renderTOCItems = (headings: Heading[]) => (
  <ul className="toc-list">
    {headings.map((heading) => (
      <li key={heading.id} className={`toc-item toc-level-${heading.level}`}>
        <a href={`#${heading.id}`} className="toc-link">
          {heading.text}
        </a>
        {heading.children && renderTOCItems(heading.children)}
      </li>
    ))}
  </ul>
);

const TOC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const postElement = document.querySelector("article");
    if (!postElement) return;

    const headingElements = Array.from(
      postElement.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );

    const flatHeadings = headingElements
      .filter((element) => element.id && element.textContent)
      .map((element) => ({
        id: element.id,
        text: element.textContent || "Untitled",
        level: parseInt(element.tagName.substring(1), 10) || 1,
      }));

    const nestedHeadings = buildHierarchy(flatHeadings);
    setHeadings(nestedHeadings);
  }, []);

  return (
    <nav className="toc">
      <h1 className="toc-title">Table of Contents</h1>
      {headings.length > 0 && renderTOCItems(headings)}
    </nav>
  );
};

export default TOC;
