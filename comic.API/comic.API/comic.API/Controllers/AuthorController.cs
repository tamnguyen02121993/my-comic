using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using comic.API.DTOs;
using comic.API.Services.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace comic.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorService _authorService;
        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpGet]
        public async Task<ActionResult<List<AuthorDto>>> Get()
        {
            return await _authorService.Get();
        }

        [HttpPost]
        public async Task<ActionResult<AuthorDto>> Post(AuthorDto authorDto)
        {
            return await _authorService.Post(authorDto);
        }

        [HttpPut]
        public async Task<ActionResult<AuthorDto>> Put(AuthorDto authorDto)
        {
            return await _authorService.Put(authorDto);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            return await _authorService.Delete(id);
        }


    }
}
