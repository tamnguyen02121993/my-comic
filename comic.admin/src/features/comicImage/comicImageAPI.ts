import { ComicImage, FilterCriteria, ResponseData } from '../../models';
import { axiosClient } from '../../utils';

export async function fetchComicImagesAPI(filter: FilterCriteria): Promise<ResponseData<ComicImage>> {
  const { search, page, pageCount } = filter;
  const { data } = await axiosClient.get(
    `/api/comicImage?search=${encodeURI(search)}&page=${page}&pageCount=${pageCount}`
  );
  return data as ResponseData<ComicImage>;
}

export async function fetchComicImageAPI(id: string): Promise<ComicImage> {
  const { data } = await axiosClient.get(`/api/comicImage/${id}`);
  return data as ComicImage;
}

export async function postComicImageAPI(comicImage: ComicImage): Promise<boolean> {
  const { data } = await axiosClient.post(`/api/comicImage`, {
    url: comicImage.url,
    chapterId: comicImage.chapterId,
  });
  return data as boolean;
}

export async function putComicImageAPI(comicImage: ComicImage): Promise<boolean> {
  const { data } = await axiosClient.put(`/api/comicImage`, comicImage);
  return data as boolean;
}

export async function deleteComicImageAPI(id: string): Promise<boolean> {
  const { data } = await axiosClient.delete(`/api/comicImage/${id}`);
  return data as boolean;
}
