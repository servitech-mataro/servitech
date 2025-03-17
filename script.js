// Variable global para almacenar el contenido del carrito
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Función para mostrar el número de productos en el carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = cartItems.length;

        if (cartItems.length > 0) {
            document.getElementById('cart-sidebar').style.display = 'block'; // Mostrar el carrito si tiene productos
        } else {
            document.getElementById('cart-sidebar').style.display = 'none'; // Ocultar el carrito si no tiene productos
        }
    }
}

// Función para agregar un producto al carrito
function addToCart(productName, productPrice, productImage) {
    console.log('Agregando al carrito:', productName, productPrice, productImage);
    cartItems.push({
        name: productName,
        price: productPrice,
        image: productImage
    });

    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guardar en localStorage
    updateCartCount();
    updateCartSidebar();
}

// Función para mostrar los productos en la ventana lateral del carrito
function updateCartSidebar() {
    const cartProductsList = document.getElementById('cart-products-list');
    if (cartProductsList) {
        cartProductsList.innerHTML = ''; // Limpiar la lista de productos

        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-product-item');

            const img = document.createElement('img');
            img.src = item.image && item.image.trim() !== '' ? item.image : 'img/default.jpg';
            img.alt = item.name;
            listItem.appendChild(img);

            const name = document.createElement('div');
            name.classList.add('product-name');
            name.innerText = item.name;
            listItem.appendChild(name);

            const price = document.createElement('div');
            price.classList.add('product-price');
            price.innerText = item.price;
            listItem.appendChild(price);

            const removeButton = document.createElement('button');
            removeButton.innerText = 'Eliminar';
            removeButton.classList.add("eliminar");
            removeButton.onclick = () => removeProduct(index);
            listItem.appendChild(removeButton);

            cartProductsList.appendChild(listItem);
            totalPrice += parseFloat(item.price.replace('€', '').replace(',', '.'));
        });

        document.getElementById('cart-total-price').innerText = `Total: ${totalPrice.toFixed(2)}€`;
    }
}

// Función para eliminar un producto del carrito
function removeProduct(index) {
    cartItems.splice(index, 1); // Eliminar el producto del carrito
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Actualizar en localStorage
    updateCartCount(); // Actualizar el contador
    updateCartSidebar(); // Actualizar la vista del carrito
}

// Función para vaciar el carrito
function emptyCart() {
    cartItems = []; // Vaciar el carrito
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Actualizar en localStorage
    updateCartCount(); // Actualizar el contador
    updateCartSidebar(); // Actualizar la vista del carrito
}

// Función para realizar la compra
function completeOrder() {
    if (cartItems.length > 0) {
        alert('Comanda realitzada amb èxit!');
        emptyCart();
    } else {
        alert('El teu carro està buit!');
    }
}

// Función para abrir o cerrar la ventana lateral del carrito
function toggleCartSidebar() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        if (cartSidebar.style.display === 'block') {
            cartSidebar.style.display = 'none';
            localStorage.setItem('cartOpen', 'false'); // Guardar que el carrito está cerrado
        } else {
            cartSidebar.style.display = 'block';
            localStorage.setItem('cartOpen', 'true'); // Guardar que el carrito está abierto
        }
    }
}

// Función para actualizar el preu del rang
function updatePriceRange() {
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('precio-actual');

    if (priceRange && priceDisplay) {
        priceRange.addEventListener('input', function () {
            priceDisplay.textContent = '€' + priceRange.value;
        });

        priceDisplay.textContent = '€' + priceRange.value;
    }
}

