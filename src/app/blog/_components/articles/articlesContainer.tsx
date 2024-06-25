export function ArticlesContainer({ children }: React.PropsWithChildren) {
  return (
    <section className="mx-8 mb-20 flex flex-wrap justify-center gap-2 md:justify-between lg:mx-36">
      {children}
    </section>
  );
}
