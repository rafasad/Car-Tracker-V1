export default function parseHeader(data: string): string {
  const header = data.substring(0, 4);

  return header;
}
