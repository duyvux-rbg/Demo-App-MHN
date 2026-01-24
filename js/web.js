// ==================== GLOBAL STATE ====================
let currentLanguage = 'vi';
let currentPage = 'home';
let currentBannerIndex = 0;
let bannerInterval = null;
let selectedProduct = null;
let isLoggedIn = false;
let orderMode = 'delivery'; // delivery, takeaway, dinein, points
let selectedStore = null;
let tableNumber = null;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initBannerCarousel();
    loadHomePage();
    loadOrderPage();
    loadStoresPage();
    loadRewardsPage();
    initEventListeners();
    updateCartBadge();
    checkLoginStatus();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('btnHamburger');
    const navMenu = document.getElementById('navMenu');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);

            // Close mobile menu
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Handle hash navigation
    window.addEventListener('hashchange', handleHashChange);

    // Handle initial hash
    if (window.location.hash) {
        handleHashChange();
    }
}

function handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (hash) {
        navigateToPage(hash);
    }
}

function navigateToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;

        // Update active nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });

        // Scroll to top
        window.scrollTo(0, 0);

        // Load page specific content
        loadPageContent(pageName);
    }
}

function loadPageContent(pageName) {
    switch (pageName) {
        case 'cart':
            loadCartPage();
            break;
        case 'checkout':
            loadCheckoutPage();
            break;
        case 'order-history':
            loadOrderHistory();
            break;
        case 'profile':
            loadProfilePage();
            break;
        case 'addresses':
            loadAddressesPage();
            break;
        case 'staff':
            loadStaffPage();
            break;
    }
}

// ==================== HOME PAGE ====================
function loadHomePage() {
    // Load promo cards
    const promoGrid = document.getElementById('promoGrid');
    if (promoGrid) {
        promoGrid.innerHTML = promoCards.map(card => `
            <div class="promo-card">
                <img src="${card.image}" alt="${card.title}">
                <div class="promo-card-content">
                    <span class="badge badge-${card.badge === 'Cập nhật từ Nhà' ? 'new' : card.badge === 'Khuyến Mãi Hot' ? 'hot' : 'member'}">${card.badge}</span>
                    <h3>${card.title}</h3>
                    <p>📅 ${card.date}</p>
                </div>
            </div>
        `).join('');
    }

    // Load quick categories
    const quickCategories = document.getElementById('quickCategories');
    if (quickCategories) {
        quickCategories.innerHTML = categories.map(cat => `
            <button class="category-btn" onclick="filterByCategory('${cat.id}')">
                <span>${cat.icon}</span>
                <span>${cat.name}</span>
            </button>
        `).join('');
    }

    // Load must try products
    const mustTryGrid = document.getElementById('mustTryGrid');
    if (mustTryGrid) {
        const mustTryProducts = products.filter(p => p.mustTry || p.bestseller).slice(0, 4);
        mustTryGrid.innerHTML = mustTryProducts.map(product => createProductCard(product)).join('');
    }

    // Load recent orders (if logged in)
    if (isLoggedIn && currentUser.orderHistory && currentUser.orderHistory.length > 0) {
        document.getElementById('ordersSection').style.display = 'block';
        const recentOrders = document.getElementById('recentOrders');
        // Show recent orders here
    }
}

function filterByCategory(categoryId) {
    navigateToPage('order');
    setTimeout(() => {
        const categoryTab = document.querySelector(`.category-tab[data-category="${categoryId}"]`);
        if (categoryTab) {
            categoryTab.click();
        }
    }, 100);
}

// ==================== BANNER CAROUSEL ====================
function initBannerCarousel() {
    const carousel = document.getElementById('bannerCarousel');
    const dotsContainer = document.getElementById('bannerDots');

    if (!carousel || !dotsContainer) return;

    // Create banner slides
    carousel.innerHTML = banners.map((banner, index) => `
        <div class="banner-slide ${index === 0 ? 'active' : ''}">
            <img src="${banner.image}" alt="${banner.title}">
            <div class="banner-content">
                <h3>${banner.title}</h3>
                <p>${banner.subtitle}</p>
            </div>
        </div>
    `).join('');

    // Create dots
    dotsContainer.innerHTML = banners.map((_, index) => `
        <span class="banner-dot ${index === 0 ? 'active' : ''}" onclick="goToBanner(${index})"></span>
    `).join('');

    // Auto play
    startBannerAutoPlay();

    // Navigation buttons
    document.getElementById('bannerPrev').addEventListener('click', prevBanner);
    document.getElementById('bannerNext').addEventListener('click', nextBanner);
}

function startBannerAutoPlay() {
    bannerInterval = setInterval(() => {
        nextBanner();
    }, 5000);
}

function stopBannerAutoPlay() {
    if (bannerInterval) {
        clearInterval(bannerInterval);
    }
}

function goToBanner(index) {
    stopBannerAutoPlay();
    currentBannerIndex = index;
    updateBannerDisplay();
    startBannerAutoPlay();
}

function nextBanner() {
    currentBannerIndex = (currentBannerIndex + 1) % banners.length;
    updateBannerDisplay();
}

function prevBanner() {
    currentBannerIndex = (currentBannerIndex - 1 + banners.length) % banners.length;
    updateBannerDisplay();
}

function updateBannerDisplay() {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentBannerIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentBannerIndex);
    });
}

// ==================== ORDER PAGE ====================
function loadOrderPage() {
    // Load category dropdown
    const categoryDropdown = document.getElementById('categoryDropdown');
    if (categoryDropdown) {
        categoryDropdown.innerHTML = `
            <option value="">Danh mục ▼</option>
            ${categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
        `;

        categoryDropdown.addEventListener('change', (e) => {
            const categoryId = e.target.value;
            if (categoryId) {
                filterProductsByCategory(categoryId);
            } else {
                displayAllProducts();
            }
        });
    }

    // Load category tabs
    const categoryTabs = document.getElementById('categoryTabs');
    if (categoryTabs) {
        categoryTabs.innerHTML = categories.map(cat => `
            <button class="category-tab ${cat.id === 'coffee' ? 'active' : ''}"
                    data-category="${cat.id}"
                    onclick="filterProductsByCategory('${cat.id}')">
                ${cat.icon} ${cat.name}
            </button>
        `).join('');
    }

    // Display all products initially
    displayAllProducts();
}

function displayAllProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    const productsByCategory = {};
    categories.forEach(cat => {
        productsByCategory[cat.id] = products.filter(p => p.category === cat.id);
    });

    container.innerHTML = Object.entries(productsByCategory).map(([categoryId, categoryProducts]) => {
        const category = categories.find(c => c.id === categoryId);
        if (categoryProducts.length === 0) return '';

        return `
            <div class="category-section" id="category-${categoryId}">
                <h2 style="margin: 2rem 0 1rem; color: var(--dark-brown);">${category.icon} ${category.name}</h2>
                <div class="product-grid">
                    ${categoryProducts.map(product => createProductCard(product)).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function filterProductsByCategory(categoryId) {
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === categoryId);
    });

    const container = document.getElementById('productsContainer');
    if (!container) return;

    const categoryProducts = products.filter(p => p.category === categoryId);
    const category = categories.find(c => c.id === categoryId);

    container.innerHTML = `
        <div class="category-section">
            <h2 style="margin: 2rem 0 1rem; color: var(--dark-brown);">${category.icon} ${category.name}</h2>
            <div class="product-grid">
                ${categoryProducts.map(product => createProductCard(product)).join('')}
            </div>
        </div>
    `;
}

function createProductCard(product) {
    const badges = [];
    if (product.bestseller) badges.push('<span class="badge badge-hot">Best Seller</span>');
    if (product.mustTry) badges.push('<span class="badge badge-must-try">Must Try</span>');
    if (!product.available) badges.push('<span class="out-of-stock-badge">Hết hàng</span>');

    return `
        <div class="product-card" onclick='openProductModal(${JSON.stringify(product)})'>
            ${badges.join('')}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                ${product.nameEn ? `<p class="product-name-en">/${product.nameEn}/</p>` : ''}
                <p class="price">${formatPrice(product.price)}</p>
                <button class="btn-add ${!product.available ? 'btn-disabled' : ''}"
                        ${!product.available ? 'disabled' : ''}>
                    ${product.available ? 'Chọn món' : 'Tạm hết'}
                </button>
            </div>
        </div>
    `;
}

// ==================== PRODUCT MODAL ====================
function openProductModal(product) {
    if (!product.available) return;

    selectedProduct = product;
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p style="color: var(--gray-text); margin-bottom: 1rem;">${product.description}</p>
            <p class="price" id="modalPrice">${formatPrice(product.price)}</p>

            <!-- Size Options -->
            <div class="option-group">
                <h4>Chọn size</h4>
                ${sizes.map(size => `
                    <label>
                        <input type="radio" name="size" value="${size.id}"
                               data-adjust="${size.priceAdjust}"
                               ${size.default ? 'checked' : ''}
                               onchange="updateModalPrice()">
                        ${size.name} - ${formatPrice(product.price + size.priceAdjust)}
                    </label>
                `).join('')}
            </div>

            <!-- Sugar Options -->
            <div class="option-group">
                <h4>Đường</h4>
                ${sugarLevels.map(sugar => `
                    <label>
                        <input type="radio" name="sugar" value="${sugar.id}" ${sugar.default ? 'checked' : ''}>
                        ${sugar.name}
                    </label>
                `).join('')}
            </div>

            <!-- Ice Options -->
            <div class="option-group">
                <h4>Đá</h4>
                ${iceLevels.map(ice => `
                    <label>
                        <input type="radio" name="ice" value="${ice.id}" ${ice.default ? 'checked' : ''}>
                        ${ice.name}
                    </label>
                `).join('')}
            </div>

            <!-- Topping Options -->
            <div class="option-group">
                <h4>Topping</h4>
                ${toppings.map(topping => `
                    <label>
                        <input type="checkbox" name="topping" value="${topping.id}"
                               data-price="${topping.price}"
                               onchange="updateModalPrice()">
                        ${topping.name} (+${formatPrice(topping.price)})
                    </label>
                `).join('')}
            </div>

            <!-- Quantity -->
            <div class="quantity-selector">
                <button onclick="changeQuantity(-1)">-</button>
                <input type="number" id="productQuantity" value="1" min="1" readonly>
                <button onclick="changeQuantity(1)">+</button>
            </div>

            <!-- Actions -->
            <div class="modal-actions">
                <button class="btn-cancel" onclick="closeProductModal()">Hủy</button>
                <button class="btn-add-cart" onclick="addToCart()">
                    Thêm vào giỏ - <span id="totalPrice">${formatPrice(product.price)}</span>
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    selectedProduct = null;
}

function updateModalPrice() {
    if (!selectedProduct) return;

    let totalPrice = selectedProduct.price;

    // Add size adjustment
    const sizeRadio = document.querySelector('input[name="size"]:checked');
    if (sizeRadio) {
        totalPrice += parseInt(sizeRadio.dataset.adjust);
    }

    // Add topping prices
    const toppingCheckboxes = document.querySelectorAll('input[name="topping"]:checked');
    toppingCheckboxes.forEach(checkbox => {
        totalPrice += parseInt(checkbox.dataset.price);
    });

    // Multiply by quantity
    const quantity = parseInt(document.getElementById('productQuantity').value);
    totalPrice *= quantity;

    // Update display
    document.getElementById('totalPrice').textContent = formatPrice(totalPrice);
}

function changeQuantity(delta) {
    const input = document.getElementById('productQuantity');
    let value = parseInt(input.value);
    value = Math.max(1, value + delta);
    input.value = value;
    updateModalPrice();
}

function addToCart() {
    const sizeRadio = document.querySelector('input[name="size"]:checked');
    const sugarRadio = document.querySelector('input[name="sugar"]:checked');
    const iceRadio = document.querySelector('input[name="ice"]:checked');
    const toppingCheckboxes = document.querySelectorAll('input[name="topping"]:checked');
    const quantity = parseInt(document.getElementById('productQuantity').value);

    const size = sizes.find(s => s.id === sizeRadio.value);
    const sugar = sugarLevels.find(s => s.id === sugarRadio.value);
    const ice = iceLevels.find(i => i.id === iceRadio.value);
    const selectedToppings = Array.from(toppingCheckboxes).map(cb =>
        toppings.find(t => t.id === cb.value)
    );

    let price = selectedProduct.price + size.priceAdjust;
    selectedToppings.forEach(topping => {
        price += topping.price;
    });

    const cartItem = {
        id: Date.now(),
        product: selectedProduct,
        size: size,
        sugar: sugar,
        ice: ice,
        toppings: selectedToppings,
        quantity: quantity,
        price: price,
        totalPrice: price * quantity
    };

    cart.push(cartItem);
    updateCartBadge();
    closeProductModal();
    showToast('Đã thêm vào giỏ hàng!');
}

// ==================== CART PAGE ====================
function loadCartPage() {
    const cartContent = document.getElementById('cartContent');
    const cartEmpty = document.getElementById('cartEmpty');

    if (cart.length === 0) {
        cartContent.style.display = 'none';
        cartEmpty.style.display = 'block';
        return;
    }

    cartContent.style.display = 'block';
    cartEmpty.style.display = 'none';

    const cartItems = document.getElementById('cartContent');

    let html = '<div class="cart-items">';

    cart.forEach((item, index) => {
        const toppingsText = item.toppings.length > 0
            ? `<p>+ ${item.toppings.map(t => t.name).join(', ')}</p>`
            : '';

        html += `
            <div class="cart-item">
                <img src="${item.product.image}" alt="${item.product.name}">
                <div class="item-info">
                    <h4>${item.product.name}</h4>
                    <p>Size ${item.size.name}, ${item.sugar.name} đường, ${item.ice.name}</p>
                    ${toppingsText}
                </div>
                <div class="item-quantity">
                    <button onclick="updateCartQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${index}, 1)">+</button>
                </div>
                <div class="item-price">${formatPrice(item.totalPrice)}</div>
                <button class="btn-remove" onclick="removeFromCart(${index})">🗑️</button>
            </div>
        `;
    });

    html += '</div>';

    // Voucher section
    html += `
        <div class="voucher-section">
            <input type="text" id="voucherInput" placeholder="Nhập mã voucher">
            <button onclick="applyVoucher()">Áp dụng</button>
        </div>
    `;

    // Summary
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const shipping = 20000;
    const discount = 0; // TODO: Calculate from voucher
    const total = subtotal + shipping - discount;

    html += `
        <div class="cart-summary">
            <div class="row">
                <span>Tạm tính:</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="row">
                <span>Phí giao hàng:</span>
                <span>${formatPrice(shipping)}</span>
            </div>
            ${discount > 0 ? `
                <div class="row discount">
                    <span>Giảm giá:</span>
                    <span>-${formatPrice(discount)}</span>
                </div>
            ` : ''}
            <div class="row total">
                <span>Tổng cộng:</span>
                <span>${formatPrice(total)}</span>
            </div>
        </div>

        <button class="btn-checkout" onclick="navigateToPage('checkout')">Thanh toán</button>
    `;

    cartItems.innerHTML = html;
}

function updateCartQuantity(index, delta) {
    cart[index].quantity = Math.max(1, cart[index].quantity + delta);
    cart[index].totalPrice = cart[index].price * cart[index].quantity;
    updateCartBadge();
    loadCartPage();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    loadCartPage();
    showToast('Đã xóa khỏi giỏ hàng');
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

function applyVoucher() {
    const input = document.getElementById('voucherInput');
    const code = input.value.trim().toUpperCase();

    const voucher = vouchers.find(v => v.code === code);

    if (voucher) {
        showToast('Áp dụng voucher thành công!');
        // TODO: Apply voucher discount
        loadCartPage();
    } else {
        showToast('Mã voucher không hợp lệ!');
    }
}

// ==================== CHECKOUT PAGE ====================
function loadCheckoutPage() {
    // Setup order type listeners
    setupOrderTypeListeners();

    // Initialize with delivery selected
    updateCheckoutSummary();
}

function setupOrderTypeListeners() {
    const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
    orderTypeRadios.forEach(radio => {
        radio.addEventListener('change', handleOrderTypeChange);
    });

    // Trigger initial state
    const checkedRadio = document.querySelector('input[name="orderType"]:checked');
    if (checkedRadio) {
        handleOrderTypeChange({ target: checkedRadio });
    }
}

function handleOrderTypeChange(e) {
    const orderType = e.target.value;

    // Update description
    document.getElementById('descDelivery').style.display = orderType === 'delivery' ? 'block' : 'none';
    document.getElementById('descTakeaway').style.display = orderType === 'takeaway' ? 'block' : 'none';
    document.getElementById('descDinein').style.display = orderType === 'dinein' ? 'block' : 'none';

    // Show/hide delivery address section
    const deliverySection = document.getElementById('deliveryInfoSection');
    deliverySection.style.display = orderType === 'delivery' ? 'block' : 'none';

    // Update payment options
    updatePaymentOptions(orderType);

    // Update summary
    updateCheckoutSummary();
}

function updatePaymentOptions(orderType) {
    const paymentOptions = document.querySelectorAll('.payment-option');

    paymentOptions.forEach(option => {
        const types = option.getAttribute('data-types');
        if (types && types.includes(orderType)) {
            option.style.display = 'flex';

            // Auto select first visible option
            if (!document.querySelector('input[name="payment"]:checked:not([style*="display: none"])')) {
                const radio = option.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
            }
        } else {
            option.style.display = 'none';
            const radio = option.querySelector('input[type="radio"]');
            if (radio && radio.checked) {
                radio.checked = false;
            }
        }
    });
}

function updateCheckoutSummary() {
    const checkoutSummary = document.getElementById('checkoutSummary');
    const orderType = document.querySelector('input[name="orderType"]:checked')?.value || 'delivery';
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

    let shipping = 0;
    if (orderType === 'delivery') {
        const distance = parseFloat(document.getElementById('deliveryDistance')?.value) || 0;
        shipping = distance * 15000; // 15,000đ per km
    }

    const discount = 0;
    const total = subtotal + shipping - discount;

    checkoutSummary.innerHTML = `
        <div class="row">
            <span>Tạm tính:</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        ${orderType === 'delivery' ? `
            <div class="row">
                <span>Phí giao hàng:</span>
                <span>${formatPrice(shipping)}</span>
            </div>
        ` : ''}
        ${discount > 0 ? `
            <div class="row discount">
                <span>Giảm giá:</span>
                <span>-${formatPrice(discount)}</span>
            </div>
        ` : ''}
        <div class="row total">
            <span>Tổng cộng:</span>
            <span>${formatPrice(total)}</span>
        </div>
    `;

    // Add listener to distance input to update summary
    const distanceInput = document.getElementById('deliveryDistance');
    if (distanceInput) {
        distanceInput.removeEventListener('input', updateCheckoutSummary);
        distanceInput.addEventListener('input', updateCheckoutSummary);
    }
}

// ==================== STORES PAGE ====================
function loadStoresPage() {
    const storeList = document.getElementById('storeList');
    if (!storeList) return;

    storeList.innerHTML = stores.map(store => `
        <div class="store-item">
            <h3>${store.name}</h3>
            <p style="color: var(--gray-text); margin-bottom: 1rem;">${store.description}</p>

            <p>📍 ${store.address}</p>
            <p>📞 ${store.phone}</p>
            <p>⏰ ${store.hours}</p>
            <span class="status ${store.status}">${store.status === 'open' ? 'Đang mở cửa' : 'Đã đóng cửa'}</span>

            ${store.features ? `
                <div style="margin: 1rem 0; padding: 1rem; background: var(--cream-white); border-radius: 8px;">
                    <strong style="color: var(--dark-brown);">✨ Đặc biệt:</strong><br>
                    ${store.features.map(f => `<span style="display: block; margin-top: 0.5rem;">${f}</span>`).join('')}
                </div>
            ` : ''}

            ${store.social ? `
                <div style="margin: 1rem 0;">
                    <strong style="color: var(--dark-brown);">Theo dõi chúng mình:</strong><br>
                    <a href="https://www.instagram.com/${store.social.instagram}" target="_blank" style="color: var(--primary-orange); margin-right: 1rem;">📷 Instagram</a>
                    <a href="https://www.tiktok.com/${store.social.tiktok}" target="_blank" style="color: var(--primary-orange); margin-right: 1rem;">🎵 TikTok</a>
                    <a href="https://www.tiktok.com/${store.social.tiktokDaily}" target="_blank" style="color: var(--primary-orange);">📱 TikTok Daily</a>
                </div>
            ` : ''}

            <button class="btn-direction" onclick="getDirection('${store.lat}', '${store.lng}')">Chỉ đường</button>
        </div>
    `).join('');
}

function getDirection(lat, lng) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
}

// ==================== REWARDS PAGE ====================
function loadRewardsPage() {
    // Load membership card
    if (currentUser) {
        const tier = membershipTiers.find(t => t.id === currentUser.tier);
        document.getElementById('cardTier').textContent = `Hạng ${tier.name}`;
        document.getElementById('cardName').textContent = currentUser.name.toUpperCase();
        document.getElementById('pointsValue').textContent = currentUser.points;
    }

    // Load tier badges
    const tierBadges = document.getElementById('tierBadges');
    if (tierBadges) {
        tierBadges.innerHTML = membershipTiers.map(tier => `
            <div class="tier-badge ${currentUser && currentUser.tier === tier.id ? 'active' : ''}"
                 style="border-color: ${tier.color}; ${currentUser && currentUser.tier === tier.id ? `background-color: ${tier.color}; color: white;` : ''}">
                ${tier.name}
            </div>
        `).join('');
    }

    // Load vouchers
    const voucherList = document.getElementById('voucherList');
    if (voucherList) {
        voucherList.innerHTML = vouchers.map(voucher => `
            <div class="voucher-card">
                <div class="voucher-discount">${voucher.type === 'percentage' ? `GIẢM ${voucher.discount}%` : `GIẢM ${formatPrice(voucher.discount)}`}</div>
                <h4>${voucher.title}</h4>
                <p>${voucher.description}</p>
                <button class="btn-save" onclick="saveVoucher('${voucher.id}')">Lưu</button>
            </div>
        `).join('');
    }

    // Load rewards
    const rewardsList = document.getElementById('rewardsList');
    if (rewardsList) {
        rewardsList.innerHTML = rewards.map(reward => `
            <div class="reward-item">
                <img src="${reward.image}" alt="${reward.name}">
                <div class="reward-info">
                    <h4>${reward.name}</h4>
                    <p>${reward.description}</p>
                    <p class="reward-points">💧 ${reward.points} Drips</p>
                    <button class="btn-exchange" onclick="exchangeReward('${reward.id}')">Đổi ngay</button>
                </div>
            </div>
        `).join('');
    }
}

function saveVoucher(voucherId) {
    if (!isLoggedIn) {
        showToast('Vui lòng đăng nhập để lưu voucher');
        navigateToPage('login');
        return;
    }

    if (!currentUser.savedVouchers.includes(voucherId)) {
        currentUser.savedVouchers.push(voucherId);
        showToast('Đã lưu voucher!');
    } else {
        showToast('Bạn đã lưu voucher này rồi!');
    }
}

function exchangeReward(rewardId) {
    if (!isLoggedIn) {
        showToast('Vui lòng đăng nhập để đổi quà');
        navigateToPage('login');
        return;
    }

    const reward = rewards.find(r => r.id === rewardId);

    if (currentUser.points >= reward.points) {
        currentUser.points -= reward.points;
        showToast(`Đã đổi ${reward.name} thành công!`);
        loadRewardsPage();
    } else {
        showToast('Bạn không đủ điểm để đổi quà này!');
    }
}

// ==================== ORDER HISTORY ====================
function loadOrderHistory() {
    const orderList = document.getElementById('orderList');
    const orderEmpty = document.getElementById('orderEmpty');

    if (!currentUser || !currentUser.orderHistory || currentUser.orderHistory.length === 0) {
        orderList.style.display = 'none';
        orderEmpty.style.display = 'block';
        return;
    }

    orderList.style.display = 'block';
    orderEmpty.style.display = 'none';

    // TODO: Load actual order history
    orderList.innerHTML = '<p style="text-align: center; padding: 2rem;">Chưa có đơn hàng nào</p>';
}

// ==================== PROFILE PAGE ====================
function loadProfilePage() {
    if (!isLoggedIn || !currentUser) {
        navigateToPage('login');
        return;
    }

    document.getElementById('profileName').value = currentUser.name;
    document.getElementById('profilePhone').value = currentUser.phone;
    document.getElementById('profileEmail').value = currentUser.email || '';
    document.getElementById('profileBirthday').value = currentUser.birthday || '';
    document.getElementById('profileGender').value = currentUser.gender || 'male';
}

// ==================== ADDRESSES PAGE ====================
function loadAddressesPage() {
    if (!isLoggedIn || !currentUser) {
        navigateToPage('login');
        return;
    }

    const addressList = document.getElementById('addressList');

    if (currentUser.addresses.length === 0) {
        addressList.innerHTML = '<p style="text-align: center; padding: 2rem;">Chưa có địa chỉ nào</p>';
        return;
    }

    addressList.innerHTML = currentUser.addresses.map((address, index) => `
        <div class="address-card ${address.isDefault ? 'default' : ''}">
            ${address.isDefault ? '<span class="badge badge-new">Mặc định</span>' : ''}
            <h4>${address.label}</h4>
            <p><strong>${address.name}</strong> | ${address.phone}</p>
            <p>${address.address}</p>
            <div class="address-actions">
                <button class="btn-edit" onclick="editAddress(${index})">Sửa</button>
                <button class="btn-delete" onclick="deleteAddress(${index})">Xóa</button>
            </div>
        </div>
    `).join('');
}

function editAddress(index) {
    showToast('Chức năng đang phát triển');
}

function deleteAddress(index) {
    if (confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
        currentUser.addresses.splice(index, 1);
        loadAddressesPage();
        showToast('Đã xóa địa chỉ');
    }
}

// ==================== EVENT LISTENERS ====================
function initEventListeners() {
    // Search button
    const btnSearch = document.getElementById('btnSearch');
    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            openSearchModal();
        });
    }

    // Cart button
    document.getElementById('btnCart').addEventListener('click', () => {
        navigateToPage('cart');
    });

    // WiFi button
    document.getElementById('btnWifi').addEventListener('click', () => {
        openWifiModal();
    });

    // Floor Map button
    document.getElementById('btnFloorMap').addEventListener('click', () => {
        openFloorMapModal(1);
    });

    // User button
    document.getElementById('btnUser').addEventListener('click', () => {
        if (isLoggedIn) {
            navigateToPage('profile');
        } else {
            navigateToPage('login');
        }
    });

    // Language button
    document.getElementById('btnLanguage').addEventListener('click', () => {
        currentLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
        document.getElementById('btnLanguage').textContent = currentLanguage.toUpperCase();
        showToast(`Switched to ${currentLanguage === 'vi' ? 'Vietnamese' : 'English'}`);
        // TODO: Update all text based on language
    });

    // Staff button
    const btnStaff = document.getElementById('btnStaff');
    if (btnStaff) {
        btnStaff.addEventListener('click', () => {
            navigateToPage('staff');
        });
    }

    // Modal overlay
    document.getElementById('modalOverlay').addEventListener('click', closeProductModal);
    document.getElementById('modalClose').addEventListener('click', closeProductModal);

    // Checkout back button
    const btnBackToCart = document.getElementById('btnBackToCart');
    if (btnBackToCart) {
        btnBackToCart.addEventListener('click', () => {
            navigateToPage('cart');
        });
    }

    // Checkout confirm button
    const btnConfirmOrder = document.getElementById('btnConfirmOrder');
    if (btnConfirmOrder) {
        btnConfirmOrder.addEventListener('click', confirmOrder);
    }

    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveProfile();
        });
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleRegister();
        });
    }

    // Settings
    const btnLogoutSettings = document.getElementById('btnLogoutSettings');
    if (btnLogoutSettings) {
        btnLogoutSettings.addEventListener('click', handleLogout);
    }

    // Hero tabs
    const heroTabs = document.querySelectorAll('.hero-tab');
    heroTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            heroTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const type = tab.dataset.type;
            handleHeroTabClick(type);
        });
    });
}

// ==================== HERO TAB ACTIONS ====================
function handleHeroTabClick(type) {
    orderMode = type;

    switch(type) {
        case 'delivery':
            handleDeliveryMode();
            break;
        case 'takeaway':
            handleTakeawayMode();
            break;
        case 'dinein':
            handleDineInMode();
            break;
        case 'points':
            handlePointsMode();
            break;
    }
}

// 1. GIAO HÀNG MODE
function handleDeliveryMode() {
    // Chuyển sang trang đặt hàng với mode giao hàng
    showToast('🚚 Chế độ Giao hàng - Chọn món và nhập địa chỉ giao hàng');
    navigateToPage('order');

    // Set delivery mode flag
    localStorage.setItem('orderMode', 'delivery');
}

// 2. MANG ĐI MODE
function handleTakeawayMode() {
    // Hiển thị modal chọn cửa hàng
    showStoreSelectionModal();
}

function showStoreSelectionModal() {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="store-selection">
            <h2>Chọn cửa hàng mang đi</h2>
            <p style="color: var(--gray-text); margin-bottom: 1.5rem;">Vui lòng chọn cửa hàng bạn muốn đến lấy món</p>

            <div class="store-list-modal">
                ${stores.map(store => `
                    <div class="store-option" onclick="selectStoreForTakeaway('${store.id}')">
                        <div class="store-option-info">
                            <h4>${store.name}</h4>
                            <p>📍 ${store.address}</p>
                            <p>⏰ ${store.hours}</p>
                            <p>📏 ${store.distance}</p>
                        </div>
                        <span class="status ${store.status}">${store.status === 'open' ? 'Đang mở cửa' : 'Đã đóng cửa'}</span>
                    </div>
                `).join('')}
            </div>

            <button class="btn-cancel" onclick="closeProductModal()" style="width: 100%; margin-top: 1.5rem;">Đóng</button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function selectStoreForTakeaway(storeId) {
    selectedStore = stores.find(s => s.id === storeId);

    if (selectedStore.status === 'closed') {
        showToast('⚠️ Cửa hàng đã đóng cửa');
        return;
    }

    closeProductModal();
    showToast(`✅ Đã chọn ${selectedStore.name} - Bạn có thể đặt món ngay!`);

    // Set takeaway mode
    localStorage.setItem('orderMode', 'takeaway');
    localStorage.setItem('selectedStore', JSON.stringify(selectedStore));

    // Chuyển sang trang đặt hàng
    navigateToPage('order');
}

// 3. TẠI CHỖ MODE (QR Scanner)
function handleDineInMode() {
    // Hiển thị modal quét QR
    showQRScannerModal();
}

function showQRScannerModal() {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="qr-scanner-modal">
            <h2>Quét mã QR tại bàn</h2>
            <p style="color: var(--gray-text); margin-bottom: 1.5rem;">Vui lòng quét mã QR trên bàn để đặt món</p>

            <div class="qr-scanner-placeholder">
                <div class="qr-scan-icon">📷</div>
                <p>Đặt camera vào mã QR</p>
            </div>

            <div class="or-divider">
                <span>Hoặc</span>
            </div>

            <div class="manual-table-input">
                <label>Nhập mã bàn thủ công:</label>
                <input type="text" id="manualTableNumber" placeholder="Ví dụ: T1-B05"
                       style="width: 100%; padding: 12px; border: 2px solid var(--beige); border-radius: 8px; margin-top: 8px;">
                <button class="btn-primary" onclick="confirmTableNumber()"
                        style="width: 100%; margin-top: 12px;">Xác nhận</button>
            </div>

            <button class="btn-cancel" onclick="closeProductModal()" style="width: 100%; margin-top: 1.5rem;">Đóng</button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function confirmTableNumber() {
    const input = document.getElementById('manualTableNumber');
    const tableCode = input.value.trim().toUpperCase();

    if (!tableCode) {
        showToast('⚠️ Vui lòng nhập mã bàn');
        return;
    }

    // Parse table code (format: T1-B05 = Tầng 1 - Bàn 05)
    const match = tableCode.match(/T(\d+)-B(\d+)/);

    if (!match) {
        showToast('⚠️ Mã bàn không hợp lệ (Định dạng: T1-B05)');
        return;
    }

    const floor = match[1];
    const table = match[2];

    tableNumber = {
        code: tableCode,
        floor: floor,
        table: table
    };

    // Save to localStorage
    localStorage.setItem('orderMode', 'dinein');
    localStorage.setItem('tableNumber', JSON.stringify(tableNumber));

    closeProductModal();

    // Hiển thị thông tin bàn
    showTableInfo();
}

function showTableInfo() {
    if (!tableNumber) return;

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    // Get WiFi info from selected store (giả sử tầng 1 là cửa hàng Nhân Chính)
    const wifiInfo = {
        ssid: 'MotHaNoi_WiFi',
        password: 'hanoi2024'
    };

    modalBody.innerHTML = `
        <div class="table-info-modal">
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 48px; margin-bottom: 0.5rem;">✅</div>
                <h2 style="color: var(--green-open);">Kết nối thành công!</h2>
            </div>

            <div class="table-info-card">
                <div class="info-row">
                    <span class="info-label">🪑 Số bàn:</span>
                    <span class="info-value">${tableNumber.table}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">🏢 Tầng:</span>
                    <span class="info-value">${tableNumber.floor}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📶 WiFi:</span>
                    <span class="info-value">${wifiInfo.ssid}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">🔑 Mật khẩu:</span>
                    <span class="info-value" style="font-family: monospace; background: var(--cream-white); padding: 4px 8px; border-radius: 4px;">${wifiInfo.password}</span>
                </div>
            </div>

            <p style="text-align: center; color: var(--gray-text); margin: 1.5rem 0;">
                Bạn có thể bắt đầu đặt món ngay bây giờ!
            </p>

            <button class="btn-primary" onclick="startDineInOrder()" style="width: 100%;">
                Bắt đầu đặt món
            </button>

            <button class="btn-secondary" onclick="closeProductModal()" style="width: 100%; margin-top: 0.5rem;">
                Đóng
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function startDineInOrder() {
    closeProductModal();
    showToast(`🪑 Bàn ${tableNumber.table} - Tầng ${tableNumber.floor} - Bắt đầu đặt món!`);
    navigateToPage('order');
}

// 4. TÍCH ĐIỂM MODE
function handlePointsMode() {
    if (!isLoggedIn) {
        showToast('⚠️ Vui lòng đăng nhập để xem tích điểm');
        navigateToPage('login');
        return;
    }

    showToast('⭐ Chuyển đến trang tích điểm và ưu đãi');
    navigateToPage('rewards');
}

// ==================== AUTH ====================
function checkLoginStatus() {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
    } else {
        // For demo, auto login
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

function handleLogin() {
    const phone = document.getElementById('loginPhone').value;
    const password = document.getElementById('loginPassword').value;

    // Simple validation (for demo)
    if (phone && password) {
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showToast('Đăng nhập thành công!');
        navigateToPage('home');
    } else {
        showToast('Vui lòng nhập đầy đủ thông tin');
    }
}

function handleRegister() {
    const name = document.getElementById('registerName').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const agree = document.getElementById('registerAgree').checked;

    if (!agree) {
        showToast('Vui lòng đồng ý với điều khoản sử dụng');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Mật khẩu xác nhận không khớp');
        return;
    }

    if (name && phone && password) {
        currentUser.name = name;
        currentUser.phone = phone;
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showToast('Đăng ký thành công!');
        navigateToPage('home');
    } else {
        showToast('Vui lòng nhập đầy đủ thông tin');
    }
}

function handleLogout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        isLoggedIn = false;
        localStorage.removeItem('currentUser');
        cart = [];
        updateCartBadge();
        showToast('Đã đăng xuất');
        navigateToPage('home');
    }
}

function saveProfile() {
    currentUser.name = document.getElementById('profileName').value;
    currentUser.email = document.getElementById('profileEmail').value;
    currentUser.birthday = document.getElementById('profileBirthday').value;
    currentUser.gender = document.getElementById('profileGender').value;

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showToast('Đã lưu thay đổi!');
}

// ==================== ORDER ====================
function confirmOrder() {
    if (cart.length === 0) {
        showToast('Giỏ hàng trống!');
        return;
    }

    // Get order type
    const orderType = document.querySelector('input[name="orderType"]:checked')?.value;
    if (!orderType) {
        showToast('Vui lòng chọn phương thức nhận hàng');
        return;
    }

    // Get delivery info
    let deliveryAddress = '';
    let deliveryDistance = 0;
    let shippingFee = 0;

    // Validate delivery address if delivery type
    if (orderType === 'delivery') {
        deliveryAddress = document.getElementById('deliveryAddress')?.value;
        deliveryDistance = document.getElementById('deliveryDistance')?.value;

        if (!deliveryAddress || !deliveryDistance) {
            showToast('Vui lòng nhập đầy đủ địa chỉ và khoảng cách giao hàng');
            return;
        }

        if (parseFloat(deliveryDistance) <= 0) {
            showToast('Khoảng cách phải lớn hơn 0');
            return;
        }

        shippingFee = parseFloat(deliveryDistance) * 15000;
    }

    // Validate payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
        showToast('Vui lòng chọn phương thức thanh toán');
        return;
    }

    // Show loading
    showLoading();

    // Create order object
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const order = {
        id: generateOrderId(),
        orderType: orderType,
        items: cart.map(item => ({
            name: item.product.name,
            size: item.size.name,
            sugar: item.sugar.name,
            ice: item.ice.name,
            toppings: item.toppings.map(t => t.name),
            quantity: item.quantity,
            price: item.price,
            totalPrice: item.totalPrice
        })),
        subtotal: subtotal,
        shippingFee: shippingFee,
        total: subtotal + shippingFee,
        paymentMethod: paymentMethod.value,
        status: 'pending',
        createdAt: new Date().toISOString(),
        // Order type specific info
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : null,
        deliveryDistance: orderType === 'delivery' ? parseFloat(deliveryDistance) : null,
        tableNumber: orderType === 'dinein' ? (tableNumber ? tableNumber.code : 'N/A') : null,
        tableFloor: orderType === 'dinein' ? (tableNumber ? tableNumber.floor : null) : null,
        storeName: orderType === 'takeaway' ? (selectedStore ? selectedStore.name : 'N/A') : null,
        customerName: currentUser ? currentUser.name : 'Khách',
        customerPhone: currentUser ? currentUser.phone : ''
    };

    // Save order to localStorage
    saveOrder(order);

    // Simulate order processing
    setTimeout(() => {
        hideLoading();

        // Clear cart
        cart = [];
        updateCartBadge();

        // Show success message based on order type
        let successMessage = 'Đặt hàng thành công!';
        if (orderType === 'delivery') {
            successMessage = `Đặt hàng thành công! Mã đơn: ${order.id}. Đơn hàng sẽ được giao đến bạn sớm.`;
        } else if (orderType === 'takeaway') {
            successMessage = `Đặt hàng thành công! Mã đơn: ${order.id}. Vui lòng đến quầy để nhận hàng.`;
        } else if (orderType === 'dinein') {
            successMessage = `Đặt hàng thành công! Mã đơn: ${order.id}. Đồ uống sẽ được mang đến bàn của bạn.`;
        }

        showToast(successMessage);

        // Navigate to order history
        navigateToPage('order-history');
    }, 2000);
}

