/****************************** ADD DOG BUTTON ******************************/
const add = document.getElementById("add");
add.addEventListener("click", async () => {
    try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random")
        const data = await res.json();

        const url = data.message; // URL of new dog image

        /*--------------- Get breed (Hint: Parse from URL) ---------------- */
        // Your code here
        
        const breed = url.split('/')[4];

        /*------------ Create new dog card with the url above ------------- */
        /* (use the HTML structure for the current dog image in the index.html
            file to create a new image with the url) */
        // Your code here
        const newDog = document.createElement('li');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.setAttribute('src', url);
        //debugger;
        const figCaption = document.createElement('figcaption');
        figCaption.innerText = breed;
        
        figure.appendChild(img);
        figure.appendChild(figCaption);
        newDog.appendChild(figure);

        /* Add the new dog card as a child to the ul in the .gallery element */
        // Your code here

        const galleryUl = document.querySelector('.gallery').children[0];
        galleryUl.appendChild(newDog);


    } catch (e) {
        console.log("Couldn't fetch dog :(")
    }
});

/************************** REMOVE FIRST DOG BUTTON **************************/
const removeFirst = document.getElementById("remove-first");
removeFirst.addEventListener("click", () => {
    /*-------------------- Select the first dog card --------------------- */
    // Your code here
    const firstDog = document.querySelector('.gallery').children[0].children[0];
    
    /*-------------------- Remove the first dog card --------------------- */
    // Your code here
    firstDog.remove();
});

/************************** REMOVE LAST DOG BUTTON ***************************/
const removeLast = document.getElementById("remove-last");
removeLast.addEventListener("click", () => {
    /*-------------------- Select the last dog card ----------------------- */
    // Your code here
    const lastDog = document.querySelector('.gallery').children[0].lastChild;


    /*-------------------- Remove the last dog card ----------------------- */
    // Your code here
    lastDog.remove();
});