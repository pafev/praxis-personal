import Link from "next/link";

export async function LinkDashboard() {
  return (
    <div>
      <Link
        href="/admin"
        className="duration-2 block border-vermelho-praxis px-2 font-noto text-xl font-medium text-vermelho-praxis transition hover:border-b-2 hover:text-vermelho-gentileza"
      >
        Dashboard
      </Link>
    </div>
  );
}
