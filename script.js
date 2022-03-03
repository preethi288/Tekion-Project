import {itemlist} from "./Models/ItemList.js";
import {sidemenu} from "./Models/ItemData.js";

var html = '';

for (var i = 0; i < sidemenu.length; i++) {
    html += "<li>";
    html += "<span>" + sidemenu[i] + "</span>";
    html += "</li>";
}

document.querySelector(".categories").innerHTML = html;


//Shopping Cart functionality

var shoppingCart = (function () {
    var cart = [];

    // Constructor
    function Item(id, name, price, count) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    var obj = {};

    // Add to cart
    obj.addItemToCart = function (id, name, price, count) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(id, name, price, count);
        cart.push(item);
        saveCart();
    }



    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };


    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
        console.log(cart);
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (var i in cart) {
            let item = cart[i];
            let itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    return obj;
})();

//end


var arr1 = shoppingCart.listCart();
console.log(itemlist);

//Mainmenu function 

function main_menu() {
    for (let x in itemlist) {
        let item = $("<div></div>").addClass("first")
        $(".mn").append(item);

        let item2 = $("<div></div>").addClass("l1")
        item.append(item2);

        let item3 = $("<div></div>").addClass("l11")
        item2.append(item3);


        var item10;
        if (itemlist[x].isVeg == true) {
            item10 = $('<img/>', {
                src: "images/veg-icon.png",
                alt: 'veg',
                class: 'ic',
                dataVal: 'veg'
            })
        }
        else {
            item10 = $('<img/>', {
                src: "images/non-veg icon.png",
                alt: 'icon',
                class: 'ic',
                dataVal: 'nonVeg'
            })
        }
        let item4 = $("<span></span>").append(item10);

        var item19;
        var item56;
        if (itemlist[x].isBestsell == true) {
            item19 = $('<img/>', {
                src: "images/star-icon.png",
                class: 'st',
                dataVal: 'star'
            })
            item56=$("<span></span>").addClass("fre").text("BestSeller")
        }
        let item5 ;
        item5= $("<span></span>").append(item19).append(item56);


        item3.append(item4);
        item3.append(item5);



        let item6 = $("<div></div>").addClass("l2").text(itemlist[x].Name);
        let item7 = $("<div></div>").addClass("l3").text("Rs. "+itemlist[x].Prices);
        let item8 = $("<div></div>").addClass("l4").text(itemlist[x].Descr);


        item2.append(item6);
        item2.append(item7);
        item2.append(item8);


        let item9 = $('<img/>', {
            class: 'l2',
            src: "images/food1.jpeg",
            alt: 'food-image'
        });
        let item11 = $("<div></div>").addClass("l2");
        item11.append(item9);
        item.append(item11);

        let item12 = $("<div></div>").addClass("additem");
        item2.append(item12);

        let item13 = $('<button type="button" data-id=\"' + itemlist[x].id + '\"data-name=\"' + itemlist[x].Name + '\"data-price=' +
            itemlist[x].Prices + '>ADD</button>').addClass("addbtn"+itemlist[x].id);

        item12.append(item13);
        let item14 = $('<div></div>').addClass("plus" + itemlist[x].id);
        item12.append(item14);

        let item21 = $("<div></div>").addClass("input-group");
        item14.append(item21);
        var arr = shoppingCart.listCart();
    }
}

main_menu();

// Add item
$('.addbtn1').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = $(this).data('price');
    var id = $(this).data('id');
    shoppingCart.addItemToCart(id, name, price, 1);
    displayCart();
});



$('.addbtn2').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = $(this).data('price');
    var id = $(this).data('id');
    shoppingCart.addItemToCart(id, name, price, 1);
    displayCart();
});


$('.addbtn3').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = $(this).data('price');
    var id = $(this).data('id');
    shoppingCart.addItemToCart(id, name, price, 1);
    displayCart();
});


$('.addbtn4').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = $(this).data('price');
    var id = $(this).data('id');
    shoppingCart.addItemToCart(id, name, price, 1);
    displayCart();
});


