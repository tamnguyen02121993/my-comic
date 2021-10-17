using comic.API.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace comic.API.Services.Abstraction
{
    public interface IChapterService
    {
        public Task<List<ChapterDto>> Get();
        public Task<ChapterDto> Post(ChapterDto chapter);
        public Task<ChapterDto> Put(ChapterDto chapter);
        public Task<Boolean> Delete(Guid id);
    }
}
