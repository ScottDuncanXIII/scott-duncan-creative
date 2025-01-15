import { LegacyRef } from "react";

export default function AccessibleText({
  text,
  reference,
}: {
  text: string;
  reference?: LegacyRef<HTMLSpanElement> | undefined;
}) {
  return (
    <>
      <span ref={reference} aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
