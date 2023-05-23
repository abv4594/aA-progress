export function changeTitle() {
    // Change the title of the page to "(Your name)'s Portfolio"
    window.document.title = "Your name's Portfolio";
    // Your code here
}

export function changeHeader() {
    // Change the name in the h1 of the page to your name
    document.body.children[0].children[0].innerText = "My name";
    // Your code here
}

export function changeAboutMe() {
    /* Update the first paragraph in the About Me section with a small
     passage about yourself */
    document.body.children[1].children[1].innerText = "Yaasss queen!"
    // Your code here
}