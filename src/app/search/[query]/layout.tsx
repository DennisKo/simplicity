import { AI } from './actions';

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AI>
      <div>{children}</div>
    </AI>
  );
}
