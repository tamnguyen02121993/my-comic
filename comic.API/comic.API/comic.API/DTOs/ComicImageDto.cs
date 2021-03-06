using System;

namespace comic.API.DTOs
{
    public class ComicImageDto: AuditDto
    {
        public Guid Id { get; set; }
        public string Url { get; set; }

        public Guid ChapterId { get; set; }
        public ChapterDto Chapter { get; set; }
    }
}
