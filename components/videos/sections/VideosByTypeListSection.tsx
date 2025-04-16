import { TypeList } from "@/data/video";
import useGetVideosByTypeList from "@/hooks/useGetVideosByTypeList";
import VideosSection from "./VideosSection";

type VideosByTypeListSectionProps = {
  typeList: TypeList;
};

export default function VideosByTypeListSection({
  typeList,
}: VideosByTypeListSectionProps) {
  const { data } = useGetVideosByTypeList(typeList, { limit: 6 });
  if (!data || !data.pages[0]) return null;
  return (
    <VideosSection
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
