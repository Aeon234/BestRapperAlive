interface HeaderProps {
  title: string;
  description: React.ReactNode;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="flex flex-col gap-2 sm:gap-3 select-none">
      <h1 className="text-gray-300 font-bold text-2xl sm:text-3xl">{title}</h1>
      <p className="text-gray-200 font-normal text-base ">{description}</p>
    </header>
  );
}
