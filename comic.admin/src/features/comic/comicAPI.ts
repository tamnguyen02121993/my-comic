import { Comic, FilterCriteria, ResponseData } from '../../models';
import { axiosClient } from '../../utils';

export async function fetchComicsAPI(filter: FilterCriteria): Promise<ResponseData<Comic>> {
  const { search, page, pageCount } = filter;
  const { data } = await axiosClient.get(`/api/comic?search=${encodeURI(search)}&page=${page}&pageCount=${pageCount}`);
  return data as ResponseData<Comic>;
}

export async function fetchComicAPI(id: string): Promise<Comic> {
  const { data } = await axiosClient.get(`/api/comic/${id}`);
  return data as Comic;
}

export async function postComicAPI(comic: Comic): Promise<Comic> {
  const { data } = await axiosClient.post(`/api/comic`, {
    name: comic.name,
    description: comic.description,
    thumbnailUrl: comic.thumbnailUrl,
    categoryId: comic.categoryId,
  });
  return data as Comic;
}

export async function putComicAPI(comic: Comic): Promise<Comic> {
  const { data } = await axiosClient.put(`/api/comic`, comic);
  return data as Comic;
}

export async function deleteComicAPI(id: string): Promise<boolean> {
  const { data } = await axiosClient.delete(`/api/comic/${id}`);
  return data as boolean;
}
