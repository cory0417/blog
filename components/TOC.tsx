import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TOC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // Scope heading selection to a specific container
    const contentElement = document.querySelector(".post-content"); // Adjust the class or selector as needed
    if (!contentElement) return;

    const headingElements = Array.from(
      contentElement.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    );

    const headingData = headingElements
      .filter((element) => element.id) // Ensure headings have an ID
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: parseInt(element.tagName.substring(1), 10),
      }));

    setHeadings(headingData);
  }, []);

  return (
    <nav className="toc">
      <ul className="toc-list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`toc-item toc-level-${heading.level}`}
          >
            <a href={`#${heading.id}`} className="toc-link">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;
