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
        public async Task<ActionResult<ResponseDataDto<AuthorDto>>> Get([FromQuery] string search, [FromQuery] int page, [FromQuery] int pageCount)
        {
            return await _authorService.Get(search, page, pageCount);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult<AuthorDto>> GetById([FromRoute] string id)
        {
            return await _authorService.GetById(id);
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
