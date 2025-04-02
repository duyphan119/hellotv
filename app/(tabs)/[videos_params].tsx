import ContainerView from "@/components/ContainerView";
import VideosFilter from "@/components/VideosFilter";
import VideosFilterResults from "@/components/VideosFilterResults";
import typeList from "@/data/typeList";
import { VideosParams } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

type ContentProps = {
  params: VideosParams;
};

function Content(props: ContentProps) {
  const [params, setParams] = useState<VideosParams>(() => ({
    page: 1,
    limit: 18,
  }));

  const handleFilter = (newParams: VideosParams) => {
    setParams(newParams);
  };

  useEffect(() => {
    setParams({
      page: 1,
      limit: 18,
      ...props.params,
    });
  }, [props]);

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

  return <Content params={videosParams} />;
}