// Función para abrir el modal con detalles del producto
function openProductModal(productId) {
    const modal = document.getElementById('product-detail-modal');
    const productTitle = document.getElementById('product-title');
    const productDescription = document.getElementById('product-description'); // Correcte
    const productImage = document.getElementById('product-image-large');
    const productCharacteristics = document.getElementById('product-characteristics');

    if (modal && productTitle && productDescription && productImage && productCharacteristics) {
        // Solo se abrirá el modal cuando el usuario haga clic en un producto específico
        if (productId === 'producto1') {
            productTitle.innerText = 'ASUS TUF Gaming A15';
            productDescription.innerHTML = `
                El <strong>ASUS TUF Gaming A15</strong> és un portàtil dissenyat específicament per a jugadors amb una construcció robusta y components de rendiment alt.
                Està equipat amb el <strong>AMD Ryzen 7</strong> y la <strong>NVIDIA GeForce RTX 3050</strong>, ideal per a jocs exigents. Amb una pantalla de <strong>15,6 polzades</strong> Full HD y una taxa de refresc de <strong>144Hz</strong>, la qualitat gràfica és fluida y nítida.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> AMD Ryzen 7, 8 nuclis, alt rendiment</li>
                    <li><strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 3050</li>
                    <li><strong>Memòria RAM:</strong> 16GB DDR4</li>
                    <li><strong>Emmagatzematge:</strong> 512GB SSD</li>
                    <li><strong>Pantalla:</strong> 15,6 polzades, Full HD, 144Hz</li>
                    <li><strong>Refrigeració:</strong> Sistema de refrigeració avançat per sessions llargues de joc</li>
                    <li><strong>Teclat:</strong> Retroil·luminat RGB, resistent per a gamers</li>
                    <li><strong>Durabilitat:</strong> Certificació MIL-STD-810H per resistència</li>
                    <li><strong>Conectivitat:</strong> Wi-Fi 6, USB 3.2, HDMI 2.0, Ethernet</li>
                    <li><strong>Durada de la bateria:</strong> Fins a 6-8 hores segons l'ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil1.jpg';
        } else if (productId === 'producto2') {
            productTitle.innerText = 'LG gram 17Z90R-E.AD78B';
            productDescription.innerHTML = `
                El <strong>LG Gram 17Z90R</strong> és un portàtil ultralleuger dissenyat per a professionals y usuaris que necessiten potència y portabilitat. Equipat amb el <strong>Intel Core i7-1360P</strong> de 12ª generació y la <strong>RTX 3050</strong>, és perfecte per a treballs intensius y jocs lleugers. La seva pantalla de <strong>17 polzades</strong> WQXGA (2560x1600) ofereix una resolució nítida y espai de treball ampli, ideal per a múltiples tasques.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> Intel Core i7-1360P, 12ª generació, 14 nuclis</li>
                    <li><strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 3050</li>
                    <li><strong>Memòria RAM:</strong> 32GB LPDDR5</li>
                    <li><strong>Emmagatzematge:</strong> 1TB SSD NVMe</li>
                    <li><strong>Pantalla:</strong> 17 polzades, WQXGA (2560x1600), IPS, 99% DCI-P3</li>
                    <li><strong>Refrigeració:</strong> Sistema d'escalfament de baix consum amb ventiladors eficients</li>
                    <li><strong>Teclat:</strong> Teclat retroil·luminat còmode y silenciós</li>
                    <li><strong>Durabilitat:</strong> Estructura ultralleugera de magnesi, resistent a caigudes lleus</li>
                    <li><strong>Conectivitat:</strong> Wi-Fi 6, USB-C, USB-A, HDMI, lector de targetes microSD</li>
                    <li><strong>Durada de la bateria:</strong> Fins a 19 hores d'autonomia</li>
                </ul>
            `;
            productImage.src = 'img/portatil2.jpg';
        } else if (productId === 'producto3') {
            productTitle.innerText = 'Alurin Go Start Intel Celeron';
            productDescription.innerHTML = `
                El <strong>Alurin Go Start</strong> és un portàtil econòmic ideal per a usuaris que necessiten un dispositiu per a tasques bàsiques com navegar per internet, editar documents o veure vídeos. Equipat amb el <strong>Intel Celeron N4020</strong>, 8GB de RAM y 256GB SSD, ofereix un rendiment fluid per a activitats diàries. La seva pantalla de <strong>15,6 polzades</strong> HD proporciona una bona visualització en un dispositiu lleuger y compacte.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> Intel Celeron N4020, 2 nuclis, 1,1 GHz (fins a 2,8 GHz)</li>
                    <li><strong>Targeta Gràfica:</strong> Intel UHD Graphics 600</li>
                    <li><strong>Memòria RAM:</strong> 8GB DDR4</li>
                    <li><strong>Emmagatzematge:</strong> 256GB SSD</li>
                    <li><strong>Pantalla:</strong> 15,6 polzades, HD (1366x768), antireflex</li>
                    <li><strong>Refrigeració:</strong> Sistemes de refrigeració passiva, sense ventiladors</li>
                    <li><strong>Teclat:</strong> Teclat complet amb teclat numèric</li>
                    <li><strong>Conectivitat:</strong> Wi-Fi 5, Bluetooth 4.2, USB 3.0, HDMI, lector de targetes microSD</li>
                    <li><strong>Durada de la bateria:</strong> Fins a 8 hores d'autonomia</li>
                </ul>
            `;
            productImage.src = 'img/portatil3.jpg';
        } else if (productId === 'producto4') {
            productTitle.innerText = 'Acer Gaming Nitro V 15';
            productDescription.innerHTML = `
                El <strong>Acer Gaming Nitro V 15 ANV15-41</strong> és un portàtil dissenyat per a jugadors exigents y professionals que busquen potència y rendiment. Equipat amb el <strong>AMD Ryzen 7 7735HS</strong> y la <strong>NVIDIA GeForce RTX 4060</strong>, aquest dispositivo ofereix una experiència de joc immillorable amb gràfics nítids y una velocitat de processament elevada. La seva pantalla de <strong>15,6 polzades</strong> Full HD amb alta taxa de refresc garanteix imatges fluides y una resposta ràpida.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> AMD Ryzen 7 7735HS, 8 nuclis, fins a 4,75 GHz</li>
                    <li><strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060, amb arquitectura Ada Lovelace</li>
                    <li><strong>Memòria RAM:</strong> 32GB DDR5</li>
                    <li><strong>Emmagatzematge:</strong> 1TB SSD NVMe</li>
                    <li><strong>Pantalla:</strong> 15,6 polzades, Full HD (1920x1080), 165Hz, IPS</li>
                    <li><strong>Refrigeració:</strong> Sistema de refrigeració avançat amb doble ventilador</li>
                    <li><strong>Teclat:</strong> Teclat retroil·luminat amb teclat numèric</li>
                    <li><strong>Durabilitat:</strong> Construcció robusta per a sessions llargues de joc</li>
                    <li><strong>Conectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet</li>
                    <li><strong>Durada de la bateria:</strong> Fins a 8 hores segons l'ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil4.jpg';
        } else if (productId === 'producto5') {
            productTitle.innerText = 'HP Pavilion 15-eg0002ns';
            productDescription.innerHTML = `
                El <strong>HP 15-fd0080ns</strong> és un portàtil dissenyat per a usuaris que busquen un equilibri entre rendiment y portabilitat. Equipat amb un <strong>processador Intel Core i5-1334U</strong> de 13a generació y <strong>16 GB de RAM DDR4</strong>, ofereix un bon rendiment per a tasques diàries y treball en multitarea. El seu <strong>emmagatzematge SSD de 512 GB</strong> garanteix velocitats ràpides de lectura y escriptura, millorant la resposta del sistema. La pantalla de <strong>15,6 polzades</strong> Full HD proporciona imatges clares y nítides, ideal per a treball y entreteniment.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> Intel Core i5-1334U, fins a 4,6 GHz, 10 nuclis</li>
                    <li><strong>Gràfics:</strong> Intel Iris Xe Graphics integrats</li>
                    <li><strong>Memòria RAM:</strong> 16 GB DDR4-3200 MHz</li>
                    <li><strong>Emmagatzematge:</strong> 512 GB SSD PCIe NVMe M.2</li>
                    <li><strong>Pantalla:</strong> 15,6 polzades, Full HD (1920 x 1080), antireflectant</li>
                    <li><strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, ports USB Type-C y Type-A, HDMI 1.4b</li>
                    <li><strong>Teclat:</strong> Mida completa amb teclat numèric</li>
                    <li><strong>Dimensions i pes:</strong> 35,98 x 23,6 x 1,86 cm; 1,59 kg</li>
                </ul>
            `;
            productImage.src = 'img/portatil5.jpg';
        } else if (productId === 'producto6') {
            productTitle.innerText = 'ASUS TUF Gaming F17';
            productDescription.innerHTML = `
                El <strong>ASUS TUF Gaming F17</strong> és un portàtil dissenyat per a jugadors amb un equilibri entre rendiment y preu. Equipat amb el <strong>Intel Core i5-11400H</strong> y la <strong>NVIDIA GeForce RTX 3050</strong>, ofereix un rendiment fluid en jocs y tasques diàries. La seva pantalla de <strong>17,3 polzades</strong> Full HD amb una taxa de refresc de <strong>144Hz</strong> proporciona imatges nítides y una experiència de joc immersiva.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> Intel Core i7-12700H (14 nuclis, fins a 4,7 GHz)</li>
                    <li><strong>Targeta gràfica:</strong> NVIDIA GeForce RTX 4060 amb 8GB GDDR6</li>
                    <li><strong>Memòria RAM:</strong> 16GB DDR4 (expandible)</li>
                    <li><strong>Emmagatzematge:</strong> 1TB SSD NVMe</li>
                    <li><strong>Pantalla:</strong> 17,3 polzades, Full HD (1920 x 1080), 144Hz</li>
                    <li><strong>Refrigeració:</strong> Sistema de refrigeració amb doble ventilador y tecnologia anti-pols</li>
                    <li><strong>Teclat:</strong> Retroil·luminat RGB resistent al desgast</li>
                    <li><strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet</li>
                    <li><strong>Durabilitat:</strong> Certificació MIL-STD-810H per a resistència militar</li>
                    <li><strong>Autonomia:</strong> Fins a 8 hores depenent de l’ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil6.jpg';
        } else if (productId === 'producto7') {
            productTitle.innerText = 'MSI Thin 15 B12UC-1839XES';
            productDescription.innerHTML = `
                El <strong>MSI Thin 15 B12UC-1839XES</strong> és un portàtil gaming lleuger y potent, ideal per a jugadors y creadors que necessiten un dispositivo equilibrat.
                Equipat amb el <strong>Intel Core i5-12450H</strong> y la <strong>NVIDIA GeForce RTX 3050</strong>, ofereix un rendiment fluid en jocs y aplicaciones exigents.
                La seva pantalla de <strong>15,6 polzades</strong> Full HD amb una taxa de refresc de <strong>144Hz</strong> proporciona una experiència visual immersiva y sense interrupcions.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> Intel Core i5-12450H (8 nuclis, fins a 4,4 GHz)</li>
                    <li><strong>Targeta gràfica:</strong> NVIDIA GeForce RTX 3050 amb 4GB GDDR6</li>
                    <li><strong>Memòria RAM:</strong> 16GB DDR4 (expandible fins a 64GB)</li>
                    <li><strong>Emmagatzematge:</strong> 512GB SSD NVMe</li>
                    <li><strong>Pantalla:</strong> 15,6 polzades, Full HD (1920 x 1080), 144Hz</li>
                    <li><strong>Refrigeració:</strong> Tecnologia Cooler Boost per a una millor dissipació de calor</li>
                    <li><strong>Teclat:</strong> Retroil·luminat en blanc, dissenyat per a gamers</li>
                    <li><strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.0, Ethernet</li>
                    <li><strong>Durabilitat:</strong> Xassís prim y resistent per a una millor portabilitat</li>
                    <li><strong>Autonomia:</strong> Fins a 7 hores depenent de l’ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil7.jpg';
        } else if (productId === 'producto8') {
            productTitle.innerText = 'HP Victus Gaming 16-r0036ns';
            productDescription.innerHTML = `
                El <strong>HP Victus Gaming 16-r0036ns</strong> és un portàtil dissenyat per a jugadors que busquen una combinació d'alt rendiment y un disseny atractiu. Amb el potent <strong>AMD Ryzen 7 5800H</strong> y la <strong>NVIDIA GeForce RTX 3060</strong>, ofereix una experiència gaming immersiva y sense interrupcions. La seva pantalla de <strong>16,1 polzades</strong> Full HD amb una taxa de refresc de <strong>144Hz</strong> garanteix una visualització nítida y fluida en tot moment.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> AMD Ryzen 7 5800H (8 nuclis, fins a 4,4 GHz)</li>
                    <li><strong>Targeta gràfica:</strong> NVIDIA GeForce RTX 3060 amb 6GB GDDR6</li>
                    <li><strong>Memòria RAM:</strong> 16GB DDR4 (expandible fins a 32GB)</li>
                    <li><strong>Emmagatzematge:</strong> 512GB SSD NVMe</li>
                    <li><strong>Pantalla:</strong> 16,1 polzades, Full HD (1920 x 1080), 144Hz</li>
                    <li><strong>Refrigeració:</strong> Sistema de refrigeració avançat per a un rendiment òptim y menor temperatura</li>
                    <li><strong>Teclat:</strong> Retroil·luminat en blanc, amb tecles específiques per a gamers</li>
                    <li><strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet</li>
                    <li><strong>Durabilitat:</strong> Disseny robust amb xassís resistent per a una bona portabilitat</li>
                    <li><strong>Autonomia:</strong> Fins a 8 hores depenent de l’ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil8.jpg';
        } else if (productId === 'producto9') {
            productTitle.innerText = 'MSI Modern 15 H C13M-087XES';
            productDescription.innerHTML = `
                El <strong>MSI Modern 15 H C13M-087XES</strong> és un portàtil elegant y lleuger, ideal per a professionals y creadors que necessiten un dispositivo potent però portàtil. Equipat amb el potent <strong>Intel Core i7-1360P</strong> y la <strong>Intel Iris Xe Graphics</strong>, aquest portàtil ofereix un rendiment excel·lent per a tasques multitarea y creació de continguts. La seva pantalla de <strong>15,6 polzades</strong> Full HD proporciona imatges nítides y una visualització clara per a totes les teves tasques.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> Intel Core i7-1360P (12 nuclis, fins a 5,0 GHz)</li>
                    <li><strong>Targeta gràfica:</strong> Intel Iris Xe Graphics integrat</li>
                    <li><strong>Memòria RAM:</strong> 16GB DDR4 (expandible fins a 64GB)</li>
                    <li><strong>Emmagatzematge:</strong> 512GB SSD NVMe</li>
                    <li><strong>Pantalla:</strong> 15,6 polzades, Full HD (1920 x 1080)</li>
                    <li><strong>Refrigeració:</strong> Sistema de refrigeració d'alta eficiència per a un rendiment òptim</li>
                    <li><strong>Teclat:</strong> Retroil·luminat en blanc, dissenyat per a una experiència d’escriptura còmoda</li>
                    <li><strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.0, Ethernet</li>
                    <li><strong>Durabilitat:</strong> Disseny prim y elegant, fàcil de transportar</li>
                    <li><strong>Autonomia:</strong> Fins a 10 hores depenent de l’ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil9.jpg';
        } else if (productId === 'producto10') {
            productTitle.innerText = 'ASUS Vivobook 15 M1502YA-NJ506W';
            productDescription.innerHTML = `
                El <strong>ASUS Vivobook 15 15 M1502YA-NJ506W</strong> és un portàtil versàtil i potent, dissenyat per a usuaris que necessiten rendiment i portabilitat. Equipat amb el processador <strong>AMD Ryzen 7 7730U</strong> i gràfics integrats, aquest portàtil ofereix un rendiment excel·lent per a tasques diàries, multimèdia i treball en multitarea. La seva pantalla de <strong>15,6 polzades</strong> Full HD proporciona imatges nítides i una visualització clara per a totes les teves necessitats.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                     <li><strong>Processador:</strong> AMD Ryzen 7 7730U (8 nuclis, fins a 4,5 GHz)</li> 
                     <li><strong>Targeta Gràfica:</strong> Gràfics integrats AMD Radeon</li>
                     <li><strong>Memòria RAM:</strong> 16GB DDR4</li>
                     <li><strong>Emmagatzematge:</strong> 512GB SSD NVMe</li>
                     <li><strong>Pantalla:</strong> 15,6 polzades, Full HD (1920 x 1080)</li>
                      <li><strong>Refrigeració:</strong> Sistema de refrigeració eficient per a un rendiment òptim</li>
                      <li><strong>Teclat:</strong> Teclat retroil·luminat, còmode per a llargues sessions de treball</li>
                      <li><strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI, lector de targetes microSD</li>
                      <li><strong>Durabilitat:</strong> Disseny lleuger i robust, fàcil de transportar</li>
                      <li><strong>Autonomia:</strong> Fins a 10 hores depenent de l’ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil10.jpg';
        } else if (productId === 'producto11') {
            productTitle.innerText = 'Acer Gaming Nitro 5 AN515-58';
            productDescription.innerHTML = `
                El <strong>Acer Gaming Nitro 5 AN515-58</strong> és un portàtil de joc d'alt rendiment, dissenyat per oferir una experiència de joc immersiva i potent. Equipat amb un processador <strong>Intel Core i9-12900H</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4060</strong>, aquest portàtil està preparat per gestionar els jocs més exigents amb facilitat. La seva pantalla de <strong>15,6 polzades</strong> Full HD amb una alta taxa de refresc proporciona imatges nítides i una resposta ràpida, ideal per a jocs i multimèdia.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> Intel Core i9-12900H (16 nuclis, fins a 5,0 GHz)</li>
                    <li><strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060</li>
                    <li><strong>Memòria RAM:</strong> 32GB DDR5</li>
                    <li><strong>Emmagatzematge:</strong> 1TB SSD NVMe</li>
                    <li><strong>Pantalla:</strong> 15,6 polzades, Full HD (1920 x 1080), 144Hz</li>
                    <li><strong>Refrigeració:</strong> Sistema de refrigeració avançat amb doble ventilador</li>
                    <li><strong>Teclat:</strong> Teclat retroil·luminat RGB, resistent per a sessions llargues de joc</li>
                    <li><strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet</li>
                    <li><strong>Durabilitat:</strong> Disseny robust i resistent, ideal per a la portabilitat</li>
                     <li><strong>Autonomia:</strong> Fins a 8 hores depenent de l’ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil11.jpg';
        } else if (productId === 'producto12') {
            productTitle.innerText = 'Acer Gaming Nitro V 15 ANV15-41';
            productDescription.innerHTML = `
                El <strong>Acer Gaming Nitro V 15 ANV15-41</strong> és un portàtil de joc potent i fiable, dissenyat per oferir un rendiment excepcional en jocs i aplicacions exigents. Equipat amb un processador <strong>AMD Ryzen 7 7735HS</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4050</strong>, aquest portàtil està preparat per gestionar els jocs més moderns amb facilitat. La seva pantalla de <strong>15,6 polzades</strong> Full HD amb una alta taxa de refresc proporciona imatges nítides i una resposta ràpida, ideal per a una experiència de joc immersiva.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                     <li><strong>Processador:</strong> AMD Ryzen 7 7735HS (8 nuclis, fins a 4,75 GHz)</li>
                      <li><strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4050</li>
                      <li><strong>Memòria RAM:</strong> 16GB DDR5</li>
                      <li><strong>Emmagatzematge:</strong> 1TB SSD NVMe</li>
                      <li><strong>Pantalla:</strong> 15,6 polzades, Full HD (1920 x 1080), 144Hz</li>
                      <li><strong>Refrigeració:</strong> Sistema de refrigeració avançat amb doble ventilador</li>
                       <li><strong>Teclat:</strong> Teclat retroil·luminat RGB, resistent per a sessions llargues de joc</li>
                       <li><strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet</li>
                       <li><strong>Durabilitat:</strong> Disseny robust i resistent, ideal per a la portabilitat</li>
                       <li><strong>Autonomia:</strong> Fins a 8 hores depenent de l’ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil12.jpg';
        } else if (productId === 'producto13') {
            productTitle.innerText = 'MSI Cyborg 15 A13VE-472XES';
            productDescription.innerHTML = `
                El <strong>MSI Cyborg 15 A13VE-472XES</strong> és un portàtil de joc potent i innovador, dissenyat per oferir un rendiment excepcional en jocs i aplicacions exigents. Equipat amb un processador <strong>Intel Core i7-13620H</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4050</strong>, aquest portàtil està preparat per gestionar els jocs més moderns amb facilitat. La seva pantalla de <strong>15,6 polzades</strong> Full HD amb una alta taxa de refresc proporciona imatges nítides i una resposta ràpida, ideal per a una experiència de joc immersiva.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> Intel Core i7-13620H (14 nuclis, fins a 4,9 GHz)</li>
                    <li><strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4050</li>
                    <li><strong>Memòria RAM:</strong> 16GB DDR5</li>
                    <li><strong>Emmagatzematge:</strong> 1TB SSD NVMe</li>
                    <li><strong>Pantalla:</strong> 15,6 polzades, Full HD (1920 x 1080), 144Hz</li>
                    <li><strong>Refrigeració:</strong> Sistema de refrigeració avançat amb doble ventilador</li>
                    <li><strong>Teclat:</strong> Teclat retroil·luminat RGB, resistent per a sessions llargues de joc</li>
                    <li><strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 3.2, HDMI 2.1, Ethernet</li>
                    <li><strong>Durabilitat:</strong> Disseny robust i resistent, ideal per a la portabilitat</li>
                    <li><strong>Autonomia:</strong> Fins a 8 hores depenent de l’ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil13.jpg';
        } else if (productId === 'producto14') {
            productTitle.innerText = 'MacBook Air Apple M3 512GB';
            productDescription.innerHTML = `
                El <strong>Apple MacBook Air</strong> amb el processador <strong>Apple M3</strong> és un portàtil elegant i potent, dissenyat per oferir un rendiment excepcional en un format lleuger i compacte. Equipat amb el xip <strong>Apple M3</strong> i una GPU de <strong>10 nuclis</strong>, aquest portàtil està preparat per gestionar tasques exigents amb facilitat. La seva pantalla de <strong>13,6 polzades</strong> Liquid Retina proporciona imatges nítides i vibrants, ideal per a professionals creatius i usuaris diaris.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> Apple M3 (8 nuclis de CPU, 10 nuclis de GPU)</li>
                    <li><strong>Memòria RAM:</strong> 16GB Unified Memory</li>
                    <li><strong>Emmagatzematge:</strong> 512GB SSD</li>
                    <li><strong>Pantalla:</strong> 13,6 polzades, Liquid Retina (2560 x 1600)</li>
                    <li><strong>Refrigeració:</strong> Sistema de refrigeració passiva sense ventilador</li>
                    <li><strong>Teclat:</strong> Teclat retroil·luminat Magic Keyboard, còmode i silenciós</li>
                    <li><strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.0, dos ports Thunderbolt/USB 4</li>
                    <li><strong>Durabilitat:</strong> Disseny lleuger i robust, fabricat amb alumini reciclat</li> 
                    <li><strong>Autonomia:</strong> Fins a 18 hores de bateria, depenent de l'ús</li> 
                    <li><strong>Color:</strong> Acabat en color Medianoche</li> 
                </ul>
            `;
            productImage.src = 'img/portatil14.jpg';
        } else if (productId === 'producto15') {
            productTitle.innerText = 'MSI Sword 16 HX B14VFKG-054XES';
            productDescription.innerHTML = `
                El <strong>MSI Sword 16 HX B14VFKG-054XES</strong> és un portàtil de joc potent i elegant, dissenyat per oferir un rendiment excepcional en jocs i aplicacions exigents. Equipat amb un processador <strong>Intel Core i7</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX</strong>, aquest portàtil està preparat per gestionar els jocs més moderns amb facilitat. La seva pantalla de <strong>16 polzades</strong> amb una alta taxa de refresc proporciona imatges nítides i una resposta ràpida, ideal per a una experiència de joc immersiva.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> Intel Core i7 (14 nuclis, fins a 5,0 GHz)</li>
                    <li><strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060</li>
                    <li><strong>Memòria RAM:</strong> 16GB DDR5</li>
                    <li><strong>Emmagatzematge:</strong> 1TB SSD NVMe</li>
                    <li><strong>Pantalla:</strong> 16 polzades, Full HD (1920 x 1200), 144Hz</li>
                    <li><strong>Refrigeració:</strong> Sistema de refrigeració avançat amb doble ventilador</li>
                    <li><strong>Teclat:</strong> Teclat retroil·luminat RGB, resistent per a sessions llargues de joc</li>
                    <li><strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 3.2, HDMI 2.1, Ethernet</li>
                    <li><strong>Durabilitat:</strong> Disseny robust i resistent, ideal per a la portabilitat</li>
                    <li><strong>Autonomia:</strong> Fins a 8 hores depenent de l’ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil15.jpg';
        } else if (productId === 'producto16') {
            productTitle.innerText = 'ASUS Vivobook 15 M1502YA-NJ201W';
            productDescription.innerHTML = `
                El <strong>ASUS Vivobook 15 M1502YA-NJ201W</strong> és un portàtil versàtil i potent, dissenyat per a usuaris que necessiten rendiment i portabilitat. Equipat amb el processador <strong>AMD Ryzen 7 7730U</strong> i gràfics integrats, aquest portàtil ofereix un rendiment excel·lent per a tasques diàries, multimèdia i treball en multitarea. La seva pantalla de <strong>15,6 polzades</strong> Full HD proporciona imatges nítides i una visualització clara per a totes les teves necessitats.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> AMD Ryzen 7 7730U (8 nuclis, fins a 4,5 GHz)</li>
                    <li><strong>Targeta Gràfica:</strong> Gràfics integrats AMD Radeon</li>
                    <li><strong>Memòria RAM:</strong> 16GB DDR4</li>
                    <li><strong>Emmagatzematge:</strong> 512GB SSD NVMe</li>
                    <li><strong>Pantalla:</strong> 15,6 polzades, Full HD (1920 x 1080)</li>
                    <li><strong>Refrigeració:</strong> Sistema de refrigeració eficient per a un rendiment òptim</li>
                    <li><strong>Teclat:</strong> Teclat retroil·luminat, còmode per a llargues sessions de treball</li>
                    <li><strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI, lector de targetes microSD</li>
                    <li><strong>Durabilitat:</strong> Disseny lleuger i robust, fàcil de transportar</li>
                    <li><strong>Autonomia:</strong> Fins a 10 hores depenent de l’ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil16.jpg';
        } else if (productId === 'producto17') {
            productTitle.innerText = 'MSI Thin A15 B7VE-071XES';
            productDescription.innerHTML = `
                El <strong>MSI Thin A15 B7VE-071XES</strong> és un portàtil de joc lleuger i potent, dissenyat per oferir un rendiment excepcional en un format compacte. Equipat amb un processador <strong>AMD Ryzen 5 7535HS</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4050</strong>, aquest portàtil està preparat per gestionar els jocs més moderns amb facilitat. La seva pantalla de <strong>15,6 polzades</strong> Full HD amb una alta taxa de refresc proporciona imatges nítides i una resposta ràpida, ideal per a una experiència de joc immersiva.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> AMD Ryzen 5 7535HS (6 nuclis, fins a 4,5 GHz)</li>
                    <li><strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4050</li>
                    <li><strong>Memòria RAM:</strong> 16GB DDR5</li>
                    <li><strong>Emmagatzematge:</strong> 512GB SSD NVMe</li>
                    <li><strong>Pantalla:</strong> 15,6 polzades, Full HD (1920 x 1080), 144Hz</li>
                    <li><strong>Refrigeració:</strong> Sistema de refrigeració avançat amb doble ventilador</li>
                    <li><strong>Teclat:</strong> Teclat retroil·luminat RGB, resistent per a sessions llargues de joc</li>
                    <li><strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 3.2, HDMI 2.1, Ethernet</li>
                    <li><strong>Durabilitat:</strong> Disseny robust i resistent, ideal per a la portabilitat</li>
                    <li><strong>Autonomia:</strong> Fins a 8 hores depenent de l’ús</li>
                </ul>
            `;
            productImage.src = 'img/portatil17.jpg';
        } else if (productId === 'producto18') {
            productTitle.innerText = 'Lenovo LOQ Gen 7 15ARP9';
            productDescription.innerHTML = `
                El <strong>Lenovo LOQ Gen 7 15ARP9</strong> és un portàtil de joc potent i versàtil, dissenyat per oferir un rendiment excepcional en jocs i aplicacions exigents. Equipat amb un processador <strong>AMD Ryzen 7 7435HS</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4060</strong>, aquest portàtil està preparat per gestionar els jocs més moderns amb facilitat. La seva pantalla de <strong>15,6 polzades</strong> Full HD amb una alta taxa de refresc proporciona imatges nítides i una resposta ràpida, ideal per a una experiència de joc immersiva.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li> <strong>Processador:</strong> AMD Ryzen 7 7435HS (8 nuclis, fins a 4,75 GHz) </li>
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060 </li>
                    <li> <strong>Memòria RAM:</strong> 24GB DDR5 </li>
                    <li> <strong>Emmagatzematge:</strong> 1TB SSD NVMe </li>
                    <li> <strong>Pantalla:</strong> 15,6 polzades, Full HD (1920 x 1080), 144Hz </li>
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració avançat amb doble ventilador </li>
                    <li> <strong>Teclat:</strong> Teclat retroil·luminat RGB, resistent per a sessions llargues de joc </li>
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 3.2, HDMI 2.1, Ethernet </li>
                    <li> <strong>Durabilitat:</strong> Disseny robust i resistent, ideal per a la portabilitat </li>
                    <li> <strong>Autonomia:</strong> Fins a 8 hores depenent de l’ús </li>
                </ul>
            `;
            productImage.src = 'img/portatil18.jpg';
        } else if (productId === 'producto19') {
            productTitle.innerText = 'MacBook Air Apple M3 256GB';
            productDescription.innerHTML = `
                El <strong>Apple MacBook Air</strong> amb el processador <strong>Apple M3</strong> és un portàtil elegant i potent, dissenyat per oferir un rendiment excepcional en un format lleuger i compacte. Equipat amb el xip <strong>Apple M3</strong> i una GPU de <strong>8 nuclis</strong>, aquest portàtil està preparat per gestionar tasques exigents amb facilitat. La seva pantalla de <strong>13,6 polzades</strong> Liquid Retina proporciona imatges nítides i vibrants, ideal per a professionals creatius i usuaris diaris.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li> <strong>Processador:</strong> Apple M3 (8 nuclis de CPU) </li>
                    <li> <strong>GPU:</strong> GPU de 8 nuclis </li>
                    <li> <strong>Memòria RAM:</strong> 16GB Unified Memory </li>
                    <li> <strong>Emmagatzematge:</strong> 256GB SSD </li>
                    <li> <strong>Pantalla:</strong> 13,6 polzades, Liquid Retina (2560 x 1600) </li>
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració passiva sense ventilador </li>
                    <li> <strong>Teclat:</strong> Teclat retroil·luminat Magic Keyboard, còmode i silenciós </li>
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.0, dos ports Thunderbolt/USB 4 </li>
                    <li> <strong>Durabilitat:</strong> Disseny lleuger i robust, fabricat amb alumini reciclat </li>
                    <li> <strong>Autonomia:</strong> Fins a 18 hores de bateria, depenent de l'ús </li>
                    <li> <strong>Color:</strong> Acabat en color Plata </li>
                </ul>
            `;
            productImage.src = 'img/portatil19.jpg';
        } else if (productId === 'producto20') {
            productTitle.innerText = 'ASUS Vivobook 16X K3605ZF-MB484';
            productDescription.innerHTML = `
                El <strong>ASUS Vivobook 16X K3605ZF-MB484</strong> és un portàtil potent i versàtil, dissenyat per oferir un rendiment excepcional en tasques diàries i aplicacions exigents. Equipat amb un processador <strong>Intel Core i5-12500H</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 2050</strong>, aquest portàtil està preparat per gestionar jocs i tasques creatives amb facilitat. La seva pantalla de <strong>16 polzades</strong> Full HD proporciona imatges nítides i una visualització clara, ideal per a professionals i usuaris diaris.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                     <li> <strong>Processador:</strong> Intel Core i5-12500H (12 nuclis, fins a 4,5 GHz) </li>
                     <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 2050 </li>
                     <li> <strong>Memòria RAM:</strong> 16GB DDR4 </li>
                     <li> <strong>Emmagatzematge:</strong> 512GB SSD NVMe </li>
                     <li> <strong>Pantalla:</strong> 16 polzades, Full HD (1920 x 1200) </li>
                     <li> <strong>Refrigeració:</strong> Sistema de refrigeració eficient per a un rendiment òptim </li>
                     <li> <strong>Teclat:</strong> Teclat retroil·luminat, còmode per a llargues sessions de treball </li>
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI, lector de targetes microSD </li>
                    <li> <strong>Durabilitat:</strong> Disseny robust i resistent, fàcil de transportar </li>
                    <li> <strong>Autonomia:</strong> Fins a 10 hores depenent de l’ús </li>
                </ul>  
            `;
            productImage.src = 'img/portatil20.jpg';
        } else if (productId === 'torre1') {
            productTitle.innerText = 'PcCom Ready Intel Core i5-12400F / 32GB / 1TB SSD / RTX4060';
            productDescription.innerHTML = `
                És un ordinador de sobretaula potent i fiable, dissenyat per oferir un rendiment excepcional en tasques diàries i aplicacions exigents. Equipat amb un processador <strong>Intel Core i5-12400F</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4060</strong>, aquest PC està preparat per gestionar jocs moderns i tasques creatives amb facilitat. La capacitat d'emmagatzematge de <strong>1TB SSD</strong> i <strong>32GB</strong> de RAM garanteixen un rendiment ràpid i eficient.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> Intel Core i5-12400F (12 nuclis, fins a 4,6 GHz) 
                        <ul> 
                            <li>Aquest processador ofereix un excel·lent equilibri entre rendiment i eficiència energètica.</li> 
                            <li>Ideal per a tasques multitasca i aplicacions que requereixen un alt rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060 
                        <ul> 
                            <li>Capaç de gestionar jocs moderns amb configuracions altes i oferir una experiència de joc fluida.</li> 
                            <li>Compatible amb tecnologies de traçat de raigs i DLSS per millorar la qualitat visual en jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 32GB DDR4 
                        <ul> 
                            <li>Amplia capacitat de memòria per gestionar múltiples aplicacions i processos simultàniament.</li> 
                            <li>Ideal per a l'edició de vídeo, el disseny gràfic i altres tasques intensives en memòria.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 1TB SSD NVMe 
                        <ul> 
                            <li>Emmagatzematge ràpid i eficient per a temps de càrrega reduïts i un rendiment general millorat.</li> 
                            <li>Suficient espai per emmagatzemar una gran quantitat d'arxius, aplicacions i jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració avançat amb doble ventilador 
                        <ul> 
                            <li>Manté el sistema fresc fins i tot sota càrregues de treball intensives.</li>
                            <li>Dissenyat per minimitzar el soroll i maximitzar l'eficiència de refrigeració.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet 
                        <ul> 
                            <li>Compatibilitat amb les últimes tecnologies de connexió per a una experiència de xarxa ràpida i estable.</li> 
                            <li>Múltiples ports per connectar una varietat de dispositius perifèrics.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre1.jpg';
        } else if (productId === 'torre2') {
            productTitle.innerText = 'Intel Core i5-12400F / 32GB / 1TB SSD / RTX4060 + W11 Home';
            productDescription.innerHTML = `
                És un ordinador de sobretaula potent i fiable, dissenyat per oferir un rendiment excepcional en tasques diàries i aplicacions exigents. Equipat amb un processador <strong>Intel Core i5-12400F</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4060</strong>, aquest PC està preparat per gestionar jocs moderns i tasques creatives amb facilitat. La capacitat d'emmagatzematge de <strong>1TB SSD</strong> i <strong>32GB</strong> de RAM garanteixen un rendiment ràpid i eficient.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> Intel Core i5-12400F (12 nuclis, fins a 4,6 GHz) 
                        <ul> 
                            <li>Aquest processador ofereix un excel·lent equilibri entre rendiment i eficiència energètica.</li> 
                            <li>Ideal per a tasques multitasca i aplicacions que requereixen un alt rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060 
                        <ul> 
                            <li>Capaç de gestionar jocs moderns amb configuracions altes i oferir una experiència de joc fluida.</li> 
                            <li>Compatible amb tecnologies de traçat de raigs i DLSS per millorar la qualitat visual en jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 32GB DDR4 
                        <ul> 
                            <li>Amplia capacitat de memòria per gestionar múltiples aplicacions i processos simultàniament.</li>
                            <li>Ideal per a l'edició de vídeo, el disseny gràfic i altres tasques intensives en memòria.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 1TB SSD NVMe 
                        <ul>    
                            <li>Emmagatzematge ràpid i eficient per a temps de càrrega reduïts i un rendiment general millorat.</li> 
                            <li>Suficient espai per emmagatzemar una gran quantitat d'arxius, aplicacions i jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració avançat amb doble ventilador    
                        <ul> 
                            <li>Manté el sistema fresc fins i tot sota càrregues de treball intensives.</li>
                            <li>Dissenyat per minimitzar el soroll i maximitzar l'eficiència de refrigeració.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet 
                        <ul> 
                            <li>Compatibilitat amb les últimes tecnologies de connexió per a una experiència de xarxa ràpida i estable.</li>
                            <li>Múltiples ports per connectar una varietat de dispositius perifèrics.</li> </ul> </li> 
                            <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                                <ul> 
                                    <li>Ofereix una experiència d'usuari moderna i intuitiva amb noves funcions i millores de rendiment.</li> 
                                    <li>Compatible amb una àmplia gamma de programari i aplicacions.</li> 
                                </ul> 
                            </li> 
                        </ul>
            `;
            productImage.src = 'img/torres/torre2.jpg';
        } else if (productId === 'torre3') {
            productTitle.innerText = 'AMD Ryzen 7 5800X / 32GB / 1TB SSD / RTX 4060 Ti + W11 Home';
            productDescription.innerHTML = `
                És un ordinador de sobretaula potent i fiable, dissenyat per oferir un rendiment excepcional en tasques diàries i aplicacions exigents. Equipat amb un processador <strong>AMD Ryzen 7 5800X</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4060 Ti</strong>, aquest PC està preparat per gestionar jocs moderns i tasques creatives amb facilitat. La capacitat d'emmagatzematge de <strong>1TB SSD</strong> i <strong>32GB</strong> de RAM garanteixen un rendiment ràpid i eficient. A més, ve amb el sistema operatiu <strong>Windows 11 Home</strong>, oferint una experiència d'usuari moderna i intuitiva.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> AMD Ryzen 7 5800X (8 nuclis, fins a 4,7 GHz) 
                        <ul> 
                            <li>Aquest processador ofereix un rendiment excepcional en tasques multifil i aplicacions que requereixen alta potència de càlcul.</li> 
                            <li>Ideal per a la creació de contingut, el desenvolupament de software i els jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060 Ti 
                        <ul> 
                            <li>Capaç de gestionar jocs moderns amb configuracions altes i oferir una experiència de joc fluida.</li> 
                            <li>Compatible amb tecnologies de traçat de raigs i DLSS per millorar la qualitat visual en jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 32GB DDR4 
                        <ul> 
                            <li>Amplia capacitat de memòria per gestionar múltiples aplicacions i processos simultàniament.</li> 
                            <li>Ideal per a l'edició de vídeo, el disseny gràfic i altres tasques intensives en memòria.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 1TB SSD NVMe 
                        <ul> 
                            <li>Emmagatzematge ràpid i eficient per a temps de càrrega reduïts i un rendiment general millorat.</li> 
                            <li>Suficient espai per emmagatzemar una gran quantitat d'arxius, aplicacions i jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració avançat amb doble ventilador 
                        <ul> 
                            <li>Manté el sistema fresc fins i tot sota càrregues de treball intensives.</li> 
                            <li>Dissenyat per minimitzar el soroll i maximitzar l'eficiència de refrigeració.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet 
                        <ul> 
                            <li>Compatibilitat amb les últimes tecnologies de connexió per a una experiència de xarxa ràpida i estable.</li> 
                            <li>Múltiples ports per connectar una varietat de dispositius perifèrics.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                        <ul> 
                            <li>Ofereix una experiència d'usuari moderna i intuitiva amb noves funcions i millores de rendiment.</li> 
                            <li>Compatible amb una àmplia gamma de programari i aplicacions.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre3.jpg';
        } else if (productId === 'torre4') {
            productTitle.innerText = 'Imperial Intel Core i5-14600KF / 2TB SSD / 32GB / RTX 4070 Super + Win';
            productDescription.innerHTML = `
                És un ordinador de sobretaula potent i fiable, dissenyat per oferir un rendiment excepcional en jocs i aplicacions exigents. Equipat amb un processador <strong>Intel Core i5-14600KF</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4070 Super</strong>, aquest PC està preparat per gestionar jocs moderns i tasques creatives amb facilitat. La capacitat d'emmagatzematge de <strong>2TB SSD</strong> i <strong>32GB</strong> de RAM garanteixen un rendiment ràpid i eficient. A més, ve amb el sistema operatiu <strong>Windows 11 Home</strong>, oferint una experiència d'usuari moderna i intuïtiva.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> Intel Core i5-14600KF (14 nuclis, fins a 5,3 GHz) 
                <ul> 
                    <li>Excel·lent rendiment en jocs i aplicacions de creació de contingut.</li> 
                    <li>Gran capacitat de processament per a tasques multicore i alta freqüència per a jocs.</li> 
                </ul> 
            </li> 
            <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4070 Super 
                <ul> 
                    <li>Ideal per jugar a 1440p i fins i tot 4K amb un rendiment impressionant.</li> 
                    <li>Compatible amb tecnologies de traçat de raigs i DLSS 3 per millorar la qualitat visual en jocs.</li> 
                </ul> 
            </li> 
            <li> <strong>Memòria RAM:</strong> 32GB DDR4 
                <ul> 
                    <li>Capacitat més que suficient per a multitarea intensa i aplicacions exigents.</li> 
                    <li>Perfecte per a l'edició de vídeo, modelatge 3D i jocs d’última generació.</li> 
                </ul> 
            </li> 
            <li> <strong>Emmagatzematge:</strong> 2TB SSD NVMe 
                <ul> 
                    <li>Temps de càrrega ultraràpid per a jocs i aplicacions.</li> 
                    <li>Gran capacitat per emmagatzemar una biblioteca extensa de jocs i arxius.</li> 
                </ul> 
            </li> 
            <li> <strong>Refrigeració:</strong> Sistema avançat amb ventiladors optimitzats 
                <ul> 
                    <li>Manté el sistema fresc i silenciós fins i tot sota càrregues altes.</li> 
                    <li>Disseny pensat per maximitzar la durabilitat i eficiència del hardware.</li> 
                </ul> 
            </li> 
            <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet 
                <ul> 
                    <li>Connexió estable i ràpida per jugar en línia i treballar sense interrupcions.</li> 
                    <li>Varietat de ports per a connectar accessoris i pantalles múltiples.</li> 
                </ul> 
            </li> 
            <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                <ul> 
                    <li>Interfície moderna, optimitzada per a rendiment i productivitat.</li> 
                    <li>Compatible amb les últimes tecnologies i aplicacions.</li> 
                </ul> 
            </li> 
        </ul>
    `;
            productImage.src = 'img/torres/torre4.jpg';
        } else if (productId === 'torre5') {
            productTitle.innerText = 'Intel Core i5-12400F / 32GB / 1TB SSD / RTX 4060 - Blanc';
            productDescription.innerHTML = `
                És un ordinador de sobretaula potent i equilibrat, dissenyat per oferir un gran rendiment en jocs i tasques quotidianes. Equipat amb un processador <strong>Intel Core i5-12400F</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4060</strong>, aquest PC garanteix una experiència fluida tant en gaming com en aplicacions creatives. La combinació de <strong>32GB de RAM</strong> i un <strong>1TB SSD</strong> assegura velocitat i capacitat per a tota mena d’usos. El seu elegant disseny en color blanc li dóna un toc modern i sofisticat.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> Intel Core i5-12400F (6 nuclis, fins a 4,4 GHz) 
                        <ul> 
                            <li>Gran eficiència en jocs i aplicacions de productivitat.</li> 
                            <li>Excel·lent rendiment en tasques d’ús diari i creació de contingut moderada.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060 
                        <ul> 
                            <li>Compatible amb jocs moderns en resolució 1080p i 1440p amb configuracions altes.</li> 
                            <li>Suport per a Ray Tracing i DLSS per a una experiència visual millorada.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 32GB DDR4 
                        <ul> 
                            <li>Capacitat suficient per a multitarea, gaming i aplicacions exigents.</li> 
                            <li>Ideal per a edició de vídeo, disseny gràfic i altres tasques professionals.</li> 
                        </ul>   
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 1TB SSD NVMe 
                        <ul> 
                            <li>Temps de càrrega ràpid per a jocs i programes.</li> 
                            <li>Suficient espai per emmagatzemar arxius, aplicacions i projectes multimèdia.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema optimitzat amb flux d’aire eficient 
                        <ul> 
                            <li>Manté temperatures controlades per a un rendiment òptim.</li> 
                            <li>Dissenyat per reduir el soroll sense comprometre la refrigeració.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi, Bluetooth, USB 3.2, HDMI, Ethernet 
                        <ul> 
                            <li>Compatible amb connexions ràpides per a una experiència sense interrupcions.</li> 
                            <li>Múltiples ports per connectar dispositius i perifèrics.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Disseny:</strong> Caixa en color blanc amb acabats moderns 
                        <ul> 
                            <li>Estètica minimalista i atractiva.</li> 
                            <li>Perfecte per a espais de treball i gaming setups amb estil.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre5.jpg';
        } else if (productId === 'torre6') {
            productTitle.innerText = 'Imperial AMD Ryzen 7 9800X3D / 32GB / 2TB SSD / RTX 5070 Ti';
            productDescription.innerHTML = `
                És un ordinador de sobretaula d'alt rendiment, dissenyat per satisfer les necessitats dels gamers i creadors de contingut més exigents. Equipat amb un potent processador <strong>AMD Ryzen 7 9800X3D</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 5070 Ti</strong>, aquest PC ofereix un rendiment espectacular en jocs i aplicacions professionals. Amb <strong>32GB de RAM</strong> i un <strong>2TB SSD</strong>, garanteix velocitat, fluïdesa i una gran capacitat d'emmagatzematge per a qualsevol tipus d'ús.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> AMD Ryzen 7 9800X3D (8 nuclis, fins a 5,5 GHz) 
                        <ul> 
                            <li>Tecnologia 3D V-Cache per a un rendiment superior en gaming i tasques intensives.</li> 
                            <li>Gran capacitat de processament per a aplicacions multicore exigents.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 5070 Ti 
                        <ul> 
                            <li>Excel·lent rendiment en jocs AAA a 1440p i 4K amb configuracions ultra.</li> 
                            <li>Compatible amb Ray Tracing i DLSS 3 per a una experiència visual immersiva.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 32GB DDR5 
                        <ul> 
                            <li>Alta velocitat per a una execució fluida de jocs i aplicacions professionals.</li> 
                            <li>Ideal per a edició de vídeo, modelatge 3D i altres tasques exigents.</li>   
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 2TB SSD NVMe Gen4 
                        <ul>        
                            <li>Temps de càrrega ultraràpid per a jocs i programes.</li> 
                            <li>Gran capacitat per emmagatzemar una biblioteca extensa de jocs i projectes.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema avançat de refrigeració líquida 
                        <ul> 
                            <li>Manté el processador a temperatures òptimes fins i tot sota càrregues extremes.</li> 
                            <li>Funcionament silenciós i eficient per a un rendiment constant.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 4.0, HDMI 2.1, Ethernet 2.5G 
                        <ul> 
                            <li>Connexió estable i ultraràpida per a jocs en línia i treball professional.</li> 
                            <li>Múltiples ports per connectar dispositius d'última generació.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                        <ul> 
                            <li>Interfície moderna i optimitzada per a rendiment i productivitat.</li> 
                            <li>Compatible amb les últimes tecnologies i aplicacions.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre6.jpg';
        } else if (productId === 'torre7') {
            productTitle.innerText = 'Epical-Q Hangok AMD Ryzen 9 7950X3D/64GB/2TB SSD/RTX 5080';
            productDescription.innerHTML = `
                És un ordinador de sobretaula de gamma alta, dissenyat per oferir un rendiment espectacular en tasques exigents com el gaming en 4K, l'edició de vídeo, la creació de contingut i les aplicacions professionals. Equipat amb un processador <strong>AMD Ryzen 9 7950X3D</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 5080</strong>, aquest PC és perfecte per als usuaris més exigents que busquen potència i eficiència. Amb <strong>64GB de RAM</strong> i <strong>2TB SSD</strong>, el rendiment és ultraràpid i amb una capacitat d'emmagatzematge impressionant.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> AMD Ryzen 9 7950X3D (16 nuclis, fins a 5,7 GHz) 
                        <ul> 
                            <li>Amb la tecnologia 3D V-Cache per a un rendiment extrem en jocs i aplicacions de creació de contingut.</li> 
                            <li>Ideal per a la virtualització, edició 3D i tasques de renderitzat intensiu.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 5080 
                        <ul> 
                            <li>Rendiment de primer nivell per a jocs AAA en resolució 4K amb configuracions ultra.</li> 
                            <li>Compatible amb Ray Tracing i DLSS per una experiència visual i fluïda.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 64GB DDR5 
                        <ul> 
                            <li>Ample capacitat per a la multitarea intensiva, aplicacions de creació de contingut i jocs.</li> 
                            <li>Ideal per a treballs professionals com l'edició de vídeo en alta resolució, renderitzat 3D, i simulacions.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 2TB SSD NVMe Gen4 
                        <ul> 
                            <li>Emmagatzematge ultraràpid per a temps de càrrega reduïts i accés instantani a fitxers i aplicacions.</li> 
                            <li>Gran capacitat per emmagatzemar arxius pesats, projectes i una gran biblioteca de jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema avançat de refrigeració líquida 
                        <ul> 
                            <li>Refrigeració òptima per mantenir les temperatures baixes fins i tot en les tasques més exigents.</li> 
                            <li>Silenciós i eficient per a garantir el millor rendiment sense comprometre la tranquil·litat del sistema.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 4.0, HDMI 2.1, Ethernet 10Gb 
                        <ul> 
                            <li>Connexió de xarxa d'alta velocitat per a jocs en línia, treball en núvol i streaming sense interrupcions.</li> 
                            <li>Múltiples ports per connectar perifèrics d'última generació i dispositius externs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                        <ul> 
                            <li>Interfície moderna i fluïda optimitzada per al màxim rendiment.</li> 
                            <li>Compatible amb una àmplia gamma d’aplicacions professionals i de lleure.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre7.jpg';
        } else if (productId === 'torre8') {
            productTitle.innerText = 'AMD Ryzen 7 5800X / 32GB / 2TB SSD / RTX 4060 Ti';
            productDescription.innerHTML = `
                És un ordinador de sobretaula potent i versàtil, ideal per a gamers i professionals de la creació de contingut. Equipat amb un processador <strong>AMD Ryzen 7 5800X</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4060 Ti</strong>, aquest PC garanteix un rendiment excel·lent en jocs i aplicacions creatives. Amb <strong>32GB de RAM</strong> i un <strong>2TB SSD</strong>, el sistema és ràpid, eficaç i amb prou espai per a emmagatzemar tots els teus projectes i jocs preferits.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> AMD Ryzen 7 5800X (8 nuclis, fins a 4,7 GHz) 
                        <ul> 
                            <li>Potència per a tasques multihilo i aplicacions intensives en càlcul.</li> 
                            <li>Ideal per a creació de contingut, jocs i programació.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060 Ti 
                        <ul> 
                            <li>Perfecta per a jocs moderns a alta qualitat i resolució 1080p i 1440p.</li> 
                            <li>Compatibilitat amb Ray Tracing i DLSS per a millorar la qualitat visual dels jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 32GB DDR4 
                        <ul> 
                            <li>Amplia capacitat de memòria per a gestionar diverses aplicacions i processos simultanis.</li> 
                            <li>Ideal per a tasques com l'edició de vídeo, disseny gràfic i altres treballs creatius.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 2TB SSD NVMe 
                        <ul> 
                            <li>Rendiment ultraràpid i capacitat suficient per emmagatzemar jocs, aplicacions i arxius pesats.</li> 
                            <li>Redueix els temps de càrrega i millora l'experiència d'ús general.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració de gran rendiment 
                        <ul> 
                            <li>Manteniment de temperatures òptimes per a un rendiment estable, fins i tot en tasques exigents.</li> 
                            <li>Dissenyat per a un funcionament silenciós i eficient.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet 
                        <ul> 
                            <li>Connexió ràpida i estable per a jocs en línia i treballs en xarxa.</li> 
                            <li>Múltiples ports per a connectar diversos perifèrics i dispositius externs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                        <ul> 
                            <li>Experiència d'usuari moderna i intuitiva amb moltes millores en rendiment i seguretat.</li> 
                            <li>Compatible amb una àmplia gamma d'aplicacions i eines per a tota mena d'usuaris.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre8.jpg';
        } else if (productId === 'torre9') {
            productTitle.innerText = 'AMD Ryzen 7 5800X / 32GB / 1TB SSD / RTX 4060 Ti - Blanc';
            productDescription.innerHTML = `
                És un ordinador de sobretaula potent i elegant, ideal per a gamers i professionals de la creació de contingut. Equipat amb un processador <strong>AMD Ryzen 7 5800X</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4060 Ti</strong>, aquest PC ofereix un rendiment excel·lent en jocs i aplicacions creatives. Amb <strong>32GB de RAM</strong> i <strong>1TB SSD</strong>, el sistema és ràpid, eficient i amb prou espai per emmagatzemar els teus arxius més importants. A més, la seva caixa blanca li dóna un toc modern i distintiu.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> AMD Ryzen 7 5800X (8 nuclis, fins a 4,7 GHz) 
                        <ul> 
                            <li>Gran potència de càlcul per a tasques multihilo i aplicacions que requereixen un alt rendiment.</li> 
                            <li>Ideal per a la creació de contingut, jocs i programació.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060 Ti 
                        <ul> 
                            <li>Capacitat per gestionar jocs moderns amb configuracions altes i una experiència de joc fluida.</li> 
                            <li>Compatible amb Ray Tracing i DLSS per millorar la qualitat visual dels jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 32GB DDR4 
                        <ul> 
                            <li>Ampli espai per a la multitarea i aplicacions de creació de contingut exigents.</li> 
                            <li>Ideal per a l'edició de vídeo, disseny gràfic i altres tasques de gran capacitat de memòria.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 1TB SSD NVMe 
                        <ul> 
                            <li>Emmagatzematge ultraràpid per a temps de càrrega reduïts i un rendiment general millorat.</li> 
                            <li>Suficient capacitat per emmagatzemar una gran quantitat d'arxius, aplicacions i jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració de gran rendiment 
                        <ul> 
                            <li>Manteniment de les temperatures òptimes per a un funcionament estable fins i tot en les tasques més exigents.</li> 
                            <li>Silenciós i eficient per garantir un ambient de treball tranquil.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet 
                        <ul> 
                            <li>Connexió ràpida i estable per a jocs en línia i treballs en xarxa.</li> 
                            <li>Múltiples ports per connectar diversos dispositius externs i perifèrics.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                        <ul> 
                            <li>Experiència d'usuari moderna i intuïtiva amb moltes millores en rendiment i seguretat.</li> 
                            <li>Compatible amb una àmplia gamma d'aplicacions i eines per a tota mena d'usuaris.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre9.jpg';
        } else if (productId === 'torre10') {
            productTitle.innerText = 'Imperial AMD Ryzen 7 7800X3D / 32GB / 2TB SSD / RTX 5070 Ti + W11 H';
            productDescription.innerHTML = `
                És un ordinador de sobretaula de gamma alta, dissenyat per a usuaris que busquen el màxim rendiment en tasques d'alt rendiment com jocs en 4K, creació de contingut i aplicacions professionals. Equipat amb un processador <strong>AMD Ryzen 7 7800X3D</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 5070 Ti</strong>, aquest PC ofereix un rendiment increïble. Amb <strong>32GB de RAM</strong> i <strong>2TB SSD</strong>, el sistema ofereix velocitat, capacitat d'emmagatzematge i un rendiment superior. El sistema operatiu <strong>Windows 11 Home</strong> proporciona una experiència moderna i fluïda.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> AMD Ryzen 7 7800X3D (8 nuclis, fins a 5,0 GHz) 
                        <ul> 
                            <li>Potència de càlcul de primera classe amb tecnologia 3D V-Cache per a un rendiment extrem en jocs i aplicacions professionals.</li> 
                            <li>Ideal per a la creació de contingut, simulacions de gran potència i tasques que requereixen alta capacitat de càlcul.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 5070 Ti 
                        <ul> 
                            <li>Rendiment excepcional per a jocs en 4K i tasques de creació de contingut visualment exigents.</li> 
                            <li>Compatible amb Ray Tracing i DLSS per a millorar la qualitat visual i oferir una experiència fluïda.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 32GB DDR5 
                        <ul> 
                            <li>Ample capacitat per gestionar múltiples aplicacions i processos simultanis amb un rendiment òptim.</li> 
                            <li>Perfecte per a l'edició de vídeo, disseny gràfic i altres tasques de gran intensitat de memòria.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 2TB SSD NVMe Gen4 
                        <ul> 
                            <li>Emmagatzematge ultra-ràpid per a temps de càrrega reduïts i un accés instantani als arxius i aplicacions.</li> 
                            <li>Gran capacitat per emmagatzemar jocs, aplicacions pesades i projectes creatius.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema avançat de refrigeració líquida 
                        <ul> 
                            <li>Mantenir les temperatures baixes fins i tot en les tasques més exigents com jocs de última generació i edició de vídeo de gran resolució.</li> 
                            <li>Sistema silenciós i eficient per a garantir un ambient de treball òptim.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 4.0, HDMI 2.1, Ethernet 10Gb 
                        <ul> 
                            <li>Connexió ràpida i estable per a jocs en línia, treball en xarxa i streaming de vídeo en alta qualitat.</li> 
                            <li>Múltiples ports per connectar diversos dispositius i perifèrics externs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                        <ul> 
                            <li>Una interfície moderna i optimitzada per al màxim rendiment i una experiència d'usuari més fluïda.</li> 
                            <li>Compatible amb una gran varietat d'aplicacions professionals i de lleure.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre10.jpg';
        } else if (productId === 'torre11') {
            productTitle.innerText = 'Intel Core i5-12400F / 32GB / 1TB SSD / RTX 4060 Ti';
            productDescription.innerHTML = `
                És un ordinador de sobretaula potent i equilibrat, ideal per a gamers i professionals que busquen un rendiment excepcional en tasques d'ús diari i aplicacions exigents. Equipat amb un processador <strong>Intel Core i5-12400F</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4060 Ti</strong>, aquest PC garanteix una experiència de joc fluida i un excel·lent rendiment en creació de contingut. Amb <strong>32GB de RAM</strong> i <strong>1TB SSD</strong>, el sistema és ràpid i eficient, oferint un gran espai d'emmagatzematge i temps de càrrega reduïts.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li> <strong>Processador:</strong> Intel Core i5-12400F (6 nuclis, fins a 4,4 GHz) 
                        <ul> 
                            <li>Rendiment sòlid per a tasques multihilo i aplicacions que requereixen potència de càlcul moderada.</li> 
                            <li>Ideal per a jocs de mitjana i alta gamma, així com per a creació de contingut.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060 Ti 
                        <ul> 
                            <li>Rendiment excel·lent per a jocs moderns a 1080p i 1440p amb configuracions altes.</li> 
                            <li>Compatible amb Ray Tracing i DLSS per a una millor qualitat visual en jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 32GB DDR4 
                        <ul> 
                            <li>Capacitat òptima per a la multitarea, aplicacions de creació de contingut i tasques intensives en memòria.</li> 
                            <li>Perfecte per a treballs de disseny gràfic, edició de vídeo i altres aplicacions pesades.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 1TB SSD NVMe 
                        <ul> 
                            <li>Rendiment ultraràpid amb temps de càrrega reduïts i un accés instantani als arxius.</li> 
                            <li>Suficient capacitat per a jocs, aplicacions i arxius de gran mida.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració de gran rendiment 
                        <ul> 
                            <li>Disposa d'un sistema de refrigeració eficient per mantenir el PC fresc en tot moment, fins i tot en tasques exigents.</li> 
                            <li>Redueix la temperatura per evitar l'escalfament i garantir un rendiment òptim.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet 
                        <ul> 
                            <li>Connexió estable i ràpida per a jocs en línia, treballs en xarxa i streaming de contingut.</li> 
                            <li>Múltiples ports per connectar dispositius externs i perifèrics.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                        <ul> 
                            <li>Ofereix una interfície moderna i funcions optimitzades per a un millor rendiment i seguretat.</li> 
                            <li>Compatible amb totes les aplicacions modernes i ofereix una experiència d'usuari fluïda.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre11.jpg';
        } else if (productId === 'torre12') {
            productTitle.innerText = 'AMD Ryzen 5 5500 / 16GB / 1TBSSD / RX 6600';
            productDescription.innerHTML = `
                És un ordinador de sobretaula de gran rendiment, dissenyat per a usuaris que busquen un PC equilibrat per a tasques diàries i jocs en resolució mitjana. Equipat amb un processador <strong>AMD Ryzen 5 5500</strong> i una targeta gràfica <strong>AMD Radeon RX 6600</strong>, aquest PC ofereix un excel·lent rendiment per a jocs moderns i aplicacions de creació de contingut lleugera. Amb <strong>16GB de RAM</strong> i <strong>1TB SSD</strong>, aquest sistema garanteix una resposta ràpida i espai suficient per a arxius i aplicacions.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li> <strong>Processador:</strong> AMD Ryzen 5 5500 (6 nuclis, fins a 4,4 GHz) 
                        <ul> 
                            <li>Rendiment potent per a multitarea i aplicacions que requereixen un bon rendiment de càlcul.</li> 
                            <li>Ideal per a jocs de gamma mitjana i tasques d'ús diari.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> AMD Radeon RX 6600 
                        <ul> 
                            <li>Rendiment excel·lent per a jocs en resolució 1080p amb configuracions altes.</li> 
                            <li>Compatible amb la tecnologia Ray Tracing per millorar la qualitat visual dels jocs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 16GB DDR4 
                        <ul> 
                            <li>Amplia capacitat per a gestionar diverses aplicacions al mateix temps sense perdre rendiment.</li> 
                            <li>Ideal per a la multitarea i treball amb aplicacions lleugeres i mitjanes.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 1TB SSD NVMe 
                        <ul> 
                            <li>Rendiment ràpid amb temps de càrrega reduïts i un accés instantani als arxius.</li> 
                            <li>Suficient espai per emmagatzemar jocs, arxius i aplicacions de mida mitjana.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració eficient 
                        <ul> 
                            <li>Disposa d'un sistema de refrigeració adequat per mantenir les temperatures baixes durant l'ús intensiu.</li> 
                            <li>Garantint un funcionament silenciós i estable durant tot el dia.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 5, Bluetooth 4.2, USB 3.2, HDMI 2.0, Ethernet 
                        <ul> 
                            <li>Connexió ràpida per a tasques en línia, jocs i streaming de contingut.</li> 
                            <li>Múltiples ports per connectar diversos dispositius i perifèrics.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                        <ul> 
                            <li>Ofereix una interfície moderna i optimitzada per a un millor rendiment i seguretat.</li> 
                            <li>Compatible amb la majoria d'aplicacions modernes i ofereix una experiència d'usuari intuïtiva.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre12.jpg';
        } else if (productId === 'torre13') {
            productTitle.innerText = 'AMD Ryzen 7 5800X / 32GB / 2TB SSD / RTX 4060 + W11 Home - Blanc';
            productDescription.innerHTML = `
                Ordinador de sobretaula potent, dissenyat per a usuaris que busquen un rendiment excel·lent en jocs, creació de contingut i tasques exigents. Equipat amb un processador <strong>AMD Ryzen 7 5800X</strong> i una targeta gràfica <strong>NVIDIA GeForce RTX 4060</strong>, aquest PC assegura un rendiment superior en aplicacions i jocs. Amb <strong>32GB de RAM</strong> i <strong>2TB SSD</strong>, ofereix una resposta ràpida, ample espai d'emmagatzematge i temps de càrrega reduïts. A més, ve amb <strong>Windows 11 Home</strong>, la versió més recent del sistema operatiu de Microsoft.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li> <strong>Processador:</strong> AMD Ryzen 7 5800X (8 nuclis, fins a 4,7 GHz) 
                        <ul> 
                            <li>Potència de càlcul elevada amb un rendiment excepcional en tasques multitarea i aplicacions que requereixen alta capacitat de càlcul.</li> 
                            <li>Ideal per a jocs exigents i creació de contingut, com l'edició de vídeo i el disseny gràfic.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 4060 
                        <ul> 
                            <li>Experiència de joc fluida amb configuracions altes en jocs modernes.</li> 
                            <li>Compatible amb tecnologies avançades com Ray Tracing i DLSS per a una millor qualitat visual en jocs i aplicacions creatives.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 32GB DDR4 
                        <ul> 
                            <li>Capacitat per gestionar diverses aplicacions simultàniament sense comprometre el rendiment.</li> 
                            <li>Perfecte per a treballs d'edició de vídeo, disseny gràfic i altres tasques intensives en memòria.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 2TB SSD NVMe 
                        <ul> 
                            <li>Emmagatzematge ultra-ràpid amb temps de càrrega reduïts i una experiència fluida en la gestió d'arxius i aplicacions.</li> 
                            <li>Gran capacitat per emmagatzemar jocs, aplicacions i arxius de gran mida sense preocupar-se per l'espai.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració avançat 
                        <ul> 
                            <li>Manteniment de temperatures baixes fins i tot sota càrregues de treball elevades, com ara jocs en 4K i edició de contingut intensiva.</li> 
                            <li>Disseny eficient que minimitza el soroll, oferint una experiència de treball més còmoda.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2, HDMI 2.1, Ethernet 
                        <ul> 
                            <li>Connexió d'alta velocitat per a jocs en línia, streaming de contingut i tasques de xarxa intensives.</li> 
                            <li>Múltiples ports per connectar dispositius perifèrics i altres accessoris externs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                        <ul> 
                            <li>Experiència d'usuari moderna, intuïtiva i optimitzada per a un millor rendiment i seguretat.</li> 
                            <li>Compatible amb una àmplia gamma d'aplicacions i eines per a treballs professionals i d'oci.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre13.jpg';
        } else if (productId === 'torre14') {
            productTitle.innerText = 'Apple Mac Pro M2 Ultra/64GB/1TB SSD/60 Núclis';
            productDescription.innerHTML = `
                L'<strong>Apple Mac Pro M2 Ultra</strong> és un ordinador de sobretaula ultra-potent, ideal per a professionals que necessiten el màxim rendiment en tasques creatives, desenvolupament de software, edició de vídeo 8K i altres aplicacions intensives. Equipat amb el potent <strong>processador Apple M2 Ultra</strong> i una GPU amb <strong>60 nuclis</strong>, aquest ordinador està dissenyat per a tasques de computació d'alta demanda. Amb <strong>64GB de RAM</strong> i <strong>1TB SSD</strong>, l'Apple Mac Pro ofereix una capacitat d'emmagatzematge ràpida i abundant per a totes les teves dades i projectes creatius.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li> <strong>Processador:</strong> Apple M2 Ultra (Més de 20 nuclis de CPU) 
                        <ul> 
                            <li>Processador extremadament potent per gestionar tasques d'alta demanda i aplicacions que requereixen una potència de càlcul molt alta.</li> 
                            <li>Ideal per a creació de contingut professional, simulacions complexes i altres aplicacions que necessiten rendiment d'última generació.</li> 
                        </ul>   
                    </li> 
                    <li> <strong>GPU:</strong> Apple M2 Ultra amb 60 nuclis GPU 
                        <ul> 
                            <li>Rendiment gràfic avançat per a jocs, renderització 3D i edició de vídeo professional.</li> 
                            <li>Potència gràfica per a aplicacions de disseny, producció de pel·lícules i altres projectes creatius amb necessitats visuals elevades.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 64GB Unified Memory 
                        <ul> 
                            <li>Una gran quantitat de memòria per a una multitarea fluïda i el treball amb aplicacions que consumeixen molts recursos.</li> 
                            <li>Perfecte per a tasques de producció de vídeo, disseny gràfic i altres processos d'alta intensitat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 1TB SSD 
                        <ul> 
                            <li>Emmagatzematge ultraràpid per a una càrrega de dades ràpida i un accés instantani als arxius.</li> 
                            <li>Suficient capacitat per emmagatzemar projectes de gran mida, com vídeos en alta resolució, arxius de disseny i aplicacions exigents.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració avançat 
                        <ul> 
                            <li>Dispositiu dissenyat per mantenir temperatures baixes fins i tot sota càrregues extremes de treball.</li> 
                            <li>Garantint un funcionament òptim sense preocupacions per l'escalfament.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.0, USB-C, Ethernet, Thunderbolt 
                        <ul>    
                            <li>Connexions ràpides i estables per treballar en xarxa, transferir grans arxius i fer streaming de contingut.</li> 
                            <li>Ports per connectar perifèrics d'alta velocitat i dispositius d'emmagatzematge externs.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> macOS 
                        <ul> 
                            <li>Experiència d'usuari fluïda, segura i intuïtiva amb macOS, optimitzat per als components de hardware d'Apple.</li> 
                            <li>Compatible amb tota la gamma d'aplicacions professionals d'Apple i altres eines de programari populars per a creatius i desenvolupadors.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre14.jpg';
        } else if (productId === 'torre15') {
            productTitle.innerText = 'Epical-Q Premsa Evo Intel Core Ultra 9 285KF/128GB/4TB SSD/RTX 5080';
            productDescription.innerHTML = `
                Un ordinador de sobretaula d'alt rendiment dissenyat per a professionals i creadors de contingut que requereixen la màxima potència i eficiència. Equipat amb el processador <strong>Intel Core Ultra 9 285KF</strong> i la potent <strong>NVIDIA GeForce RTX 5080</strong>, aquest sistema ofereix un rendiment excepcional en edició de vídeo 8K, renderització 3D, simulacions complexes i jocs de nova generació. Amb <strong>128GB de RAM</strong> i <strong>4TB SSD</strong>, proporciona una experiència fluida i espai més que suficient per a projectes de gran envergadura.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Processador:</strong> Intel Core Ultra 9 285KF 
                        <ul> 
                            <li>Arquitectura d'última generació amb un alt nombre de nuclis per oferir el màxim rendiment en tasques multitarea i aplicacions professionals.</li> 
                            <li>Ideal per a creació de contingut, desenvolupament de software i aplicacions d'intel·ligència artificial.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 5080 
                        <ul> 
                            <li>Rendiment gràfic de nova generació per a jocs en 4K, simulacions avançades i edició de contingut d'alta qualitat.</li> 
                            <li>Compatible amb Ray Tracing i DLSS per oferir imatges hiperrealistes i una experiència de joc fluida.</li> 
                        </ul> 
                    </li> 
                        <li> <strong>Memòria RAM:</strong> 128GB DDR5 
                            <ul> 
                                <li>Una capacitat massiva de memòria per gestionar projectes grans i múltiples aplicacions al mateix temps.</li> 
                                <li>Especialment dissenyat per a professionals que treballen amb programari d'edició de vídeo, renderització i ciència de dades.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 4TB SSD NVMe 
                        <ul> 
                            <li>Emmagatzematge ultra-ràpid per accés immediat als arxius i càrregues de programari sense retards.</li> 
                            <li>Espai suficient per emmagatzemar arxius de vídeo en alta resolució, bases de dades i aplicacions d'alt rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració líquida d'alt rendiment 
                        <ul> 
                            <li>Manté el sistema fresc fins i tot sota càrregues de treball extremes.</li> 
                            <li>Disseny eficient que redueix el soroll i millora la dissipació de calor.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 4.0, HDMI 2.1, Ethernet 10Gbps 
                        <ul> 
                            <li>Connexió d'alta velocitat per a tasques en línia, streaming i transferència de dades.</li> 
                            <li>Compatible amb els últims perifèrics i tecnologies per a una experiència d'usuari avançada.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Pro 
                        <ul> 
                            <li>Plataforma optimitzada per a la productivitat i la seguretat.</li> 
                            <li>Compatible amb eines professionals i aplicacions de treball col·laboratiu.</li> 
                        </ul> 
                    </li> 
                </ul>
            `;
            productImage.src = 'img/torres/torre15.jpg';
        } else if (productId === 'torre16') {
            productTitle.innerText = 'Epical-Q Hangok AMD Ryzen 9 7950X3D/64GB/2TB SSD/RTX 5080';
            productDescription.innerHTML = `
                Un ordinador de sobretaula d'alt rendiment, ideal per a gamers exigents, creadors de contingut i professionals que necessiten la màxima potència. Equipat amb el potent <strong>AMD Ryzen 9 7950X3D</strong> i la revolucionària <strong>NVIDIA GeForce RTX 5080</strong>, aquest PC està dissenyat per oferir una experiència de joc immersiva i un rendiment òptim en aplicacions creatives. Amb <strong>64GB de RAM</strong> i <strong>2TB SSD</strong>, garanteix velocitat, fluïdesa i espai suficient per a tots els teus projectes i jocs.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> AMD Ryzen 9 7950X3D (16 nuclis, fins a 5,7 GHz) 
                        <ul> 
                            <li>Processador d'última generació amb tecnologia 3D V-Cache per a un rendiment excepcional en gaming i creació de contingut.</li> 
                            <li>Perfecte per a aplicacions que requereixen molta potència de càlcul, com edició de vídeo 4K, modelatge 3D i streaming.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 5080 
                        <ul> 
                            <li>Potent targeta gràfica per jugar a 4K amb configuracions ultra i frame rates elevats.</li> 
                            <li>Compatible amb Ray Tracing i DLSS per millorar la qualitat visual i el rendiment en jocs de nova generació.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 64GB DDR5 
                        <ul> 
                            <li>Gran capacitat per gestionar tasques intensives en memòria, com simulacions, edició de vídeo professional i gaming extrem.</li> 
                            <li>Memòria d'alta velocitat per garantir fluïdesa i temps de resposta mínims en qualsevol situació.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 2TB SSD NVMe Gen4 
                        <ul> 
                            <li>Unitat d'emmagatzematge ultraràpida per temps de càrrega reduïts i accés instantani a arxius i aplicacions.</li> 
                            <li>Ample espai per emmagatzemar jocs, projectes multimèdia i aplicacions professionals sense preocupacions.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració líquida d'alt rendiment 
                        <ul> 
                            <li>Manté temperatures òptimes fins i tot sota càrrega màxima, assegurant estabilitat i durabilitat.</li> 
                            <li>Funcionament silenciós i eficient per a una experiència de treball i joc més agradable.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 4.0, HDMI 2.1, Ethernet 2.5Gb 
                        <ul> 
                            <li>Connexions d'última generació per a una experiència en línia sense latències i transferències de dades ultra ràpides.</li> 
                            <li>Múltiples ports per connectar perifèrics i dispositius d'alta velocitat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Pro 
                        <ul> 
                            <li>Interfície moderna, optimitzada per a treballar amb hardware d'alta gamma i millores de seguretat avançades.</li> 
                            <li>Compatible amb una àmplia gamma de programari per a gaming, creació de contingut i productivitat.</li> 
                        </ul> 
                    </li> 
                </ul>
        `;
            productImage.src = 'img/torres/torre16.jpg';
        } else if (productId === 'torre17') {
            productTitle.innerText = 'Epical-Q Isiux AMD Ryzen 9 9950X / 64GB / 2TB SSD NVMe / RTX 5080 + W11 Pro';
            productDescription.innerHTML = `
                Un ordinador de sobretaula d'alt rendiment, dissenyat per a gamers, creadors de contingut i professionals que necessiten una potència extrema. Equipat amb el revolucionari <strong>AMD Ryzen 9 9950X</strong> i la potent <strong>NVIDIA GeForce RTX 5080</strong>, aquest equip ofereix una experiència de joc i treball sense precedents. Amb <strong>64GB de RAM</strong> i un ràpid <strong>2TB SSD NVMe</strong>, proporciona velocitat, fluïdesa i espai suficient per a qualsevol aplicació exigent. A més, inclou <strong>Windows 11 Pro</strong> per a una experiència optimitzada i professional.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> AMD Ryzen 9 9950X (16 nuclis, fins a 5,8 GHz) 
                        <ul> 
                            <li>Arquitectura de nova generació amb alt rendiment en gaming, edició de vídeo i simulacions complexes.</li> 
                            <li>Perfecte per a aplicacions que requereixen molta potència de càlcul, com renderització 3D i desenvolupament de software.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 5080 
                        <ul> 
                            <li>Gràfics d'última generació per a jocs en 4K amb configuracions ultra i frame rates elevats.</li> 
                            <li>Compatible amb Ray Tracing i DLSS per oferir una qualitat visual i un rendiment inigualable.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 64GB DDR5 
                        <ul> 
                            <li>Gran capacitat per gestionar múltiples aplicacions exigents de manera simultània.</li> 
                            <li>Memòria d'alta velocitat per garantir temps de resposta mínims en qualsevol tasca.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 2TB SSD NVMe Gen4 
                        <ul> 
                            <li>Emmagatzematge ultraràpid per temps de càrrega mínims i accés instantani a arxius i aplicacions.</li> 
                            <li>Espai suficient per a jocs, projectes multimèdia i programari professional sense limitacions.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració líquida d'alt rendiment 
                        <ul> 
                            <li>Control eficient de la temperatura per mantenir el sistema estable fins i tot sota càrrega extrema.</li> 
                            <li>Funcionament silenciós i eficient per a una experiència de treball i joc més agradable.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 4.0, HDMI 2.1, Ethernet 2.5Gb 
                        <ul> 
                            <li>Connexions d'última generació per a una experiència en línia sense latències i transferències de dades ultra ràpides.</li> 
                            <li>Múltiples ports per connectar perifèrics i dispositius d'alta velocitat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Pro 
                        <ul> 
                            <li>Interfície moderna, optimitzada per a treballar amb hardware d'alta gamma i millores de seguretat avançades.</li> 
                            <li>Compatible amb una àmplia gamma d'aplicacions per a gaming, creació de contingut i productivitat.</li> 
                        </ul> 
                    </li> 
                </ul>
        `;
            productImage.src = 'img/torres/torre17.jpg';
        } else if (productId === 'torre18') {
            productTitle.innerText = 'Ultimate Ryzen 7 9800X3D / 64GB / 2TB M.2 / RTX 5080 + W11 Pro';
            productDescription.innerHTML = `
                El <strong>PcCom Ultimate Ryzen 7 9800X3D</strong> és un ordinador de sobretaula de màxima potència, perfecte per a gamers, creadors de contingut i professionals que busquen un rendiment excepcional. Amb el processador <strong>AMD Ryzen 7 9800X3D</strong> i la potent <strong>NVIDIA GeForce RTX 5080</strong>, aquest PC està preparat per oferir una experiència de joc d’última generació i una gran capacitat de treball en tasques creatives. Equipat amb <strong>64GB de RAM</strong> i un ràpid <strong>SSD M.2 de 2TB</strong>, garanteix velocitat, fluïdesa i espai suficient per a qualsevol aplicació exigent. A més, inclou <strong>Windows 11 Pro</strong> per a una experiència professional i optimitzada.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> AMD Ryzen 7 9800X3D (8 nuclis, fins a 5,5 GHz) 
                        <ul> 
                            <li>Arquitectura Zen 5 amb tecnologia 3D V-Cache per a un rendiment inigualable en gaming i creació de contingut.</li> 
                            <li>Ideal per a aplicacions que requereixen potència de càlcul extrema, com edició de vídeo, streaming i desenvolupament de software.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 5080 
                        <ul> 
                            <li>Gràfics de nova generació per a una experiència de joc en 4K amb configuracions ultra i alta taxa de refresc.</li> 
                            <li>Compatible amb tecnologies avançades com Ray Tracing i DLSS per millorar la qualitat visual i el rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 64GB DDR5 
                        <ul> 
                            <li>Gran capacitat de memòria per gestionar múltiples aplicacions exigents de manera simultània.</li> 
                            <li>Memòria d'alta velocitat per garantir temps de resposta mínims en qualsevol situació.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 2TB SSD M.2 NVMe Gen4 
                        <ul> 
                            <li>Unitat d'emmagatzematge ultraràpida per temps de càrrega mínims i accés instantani a arxius i aplicacions.</li> 
                            <li>Espai suficient per emmagatzemar jocs, projectes multimèdia i aplicacions professionals sense limitacions.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració líquida d'alt rendiment 
                        <ul> 
                            <li>Control tèrmic eficient per mantenir temperatures òptimes fins i tot sota càrregues extremes.</li> 
                            <li>Funcionament silenciós i eficient per a una experiència de treball i joc més agradable.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 4.0, HDMI 2.1, Ethernet 2.5Gb 
                        <ul>    
                            <li>Connexions de nova generació per una experiència en línia sense latència i transferències de dades ultra ràpides.</li> 
                            <li>Múltiples ports per connectar perifèrics i dispositius d'alta velocitat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Pro 
                        <ul> 
                            <li>Interfície moderna i optimitzada per a treballar amb hardware d'alta gamma.</li> 
                            <li>Millores de seguretat i compatibilitat amb una àmplia gamma d'aplicacions professionals.</li> 
                        </ul> 
                    </li> 
                </ul>
        `;
            productImage.src = 'img/torres/torre18.jpg';
        } else if (productId === 'torre19') {
            productTitle.innerText = 'Epical-Q Oak9 Protos Intel Core i9 14900KF, 64GB DDR5, 2TB SSD + 2TB, RTX 5080 + W11 Home';
            productDescription.innerHTML = `
                L'<strong>Epical-Q Oak9 Protos</strong> és un ordinador de sobretaula d'alt rendiment, ideal per a gamers, creadors de contingut i professionals que necessiten potència extrema. Equipat amb el processador <strong>Intel Core i9-14900KF</strong> i la potent <strong>NVIDIA GeForce RTX 5080</strong>, aquest equip ofereix un rendiment excel·lent tant en jocs com en aplicacions exigents. Amb <strong>64GB de RAM DDR5</strong> i un sistema d'emmagatzematge combinat de <strong>2TB SSD NVMe + 2TB HDD</strong>, garanteix velocitat i una gran capacitat d'emmagatzematge. Inclou <strong>Windows 11 Home</strong> per oferir una experiència moderna i optimitzada.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> Intel Core i9-14900KF (24 nuclis, fins a 6,0 GHz) 
                        <ul> 
                            <li>Arquitectura híbrida avançada amb 8 nuclis de rendiment i 16 nuclis d'eficiència.</li> 
                            <li>Gran capacitat de càlcul per a tasques exigents com streaming, edició de vídeo i desenvolupament de software.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 5080 
                        <ul> 
                            <li>Rendiment gràfic de nova generació per a una experiència de joc en 4K amb configuracions ultra.</li> 
                            <li>Compatible amb Ray Tracing i DLSS per a una qualitat visual increïble i un rendiment optimitzat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 64GB DDR5 
                        <ul> 
                            <li>Gran capacitat i velocitat per gestionar múltiples aplicacions intensives al mateix temps.</li> 
                            <li>Perfecta per a edició de vídeo, disseny 3D i altres tasques que requereixen molta memòria.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 2TB SSD NVMe + 2TB HDD 
                        <ul> 
                            <li>SSD ultraràpid per temps de càrrega reduïts i un accés immediat a arxius i aplicacions.</li> 
                            <li>HDD de gran capacitat per emmagatzemar una gran quantitat de jocs, projectes i arxius multimèdia.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració líquida avançat 
                        <ul> 
                            <li>Control tèrmic eficient per mantenir temperatures òptimes fins i tot sota càrrega màxima.</li> 
                            <li>Funcionament silenciós per a una experiència més agradable durant sessions prolongades.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 4.0, HDMI 2.1, Ethernet 2.5Gb 
                        <ul> 
                            <li>Connexions d'última generació per a una experiència en línia sense latència i velocitats de transferència ultra ràpides.</li> 
                            <li>Múltiples ports per connectar perifèrics i dispositius d'alta velocitat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Home 
                        <ul> 
                            <li>Interfície moderna i optimitzada per a treballar amb hardware d'alta gamma.</li> 
                            <li>Compatible amb una àmplia gamma d'aplicacions per gaming, creació de contingut i productivitat.</li> 
                        </ul> 
                    </li> 
                </ul>
        `;
            productImage.src = 'img/torres/torre19.jpg';
        } else if (productId === 'torre20') {
            productTitle.innerText = 'Epical-Q Abrams Intel Core i9 14900KF, 64GB, 2TB SSD + 4TB HDD, RTX 5080 + W11 Pro';
            productDescription.innerHTML = `
                L'<strong>Epical-Q Abrams</strong> és un ordinador de sobretaula d'alt rendiment, ideal per a jugadors, creadors de contingut i professionals que necessiten màxima potència. Amb el processador <strong>Intel Core i9-14900KF</strong> i la potent <strong>NVIDIA GeForce RTX 5080</strong>, aquest equip ofereix un rendiment excepcional tant en jocs com en aplicacions exigents. Equipat amb <strong>64GB de RAM DDR5</strong> i un sistema d'emmagatzematge combinat de <strong>2TB SSD NVMe + 4TB HDD</strong>, garanteix velocitat i espai per a tots els teus projectes. Inclou <strong>Windows 11 Pro</strong> per a una experiència professional i optimitzada.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Processador:</strong> Intel Core i9-14900KF (24 nuclis, fins a 6,0 GHz) 
                        <ul> 
                            <li>Arquitectura híbrida avançada amb 8 nuclis de rendiment i 16 nuclis d'eficiència.</li> 
                            <li>Potència ideal per a edició de vídeo, modelatge 3D, streaming i desenvolupament de programari.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Targeta Gràfica:</strong> NVIDIA GeForce RTX 5080 
                        <ul> 
                            <li>Rendiment gràfic de nova generació per a jocs en 4K amb configuracions màximes.</li> 
                            <li>Compatible amb Ray Tracing i DLSS per a una experiència visual superior i un rendiment òptim.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> 64GB DDR5 
                        <ul> 
                            <li>Alta velocitat i gran capacitat per gestionar múltiples tasques exigents simultàniament.</li> 
                            <li>Perfecta per a aplicacions professionals com edició de vídeo, enginyeria i animació 3D.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 2TB SSD NVMe + 4TB HDD 
                        <ul> 
                            <li>SSD d'alta velocitat per temps de càrrega mínims i accés instantani a arxius.</li> 
                            <li>HDD de gran capacitat per emmagatzemar jocs, projectes multimèdia i dades massives.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de refrigeració líquida d'alt rendiment 
                        <ul> 
                            <li>Temperatures òptimes fins i tot sota càrrega extrema.</li> 
                            <li>Funcionament silenciós per a una experiència més agradable i eficient.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 4.0, HDMI 2.1, Ethernet 2.5Gb 
                        <ul> 
                            <li>Connexions de nova generació per una experiència en línia estable i ràpida.</li> 
                            <li>Múltiples ports per connectar perifèrics i dispositius d'alta velocitat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sistema Operatiu:</strong> Windows 11 Pro 
                        <ul> 
                            <li>Interfície moderna i optimitzada per a treballar amb hardware d'última generació.</li> 
                            <li>Funcions avançades de seguretat i compatibilitat amb aplicacions professionals.</li> 
                        </ul> 
                    </li> 
                </ul>
        `;
            productImage.src = 'img/torres/torre20.jpg';
        } else if (productId === 'component1') {
            productTitle.innerText = 'Gigabyte B550M K Rev. 1.0';
            productDescription.innerHTML = `
                La <strong>Gigabyte B550M K Rev. 1.0</strong> és una placa base fiable i rendible, dissenyada per a processadors AMD Ryzen de tercera generació i posteriors. Amb el chipset <strong>AMD B550</strong>, ofereix compatibilitat amb tecnologies modernes com PCIe 4.0 i memòria DDR4 d'alta velocitat. Ideal per a sistemes de joc i treball, proporciona una base sòlida per a configuracions d'alt rendiment.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Socket:</strong> AM4 
                        <ul> 
                            <li>Compatible amb processadors AMD Ryzen de 3a, 4a i 5a generació.</li> 
                            <li>Optimitzada per a una alta eficiència energètica i rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Chipset:</strong> AMD B550 
                        <ul> 
                            <li>Suporta les últimes tecnologies d’AMD per a un rendiment i estabilitat millorats.</li> 
                            <li>Ideal per a gaming i tasques de productivitat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> DDR4 fins a 128GB (4 slots) 
                        <ul> 
                            <li>Compatible amb memòries d'alta velocitat fins a 4400 MHz (OC).</li> 
                            <li>Suporta configuracions Dual-Channel per a un millor rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 1x M.2 NVMe + 4x SATA III 
                        <ul> 
                            <li>Ranura M.2 PCIe 4.0 per a SSDs ultraràpids.</li> 
                            <li>Suport per a discs durs i SSDs SATA per a més capacitat d'emmagatzematge.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Expansió:</strong> PCIe 4.0 x16 + PCIe 3.0 x1 
                        <ul> 
                            <li>Compatibilitat amb targetes gràfiques modernes gràcies a la ranura PCIe 4.0.</li> 
                            <li>Una ranura addicional PCIe 3.0 per a targetes de xarxa, so o altres perifèrics.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Gigabit Ethernet, USB 3.2 Gen1, HDMI, DVI 
                        <ul> 
                            <li>Connexió de xarxa ràpida per a jocs en línia i tasques de treball exigents.</li> 
                            <li>Ports USB d'alta velocitat per a una millor connectivitat de perifèrics.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Àudio:</strong> Sistema d'àudio d'alta definició 
                        <ul> 
                            <li>Chipset d'àudio integrat per a un so clar i envoltant.</li> 
                            <li>Suport per a configuracions d'àudio 7.1.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Format:</strong> Micro-ATX 
                        <ul> 
                            <li>Disseny compacte per a gabinets de mida mitjana i petita.</li> 
                            <li>Ideal per a configuracions de PC d'escriptori amb espai optimitzat.</li> 
                        </ul> 
                    </li> 
                </ul>
        `;
            productImage.src = 'img/components/component1.jpg';
        } else if (productId === 'component2') {
            productTitle.innerText = 'Asus ROG STRIX Z690-A GAMING WIFI D4';
            productDescription.innerHTML = `
                La <strong>Asus ROG STRIX Z690-A GAMING WIFI D4</strong> és una placa base d'alt rendiment dissenyada per a jugadors i entusiastes del hardware. Compatible amb processadors Intel de 12a i 13a generació, aquesta placa incorpora el potent chipset <strong>Intel Z690</strong>, suport per a memòria <strong>DDR4 fins a 5333 MHz (OC)</strong> i les últimes tecnologies de connectivitat com <strong>Wi-Fi 6 i PCIe 5.0</strong>. Amb un disseny gaming premium i característiques avançades, és ideal per a sistemes d'alt rendiment.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Socket:</strong> LGA 1700 
                        <ul> 
                            <li>Compatible amb processadors Intel Core de 12a i 13a generació.</li> 
                            <li>Preparada per a overclocking i màxim rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Chipset:</strong> Intel Z690 
                        <ul> 
                            <li>Suport per a PCIe 5.0, garantint velocitats de transferència ultra ràpides.</li> 
                            <li>Perfecta per a sistemes gaming i de creació de contingut.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> DDR4 fins a 128GB (4 slots) 
                        <ul> 
                            <li>Compatible amb memòries d'alta velocitat fins a 5333 MHz (OC).</li> 
                            <li>Suport per a arquitectura Dual-Channel per a millor rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 4x M.2 NVMe + 6x SATA III 
                        <ul> 
                            <li>Ranures M.2 amb dissipadors per evitar l'escalfament i maximitzar la velocitat.</li> 
                            <li>Compatibilitat amb discs SSD PCIe 4.0 i 3.0.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Expansió:</strong> PCIe 5.0 x16 + PCIe 3.0 x16 + PCIe 3.0 x1 
                        <ul> 
                            <li>Ranura principal PCIe 5.0 per a targetes gràfiques de nova generació.</li> 
                            <li>Suport per a configuracions multi-GPU.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6, Bluetooth 5.2, USB 3.2 Gen2x2, Ethernet 2.5Gb 
                        <ul> 
                            <li>Wi-Fi 6 i Ethernet 2.5Gb per a connexions ràpides i estables.</li> 
                            <li>Ports USB d'alta velocitat, incloent USB-C 3.2 Gen2x2.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Àudio:</strong> ROG SupremeFX 7.1 
                        <ul> 
                            <li>Àudio d'alta definició amb components premium.</li> 
                            <li>Compatibilitat amb tecnologies de so envoltant.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Il·luminació RGB:</strong> ASUS Aura Sync 
                        <ul> 
                            <li>Personalització total amb sincronització RGB amb altres components ASUS.</li> 
                            <li>Compatibilitat amb bandes LED RGB i ARGB.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Format:</strong> ATX 
                        <ul> 
                            <li>Disseny estàndard compatible amb la majoria de caixes gaming.</li> 
                            <li>Ideal per a configuracions d’alt rendiment.</li> 
                        </ul> 
                    </li> 
                </ul>   
        `;
            productImage.src = 'img/components/component2.jpg';
        } else if (productId === 'component3') {
            productTitle.innerText = 'Placa Base GIGABYTE X870 A ELITE WIF7 ICE';
            productDescription.innerHTML = `
                La <strong>GIGABYTE X870 AORUS ELITE WIFI7 ICE</strong> és una placa base d'alt rendiment dissenyada per a jugadors i creadors de contingut que busquen la millor tecnologia i connectivitat. Equipada amb el socket <strong>AM5</strong> i el chipset <strong>X870</strong>, és compatible amb processadors AMD Ryzen de les sèries 7000, 8000 i 9000. A més, ofereix suport per a memòria <strong>DDR5</strong>, connectivitat <strong>Wi-Fi 7</strong> i un disseny en color blanc que destaca en qualsevol muntatge gaming.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Socket:</strong> AM5 (LGA 1718) 
                        <ul> 
                            <li>Compatible amb processadors AMD Ryzen de les sèries 7000, 8000 i 9000.</li> 
                            <li>Plataforma preparada per a futurs llançaments d'AMD.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Chipset:</strong> AMD X870 
                        <ul> 
                            <li>Compatibilitat amb les últimes tecnologies de connectivitat i expansió.</li> 
                            <li>Suport per a PCIe 5.0 per a gràfiques i emmagatzematge d'alta velocitat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria RAM:</strong> DDR5 fins a 256GB (4 slots) 
                        <ul> 
                            <li>Suport per a memòries DDR5 d'alta velocitat amb tecnologia AMD EXPO™.</li> 
                            <li>Arquitectura Dual-Channel per a un millor rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 4x M.2 NVMe + 4x SATA III 
                        <ul> 
                            <li>Compatibilitat amb SSDs PCIe 5.0 i 4.0 per a velocitats extremes.</li> 
                            <li>Ranures M.2 amb dissipadors per evitar l'escalfament i maximitzar el rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Expansió:</strong> PCIe 5.0 x16 + PCIe 4.0 x16 + PCIe 3.0 x1 
                        <ul> 
                            <li>Ranura principal PCIe 5.0 per a targetes gràfiques d'última generació.</li> 
                            <li>Compatibilitat amb configuracions multi-GPU.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 7, Bluetooth 5.3, USB 4.0, Ethernet 2.5Gb 
                        <ul> 
                            <li>Wi-Fi 7 per a connexions sense fils ultra ràpides i estables.</li> 
                            <li>Ports USB 4.0 de fins a 40Gb/s per a perifèrics d'alta velocitat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Àudio:</strong> AMP-UP Audio amb condensadors d'alta qualitat 
                        <ul> 
                            <li>Àudio d'alta definició amb tecnologies de so envoltant.</li> 
                            <li>Compatibilitat amb altaveus i auriculars de gamma alta.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Il·luminació RGB:</strong> RGB FUSION 
                        <ul> 
                            <li>Il·luminació personalitzable amb compatibilitat per a bandes LED RGB i ARGB.</li> 
                            <li>Sincronització amb altres components GIGABYTE per a un sistema unificat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Disseny orientat al bricolatge:</strong> EZ-Latch 
                        <ul> 
                            <li>M.2 EZ-Latch i PCIe EZ-Latch per a una instal·lació més senzilla.</li> 
                            <li>Facilita el muntatge i les actualitzacions del sistema.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Format:</strong> ATX 
                        <ul> 
                            <li>Disseny compatible amb la majoria de caixes de torre estàndard.</li> 
                            <li>Ideal per a sistemes d’alt rendiment amb múltiples components.</li> 
                        </ul> 
                    </li> 
                </ul>
        `;
            productImage.src = 'img/components/component3.jpg';
        } else if (productId === 'component4') {
            productTitle.innerText = 'MSI B650 GAMING PLUS WIFI';
            productDescription.innerHTML = `
                La <strong>MSI B650 GAMING PLUS WIFI</strong> és una placa base d'alt rendiment dissenyada per a jugadors i entusiastes que busquen les últimes tecnologies i una connectivitat robusta. Equipada amb el socket <strong>AM5</strong> i el chipset <strong>B650</strong>, és compatible amb processadors AMD Ryzen de les sèries 7000, 8000 i 9000. A més, ofereix suport per a memòria <strong>DDR5</strong>, connectivitat <strong>Wi-Fi 6E</strong> i un disseny que s'adapta perfectament a configuracions gaming modernes.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>Socket:</strong> AM5 (LGA 1718) 
                        <ul> 
                            <li>Compatible amb processadors AMD Ryzen de les sèries 7000, 8000 i 9000.</li> 
                            <li>Plataforma preparada per a futurs llançaments d'AMD.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Chipset:</strong> AMD B650 
                        <ul> 
                            <li>Compatibilitat amb les últimes tecnologies de connectivitat i expansió.</li> 
                            <li>Suport per a PCIe 4.0 per a gràfiques i emmagatzematge d'alta velocitat.</li> 
                        </ul>   
                    </li> 
                    <li> <strong>Memòria RAM:</strong> DDR5 fins a 192GB (4 slots) 
                        <ul> 
                            <li>Suport per a memòries DDR5 d'alta velocitat amb tecnologia AMD EXPO™.</li> 
                            <li>Arquitectura Dual-Channel per a un millor rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Emmagatzematge:</strong> 2x M.2 NVMe + 4x SATA III 
                        <ul> 
                            <li>Compatibilitat amb SSDs PCIe 4.0 per a velocitats extremes.</li> 
                            <li>Ranures M.2 amb dissipadors per evitar l'escalfament i maximitzar el rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Expansió:</strong> PCIe 4.0 x16 + PCIe 4.0 x4 + PCIe 3.0 x1 
                        <ul> 
                            <li>Ranura principal PCIe 4.0 per a targetes gràfiques d'última generació.</li> 
                            <li>Compatibilitat amb configuracions multi-GPU.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Connectivitat:</strong> Wi-Fi 6E, Bluetooth 5.3, USB 3.2 Gen 2x2, Ethernet 2.5Gb 
                        <ul> 
                            <li>Wi-Fi 6E per a connexions sense fils ultra ràpides i estables.</li> 
                            <li>Ports USB 3.2 Gen 2x2 de fins a 20Gbps per a perifèrics d'alta velocitat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Àudio:</strong> Realtek ALC897 Codec amb àudio d'alta definició 
                        <ul> 
                            <li>Àudio d'alta definició amb tecnologies de so envoltant.</li> 
                            <li>Compatibilitat amb altaveus i auriculars de gamma alta.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Il·luminació RGB:</strong> Mystic Light 
                        <ul> 
                            <li>Il·luminació personalitzable amb compatibilitat per a bandes LED RGB i ARGB.</li> 
                            <li>Sincronització amb altres components MSI per a un sistema unificat.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Disseny orientat al bricolatge:</strong> EZ-Latch 
                        <ul> 
                            <li>M.2 EZ-Latch per a una instal·lació més senzilla.</li> 
                            <li>Facilita el muntatge i les actualitzacions del sistema.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Format:</strong> ATX 
                        <ul> 
                            <li>Disseny compatible amb la majoria de caixes de torre estàndard.</li> 
                            <li>Ideal per a sistemes d’alt rendiment amb múltiples components.</li> 
                        </ul> 
                    </li> 
                </ul>

        `;
            productImage.src = 'img/components/component4.jpg';
        } else if (productId === 'component5') {
            productTitle.innerText = 'MSI GeForce RTX 4060 VENTUS 2X BLACK OC 8GB GDDR6 DLSS3';
            productDescription.innerHTML = `
                La <strong>MSI GeForce RTX 4060 VENTUS 2X BLACK OC 8GB GDDR6 DLSS3</strong> és una targeta gràfica de nova generació dissenyada per oferir un rendiment excel·lent en jocs a 1080p, aprofitant les últimes tecnologies de NVIDIA com el <strong>DLSS 3</strong> i l'arquitectura <strong>Ada Lovelace</strong>. Amb un disseny compacte de doble ventilador i overclock de fàbrica, garanteix frescor i potència per a sessions de joc prolongades.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>GPU:</strong> NVIDIA GeForce RTX 4060 
                        <ul> 
                            <li>Basada en l'arquitectura Ada Lovelace de NVIDIA.</li> 
                            <li>Ideal per a gaming en 1080p amb altes taxes de refresc.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria:</strong> 8GB GDDR6 
                        <ul> 
                            <li>Memòria ràpida i eficient per gestionar textures i escenes complexes.</li> 
                            <li>Interfície de memòria de 128 bits.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Freqüència:</strong> OC Edition 
                        <ul> 
                            <li>Augment de freqüència respecte a la versió estàndard per a millor rendiment.</li> 
                            <li>Optimitzada per a un funcionament estable i potent.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Tecnologies destacades:</strong> DLSS 3, Ray Tracing, NVIDIA Reflex 
                        <ul> 
                            <li>DLSS 3 per a millorar el rendiment i la qualitat gràfica mitjançant IA.</li> 
                            <li>Ray Tracing per a efectes de llum i ombres realistes.</li> 
                            <li>NVIDIA Reflex per a una latència ultra baixa.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Doble ventilador VENTUS 2X 
                        <ul> 
                            <li>Disseny compacte amb dos ventiladors per a una dissipació eficient.</li> 
                            <li>Tecnologia TORX Fan 4.0 per a més flux d'aire i menys soroll.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sortides de vídeo:</strong> 
                        <ul> 
                            <li>3x DisplayPort 1.4a.</li> 
                            <li>1x HDMI 2.1a.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Resolució màxima digital:</strong> 7680x4320 (8K).</li>
                    <li> <strong>Consum:</strong> 115W 
                        <ul> 
                            <li>Es recomana una font d'alimentació mínima de 550W.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Dimensions:</strong> 199 x 120 x 41 mm 
                        <ul> 
                            <li>Disseny compacte, ideal per a caixes de mida mitjana o reduïda.</li> 
                        </ul> 
                    </li> 
                </ul>
        `;
            productImage.src = 'img/components/component5.jpg';
        } else if (productId === 'component6') {
            productTitle.innerText = 'AsRock Challenger D AMD Radeon RX 6600 8 GB GDDR6';
            productDescription.innerHTML = `
                La <strong>AsRock Challenger D AMD Radeon RX 6600 8GB GDDR6</strong> és una targeta gràfica eficient i potent per a jugar a 1080p amb altes prestacions. Basada en l'arquitectura <strong>RDNA 2</strong> d'AMD, ofereix un gran rendiment en títols moderns amb baix consum energètic i una refrigeració silenciosa gràcies al seu disseny de doble ventilador.

            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>GPU:</strong> AMD Radeon RX 6600 
                        <ul> 
                            <li>Arquitectura RDNA 2 per a un rendiment optimitzat i eficiència energètica.</li> 
                            <li>Ideal per a gaming a 1080p amb configuracions altes.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria:</strong> 8GB GDDR6 
                        <ul> 
                            <li>Ample de banda elevat per gestionar textures i jocs exigents.</li> 
                            <li>Interfície de memòria de 128 bits.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Freqüència:</strong> 
                        <ul> 
                            <li>Fins a 2491 MHz en mode Boost.</li> 
                            <li>Rendiment estable i fiable en llargues sessions de joc.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Tecnologies destacades:</strong> AMD FidelityFX Super Resolution (FSR), Radeon Anti-Lag, Radeon Boost 
                        <ul> 
                            <li>FSR per millorar el rendiment i la qualitat visual.</li> 
                            <li>Reducció de latència i optimització automàtica del rendiment.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Challenger D Dual Fan 
                        <ul> 
                            <li>Doble ventilador amb dissipador d'alumini per a una refrigeració eficient.</li> 
                            <li>Funcionament silenciós fins i tot sota càrrega.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sortides de vídeo:</strong> 
                        <ul> 
                            <li>3x DisplayPort 1.4.</li> 
                            <li>1x HDMI 2.1.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Resolució màxima digital:</strong> 7680x4320 (8K).</li>
                    <li> <strong>Consum:</strong> 132W 
                        <ul> 
                            <li>Es recomana una font d'alimentació mínima de 500W.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Dimensions:</strong> 269 x 132 x 41 mm 
                        <ul> 
                            <li>Format compacte per a facilitar la compatibilitat amb caixes ATX i mATX.</li> 
                        </ul> 
                    </li> 
                </ul>
        `;
            productImage.src = 'img/components/component6.jpg';
        } else if (productId === 'component7') {
            productTitle.innerText = 'Gigabyte GeForce RTX 3060 WINDFORCE OC 12GB GDDR6 Rev 2';
            productDescription.innerHTML = `
                La <strong>Gigabyte GeForce RTX 3060 WINDFORCE OC 12GB GDDR6 Rev 2</strong> és una targeta gràfica potent dissenyada per oferir una excel·lent experiència de joc a 1080p i 1440p. Basada en l'arquitectura <strong>NVIDIA Ampere</strong>, incorpora nuclis RT de segona generació i nuclis Tensor de tercera generació per millor
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>GPU:</strong> NVIDIA GeForce RTX 3060 
                        <ul> 
                            <li>Arquitectura Ampere amb millor eficiència i rendiment.</li> 
                            <li>Ideal per a jocs moderns a 1080p i 1440p amb altes configuracions.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria:</strong> 12GB GDDR6 
                        <ul> 
                            <li>Gran capacitat per gestionar textures d'alta resolució.</li> 
                            <li>Interfície de memòria de 192 bits.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Freqüència:</strong> 
                        <ul> 
                            <li>Boost Clock de fins a 1837 MHz (OC).</li> 
                            <li>Rendiment òptim amb estabilitat garantida.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Tecnologies destacades:</strong> Ray Tracing, DLSS, NVIDIA Reflex, NVIDIA Broadcast 
                        <ul> 
                            <li>DLSS per millorar els FPS mantenint alta qualitat gràfica.</li> 
                            <li>Ray Tracing per a una il·luminació i ombres realistes.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> WINDFORCE 2X 
                        <ul> 
                            <li>Dues ventiladors de 90 mm amb gir altern per millorar el flux d'aire.</li> 
                            <li>Dissipador amb heatpipes de coure i placa de reforç posterior.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sortides de vídeo:</strong> 
                        <ul> 
                            <li>2x HDMI 2.1.</li> 
                            <li>2x DisplayPort 1.4a.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Resolució màxima digital:</strong> 7680x4320 (8K).</li>
                    <li> <strong>Consum:</strong> 170W 
                        <ul> 
                            <li>Es recomana una font d'alimentació mínima de 550W.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Dimensions:</strong> 282 x 117 x 41 mm 
                        <ul> 
                            <li>Compatible amb la majoria de caixes ATX.</li> 
                        </ul> 
                    </li> 
                </ul>
        `;
            productImage.src = 'img/components/component7.jpg';
        } else if (productId === 'component8') {
            productTitle.innerText = 'XFX AMD RADEON RX 7900GRE 16GB GDDR6';
            productDescription.innerHTML = `
                La <strong>XFX AMD RADEON RX 7900 GRE 16GB GDDR6</strong> és una targeta gràfica d'alt rendiment dissenyada per oferir una experiència excepcional en jocs a resolucions 1440p i 4K. Basada en l'arquitectura <strong>AMD RDNA 3</strong>, combina potència, eficiència i tecnologia avançada per satisfer les necessitats dels jugadors més exigents.
            `;
            productCharacteristics.innerHTML = `
                <ul> 
                    <li> <strong>GPU:</strong> AMD Radeon RX 7900 GRE 
                        <ul> 
                            <li>Arquitectura RDNA 3 per a més rendiment i eficiència energètica.</li> 
                            <li>Ideal per a jocs exigents a 1440p i experiències fluides en 4K.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Memòria:</strong> 16GB GDDR6 
                        <ul> 
                            <li>Ample de banda elevat per a càrregues de treball intensives.</li> 
                            <li>Interfície de memòria de 256 bits per a transferències ràpides.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Freqüència:</strong> 
                        <ul> 
                            <li>Fins a 2245 MHz en Boost Clock.</li> 
                            <li>Rendiment constant i estable en llargues sessions de joc.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Tecnologies destacades:</strong> AMD FSR, Ray Tracing, AMD Radeon Super Resolution 
                        <ul> 
                            <li>AMD FSR per millorar els FPS amb qualitat d'imatge optimitzada.</li> 
                            <li>Ray Tracing per a efectes de llum i ombres més realistes.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Refrigeració:</strong> Sistema de triple ventilador 
                        <ul> 
                            <li>Dissenyat per mantenir baixes temperatures fins i tot sota càrrega intensa.</li> 
                            <li>Funcionament silenciós i eficient.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Sortides de vídeo:</strong> 
                        <ul> 
                            <li>1x HDMI 2.1.</li> 
                            <li>3x DisplayPort 2.1.</li> 
                        </ul> 
                    </li> 
                    <li> <strong>Resolució màxima digital:</strong> 7680x4320 (8K).</li>
                    <li> <strong>Consum:</strong> 260W 
                        <ul> 
                            <li>Es recomana una font d'alimentació mínima de 700W.</li> 
                        </ul> 
                    </li>   
                    <li> <strong>Dimensions:</strong> Depenent del model específic XFX 
                        <ul> 
                            <li>Verificar compatibilitat amb la caixa abans del muntatge.</li> 
                        </ul> 
                    </li> 
                </ul>
        `;
            productImage.src = 'img/components/component8.jpg';
        } else if (productId === 'component9') {
            productTitle.innerText = '';
            productDescription.innerHTML = `
                El <strong>AMD Ryzen 7 9800X3D</strong> és un processador d'alt rendiment dissenyat per a jugadors i creadors que volen el màxim rendiment amb la tecnologia més avançada. Amb una arquitectura optimitzada i la tecnologia 3D V-Cache, ofereix velocitats increïbles i una eficiència energètica excepcional.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Arquitectura:</strong> Zen 5
                        <ul>
                            <li>Disseny millorat per oferir més eficiència i potència.</li>
                            <li>Millores en IPC (Instructions Per Cycle) respecte a generacions anteriors.</li>
                        </ul>
                    </li>
                    <li><strong>Nuclis i Fils:</strong> 8 nuclis / 16 fils
                        <ul>
                            <li>Ideal per a jocs exigents i treballs de creació de contingut.</li>
                            <li>Multitasca fluida gràcies a l'elevat nombre de fils.</li>
                        </ul>
                    </li>
                    <li><strong>Freqüència:</strong> 4.7GHz base / 5.2GHz turbo
                        <ul>
                            <li>Alt rendiment en aplicacions que requereixen velocitats elevades.</li>
                            <li>Tecnologia Precision Boost per optimitzar la potència segons la càrrega.</li>
                        </ul>
                    </li>
                    <li><strong>Memòria cau:</strong> 3D V-Cache amb 96MB
                        <ul>
                            <li>Millora el rendiment en jocs i aplicacions pesades.</li>
                            <li>Temps de resposta més ràpids gràcies a la gran quantitat de memòria cau.</li>
                        </ul>
                    </li>
                    <li><strong>Compatibilitat:</strong> Socket AM5
                        <ul>
                            <li>Compatible amb plaques base amb chipset de la sèrie 600.</li>
                            <li>Suport per memòries DDR5 d'alta velocitat.</li>
                        </ul>
                    </li>
                    <li><strong>Consum energètic:</strong> 120W TDP
                        <ul>
                            <li>Optimitzat per mantenir un bon equilibri entre potència i consum.</li>
                        </ul>
                    </li>
                    <li><strong>Gràfics integrats:</strong> No
                        <ul>
                            <li>Requereix una targeta gràfica dedicada per al seu funcionament.</li>
                        </ul>
                    </li>
                    <li><strong>Aplicacions recomanades:</strong>
                        <ul>
                            <li>Gaming d'alt nivell amb FPS estables i altes resolucions.</li>
                            <li>Edició de vídeo i treballs de disseny 3D.</li>
                            <li>Streamings i gravacions sense pèrdua de rendiment.</li>
                        </ul>
                    </li>
                </ul>
        `;
            productImage.src = 'img/components/component9.jpg';
        } else if (productId === 'component10') {
            productTitle.innerText = 'AMD Ryzen 5 7600X 4.7 GHz Box';
            productDescription.innerHTML = `
                El <strong>AMD Ryzen 5 7600X</strong> és un processador ideal per a jugadors i creadors que busquen un gran rendiment a un preu competitiu, basat en la nova arquitectura Zen 4 per aconseguir velocitats i eficiència millorades.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Arquitectura:</strong> Zen 4
                        <ul>
                            <li>Millora significativa en eficiència i rendiment respecte a Zen 3.</li>
                            <li>Optimització per a aplicacions modernes i videojocs exigents.</li>
                        </ul>
                    </li>
                    <li><strong>Nuclis i Fils:</strong> 6 nuclis / 12 fils
                        <ul>
                            <li>Gran rendiment per a gaming i tasques de creació de contingut moderat.</li>
                            <li>Multitasca eficient sense saturar el sistema.</li>
                        </ul>
                    </li>
                    <li><strong>Freqüència:</strong> 4.7GHz base / 5.3GHz turbo
                        <ul>
                            <li>Ideal per a jocs que demanden altes velocitats per frame rates estables.</li>
                            <li>Tecnologia Precision Boost que optimitza la potència segons la càrrega de treball.</li>
                        </ul>
                    </li>
                    <li><strong>Memòria cau:</strong> 38MB total
                        <ul>
                            <li>Millora els temps de càrrega i resposta en jocs i aplicacions.</li>
                        </ul>
                    </li>
                    <li><strong>Compatibilitat:</strong> Socket AM5
                        <ul>
                            <li>Compatible amb les últimes plaques base amb suport DDR5.</li>
                            <li>Preparat per futures actualitzacions i millores.</li>
                        </ul>
                    </li>
                    <li><strong>Consum energètic:</strong> 105W TDP
                        <ul>
                            <li>Bon equilibri entre potència i eficiència.</li>
                        </ul>
                    </li>
                    <li><strong>Gràfics integrats:</strong> AMD Radeon Graphics
                        <ul>
                            <li>Permet utilitzar el PC sense targeta gràfica dedicada per tasques bàsiques.</li>
                        </ul>
                    </li>
                    <li><strong>Refrigeració:</strong> No inclou ventilador
                        <ul>
                            <li>Es recomana adquirir un sistema de refrigeració compatible.</li>
                        </ul>
                    </li>
                    <li><strong>Aplicacions recomanades:</strong>
                        <ul>
                            <li>Gaming d'alt rendiment a 1080p i 1440p.</li>
                            <li>Edició fotogràfica i de vídeo a nivell domèstic o semi-professional.</li>
                            <li>Us diari intensiu amb multitarea fluida.</li>
                        </ul>
                    </li>
                </ul>
        `;
            productImage.src = 'img/components/component10.jpg';
        } else if (productId === 'component11') {
            productTitle.innerText = 'Intel Core i5-12400F 2.5 GHz';
            productDescription.innerHTML = `
            El <strong>Intel Core i5-12400F</strong> és un processador d'última generació perfecte per a jugadors i creadors que busquen un equilibri entre rendiment i preu, basat en l'arquitectura Alder Lake.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Arquitectura:</strong> Alder Lake (12a Generació)
                        <ul>
                            <li>Millores d’eficiència i rendiment respecte generacions anteriors.</li>
                            <li>Compatible amb memòria DDR4 i DDR5.</li>
                        </ul>
                    </li>
                    <li><strong>Nuclis i Fils:</strong> 6 nuclis / 12 fils
                        <ul>
                            <li>Excel·lent per a jocs, treball d’oficina i edició de contingut bàsic.</li>
                            <li>Multitasca suau i rendiment fiable en diverses aplicacions.</li>
                        </ul>
                    </li>
                    <li><strong>Freqüència:</strong> 2.5 GHz base / 4.4 GHz turbo
                        <ul>
                            <li>Potència sobrada per a jocs moderns i aplicacions exigents.</li>
                            <li>La tecnologia Intel Turbo Boost incrementa automàticament la velocitat quan cal.</li>
                        </ul>
                    </li>
                    <li><strong>Memòria cau:</strong> 18MB Intel Smart Cache
                        <ul>
                            <li>Millora l'accés ràpid a dades freqüents, optimitzant rendiment.</li>
                        </ul>
                    </li>
                    <li><strong>Compatibilitat:</strong> Socket LGA1700
                        <ul>
                            <li>Compatible amb les plaques base Intel de 600 i 700 Series.</li>
                        </ul>
                    </li>
                    <li><strong>Consum energètic:</strong> 65W TDP
                        <ul>
                            <li>Eficiència energètica per a equips domèstics i professionals.</li>
                        </ul>
                    </li>
                    <li><strong>Gràfics integrats:</strong> No inclou gràfics integrats
                        <ul>
                            <li>Necessita targeta gràfica dedicada obligatòriament.</li>
                        </ul>
                    </li>
                    <li><strong>Refrigeració:</strong> Inclou dissipador estàndard
                        <ul>
                            <li>Apte per ús general, però es recomana un dissipador millor si fas overclock o gaming intensiu.</li>
                        </ul>
                    </li>
                    <li><strong>Aplicacions recomanades:</strong>
                        <ul>
                            <li>Gaming a 1080p amb alt rendiment.</li>
                            <li>Treball d’ofimàtica i ús domèstic exigent.</li>
                            <li>Edició de fotos i vídeo a nivell bàsic.</li>
                        </ul>
                    </li>
                </ul>
        `;
            productImage.src = 'img/components/component11.jpg';
        } else if (productId === 'component12') {
            productTitle.innerText = 'Intel Core i9-14900K 3.2/6GHz Box';
            productDescription.innerHTML = `
                El <strong>Intel Core i9-14900K</strong> és un dels processadors més potents del mercat, ideal per a gamers, creadors de contingut i professionals que busquen el màxim rendiment amb la tecnologia més avançada d'Intel.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Arquitectura:</strong> Raptor Lake Refresh (14a Generació)
                        <ul>
                            <li>Optimitzacions en eficiència i rendiment extrem.</li>
                            <li>Compatible amb memòries DDR4 i DDR5.</li>
                        </ul>
                    </li>
                    <li><strong>Nuclis i Fils:</strong> 24 nuclis (8 Performance + 16 Efficiency) / 32 fils
                        <ul>
                            <li>Rendiment brutal per a multitarea, gaming d'alt nivell i creació de contingut.</li>
                            <li>Separació intel·ligent de tasques entre nuclis per màxima eficàcia.</li>
                        </ul>
                    </li>
                    <li><strong>Freqüència:</strong> 3.2 GHz base / fins a 6.0 GHz amb Turbo Boost Max 3.0
                        <ul>
                            <li>Un dels processadors més ràpids disponibles, ideal per a tasques exigents.</li>
                        </ul>
                    </li>
                    <li><strong>Memòria cau:</strong> 36MB Intel Smart Cache
                        <ul>
                            <li>Accés ultraràpid a dades crítiques per a millorar la resposta del sistema.</li>
                        </ul>
                    </li>
                    <li><strong>Compatibilitat:</strong> Socket LGA1700
                        <ul>
                            <li>Compatible amb plaques base Z690, Z790 i similars.</li>
                        </ul>
                    </li>
                    <li><strong>Consum energètic:</strong> 125W TDP (pot arribar a més sota càrrega màxima)
                        <ul>
                            <li>Requereix una refrigeració avançada per a mantenir temperatures òptimes.</li>
                        </ul>
                    </li>
                    <li><strong>Gràfics integrats:</strong> Intel UHD Graphics 770
                        <ul>
                            <li>Permet ús bàsic sense targeta gràfica dedicada.</li>
                            <li>Tot i això, es recomana GPU dedicada per a gaming o creació de contingut.</li>
                        </ul>
                    </li>
                    <li><strong>Refrigeració:</strong> No inclou dissipador
                        <ul>
                            <li>Imprescindible adquirir un sistema de refrigeració potent (aire o líquida).</li>
                        </ul>
                    </li>
                    <li><strong>Aplicacions recomanades:</strong>
                        <ul>
                            <li>Gaming extrem fins a 4K.</li>
                            <li>Edició de vídeo i renderització 3D professional.</li>
                            <li>Streaming i gravació sense pèrdua de rendiment.</li>
                            <li>Entorns de treball exigents amb múltiples aplicacions simultànies.</li>
                        </ul>
                    </li>
                </ul>
        `;
            productImage.src = 'img/components/component12.jpg';
        } else if (productId === 'component13') {
            productTitle.innerText = 'Forgeon Nimbus PRO Disc SSD 1TB 7400MB/S NVMe PCIe 4.0 M.2 Gen4';
            productDescription.innerHTML = `
                El <strong>Disc Dur Forgeon Nimbus PRO SSD 1TB</strong> és la solució perfecta per a usuaris que busquen un rendiment extrem amb velocitats de transferència ultra-ràpides i una fiabilitat màxima.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Capacitat:</strong> 1TB
                        <ul>
                            <li>Espai ample per a jocs, aplicacions i emmagatzematge de dades pesades.</li>
                        </ul>
                    </li>
                    <li><strong>Velocitat de Lectura:</strong> Fins a 7400 MB/s
                        <ul>
                            <li>Experiència d'usuari excepcional amb velocitats ultra-ràpides per a arrencades, càrrega de jocs i transferència de fitxers.</li>
                        </ul>
                    </li>
                    <li><strong>Interfície:</strong> NVMe PCIe 4.0 M.2 Gen4
                        <ul>
                            <li>Fes servir la tecnologia més recent per a velocitats de transferència de dades màximes.</li>
                        </ul>
                    </li>
                    <li><strong>Factor de forma:</strong> M.2 2280
                        <ul>
                            <li>Perfecte per a la majoria de portàtils i ordinadors de sobretaula moderns amb ranura M.2.</li>
                        </ul>
                    </li>
                    <li><strong>Fiabilitat:</strong> Alta durabilitat amb resistència als canvis de temperatura i una vida útil prolongada.
                        <ul>
                            <li>Ideal per a entorns de treball exigents i per a jocs intensius.</li>
                        </ul>
                    </li>
                    <li><strong>Tecnologia de refrigeració:</strong> Dissipació de calor integrada
                        <ul>
                            <li>Garantitza un rendiment estable fins i tot en els càrrecs de treball més alts.</li>
                        </ul>
                    </li>
                    <li><strong>Compatible amb:</strong> Ordinadors de sobretaula i portàtils amb suport per a NVMe PCIe 4.0 i M.2 Gen4.
                        <ul>
                            <li>Ideal per a sistemes de última generació.</li>
                        </ul>
                    </li>
                    <li><strong>Aplicacions recomanades:</strong>
                        <ul>
                            <li>Arrencada ràpida de sistema operatiu.</li>
                            <li>Jocs de gran exigència.</li>
                            <li>Emmagatzematge de fitxers pesats com vídeos 4K i arxius de treball professionals.</li>
                        </ul>
                    </li>
                </ul>
        `;
            productImage.src = 'img/components/component13.jpg';
        } else if (productId === 'component14') {
            productTitle.innerText = 'Samsung 990 Pro 2TB Disc SSD 7450MB/S NVMe PCIe 4.0 M.2 Gen4';
            productDescription.innerHTML = `
                El <strong>Samsung 990 Pro 2TB SSD</strong> és una de les unitats d'emmagatzematge més potents del mercat, dissenyada per oferir un rendiment superior i durabilitat excepcional.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Capacitat:</strong> 2TB
                        <ul>
                            <li>Ideal per a grans biblioteques de jocs, projectes professionals i arxius multimèdia pesats.</li>
                        </ul>
                    </li>
                    <li><strong>Velocitat de Lectura:</strong> Fins a 7450 MB/s
                        <ul>
                            <li>Temps de càrrega ultra-ràpids per a jocs, aplicacions i arxius de gran grandària.</li>
                        </ul>
                    </li>
                    <li><strong>Velocitat d'Escriptura:</strong> Fins a 6900 MB/s
                        <ul>
                            <li>Transferències de dades eficients i ràpides fins i tot en processos intensius.</li>
                        </ul>
                    </li>
                    <li><strong>Interfície:</strong> NVMe PCIe 4.0 M.2 Gen4
                        <ul>
                            <li>Connectivitat d'última generació per maximitzar el rendiment.</li>
                        </ul>
                    </li>
                    <li><strong>Factor de forma:</strong> M.2 2280
                        <ul>
                            <li>Compatible amb la majoria de sistemes moderns, tant portàtils com de sobretaula.</li>
                        </ul>
                    </li>
                    <li><strong>Eficiència energètica:</strong> Optimitzada
                        <ul>
                            <li>Menor consum amb màxim rendiment, ideal per a llargs períodes d'ús.</li>
                        </ul>
                    </li>
                    <li><strong>Tecnologia de refrigeració:</strong> Sistema avançat de gestió tèrmica
                        <ul>
                            <li>Manté la temperatura sota control per evitar pèrdua de rendiment.</li>
                        </ul>
                    </li>
                    <li><strong>Durabilitat:</strong> Alta resistència amb fins a 1200 TBW (Terabytes Escrits)
                        <ul>
                            <li>Perfecte per a usuaris exigents i professionals creatius.</li>
                        </ul>
                    </li>
                    <li><strong>Aplicacions recomanades:</strong>
                        <ul>
                            <li>Gaming extrem amb càrregues ràpides.</li>
                            <li>Edició de vídeo 4K i renderitzat 3D.</li>
                            <li>Treball intensiu amb grans arxius de dades.</li>
                        </ul>
                    </li>
                </ul>
        `;
            productImage.src = 'img/components/component14.jpg';
        } else if (productId === 'component15') {
            productTitle.innerText = 'WD Black SN770 2TB Disc SSD 5150MB/S NVMe PCIe 4.0 M.2 Gen4';
            productDescription.innerHTML = `
                El <strong>WD Black SN770 2TB SSD</strong> és una excel·lent opció per a jugadors i creadors que busquen velocitat i fiabilitat en el seu sistema.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Capacitat:</strong> 2TB
                        <ul>
                            <li>Espai ampli per a jocs AAA, projectes creatius i arxius multimèdia pesats.</li>
                        </ul>
                    </li>
                    <li><strong>Velocitat de Lectura:</strong> Fins a 5150 MB/s
                        <ul>
                            <li>Carrega jocs i aplicacions de manera ultraràpida per a una experiència fluida.</li>
                        </ul>
                    </li>
                    <li><strong>Velocitat d'Escriptura:</strong> Fins a 4850 MB/s
                        <ul>
                            <li>Transfereix arxius grans i edita contingut multimèdia sense interrupcions.</li>
                        </ul>
                    </li>
                    <li><strong>Interfície:</strong> NVMe PCIe 4.0 M.2 Gen4 16GT/s
                        <ul>
                            <li>Amplada de banda millorada per aprofitar al màxim el teu sistema.</li>
                        </ul>
                    </li>
                    <li><strong>Factor de forma:</strong> M.2 2280
                        <ul>
                            <li>Compatibilitat amb la majoria de plaques base modernes.</li>
                        </ul>
                    </li>
                    <li><strong>Eficiència energètica:</strong> Optimitzada
                        <ul>
                            <li>Menor consum d'energia per a sessions llargues de joc o treball intensiu.</li>
                        </ul>
                    </li>
                    <li><strong>Tecnologia Gaming:</strong> WD_BLACK Dashboard
                        <ul>
                            <li>Monitoritza el rendiment i optimitza l'SSD per obtenir el màxim rendiment durant les partides.</li>
                        </ul>
                    </li>
                    <li><strong>Durabilitat:</strong> Alta resistència per a llargues jornades d'ús
                        <ul>
                            <li>Preparat per suportar escrits intensius al llarg del temps.</li>
                        </ul>
                    </li>
                    <li><strong>Aplicacions recomanades:</strong>
                        <ul>
                            <li>Gaming exigent i competitiu.</li>
                            <li>Edició de contingut multimèdia.</li>
                            <li>Treballs professionals amb grans volums de dades.</li>
                        </ul>
                    </li>
                </ul>
        `;
            productImage.src = 'img/components/component15.jpg';
        } else if (productId === 'component16') {
            productTitle.innerText = 'Kingston NV3 1TB Disc SSD 6000MB/S NVMe PCIe 4.0 M.2 Gen4 2280 3D Nand';
            productDescription.innerHTML = `
                El <strong>Kingston NV3 1TB SSD</strong> ofereix un rendiment excepcional per a usuaris que busquen velocitat i estabilitat en els seus sistemes.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Capacitat:</strong> 1TB
                        <ul>
                            <li>Emmagatzematge ampli per jocs, documents i projectes multimèdia.</li>
                        </ul>
                    </li>
                    <li><strong>Velocitat de Lectura:</strong> Fins a 6000 MB/s
                        <ul>
                            <li>Temps de càrrega ultra ràpids per a programes i sistemes operatius.</li>
                        </ul>
                    </li>
                    <li><strong>Velocitat d'Escriptura:</strong> Fins a 5500 MB/s
                        <ul>
                            <li>Transferències de fitxers grans sense esperes.</li>
                        </ul>
                    </li>
                    <li><strong>Interfície:</strong> NVMe PCIe 4.0 M.2 Gen4 2280
                        <ul>
                            <li>Compatibilitat amb les últimes plaques base i ordinadors moderns.</li>
                        </ul>
                    </li>
                    <li><strong>Tecnologia:</strong> 3D NAND
                        <ul>
                            <li>Durabilitat i eficiència energètica millorades.</li>
                        </ul>
                    </li>
                    <li><strong>Factor de forma:</strong> M.2 2280
                        <ul>
                            <li>Format compacte ideal per a torres i portàtils.</li>
                        </ul>
                    </li>
                    <li><strong>Aplicacions recomanades:</strong>
                        <ul>
                            <li>Gaming de nivell mig-alt.</li>
                            <li>Ús d'oficina i treballs creatius.</li>
                            <li>Actualització de portàtils o PCs antics.</li>
                        </ul>
                    </li>
                </ul>
        `;
            productImage.src = 'img/components/component16.jpg';
        } else if (productId == 'component17') {
            productTitle.innerText = 'Kit de refrigeració Líquida Lian-Li 360mm Blanc';
            productDescription.innerHTML = `
                El <strong>Lian-Li GA II LCD</strong> és un sistema de refrigeració líquida tot en un (AIO) amb un disseny elegant i modern, perfecte per a equips d'alt rendiment. Incorpora una pantalla <strong>LCD personalitzable</strong> per mostrar informació en temps real com la temperatura o logotips personalitzats. `;
            productCharacteristics.innerHTML = `
                <ul>
                    <li><strong>Tipus:</strong> Refrigeració Líquida AIO (All-in-One)
                        <ul>
                            <li>Solució completa de fàcil instal·lació sense manteniment.</li>
                        </ul>
                    </li>
                        <li><strong>Radiador:</strong> 360mm
                            <ul>
                                <li>Gran superfície de dissipació per a un refredament eficient de la CPU.</li>
                            </ul>
                        </li>
                    <li><strong>Ventiladors:</strong> 3x 120mm RGB PWM
                        <ul>
                            <li>Alt rendiment amb il·luminació personalitzable i control intel·ligent de velocitat.</li>
                        </ul>
                    </li>
                    <li><strong>Pantalla:</strong> LCD personalitzable
                        <ul>
                            <li>Mostra informació com temperatura, ús del sistema o logotips personalitzats.</li>
                        </ul>
                    </li>
                    <li><strong>Compatibilitat:</strong> Intel & AMD
                        <ul>
                            <li>Compatible amb una àmplia gamma de sockets actuals de Intel i AMD.</li>
                        </ul>
                    </li>
                    <li><strong>Color:</strong> Blanc
                        <ul>
                            <li>Estètica elegant per a configuracions clares i modernes.</li>
                        </ul>   
                    </li>
                    <li><strong>Aplicacions recomanades:</strong>
                        <ul>
                            <li>Gaming d'alt rendiment.</li>
                            <li>Estacions de treball professionals.</li>
                            <li>Ordinadors personalitzats amb disseny estètic.</li>
                        </ul>
                    </li>
                </ul>   
            `
            productImage.src = 'img/components/component17.jpg';
        } else if (productId === 'component18') {
            productTitle.innerText = 'NZXT Kraken Elite 360 Kit Refrigeració Líquida amb Pantalla';
            productDescription.innerHTML = `
                El <strong>NZXT Kraken Elite 360</strong> és un sistema de refrigeració líquida tot en un (AIO) de gran rendiment amb una pantalla personalitzable, ideal per a gamers i usuaris avançats que busquen màxim rendiment i control total.
            `;
            productCharacteristics.innerHTML = `
                <ul>
                <li><strong>Tipus:</strong> Refrigeració Líquida AIO (All-in-One)
                    <ul>
                        <li>Solució fàcil d'instal·lar, dissenyada per a una refrigeració eficient i sense manteniment.</li>
                    </ul>
                </li>
                <li><strong>Radiador:</strong> 360mm
                    <ul>
                        <li>Gran superfície de dissipació per mantenir la CPU a una temperatura òptima, fins i tot sota càrrega intensa.</li>
                    </ul>
                </li>
                <li><strong>Ventiladors:</strong> 3x 120mm Aer P
                    <ul>
                        <li>Ventiladors d'alt rendiment amb control PWM per ajustar la velocitat segons les necessitats del sistema.</li>
                    </ul>
                </li>
                <li><strong>Pantalla:</strong> Pantalla LCD personalitzable
                    <ul>
                        <li>Mostra informació com la temperatura de la CPU, velocitat dels ventiladors o logotips personalitzats en temps real.</li>
                    </ul>
                </li>
                <li><strong>Compatibilitat:</strong> Intel & AMD
                    <ul>
                        <li>Compatible amb els sockets més recents de processadors Intel i AMD per a un muntatge senzill i ràpid.</li>
                    </ul>
                </li>
                <li><strong>Color:</strong> Negre
                    <ul>
                        <li>Disseny modern i estètic que s'adapta perfectament a qualsevol configuració de PC.</li>
                    </ul>
                </li>
                <li><strong>Aplicacions recomanades:</strong>
                    <ul>
                        <li>Gaming d'alt rendiment.</li>
                        <li>Estacions de treball professionals.</li>
                        <li>Ordinadors personalitzats amb refrigeració òptima i un disseny elegant.</li>
                    </ul>
                </li>
            </ul>
        `;
            productImage.src = 'img/components/component18.jpg';
        } else if (productId == 'component19') {
            productTitle.innerText = 'Corsair iCUE LINK TITAN 240 RX RGB Kit Refrigeració Líquida';
            productDescription.innerHTML = `
                El <strong>Corsair iCUE LINK TITAN 240 RX RGB</strong> és un sistema de refrigeració líquida d’alt rendiment que ofereix una gestió intel·ligent de la temperatura i un espectacular efecte RGB. Gràcies al seu innovador sistema <strong>iCUE LINK</strong>, permet una instal·lació més senzilla i una sincronització perfecta amb la resta de components Corsair.
            `
            productCharacteristics.innerHTML = `
                <ul>
            <li><strong>Tipus:</strong> Refrigeració Líquida AIO (All-in-One)
                <ul>
                    <li>Solució completa per a un refredament eficient sense manteniment.</li>
                </ul>
            </li>
            <li><strong>Radiador:</strong> 240mm
                <ul>
                    <li>Equilibri perfecte entre mida i rendiment per a sistemes de gaming i creació de contingut.</li>
                </ul>
            </li>
            <li><strong>Ventiladors:</strong> 2x 120mm RGB
                <ul>
                    <li>Il·luminació RGB vibrant personalitzable amb el programari iCUE.</li>
                    <li>Funcionament silenciós amb control PWM per ajustar la velocitat automàticament.</li>
                </ul>
            </li>
            <li><strong>Il·luminació:</strong> RGB integrat
                <ul>
                    <li>Sincronització total amb altres components Corsair mitjançant iCUE.</li>
                </ul>
            </li>
            <li><strong>Compatibilitat:</strong> Intel & AMD
                <ul>
                    <li>Compatible amb els últims sockets de CPU d’Intel i AMD per a una integració fàcil.</li>
                </ul>
            </li>
            <li><strong>Tecnologia iCUE LINK:</strong>
                <ul>
                    <li>Sistema d’interconnexió intel·ligent que simplifica el cablejat i millora la gestió tèrmica.</li>
                </ul>
            </li>
            <li><strong>Color:</strong> Negre
                <ul>
                    <li>Estètica elegant per combinar amb qualsevol configuració.</li>
                </ul>
            </li>
            <li><strong>Aplicacions recomanades:</strong>
                <ul>
                    <li>Gaming d’alt rendiment.</li>
                    <li>Edició de vídeo i altres tasques exigents.</li>
                    <li>Configuracions amb il·luminació RGB personalitzable.</li>
                </ul>
            </li>
        </ul>
        `;
            productImage.src = 'img/components/component19.jpg';
        }
        modal.style.display = 'flex';
    }
}

// Función para cerrar el modal
function closeProductModal() {
    const modal = document.getElementById('product-detail-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Inicializar el carrito y el rango de precio al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    updateCartSidebar();
    updatePriceRange();

    // Asegúrate de que el modal no se abre al recargar la página
    const modal = document.getElementById('product-detail-modal');
    if (modal) {
        modal.style.display = 'none';  // Si hay algún modal abierto, cerrarlo
    }

    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && localStorage.getItem('cartOpen') === 'true') {
        cartSidebar.style.display = 'block';
    } else if (cartSidebar) {
        cartSidebar.style.display = 'none';
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');
            const productImage = button.getAttribute('data-image');
            addToCart(productName, productPrice, productImage);
        });
    });
});
