var ShoppingCart = function () {

  var STORAGE_ID = 'shoppingCart';

  var updateCart = function () {
    $(".cart-list").empty();
    var source = $('#cart-template').html();
    var template = Handlebars.compile(source);
    var sum = 0;
    Handlebars.registerHelper('mulItems', function(param1, param2){
      sum += param1 * param2;
      return param1 * param2;
    });
    var newHTML = template({items : cart});
    $('.cart-list').append(newHTML);
    $(".total").text(sum);
    saveToLocalStorage();
  }

  var addItem = function (item,price) {
    flag = true;
    for (var i = 0; i < cart.length; i++) {
      if(cart[i].name == item){
        cart[i].count += 1;
        flag = false;
      }
    }
    if (flag) cart.push({
      name : item ,
      price : price ,
      count : 1
    });
  }

  var clearCart = function () {
    cart=[];
  }

  var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
  }

  var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  }

  // an array with all of our cart items
  var cart = getFromLocalStorage();

  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart
  }
};

var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
  $(".shopping-cart").toggleClass("show");
});

$('.add-to-cart').on('click', function () {
  var item = $(this).closest(".item").data().name;
  var price = $(this).closest(".item").data().price;
  app.addItem(item,price);
  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
  app.updateCart();
});
