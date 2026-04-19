interface VCardInput {
  name: string;
  title?: string | null;
  company?: string | null;
  address?: string | null;
  profileUrl?: string | null;
  emails?: Array<{ value: string; type: "home" | "office" }>;
  phones?: Array<{ value: string; type: "home" | "office" }>;
  links?: string[];
  photoBase64?: string | null;
  photoType?: string | null;
}

function escapeValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function foldLine(line: string) {
  const max = 75;
  if (line.length <= max) {
    return line;
  }

  const chunks: string[] = [];
  for (let index = 0; index < line.length; index += max) {
    chunks.push(line.slice(index, index + max));
  }

  return chunks.join("\n ");
}

function toPhoneType(type: "home" | "office") {
  return type === "office" ? "WORK" : "HOME";
}

function toEmailType(type: "home" | "office") {
  return type === "office" ? "WORK" : "HOME";
}

function normalizeImageType(type: string | null | undefined) {
  if (!type) {
    return "PNG";
  }

  const normalized = type.toLowerCase();

  if (normalized.includes("png")) {
    return "PNG";
  }

  if (normalized.includes("jpeg") || normalized.includes("jpg")) {
    return "JPEG";
  }

  if (normalized.includes("webp")) {
    return "WEBP";
  }

  return "PNG";
}

export function buildVCard(input: VCardInput) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeValue(input.name)}`,
    input.title ? `TITLE:${escapeValue(input.title)}` : null,
    input.company ? `ORG:${escapeValue(input.company)}` : null,
    ...(input.phones ?? []).map((phone) =>
      `TEL;TYPE=${toPhoneType(phone.type)},VOICE:${escapeValue(phone.value)}`,
    ),
    ...(input.emails ?? []).map((email) =>
      `EMAIL;TYPE=${toEmailType(email.type)},INTERNET:${escapeValue(email.value)}`,
    ),
    input.address ? `ADR;TYPE=WORK:;;${escapeValue(input.address)};;;;` : null,
    input.profileUrl ? `URL:${escapeValue(input.profileUrl)}` : null,
    ...((input.links ?? []).map((link) => `URL:${escapeValue(link)}`)),
    input.photoBase64
      ? `PHOTO;ENCODING=b;TYPE=${normalizeImageType(input.photoType)}:${input.photoBase64}`
      : null,
    "END:VCARD",
  ].filter(Boolean) as string[];

  const folded = lines.map(foldLine);
  return `${folded.join("\n")}\n`;
}
