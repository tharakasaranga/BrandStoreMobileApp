type MobileContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MobileContainer({
  children,
  className = "",
}: MobileContainerProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#efefef] p-3 sm:p-4">
      <div
        className={`min-h-[812px] w-full max-w-[375px] overflow-hidden rounded-[40px] bg-white shadow-sm ${className}`}
      >
        {children}
      </div>
    </main>
  );
}
