let input, button, list, result, chooseBtn;

const colors = ['red', 'green', 'blue', 'orange', 'brown', 'black'];
const resultBaseColor = 'rgb(21, 207, 145);';

let members = [];

document.addEventListener('DOMContentLoaded', function() {
    input = document.querySelector('.add-input');
    button = document.querySelector('.add-btn');
    list = document.querySelector('.list');
    result = document.querySelector('.result');
    chooseBtn = document.querySelector('.choose-btn');

    button.addEventListener('click', function() {
        addMember();
    });

    input.addEventListener('keyup', function(event) {
        if(event.key === 'Enter') {
            addMember();
        }
    });

    chooseBtn.addEventListener('click', function() {
        choose();
    });
});

function addMember() {
    if(input.value) {
        let names = input.value.split(',');

        names.forEach(function(name) {
            name = name.trim();
            members.push(name);
        });
    
        renderList();
    }
}

function renderList() {
    list.innerHTML = '';

    members.forEach(function(member, index) {
        let li = document.createElement('li');

        li.innerHTML = member + `<span class='delete' onclick="deleteItem(${index})">-</span>`;
        input.value = '';
        
        list.appendChild(li);
    });
}

async function choose() {
    if(members.length > 0) {
        await animateChoosing();

        let choosenIndex = Math.round(Math.random() * (members.length - 1));
    
        result.innerText = members[choosenIndex];

        members = members.filter(function(member, index) {
            return index != choosenIndex;
        });
    
        renderList();
    } else {
        result.innerText = 'Choosen';
    }
}

async function animateChoosing() {
    let randomColorIndex = 0;
    for(let i = 0; i < 3; i++) {
        const membersPromises = members.map(member => {
            result.innerText = member;
            randomColorIndex = Math.round(Math.random() * (colors.length - 1));
            result.style.backgroundColor = colors[randomColorIndex];
        });
    }
    result.style.backgroundColor = resultBaseColor;
}

function deleteItem(index) {
    members.splice(index, 1);
    renderList();
}