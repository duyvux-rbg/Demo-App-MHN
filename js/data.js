// Dữ liệu cho website Một Hà Nội Coffee and Tea

// Danh mục sản phẩm
const categories = [
    { id: 'coffee', name: 'Cà phê', icon: '☕', nameEn: 'Coffee' },
    { id: 'tea', name: 'Trà', icon: '🍵', nameEn: 'Tea' },
    { id: 'matcha', name: 'Matcha', icon: '🧋', nameEn: 'Matcha' },
    { id: 'milk-tea', name: 'Trà sữa', icon: '🥤', nameEn: 'Milk Tea' },
    { id: 'fruit-tea', name: 'Trà trái cây', icon: '🍹', nameEn: 'Fruit Tea' },
    { id: 'cake', name: 'Bánh ngọt', icon: '🍰', nameEn: 'Cake' },
    { id: 'topping', name: 'Topping', icon: '➕', nameEn: 'Topping' }
];

// Sản phẩm
const products = [
    // Cà phê
    {
        id: 'cf001',
        name: 'Cà Phê Sữa Đá',
        nameEn: 'Iced Milk Coffee',
        category: 'coffee',
        price: 39000,
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
        description: 'Cà phê phin truyền thống pha với sữa đặc',
        bestseller: true,
        available: true
    },
    {
        id: 'cf002',
        name: 'Cà Phê Đen Đá',
        nameEn: 'Iced Black Coffee',
        category: 'coffee',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
        description: 'Cà phê phin nguyên chất',
        bestseller: false,
        available: true
    },
    {
        id: 'cf003',
        name: 'Bạc Xỉu',
        nameEn: 'Bac Xiu',
        category: 'coffee',
        price: 42000,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
        description: 'Cà phê sữa nhiều sữa, ít cà phê',
        bestseller: true,
        available: true
    },
    {
        id: 'cf004',
        name: 'Cappuccino',
        nameEn: 'Cappuccino',
        category: 'coffee',
        price: 49000,
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
        description: 'Espresso, sữa tươi và bọt sữa mịn',
        bestseller: false,
        available: true
    },

    // Matcha
    {
        id: 'mt001',
        name: 'Matcha Tây Bắc Yuzu',
        nameEn: 'Tay Bac Matcha Yuzu',
        category: 'matcha',
        price: 59000,
        image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=400',
        description: 'Matcha Tây Bắc kết hợp yuzu tươi mát',
        bestseller: true,
        mustTry: true,
        available: true
    },
    {
        id: 'mt002',
        name: 'Matcha Đá Xay',
        nameEn: 'Matcha Frappe',
        category: 'matcha',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
        description: 'Matcha xay với đá và kem tươi',
        bestseller: true,
        available: true
    },
    {
        id: 'mt003',
        name: 'Matcha Latte',
        nameEn: 'Matcha Latte',
        category: 'matcha',
        price: 52000,
        image: 'https://images.unsplash.com/photo-1536013564361-f4c82d717d7e?w=400',
        description: 'Matcha pha với sữa tươi nóng',
        bestseller: false,
        available: true
    },

    // Trà
    {
        id: 'tea001',
        name: 'Trà Olong Tứ Quý Yuzu',
        nameEn: 'Oolong Tea Yuzu',
        category: 'tea',
        price: 59000,
        image: 'https://images.unsplash.com/photo-1597318112787-f8b90f8dbdcc?w=400',
        description: 'Trà olong hảo hạng với yuzu Nhật Bản',
        bestseller: true,
        mustTry: true,
        available: true
    },
    {
        id: 'tea002',
        name: 'Trà Đào Cam Sả',
        nameEn: 'Peach Orange Lemongrass Tea',
        category: 'fruit-tea',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1556881261-8e5a6ae6b4ad?w=400',
        description: 'Trà trái cây thanh mát với đào, cam và sả',
        bestseller: true,
        available: true
    },
    {
        id: 'tea003',
        name: 'Trá Vải',
        nameEn: 'Lychee Tea',
        category: 'fruit-tea',
        price: 52000,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
        description: 'Trà vải thơm ngon, mát lạnh',
        bestseller: false,
        available: true
    },

    // Trà sữa
    {
        id: 'mktea001',
        name: 'Trà Sữa Trân Châu Đường Đen',
        nameEn: 'Brown Sugar Bubble Milk Tea',
        category: 'milk-tea',
        price: 49000,
        image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400',
        description: 'Trà sữa với trân châu đường đen thơm ngon',
        bestseller: true,
        available: true
    },
    {
        id: 'mktea002',
        name: 'Trà Sữa Olong',
        nameEn: 'Oolong Milk Tea',
        category: 'milk-tea',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1558857563-b101ca14d66c?w=400',
        description: 'Trà sữa olong truyền thống',
        bestseller: false,
        available: true
    },

    // Bánh
    {
        id: 'cake001',
        name: 'Bánh Tiramisu',
        nameEn: 'Tiramisu Cake',
        category: 'cake',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
        description: 'Bánh Tiramisu Ý mềm mịn',
        bestseller: true,
        available: true
    },
    {
        id: 'cake002',
        name: 'Bánh Mousse Matcha',
        nameEn: 'Matcha Mousse Cake',
        category: 'cake',
        price: 48000,
        image: 'https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400',
        description: 'Bánh mousse matcha béo ngậy',
        bestseller: false,
        available: true
    },
    {
        id: 'cake003',
        name: 'Bánh Croissant',
        nameEn: 'Croissant',
        category: 'cake',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
        description: 'Bánh sừng bò giòn tan',
        bestseller: false,
        available: true
    }
];

