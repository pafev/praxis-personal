import SpinnerLoading from "./blog/_components/infiniteScrollArticles/spinnerLoading";

export default function LoadingPage() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center gap-4 bg-white">
      <SpinnerLoading />
    </main>
  );
}
