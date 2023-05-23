import data from "./data.json" assert {type: 'json'}

const daysInMs = 1000*60*60*24;
const hoursInMs = 1000*60*60;
const minutesInMs = 1000*60;
const niver = new Date ("01/25/2024");


window.onload = () => {
    header();
    main();
    startTimer();
}

const header = () => {
    const headerSection = document.createElement("header");
    const h1Header = document.createElement("h1");
    h1Header.innerText = "Rechain Path";
    h1Header.setAttribute('id','header');
    h1Header.setAttribute('class', 'name');
    headerSection.appendChild(h1Header);
    document.body.appendChild(headerSection);
}

const main = () => {
    const mainElement = document.createElement('section');
    
    Object.keys(data).forEach(list => {
        let ul = document.createElement('ul');
        let h2 = document.createElement('h2');
        ul.classList.add('list');
        h2.innerText = list;
    
        data[list].forEach(li => {
            let liElement = document.createElement('li');
            liElement.classList.add('list-element');
            liElement.innerText = li;
            ul.appendChild(liElement);
        })

        mainElement.appendChild(h2);
        mainElement.appendChild(ul);
    })

    // inserting Clock element

    const clock = document.createElement('div');

    clock.innerHTML = `
        <h2> Local Time </h2>
        <ul class="list">
            <li class="list-element"> I live in Recife, and the local time is 
                <span id="clock"> ${(new Date()).toLocaleString('en-US',  {timeZone: "America/Fortaleza"})}. </span>
            </li>    
            <li class="list-element"> There are <span id="toNiver"> </span> 
            </li>
        </ul>
    `;



    mainElement.appendChild(clock);

    //

    document.body.appendChild(mainElement);

    updateClock();

}

const startTimer = () => {
    setTimeout(updateClock, "1000");
}

const updateClock = () => {
    const now = new Date();
    const dif = timeDif(niver, now);
    const clock = document.getElementById('clock');
    clock.innerText = now.toLocaleString('en-US', { timeZone: "America/Fortaleza" })
    const toNiver = document.getElementById('toNiver');
    toNiver.innerText = `${dif[0]} days, ${dif[1]} hours, ${dif[2]} minutes, ${dif[3]} seconds to my niver`;
    startTimer();
}

const timeDif = (date1, date2) => {
    const dif = (date1.getTime() - date2.getTime());
    const difInDays = Math.floor(dif/daysInMs);
    const difInHours = Math.floor((dif - difInDays * daysInMs) / hoursInMs);
    const difInMinutes = Math.floor((dif - difInDays * daysInMs - difInHours * hoursInMs) / minutesInMs);
    const difInSeconds = Math.floor((dif - difInDays * daysInMs - difInHours * hoursInMs - difInMinutes * minutesInMs) / 1000);
    return [difInDays, difInHours, difInMinutes, difInSeconds];
}




