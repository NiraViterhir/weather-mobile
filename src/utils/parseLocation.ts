export type ParsedLocation = {
  city: string;
  rest: string;
};

/**
 * Parses a label like "prefix City, District, Country".
 * Discards everything before the first space, then splits by commas.
 * - city: first comma-separated token
 * - rest: the remaining tokens joined by ", "
 */
export function parseLocationLabel(label: string): ParsedLocation {
  if (!label) {
    return { city: "", rest: "" };
  }

  const firstSpaceIndex = label.indexOf(" ");
  const withoutPrefix = firstSpaceIndex >= 0 ? label.slice(firstSpaceIndex + 1).trim() : label.trim();

  if (!withoutPrefix) {
    return { city: "", rest: "" };
  }

  const parts = withoutPrefix
    .split(",")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  const city = parts.shift() ?? "";
  const rest = parts.join(", ");

  return { city, rest };
}


