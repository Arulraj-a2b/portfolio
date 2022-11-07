/**
 * Copies the text to the clipboard
 * @param {(string|number)} text the text that needs to be copied
 */
export const copyToClipboard = (text: string, message?: string) => {
  if (typeof Window === "undefined") return;
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
