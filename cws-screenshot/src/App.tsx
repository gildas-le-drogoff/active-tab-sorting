import { useRef, useState } from "react";

const CHROME_BG = "#202124";
const TAB_BG = "#35363a";
const TAB_ACTIVE = "#4a4b50";
const TAB_TEXT = "#e8eaed";
const TAB_TEXT_INACTIVE = "#9aa0a6";
const PINNED_BG = "#35363a";
const TOOLBAR_BG = "#35363a";
const OMNIBOX_BG = "#202124";
const ACCENT = "#8ab4f8";
const WIDTH = 1280;
const HEIGHT = 800;
const TAB_HEIGHT = 34;
const TAB_TOP = 0;
const TOOLBAR_TOP = TAB_HEIGHT;
const TOOLBAR_HEIGHT = 40;
const CONTENT_TOP = TOOLBAR_TOP + TOOLBAR_HEIGHT;

const PINNED_TABS = [
  { favicon: "M", color: "#4285f4", label: "Gmail" },
  { favicon: "C", color: "#0f9d58", label: "Calendar" },
];

function ExtensionIcon({ x, y, size = 14 }) {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 512 512">
      <path
        d="M 16,256 C 16,388.582 123.42,496 256,496 388.58,496 496,388.582 496,256 496,123.42 388.58,16 256,16 123.42,16 16,123.42 16,256 Z M 319.375,151.375 410.625,243 c 3.375,3.5 5.375,8.125 5.375,13 0,4.875 -2,9.625 -5.375,13.125 l -91.25,91.5 C 307.875,372.125 288,364 288,347.5 v -183 c 0,-16.5 19.875,-24.625 31.375,-13.125 z M 224,164.5 v 183 c 0,16.5 -19.875,24.625 -31.375,13.125 l -91.25,-91.5 C 98,265.625 96,260.875 96,256 c 0,-4.875 2,-9.5 5.375,-13 l 91.25,-91.625 C 204.125,139.875 224,148 224,164.5 Z"
        fill="#36ff38"
      />
      <path
        d="m 224,164.5 v 183 c 0,16.5 -19.875,24.625 -31.375,13.125 l -91.25,-91.5 C 98,265.625 96,260.875 96,256 c 0,-4.875 2,-9.5 5.375,-13 l 91.25,-91.625 C 204.125,139.875 224,148 224,164.5 Z"
        fill="#ffe61c"
      />
    </svg>
  );
}

const TABS = [
  {
    title: "Automatic Tab Sorting - Chrome Web Store",
    svgIcon: true,
    active: true,
    highlight: true,
  },
  { title: "GitHub - Repository", favicon: "G", faviconColor: "#f0f0f0" },
  {
    title: "Stack Overflow - Questions",
    favicon: "S",
    faviconColor: "#f48024",
  },
  { title: "MDN Web Docs", favicon: "M", faviconColor: "#83d0f2" },
  { title: "Google Search", favicon: "G", faviconColor: "#4285f4" },
];

function PinnedTab({ tab, x }) {
  return (
    <g>
      <rect
        x={x}
        y={TAB_TOP + 6}
        width={32}
        height={TAB_HEIGHT - 6}
        rx={8}
        ry={8}
        fill={PINNED_BG}
      />
      <circle cx={x + 16} cy={TAB_TOP + 20} r={8} fill={tab.color} />
      <text
        x={x + 16}
        y={TAB_TOP + 24}
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#fff"
      >
        {tab.favicon}
      </text>
    </g>
  );
}

