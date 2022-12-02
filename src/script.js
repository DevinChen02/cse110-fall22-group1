// const { stringTypeAnnotation } = require("@babel/types");
window.addEventListener('DOMContentLoaded', init);

const items = document.getElementsByClassName("list-item");
const deleteButtons = document.getElementsByClassName("delete");

var allItems = true;

/**
 * Populate the document with items.
 */

// Global variables (items) cannot be used in init() function
function init() {
    // *** ADD ITEM BUTTON ***

    // load in items from local storage
    let store = JSON.parse(localStorage.getItem("storage"));

    if (store) {
        for (let i = 0; i < store.length; i++) {

            // console.log(store[i]);
            addCategory(store[i][0]);
            for (let j = 1; j < store[i].length; j++) {
                console.log(store[i][j]);
                addItem(store[i][j][1], store[i][j][0], store[i][0]);
            }


        }
    }



    // Add delete functionality to existing items on load



    const addCategoryButton = document.getElementsByClassName("category-add-btn")[0];
    const addCategoryName = document.getElementsByClassName("category-name")[0];
    console.log(addCategoryName);



    window.addEventListener('load', addDeleteEventListnerOnLoad());
    addCategoryButton.addEventListener('click', function() {
        console.log(addCategory);
        addCategory(addCategoryName.value);

    });

    let coll = document.getElementsByClassName("collapse-add-btn");
    const cate = document.getElementsByClassName('item-wrapper');
    const leg = document.getElementsByClassName('category-header');
    var i;
    for (i = 0; i < coll.length; i = i + 1) {
        let curr = i;
        coll[i].addEventListener("click", function() {
            if ((cate[curr]).style.display != "none") {
                (cate[curr]).style.display = 'none';
                coll[curr].textContent = ">";
                leg[curr].style.paddingBottom = '0px';
            } else {
                (cate[curr]).style.display = 'block';
                coll[curr].textContent = "^";
                leg[curr].style.paddingBottom = '8px';
            }
        });
    }


    let button = document.querySelector('.calculate-button');
    button.addEventListener('click', function() {
        let output = document.querySelector('.calculate-result');
        let cost = document.getElementById('cost').value;
        let num = document.getElementById('people').value;
        output.innerHTML = eval(`${cost} / ${num}`);
    });

}

/**
 * Add items to the document
 * @param {string} name - The name of the item.
 * @param {boolean} checked - The status of the item.
 * @param {string} category - The category of the item.
 */
function addItem(name, checked, category) {
    // console.log(category); 

    const listDOM = document.getElementsByClassName('list')[0];
    const categories = listDOM.getElementsByClassName("category-wrapper");
    const newItem = document.createElement('div');
    newItem.className = 'list-item';
    newItem.innerHTML = `
    <label>
      <input type="checkbox">
      <span class="bubble" ></span>
    </label>
    <div class="list-content">
        <input type="text" value ="" >
    </div>
    <div class = "actions">
        <button class = "delete">Delete</button>
    </div>
  `
    newItem.getElementsByClassName("list-content")[0].getElementsByTagName("input")[0].value = name;
    newItem.getElementsByTagName("label")[0].getElementsByTagName("input")[0].checked = checked;
    // console.log(newItem.getElementsByClassName("list-content"));
    // listDOM.appendChild(newItem);

    // console.log(listDOM);

    for (let i = 0; i < categories.length; i++) {
        const categoryName = categories[i].getElementsByClassName("category-header")[0].getElementsByClassName("category-header-container")[0].getElementsByClassName("list-title")[0];
        if (categoryName.innerText === category) {
            // console.log("x");
            // console.log(categories[i]);
            categories[i].getElementsByClassName("item-wrapper")[0].appendChild(newItem);
        }
    }


    newItem.querySelectorAll("input[type=checkbox")[0].addEventListener('change', function() {
        refreshState();
    });




}

/**
 * Add delete functionality to each item.
 */
function addDeleteEventListnerOnLoad() {
    // let deleteButtons = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", (e) => {
            const index = Array.from(deleteButtons).indexOf(e.target);
            removeItem(index);
        })
    }
}


function addDeleteEventListener() {
    const listDOM = document.getElementsByClassName("list-item");
    // console.log(`just added a new item, wanted to make sure the length of list is correct: ${items.length}`);
    let endIndex = deleteButtons.length - 1;
    deleteButtons[endIndex].addEventListener("click", (e) => {
        const index = Array.from(deleteButtons).indexOf(e.target);
        removeItem(index);
    });
}

const removeItem = (index) => {
    items[index].remove();
}

/**
 * Update the status of all items to "uncheck".
 */
function uncheckAll() {
    let checkBoxes = document.querySelectorAll("input[type=checkbox]");
    checkBoxes.forEach(item => {
        item.checked = false
    });
}

