using comic.API.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace comic.API.Services.Abstraction
{
    public interface IComicImageService
    {
        public Task<ResponseDataDto<ComicImageDto>> Get(string search, int page = 1, int pageCount = 20);
        public Task<ComicImageDto> GetById(string id);
        public Task<bool> Post(ComicImageDto comicImage);
        public Task<bool> Put(ComicImageDto comicImage);
        public Task<Boolean> Delete(Guid id);
    }
}
