using comic.API.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace comic.API.Services.Abstraction
{
    public interface IChapterService
    {
        public Task<ResponseDataDto<ChapterDto>> Get(string search, int page = 1, int pageCount = 20);
        public Task<List<ChapterDto>> GetByComicId(string comicId);
        public Task<ChapterDto> GetById(string id);
        public Task<ChapterDto> Post(ChapterDto chapter);
        public Task<ChapterDto> Put(ChapterDto chapter);
        public Task<Boolean> Delete(Guid id);
    }
}
