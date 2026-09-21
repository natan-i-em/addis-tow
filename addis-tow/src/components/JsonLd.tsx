export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data must reach the document as a raw JSON string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
