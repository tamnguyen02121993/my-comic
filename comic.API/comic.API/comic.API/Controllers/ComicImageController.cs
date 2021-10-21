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
    public class ComicImageController : ControllerBase
    {
        private readonly IComicImageService _comicImageService;
        public ComicImageController(IComicImageService comicImageService)
        {
            _comicImageService = comicImageService;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseDataDto<ComicImageDto>>> Get([FromQuery] string search, [FromQuery] int page, [FromQuery] int pageCount)
        {
            return await _comicImageService.Get(search, page, pageCount);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult<ComicImageDto>> GetById([FromRoute] string id)
        {
            return await _comicImageService.GetById(id);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Post(ComicImageDto comicImageDto)
        {
            return await _comicImageService.Post(comicImageDto);
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Put(ComicImageDto comicImageDto)
        {
            return await _comicImageService.Put(comicImageDto);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            return await _comicImageService.Delete(id);
        }
    }
}
