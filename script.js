"use strict";

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".btn--rules");

const diceEl = document.querySelector(".dice");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const currentEl0 = document.getElementById("current--0");
const currentEl1 = document.getElementById("current--1");
const scoreEl0 = document.getElementById("score--0");
const scoreEl1 = document.getElementById("score--1");
let activePlayer = 0;
let currentScore = 0;
let scores = [0, 0];
let playing = true;

diceEl.classList.add("hidden");
currentEl0.textContent = "0";
currentEl1.textContent = "0";
scoreEl0.textContent = "0";
scoreEl1.textContent = "0";

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnOpenModal.addEventListener("click", function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

btnRoll.addEventListener("click", function () {
    if (playing) {
        diceEl.classList.remove("hidden");
        let dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `img/dice-${dice}.png`;

        if (dice != 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add("hidden");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");
            document.getElementById(`name--${activePlayer}`).textContent =
                "🎉 Winner!";
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", function () {
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--winner");
    document.getElementById(
        `name--${activePlayer}`
    ).textContent = `Player ${activePlayer}`;
    playing = true;
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    currentEl0.textContent = "0";
    currentEl1.textContent = "0";
    scoreEl0.textContent = "0";
    scoreEl1.textContent = "0";
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
});
