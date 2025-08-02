// Mengatur canvas
const canvas = document.getElementById('butterfly-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Memuat gambar kupu-kupu
const butterflyImg = new Image();
butterflyImg.src = 'butterfly.png'; // Kode ini mencari gambar 'butterfly.png'

let butterflies = [];
const numButterflies = 25; // Jumlah kupu-kupu

// Class untuk setiap objek kupu-kupu
class Butterfly {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // ## PERUBAHAN UKURAN KUPU-KUPU ADA DI BARIS INI ##
        this.size = Math.random() * 0.015 + 0.008; // Ukuran kupu-kupu lebih kecil
        // ###############################################
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        // Untuk gerakan melayang yang lebih natural
        this.angle = Math.random() * 2 * Math.PI;
        this.angleSpeed = Math.random() * 0.02;
    }

    // Memperbarui posisi kupu-kupu
    update() {
        this.x += this.speedX + Math.sin(this.angle) * 0.5; // Gerakan meliuk
        this.y += this.speedY;
        this.angle += this.angleSpeed;

        // Jika keluar layar, muncul kembali dari sisi berlawanan
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = -50;
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.y < -50) this.y = canvas.height + 50;
    }

    // Menggambar kupu-kupu ke canvas
    draw() {
        if (butterflyImg.complete) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(Math.sin(this.angle) * 0.25); // Efek rotasi saat terbang
            const width = butterflyImg.width * this.size;
            const height = butterflyImg.height * this.size;
            ctx.drawImage(butterflyImg, -width / 2, -height / 2, width, height);
            ctx.restore();
        }
    }
}

// Fungsi untuk inisialisasi
function init() {
    butterflies = [];
    for (let i = 0; i < numButterflies; i++) {
        butterflies.push(new Butterfly());
    }
}

// Loop animasi utama
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas
    for (let i = 0; i < butterflies.length; i++) {
        butterflies[i].update();
        butterflies[i].draw();
    }
    requestAnimationFrame(animate);
}

// Mulai animasi hanya setelah gambar dimuat
butterflyImg.onload = () => {
    init();
    animate();
};

// Atur ulang canvas jika ukuran jendela browser berubah
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Inisialisasi ulang kupu-kupu sesuai ukuran baru
});