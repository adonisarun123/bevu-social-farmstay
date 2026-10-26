"use client";
export default function PrintButton({ className = "btn-dark", children = "Print / save as PDF" }) {
  return <button type="button" onClick={() => window.print()} className={className}>{children}</button>;
}
