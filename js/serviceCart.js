class ServiceCart {
    constructor(containerCounter, containerCart, productsCatalog) {
        this.containerCounter = document.querySelector(containerCounter);
        this.containerCart = document.querySelector(containerCart);
        this.productsCatalog = productsCatalog;
        this.create();
    }
    create() {
        this.containerCounter.addEventListener('click', function() {
            serviceCart.containerCart.style.display = 'flex';
            var productCart = serviceCart.getProductsCart();
            var wrapper = document.createElement('slot');

            for(var i = 0; i < productCart.length; i++) {

            var item  = serviceCreateElement.getElement({ tagName:'div',    className:'item'});
            var name  = serviceCreateElement.getElement({ tagName:'div',    className:'name',  innerText: productCart[i].name});
            var imgc   = serviceCreateElement.getElement({ tagName:'div',    className:'imgc',   backgroundImage:`url(${ productCart[i].imgc})`});
            var price = serviceCreateElement.getElement({ tagName:'div',    className:'price', innerText: productCart[i].price.toLocaleString()});
            
            item.appendChild(name);
            item.appendChild(imgc);
            item.appendChild(price);
            wrapper.appendChild(item);
        }

        var close = serviceCreateElement.getElement({ tagName:'div',    className:'cart-close'});
        close.addEventListener('click', function() {
            serviceCart.containerCart.innerHtml = '';
            serviceCart.containerCart.style.display = 'none';
        });
        
        serviceCart.containerCart.appendChild(wrapper);
        serviceCart.containerCart.appendChild(close);
        });
    }
    getProductsCart() {
        var products = serviceStore.getProducts();
        var productCart = [];
        for(var i=0; i<this.productsCatalog.length; i++) {
            if (products.indexOf(this.productsCatalog[i].id) !== -1) {
                productCart.push(this.productsCatalog[i]);
            }
        }
        return productCart;
    }
}

var serviceCart = new ServiceCart('.container-counter', '.container-cart', productsCatalog);
