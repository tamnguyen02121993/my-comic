import { Category, FilterCriteria, ResponseData } from '../../models';
import { axiosClient } from '../../utils';

export async function fetchCategoriesAPI(filter: FilterCriteria): Promise<ResponseData<Category>> {
  const { search, page, pageCount } = filter;
  const { data } = await axiosClient.get(
    `/api/category?search=${encodeURI(search)}&page=${page}&pageCount=${pageCount}`
  );
  return data as ResponseData<Category>;
}

export async function fetchCategoryAPI(id: string): Promise<Category> {
  const { data } = await axiosClient.get(`/api/category/${id}`);
  return data as Category;
}

export async function postCategoryAPI(category: Category): Promise<Category> {
  const { data } = await axiosClient.post(`/api/category`, {
    name: category.name,
    description: category.description,
  });
  return data as Category;
}

export async function putCategoryAPI(category: Category): Promise<Category> {
  const { data } = await axiosClient.put(`/api/category`, category);
  return data as Category;
}

export async function deleteCategoryAPI(id: string): Promise<boolean> {
  const { data } = await axiosClient.delete(`/api/category/${id}`);
  return data as boolean;
}
