type ProcessGlyphProps = {
  name: string;
};

export function ProcessGlyph({ name }: ProcessGlyphProps) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "needs":
      return (
        <svg {...common}>
          <path d="M8 18.5 4.8 21v-4.2A7 7 0 1 1 14.2 5.2" />
          <path d="M10.5 16.2h.2A6 6 0 0 0 20 11V8.2L16.8 10" />
        </svg>
      );
    case "goals":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7.2" />
          <circle cx="12" cy="12" r="3.4" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "strategy":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M5.2 20.6h13.6v-1.7H5.2v1.7Zm2-2.8h8.2l-.6-1.8c1.5-.7 2.5-2.2 2.5-3.9 0-1.5-.7-2.7-1.8-3.4l1.4-3.1c.3-.7-.1-1.5-.8-1.8-.6-.3-1.3 0-1.6.6L13 6.2c-.7-.4-1.5-.6-2.3-.6-1.7 0-3 .9-3.6 2.2l-1.5-.7c-.7-.3-1.5.1-1.7.8-.2.5 0 1.1.3 1.4l1.6 2.1c-.9.7-1.5 1.8-1.5 3 0 1.7 1.1 3.1 2.6 3.6l-.2 1.2h.5Z"
          />
        </svg>
      );
    case "delivery":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M10.1 2.2h3.8l.5 2.2c.7.3 1.3.7 1.8 1.2l2.1-.7 2.2 2.2-.7 2.1c.5.5.9 1.1 1.2 1.8l2.2.5v3.8l-2.2.5c-.3.7-.7 1.3-1.2 1.8l.7 2.1-2.2 2.2-2.1-.7c-.5.5-1.1.9-1.8 1.2l-.5 2.2h-3.8l-.5-2.2a6 6 0 0 1-1.8-1.2l-2.1.7-2.2-2.2.7-2.1a6 6 0 0 1-1.2-1.8l-2.2-.5V9.3l2.2-.5c.3-.7.7-1.3 1.2-1.8l-.7-2.1 2.2-2.2 2.1.7c.5-.5 1.1-.9 1.8-1.2l.5-2.2Zm1.9 6.1a3.7 3.7 0 1 0 .1 7.4 3.7 3.7 0 0 0-.1-7.4Z"
          />
        </svg>
      );
    case "negotiation":
      return (
        <svg {...common}>
          <path d="M3.5 11.2c1.6-.8 3.2-.2 4.2 1.4" />
          <path d="M7.2 9.4c.8-1.5 2.4-1.8 3.4-.4l1.2 1.6" />
          <path d="M20.5 11.2c-1.6-.8-3.2-.2-4.2 1.4" />
          <path d="M16.8 9.4c-.8-1.5-2.4-1.8-3.4-.4L12.2 10.6" />
          <path d="M8.4 13.6h7.2" />
          <path d="M8.8 15.4c1 1.5 2.2 2.4 3.2 2.8 1-.4 2.2-1.3 3.2-2.8" />
        </svg>
      );
    case "formalities":
      return (
        <svg {...common}>
          <path d="M7.2 3.4h6.4L18 7.6V20a1.2 1.2 0 0 1-1.2 1.2H7.2A1.2 1.2 0 0 1 6 20V4.6a1.2 1.2 0 0 1 1.2-1.2Z" />
          <path d="M13.4 3.5V8H18" />
          <path d="m9 14.2 1.8 1.8L15 11.6" />
        </svg>
      );
    case "success":
      return (
        <svg {...common}>
          <path d="M7 4h10v5.2a5 5 0 0 1-10 0V4Z" />
          <path d="M7 6.2H4.8a2.4 2.4 0 0 0 2.4 3.2" />
          <path d="M17 6.2h2.2a2.4 2.4 0 0 1-2.4 3.2" />
          <path d="M12 14.2V16" />
          <path d="M9.2 20.4h5.6" />
          <path d="M10 16h4l.6 4.4h-5.2L10 16Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M8 3.6h2.2a1 1 0 0 1 1 .8l.4 1.8-1.5.7a8.6 8.6 0 0 0 4 4l.7-1.5 1.8.4a1 1 0 0 1 .8 1V13a1.4 1.4 0 0 1-1.5 1.4A12.4 12.4 0 0 1 6.5 5.1 1.4 1.4 0 0 1 8 3.6Z" />
        </svg>
      );
  }
}
