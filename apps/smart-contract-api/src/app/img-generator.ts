import Jimp from 'jimp';

export const generateCertificateImg = (
  name: string,
  event: string,
  date: string,
  saveToLocal = false
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    Jimp.read('../assets/base.png', async (err, base) => {
      if (err) {
        reject(err);
        return;
      }
      const fontName = await Jimp.loadFont(
        '../assets/fonts/source-sans-pro/46-black/ufonts.com_source-sans-pro.ttf.fnt'
      );
      const fontEvent = await Jimp.loadFont(
        '../assets/fonts/source-sans-pro/32-blue/ufonts.com_source-sans-pro.ttf.fnt'
      );
      const fontDate = await Jimp.loadFont(
        '../assets/fonts/source-sans-pro/20-purple/ufonts.com_source-sans-pro.ttf.fnt'
      );
      base
        .print(
          fontName,
          0,
          200,
          {
            text: name,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          base.getWidth()
        )
        .print(
          fontEvent,
          0,
          360,
          {
            text: event,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          base.getWidth()
        )
        .print(fontDate, 750, 480, date);

      if (saveToLocal) {
        base.write('api/certificate.png'); // save
      }

      base.getBuffer('image/png', (err, image) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(image);
      });
    });
  });
};
