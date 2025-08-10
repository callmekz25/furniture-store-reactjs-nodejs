import { htmlToText } from "html-to-text";
export const htmlToPlainText = (html) => {
  const raw = htmlToText(html, {
    wordwrap: false,
    selectors: [
      { selector: "a", options: { ignoreHref: true } },
      { selector: "img", format: "skip" },
      { selector: "script", format: "skip" },
      { selector: "style", format: "skip" },
    ],
  });

  return raw
    .split("\n")
    .map((s) => s.replace(/[-–—]{3,}/g, "").trim())
    .filter(Boolean)
    .join("\n");
};
