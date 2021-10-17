using comic.API.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace comic.API.Services.Abstraction
{
    public interface IComicImageService
    {
        public Task<List<ComicImageDto>> Get();
        public Task<ComicImageDto> Post(ComicImageDto comicImage);
        public Task<ComicImageDto> Put(ComicImageDto comicImage);
        public Task<Boolean> Delete(Guid id);
    }
}
