/*
WINDY CITY WEAPON STATS
WEAPON SYSTEM
*/


const guns = {

    "Tier 0": [

        "Pistol - Beretta",
        "Pistol Mk II - Glock 45",
        "Combat Pistol - G19x",
        "SNS Pistol - Walter P90",
        "SNS Pistol Mk II - Hellcat",
        "Heavy Pistol - FN",
        "Vintage Pistol - Glock 41",
        "Ceramic Pistol - SigP230"

    ],


    "Tier 1": [

        "Pistol - Beretta",
        "Pistol Mk II - Glock 45",
        "Combat Pistol - G19x",
        "SNS Pistol - Walter P90",
        "SNS Pistol Mk II - Hellcat",
        "Heavy Pistol - FN",
        "Vintage Pistol - Glock 41",
        "Ceramic Pistol - SigP230"

    ],


    "Tier 1.5": [

        "SMG - Banshee ARP",
        "SMG Mk II - 4 Inch ARP (FRT)",
        "Machine Pistol - Tec 9",
        "AP Pistol - G47 Switch",
        "Pistol .50 - FN 57",
        "Heavy Pistol - FN",
        "WM 29 Pistol - Glock 30",
        "Compact Rifle - Micro Draco",
        "Heavy Rifle - Honey Badger"

    ],


    "Tier 2": [

        "Carbine Rifle - 300 Blackout",
        "Carbine Rifle Mk II - Micro ARP",
        "Compact Rifle - Black Draco",
        "AP Pistol - G47 Switch",
        "Micro SMG - Kriss Vector",
        "Tactical SMG - Mac 10",
        "Combat PDW - DDM4"

    ]

};




// Amount of guns allowed in each spin pool

const spinAmount = {

    "Tier 0": 2,

    "Tier 1": 4,

    "Tier 1.5": 5,

    "Tier 2": 6

};




// Creates temporary spin pool

function getSpinPool(tier) {

    let allGuns = [...guns[tier]];


    allGuns.sort(() => Math.random() - 0.5);


    return allGuns.slice(
        0,
        spinAmount[tier]
    );

}




let selectedTier = "Tier 0";



const tierButtons = document.querySelectorAll(".tier-btn");

const spinButton = document.querySelector("#spin");

const spinnerText = document.querySelector("#spinner");

const resultText = document.querySelector("#result");

const weaponName = document.querySelector("#weaponName");





// Tier Colors

function updateTierColor() {

    let color = "#808080";


    if (selectedTier === "Tier 1") {

        color = "#00ff66";

    }


    if (selectedTier === "Tier 1.5") {

        color = "#0099ff";

    }


    if (selectedTier === "Tier 2") {

        color = "#ffcc00";

    }


    document.documentElement.style
    .setProperty("--tier-color", color);

}





// Select Tier

tierButtons.forEach(button => {


    button.addEventListener("click", () => {


        selectedTier = button.dataset.tier;


        tierButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        weaponName.textContent = "No Drop";

        resultText.textContent = "Ready to spin...";


        updateTierColor();


    });


});






// Save Drop

function saveDrop(gun) {

    localStorage.setItem(
        "lastDrop",
        gun
    );

}




// Load Last Drop

function loadDrop() {

    const saved = localStorage.getItem("lastDrop");


    if(saved) {

        resultText.textContent =
        `Last Drop: ${saved}`;

    }

}





// Spin System

spinButton.addEventListener("click", () => {


    const weaponList = getSpinPool(selectedTier);


    let count = 0;


    spinnerText.classList.add("spinning");



    const spin = setInterval(() => {


        const randomGun =
        weaponList[
            Math.floor(
                Math.random() * weaponList.length
            )
        ];


        spinnerText.textContent = randomGun;


        count++;



        if(count >= 35) {


            clearInterval(spin);


            spinnerText.classList.remove("spinning");



            const finalGun =
            weaponList[
                Math.floor(
                    Math.random() * weaponList.length
                )
            ];



            spinnerText.textContent = finalGun;


            resultText.textContent =
            `Your Drop: ${finalGun}`;


            weaponName.textContent = finalGun;


            saveDrop(finalGun);


        }



    }, 80);


});





updateTierColor();

loadDrop();
