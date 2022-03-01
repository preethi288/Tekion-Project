sidemenu=[
    {
        id:1,
        name:"Recommended",
    },
    {
        id:2,
        name:"Premium Thali",
    },
    {
        id:3,
        name:"Starters",
    },
    {
        id:4,
        name:"Platter",
    },
    {
        id:5,
        name:"Family Binge Pack",
    },
    {
        id:6,
        name:"Main Course",
    },
    {
        id:7,
        name:"Rice and Indian Breads",
    },
    {
        id:8,
        name:"Desserts and Beverages",
    },
    {
        id:9,
        name:"Accompaniments",
    }
];

var html='';

for(var i=0;i<sidemenu.length;i++)
{
    html+="<li>";
    html+="<span>"+sidemenu[i].name+"</span>";
    html+="</li>";
}

document.querySelector(".categories").innerHTML=html;


const menu=[
    {
        type:'Non veg',
        Bestseller: true,
        Name:"Premium Butter Chicken Roti Thali",
        Price:"283",
        Descr:"Butter Chicken , 2 nos roti served with pickle , raita ,gulab jamun, 2 Pcs Chicken Tikka"
    },
    {
        type:'Non veg',
        Bestseller: true,
        Name:"Premium Kadai Chicken Roti Thali",
        Price:"383",
        Descr:"Butter Chicken , 2 nos roti served with pickle , raita ,gulab jamun, 2 Pcs Chicken Tikka"
    },
    {
        type:'Non veg',
        Bestseller: false,
        Name:"Premium Butter Chicken Pulao Thali",
        Price:"483",
        Descr:"Butter Chicken , 2 nos roti served with pickle , raita ,gulab jamun, 2 Pcs Chicken Tikka"
    },
    {
        type:'Veg',
        Bestseller: true,
        Name:"Premium Paneer Butter Masala Roti",
        Price:"213",
        //Descr:"Butter Chicken , 2 nos roti served with pickle , raita ,gulab jamun, 2 Pcs Chicken Tikka"
    },
]

let items=function(Name,Price,type,Bestseller,Descr){
    this.Name=Name;
    this.Price=Price;
    this.type=type;
    this.Bestseller=Bestseller;
    this.Descr=Descr;
}

let itemBuilder=function(){
    let Name;
    let Price=0;
    let type;
    let Bestseller=false;
    let Descr;

    return{
        SetName:function(n){
            this.Name=n;
            return this;
        },
        SetPrice:function(p){

            this.Price=p;
            return this;
        },
        SetType:function(v){
            this.type=v;
            return this;
        },
        isBestseller:function(t){
            this.Bestseller=t;
            return this;
        },
        SetDescr:function(de){
            this.Descr=de;
            return this;
        },
        build:function(){
            return new items(this.Name,this.Price,this.type,this.Bestseller,this.Descr);
        },
    }

}

var itemlist=[];

for(var i=0;i<menu.length;i++)
{
    itemlist.push(new itemBuilder().SetName(menu[i].Name).SetPrice(menu[i].Price).SetType(menu[i].type).SetDescr(menu[i].Descr).isBestseller(menu[i].Bestseller).build());

}


var shoppingCart = (function() {
    
    cart = [];
    
    // Constructor
    function Item(name, price, count) {
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
    obj.addItemToCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }


    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };


    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
      console.log(cart);
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
    return obj;
  })();


// Add item

$('.addbtn').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = $(this).data('price');
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });


  $(document).ready(function(){
    $(".addbtn").click(function(){
      $('.m3').hide();
      $('.mm').show();
    });
  });
  
 
  //Display Cart 
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "<h1>CART</h1>";
    var out='';
    for(var i in cartArray) {
      output +=  "<table>"+
      "<tr>"
        + "<td class='a1'>" + cartArray[i].name + "</td>" 
        + "<td class='a2'>(" + cartArray[i].count + "pcs)</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control numberstyle' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + "<td>" + cartArray[i].total + "</td>" 
        +  "</tr>"+"</table>";
        
    }
    $('.m41').html(output);
    $('.m43').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
    // $('.plus').html(out);
    if(shoppingCart.totalCount()==0)
    {
      $('.m3').show();
      $('.mm').hide();

    }

  }

  
  // Delete item button
  
  $('.m41').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();

  })
  
  
  // -1
  $('.m41').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    console.log(name);
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })

  // +1
  $('.m41').on("click", ".plus-item", function(event) {
    var name = $(this).data('name');
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.m41').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();
  
  