export default function AlreadyRegisteredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="already-registered-layout">
      {/* Optional: Add layout styles for already registered page */}
      {children}
    </div>
  );
}
