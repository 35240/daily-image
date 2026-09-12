export default async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // 参数处理和验证
  const format = url.searchParams.get("format") || "webp";
  const redirect = url.searchParams.get("redirect") === "true";

  // 验证参数
  const allowedFormats = ["webp", "jpeg", "original"];
  if (!allowedFormats.includes(format)) {
    return new Response("Invalid format parameter", { status: 400 });
  }

  // 确定图片路径
  let imagePath;
  switch (format) {
    case "jpeg": imagePath = "/daily.jpeg"; break;
    case "original": imagePath = "/original.jpeg"; break;
    default: imagePath = "/daily.webp";
  }

  // 基于原始 request 构造新的 Request，保持 host 一致
  const imageUrl = new URL(request.url);
  imageUrl.pathname = imagePath;

  const newRequest = new Request(imageUrl.toString(), request);

  // 处理重定向
  if (redirect) {
    return Response.redirect(imageUrl.toString(), 302);
  }

  // fetch 必须传 Request 对象，才能命中 EdgeOne 节点缓存
  let originResponse = await fetch(newRequest);

  if (!originResponse.ok) {
    let originResponse = await fetch(imageUrl.toString());
    if (!originResponse.ok) {
      return new Response("Origin fetch failed", { status: 502 });
    }
    return new Response("Origin fetch failed", { status: 502 });
  }

  // 返回响应
  const response = new Response(originResponse.body, originResponse);
  response.headers.set("bing-cache", "EDGEONE");
  response.headers.set("Cache-Control", "public, max-age=10800");

  return response;
}
