// Dữ liệu cho website Một Hà Nội Coffee and Tea

// Danh mục sản phẩm
const categories = [
    { id: 'ca-phe-phin', name: 'CÀ PHÊ PHIN', icon: '☕', nameEn: 'VIETNAMESE COFFEE' },
    { id: 'ca-phe-may', name: 'CÀ PHÊ MÁY', icon: '☕', nameEn: 'ITALIAN COFFEE' },
    { id: 'tra', name: 'TRÀ', icon: '🍵', nameEn: 'TEA' },
    { id: 'do-uong-khac', name: 'ĐỒ UỐNG KHÁC', icon: '🧋', nameEn: 'OTHERS' },
    { id: 'khong-caffein', name: 'ĐỒ UỐNG KHÔNG CAFFEIN', icon: '🌿', nameEn: 'NON-CAFFEINE' },
    { id: 'tra-sua', name: 'TRÀ SỮA', icon: '🥤', nameEn: 'MILK TEA' },
    { id: 'da-xay', name: 'ĐÁ XAY', icon: '🍹', nameEn: 'ICED BLEND' },
    { id: 'nuoc-ep', name: 'NƯỚC ÉP', icon: '🧃', nameEn: 'JUICE' }
];

// Sản phẩm
const products = [
    // CÀ PHÊ PHIN – VIETNAMESE COFFEE
    {
        id: 'cf-phin-001',
        name: 'Đen',
        nameEn: 'black coffee',
        category: 'ca-phe-phin',
        price: 40000,
        image: 'https://i.postimg.cc/nLqCRBDJ/Black-Coffee-500x500.webp',
        description: 'Cà phê đen truyền thống',
        bestseller: true,
        available: true
    },
    {
        id: 'cf-phin-002',
        name: 'Nâu',
        nameEn: 'brown coffee',
        category: 'ca-phe-phin',
        price: 45000,
        image: 'https://i.postimg.cc/63jwYpYw/download-(3).jpg',
        description: 'Cà phê nâu truyền thống',
        bestseller: false,
        available: true
    },
    {
        id: 'cf-phin-003',
        name: 'Bạc sỉu',
        nameEn: 'white coffee',
        category: 'ca-phe-phin',
        price: 49000,
        image: 'https://i.postimg.cc/5yQcgqX3/download-(4).jpg',
        description: 'Cà phê sữa nhiều sữa',
        bestseller: true,
        available: true
    },
    {
        id: 'cf-phin-004',
        name: 'Phố Huế',
        nameEn: 'cà phê phin kem mặn / salty cream coffee',
        category: 'ca-phe-phin',
        price: 49000,
        image: 'https://i.postimg.cc/SQYNDWbk/salt-coffee-480x480.webp',
        description: 'Cà phê phin với kem mặn thơm ngon',
        bestseller: false,
        available: true
    },

    // CÀ PHÊ MÁY – ITALIAN COFFEE
    {
        id: 'cf-may-001',
        name: 'Espresso',
        nameEn: 'Espresso',
        category: 'ca-phe-may',
        price: 40000,
        image: 'https://i.postimg.cc/0571zZqj/download-(5).jpg',
        description: 'Espresso đậm đà Ý',
        bestseller: false,
        available: true
    },
    {
        id: 'cf-may-002',
        name: 'Americano',
        nameEn: 'Americano',
        category: 'ca-phe-may',
        price: 40000,
        image: 'https://i.postimg.cc/FKqgXjW7/americano-2-280dc6f3f644483db59f71ad42975982.jpg',
        description: 'Americano thanh mát',
        bestseller: true,
        available: true
    },
    {
        id: 'cf-may-003',
        name: 'Mỹ Đình',
        nameEn: 'americano cam / orange americano',
        category: 'ca-phe-may',
        price: 49000,
        image: 'https://i.postimg.cc/X73KWN83/glass-iced-americano-black-coffee-600nw-1964261182.webp',
        description: 'Americano kết hợp cam tươi',
        bestseller: false,
        available: true
    },
    {
        id: 'cf-may-004',
        name: 'La Thành',
        nameEn: 'latte',
        category: 'ca-phe-may',
        price: 50000,
        image: 'https://i.postimg.cc/9MZT3swZ/download-(6).jpg',
        description: 'Latte mềm mịn',
        bestseller: true,
        available: true
    },
    {
        id: 'cf-may-005',
        name: 'Tràng Tiền',
        nameEn: 'cappuccino',
        category: 'ca-phe-may',
        price: 50000,
        image: 'https://i.postimg.cc/NMq9xbCt/images-(2).jpg',
        description: 'Cappuccino Ý truyền thống',
        bestseller: false,
        available: true
    },
    {
        id: 'cf-may-006',
        name: 'Long Biên',
        nameEn: 'mocha',
        category: 'ca-phe-may',
        price: 55000,
        image: 'https://i.postimg.cc/6qHpFhcv/images-(3).jpg',
        description: 'Mocha socola thơm ngon',
        bestseller: false,
        available: true
    },
    {
        id: 'cf-may-007',
        name: 'Mã Mây',
        nameEn: 'cà phê máy kem béo / creamy coffee',
        category: 'ca-phe-may',
        price: 55000,
        image: 'https://i.postimg.cc/bvQNqPLZ/images-(4).jpg',
        description: 'Cà phê máy với kem béo ngậy',
        bestseller: false,
        available: true
    },
    {
        id: 'cf-may-008',
        name: 'Hàng Muối',
        nameEn: 'cà phê caramel mặn / salted caramel latte',
        category: 'ca-phe-may',
        price: 55000,
        image: 'https://i.postimg.cc/mk6TmgZn/images-(5).jpg',
        description: 'Latte caramel mặn đặc biệt',
        bestseller: false,
        available: true
    },

    // TRÀ – TEA
    {
        id: 'tea-001',
        name: 'Hàng Vải',
        nameEn: 'trà vải hoa hồng / lychee rose tea',
        category: 'tra',
        price: 55000,
        image: 'https://i.postimg.cc/1zZsCTSH/c12e91424bb7a62c70db83fe6bb7e727.jpg',
        description: 'Trà vải hoa hồng thơm dịu',
        bestseller: true,
        available: true
    },
    {
        id: 'tea-002',
        name: 'Phan Đình Phùng',
        nameEn: 'trà táo xanh kiwi / green apple, kiwi tea',
        category: 'tra',
        price: 55000,
        image: 'https://i.postimg.cc/kX6Cn9XL/Tra-Kiwi-Tao-Xanh-55k-v.png',
        description: 'Trà táo xanh kiwi tươi mát',
        bestseller: false,
        available: true
    },
    {
        id: 'tea-003',
        name: 'Hàng Bông',
        nameEn: 'trà oolong kem phomai / oolong tea, creamcheese',
        category: 'tra',
        price: 50000,
        image: 'https://i.postimg.cc/C1rygr39/tra-oolong-kem-sua-1.jpg',
        description: 'Trà oolong với kem phô mai béo ngậy',
        bestseller: true,
        available: true
    },
    {
        id: 'tea-004',
        name: 'Nhà Thờ',
        nameEn: 'hồng trà chanh vàng / lemon black tea',
        category: 'tra',
        price: 50000,
        image: 'https://i.postimg.cc/Hxd5gB0d/images-(6).jpg',
        description: 'Hồng trà chanh vàng thanh mát',
        bestseller: false,
        available: true
    },
    {
        id: 'tea-005',
        name: 'Hàng Đào',
        nameEn: 'trà ổi hồng đào / peach, pink guava tea',
        category: 'tra',
        price: 55000,
        image: 'https://i.postimg.cc/YCFmLJ8T/toh2-620x620.jpg',
        description: 'Trà ổi hồng đào ngọt dịu',
        bestseller: true,
        available: true
    },
    {
        id: 'tea-006',
        name: 'Ngụy Như',
        nameEn: 'trà dâu rừng chanh vàng / wild-berries, lemon tea',
        category: 'tra',
        price: 58000,
        image: 'https://i.postimg.cc/fbBWVC4v/glass-strawberry-iced-tea-decorated-260nw-2679671989.webp',
        description: 'Trà dâu rừng chanh vàng chua ngọt',
        bestseller: false,
        available: true
    },
    {
        id: 'tea-007',
        name: 'Văn Miếu',
        nameEn: 'trà cam quế mật ong / orange, cinnamon, honey tea',
        category: 'tra',
        price: 55000,
        image: 'https://i.postimg.cc/XNZF0Gd6/que-voi-mat-ong3-1.jpg',
        description: 'Trà cam quế mật ong ấm áp',
        bestseller: false,
        available: true
    },
    {
        id: 'tea-008',
        name: 'Láng Hạ',
        nameEn: 'trà cam lựu đỏ / orange pomegranate tea',
        category: 'tra',
        price: 55000,
        image: 'https://i.postimg.cc/zGkHknZ4/z5569596208818-e870c13e01c6fa550f4d9a62c2318d33-e5af54417bc74078b1fd60a972751cc7.jpg',
        description: 'Trà cam lựu đỏ thanh mát',
        bestseller: false,
        available: true
    },

    // ĐỒ UỐNG KHÁC – OTHERS
    {
        id: 'other-001',
        name: 'Linh Lang',
        nameEn: 'matcha latte',
        category: 'do-uong-khac',
        price: 55000,
        image: 'https://i.postimg.cc/qvBv4SS7/images-(7).jpg',
        description: 'Matcha latte mịn màng',
        bestseller: true,
        available: true
    },
    {
        id: 'other-002',
        name: 'Đồng Xuân',
        nameEn: 'dâu sữa phomai / strawberry milkshake, creamcheese',
        category: 'do-uong-khac',
        price: 55000,
        image: 'https://i.postimg.cc/mrtZFMbk/images-(8).jpg',
        description: 'Sinh tố dâu sữa phô mai ngọt ngào',
        bestseller: false,
        available: true
    },
    {
        id: 'other-003',
        name: 'Văn Cao',
        nameEn: 'chocolate nóng / hot chocolate',
        category: 'do-uong-khac',
        price: 55000,
        image: 'https://i.postimg.cc/5yqfMSmm/hotchocolate7884316x9-1694402215554101599547.jpg',
        description: 'Chocolate nóng đậm đà',
        bestseller: false,
        available: true
    },
    {
        id: 'other-004',
        name: 'Trích Sài',
        nameEn: 'choco kem mặn / iced salty cream chocolate',
        category: 'do-uong-khac',
        price: 55000,
        image: 'https://i.postimg.cc/Qdnhstc6/images-(9).jpg',
        description: 'Chocolate đá với kem mặn thơm béo',
        bestseller: false,
        available: true
    },

    // ĐỒ UỐNG KHÔNG CAFFEIN – NON-CAFFEINE
    {
        id: 'non-caff-001',
        name: 'Âu Cơ',
        nameEn: 'trà hoa hồng kỷ tử táo đỏ / roses, jujube, goji berries tea',
        category: 'khong-caffein',
        price: 50000,
        image: 'https://i.postimg.cc/rscLgtLK/cong-dung-tra-hoa-hong.webp',
        description: 'Trà hoa hồng kỷ tử táo đỏ bổ dưỡng',
        bestseller: false,
        available: true
    },
    {
        id: 'non-caff-002',
        name: 'Tây Tựu',
        nameEn: 'trà hoa đậu biếc / butterfly pea tea',
        category: 'khong-caffein',
        price: 48000,
        image: 'https://i.postimg.cc/sDTR9XHx/download-(7).jpg',
        description: 'Trà hoa đậu biếc màu xanh tự nhiên',
        bestseller: true,
        available: true
    },
    {
        id: 'non-caff-003',
        name: 'Quán An',
        nameEn: 'trà lê gừng hoa cúc / pear, ginger, chamomile tea',
        category: 'khong-caffein',
        price: 48000,
        image: 'https://i.postimg.cc/Y9654qmW/images-(10).jpg',
        description: 'Trà lê gừng hoa cúc ấm áp',
        bestseller: false,
        available: true
    },
    {
        id: 'non-caff-004',
        name: 'Tứ Liên',
        nameEn: 'trà quất hồng bì / wampee, kumquat tea',
        category: 'khong-caffein',
        price: 48000,
        image: 'https://i.postimg.cc/GpYNNhzn/images-(11).jpg',
        description: 'Trà quất hồng bì thanh nhiệt',
        bestseller: false,
        available: true
    },

    // TRÀ SỮA – MILK TEA
    {
        id: 'milk-tea-001',
        name: 'Tam Trinh',
        nameEn: 'trà sữa oolong',
        category: 'tra-sua',
        price: 52000,
        image: 'https://i.postimg.cc/C5v6DZMV/images-(12).jpg',
        description: 'Trà sữa oolong thơm ngon',
        bestseller: true,
        available: true
    },
    {
        id: 'milk-tea-002',
        name: 'Bạch Mai',
        nameEn: 'trà nhài sữa',
        category: 'tra-sua',
        price: 52000,
        image: 'https://i.postimg.cc/4Nd0G1wQ/Cach-pha-tra-sua-hoa-nhai-ngon-la-mieng.jpg',
        description: 'Trà nhài sữa hương thơm dịu nhẹ',
        bestseller: false,
        available: true
    },
    {
        id: 'milk-tea-003',
        name: 'Hồng Mai',
        nameEn: 'hồng trà sữa',
        category: 'tra-sua',
        price: 52000,
        image: 'https://i.postimg.cc/XvM1w6W2/image-cong-thuc-cach-lam-hong-tra-sua-tran-chau-98e5e7f63797259790ec0d2e0d50ce08.webp',
        description: 'Hồng trà sữa trân châu truyền thống',
        bestseller: true,
        available: true
    },

    // ĐÁ XAY – ICED BLEND
    {
        id: 'ice-blend-001',
        name: 'Xuân Diệu',
        nameEn: 'sữa chua dâu tây / strawberry yogurt',
        category: 'da-xay',
        price: 62000,
        image: 'https://i.postimg.cc/90NJ0v17/sua-chua-dau-tay-1.webp',
        description: 'Sữa chua dâu tây xay đá mát lạnh',
        bestseller: true,
        available: true
    },
    {
        id: 'ice-blend-002',
        name: 'Đào Tấn',
        nameEn: 'sữa chua đào / peach yogurt',
        category: 'da-xay',
        price: 62000,
        image: 'https://i.postimg.cc/1zcBwgMM/sua-chu-dao-17a43aa5e0604202bdd01aae1004c9a9-grande.jpg',
        description: 'Sữa chua đào xay đá thơm ngon',
        bestseller: false,
        available: true
    },
    {
        id: 'ice-blend-003',
        name: 'Hồng Hà',
        nameEn: 'sữa chua ổi hồng / pink guava yogurt',
        category: 'da-xay',
        price: 62000,
        image: 'https://i.postimg.cc/bN79505N/dd.jpg',
        description: 'Sữa chua ổi hồng xay đá tươi mát',
        bestseller: false,
        available: true
    },
    {
        id: 'ice-blend-004',
        name: 'Nguyễn Hữu Huân',
        nameEn: 'chocolate đá xay / ice-blended chocolate',
        category: 'da-xay',
        price: 60000,
        image: 'https://i.postimg.cc/cCKf96M1/r-E9403LR48Cl-chocolate-da-xay-1.jpg',
        description: 'Chocolate đá xay mát lạnh',
        bestseller: false,
        available: true
    },
    {
        id: 'ice-blend-005',
        name: 'Thanh Niên',
        nameEn: 'trà xoài kem phomai / mango tea, creamcheese',
        category: 'da-xay',
        price: 62000,
        image: 'https://i.postimg.cc/kgNKh08F/yuan2879fe5b272d36c2f56b3f1233180e6b-16254084979171990223794.jpg',
        description: 'Trà xoài kem phô mai xay đá',
        bestseller: true,
        available: true
    },

    // NƯỚC ÉP – JUICE
    {
        id: 'juice-001',
        name: 'Nước cam',
        nameEn: 'orange juice',
        category: 'nuoc-ep',
        price: 50000,
        image: 'https://i.postimg.cc/c6ytFhL7/images-(13).jpg',
        description: 'Nước cam tươi nguyên chất',
        bestseller: true,
        available: true
    },
    {
        id: 'juice-002',
        name: 'Nước chanh',
        nameEn: 'lemonade',
        category: 'nuoc-ep',
        price: 45000,
        image: 'https://i.postimg.cc/Z5mVRFxV/images-(14).jpg',
        description: 'Nước chanh tươi mát lạnh',
        bestseller: false,
        available: true
    },
    {
        id: 'juice-003',
        name: 'Nước chanh leo',
        nameEn: 'passion fruit juice',
        category: 'nuoc-ep',
        price: 50000,
        image: 'https://i.postimg.cc/FRYxqPh4/images-(15).jpg',
        description: 'Nước chanh leo chua ngọt tự nhiên',
        bestseller: true,
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
        image: 'https://i.postimg.cc/65ZMB6FZ/517760509-725183770435843-2038087727935372204-n.jpg',
        title: 'Giảm Ngay 50% - Mở App Quét ShopeePay',
        subtitle: 'Quét mã QR tại cửa hàng để nhận ưu đãi',
        link: '/rewards'
    },
    {
        id: 'bn002',
        image: 'https://i.postimg.cc/PJQNMwPY/487081020-640369098917311-5893920963212496051-n-(1).jpg',
        title: 'Mua 1 Tặng 1 - Seasonal Menu',
        subtitle: 'Áp dụng cho menu theo mùa - Thời gian có hạn',
        link: '/order'
    },
    {
        id: 'bn003',
        image: 'https://i.postimg.cc/tgvcYSk3/469504890-560784770209078-4740887756172172189-n.jpg',
        title: 'Tích Điểm Nhận Quà - Đăng Ký Ngay',
        subtitle: 'Trở thành thành viên để nhận ưu đãi đặc biệt',
        link: '/rewards'
    }
];

