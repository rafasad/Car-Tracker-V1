export default function parseType(data: string): string {
  const type = data.substring(10, 12);

  return type;
}
