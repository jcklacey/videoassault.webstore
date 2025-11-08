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

closeBtn.addEventListener('click', () => { lightbox.style.display = 'none'; });
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.style.display = 'none'; });

// Shopify Buy Button — modularized safely
(function () {
  const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

  // Array of products to initialize — add "title" for search
  const products = [
    {
      id: '8872419459307',
      nodeId: 'product-component',
      title: 'Flagbearer'
    },
    {
      id: '8872419819755',
      nodeId: 'product-component-2',
      title: 'MOBRULE'
    },
    {
      id: '9144164614379',
      nodeId: 'product-component-3',
      title: 'IRONSIGHTS'
    }

    
    // Add future products here with titles:
    // { id: 'NEW_ID', nodeId: 'NEW_NODE_ID', title: 'Product Name' }
  ];

  // Update the print counter dynamically
  const printCounter = document.getElementById('print-counter');
  if (printCounter) {
    printCounter.textContent = 'PRINT COUNT: ' + products.length;
  }

  // --------------------------
  // SEARCH BAR FUNCTIONALITY
  // --------------------------
function initializeSearchFilter() {
  const searchBar = document.getElementById('search-bar');
  if (!searchBar) return;

  // Normalize titles for simpler search
  products.forEach(product => {
    product._searchTitle = product.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  });

  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase().replace(/[^a-z0-9]/g, '');

    products.forEach(product => {
      const tile = document.getElementById(product.nodeId)?.closest('.tile-with-button');
      if (!tile) return;

      // Only search against the normalized title from the array
      tile.style.display = product._searchTitle.includes(query) ? '' : 'none';
    });
  });
}


  // --------------------------
  // Default Shopify options
  // --------------------------
  const defaultOptions = {
    product: {
      layout: 'horizontal',
      styles: {
        product: {
          "display": "flex",
          "flex-direction": "column",
          "align-items": "flex-end",
          "padding-right": "10px",
          "gap": "1px",
          "font-family": "Bebas Neue, sans-serif"
        },
        title: {
          "font-size": "16px",
          "color": "#111",
          "background-color": "#eeeddc",
          "margin-bottom": "4px",
          "letter-spacing": "0.5px"
        },
        price: {
          "font-size": "12px",
          "color": "#000000ff",
          "background-color": "#eeeddc",
          "margin-top": "0px",
          "margin-bottom": "0px"
        },
        button: {
          "background-color": "#9c2b2bff",
          "font-family": "Arial Black, sans-serif",
          "font-size": "14px",
          "color": "#000000ff",
          "border-radius": "2px",
          "padding": "4px 8px",
          "margin-top": "4px",
          "cursor": "pointer",
          "border": "none",
          ":hover": { "background-color": "#ae3d3dff" }
        }
      },
      text: { button: "ADD TO CART" },
      contents: { img: false, title: true, price: true, button: true, description: false }
    },
    option: {
      styles: {
        option: {
          "font-family": "Bebas Neue, sans-serif",
          "font-size": "14px",
          "padding": "0px 0px",
          "border-radius": "4px",
          "border": "1px solid #aaa",
          "background-color": "#eeeddc",
          "color": "#111",
          "min-width": "140px",
          "max-width": "160px",
          "margin-bottom": "0px"
        },
        wrapper: { "margin-top": "-10px", "margin-bottom": "-10px" }
      }
    },
    cart: {
      styles: {
        button: {
          "background-color": "#9c2b2bff",
          ":hover": { "background-color": "#ae3d3dff" },
          "font-family": "Arial Black, sans-serif",
          "color": "#111"
        }
      },
      text: { title: "CART", total: "Subtotal" }
    },
    toggle: {
      styles: {
        toggle: 
        {"color": "#111", "background-color": "#9c2b2bff", ":hover": { "background-color": "#ae3d3dff" } }
      }
    }
  };

  // --------------------------
  // SHOPIFY INITIALIZATION
  // --------------------------
  function ShopifyBuyInit() {
    const client = ShopifyBuy.buildClient({
      domain: 'e22ba0-52.myshopify.com',
      storefrontAccessToken: 'f80e72c02fe2a063ca0847dd08ab51c7'
    });

    ShopifyBuy.UI.onReady(client).then(ui => {
      products.forEach(product => {
        ui.createComponent('product', {
          id: product.id,
          node: document.getElementById(product.nodeId),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: defaultOptions
        });
      });

      // ✅ Initialize search after Shopify components have loaded
      setTimeout(initializeSearchFilter, 1000);
    });
  }

  // Load Shopify Buy Button script if needed
  if (window.ShopifyBuy && window.ShopifyBuy.UI) {
    ShopifyBuyInit();
  } else {
    const script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    document.head.appendChild(script);
    script.onload = ShopifyBuyInit;
  }

  

})();

