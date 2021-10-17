using comic.API.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace comic.API.Services.Abstraction
{
    public interface IComicService
    {
        public Task<List<ComicDto>> Get();
        public Task<ComicDto> Post(ComicDto comic);
        public Task<ComicDto> Put(ComicDto comic);
        public Task<Boolean> Delete(Guid id);
    }
}
