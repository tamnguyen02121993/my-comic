using comic.API.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace comic.API.Services.Abstraction
{
    public interface IAuthorService
    {
        public Task<ResponseDataDto<AuthorDto>> Get(string search, int page = 1, int pageCount = 20);
        public Task<AuthorDto> GetById(string id);
        public Task<AuthorDto> Post(AuthorDto author);
        public Task<AuthorDto> Put(AuthorDto author);
        public Task<Boolean> Delete(Guid id);
    }
}
