export function StackArt({ count = 0 }: { count?: number }) {
  return (
    <svg className="stack-art" viewBox="0 0 160 112" fill="none" aria-hidden>
      <g className="stack-sheet sheet-back">
        <rect x="43" y="13" width="88" height="73" rx="13" />
        <path d="M60 32h31M60 41h49" />
      </g>
      <g className="stack-sheet sheet-middle">
        <rect x="28" y="24" width="88" height="73" rx="13" />
        <path d="M46 43h29M46 52h50" />
      </g>
      <g className="stack-sheet sheet-front">
        <rect x="14" y="34" width="88" height="73" rx="13" />
        <path d="M34 59h23M34 68h48" />
        <circle cx="81" cy="87" r="9" />
        <path
          className={count ? 'stack-art-check' : ''}
          d={count ? 'm77 87 3 3 5-6' : 'M77 87h8M81 83v8'}
        />
      </g>
    </svg>
  );
}