// Generate unique order ID
function generateOrderId() {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `MHN${dateStr}-${random}`;
}

// Save order to localStorage
function saveOrder(order) {
    let orders = getStoredOrders();
    orders.unshift(order); // Add new order at the beginning
    localStorage.setItem('mhn_orders', JSON.stringify(orders));
}

// Get all stored orders
function getStoredOrders() {
    const stored = localStorage.getItem('mhn_orders');
    return stored ? JSON.parse(stored) : [];
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
    let orders = getStoredOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        orders[orderIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('mhn_orders', JSON.stringify(orders));
        return true;
    }
    return false;
}

// Delete order
function deleteOrder(orderId) {
    let orders = getStoredOrders();
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('mhn_orders', JSON.stringify(orders));
}

// ==================== UTILITIES ====================
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + 'đ';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

// ==================== SEARCH ====================
function openSearchModal() {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Focus on input
        setTimeout(() => {
            document.getElementById('searchModalInput')?.focus();
        }, 100);

        // Reset search
        document.getElementById('searchModalInput').value = '';
        document.getElementById('searchResults').innerHTML = '';
        document.getElementById('searchSuggestions').style.display = 'block';
    }
}

function closeSearchModal() {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function performSearch() {
    const input = document.getElementById('searchModalInput');
    const query = input.value.trim().toLowerCase();

    if (query.length < 1) {
        showToast('Vui lòng nhập từ khóa tìm kiếm');
        return;
    }

    searchProducts(query);
}

function searchProducts(query) {
    // Search through products
    const results = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(query);
        const nameEnMatch = product.nameEn?.toLowerCase().includes(query);
        const descMatch = product.description?.toLowerCase().includes(query);
        const categoryMatch = categories.find(c => c.id === product.category)?.name.toLowerCase().includes(query);

        return nameMatch || nameEnMatch || descMatch || categoryMatch;
    });

    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const container = document.getElementById('searchResults');
    const suggestions = document.getElementById('searchSuggestions');

    suggestions.style.display = 'none';

    if (results.length === 0) {
        container.innerHTML = `
            <div class="search-no-results">
                <div class="no-results-icon">🔍</div>
                <h4>Không tìm thấy kết quả</h4>
                <p>Không có sản phẩm nào phù hợp với "${query}"</p>
                <p style="margin-top: 8px; font-size: 13px;">Thử tìm: Cà phê, Trà sữa, Matcha, Sinh tố...</p>
            </div>
        `;
        return;
    }

    const resultsHtml = results.map(product => {
        const category = categories.find(c => c.id === product.category);
        return `
            <div class="search-result-item" onclick="selectSearchResult(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                <img src="${product.image}" alt="${product.name}">
                <div class="search-result-info">
                    <div class="search-result-name">${highlightMatch(product.name, query)}</div>
                    <div class="search-result-category">${category?.icon || ''} ${category?.name || ''}</div>
                    <div class="search-result-price">${formatPrice(product.price)}</div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="search-results-header">
            <h3>Kết quả tìm kiếm</h3>
            <span class="search-results-count">${results.length} sản phẩm</span>
        </div>
        <div class="search-results-grid">
            ${resultsHtml}
        </div>
    `;
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong style="color: var(--primary-orange);">$1</strong>');
}

function selectSearchResult(product) {
    closeSearchModal();

    if (product.available) {
        openProductModal(product);
    } else {
        showToast('Sản phẩm này hiện đang hết hàng');
    }
}

// Home search input - live search
document.getElementById('homeSearchInput')?.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length >= 2) {
        // Open search modal and perform search
        openSearchModal();
        document.getElementById('searchModalInput').value = e.target.value;
        searchProducts(query);
    }
});

