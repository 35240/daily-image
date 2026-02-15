export default async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const base = `${url.protocol}//${url.host}`;

  const html = `
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>图片 API 服务</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #4361ee;
      --primary-dark: #3a0ca3;
      --accent: #f72585;
      --light: #f8f9fa;
      --dark: #212529;
      --gray: #6c757d;
      --light-gray: #e9ecef;
      --success: #4cc9f0;
      --border: #dee2e6;
      --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
      --hover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background-color: #f9fafb;
      color: var(--dark);
      line-height: 1.6;
      padding: 2rem 1rem;
      margin: 0;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .hero {
      text-align: center;
      margin-bottom: 3rem;
      padding: 2rem;
      background: linear-gradient(120deg, var(--primary), var(--primary-dark));
      color: white;
      border-radius: 16px;
      box-shadow: var(--card-shadow);
    }
    
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.1rem;
      font-weight: 300;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: var(--card-shadow);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border-top: 4px solid var(--primary);
    }
    
    .card:hover {
      transform: translateY(-2px);
      box-shadow: var(--hover-shadow);
    }
    
    .card-header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .card-icon {
      background-color: var(--primary);
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.75rem;
      color: white;
    }
    
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--dark);
    }
    
    .endpoint-list {
      list-style: none;
    }
    
    .endpoint-item {
      padding: 0.75rem;
      border-radius: 8px;
      margin-bottom: 0.75rem;
      background-color: var(--light);
      border-left: 3px solid var(--success);
      display: flex;
      align-items: center;
      transition: background-color 0.2s;
    }
    
    .endpoint-item:hover {
      background-color: #e9ecef;
    }
    
    .method {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      background-color: var(--success);
      color: white;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-right: 0.5rem;
    }
    
    code {
      background-color: #edf2ff;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: var(--primary);
      flex-grow: 1;
    }
    
    .param {
      margin-top: 0.5rem;
      padding-left: 1.5rem;
      font-size: 0.9rem;
      color: #6c757d;
    }
    
    .param::before {
      content: "• ";
      color: var(--accent);
      font-weight: bold;
    }
    
    footer {
      text-align: center;
      margin-top: 3rem;
      padding: 1.5rem;
      color: #6c757d;
      font-size: 0.9rem;
      border-top: 1px solid var(--border);
    }
    
    @media (max-width: 600px) {
      body {
        padding: 1rem;
      }
      
      .hero {
        padding: 1.5rem 1rem;
      }
      
      h1 {
        font-size: 1.8rem;
      }
      
      .hero-subtitle {
        font-size: 1rem;
      }
      
      .card {
        padding: 1rem;
      }
      
      code {
        font-size: 0.8rem;
        overflow-x: auto;
        display: block;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="hero">
      <h1><i class="fas fa-images"></i> 图片 API 服务</h1>
      <p class="hero-subtitle">提供高性能的已爬取的必应随机图像和每日图像接口，简单易用，简单又快速</p>
    </div>
    
    <div class="card">
      <div class="card-header">
        <div class="card-icon">
          <i class="fas fa-random"></i>
        </div>
        <h2>/api/random</h2>
      </div>
      <ul class="endpoint-list">
        <li class="endpoint-item">
          <span class="method">GET</span>
          <code>${base}/api/random</code>
        </li>
        <li class="param">返回随机图片（默认不重定向）</li>
        
        <li class="endpoint-item">
          <span class="method">GET</span>
          <code>${base}/api/random?redirect=true</code>
        </li>
        <li class="param">返回随机图片（使用302重定向）</li>
      </ul>
    </div>
    
    <div class="card">
      <div class="card-header">
        <div class="card-icon">
          <i class="fas fa-calendar-day"></i>
        </div>
        <h2>/api/daily</h2>
      </div>
      <ul class="endpoint-list">
        <li class="endpoint-item">
          <span class="method">GET</span>
          <code>${base}/api/daily</code>
        </li>
        <li class="param">获取今日图像（默认WebP格式，不重定向）</li>
        
        <li class="endpoint-item">
          <span class="method">GET</span>
          <code>${base}/api/daily?format=jpeg</code>
        </li>
        <li class="param">获取压缩JPEG格式图像</li>
        
        <li class="endpoint-item">
          <span class="method">GET</span>
          <code>${base}/api/daily?format=original</code>
        </li>
        <li class="param">获取原始JPEG格式图像</li>
        
        <li class="endpoint-item">
          <span class="method">GET</span>
          <code>${base}/api/daily?redirect=true</code>
        </li>
        <li class="param">获取今日图像（使用302重定向）</li>
      </ul>
    </div>
  </div>
  
  <footer>
    <div class="container">
      <p>Powered by EO Page Functions</p>
    </div>
  </footer>
</body>
</html>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
