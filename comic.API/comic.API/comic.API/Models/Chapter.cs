using System;
using System.Collections.Generic;

namespace comic.API.Models
{
    public class Chapter: Audit
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public Guid ComicId { get; set; }
        public Comic Comic { get; set; }

        public List<ComicImage> ComicImages { get; set; }

    }
}