// Home search input - enter key
document.getElementById('homeSearchInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query.length >= 1) {
            openSearchModal();
            document.getElementById('searchModalInput').value = query;
            searchProducts(query.toLowerCase());
        }
    }
});

// Home search button click
document.querySelector('.search-btn')?.addEventListener('click', () => {
    const input = document.getElementById('homeSearchInput');
    const query = input.value.trim();
    if (query.length >= 1) {
        openSearchModal();
        document.getElementById('searchModalInput').value = query;
        searchProducts(query.toLowerCase());
    } else {
        openSearchModal();
    }
});

// Search modal input - enter key
document.getElementById('searchModalInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Search modal input - live search
document.getElementById('searchModalInput')?.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length >= 2) {
        searchProducts(query);
    } else if (query.length === 0) {
        document.getElementById('searchResults').innerHTML = '';
        document.getElementById('searchSuggestions').style.display = 'block';
    }
});

// ==================== WIFI MODAL ====================
function openWifiModal() {
    const modal = document.getElementById('wifiModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeWifiModal() {
    const modal = document.getElementById('wifiModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const text = element.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showToast('Đã sao chép: ' + text);
        }).catch(err => {
            console.error('Copy failed:', err);
            showToast('Không thể sao chép');
        });
    }
}

