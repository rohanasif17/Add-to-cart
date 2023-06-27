import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-11775-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue + " : " + categoryInput.value )
    
    // clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

// function clearInputFieldEl() {
//     inputFieldEl.value = ""
// }

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}


















var categoryInput = document.getElementById('categoryInput');
var dropdownLinks = document.querySelectorAll('.dropdown-content a');


dropdownLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        var selectedCategory = this.getAttribute('data-category');
        categoryInput.value = selectedCategory;

        var dropdownContent = this.parentNode;
        dropdownContent.style.display = 'none';

        categoryInput.focus();

        dropdownLinks.forEach(function(otherLink) {
            if (otherLink !== link) {
                otherLink.parentNode.style.display = 'none';
            }
        });
    });
});

categoryInput.addEventListener('focus', function() {
    this.nextElementSibling.style.display = 'block';
});

addButtonEl.addEventListener('click', function(event) {
    event.preventDefault();

    inputFieldEl.value = '';
    categoryInput.value = '';
});

         
