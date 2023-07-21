// Your code here

window.addEventListener('DOMContentLoaded', event => {
    alert('DOM has loaded!');

    window.addEventListener('keydown', e => {
         if (e.code === 'Space') {
            alert('Spacebar was pressed');
        }
    });

    const redInput = document.getElementById('red-input');
    redInput.addEventListener('input', makeRed);

    // add item

    const addItemBtn = document.getElementById('add-item');
    const listAddInput = document.getElementById('list-add');
    const list = document.getElementById('section-2').children[1];
   
    // closure: using listAddInput and list from outside context >
    const itmBtnFunction = (event) => {addItemBtnClick(event, listAddInput, list)};

    // so I can add the function reference inside the addEventListener
    // so I can reference the function later in removeEventListener
    addItemBtn.addEventListener('click', itmBtnFunction);


    // instead of using the approach above, I could have used a regular callback
    // defined outside the context of the present function
    // but then I would have to get the elements everytime the function is invoked
    // achieved with the help of ChatGPT
    // color:

    const section3 = document.getElementById('section-3');
    const colorSelect = document.getElementById('color-select');
    
    const changeColorClosure = (event) => {changeColor(event, section3)};
    
    
    colorSelect.addEventListener('change', changeColorClosure);

    const rmvListenersBtn = document.getElementById('remove-listeners');
    rmvListenersBtn.addEventListener('click', e => {
        redInput.removeEventListener('input', makeRed);
        addItemBtn.removeEventListener('click', itmBtnFunction);
        colorSelect.removeEventListener('change', changeColorClosure);
    })

    const addListenersBtn = document.getElementById('add-listeners');
    addListenersBtn.addEventListener('click', e => {
        redInput.addEventListener('input', makeRed);
        addItemBtn.addEventListener('click', itmBtnFunction);
        colorSelect.addEventListener('change', changeColorClosure);
    });

    const hoverEl = document.getElementById('hover-me');
    hoverEl.addEventListener('mouseover', handleHover);
})

const handleHover = e => {
    const pHovered = document.createElement('p');
    pHovered.innerText = 'I am being hovered';
    e.target.parentElement.appendChild(pHovered);
}

function makeRed(e) {
    const inputValue = e.target.value.toUpperCase();
    if (inputValue === 'RED') {
        e.target.style.backgroundColor = 'red';
    } else {
        e.target.style.backgroundColor = '';
    }
}

const addItemBtnClick = (e, listAddInput, list) => {
    const listItem = listAddInput.value;
    const newListItem = document.createElement('li');
    newListItem.innerText = listItem;
    listAddInput.value = '';
    list.appendChild(newListItem);
}

const changeColor = (e, section3) => {
    section3.style.backgroundColor = e.target.value;
}