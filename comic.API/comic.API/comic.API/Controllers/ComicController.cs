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
    public class ComicController : ControllerBase
    {
        private readonly IComicService _comicService;
        public ComicController(IComicService comicService)
        {
            _comicService = comicService;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseDataDto<ComicDto>>> Get([FromQuery] string search, [FromQuery] int page, [FromQuery] int pageCount)
        {
            return await _comicService.Get(search, page, pageCount);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult<ComicDto>> GetById([FromRoute] string id)
        {
            return await _comicService.GetById(id);
        }

        [HttpPost]
        public async Task<ActionResult<ComicDto>> Post(ComicDto comicDto)
        {
            return await _comicService.Post(comicDto);
        }

        [HttpPut]
        public async Task<ActionResult<ComicDto>> Put(ComicDto comicDto)
        {
            return await _comicService.Put(comicDto);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            return await _comicService.Delete(id);
        }
    }
}
