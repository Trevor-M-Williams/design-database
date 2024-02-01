import { fetchData } from "@/db/actions";

import ImageGrid from "@/components/image-grid";

export default async function Home() {
  const data = await fetchData();

  return <ImageGrid data={data} />;
}
