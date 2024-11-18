import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
  children?: Heading[];
}

// Function to build a nested hierarchy from flat heading data
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

// Recursive function to render nested TOC
const renderTOCItems = (headings: Heading[]) => {
  return (
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
};

const TOC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const contentElement = document.querySelector(".post-content"); // Adjust the selector as needed
    if (!contentElement) return;

    const headingElements = Array.from(
      contentElement.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );

    const flatHeadings = headingElements
      .filter((element) => element.id) // Ensure headings have an ID
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: parseInt(element.tagName.substring(1), 10),
      }));

    const nestedHeadings = buildHierarchy(flatHeadings);
    setHeadings(nestedHeadings);
  }, []);

  return (
    <nav className="toc">
      {headings.length > 0 && renderTOCItems(headings)}
    </nav>
  );
};

export default TOC;