// ==================== FLOOR MAP MODAL ====================
function openFloorMapModal(floorNumber = 1) {
    const modal = document.getElementById('floorMapModal');
    if (modal) {
        modal.style.display = 'flex';
        showFloor(floorNumber);
    }
}

function closeFloorMapModal() {
    const modal = document.getElementById('floorMapModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showFloor(floorNumber) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.floor-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Add active class to clicked tab
    tabs[floorNumber - 1].classList.add('active');

    // Hide all floor maps
    const floorMaps = document.querySelectorAll('.floor-map-item');
    floorMaps.forEach(map => map.classList.remove('active'));

    // Show selected floor map
    const selectedFloor = document.getElementById(`floor-${floorNumber}`);
    if (selectedFloor) {
        selectedFloor.classList.add('active');
    }
}

// ==================== STAFF PAGE ====================
let currentFilter = 'all';

function loadStaffPage() {
    updateOrderStats();
    displayStaffOrders(currentFilter);
}

function updateOrderStats() {
    const orders = getStoredOrders();

    document.getElementById('statTotal').textContent = orders.length;
    document.getElementById('statDelivery').textContent = orders.filter(o => o.orderType === 'delivery').length;
    document.getElementById('statTakeaway').textContent = orders.filter(o => o.orderType === 'takeaway').length;
    document.getElementById('statDinein').textContent = orders.filter(o => o.orderType === 'dinein').length;
}

function filterStaffOrders(filter) {
    currentFilter = filter;

    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.filter === filter);
    });

    displayStaffOrders(filter);
}

