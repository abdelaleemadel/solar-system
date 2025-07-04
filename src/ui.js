export function setupUI(
  planets,
  togglePause,
  getElapsedTime,
  updateOffset,
  isPausedGetter
) {
  createSliders(planets);
  implementPauseBtn(togglePause, getElapsedTime, updateOffset, isPausedGetter);
}

function createSliders(planets) {
  const controlsDiv = document.getElementById("controls");
  planets.forEach((planet) => {
    const wrapper = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = `${planet.name} Speed: `;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = 0.02;
    slider.max = 15;
    slider.step = 0.02;
    slider.value = planet.speed;

    slider.addEventListener("input", (e) => {
      planet.setSpeed(parseFloat(e.target.value));
    });

    wrapper.appendChild(label);
    wrapper.appendChild(slider);
    controlsDiv.appendChild(wrapper);
  });
}
function implementPauseBtn(
  togglePause,
  getElapsedTime,
  updateOffset,
  isPausedGetter
) {
  let pausedAt = 0;
  const pauseBtn = document.getElementById("pauseBtn");
  pauseBtn.addEventListener("click", () => {
    togglePause();
    if (isPausedGetter()) {
      pausedAt = getElapsedTime();
      pauseBtn.textContent = "▶️ Resume";
    } else {
      const resumedAt = getElapsedTime();
      updateOffset(resumedAt - pausedAt);
      pauseBtn.textContent = "⏸️ Pause";
    }
  });
}