function Tab({ tab, x, w }) {
  const bg = tab.active ? TAB_ACTIVE : TAB_BG;
  const textColor = tab.active ? TAB_TEXT : TAB_TEXT_INACTIVE;
  const y = TAB_TOP + (tab.active ? 4 : 6);
  const h = TAB_HEIGHT - (tab.active ? 4 : 6);

  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} ry={8} fill={bg} />
      {tab.highlight && (
        <rect x={x} y={y} width={w} height={2} rx={1} fill={ACCENT} />
      )}
      <text
        x={x + 28}
        y={y + h / 2 + 4}
        fontSize="12"
        fill={textColor}
        fontFamily="Segoe UI, sans-serif"
      >
        {tab.title.length > 22 ? tab.title.slice(0, 22) + "…" : tab.title}
      </text>
      {tab.svgIcon ? (
        <ExtensionIcon x={x + 6} y={y + h / 2 - 7} size={14} />
      ) : tab.favicon ? (
        <text
          x={x + 10}
          y={y + h / 2 + 4}
          fontSize="12"
          fill={tab.faviconColor || "#aaa"}
        >
          {tab.favicon}
        </text>
      ) : null}
      <text
        x={x + w - 14}
        y={y + h / 2 + 4}
        fontSize="12"
        fill={TAB_TEXT_INACTIVE}
        style={{ cursor: "pointer" }}
      >
        ×
      </text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }) {
  return (
    <g>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill={ACCENT} />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={ACCENT}
        strokeWidth="2"
        strokeDasharray="6,3"
        markerEnd="url(#arrowhead)"
      />
    </g>
  );
}

function Toolbar() {
  return (
    <g>
      <rect
        x={0}
        y={TOOLBAR_TOP}
        width={WIDTH}
        height={TOOLBAR_HEIGHT}
        fill={TOOLBAR_BG}
      />
      <circle
        cx={24}
        cy={TOOLBAR_TOP + 20}
        r={8}
        fill="none"
        stroke={TAB_TEXT_INACTIVE}
        strokeWidth="1.5"
      />
      <line
        x1={20}
        y1={TOOLBAR_TOP + 16}
        x2={28}
        y2={TOOLBAR_TOP + 24}
        stroke={TAB_TEXT_INACTIVE}
        strokeWidth="1.5"
      />
      <circle
        cx={48}
        cy={TOOLBAR_TOP + 20}
        r={8}
        fill="none"
        stroke={TAB_TEXT_INACTIVE}
        strokeWidth="1.5"
      />
      <line
        x1={44}
        y1={TOOLBAR_TOP + 20}
        x2={52}
        y2={TOOLBAR_TOP + 20}
        stroke={TAB_TEXT_INACTIVE}
        strokeWidth="1.5"
      />
      <rect
        x={70}
        y={TOOLBAR_TOP + 8}
        width={WIDTH - 200}
        height={24}
        rx={12}
        fill={OMNIBOX_BG}
      />
      <text
        x={86}
        y={TOOLBAR_TOP + 24}
        fontSize="13"
        fill={TAB_TEXT_INACTIVE}
        fontFamily="Segoe UI, sans-serif"
      >
        chrome://extensions
      </text>
      <ExtensionIcon x={WIDTH - 116} y={TOOLBAR_TOP + 10} size={20} />
    </g>
  );
}

function PageContent() {
  const y = CONTENT_TOP + 40;
  return (
    <g>
      <rect
        x={0}
        y={CONTENT_TOP}
        width={WIDTH}
        height={HEIGHT - CONTENT_TOP}
        fill="#292a2d"
      />
      <text
        x={WIDTH / 2}
        y={y}
        textAnchor="middle"
        fontSize="22"
        fill={TAB_TEXT}
        fontFamily="Segoe UI, sans-serif"
        fontWeight="bold"
      >
        Automatic Tab Sorting
      </text>
      <text
        x={WIDTH / 2}
        y={y + 30}
        textAnchor="middle"
        fontSize="14"
        fill={TAB_TEXT_INACTIVE}
        fontFamily="Segoe UI, sans-serif"
      >
        Most recently used tab → first unpinned position
      </text>

      <rect
        x={WIDTH / 2 - 220}
        y={y + 60}
        width={440}
        height={180}
        rx={12}
        fill="#35363a"
      />

      {[
        "Zero configuration",
        "Lightweight service worker",
        "Pinned tabs unaffected",
        "No data collection",
      ].map((txt, i) => (
        <g key={i}>
          <circle
            cx={WIDTH / 2 - 190}
            cy={y + 95 + i * 36}
            r={8}
            fill={ACCENT}
            opacity={0.2}
          />
          <text
            x={WIDTH / 2 - 190}
            y={y + 99 + i * 36}
            textAnchor="middle"
            fontSize="12"
            fill={ACCENT}
          >
            ✓
          </text>
          <text
            x={WIDTH / 2 - 170}
            y={y + 99 + i * 36}
            fontSize="14"
            fill={TAB_TEXT}
            fontFamily="Segoe UI, sans-serif"
          >
            {txt}
          </text>
        </g>
      ))}

      <rect
        x={WIDTH / 2 - 140}
        y={y + 270}
        width={120}
        height={36}
        rx={18}
        fill={ACCENT}
      />
      <text
        x={WIDTH / 2 - 80}
        y={y + 293}
        textAnchor="middle"
        fontSize="14"
        fill="#202124"
        fontWeight="bold"
        fontFamily="Segoe UI, sans-serif"
      >
        Add to Chrome
      </text>
      <rect
        x={WIDTH / 2 + 20}
        y={y + 270}
        width={120}
        height={36}
        rx={18}
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
      />
      <text
        x={WIDTH / 2 + 80}
        y={y + 293}
        textAnchor="middle"
        fontSize="14"
        fill={ACCENT}
        fontWeight="bold"
        fontFamily="Segoe UI, sans-serif"
      >
        Details
      </text>
    </g>
  );
}

