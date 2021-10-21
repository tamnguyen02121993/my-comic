using comic.API.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace comic.API.Services.Abstraction
{
    public interface IComicService
    {
        public Task<ResponseDataDto<ComicDto>> Get(string search, int page = 1, int pageCount = 20);
        public Task<ComicDto> GetById(string id);
        public Task<ComicDto> Post(ComicDto comic);
        public Task<ComicDto> Put(ComicDto comic);
        public Task<Boolean> Delete(Guid id);
    }
}