// Topping
const toppings = [
    { id: 'top001', name: 'Trân châu', nameEn: 'Tapioca Pearls', price: 10000 },
    { id: 'top002', name: 'Thạch', nameEn: 'Jelly', price: 10000 },
    { id: 'top003', name: 'Pudding', nameEn: 'Pudding', price: 10000 },
    { id: 'top004', name: 'Trân châu hoàng kim', nameEn: 'Golden Pearls', price: 12000 },
    { id: 'top005', name: 'Kem cheese', nameEn: 'Cheese Foam', price: 15000 }
];

// Size options
const sizes = [
    { id: 'S', name: 'Nhỏ', nameEn: 'Small', priceAdjust: -10000 },
    { id: 'M', name: 'Vừa', nameEn: 'Medium', priceAdjust: 0, default: true },
    { id: 'L', name: 'Lớn', nameEn: 'Large', priceAdjust: 10000 }
];

// Sugar options
const sugarLevels = [
    { id: '0', name: '0%', nameEn: '0%' },
    { id: '30', name: '30%', nameEn: '30%' },
    { id: '50', name: '50%', nameEn: '50%', default: true },
    { id: '70', name: '70%', nameEn: '70%' },
    { id: '100', name: '100%', nameEn: '100%' }
];

// Ice options
const iceLevels = [
    { id: 'none', name: 'Không đá', nameEn: 'No Ice' },
    { id: 'less', name: 'Ít đá', nameEn: 'Less Ice', default: true },
    { id: 'normal', name: 'Bình thường', nameEn: 'Normal Ice' },
    { id: 'more', name: 'Nhiều đá', nameEn: 'More Ice' }
];

