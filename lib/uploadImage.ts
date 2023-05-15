export async function upload(file: File) {
  const data = new FormData();
  const url = "https://api.cloudinary.com/v1_1/dxwavefdd/image/upload";
  await data.append("file", file);
  await data.append("upload_preset", "ml_default");
  let resp = await fetch(url, {
    method: "POST",
    body: data,
  });
  let json = await resp.json();
  let imageURL = json.url;

  return imageURL;
}
