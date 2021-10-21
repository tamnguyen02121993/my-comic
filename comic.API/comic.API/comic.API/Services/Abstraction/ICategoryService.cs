using comic.API.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace comic.API.Services.Abstraction
{
    public interface ICategoryService
    {
        public Task<ResponseDataDto<CategoryDto>> Get(string search, int page = 1, int pageCount = 20);
        public Task<CategoryDto> GetById(string id);
        public Task<CategoryDto> Post(CategoryDto category);
        public Task<CategoryDto> Put(CategoryDto category);
        public Task<Boolean> Delete(Guid id);
    }
}
