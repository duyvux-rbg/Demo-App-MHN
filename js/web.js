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
    // Load selected address
    const addressSelected = document.getElementById('addressSelected');
    if (currentUser && currentUser.addresses.length > 0) {
        const defaultAddress = currentUser.addresses.find(a => a.isDefault) || currentUser.addresses[0];
        addressSelected.innerHTML = `
            <p><strong>${defaultAddress.name}</strong> | ${defaultAddress.phone}</p>
            <p>${defaultAddress.address}</p>
            <button class="btn-change" onclick="navigateToPage('addresses')">Thay đổi</button>
        `;
    } else {
        addressSelected.innerHTML = `
            <p>Chưa có địa chỉ giao hàng</p>
            <button class="btn-change" onclick="navigateToPage('addresses')">Thêm địa chỉ</button>
        `;
    }

    // Load order summary
    const checkoutSummary = document.getElementById('checkoutSummary');
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const shipping = 20000;
    const discount = 0;
    const total = subtotal + shipping - discount;

    checkoutSummary.innerHTML = `
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
    `;
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
    // Cart button
    document.getElementById('btnCart').addEventListener('click', () => {
        navigateToPage('cart');
    });

    // WiFi button
    document.getElementById('btnWifi').addEventListener('click', () => {
        openWifiModal();
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

    if (!currentUser || currentUser.addresses.length === 0) {
        showToast('Vui lòng thêm địa chỉ giao hàng');
        navigateToPage('addresses');
        return;
    }

    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
        showToast('Vui lòng chọn phương thức thanh toán');
        return;
    }

    // Show loading
    showLoading();

    // Simulate order processing
    setTimeout(() => {
        hideLoading();

        // Clear cart
        cart = [];
        updateCartBadge();

        // Show success
        showToast('Đặt hàng thành công!');

        // Navigate to order history
        navigateToPage('order-history');
    }, 2000);
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
document.getElementById('homeSearchInput')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length >= 2) {
        // TODO: Implement search functionality
        console.log('Searching for:', query);
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
