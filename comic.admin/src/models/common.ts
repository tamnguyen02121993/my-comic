export interface Author {
  id: string;
  name: string;
  summary: string;
  avatarUrl: string;
  birthday: Date | string | undefined;
}

export interface ComicImage {
  id: string;
  url: string;
  chapterId: string;
}

export interface Chapter {
  id: string;
  name: string;
  description: string;
  comicId: string;
  comicImages: ComicImage[];
}

export interface Comic {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  categoryId: string;
  chapters: Chapter[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  comics: Comic[];
}
