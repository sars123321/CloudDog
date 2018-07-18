using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.DrawingCore;
using System.DrawingCore.Imaging;
using System.IO;

namespace CloudDog.Controllers
{
    public class ImageProgress
    {
        public static ImageProgress Instance = new ImageProgress();

        public void Thumb(Stream source, string path)
        {
            path = path.Replace(".", "_thumb.");
            Image image = Image.FromStream(source);
            int width = image.Width;
            int height = image.Height;

            int newW = 400;
            double precent = (double)width / (double)newW;
            int newH = int.Parse(Math.Round((double)height / precent).ToString());
            try
            {
                Bitmap bp = new Bitmap(newW, newH, PixelFormat.Format24bppRgb);
                Graphics g = Graphics.FromImage(bp);
                g.Clear(Color.Transparent);
                g.CompositingQuality = System.DrawingCore.Drawing2D.CompositingQuality.HighQuality;
                g.InterpolationMode = System.DrawingCore.Drawing2D.InterpolationMode.High;
                g.DrawImage(image, new Rectangle(0, 0, newW, newH));
                bp.Save(path,ImageFormat.Jpeg);
                bp.Dispose();
                g.Dispose();
            }
            catch (Exception ex)
            {

            }
            finally
            {
                image.Dispose();
            }

        }
    }
}
