
const TOTAL_SCENES = 25;

const scenes = Array.from(document.querySelectorAll(".scene"));
const counter = document.getElementById("sceneCounter");
const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");

let currentScene = 0;
let musicPlaying = false;
let transitionBusy = false;

// Create the extra scenes automatically.
const sceneData = [
    ["A LITTLE UNIVERSE", "A Story Written in Stars", "Some beautiful moments deserve their own universe."],
    ["SOMEWHERE IN SPACE", "A Magical Beginning", "Tonight, the stars have something special to say."],
    ["A LITTLE SPARK", "One in a Billion", "In a universe this big, some people shine differently."],
    ["TONIGHT IS YOURS", "The Universe Is Celebrating", "Every little star has come out to celebrate you."],
    ["A SPECIAL DAY", "A Day Worth Remembering", "Some dates become special because of the people in them."],
    ["A WISH FOR YOU", "Endless Happiness", "May your days be full of laughter and beautiful surprises."],
    ["YOU DESERVE MAGIC", "Keep Shining", "Never forget how much light you bring into this world."],
    ["A SKY FULL OF DREAMS", "Dream Without Limits", "May every dream in your heart find its way to you."],
    ["A LITTLE REMINDER", "You Are Special", "There is only one Umaima, and that is something beautiful."],
    ["SPARKLES & STARDUST", "A Thousand Little Wishes", "May life surprise you with more happiness than you imagine."],
    ["THE MAGIC CONTINUES", "More Beautiful Moments", "May the coming year bring wonderful new memories."],
    ["A HEARTFELT WISH", "Always Keep Smiling", "Your smile deserves a thousand reasons to appear."],
    ["THE NIGHT SKY", "Stars for Your Dreams", "May every star remind you to keep believing."],
    ["A LITTLE PAUSE", "Take a Deep Breath", "This moment is yours. Enjoy every little bit of it."],
    ["SOMETHING SPECIAL", "The Best Is Yet to Come", "Your story is still unfolding, one beautiful page at a time."],
    ["A SECRET SURPRISE", "Can You Feel the Magic?", "There is still something waiting just for you."],
    ["A GIFT FROM THE HEART", "Made With Love", "A small surprise carrying a big birthday wish."],
    ["A MOMENT OF WONDER", "Close Your Eyes", "Imagine a sky filled with every dream you have."],
    ["A LITTLE PROMISE", "More Reasons to Smile", "May happiness find you in the smallest moments."],
    ["THE STARS ARE ALIGNED", "Your Time to Shine", "This is your moment. Let the whole universe sparkle."],
    ["ALMOST THERE", "One Last Little Secret", "Keep going, Umaima. One more surprise is waiting."],
    ["THE GRAND REVEAL", "HAPPY BIRTHDAY", "Today is all about you, Umaima!"],
    ["FROM THE HEART", "A Letter for You", "Some feelings are best shared with a little note."],
    ["MAKE A WISH", "Your Dreams Matter", "Make a wish and let yourself believe in beautiful things."],
    ["UNTIL THE NEXT ADVENTURE", "Keep Shining, Umaima 💜", "Happy Birthday! May your universe always be full of wonder."]
];

function createExtraScenes() {
    const main = document.querySelector(".universe");
    const controls = document.querySelector(".scene-controls");

    if (!main || !controls) return;

    sceneData.forEach((data, index) => {
        const number = index + 1;

        if (number <= scenes.length) return;

        const section = document.createElement("section");
        section.className = "scene generated-scene";
        section.id = `scene${number}`;

        section.innerHTML = `
            <p class="eyebrow">${data[0]}</p>
            <h1 class="glow-title">${data[1]}</h1>
            <p class="subtitle">${data[2]}</p>
            <div class="scene-symbol" aria-hidden="true">✦ ✧ ✦</div>
            <button class="primary-btn" type="button">
                ${number === TOTAL_SCENES ? "Experience Again ↻" : "Continue ✨"}
            </button>
        `;

        const button = section.querySelector("button");

        button.addEventListener("click", () => {
            if (number === TOTAL_SCENES) {
                restartExperience();
            } else {
                nextScene();
            }
        });

        main.insertBefore(section, controls);
    });
}

function getScenes() {
    return Array.from(document.querySelectorAll(".scene"))
        .filter(scene => !scene.classList.contains("scene-controls"));
}

