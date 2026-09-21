export default function Faq({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.q} open={i === 0} name="faq">
          <summary>
            <h3 style={{ display: "inline", font: "inherit" }}>{item.q}</h3>
          </summary>
          <div className="answer">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
