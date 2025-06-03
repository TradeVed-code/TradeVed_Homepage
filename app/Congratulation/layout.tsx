export default function CongratulationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="congratulation-layout">
      {/* Optional: Add layout styles for the congratulation page */}
      {children}
    </div>
  );
}
