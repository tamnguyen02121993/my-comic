using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace comic.API.DTOs
{
    public class ResponseDataDto<T> where T: class
    {
        public List<T> Data { get; set; }
        public PaginationDto Pagination { get; set; }
    }
}
