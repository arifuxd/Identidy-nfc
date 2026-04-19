interface VCardInput {
  name: string;
  email?: string | null;
  phone?: string | null;
  title?: string | null;
  company?: string | null;
  address?: string | null;
  url?: string | null;
}

export function buildVCard(input: VCardInput) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${input.name}`,
    input.title ? `TITLE:${input.title}` : null,
    input.company ? `ORG:${input.company}` : null,
    input.phone ? `TEL;TYPE=CELL:${input.phone}` : null,
    input.email ? `EMAIL;TYPE=INTERNET:${input.email}` : null,
    input.address ? `ADR;TYPE=WORK:;;${input.address};;;;` : null,
    input.url ? `URL:${input.url}` : null,
    "END:VCARD",
  ].filter(Boolean);

  return `${lines.join("\n")}\n`;
}