// Promo Cards
const promoCards = [
    {
        id: 'pc001',
        image: 'https://i.postimg.cc/65ZMB6FZ/517760509-725183770435843-2038087727935372204-n.jpg',
        badge: 'Cập nhật từ Nhà',
        badgeEn: 'New Update',
        title: 'Giảm Ngay 50% - Mở App Quét ShopeePay',
        titleEn: '50% OFF - Scan ShopeePay',
        date: '24/01/2025'
    },
    {
        id: 'pc002',
        image: 'https://i.postimg.cc/PJQNMwPY/487081020-640369098917311-5893920963212496051-n-(1).jpg',
        badge: 'Khuyến Mãi Hot',
        badgeEn: 'Hot Deal',
        title: 'Mua 1 Tặng 1 - Seasonal Menu',
        titleEn: 'Buy 1 Get 1 - Seasonal Menu',
        date: '24/01/2025'
    },
    {
        id: 'pc003',
        image: 'https://i.postimg.cc/tgvcYSk3/469504890-560784770209078-4740887756172172189-n.jpg',
        badge: 'Thành Viên',
        badgeEn: 'Member',
        title: 'Tích Điểm Nhận Quà - Đăng Ký Ngay',
        titleEn: 'Earn Points Get Rewards - Join Now',
        date: '24/01/2025'
    }
];

