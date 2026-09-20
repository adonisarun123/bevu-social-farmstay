// Gold ornamental divider with a centred motif.
export default function Ornament({ children }) {
  return (
    <div className="ornament">
      <span className="l" />
      <span className="h-[26px] w-[26px] opacity-90">{children}</span>
      <span className="r" />
    </div>
  );
}
