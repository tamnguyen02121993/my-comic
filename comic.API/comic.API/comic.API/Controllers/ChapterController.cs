﻿using Microsoft.AspNetCore.Http;
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
    public class ChapterController : ControllerBase
    {
        private readonly IChapterService _chapterService;
        public ChapterController(IChapterService chapterService)
        {
            _chapterService = chapterService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ChapterDto>>> Get()
        {
            return await _chapterService.Get();
        }

        [HttpPost]
        public async Task<ActionResult<ChapterDto>> Post(ChapterDto chapterDto)
        {
            return await _chapterService.Post(chapterDto);
        }

        [HttpPut]
        public async Task<ActionResult<ChapterDto>> Put(ChapterDto chapterDto)
        {
            return await _chapterService.Put(chapterDto);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            return await _chapterService.Delete(id);
        }
    }
}
