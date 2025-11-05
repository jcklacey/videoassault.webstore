// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');

document.querySelectorAll('.grid img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});
closeBtn.addEventListener('click', () => (lightbox.style.display = 'none'));
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});

// Shopify Buy Button SDK
(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'e22ba0-52.myshopify.com',
      storefrontAccessToken: 'f80e72c02fe2a063ca0847dd08ab51c7',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: '8872419459307', // Your product ID
        node: document.getElementById('product-component'),
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
          product: {
            layout: 'horizontal',
            styles: {
              button: {
                "background-color": "#b82e2e",
                "font-family": "Bebas Neue, sans-serif",
                "font-size": "16px",
                "color": "#fff",
                "border-radius": "8px",
                "padding": "8px 20px",
                ":hover": { "background-color": "#a62929" },
              }
            },
            text: { button: "Add to Cart" },
            contents: { img: false, title: true, price: true },
          }
        }
      });
    });
  }

  if (window.ShopifyBuy && window.ShopifyBuy.UI) {
    ShopifyBuyInit();
  } else {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    document.head.appendChild(script);
    script.onload = ShopifyBuyInit;
  }
})();
