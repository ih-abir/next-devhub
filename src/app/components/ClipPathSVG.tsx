const SvgClipPath = ({ id, path }: { id: string; path: string }) => (
  <svg height="0" width="0">
    <defs>
      <clipPath id={id} clipPathUnits="objectBoundingBox">
        <path d={path} />
      </clipPath>
    </defs>
  </svg>
);

export default SvgClipPath;
