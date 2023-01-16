/**
 * 参考知乎专栏搭建
 * @link https://zhuanlan.zhihu.com/p/398412469
 */

// 常量
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// 设定画布的大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
// 处理页面缩放
window.addEventListener("resize", resizeCanvas);

// 所有的烟花
let fireworks = new Array();
function addFires(x, y) {
    const particleCount = Math.floor(Math.random() * 30) + 70;
    const firework = new Firework(x, y, particleCount);
    fireworks.push(firework);
}

// 获取鼠标点击事件
function clickSite(ev) {
    // 获取当前鼠标的坐标
    let x = ev.clientX;
    let y = ev.clientY;
    // 绘制
    addFires(x, y);
}
document.addEventListener("click", clickSite);

// 绘制烟花
function drawFires() {
    for (let firework of fireworks) {
        for (let particle of firework.particles) {
            // 粒子移动
            let moveX = particle.speed[0] / 30; // 30fps
            let moveY = particle.speed[1] / 30;
            particle.x += moveX;
            particle.y += moveY;

            // 更新数据, 让圆扩散开来
            particle.speed[1] += 98 / 30;
            particle.speed[0] *= 1 - particle.alpha / 30;
            particle.speed[1] *= 1 - particle.alpha / 30;
            particle.alpha -= 0.01;

            // 如果透明度小于 0 就删除这个粒子
            if (particle.alpha <= 0) {
                // 跳过这次循环，不进行绘制
                continue;
            }

            // 开始绘制
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, Math.PI * 2, false);
            ctx.closePath();
            ctx.fillStyle = particle.getColor();
            ctx.fill();
        }
        firework.particles = firework.particles.reduce((tot, cur) => {
            cur.alpha > 0 && tot.push(cur);
            return tot;
        }, []);
    }
    fireworks = fireworks.reduce((tot, cur) => {
        cur.particles.length > 0 && tot.push(cur);
        return tot;
    }, []);
}

// 渲染,更新粒子的信息
let updateTime = 0;
let newFireTime = 0;
function tick(timestamp) {
    // 计算间隔时间
    const updateInterval = timestamp - updateTime;
    const newFireInterval = timestamp - newFireTime;
    // 设置拖影
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,' + 10 / 100 + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    // 自动烟花
    if (newFireInterval > 300) { // 300 ms
        addFires(Math.random() * (canvas.width - 40) + 20, Math.random() * (canvas.height - 40) + 20);
        newFireTime = timestamp;
    }
    // 更新画布
    if (updateInterval > 33) { // 30 fps
        drawFires();
        updateTime = timestamp;
    }
    window.requestAnimationFrame(tick);
}
tick()

