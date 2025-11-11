const imageSets = {
  before: [
    "images/before/1.png",
    "images/before/2.png",
    "images/before/3.png",
    "images/before/4.png",
  ],
  during: ["images/during/1.jpg", "images/during/2.png", "images/during/3.png"],
  after: [
    "images/after/1.png",
    "images/after/2.png",
    "images/after/3.png",
    "images/after/4.png",
    "images/after/5.png",
  ],
};

const currentIndexes = { before: 0, during: 0, after: 0 };

document.querySelectorAll(".arrow").forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const stage = arrow.dataset.stage;
    const direction = arrow.dataset.direction;
    const img = arrow.parentElement.querySelector("img");
    const total = imageSets[stage].length;

    if (direction === "next") {
      currentIndexes[stage] = (currentIndexes[stage] + 1) % total;
    } else {
      currentIndexes[stage] = (currentIndexes[stage] - 1 + total) % total;
    }

    img.style.opacity = 0;
    setTimeout(() => {
      img.src = imageSets[stage][currentIndexes[stage]];
      img.style.opacity = 1;
    }, 0);
  });
});

(function () {
  const smallCounters = Array.from(document.querySelectorAll(".small-sec")).map(
    () => Math.floor(Math.random() * 8) + 2
  );
  const bigCounters = Array.from(document.querySelectorAll(".big-sec")).map(
    () => Math.floor(Math.random() * 8) + 2
  );

  const smallEls = document.querySelectorAll(".small-sec");
  const bigEls = document.querySelectorAll(".big-sec");

  setInterval(() => {
    smallEls.forEach((el, i) => {
      smallCounters[i]--;
      if (smallCounters[i] < 0)
        smallCounters[i] = Math.floor(Math.random() * 8) + 2;
      el.textContent = smallCounters[i];
    });

    bigEls.forEach((el, i) => {
      bigCounters[i]--;
      if (bigCounters[i] < 0)
        bigCounters[i] = Math.floor(Math.random() * 8) + 2;
      el.textContent = bigCounters[i];
    });
  }, 1200);
})();

let typedKeys = "";

document.addEventListener("keydown", (e) => {
  typedKeys += e.key.toLowerCase();
  if (typedKeys.length > 5) typedKeys = typedKeys.slice(-5);

  if (typedKeys === "bomba") {
    triggerBombaEasterEgg();
    typedKeys = "";
  }
});

function triggerBombaEasterEgg() {
  const img = document.createElement("img");
  img.src = "images/after/4.png";
  img.style.position = "fixed";
  img.style.opacity = 0.4;
  img.style.top = "50%";
  img.style.left = "50%";
  img.style.transform = "translate(-50%, -50%)";
  img.style.width = "1000px";
  img.style.zIndex = "9999";
  img.style.borderRadius = "15px";
  img.style.boxShadow = "0 0 20px yellow";
  document.body.appendChild(img);

  const audio = new Audio("mp/gragup.mp3");
  audio.play();

  const allDivs = Array.from(document.querySelectorAll("div"));
  const startTimes = allDivs.map(() => Math.random() * 1000);

  const danceInterval = setInterval(() => {
    const time = Date.now();
    allDivs.forEach((div, i) => {
      const offsetX = Math.sin((time + startTimes[i]) / 200) * 20;
      const rotate = Math.sin((time + startTimes[i]) / 300) * 10;
      div.style.transform = `translateX(${offsetX}px) rotate(${rotate}deg)`;
    });
  }, 20);

  function handleClickOutside(event) {
    img.remove();
    audio.pause();
    audio.currentTime = 0;
    clearInterval(danceInterval);
    allDivs.forEach((div) => {
      div.style.transform = "";
    });

    document.removeEventListener("click", handleClickOutside);
  }

  document.addEventListener("click", handleClickOutside);
}
