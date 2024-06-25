import Link from "next/link";

export async function LinkDashboard() {
  return (
    <div>
      <Link
        href="/admin"
        className="duration-2 block px-2 font-noto font-medium text-vermelho-praxis transition hover:text-vermelho-gentileza"
      >
        Dashboard
      </Link>
    </div>
  );
}
