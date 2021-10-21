import { Chapter, FilterCriteria, ResponseData } from '../../models';
import { axiosClient } from '../../utils';

export async function fetchChaptersAPI(filter: FilterCriteria): Promise<ResponseData<Chapter>> {
  const { search, page, pageCount } = filter;
  const { data } = await axiosClient.get(
    `/api/chapter?search=${encodeURI(search)}&page=${page}&pageCount=${pageCount}`
  );
  return data as ResponseData<Chapter>;
}

export async function fetchChaptersByComicIdAPI(comicId: string): Promise<Chapter[]> {
  const { data } = await axiosClient.get(`/api/comic/${comicId}/chapters`);
  return data as Chapter[];
}

export async function fetchChapterAPI(id: string): Promise<Chapter> {
  const { data } = await axiosClient.get(`/api/chapter/${id}`);
  return data as Chapter;
}

export async function postChapterAPI(chapter: Chapter): Promise<Chapter> {
  const { data } = await axiosClient.post(`/api/chapter`, {
    name: chapter.name,
    description: chapter.description,
    comicId: chapter.comicId,
  });
  return data as Chapter;
}

export async function putChapterAPI(chapter: Chapter): Promise<Chapter> {
  const { data } = await axiosClient.put(`/api/chapter`, chapter);
  return data as Chapter;
}

export async function deleteChapterAPI(id: string): Promise<boolean> {
  const { data } = await axiosClient.delete(`/api/chapter/${id}`);
  return data as boolean;
}
