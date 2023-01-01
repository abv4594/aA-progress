let score = 0;
let molesLeft = 30;
let popupLength = 3000;
let hideTimeout;
let clickable = false;

function popUpRandomMole() {
  if (molesLeft <= 0) {
    document
      .querySelector(".sb__game-over")
      .classList.remove("sb__game-over--hidden");
    return;
  }

  let moleHeads = document.querySelectorAll(
    ".wgs__mole-head:not(.wgs__mole-head--whacked)"
  );
  if (moleHeads.length === 0) {
    // modified this here to unwhack the moles once
    // they'd all been whacked.
    moleHeads = document.querySelectorAll(".wgs__mole-head");
    moleHeads.forEach((mole) => unwhackMole(mole));
  }
  const moleIndex = Math.floor(Math.random() * moleHeads.length);
  const moleHead = moleHeads[moleIndex];

  clickable = true;
  moleHead.classList.remove("wgs__mole-head--hidden");

  molesLeft -= 1;
  document.querySelector(".sb__moles").innerHTML = molesLeft;

  hideTimeout = setTimeout(() => hideMole(moleHead), popupLength);
}
// added and used this function to remove the --whacked
// modifier from moles after they'd all been whacked
// otherwise the game never finished, it stopped
// after all moles had been whacked once
function unwhackMole(mole) {
  mole.classList.remove("wgs__mole-head--whacked");
}

function hideMole(mole) {
  clickable = false;
  mole.classList.add("wgs__mole-head--hidden");

  setTimeout(popUpRandomMole, 500);
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(popUpRandomMole, 0);

  const moleHeads = document.querySelectorAll(".wgs__mole-head");
  for (let moleHead of moleHeads) {
    moleHead.addEventListener("click", (event) => {
      if (!clickable) return;

      score += 1;
      document.querySelector(".sb__score").innerHTML = score;
      popupLength -= popupLength / 10;

      clearTimeout(hideTimeout);
      hideMole(event.target);

      // UNCOMMENT THIS LINE OF CODE WHEN DIRECTED
      event.target.classList.add("wgs__mole-head--hidden");

      // UNCOMMENT THIS LINE OF CODE WHEN DIRECTED FOR THE BONUS
      event.target.classList.add("wgs__mole-head--whacked");
    });
  }
});
