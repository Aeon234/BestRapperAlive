interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div>
      {/* <div className="w-full bg-white rounded-lg px-6 py-8 mt-[calc(-1*calc(172px-96px))] sm:mt-0"> */}
      <div className="p-8">{children}</div>
    </div>
  );
}
