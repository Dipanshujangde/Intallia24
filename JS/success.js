const counters = document.querySelectorAll(".ss-counter");
let started = false;

function startCounters() {
  if (started) return;

  counters.forEach(counter => {
    const target = parseFloat(counter.dataset.target);
    let count = 0;
    const increment = target / 80;

    const update = () => {
      count += increment;
      if (count < target) {
        counter.textContent = target % 1 === 0 ? Math.floor(count) : count.toFixed(1);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  });

  started = true;
}

const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      startCounters();
    }
  },
  { threshold: 0.4 }
);

observer.observe(document.querySelector(".ss-success-stories"));
