export interface Audit {
  createdDate?: Date;
  updatedDate?: Date;
}

export interface Author extends Audit {
  id: string;
  name: string;
  summary: string;
  avatarUrl: string;
  birthday: Date | string | undefined;
}

export interface ComicImage extends Audit {
  id: string;
  url: string;
  chapterId: string;
}

export interface Chapter {
  id: string;
  name: string;
  description: string;
  comicId: string;
  comicImages?: ComicImage[];
}

export interface Comic extends Audit {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  categoryId: string;
  chapters?: Chapter[];
}

export interface Category extends Audit {
  id: string;
  name: string;
  description: string;
  comics?: Comic[];
}

export interface PaginationData {
  page: number;
  pageCount: number;
  totalCount: number;
}

export interface FilterCriteria {
  page: number;
  pageCount: number;
  search: string;
}

export interface ResponseData<T> {
  data: T[];
  pagination: PaginationData;
}

export interface SelectModel<K, V> {
  key: K;
  value: V;
}
