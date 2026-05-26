import { BG, BG2, BORDER, TEXT } from "../data.js";
import LogoBadge from "./LogoBadge.jsx";

export default function InfiniteRow({ items, speed = 30, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100%" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to right, ${BG}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to left, ${BG}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
      <div style={{
        display: "flex", gap: "12px",
        animation: `${reverse ? "scrollLeft" : "scrollRight"} ${speed}s linear infinite`,
        width: "max-content",
      }}>
        {doubled.map((item, i) => (
          <div key={i} className="stack-pill" style={{
            display: "flex", alignItems: "center", gap: "10px",
            background: BG2, border: `1px solid ${BORDER}`,
            borderRadius: "10px", padding: "10px 16px",
            flexShrink: 0, transition: "border-color 0.2s, box-shadow 0.2s",
            cursor: "default", minWidth: "140px",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + "60"; e.currentTarget.style.boxShadow = `0 0 16px ${item.color}18`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }}
          >
            <LogoBadge item={item} />
            <span style={{ fontSize: "12px", color: TEXT, fontWeight: 500, whiteSpace: "nowrap" }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
