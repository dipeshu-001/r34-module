import axios from "axios";
import { api_pid, total_api_pages } from "../base_functions/base_function";

export const xbooru_search = async ({ search_tag = "", block_tags = [] }) => {
  let pid = await api_pid("https://xbooru.com", search_tag);
  if (pid == 0 || search_tag.length === 0) return { status: 400 };
  let pages = total_api_pages(pid);
  let random = Math.floor(Math.random() * pages);
  let { data } = await axios(
    `https://xbooru.com/index.php?page=dapi&s=post&tags=${search_tag}&pid=${random}&q=index&json=1`
  );
  let ray = [
    ...data.map(
      (obj: { directory: any; image: any }) =>
        `https://img.xbooru.com/images/${obj.directory}/${obj.image}`
    ),
  ];
  if (block_tags.length != 0) {
    let urlSet = new Set();

    data.forEach(
      (obj: { tags: string | any[]; directory: any; image: any }) => {
        if (block_tags.some((element) => obj.tags.includes(element))) {
          urlSet.add(
            `https://img.xbooru.com/images/${obj.directory}/${obj.image}`
          );
        }
      }
    )
    const clean_array = ray.filter((url) => !urlSet.has(url));
    return clean_array
  }
  return ray;
};
