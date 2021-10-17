using System;
using System.Collections.Generic;

namespace comic.API.DTOs
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public List<ComicDto> Comics { get; set; }
    }
}
