"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, className = "btn-primary", pendingText = "Working…", ...rest }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${className} disabled:opacity-60`} {...rest}>
      {pending ? pendingText : children}
    </button>
  );
}
