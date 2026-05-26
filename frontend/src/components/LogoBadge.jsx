export default function LogoBadge({ item }) {
  const isEmoji = /\p{Emoji}/u.test(item.logo);
  return (
    <div style={{
      width: "40px", height: "40px", borderRadius: "8px", flexShrink: 0,
      background: isEmoji ? "rgba(255,255,255,0.04)" : item.color + "18",
      border: `1px solid ${item.color}30`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: isEmoji ? "20px" : "9px",
      fontWeight: 700, color: isEmoji ? "unset" : item.color,
      fontFamily: "monospace", letterSpacing: "-0.02em",
    }}>
      {item.logo}
    </div>
  );
}