function AnnotationBadge() {
  const bx = 90;
  const by = CONTENT_TOP + 380;
  return (
    <g>
      <rect
        x={bx}
        y={by}
        width={320}
        height={60}
        rx={8}
        fill="#1a73e8"
        opacity={0.15}
      />
      <rect x={bx} y={by} width={4} height={60} rx={2} fill={ACCENT} />
      <text
        x={bx + 16}
        y={by + 22}
        fontSize="13"
        fill={ACCENT}
        fontWeight="bold"
        fontFamily="Segoe UI, sans-serif"
      >
        ↑ Active tab auto-moved to first position
      </text>
      <text
        x={bx + 16}
        y={by + 44}
        fontSize="12"
        fill={TAB_TEXT_INACTIVE}
        fontFamily="Segoe UI, sans-serif"
      >
        Pinned tabs (Gmail, Calendar) stay in place
      </text>
    </g>
  );
}

export default function Screenshot() {
  const svgRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const exportPng = () => {
    setExporting(true);
    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.download = "cws-screenshot-1280x800.png";
        a.click();
        URL.revokeObjectURL(a.href);
        setExporting(false);
      }, "image/png");
    };
    img.src = url;
  };

  let pinnedX = 8;
  const pinnedWidth = 36;
  const tabStartX = pinnedX + PINNED_TABS.length * (pinnedWidth + 4) + 8;
  const tabWidth = 200;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: 16,
        background: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      <button
        onClick={exportPng}
        disabled={exporting}
        style={{
          padding: "8px 24px",
          background: exporting ? "#555" : ACCENT,
          color: "#202124",
          border: "none",
          borderRadius: 6,
          fontWeight: "bold",
          fontSize: 14,
          cursor: exporting ? "default" : "pointer",
        }}
      >
        {exporting ? "Exporting…" : "Export PNG 1280×800"}
      </button>
      <svg
        ref={svgRef}
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
      >
        <rect width={WIDTH} height={HEIGHT} fill={CHROME_BG} />

        {PINNED_TABS.map((tab, i) => {
          const x = pinnedX + i * (pinnedWidth + 4);
          return <PinnedTab key={`p${i}`} tab={tab} x={x} />;
        })}

        <line
          x1={tabStartX - 6}
          y1={TAB_TOP + 10}
          x2={tabStartX - 6}
          y2={TAB_TOP + TAB_HEIGHT - 4}
          stroke="#555"
          strokeWidth="1"
        />

        {TABS.map((tab, i) => {
          const x = tabStartX + i * (tabWidth + 4);
          return <Tab key={`t${i}`} tab={tab} x={x} w={tabWidth} />;
        })}

        <Arrow
          x1={tabStartX + 3 * (tabWidth + 4) + tabWidth / 2}
          y1={TAB_TOP + TAB_HEIGHT + 2}
          x2={tabStartX + tabWidth / 2}
          y2={TAB_TOP + TAB_HEIGHT + 2}
        />

        <Toolbar />
        <PageContent />
        <AnnotationBadge />
      </svg>
    </div>
  );
}
