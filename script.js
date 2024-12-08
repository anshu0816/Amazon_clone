document.addEventListener('DOMContentLoaded', () => {
    
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');

    searchIcon.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
        }
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchIcon.click();
        }
    });

    
    const cartIcon = document.querySelector('.nav-cart');

    cartIcon.addEventListener('click', () => {
        console.log('Cart icon clicked');
        
    });

    
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const shopSection = document.querySelector('.shop-section');
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'box';
                productElement.innerHTML = `
                    <div class="box-img" style="background-image: url(${product.image});"></div>
                    <div class="box-content">
                        <p>${product.name}</p>
                        <p>${product.price}</p>
                    </div>
                `;
                shopSection.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    
    const adjustLayout = () => {
        if (window.innerWidth <= 768) {
            document.querySelector('.navbar').style.flexDirection = 'column';
            document.querySelector('.nav-search').style.width = '100%';
            document.querySelectorAll('.shop-section .box').forEach(box => {
                box.style.width = '100%';
            });
        } else {
            document.querySelector('.navbar').style.flexDirection = 'row';
            document.querySelector('.nav-search').style.width = '620px';
            document.querySelectorAll('.shop-section .box').forEach(box => {
                box.style.width = '23%';
            });
        }
    };

    window.addEventListener('resize', adjustLayout);
    adjustLayout(); 

    
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', () => {
            const productName = box.querySelector('.box-content p').innerText;
            window.location.href = `/product.html?name=${encodeURIComponent(productName)}`;
        });
    });
});