//Display Cart 
function displayCart() {
    var cartArray = shoppingCart.listCart();
    console.log(cartArray);
    var output = "<h1>CART</h1>";
    var out = '';
    for (var i in cartArray) {
        output += "<table>" +
            "<tr>"
            + "<td><button class='delete-item btn btn-danger' data-name=\"" + cartArray[i].name + "\">X</button></td>"
            + "<td class='a1'>" + cartArray[i].name + "</td>"
            + "<td class='a2'>(" + cartArray[i].count + "pcs)</td>"
            + "<td><div class='input-group1'><button class='minus-item input-group-addon btn btn-primary' data-name=\"" + cartArray[i].name + "\">-</button>"
            + "<input type='number' class='item-count form-control numberstyle' data-name=\"" + cartArray[i].name + "\"' value='" + cartArray[i].count + "'>"
            + "<button class='plus-item btn btn-primary input-group-addon' data-name=\"" + cartArray[i].name + "\">+</button></div></td>"
           
            + "<td>" +"Rs."+ cartArray[i].total + "</td>"
            + "</tr>" + "</table>";
    }

    var arr = shoppingCart.listCart();

    //Displaying itemlist holder

    for (var k in itemlist) {
        for (var j in cartArray) {
            if (itemlist[k].Name === cartArray[j].name) {
                out = "<div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=\"" + cartArray[j].name + "\">-</button>"
                    + "<input type='number' class='item-count form-control numberstyle' data-name=\"" + cartArray[j].name + "\"' value='" + cartArray[j].count + "'>"
                    + "<button class='plus-item btn btn-primary input-group-addon' data-name=\"" + cartArray[j].name + "\">+</button></div>";
                if (cartArray[j].count > 0) {
                    $('.plus' + itemlist[k].id).html(out);
                    $('.addbtn'+itemlist[k].id).hide();
                }   
                }
            }
        }
      
    $('.m41').html(output);
    $('.m43').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
    if (shoppingCart.totalCount() == 0) {
        $('.m3').show();
        $('.mm').hide();

    }

}


// Delete item button

$('.m41').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
    location.reload();

})


// -1 count
$('.m41,.plus1,.plus2,.plus3,.plus4').on("click", ".minus-item", function (event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCart(name);
    displayCart();
    location.reload();
})

// +1 count
$('.m41,.plus1,.plus2,.plus3,.plus4').on("click", ".plus-item", function (event) {
    var name = $(this).data('name');
    var id = $(this).data('id');
    shoppingCart.addItemToCart(id, name);
    displayCart();
})

// Item count input
$('.m41,.plus1,.plus2,.plus3,.plus4').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

//Implementing Search filter

function searchFilter(){
    let ele=document.getElementById('dishes');
    ele.addEventListener('input',function(){
     let itemLists=document.getElementsByClassName('first');
     console.log($(itemLists[0]).children("div").text());
     for(i=0;i<itemLists.length;i++){
         let itemName=$(itemLists[i]).children("div").text();
         console.log(itemName);
         if(itemName.toLowerCase().includes(ele.value.toLowerCase())){
             $(itemLists[i]).show();
         }
         else{
             $(itemLists[i]).hide();
         }
     }
 })
}

function checkbox(){
    let ele=document.getElementById('veg');
    ele.addEventListener('click',function(){
    let main_menu_elements=document.getElementsByClassName('first'); 
    // console.log($(main_menu_elements[0]).children().find("img.ic").css('display','none'));
    if(ele.checked){
        for(i=0;i<main_menu_elements.length;i++){
            let image_ele=$(main_menu_elements[i]).children().find("img.ic");
            if(image_ele.attr('dataVal')=="nonVeg"){
               $(main_menu_elements[i]).hide();
           }    
        }     
    }
    else{
        for(i=0;i<main_menu_elements.length;i++){
        
               $(main_menu_elements[i]).show();
               
        }
    }
    })
}

//If Cart empty then displaying placeholder

$(document).ready(function () {
    $('.addbtn1,addbtn2,addbtn3,addbtn4').click(function () {
        $('.m3').hide();
        $('.mm').show();
    });
    displayCart();
    searchFilter();
    checkbox();
}); 



   


