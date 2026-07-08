/*
WINDY CITY WEAPON STATS
FULL WEAPON SYSTEM
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




// Image Locations

const weaponImages = {

    "Pistol - Beretta": "images/beretta.png",
    "Pistol Mk II - Glock 45": "images/glock45.png",
    "Combat Pistol - G19x": "images/g19x.png",
    "SNS Pistol - Walter P90": "images/walterp90.png",
    "SNS Pistol Mk II - Hellcat": "images/hellcat.png",
    "Heavy Pistol - FN": "images/fn.png",
    "Vintage Pistol - Glock 41": "images/glock41.png",
    "Ceramic Pistol - SigP230": "images/sigp230.png",

    "SMG - Banshee ARP": "images/banshee_arp.png",
    "SMG Mk II - 4 Inch ARP (FRT)": "images/arp_4inch.png",
    "Machine Pistol - Tec 9": "images/tec9.png",
    "AP Pistol - G47 Switch": "images/g47_switch.png",
    "Pistol .50 - FN 57": "images/fn57.png",
    "WM 29 Pistol - Glock 30": "images/glock30.png",
    "Compact Rifle - Micro Draco": "images/micro_draco.png",
    "Heavy Rifle - Honey Badger": "images/honey_badger.png",

    "Carbine Rifle - 300 Blackout": "images/blackout300.png",
    "Carbine Rifle Mk II - Micro ARP": "images/micro_arp.png",
    "Compact Rifle - Black Draco": "images/black_draco.png",
    "Micro SMG - Kriss Vector": "images/vector.png",
    "Tactical SMG - Mac 10": "images/mac10.png",
    "Combat PDW - DDM4": "images/ddm4.png"

};




// Spin Amounts

const spinAmount = {

    "Tier 0": 2,
    "Tier 1": 4,
    "Tier 1.5": 4,
    "Tier 2": 6

};



let selectedTier = "Tier 0";



const tierButtons = document.querySelectorAll(".tier-btn");

const spinButton = document.querySelector("#spin");

const spinnerText = document.querySelector("#spinner");

const resultText = document.querySelector("#result");

const weaponName = document.querySelector("#weaponName");

const weaponImage = document.querySelector("#weaponImage");

const poolTitle = document.querySelector("#poolTitle");

const poolList = document.querySelector("#poolList");





// Weapon Pool Display

function updateWeaponPool(tier) {

    poolTitle.textContent =
    `${tier} Weapon Pool`;


    poolList.innerHTML = "";


    guns[tier].forEach(weapon => {


        const item = document.createElement("div");


        item.className = "weapon-item";


        item.textContent = weapon;


        poolList.appendChild(item);


    });

}





// Creates Limited Spin Pool

function getSpinPool(tier) {


    let pool = [...guns[tier]];


    pool.sort(() => Math.random() - 0.5);


    return pool.slice(
        0,
        spinAmount[tier]
    );

}





// Tier Colors

function updateTierColor() {


    let color = "#808080";


    if(selectedTier === "Tier 1")
        color = "#00ff66";


    if(selectedTier === "Tier 1.5")
        color = "#0099ff";


    if(selectedTier === "Tier 2")
        color = "#ffcc00";


    document.documentElement.style
    .setProperty(
        "--tier-color",
        color
    );

}





// Tier Selection

tierButtons.forEach(button => {


    button.addEventListener("click", () => {


        selectedTier = button.dataset.tier;


        tierButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        weaponName.textContent = "No Drop";

        weaponImage.src = "";


        resultText.textContent =
        "Ready to spin...";


        updateTierColor();

        updateWeaponPool(selectedTier);


    });

});







// Spin Button

spinButton.addEventListener("click", () => {


    const weaponList =
    getSpinPool(selectedTier);



    let count = 0;



    spinnerText.classList.add("spinning");



    const spin = setInterval(() => {


        const randomGun =
        weaponList[
            Math.floor(
                Math.random() *
                weaponList.length
            )
        ];



        spinnerText.textContent =
        randomGun;



        count++;



        if(count >= 35) {



            clearInterval(spin);



            spinnerText.classList.remove(
                "spinning"
            );



            const finalGun =
            weaponList[
                Math.floor(
                    Math.random() *
                    weaponList.length
                )
            ];



            spinnerText.textContent =
            finalGun;


            weaponName.textContent =
            finalGun;


            resultText.textContent =
            `Your Drop: ${finalGun}`;


            weaponImage.src =
            weaponImages[finalGun];



        }



    }, 80);



});





// Load Default

updateTierColor();

updateWeaponPool("Tier 0");