// Stores
const stores = [
    {
        id: 'st001',
        name: 'Một Hà Nội Coffee and Tea',
        nameEn: 'Mot Ha Noi Coffee and Tea',
        address: '104 Mai Anh Tuấn, Đống Đa, Hà Nội (Hồ Hoàng Cầu)',
        addressEn: '104 Mai Anh Tuan, Dong Da, Hanoi (Hoang Cau Lake)',
        phone: '096.9988.562',
        hours: '8:00 - 3:00 (sáng)',
        status: 'open',
        distance: '',
        description: 'Quán cà phé học bài, làm việc & trò chuyện nhẹ nhàng, mở đêm ở Đống Đa',
        descriptionEn: 'Cozy coffee shop for studying, working & chatting, open late in Dong Da',
        features: [
            '🎤 Open Mic hàng tuần',
            '🔮 Xem Tarot miễn phí hàng tuần',
            '📚 Không gian học bài, làm việc',
            '🌙 Mở cửa đến 3h sáng'
        ],
        social: {
            instagram: '@mothanoi.coffeeandtea',
            tiktok: '@mothanoi.coffeeandtea',
            tiktokDaily: '@mothanoi.daily'
        },
        lat: 21.0153,
        lng: 105.8227,
        image: 'images/store1.jpg'
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
