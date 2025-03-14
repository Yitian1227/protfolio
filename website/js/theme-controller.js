// 主題控制器
document.addEventListener('DOMContentLoaded', () => {
    // 檢查本地存儲中的主題設置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        
        // 如果頁面上有主題開關，更新它的狀態
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.classList.add('active');
            // 更新文字只在主頁的js中處理，避免重複
        }
    }
    
    // 為主題開關添加點擊事件（如果存在）
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            const isLightMode = this.classList.contains('active');
            
            if (isLightMode) {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}); 