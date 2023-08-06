// Your code here
window.addEventListener('DOMContentLoaded', main);
function main(e) {
    let btn = document.getElementById('add');
    btn.addEventListener('click', btnClick);
}
function btnClick(e) {
    e.preventDefault();
    let listUl = document.getElementById('shopping-list');
    let itemInput = document.getElementById('name');
    let itemLi = document.createElement('li');
    let typeSelect = document.getElementById('type');
    itemLi.innerText = itemInput.value;
    itemLi.setAttribute('data-type', typeSelect.value);
    listUl.append(itemLi);
}