function displayStaffOrders(filter = 'all') {
    let orders = getStoredOrders();

    // Apply filter
    if (filter !== 'all') {
        if (['delivery', 'takeaway', 'dinein'].includes(filter)) {
            orders = orders.filter(o => o.orderType === filter);
        } else if (filter === 'pending') {
            orders = orders.filter(o => o.status === 'pending' || o.status === 'preparing');
        } else if (filter === 'completed') {
            orders = orders.filter(o => o.status === 'completed');
        }
    }

    const tbody = document.getElementById('staffOrdersBody');
    const emptyState = document.getElementById('staffEmpty');
    const tableContainer = document.querySelector('.orders-table-container');

    if (orders.length === 0) {
        tableContainer.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    tableContainer.style.display = 'block';
    emptyState.style.display = 'none';

    tbody.innerHTML = orders.map(order => {
        const orderTypeLabels = {
            delivery: { icon: '🚚', text: 'Giao hàng' },
            takeaway: { icon: '🛍️', text: 'Mang đi' },
            dinein: { icon: '🍽️', text: 'Tại chỗ' }
        };

        const statusLabels = {
            pending: { icon: '⏳', text: 'Chờ xử lý' },
            preparing: { icon: '👨‍🍳', text: 'Đang pha' },
            ready: { icon: '✨', text: 'Sẵn sàng' },
            delivering: { icon: '🚚', text: 'Đang giao' },
            completed: { icon: '✅', text: 'Hoàn thành' },
            cancelled: { icon: '❌', text: 'Đã hủy' }
        };

        const typeInfo = orderTypeLabels[order.orderType] || { icon: '📦', text: 'Khác' };
        const statusInfo = statusLabels[order.status] || { icon: '❓', text: 'Không rõ' };

        // Location info based on order type
        let locationHtml = '';
        if (order.orderType === 'delivery') {
            locationHtml = `
                <div class="order-location">
                    <div class="address-info" title="${order.deliveryAddress}">${order.deliveryAddress}</div>
                    <small>${order.deliveryDistance} km</small>
                </div>
            `;
        } else if (order.orderType === 'dinein') {
            locationHtml = `
                <div class="order-location">
                    <div class="table-info">Bàn: ${order.tableNumber}</div>
                    <small>Tầng ${order.tableFloor || 'N/A'}</small>
                </div>
            `;
        } else if (order.orderType === 'takeaway') {
            locationHtml = `
                <div class="order-location">
                    <div class="table-info">${order.storeName || 'Cửa hàng'}</div>
                    <small>Lấy tại quầy</small>
                </div>
            `;
        }

        // Items list
        const itemsHtml = order.items.map(item => `
            <div class="order-item-row">
                <span class="item-name">${item.name}</span>
                <span class="item-qty">x${item.quantity}</span>
            </div>
        `).join('');

        // Format time
        const orderTime = new Date(order.createdAt);
        const timeStr = orderTime.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Action buttons based on status
        let actionsHtml = '';
        if (order.status === 'pending') {
            actionsHtml = `
                <button class="btn-complete" onclick="completeOrder('${order.id}')">✓ Xong</button>
                <button class="btn-cancel-order" onclick="cancelOrder('${order.id}')">✗ Hủy</button>
            `;
        } else if (order.status === 'completed' || order.status === 'cancelled') {
            actionsHtml = `
                <button class="btn-view-detail" onclick="viewOrderDetail('${order.id}')">👁️ Xem</button>
            `;
        }

        return `
            <tr>
                <td><span class="order-id">${order.id}</span></td>
                <td><span class="order-type ${order.orderType}">${typeInfo.icon} ${typeInfo.text}</span></td>
                <td>${locationHtml}</td>
                <td><div class="order-items-list">${itemsHtml}</div></td>
                <td><span class="order-total">${formatPrice(order.total)}</span></td>
                <td><span class="order-time">${timeStr}</span></td>
                <td><span class="order-status ${order.status}">${statusInfo.icon} ${statusInfo.text}</span></td>
                <td><div class="order-actions">${actionsHtml}</div></td>
            </tr>
        `;
    }).join('');
}

function completeOrder(orderId) {
    if (confirm('Xác nhận hoàn thành đơn hàng này?')) {
        if (updateOrderStatus(orderId, 'completed')) {
            showToast('Đã hoàn thành đơn hàng!');
            loadStaffPage();
        }
    }
}

function cancelOrder(orderId) {
    if (confirm('Bạn có chắc muốn hủy đơn hàng này?')) {
        if (updateOrderStatus(orderId, 'cancelled')) {
            showToast('Đã hủy đơn hàng');
            loadStaffPage();
        }
    }
}

function viewOrderDetail(orderId) {
    const orders = getStoredOrders();
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        showToast('Không tìm thấy đơn hàng');
        return;
    }

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    const orderTypeLabels = {
        delivery: 'Giao hàng',
        takeaway: 'Mang đi',
        dinein: 'Tại chỗ'
    };

    const statusLabels = {
        pending: 'Chờ xử lý',
        preparing: 'Đang pha',
        ready: 'Sẵn sàng',
        delivering: 'Đang giao',
        completed: 'Hoàn thành',
        cancelled: 'Đã hủy'
    };

    const orderTime = new Date(order.createdAt).toLocaleString('vi-VN');

    // Items detail
    const itemsHtml = order.items.map(item => `
        <div class="order-detail-item">
            <div class="item-info">
                <div class="item-name">${item.name} x${item.quantity}</div>
                <div class="item-options">
                    Size ${item.size}, ${item.sugar} đường, ${item.ice}
                    ${item.toppings.length > 0 ? '<br>+ ' + item.toppings.join(', ') : ''}
                </div>
            </div>
            <div class="item-price">${formatPrice(item.totalPrice)}</div>
        </div>
    `).join('');

    // Location info
    let locationInfo = '';
    if (order.orderType === 'delivery') {
        locationInfo = `
            <div class="order-detail-row">
                <span>Địa chỉ:</span>
                <span>${order.deliveryAddress}</span>
            </div>
            <div class="order-detail-row">
                <span>Khoảng cách:</span>
                <span>${order.deliveryDistance} km</span>
            </div>
        `;
    } else if (order.orderType === 'dinein') {
        locationInfo = `
            <div class="order-detail-row">
                <span>Số bàn:</span>
                <span>${order.tableNumber}</span>
            </div>
            <div class="order-detail-row">
                <span>Tầng:</span>
                <span>${order.tableFloor || 'N/A'}</span>
            </div>
        `;
    } else if (order.orderType === 'takeaway') {
        locationInfo = `
            <div class="order-detail-row">
                <span>Cửa hàng:</span>
                <span>${order.storeName || 'N/A'}</span>
            </div>
        `;
    }

    modalBody.innerHTML = `
        <div class="order-detail-modal">
            <div class="order-detail-header">
                <span class="order-detail-id">${order.id}</span>
                <span class="order-status ${order.status}">${statusLabels[order.status]}</span>
            </div>

            <div class="order-detail-section">
                <h4>Thông tin đơn hàng</h4>
                <div class="order-detail-row">
                    <span>Loại đơn:</span>
                    <span>${orderTypeLabels[order.orderType]}</span>
                </div>
                <div class="order-detail-row">
                    <span>Thời gian:</span>
                    <span>${orderTime}</span>
                </div>
                <div class="order-detail-row">
                    <span>Khách hàng:</span>
                    <span>${order.customerName}</span>
                </div>
                ${order.customerPhone ? `
                <div class="order-detail-row">
                    <span>SĐT:</span>
                    <span>${order.customerPhone}</span>
                </div>
                ` : ''}
                ${locationInfo}
            </div>

            <div class="order-detail-section">
                <h4>Đồ uống</h4>
                <div class="order-detail-items">
                    ${itemsHtml}
                </div>
            </div>

            <div class="order-detail-section">
                <h4>Thanh toán</h4>
                <div class="order-detail-row">
                    <span>Tạm tính:</span>
                    <span>${formatPrice(order.subtotal)}</span>
                </div>
                ${order.shippingFee > 0 ? `
                <div class="order-detail-row">
                    <span>Phí giao hàng:</span>
                    <span>${formatPrice(order.shippingFee)}</span>
                </div>
                ` : ''}
                <div class="order-detail-row" style="font-weight: bold; font-size: 16px;">
                    <span>Tổng cộng:</span>
                    <span style="color: var(--primary-orange);">${formatPrice(order.total)}</span>
                </div>
                <div class="order-detail-row">
                    <span>Thanh toán:</span>
                    <span>${order.paymentMethod}</span>
                </div>
            </div>

            <button class="btn btn-secondary" onclick="closeProductModal()" style="width: 100%; margin-top: 16px;">Đóng</button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function refreshOrders() {
    loadStaffPage();
    showToast('Đã làm mới danh sách đơn hàng');
}

function clearAllOrders() {
    if (confirm('Bạn có chắc muốn xóa TẤT CẢ đơn hàng? Hành động này không thể hoàn tác!')) {
        localStorage.removeItem('mhn_orders');
        loadStaffPage();
        showToast('Đã xóa tất cả đơn hàng');
    }
}