function showScene(index) {
    const allScenes = getScenes();

    if (!allScenes.length) return;

    currentScene = (index + allScenes.length) % allScenes.length;

    allScenes.forEach((scene, i) => {
        scene.classList.toggle("active", i === currentScene);
    });

    if (counter) {
        counter.textContent =
            String(currentScene + 1).padStart(2, "0") +
            " / " +
            String(allScenes.length).padStart(2, "0");
    }

    transitionBusy = true;
    window.setTimeout(() => {
        transitionBusy = false;
    }, 650);

    if (currentScene === 21) {
        launchFireworks();
    }
}

function nextScene() {
    showScene(currentScene + 1);
}

function previousScene() {
    showScene(currentScene - 1);
}

function restartExperience() {
    const gift = document.getElementById("gift");
    const giftMessage = document.getElementById("giftMessage");
    const wishMessage = document.getElementById("wishMessage");

    if (gift) gift.classList.remove("opened");
    if (giftMessage) giftMessage.classList.add("hidden");
    if (wishMessage) wishMessage.classList.add("hidden");

    showScene(0);
}

function openGift() {
    const gift = document.getElementById("gift");
    const message = document.getElementById("giftMessage");

    if (gift) gift.classList.add("opened");
    if (message) message.classList.remove("hidden");

    launchFireworks();
}

function launchFireworks() {
    const colors = ["#45d9ff", "#9b5cff", "#ff8de1", "#ffffff"];

    for (let burst = 0; burst < 5; burst++) {
        const centerX = 15 + Math.random() * 70;
        const centerY = 20 + Math.random() * 45;

        for (let i = 0; i < 18; i++) {
            const particle = document.createElement("span");
            const angle = (Math.PI * 2 * i) / 18;
            const distance = 50 + Math.random() * 110;

            particle.className = "firework";
            particle.style.left = centerX + "vw";
            particle.style.top = centerY + "vh";

            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 14px ${color}`;
            particle.style.setProperty("--dx", Math.cos(angle) * distance + "px");
            particle.style.setProperty("--dy", Math.sin(angle) * distance + "px");

            document.body.appendChild(particle);

            particle.addEventListener("animationend", () => particle.remove());
        }
    }

    const wishMessage = document.getElementById("wishMessage");
    if (wishMessage) wishMessage.classList.remove("hidden");
}

// Music only starts after the visitor clicks the music button.
if (musicBtn && music) {
    musicBtn.addEventListener("click", async () => {
        if (music.paused) {
            try {
                await music.play();
                musicBtn.textContent = "♫ Music On";
            } catch (error) {
                musicBtn.textContent = "♫ Tap to Play";
                console.error("Could not play music. Check static/music.mp3", error);
            }
        } else {
            music.pause();
            musicBtn.textContent = "♫ Music Off";
        }
    });

    music.addEventListener("ended", () => {
        musicBtn.textContent = "♫ Music Off";
    });
}

// Animated galaxy stars.
const canvas = document.getElementById("stars");
const ctx = canvas ? canvas.getContext("2d") : null;

let starList = [];
let canvasWidth = 0;
let canvasHeight = 0;

function resizeCanvas() {
    if (!canvas || !ctx) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = Math.floor(canvasWidth * ratio);
    canvas.height = Math.floor(canvasHeight * ratio);

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.min(180, Math.floor((canvasWidth * canvasHeight) / 6500));

    starList = Array.from({ length: count }, () => ({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        radius: Math.random() * 1.6 + 0.3,
        speed: Math.random() * 0.35 + 0.08,
        alpha: Math.random() * 0.7 + 0.25,
        phase: Math.random() * Math.PI * 2
    }));
}

function animateStars() {
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const time = performance.now() / 1000;

    for (const star of starList) {
        star.y += star.speed;

        if (star.y > canvasHeight) {
            star.y = 0;
            star.x = Math.random() * canvasWidth;
        }

        const twinkle = 0.65 + Math.sin(time * 2 + star.phase) * 0.35;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 220, 255, ${star.alpha * twinkle})`;
        ctx.fill();
    }

    requestAnimationFrame(animateStars);
}

window.addEventListener("resize", resizeCanvas);

document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") nextScene();
    if (event.key === "ArrowLeft") previousScene();
});

createExtraScenes();
resizeCanvas();
animateStars();
showScene(0);
