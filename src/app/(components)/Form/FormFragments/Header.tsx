interface HeaderProps {
  title: string;
  description: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="flex flex-col gap-2 sm:gap-3 unselectable">
      <h1 className="text-gray-100 font-bold text-2xl sm:text-3xl">{title}</h1>
      <p className="text-gray-100 font-normal text-base ">{description}</p>
    </header>
  );
}
