
// db structure

/*
{
    id: image object
}

*/


// Your code here

import CatImg from "./catImg.js";

const apiKey = {
    headers: {
        'x-api-key': 'live_VGq06gFIRZh167LbYJcB8x9wFiCaJGmfaMxV5XQGXR8dbD6FftvbrVZ1YjIFa9Nj'
        }
}

// some global variables that will be used repeatedely 
let img; // obj that holds current image
let imgEl; // points to the image element in the html
let scoreEl; // points to the element showing the score
let commentEl; // element with comment
let commentsEl; // element with comments


window.onload = e => {
 
    
    // get elements
    imgEl = document.getElementById("img"); 
    scoreEl = document.getElementById("score");
    commentEl = document.getElementById("comment");
    commentsEl = document.getElementById("comments");

    const reloadBtn = document.getElementById("reload");
    const upvoteBtn = document.getElementById("upvote");
    const downvoteBtn = document.getElementById("downvote");
    const submitBtn = document.getElementById("submit");

    reloadBtn.addEventListener('click', loadImg);
    upvoteBtn.addEventListener('click', upvote);
    downvoteBtn.addEventListener('click', downvote);
    submitBtn.addEventListener('click', submit);
    
    if (localStorage.getItem("lastImg")) {
        // reload db
        img = JSON.parse(localStorage.getItem("lastImg"));
        setImg();
    } else {
        loadImg();
    }
}

function loadImg() {
    fetch("https://api.thecatapi.com/v1/images/search", apiKey)
    .then(function(res) {
        return res.text();
    })
    .then(function(data) {
        img = JSON.parse(data)[0]; // will always point to current image
        img.score = 0; // adds score
        img.comments = []; // adds comments array
        localStorage.setItem("lastImg", JSON.stringify(img));
        reset();
        setImg();
    })
    
}

function setImg() {
    imgEl.src = img.url;
    scoreEl.innerText = `Popularity score: ${img.score}`
    console.log(img.comments);
    img.comments.forEach(addComment);
}

function reset() {
    commentEl.value = "";
    commentsEl.innerHTML = "";
}
  

function upvote(e) {
    img.score ++;
    scoreEl.innerText = `Popularity score: ${img.score}`;
    localStorage.setItem("lastImg", JSON.stringify(img));
}

function downvote(e) {
    img.score --;
    scoreEl.innerText = `Popularity score: ${img.score}`;
    localStorage.setItem("lastImg", JSON.stringify(img));
}

function submit(e) {
    img.comments.push(commentEl.value);
    localStorage.setItem("lastImg", JSON.stringify(img));
    addComment(commentEl.value);
}

function addComment(comment) {
    const newCommentEl = document.createElement("p");
    newCommentEl.innerText = comment;
    commentsEl.appendChild(newCommentEl);
}