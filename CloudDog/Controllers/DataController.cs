using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CloudDog.EF;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace CloudDog.Controllers
{
    [Route("/api/[Controller]")]
    public class DataController : Controller
    {

        private readonly DogDBContext _context;
        private readonly IHostingEnvironment _environment;

        public DataController(DogDBContext context, IHostingEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        private static int PageSize = 20;

        [HttpGet("[action]")]
        public ImageModel GetList(int pageIndex = 1)
        {
            ImageModel model = new ImageModel()
            {
                Items = new List<Image>(),
                PageIndex = pageIndex,
                PageSize = PageSize,
                TotalCount = 0,
                Code = 1,
                Message = "ERR"
            };
            try
            {
                List<Image> images = new List<Image>();
                images = _context.Image.OrderByDescending(m => m.CreateTime).Skip((pageIndex - 1) * PageSize).Take(PageSize).ToList();
                model.Items = images;
                model.TotalCount = _context.Image.Count();
                model.Code = 0;
                model.Message = string.Empty;
            }
            catch (Exception ex)
            {
                model.Code = 1;
                model.Message = ex.ToString();
            }
            return model;
        }

        [HttpPost("[action]")]
        public BaseModel Upload(IList<IFormFileCollection> formFiles)
        {
            BaseModel model = new BaseModel();
            try
            {
                var files = Request.Form.Files;
                if (files.Count < 1)
                {
                    model.Code = 1;
                    model.Message = "请上传图片";
                }
                else
                {
                    string webRoot = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp\\public");
                    foreach (var file in files)
                    {
                        if (!file.FileName.Contains("jpg") && !file.FileName.Contains("gif") && !file.FileName.Contains("png") && !file.FileName.Contains("mp4"))
                        {
                            model.Code = 1;
                            model.Message = "上传格式不正确";
                            break;
                        }
                        else
                        {
                            int type = 0;
                            if (file.FileName.Contains("jpg") || file.FileName.Contains("gif") || file.FileName.Contains("png"))
                            {
                                type = 1;
                            }
                            else
                            {
                                type = 2;
                            }
                            var filename = Guid.NewGuid().ToString().Replace("-", "") + "." + file.FileName;
                            string filePath = webRoot + "\\upload\\" + filename;

                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                file.CopyTo(stream);
                            }
                            ImageProgress.Instance.Thumb(file.OpenReadStream(), filePath);

                            Image image = new Image()
                            {
                                CreateTime = DateTime.Now,
                                Url = "/upload/" + filename,
                                Type = type
                            };
                            _context.Image.Add(image);
                            _context.SaveChanges();
                            model.Code = 0;
                            model.Message += image.Url + ",";
                        }
                    }
                    model.Message = model.Message.TrimEnd(',');
                }

            }
            catch (Exception ex)
            {
                model.Code = 1;
                model.Message = ex.ToString();
            }
            return model;

        }

        public class BaseModel
        {
            public int Code { get; set; }
            public string Message { get; set; }
        }

        public class ImageModel : BaseModel
        {
            public List<Image> Items { get; set; }
            public int PageIndex { get; set; }
            public int PageSize { get; set; }
            public int TotalCount { get; set; }
        }
    }
}