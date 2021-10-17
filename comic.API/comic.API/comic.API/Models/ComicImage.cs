using System;

namespace comic.API.Models
{
    public class ComicImage: Audit
    {
        public Guid Id { get; set; }
        public string Url { get; set; }

        public Guid ChapterId { get; set; }
        public Chapter Chapter { get; set; }
    }
}
