import { Author, FilterCriteria, ResponseData } from '../../models';
import { axiosClient } from '../../utils';

export async function fetchAuthorsAPI(filter: FilterCriteria): Promise<ResponseData<Author>> {
  const { search, page, pageCount } = filter;
  const { data } = await axiosClient.get(`/api/author?search=${encodeURI(search)}&page=${page}&pageCount=${pageCount}`);
  return data as ResponseData<Author>;
}

export async function fetchAuthorAPI(id: string): Promise<Author> {
  const { data } = await axiosClient.get(`/api/author/${id}`);
  return data as Author;
}

export async function postAuthorAPI(author: Author): Promise<Author> {
  const { data } = await axiosClient.post(`/api/author`, {
    name: author.name,
    summary: author.summary,
    birthday: author.birthday,
    avatarUrl: author.avatarUrl,
  });
  return data as Author;
}

export async function putAuthorAPI(author: Author): Promise<Author> {
  const { data } = await axiosClient.put(`/api/author`, author);
  return data as Author;
}

export async function deleteAuthorAPI(id: string): Promise<boolean> {
  const { data } = await axiosClient.delete(`/api/author/${id}`);
  return data as boolean;
}
