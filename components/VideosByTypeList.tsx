import { TypeList } from "@/data/video";
import useGetVideosByTypeList from "@/hooks/useGetVideosByTypeList";
import HomeVideos from "./HomeVideos";
import HomeVideosSkeleton from "./skeletons/HomeVideosSkeleton";

type VideosByTypeListProps = {
  typeList: TypeList;
};

export default function VideosByTypeList({ typeList }: VideosByTypeListProps) {
  const { data } = useGetVideosByTypeList(typeList, { limit: 6 });
  if (!data || !data.pages[0]) return <HomeVideosSkeleton />;
  return (
    <HomeVideos
      title={data.pages[0].titlePage}
      videos={data.pages[0].items}
      href={{
        pathname: "/videos",
        params: {
          typeList,
        },
      }}
    />
  );
}