// Vouchers
const vouchers = [
    {
        id: 'vc001',
        code: 'XMAS25',
        title: 'GIẢM 40% LY THỨ 2 + FREESHIP',
        titleEn: '40% OFF 2ND DRINK + FREE SHIP',
        description: 'Áp dụng cho BST Party. HSD: 31/12/2024',
        descriptionEn: 'Apply for Party Collection. Exp: 31/12/2024',
        discount: 40,
        type: 'percentage',
        minOrder: 100000,
        maxDiscount: 50000,
        expiry: '2024-12-31',
        category: 'promo'
    },
    {
        id: 'vc002',
        code: 'BUYONE',
        title: 'MUA 1 TẶNG 1',
        titleEn: 'BUY 1 GET 1',
        description: 'Áp dụng cho Yuzu/Matcha. HSD: 28/02/2025',
        descriptionEn: 'Apply for Yuzu/Matcha. Exp: 28/02/2025',
        discount: 50,
        type: 'percentage',
        minOrder: 0,
        maxDiscount: 60000,
        expiry: '2025-02-28',
        category: 'promo'
    },
    {
        id: 'vc003',
        code: 'SHOPEE50',
        title: 'GIẢM 50K - SHOPEEPAY',
        titleEn: '50K OFF - SHOPEEPAY',
        description: 'Quét ShopeePay để thanh toán. HSD: 31/01/2025',
        descriptionEn: 'Scan ShopeePay to pay. Exp: 31/01/2025',
        discount: 50000,
        type: 'fixed',
        minOrder: 100000,
        maxDiscount: 50000,
        expiry: '2025-01-31',
        category: 'payment'
    },
    {
        id: 'vc004',
        code: 'FREESHIP',
        title: 'FREESHIP 0Đ',
        titleEn: 'FREE SHIPPING',
        description: 'Miễn phí giao hàng mọi đơn. HSD: 15/02/2025',
        descriptionEn: 'Free delivery all orders. Exp: 15/02/2025',
        discount: 20000,
        type: 'shipping',
        minOrder: 0,
        maxDiscount: 20000,
        expiry: '2025-02-15',
        category: 'shipping'
    }
];

// Banners
const banners = [
    {
        id: 'bn001',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200',
        title: 'GIẢM 40% LY THỨ 2 + FREESHIP',
        subtitle: 'Mã: XMAS25 - Áp dụng cho BST Party',
        link: '/order?promo=XMAS25'
    },
    {
        id: 'bn002',
        image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=1200',
        title: 'MUA 1 TẶNG 1 YUZU/MATCHA',
        subtitle: 'Áp dụng cho tất cả size - Thời gian có hạn',
        link: '/order?category=matcha'
    },
    {
        id: 'bn003',
        image: 'https://images.unsplash.com/photo-1556881261-8e5a6ae6b4ad?w=1200',
        title: 'GIẢM 50K KHI THANH TOÁN SHOPEEPAY',
        subtitle: 'Quét mã QR tại cửa hàng để nhận ưu đãi',
        link: '/rewards'
    }
];

// Promo Cards
const promoCards = [
    {
        id: 'pc001',
        image: 'https://images.unsplash.com/photo-1556881261-8e5a6ae6b4ad?w=600',
        badge: 'Cập nhật từ Nhà',
        badgeEn: 'New Update',
        title: 'Giảm Ngay 50% - Mở App Quét ShopeePay',
        titleEn: '50% OFF - Scan ShopeePay',
        date: '21/01/2025'
    },
    {
        id: 'pc002',
        image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=600',
        badge: 'Khuyến Mãi Hot',
        badgeEn: 'Hot Deal',
        title: 'Mua 1 Tặng 1 - Collection Matcha',
        titleEn: 'Buy 1 Get 1 - Matcha Collection',
        date: '20/01/2025'
    },
    {
        id: 'pc003',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600',
        badge: 'Thành Viên',
        badgeEn: 'Member',
        title: 'Tích Điểm Nhận Quà - Đăng Ký Ngay',
        titleEn: 'Earn Points Get Rewards - Join Now',
        date: '19/01/2025'
    }
];

