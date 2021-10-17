using comic.API.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace comic.API.Services.Abstraction
{
    public interface IAuthorService
    {
        public Task<List<AuthorDto>> Get();
        public Task<AuthorDto> Post(AuthorDto author);
        public Task<AuthorDto> Put(AuthorDto author);
        public Task<Boolean> Delete(Guid id);
    }
}
