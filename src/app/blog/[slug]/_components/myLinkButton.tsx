import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function MyLinkButton({
  className,
  href,
  children,
}: React.PropsWithChildren<{
  className?: string;
  href: string;
}>) {
  return (
    <Link
      className={buttonVariants({
        className: cn(
          "rounded-sm border-[1px] border-vermelho-praxis bg-white text-vermelho-praxis shadow-md transition-shadow duration-100 ease-in-out hover:border-vermelho-praxis hover:bg-white hover:text-vermelho-praxis hover:shadow-lg",
          className,
        ),
      })}
      href={href}
    >
      {children}
    </Link>
  );
}
