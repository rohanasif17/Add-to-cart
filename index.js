import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-11775-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

let username = "";

addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value.trim();

  if (username && inputValue) {
    const newItem = {
      item: inputValue,
      category: categoryInput.value.trim()
    };

    push(ref(database, `shoppingList/${username}`), newItem);
    clearInputFieldEl();
  }
});

function loadShoppingListForUser(user) {
  username = user;
  onValue(ref(database, `shoppingList/${user}`), function(snapshot) {
    if (snapshot.exists()) {
      let shoppingList = snapshot.val();
      clearShoppingListEl();

      for (let itemID in shoppingList) {
        let currentItem = shoppingList[itemID];
        appendItemToShoppingListEl(itemID, currentItem);
      }
    } else {
      clearShoppingListEl();
      shoppingListEl.innerHTML = "No items here... yet";
    }
  });
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
  categoryInput.value = "";
}

function appendItemToShoppingListEl(itemID, itemData) {
  let newEl = document.createElement("li");

  newEl.textContent = itemData.item + " : " + itemData.category;

  newEl.addEventListener("click", function() {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${username}/${itemID}`);
    remove(exactLocationOfItemInDB);
  });

  shoppingListEl.append(newEl);
}

const page = document.getElementById("container");
const usernameInput = document.getElementById("usernameInput");
const usernameContainer = document.getElementById("usernameContainer");
const reqLine = document.getElementById("request");

page.style.display = "none";
reqLine.style.display = "none";

let submit = document.getElementById("submit");
submit.addEventListener("click", function() {
  const username = usernameInput.value.trim();
  if (username === "") {
    reqLine.style.display = "block";
  } else {
    usernameContainer.style.display = "none";
    page.style.display = "block";
    loadShoppingListForUser(username);
  }
});

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
