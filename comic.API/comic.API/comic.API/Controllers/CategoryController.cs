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
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseDataDto<CategoryDto>>> Get([FromQuery]string search, [FromQuery] int page, [FromQuery] int pageCount)
        {
            return await _categoryService.Get(search, page, pageCount);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult<CategoryDto>> GetById([FromRoute] string id)
        {
            return await _categoryService.GetById(id);
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDto>> Post(CategoryDto categoryDto)
        {
            return await _categoryService.Post(categoryDto);
        }

        [HttpPut]
        public async Task<ActionResult<CategoryDto>> Put(CategoryDto categoryDto)
        {
            return await _categoryService.Put(categoryDto);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            return await _categoryService.Delete(id);
        }
    }
}
