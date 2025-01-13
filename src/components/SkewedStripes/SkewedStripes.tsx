import "./skewed.stripes.css";

export default function SkewedStripes({
  color = "#b46e12",
  customClass = "",
}: {
  color?: string;
  customClass?: string;
}) {
  const PATTERN_ITEM_COUNT = 22;

  function getSkewedStripes() {
    const patternItemArray = [];

    for (let i = 0; i < PATTERN_ITEM_COUNT; i++) {
      patternItemArray.push(
        <span
          className="skewed-stripe"
          style={{ backgroundColor: color }}
          key={i}
        ></span>
      );
    }

    return patternItemArray;
  }

  return (
    <div className={`skewed-stripes ${customClass}`}>{getSkewedStripes()}</div>
  );
}
