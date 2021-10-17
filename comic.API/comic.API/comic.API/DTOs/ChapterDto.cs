using System;
using System.Collections.Generic;

namespace comic.API.DTOs
{
    public class ChapterDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public Guid ComicId { get; set; }
        public ComicDto Comic { get; set; }

        public List<ComicImageDto> ComicImages { get; set; }

    }
}
