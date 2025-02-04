export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>Home</li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="z-[1] relative">
          <div style={{ opacity: "1", transform: "none" }}>{children}</div>
        </div>
      </main>
    </>
  );
}