// Stores
const stores = [
    {
        id: 'st001',
        name: 'Một Hà Nội - Nhân Chính',
        nameEn: 'Mot Ha Noi - Nhan Chinh',
        address: 'Trường THPT Nhân Chính - Hoàng Đạo Thúy, Thanh Xuân, Hà Nội',
        addressEn: 'Nhan Chinh High School - Hoang Dao Thuy, Thanh Xuan, Hanoi',
        phone: '024 1234 5678',
        hours: '7:00 - 22:00',
        status: 'open',
        distance: '1.2km',
        lat: 20.9947,
        lng: 105.8038,
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600'
    },
    {
        id: 'st002',
        name: 'Một Hà Nội - Hồ Gươm',
        nameEn: 'Mot Ha Noi - Hoan Kiem',
        address: '52 Lý Thái Tổ, Hoàn Kiếm, Hà Nội',
        addressEn: '52 Ly Thai To, Hoan Kiem, Hanoi',
        phone: '024 2345 6789',
        hours: '6:30 - 23:00',
        status: 'open',
        distance: '3.5km',
        lat: 21.0285,
        lng: 105.8542,
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600'
    },
    {
        id: 'st003',
        name: 'Một Hà Nội - Cầu Giấy',
        nameEn: 'Mot Ha Noi - Cau Giay',
        address: '234 Trần Duy Hưng, Cầu Giấy, Hà Nội',
        addressEn: '234 Tran Duy Hung, Cau Giay, Hanoi',
        phone: '024 3456 7890',
        hours: '7:00 - 22:30',
        status: 'closed',
        distance: '2.8km',
        lat: 21.0136,
        lng: 105.7936,
        image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600'
    }
];

// Membership tiers
const membershipTiers = [
    { id: 'new', name: 'Mới', nameEn: 'New', minPoints: 0, color: '#999999' },
    { id: 'bronze', name: 'Đồng', nameEn: 'Bronze', minPoints: 100, color: '#CD7F32' },
    { id: 'silver', name: 'Bạc', nameEn: 'Silver', minPoints: 500, color: '#C0C0C0' },
    { id: 'gold', name: 'Vàng', nameEn: 'Gold', minPoints: 1000, color: '#FFD700' },
    { id: 'diamond', name: 'Kim Cương', nameEn: 'Diamond', minPoints: 5000, color: '#B9F2FF' }
];

// Rewards for point exchange
const rewards = [
    {
        id: 'rw001',
        name: 'Voucher giảm 50K',
        nameEn: '50K Discount Voucher',
        points: 500,
        image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400',
        description: 'Áp dụng cho đơn hàng từ 100K',
        descriptionEn: 'Apply for orders from 100K'
    },
    {
        id: 'rw002',
        name: 'Ly thủy tinh cao cấp',
        nameEn: 'Premium Glass Cup',
        points: 800,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400',
        description: 'Ly thủy tinh thương hiệu Một Hà Nội',
        descriptionEn: 'Mot Ha Noi branded glass cup'
    },
    {
        id: 'rw003',
        name: 'Tote bag canvas',
        nameEn: 'Canvas Tote Bag',
        points: 1000,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400',
        description: 'Túi vải canvas độc quyền',
        descriptionEn: 'Exclusive canvas tote bag'
    },
    {
        id: 'rw004',
        name: 'Voucher giảm 100K',
        nameEn: '100K Discount Voucher',
        points: 1500,
        image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400',
        description: 'Áp dụng cho đơn hàng từ 200K',
        descriptionEn: 'Apply for orders from 200K'
    }
];

// Sample user (for demo)
let currentUser = {
    id: 'user001',
    name: 'Nguyễn Văn A',
    phone: '0987654321',
    email: 'nguyenvana@example.com',
    birthday: '1990-01-01',
    gender: 'male',
    points: 1250,
    tier: 'gold',
    addresses: [
        {
            id: 'addr001',
            label: 'Nhà riêng',
            labelEn: 'Home',
            name: 'Nguyễn Văn A',
            phone: '0987654321',
            address: '123 Đường ABC, Quận XYZ, Hà Nội',
            isDefault: true
        }
    ],
    savedVouchers: ['vc001', 'vc002'],
    orderHistory: []
};

// Shopping cart
let cart = [];

// Current order
let currentOrder = null;