/**
 * Manually save all items to localStorage.
 */
function save() {
    // let items = document.getElementsByClassName("list-item");

    let store = []

    let categories = document.getElementsByClassName("category-wrapper");

    for (let i = 0; i < categories.length; i++) {

        let cat = [];
        // console.log(categories[i].getElementsByClassName("list-title")[0].innerText);

        cat.push(categories[i].getElementsByClassName("list-title")[0].innerText);
        let items = categories[i].getElementsByClassName("list-item");
        // console.log(items); 

        for (let j = 0; j < items.length; j++) {
            // console.log(items[j].getElementsByTagName("input"));
            cat.push([items[j].getElementsByTagName("input")[0].checked, items[j].getElementsByTagName("input")[1].value]);

        }

        // console.log(store)
        store.push(cat);

    }
    console.log(store);


    localStorage.setItem("storage", JSON.stringify(store));
}

/**
 * Save all items to localStorage before closing homepage.
 */



window.onbeforeunload = confirmExit;

function confirmExit() {
    save(); 
    return false;
}




window.addEventListener('load', function() {
    let create_cat = document.querySelector('.create-cat-btn');
    create_cat.addEventListener("click", function() {
        document.querySelector('.modal-cat').style.display = "flex";

        document.querySelector('.cancel-btn').addEventListener("click", function() {
            document.querySelector('.modal-cat').style.display = "none";
        });

        document.querySelector('.category-add-btn').addEventListener("click", function() {
            document.querySelector('.modal-cat').style.display = "none";
        });
    })
});




function addCategory(name) {


    const listDOM = document.getElementsByClassName('list')[0];
    const newCategory = document.createElement('div');
    newCategory.className = "category-wrapper";

    //   newCategory.innerHTML = `                           
    //   <legend class="category-header">
    //   <div class="category-header-container">
    //     <button class="cat-del-btn">-</button>
    //     <button id="collapse" class="collapse-add-btn">^</button>
    //     <button class="item-add-btn">+</button>
    //     <h2 class="list-title">Dairy</h2>
    //   </div>
    // </legend>
    // <span class="items-wrapper">
    // </span>`

    newCategory.innerHTML =
        `<div class="category-header">
  <div class="category-header-container">
    <h2 class="list-title">Meat</h2>
    <div class="btn-group">
      <button class="cat-del-btn">-</button>
      <button class="collapse-add-btn">^</button>
      <button class="item-add-btn">+</button>
    </div>
  </div>
</div>
<div class="item-wrapper"></div>`

    newCategory.getElementsByClassName("category-header-container")[0].getElementsByClassName("list-title")[0].textContent = name;



    listDOM.appendChild(newCategory);
    const addButtons = document.getElementsByClassName('item-add-btn');
    for (let i = 0; i < addButtons.length; i++) {


        addButtons[i].replaceWith(addButtons[i].cloneNode());
        addButtons[i].innerText = `+`;

        addButtons[i].addEventListener('click', function() {

            // console.log(addButtons[i].parentNode.parentNode);
            addItem("", false, addButtons[i].parentNode.parentNode.getElementsByClassName("list-title")[0].innerText);
            addDeleteEventListener();

        });
    }



    // let coll = document.getElementsByClassName("collapse-add-btn");
    // const cate = document.getElementsByClassName('item-wrapper');
    // const leg = document.getElementsByClassName('category-header');


    // var i;


    //     coll[coll.length-1].addEventListener("click", function() {
    //         // console.log(cate, curr);
    //         if ((cate[coll.length-1]).style.display != "none") {
    //             (cate[coll.length-1]).style.display = 'none';
    //             coll[coll.length-1].textContent = ">";
    //             leg[coll.length-1].style.paddingBottom = '0px';
    //         } else {
    //             (cate[coll.length-1]).style.display = 'block';
    //             coll[coll.length-1].textContent = "^";
    //             leg[coll.length-1].style.paddingBottom = '8px';
    //         }
    //     });


    // delete category functionality 




}




function refreshState() {


    var checkBoxes = document.querySelectorAll("input[type=checkbox]");

    console.log(checkBoxes);
    var items = document.getElementsByClassName("list-item");
    if (allItems) {

        for (let i = 0; i < items.length; i++) {
            items[i].style.display = "flex";
        }

    } else {


        for (let i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked == true) {
                items[i].style.display = "none";
            }
        }

    }
}



let uncheckButton = document.getElementById('unchecked-items-btn');

let allItemsButton = document.getElementById('all-items-btn');

allItemsButton.addEventListener('click', function() {
    allItems = true;
    console.log(allItems);
    refreshState();
});


uncheckButton.addEventListener('click', function() {
    allItems = false;
    console.log(allItems);
    refreshState();
});