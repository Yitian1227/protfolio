// 定義網格大小和單元格大小
const GRID_SIZE = 12;
const CELL_SIZE = 60; // pixels per grid cell

// 初始化框架數據
const initialFrames = [
  {
    id: 1,
    video: "https://youtu.be/XHJUNYVGd84",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: "./images/1_corner.png",
    edgeHorizontal: "./images/1_edge_h.png",
    edgeVertical: "./images/1_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 2,
    video: "https://youtu.be/s0HbzURvl80",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: "./images/2_corner.png",
    edgeHorizontal: "./images/2_edge_h.png",
    edgeVertical: "./images/2_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 3,
    video: "https://youtu.be/q9Tb40_gHTw",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: "./images/3_corner.png",
    edgeHorizontal: "./images/3_edge_h.png",
    edgeVertical: "./images/3_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 4,
    video: "https://youtu.be/WfHGchaxA7Q",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: "./images/4_corner.png",
    edgeHorizontal: "./images/4_edge_h.png",
    edgeVertical: "./images/4_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 5,
    video: "https://youtu.be/vOxPTRxTUDs",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: "./images/5_corner.png",
    edgeHorizontal: "./images/5_edge_h.png",
    edgeVertical: "./images/5_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 6,
    video: "https://youtu.be/F61hfOajAwI",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "./images/6_corner.png",
    edgeHorizontal: "./images/6_edge_h.png",
    edgeVertical: "./images/6_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 7,
    video: "https://youtu.be/7mc_FYVJmzE",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: "./images/7_corner.png",
    edgeHorizontal: "./images/7_edge_h.png",
    edgeVertical: "./images/7_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 8,
    video: "https://youtu.be/F0WFKodpBP0",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: "./images/8_corner.png",
    edgeHorizontal: "./images/8_edge_h.png",
    edgeVertical: "./images/8_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 9,
    video: ".https://youtu.be/6friTerMGJo",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: "./images/9_corner.png",
    edgeHorizontal: "./images/9_edge_h.png",
    edgeVertical: "./images/9_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    isHovered: false,
  }
];

class DynamicFrameLayout {
  constructor() {
    this.frames = [...initialFrames];
    this.hovered = null;
    this.hoverSize = 6;
    this.gapSize = 8;
    this.autoplayMode = "all";
    
    this.init();
  }

  init() {
    // 創建框架網格
    this.createFrameGrid();
    // 添加事件監聽器
    this.addEventListeners();
    
    // 初始化 YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // 當 API 準備好時初始化所有播放器
    window.onYouTubeIframeAPIReady = () => {
      document.querySelectorAll('[data-youtube-iframe]').forEach(frame => {
        const iframeId = frame.dataset.youtubeIframe;
        new YT.Player(iframeId, {
          events: {
            'onReady': (event) => {
              event.target.playVideo();
              event.target.mute();
            }
          }
        });
      });
    };
  }

  createFrameGrid() {
    const grid = document.createElement('div');
    grid.className = 'frame-grid';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    grid.style.gridTemplateRows = 'repeat(3, 1fr)';
    grid.style.gap = `${this.gapSize}px`;
    grid.style.width = '100%';
    grid.style.height = '100%';

    this.frames.forEach(frame => {
      const frameElement = this.createFrameElement(frame);
      grid.appendChild(frameElement);
    });

    document.getElementById('dynamic-frame').appendChild(grid);
  }

  createFrameElement(frame) {
    const frameElement = document.createElement('div');
    frameElement.className = 'frame';
    frameElement.dataset.frameId = frame.id;
    
    // 特殊處理第9格，允許圖片和影片
    if (frame.id === 9) {
      const isYouTube = frame.video.includes('youtu');
      const isImage = /\.(gif|jpe?g|png|webp|bmp)$/i.test(frame.video);
      
      if (isYouTube) {
        const iframe = document.createElement('iframe');
        const videoId = frame.video.includes('youtu.be/') 
          ? frame.video.split('youtu.be/')[1]
          : frame.video.split('v=')[1];
        
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0`;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.border = 'none';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        frameElement.appendChild(iframe);
        frameElement.dataset.youtubeIframe = true;
      } else if (isImage) {
        const img = document.createElement('img');
        img.src = frame.video;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        frameElement.appendChild(img);
      }
      return frameElement;
    }
    
    // 其他格子的原有邏輯
    const isYouTube = frame.video.includes('youtu');
    const isImage = /\.(gif|jpe?g|png|webp|bmp)$/i.test(frame.video);
    
    if (isYouTube) {
      const iframe = document.createElement('iframe');
      // 從 URL 提取 video ID
      const videoId = frame.video.includes('youtu.be/') 
        ? frame.video.split('youtu.be/')[1]
        : frame.video.split('v=')[1];
      
      // 第一個影片使用特定時間範圍
      const timeParams = videoId === 'vOxPTRxTUDs' ? '&start=28&end=58' : '';
      
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0${timeParams}`;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = 'none';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      frameElement.appendChild(iframe);
      
      // 儲存 iframe 參考以便後續控制
      frameElement.dataset.youtubeIframe = true;
    } else if (isImage) {
      const img = document.createElement('img');
      img.src = frame.video;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain'; // 改為 contain 以保持圖片比例
      frameElement.appendChild(img);
    } else {
      const video = document.createElement('video');
      video.src = frame.video;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      frameElement.appendChild(video);
    }
    
    return frameElement;
  }

  addEventListeners() {
    // 框架懸停事件
    document.querySelectorAll('.frame').forEach(frame => {
      frame.addEventListener('mouseenter', () => this.handleFrameHover(frame));
      frame.addEventListener('mouseleave', () => this.handleFrameLeave(frame));
    });
  }

  handleFrameHover(frame) {
    const frameId = parseInt(frame.dataset.frameId);
    const frameData = this.frames.find(f => f.id === frameId);
    if (frameData) {
      frameData.isHovered = true;
      this.updateLayout();
    }
  }

  handleFrameLeave(frame) {
    const frameId = parseInt(frame.dataset.frameId);
    const frameData = this.frames.find(f => f.id === frameId);
    if (frameData) {
      frameData.isHovered = false;
      this.updateLayout();
    }
  }

  updateLayout() {
    // 更新網格佈局
    const grid = document.querySelector('.frame-grid');
    const hoveredFrame = this.frames.find(f => f.isHovered);
    
    if (hoveredFrame) {
      const row = Math.floor(hoveredFrame.defaultPos.y / 4);
      const col = Math.floor(hoveredFrame.defaultPos.x / 4);
      
      const nonHoveredSize = (12 - this.hoverSize) / 2;
      const rowSizes = [0, 1, 2].map(r => r === row ? `${this.hoverSize}fr` : `${nonHoveredSize}fr`).join(' ');
      const colSizes = [0, 1, 2].map(c => c === col ? `${this.hoverSize}fr` : `${nonHoveredSize}fr`).join(' ');
      
      grid.style.gridTemplateRows = rowSizes;
      grid.style.gridTemplateColumns = colSizes;
    } else {
      grid.style.gridTemplateRows = 'repeat(3, 1fr)';
      grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
  }
}

// 當 DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
  new DynamicFrameLayout();
}); 