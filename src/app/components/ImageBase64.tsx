import sharp from "sharp";

const ImageBase64 = async(src: string): Promise<string> =>
  fetch(src)
    .then((res) => res.arrayBuffer())
    .then((buffer) =>
      sharp(Buffer.from(buffer))
        .resize({ width: 10 })
        .toBuffer()
    )
    .then((data) => `data:image/jpeg;base64,${data.toString('base64')}`);

export default ImageBase64;
