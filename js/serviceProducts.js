class ServiceProducts {
    constructor(containerProducts, containerCounter, productsCatalog) {
        this.container = document.querySelector(containerProducts);
        this.containerCounter = document.querySelector(containerCounter);
        this.productsCatalog = productsCatalog;
        this.create();
    }
    create() {
        var wrapper = document.createElement('slot');

        var products = serviceStore.getProducts();
        this.containerCounter.innerText = products.length;

        for(var i=0; i<this.productsCatalog.length; i++) {

            var index = products.indexOf(this.productsCatalog[i].id);
            if (index === -1) {
                var activeClass = '';
                var activeText = 'Заказать услугу';
            } else {
                var activeClass = ' btn-active';
                var activeText = 'Удалить услугу';
            }

            var item = this.getElement({tagName: 'div',className: 'item'});
            var name = this.getElement({tagName: 'div',className: 'name', innerText:this.productsCatalog[i].name});
            var img = this.getElement({tagName: 'div',className: 'img', backgroundImage: `url(${this.productsCatalog[i].img})`});
            var price = this.getElement({tagName: 'div',className: 'price', innerText:this.productsCatalog[i].price.toLocaleString()});
            var btn = this.getElement({tagName: 'button',className: 'btn'+activeClass, innerText:activeText, id:this.productsCatalog[i].id });

            btn.addEventListener('click', function() {
                var id = this.getAttribute('data-id');
                var result = serviceStore.putProduct(id);

                serviceProducts.containerCounter.innerText = result.products.length;

                if(result.pushProduct) {
                    this.classList.add('btn-active');
                    this.innerText = 'Удалить услугу';
                } else {
                    this.classList.remove('btn-active');
                    this.innerText = 'Заказать услугу';   
                }
            });

            item.appendChild(name);
            item.appendChild(img);
            item.appendChild(price);
            item.appendChild(btn);

            wrapper.appendChild(item);
        }

        this.container.appendChild(wrapper);
    }
    getElement(options) {
        var element = document.createElement(options.tagName);
        if('className' in options) {
            element.setAttribute('class', options.className);
        }
        if('innerText' in options) {
            element.innerText = options.innerText;
        }
        if('backgroundImage' in options) {
            element.style.backgroundImage = options.backgroundImage;
        }
        if('id' in options) {
            element.setAttribute('class', options.className);
        }
        
        return element;
    }
    actions() {

    }
}
var serviceProducts = new ServiceProducts('.container-products', '.container-counter', productsCatalog);
