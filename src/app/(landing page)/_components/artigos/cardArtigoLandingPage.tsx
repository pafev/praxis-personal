import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { ArticleCarousel } from "~/server/api/routers";

export default function CardArtigoLandingPage({
  article,
}: {
  article: ArticleCarousel;
}) {
  return (
    <div className="rounded-xl border-[1px] border-off-black/15 bg-white shadow-lg">
      <div className="mx-8 flex flex-col py-6 md:mx-16 md:py-14">
        <div className="flex flex-row items-center">
          <Avatar className="border-2 border-vermelho-praxis bg-white">
            <AvatarImage src={article.createdBy.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="ml-3 font-noto text-sm font-semibold">
            {article.createdBy.name}
          </p>
        </div>
        <p className="mt-6 line-clamp-6 font-noto font-semibold">
          {article.description}
        </p>
      </div>
    </div>
  );
}
