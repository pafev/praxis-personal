import dynamic from "next/dynamic";

const CreateArticleEditor = dynamic(
  () => import("./_components/createArticleEditor"),
  { ssr: false },
);

export default async function CreateBlogPage() {
  return (
    <main className="min-h-screen w-screen bg-white pb-28 font-noto">
      <CreateArticleEditor />
    </main>
  );
}
