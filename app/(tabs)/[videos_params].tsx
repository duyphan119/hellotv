import ContainerView from "@/components/ContainerView";
import VideosFilter from "@/components/VideosFilter";
import VideosFilterResults from "@/components/VideosFilterResults";
import typeList from "@/data/typeList";
import { VideosParams } from "@/types";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

type ContentProps = {
  params: VideosParams;
};

function Content(props: ContentProps) {
  const [params, setParams] = useState<VideosParams>(() => ({
    page: 1,
    limit: 18,
    ...props.params,
  }));

  const handleFilter = (newParams: VideosParams) => {
    setParams(newParams);
  };

  return (
    <ContainerView>
      <VideosFilter params={params} onFilter={handleFilter} />
      <VideosFilterResults
        params={params}
        type={params.type_list || typeList[0].slug}
      />
    </ContainerView>
  );
}

export default function TabVideosParams() {
  const { videos_params } = useLocalSearchParams();
  const videosParams = (
    videos_params
      ? JSON.parse(videos_params as string)
      : {
          type_list: typeList[0].slug,
        }
  ) as VideosParams;
  const isFocused = useIsFocused();
  if (!isFocused) return null;

  return <Content params={videosParams} />;
}
