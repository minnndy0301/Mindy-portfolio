import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Search, 
  Plus, 
  FileText, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  MapPin, 
  Camera, 
  Video, 
  Globe, 
  ShoppingBag, 
  Package, 
  CheckCircle, 
  Star, 
  Filter, 
  SlidersHorizontal, 
  Calendar, 
  CreditCard, 
  Bell, 
  Ticket, 
  Receipt, 
  Settings, 
  ShoppingCart, 
  Trash2, 
  MessageCircle, 
  Send, 
  Clock, 
  AlertCircle, 
  Check, 
  Lock, 
  Mail, 
  LogOut, 
  Truck, 
  Hand, 
  RotateCcw, 
  ArchiveRestore, 
  Flame, 
  Tent, 
  Gamepad2, 
  Watch, 
  Music, 
  Smartphone 
} from 'lucide-react';

// --- Mock Data & Translations ---

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Sony A7IV 專業相機組',
    category: 'camera',
    price: 1200,
    deposit: 5000,
    rating: 4.9,
    reviews: 28,
    period: 'day',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=800',
      'https://img1.momoshop.com.tw/expertimg/0009/606/324/mobile/969.jpg?t=1717393540751'
    ],
    video: null,
    location: '台北市',
    owner: '陳小明',
    avatar: 'https://i.pravatar.cc/150?u=1'
  },
  {
    id: 2,
    name: 'Dyson Supersonic 吹風機',
    category: 'clothes',
    price: 200,
    deposit: 1000,
    rating: 4.7,
    reviews: 15,
    period: 'day',
    images: [
      'https://img.91app.com/webapi/imagesV3/Original/SalePage/8784201/2/638999262187970000?v=1',
      'https://img4.momoshop.com.tw/expertimg/0014/304/428/mobile/5.jpg?t=1764559535134'
    ],
    video: null,
    location: '台中市',
    owner: '林美美',
    avatar: 'https://i.pravatar.cc/150?u=2'
  },
  {
    id: 3,
    name: 'Nintendo Switch OLED 版',
    category: 'game',
    price: 350,
    deposit: 2000,
    rating: 5.0,
    reviews: 42,
    period: 'day',
    images: [
      'https://www.nintendo.com/tw/hardware/detail/switch-oled/img/01-bgdark/pic_overview_display.jpg'
    ],
    video: null,
    location: '高雄市',
    owner: '王大同',
    avatar: 'https://i.pravatar.cc/150?u=3'
  },
  {
    id: 4,
    name: '露營帳篷 (4人)',
    category: 'camping',
    price: 800,
    deposit: 3000,
    rating: 4.5,
    reviews: 8,
    period: 'day',
    images: [
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800'
    ],
    video: null,
    location: '新北市',
    owner: 'Outdoor Life',
    avatar: 'https://i.pravatar.cc/150?u=4'
  }
];

// Additional Mock Data for Camping
const CAMPING_RECOMMENDATIONS = [
  {
    id: 10,
    name: 'Coleman 輕量折疊椅',
    category: 'camping',
    price: 150,
    deposit: 800,
    rating: 4.8,
    reviews: 56,
    period: 'day',
    images: ['https://i2.momoshop.com.tw/1693173436/goodsimg/0009/967/273/9967273_R.webp'],
    location: '新竹市',
    owner: '露營趣',
    avatar: 'https://i.pravatar.cc/150?u=10'
  },
  {
    id: 11,
    name: '鋁合金蛋捲桌 (大)',
    category: 'camping',
    price: 250,
    deposit: 1500,
    rating: 4.6,
    reviews: 33,
    period: 'day',
    images: ['https://pcm.trplus.com.tw/1000x1000/sys-master/productImages/h77/h59/12278099640350/000000000016795996-gallery-01-20240809145138344.jpg'],
    location: '新北市',
    owner: '山野玩家',
    avatar: 'https://i.pravatar.cc/150?u=11'
  },
  {
    id: 12,
    name: '羽絨睡袋 (-5度C)',
    category: 'camping',
    price: 300,
    deposit: 2000,
    rating: 4.9,
    reviews: 12,
    period: 'day',
    images: ['https://contents.mediadecathlon.com/p2585131/k$3f39bed785d23c53973c59bc88b22198/5-c-%E5%90%88%E6%88%90%E7%BA%96%E7%B6%AD%E5%A4%9A%E6%97%A5%E7%99%BB%E5%B1%B1%E7%9D%A1%E8%A2%8B-mt500-simond-8799902.jpg?f=1024x0&format=auto'],
    location: '台中市',
    owner: '戶外達人',
    avatar: 'https://i.pravatar.cc/150?u=12'
  },
  {
    id: 13,
    name: 'Iwatani 卡式爐',
    category: 'camping',
    price: 100,
    deposit: 500,
    rating: 4.7,
    reviews: 88,
    period: 'day',
    images: ['https://img.pchome.com.tw/cs/items/DEBQOUA900BS6IC/000007_1652156967.jpg'],
    location: '台北市',
    owner: '好野人',
    avatar: 'https://i.pravatar.cc/150?u=13'
  },
  {
    id: 14,
    name: '復古露營燈 (LED)',
    category: 'camping',
    price: 80,
    deposit: 400,
    rating: 4.5,
    reviews: 24,
    period: 'day',
    images: ['https://i2.momoshop.com.tw/1692564214/goodsimg/0011/682/369/11682369_R.webp'],
    location: '台南市',
    owner: '慢活森旅',
    avatar: 'https://i.pravatar.cc/150?u=14'
  }
];

const MOCK_CHATS = [
  {
    id: 1,
    owner: '林美美',
    avatar: 'https://i.pravatar.cc/150?u=2',
    lastMessage: '請問這個還有空檔嗎？',
    time: '10:30',
    unread: 2,
    productName: 'Dyson Supersonic 吹風機',
    productImage: 'https://img.91app.com/webapi/imagesV3/Original/SalePage/8784201/2/638999262187970000?v=1',
    price: 200
  },
  {
    id: 2,
    owner: '王大同',
    avatar: 'https://i.pravatar.cc/150?u=3',
    lastMessage: '好的，那我們約捷運站面交',
    time: '昨天',
    unread: 0,
    productName: 'Nintendo Switch OLED 版',
    productImage: 'https://i1.momoshop.com.tw/1693151896/goodsimg/0009/750/941/9750941_R.webp',
    price: 350
  }
];

const INITIAL_ORDERS = [
  { 
    id: 101, 
    type: 'rental',
    name: 'GoPro Hero 10', 
    status: 'renting', 
    endDate: '2023/10/25',
    price: 350,
    image: 'https://img.pchome.com.tw/cs/items/DGCN36A900HBQJT/000007_1710991553.jpg' 
  },
  { 
    id: 102, 
    type: 'rental',
    name: 'Marshall 藍芽喇叭', 
    status: 'completed',
    endDate: '2023/09/15',
    price: 150,
    image: 'https://img.91app.com/webapi/imagesV3/Original/SalePage/11307131/0/638992677917230000?v=1'
  },
  { 
    id: 103, 
    type: 'rental',
    name: 'Canon R6 機身', 
    status: 'pending', 
    endDate: '2023/11/01',
    price: 1500,
    image: 'https://i3.momoshop.com.tw/1762183689/goodsimg/0012/306/665/12306665_R.webp'
  },
  { 
    id: 104, 
    type: 'rental',
    name: 'Snow Peak 帳篷', 
    status: 'unpaid', 
    endDate: '2023/11/05',
    price: 800,
    image: 'https://i1.momoshop.com.tw/1692719707/goodsimg/0006/961/328/6961328_R.webp'
  },
  { 
    id: 105, 
    type: 'rental',
    name: 'GoPro 配件組', 
    status: 'unpaid', 
    endDate: '2023/11/10',
    price: 100,
    image: 'https://img.pchome.com.tw/cs/items/DGCN3A1900J9L28/000007_1764608419.jpg'
  },
  { 
    id: 201, 
    type: 'item',
    name: 'Nintendo Switch', 
    status: 'invite', 
    endDate: '2023/10/28',
    price: 350,
    image: 'https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/b2b/newItem/2025/06/12/2532_104102303_491_mainCoverImage1.jpg'
  },
  { 
    id: 202, 
    type: 'item',
    name: 'Dyson 吹風機', 
    status: 'renting_out', 
    endDate: '2023/10/30',
    price: 200,
    image: 'https://img.pchome.com.tw/cs/items/DECB0ZA900FCN4B/000001_1730771828.jpg'
  },
  { 
    id: 203, 
    type: 'item',
    name: 'Apple Watch S8', 
    status: 'returned', 
    endDate: '2023/09/20',
    price: 120,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=200'
  }
];

const TRANSLATIONS = {
  'zh-TW': {
    welcome: '歡迎回來，\n今天想租什麼？',
    searchPlaceholder: '搜尋相機、露營用品...',
    home: '首頁',
    search: '搜尋',
    orders: '訂單',
    profile: '我的',
    rentNow: '確定租用',
    bookNow: '立即預約',
    addToCart: '加入預約',
    askOwner: '物件詢問',
    pricePerDay: '元 / 天',
    addProduct: '新增租賃產品',
    productName: '產品名稱',
    price: '租金價格 (元/天)',
    deposit: '押金',
    uploadImages: '上傳照片 (多張)',
    uploadVideo: '上傳影片 (選填)',
    cancel: '取消',
    publish: '發佈產品',
    myOrders: '我的訂單',
    settings: '設定',
    language: '語言 / Language',
    rentSuccess: '預約成功！請至訂單查看',
    askSuccess: '已開啟對話！',
    noResults: '找不到相關產品',
    filters: '篩選條件',
    category: '分類',
    priceRange: '價格範圍',
    personalProfile: '個人檔案',
    paymentMethods: '付款方式',
    notifications: '通知總覽',
    coupons: '優惠券',
    transactions: '交易支付',
    memberSince: '加入於 2023',
    rentalsCount: '租借次數',
    listingsCount: '刊登數量',
    rating: '評分',
    newArrival: '新品上市',
    bannerTitle: '夏日露營\n裝備特輯',
    check: '查看',
    recommended: '為您推薦',
    searchResults: '搜尋結果',
    cart: '預約清單',
    cartEmpty: '預約清單是空的',
    confirmBooking: '確定預約',
    addedToCart: '已加入清單',
    total: '總計',
    productDetails: '產品細節',
    messages: '訊息',
    typeMessage: '輸入訊息...',
    send: '發送',
    myRentals: '我的租借',
    myItems: '我的物品',
    rentedUntil: '租借至',
    status_pending: '預約申請中',
    status_unpaid: '尚未付款',
    status_renting: '租借中',
    status_completed: '已完成',
    status_invite: '預約邀請',
    status_renting_out: '出租中',
    status_returned: '已歸還',
    confirmRentalAction: '確定租借',
    selectReturnDate: '選擇歸還日期',
    confirm: '確定',
    rentalTotal: '預計總額',
    days: '天',
    rentalConfirmedPrefix: '我確定要租借到',
    totalPrice: '總金額',
    login: '登入',
    username: '帳號',
    password: '密碼',
    welcomeBackSimple: '歡迎回來',
    logout: '登出帳號',
    acceptInvite: '接受預約',
    enterRentalPeriod: '輸入租借期間',
    startDate: '開始日期',
    endDate: '結束日期',
    paymentMethod: '付款方式',
    creditCard: '信用卡付款',
    convenienceStore: '超商取貨付款',
    meetInPerson: '面交',
    payNow: '立即付款',
    confirmOrder: '確認訂單',
    paymentSuccess: '付款成功！',
    orderConfirmed: '訂單已確認！',
    returnItem: '歸還物品與評分',
    confirmReturnMsg: '請確認歸還此物品並給予評價：',
    itemReturned: '物品已歸還！訂單已新增',
    receiveItem: '確認收貨',
    confirmReceiveReturnMsg: '是否已收到歸還物件？',
    itemReceived: '已確認收到歸還！新預約邀請已新增',
    campingEssentials: '精選露營裝備',
    rateThisItem: '為此物品評分'
  },
  'en': {
    welcome: 'Welcome back,\nWhat would you like to rent?',
    searchPlaceholder: 'Search camera, camping...',
    home: 'Home',
    search: 'Search',
    orders: 'Orders',
    profile: 'Profile',
    rentNow: 'Rent Now',
    bookNow: 'Book',
    addToCart: 'Add to Booking',
    askOwner: 'Ask Owner',
    pricePerDay: 'NTD / Day',
    addProduct: 'Add Product',
    productName: 'Product Name',
    price: 'Price (Per Day)',
    deposit: 'Deposit',
    uploadImages: 'Upload Photos',
    uploadVideo: 'Upload Video (Optional)',
    cancel: 'Cancel',
    publish: 'Publish',
    myOrders: 'My Orders',
    settings: 'Settings',
    language: 'Language',
    rentSuccess: 'Booking Confirmed!',
    askSuccess: 'Chat started!',
    noResults: 'No results found',
    filters: 'Filters',
    category: 'Category',
    priceRange: 'Price Range',
    personalProfile: 'Profile Info',
    paymentMethods: 'Payment Methods',
    notifications: 'Notifications',
    coupons: 'Coupons',
    transactions: 'Transactions',
    memberSince: 'Member since 2023',
    rentalsCount: 'Rentals',
    listingsCount: 'Listings',
    rating: 'Rating',
    newArrival: 'NEW ARRIVAL',
    bannerTitle: 'Summer\nCamping Gear',
    check: 'Check',
    recommended: 'Recommended',
    searchResults: 'Search Results',
    cart: 'Booking List',
    cartEmpty: 'Booking list is empty',
    confirmBooking: 'Confirm Booking',
    addedToCart: 'Added to list',
    total: 'Total',
    productDetails: 'Details',
    messages: 'Messages',
    typeMessage: 'Type a message...',
    send: 'Send',
    myRentals: 'My Rentals',
    myItems: 'My Items',
    rentedUntil: 'Rented until',
    status_pending: 'Pending',
    status_unpaid: 'Unpaid',
    status_renting: 'Renting',
    status_completed: 'Completed',
    status_invite: 'Invite',
    status_renting_out: 'Renting Out',
    status_returned: 'Returned',
    confirmRentalAction: 'Confirm Rental',
    selectReturnDate: 'Select Return Date',
    confirm: 'Confirm',
    rentalTotal: 'Est. Total',
    days: 'days',
    rentalConfirmedPrefix: 'Confirmed rental until',
    totalPrice: 'Total',
    login: 'Login',
    username: 'Username',
    password: 'Password',
    welcomeBackSimple: 'Welcome Back',
    logout: 'Log Out',
    acceptInvite: 'Accept Invite',
    enterRentalPeriod: 'Enter Rental Period',
    startDate: 'Start Date',
    endDate: 'End Date',
    paymentMethod: 'Payment Method',
    creditCard: 'Credit Card',
    convenienceStore: 'Store Pickup',
    meetInPerson: 'Meet In-person',
    payNow: 'Pay Now',
    confirmOrder: 'Confirm Order',
    paymentSuccess: 'Payment Successful!',
    orderConfirmed: 'Order Confirmed!',
    returnItem: 'Return Item',
    confirmReturnMsg: 'Are you sure you want to return this item?',
    itemReturned: 'Item Returned! New order added.',
    receiveItem: 'Receive Item',
    confirmReceiveReturnMsg: 'Have you received the returned item?',
    itemReceived: 'Item received! New invite added.',
    campingEssentials: 'Camping Essentials',
    rateThisItem: 'Rate this item'
  }
};

const CATEGORIES = [
  { id: 'all', name: '全部' },
  { id: 'camera', name: '攝影器材' },
  { id: 'camping', name: '露營用品' },
  { id: 'game', name: '遊戲主機' },
  { id: 'clothes', name: '服飾禮服' }
];

const Logo = () => (
  <div className="mr-3 text-emerald-600 flex items-center justify-center">
    <Package size={32} strokeWidth={2.5} />
  </div>
);

// --- Components Defined Outside App for Stability ---

const SplashScreen = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex flex-col items-center justify-center z-[100] animate-splash-exit overflow-hidden">
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Camera size={48} className="absolute top-10 left-10 text-white/20 rotate-12 animate-float" style={{animationDelay: '0s'}} />
      <Tent size={56} className="absolute top-20 right-16 text-white/20 -rotate-12 animate-float" style={{animationDelay: '1s'}} />
      <ShoppingBag size={64} className="absolute bottom-32 left-8 text-white/20 rotate-45 animate-float" style={{animationDelay: '0.5s'}} />
      <Package size={52} className="absolute bottom-10 right-10 text-white/20 -rotate-6 animate-float" style={{animationDelay: '1.5s'}} />
      <Video size={40} className="absolute top-1/3 left-1/4 text-white/20 rotate-90 animate-float" style={{animationDelay: '0.8s'}} />
      <Truck size={44} className="absolute bottom-1/4 right-1/3 text-white/20 -rotate-12 animate-float" style={{animationDelay: '1.2s'}} />
      <Gamepad2 size={48} className="absolute top-1/2 right-8 text-white/20 rotate-12 animate-float" style={{animationDelay: '0.3s'}} />
      <Watch size={36} className="absolute top-32 left-1/3 text-white/20 -rotate-45 animate-float" style={{animationDelay: '1.7s'}} />
      <Music size={42} className="absolute bottom-20 left-1/2 text-white/20 rotate-12 animate-float" style={{animationDelay: '0.6s'}} />
      <Smartphone size={38} className="absolute top-10 left-1/2 text-white/20 -rotate-12 animate-float" style={{animationDelay: '1.1s'}} />
    </div>

    <div className="z-10 flex flex-col items-center">
        <div className="p-6 rounded-full bg-white/20 mb-4 shadow-lg shadow-emerald-900/30 animate-elastic-bounce">
          <Package size={80} className="text-white" strokeWidth={2} />
        </div>
        <h1 className="text-white text-3xl font-bold tracking-[0.2em] animate-fade-in">租你所愛</h1>
    </div>
  </div>
);

const LoginScreen = ({ onLogin, t }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  const hasLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);

  return (
    <div className="absolute inset-0 bg-gray-50 z-50 flex flex-col justify-center px-8 animate-fade-in">
      <div className="mb-12 text-center">
        <div className="inline-block p-4 rounded-3xl bg-white shadow-lg shadow-emerald-100 mb-6">
          <Package size={64} className="text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.welcomeBackSimple}</h2>
        <p className="text-gray-400 text-sm">Please sign in to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex items-center p-3 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
          <Mail size={20} className="text-gray-400 mr-3" />
          <input 
            type="text" 
            placeholder={t.username} 
            className="flex-1 outline-none text-gray-700 bg-transparent"
            required
          />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex items-center p-3 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
          <Lock size={20} className="text-gray-400 mr-3" />
          <input 
            type="password" 
            placeholder={t.password} 
            className="flex-1 outline-none text-gray-700 bg-transparent"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Password Requirements */}
        <div className="flex flex-col gap-2 mt-2 px-1">
          <div className={`flex items-center text-xs ${hasLength ? 'text-emerald-600 font-bold' : 'text-gray-400'}`}>
             <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-colors ${hasLength ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300'}`}>
                {hasLength && <Check size={10} className="text-white" strokeWidth={4} />}
             </div>
             至少 8 個字元
          </div>
          <div className={`flex items-center text-xs ${hasLetter ? 'text-emerald-600 font-bold' : 'text-gray-400'}`}>
             <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-colors ${hasLetter ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300'}`}>
                {hasLetter && <Check size={10} className="text-white" strokeWidth={4} />}
             </div>
             包含大小寫英文字母
          </div>
        </div>

        <div className="pt-4">
          <button 
            disabled={loading}
            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex justify-center items-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : t.login}
          </button>
        </div>
      </form>
      
      <p className="text-center mt-8 text-gray-400 text-xs">
        v1.0.2 Rental App
      </p>
    </div>
  );
};

// Owner Confirm Modal
const OwnerConfirmModal = ({ isOpen, onClose, onConfirm, order, t }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isOpen || !order) return null;

  const calculateIncome = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; 
    return diffDays * order.price;
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
        <h3 className="font-bold text-gray-800 text-lg mb-4">{t.acceptInvite}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t.startDate}</label>
            <input 
              type="date" 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t.endDate}</label>
            <input 
              type="date" 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {(startDate && endDate) && (
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex justify-between items-center">
              <span className="text-emerald-800 font-medium">{t.totalPrice}</span>
              <span className="text-2xl font-bold text-emerald-600">${calculateIncome()}</span>
            </div>
          )}

          <div className="flex gap-3 mt-4 pt-2">
            <button 
              onClick={onClose}
              className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors"
            >
              {t.cancel}
            </button>
            <button 
              onClick={onConfirm}
              disabled={!startDate || !endDate}
              className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 disabled:opacity-50 transition-all active:scale-95"
            >
              {t.confirm}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Modal
const PaymentModal = ({ isOpen, onClose, onConfirm, order, t }) => {
  const [method, setMethod] = useState('credit');

  if (!isOpen || !order) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
        <h3 className="font-bold text-gray-800 text-lg mb-2">{t.paymentMethod}</h3>
        <p className="text-gray-400 text-xs mb-4">Total: <span className="text-emerald-600 font-bold text-base">${order.price}</span></p>
        
        <div className="space-y-3">
          <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${method === 'credit' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'}`}>
            <input type="radio" name="payment" value="credit" className="hidden" onChange={() => setMethod('credit')} checked={method === 'credit'} />
            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${method === 'credit' ? 'border-emerald-600' : 'border-gray-300'}`}>
              {method === 'credit' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />}
            </div>
            <CreditCard size={20} className="mr-3 text-gray-600" />
            <span className="font-medium text-gray-700">{t.creditCard}</span>
          </label>

          <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${method === 'store' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'}`}>
            <input type="radio" name="payment" value="store" className="hidden" onChange={() => setMethod('store')} checked={method === 'store'} />
            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${method === 'store' ? 'border-emerald-600' : 'border-gray-300'}`}>
              {method === 'store' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />}
            </div>
            <Truck size={20} className="mr-3 text-gray-600" />
            <span className="font-medium text-gray-700">{t.convenienceStore}</span>
          </label>

          <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${method === 'person' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'}`}>
            <input type="radio" name="payment" value="person" className="hidden" onChange={() => setMethod('person')} checked={method === 'person'} />
            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${method === 'person' ? 'border-emerald-600' : 'border-gray-300'}`}>
              {method === 'person' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />}
            </div>
            <Hand size={20} className="mr-3 text-gray-600" />
            <span className="font-medium text-gray-700">{t.meetInPerson}</span>
          </label>
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors"
          >
            {t.cancel}
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 active:scale-95 transition-all"
          >
            {t.payNow}
          </button>
        </div>
      </div>
    </div>
  );
};

// Return Confirm Modal with Rating
const ReturnConfirmModal = ({ isOpen, onClose, onConfirm, t }) => {
  const [rating, setRating] = useState(5); // Default rating

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
            <RotateCcw size={32} />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">{t.returnItem}</h3>
          <p className="text-gray-500 text-sm mt-2 mb-4">{t.confirmReturnMsg}</p>
          
          {/* Rating Section */}
          <div className="bg-gray-50 w-full p-4 rounded-xl border border-gray-100 flex flex-col items-center">
             <span className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{t.rateThisItem}</span>
             <div className="flex gap-2">
               {[1, 2, 3, 4, 5].map((star) => (
                 <button 
                   key={star} 
                   onClick={() => setRating(star)}
                   className="transition-transform active:scale-90 focus:outline-none"
                 >
                   <Star 
                     size={28} 
                     className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors`} 
                   />
                 </button>
               ))}
             </div>
             <span className="text-sm font-medium text-gray-700 mt-2">{rating}.0 / 5.0</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors"
          >
            {t.cancel}
          </button>
          <button 
            onClick={() => onConfirm(rating)}
            className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 active:scale-95 transition-all"
          >
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

// Receive Return Confirm Modal
const ReceiveReturnConfirmModal = ({ isOpen, onClose, onConfirm, t }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
            <ArchiveRestore size={32} />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">{t.receiveItem}</h3>
          <p className="text-gray-500 text-sm mt-2">{t.confirmReceiveReturnMsg}</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors"
          >
            {t.cancel}
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 active:scale-95 transition-all"
          >
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

// Move other Modals out as well
const CartModal = ({ cart, onClose, removeFromCart, handleCheckout, t }) => {
  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-gray-800">{t.cart} ({cart.length})</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-32">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="flex bg-white p-3 rounded-xl mb-3 border border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-200">
              <img src={item.images[0]} className="w-20 h-20 rounded-lg object-cover bg-gray-200 flex-shrink-0" alt={item.name} />
              <div className="ml-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t.deposit}: ${item.deposit}</p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-emerald-600 font-bold">${item.price}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
            <ShoppingBag size={64} className="mb-4" />
            <p>{t.cartEmpty}</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-5 safe-bottom">
        <div className="flex justify-between items-center mb-4">
           <span className="text-gray-500 font-medium">{t.total}</span>
           <span className="text-2xl font-bold text-emerald-600">${total}</span>
        </div>
        <div className="flex items-center">
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex-1"
          >
            {t.confirmBooking}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDetailModal = ({ product, onClose, t, handleAddToCart, handleAskOwner }) => {
  const [currentImg, setCurrentImg] = useState(0);

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom-10 duration-300">
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10 pointer-events-none">
        <button onClick={onClose} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-gray-700 pointer-events-auto">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="relative w-full aspect-[4/3] bg-gray-100">
          <img 
            src={product.images[currentImg]} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {product.images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${currentImg === idx ? 'bg-white w-4' : 'bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-6 -mt-6 bg-white rounded-t-3xl relative min-h-full">
          <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
          
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-gray-800 leading-tight flex-1 mr-2">{product.name}</h1>
            <div className="flex flex-col items-end">
               <div className="flex items-center bg-emerald-50 px-2 py-1 rounded-lg">
                 <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                 <span className="font-bold text-emerald-800 text-sm">{product.rating}</span>
               </div>
               <span className="text-[10px] text-gray-400 mt-1">{product.reviews} reviews</span>
            </div>
          </div>

          <div className="flex items-center text-gray-500 text-sm mb-6">
            <MapPin size={14} className="mr-1 text-emerald-500" />
            {product.location}
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <img src={product.avatar} className="w-4 h-4 rounded-full mr-1" />
              {product.owner}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
             <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
               <span className="text-gray-400 text-xs block mb-1">{t.deposit}</span>
               <span className="text-gray-800 font-bold">${product.deposit}</span>
             </div>
             <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
               <span className="text-gray-400 text-xs block mb-1">Condition</span>
               <span className="text-gray-800 font-bold">Excellent</span>
             </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            這是一個高品質的租賃物品。設備狀況良好，非常適合週末出遊或專業使用。請愛惜使用，若有問題歡迎隨時詢問。
            <br/><br/>
            (This is a description placeholder for the item.)
          </p>

          <div className="mb-24">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">{t.productDetails}</h3>
            <div className="space-y-4">
              {product.images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`Detail ${idx}`} 
                  className="w-full rounded-xl object-cover shadow-sm border border-gray-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-gray-100 bg-white w-full safe-bottom shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-20">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-gray-400 text-xs block">Total Price</span>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-emerald-600">${product.price}</span>
              <span className="text-gray-400 text-xs font-normal ml-1"> / day</span>
            </div>
          </div>
          
          <div className="flex flex-1 gap-2 justify-end">
            <button 
              onClick={() => {
                handleAskOwner(product);
                onClose();
              }}
              className="flex-1 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-2 py-3 rounded-xl font-bold text-sm active:scale-95 transition-all whitespace-nowrap"
            >
              {t.askOwner}
            </button>
            <button 
              onClick={() => {
                handleAddToCart(product);
                onClose();
              }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 active:scale-95 transition-all whitespace-nowrap"
            >
              {t.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddProductModal = ({ onClose, handleAddProduct, t }) => (
  <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6">
    <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{t.addProduct}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">{t.productName}</label>
          <input name="name" required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-emerald-500 transition-colors" placeholder="Ex: Canon EOS R5" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">{t.price}</label>
          <input name="price" required type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-emerald-500 transition-colors" placeholder="1000" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-emerald-400 transition-colors cursor-pointer">
            <Camera size={28} className="mb-2" />
            <span className="text-xs text-center">{t.uploadImages}</span>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-emerald-400 transition-colors cursor-pointer">
            <Video size={28} className="mb-2" />
            <span className="text-xs text-center">{t.uploadVideo}</span>
          </div>
        </div>

        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl mt-4 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">
          {t.publish}
        </button>
      </form>
    </div>
  </div>
);

const HomeView = ({ 
  products, 
  t, 
  searchQuery, 
  setSearchQuery, 
  setSelectedProduct, 
  handleAddToCart, 
  setCurrentView, 
  setIsCartOpen, 
  cartCount,
  activeCategory,
  setActiveCategory
}) => {
  const homeFilteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isCampingSearch = searchQuery.toLowerCase() === 'camping';

  return (
    <div className="pb-24 animate-fade-in">
      <div className="px-5 pt-8 pb-4 flex items-center justify-between bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <Logo />
          <h1 className="text-sm font-medium text-gray-400 leading-snug whitespace-pre-line">
            {t.welcome}
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setCurrentView('messages')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative"
          >
             <MessageCircle size={24} />
             <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-white">
                {cartCount}
              </div>
            )}
          </button>
        </div>
      </div>

      {!searchQuery && (
        <div className="px-5 mt-2">
          <div className="relative rounded-2xl p-4 text-white shadow-lg shadow-emerald-900/20 flex justify-between items-center h-32 overflow-hidden group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/50 to-transparent" />

            <div className="relative z-10">
              <p className="opacity-90 text-xs font-medium mb-1 tracking-wider text-emerald-100">{t.newArrival}</p>
              <h2 className="text-xl font-bold leading-tight whitespace-pre-line text-white drop-shadow-md">{t.bannerTitle}</h2>
            </div>
            
            <div className="w-24 h-24 bg-white/10 rounded-full absolute -right-4 -bottom-4 backdrop-blur-[2px] z-0" />
            
            <button 
              onClick={() => setSearchQuery('Camping')}
              className="relative z-10 bg-white/90 backdrop-blur-sm text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white transition-colors shadow-sm">
              {t.check}
            </button>
          </div>
        </div>
      )}

      <div className="px-5 mt-4 sticky top-[80px] z-10">
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center text-gray-400 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
          <Search size={20} className="mr-3 text-emerald-500" />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full text-sm outline-none text-gray-700 bg-transparent placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="px-5 mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          {searchQuery ? t.searchResults : t.recommended}
        </h3>
        
        {homeFilteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {homeFilteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
              >
                <div 
                  className="aspect-square w-full bg-gray-200 relative cursor-pointer overflow-hidden"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                  />
                  
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center text-white">
                    <Star size={10} className="text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-[10px] font-bold">{product.rating}</span>
                  </div>
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <h4 
                    onClick={() => setSelectedProduct(product)}
                    className="font-medium text-gray-800 text-sm truncate cursor-pointer"
                  >
                    {product.name}
                  </h4>
                  
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <MapPin size={10} className="mr-0.5" />
                      <span>{product.location}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] text-gray-400 bg-gray-50 inline-block px-1.5 py-0.5 rounded self-start">
                    {t.deposit}: ${product.deposit}
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-50">
                    <div className="text-emerald-600 font-bold text-sm">
                      ${product.price}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="bg-emerald-600 text-white text-[10px] px-3 py-1.5 rounded-full font-bold active:scale-95 transition-transform hover:bg-emerald-700"
                    >
                      {t.addToCart}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isCampingSearch && (
            <div className="text-center text-gray-400 mt-10 pb-10">
              <Search size={48} className="mx-auto mb-4 opacity-20" />
              <p>{t.noResults}</p>
            </div>
          )
        )}

        {isCampingSearch && (
            <div className="mt-8 pb-10">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gray-100 rounded-full mr-2">
                  <Flame size={18} className="text-gray-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-500">{t.campingEssentials}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {CAMPING_RECOMMENDATIONS.map(product => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
                  >
                    <div 
                      className="aspect-square w-full bg-gray-200 relative cursor-pointer overflow-hidden"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        HOT
                      </div>
                    </div>

                    <div className="p-3 flex flex-col flex-1">
                      <h4 
                        onClick={() => setSelectedProduct(product)}
                        className="font-medium text-gray-800 text-sm truncate cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <MapPin size={10} className="mr-0.5" />
                          <span>{product.location}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-50">
                        <div className="text-emerald-600 font-bold text-sm">
                          ${product.price}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="bg-emerald-600 text-white text-[10px] px-3 py-1.5 rounded-full font-bold active:scale-95 transition-transform hover:bg-emerald-700"
                        >
                          {t.addToCart}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchView = ({ 
  products, 
  t, 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory, 
  setSelectedProduct, 
  handleAddToCart 
}) => {
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' ? true : p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-24 pt-8 min-h-full bg-gray-50 flex flex-col animate-fade-in">
      <div className="px-5 bg-white pb-2 pt-12 shadow-sm z-10 sticky top-0">
        <div className="bg-gray-100 p-2 rounded-xl flex items-center mb-3">
          <Search className="text-gray-400 ml-2" size={20} />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full p-1 ml-2 outline-none text-gray-700 bg-transparent placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat.id 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-2 pb-2 overflow-x-auto no-scrollbar border-t border-gray-100 pt-2">
          <button className="flex items-center px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white">
            <SlidersHorizontal size={12} className="mr-1.5" />
            {t.filters}
          </button>
          <button className="flex items-center px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white">
            <Calendar size={12} className="mr-1.5" />
            Date
          </button>
          <button className="flex items-center px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white">
            {t.priceRange}
          </button>
        </div>
      </div>

      <div className="px-5 mt-4 flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          {t.searchResults}
        </h3>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
              >
                <div 
                  className="aspect-square w-full bg-gray-200 relative cursor-pointer overflow-hidden"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                  />
                  
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center text-white">
                    <Star size={10} className="text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-[10px] font-bold">{product.rating}</span>
                  </div>
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <h4 
                    onClick={() => setSelectedProduct(product)}
                    className="font-medium text-gray-800 text-sm truncate cursor-pointer"
                  >
                    {product.name}
                  </h4>
                  
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <MapPin size={10} className="mr-0.5" />
                      <span>{product.location}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] text-gray-400 bg-gray-50 inline-block px-1.5 py-0.5 rounded self-start">
                    {t.deposit}: ${product.deposit}
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-50">
                    <div className="text-emerald-600 font-bold text-sm">
                      ${product.price}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="bg-emerald-600 text-white text-[10px] px-3 py-1.5 rounded-full font-bold active:scale-95 transition-transform hover:bg-emerald-700"
                    >
                      {t.addToCart}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-10 pb-10">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p>{t.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const OrdersView = ({ orders, activeOrderTab, setActiveOrderTab, handleOrderClick, t, getStatusColor, getStatusText }) => {
  const displayedOrders = orders.filter(order => 
    activeOrderTab === 'rentals' ? order.type === 'rental' : order.type === 'item'
  );

  return (
    <div className="pb-24 pt-8 min-h-full bg-gray-50 flex flex-col">
      <div className="px-5 bg-gray-50 pb-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.myOrders}</h2>
      </div>

      <div className="px-5 mb-4 sticky top-0 z-10 bg-gray-50 pt-2 pb-2">
        <div className="bg-white rounded-xl p-1 flex shadow-sm border border-gray-100">
          <button 
            onClick={() => setActiveOrderTab('rentals')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              activeOrderTab === 'rentals' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {t.myRentals}
          </button>
          <button 
            onClick={() => setActiveOrderTab('items')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              activeOrderTab === 'items' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {t.myItems}
          </button>
        </div>
      </div>

      <div className="px-5 flex-1 overflow-y-auto space-y-4 pb-4">
        {displayedOrders.length > 0 ? (
          displayedOrders.map(order => (
            <div 
              key={order.id} 
              onClick={() => handleOrderClick(order)}
              className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 transition-all ${
                (order.status === 'invite' && activeOrderTab === 'items') || 
                (order.status === 'unpaid' && activeOrderTab === 'rentals') ||
                (order.status === 'renting' && activeOrderTab === 'rentals') ||
                (order.status === 'renting_out' && activeOrderTab === 'items')
                  ? 'cursor-pointer active:scale-[0.98] border-l-4 border-l-amber-400' 
                  : ''
              }`}
            >
              <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                {order.image ? (
                  <img src={order.image} alt={order.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ShoppingBag size={24} />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800 text-sm line-clamp-2 pr-2">{order.name}</h3>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold whitespace-nowrap ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                
                <div className="mt-2 flex justify-between items-end">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    <span>{t.rentedUntil} {order.endDate}</span>
                  </div>
                  {((order.status === 'invite' && activeOrderTab === 'items') || 
                    (order.status === 'unpaid' && activeOrderTab === 'rentals') ||
                    (order.status === 'renting' && activeOrderTab === 'rentals') ||
                    (order.status === 'renting_out' && activeOrderTab === 'items')) && (
                    <ChevronRight size={16} className="text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-20 opacity-60">
            <FileText size={48} className="mx-auto mb-2" />
            <p>No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileView = ({ t, toggleLanguage, handleLogout, language }) => {
  const MENU_ITEMS = [
    { id: 'profile', label: t.personalProfile, icon: User },
    { id: 'payment', label: t.paymentMethods, icon: CreditCard },
    { id: 'notifications', label: t.notifications, icon: Bell },
    { id: 'coupons', label: t.coupons, icon: Ticket },
    { id: 'transactions', label: t.transactions, icon: Receipt },
  ];

  return (
    <div className="pb-24 min-h-full bg-gray-50">
      <div className="bg-emerald-600 pt-12 pb-8 px-5 rounded-b-[2.5rem] shadow-lg shadow-emerald-600/20">
        <div className="flex items-center">
          <img src="https://i.pravatar.cc/150?u=40" alt="Me" className="w-20 h-20 rounded-full border-4 border-emerald-500" />
          <div className="ml-4 text-white">
            <h2 className="text-xl font-bold">Alex Chen</h2>
            <p className="text-emerald-100 text-sm">{t.memberSince}</p>
          </div>
        </div>
        <div className="flex mt-8 justify-around text-center text-white">
          <div>
            <div className="font-bold text-xl">12</div>
            <div className="text-xs text-emerald-100 opacity-80">{t.rentalsCount}</div>
          </div>
          <div>
            <div className="font-bold text-xl">5</div>
            <div className="text-xs text-emerald-100 opacity-80">{t.listingsCount}</div>
          </div>
          <div>
            <div className="font-bold text-xl">4.9</div>
            <div className="text-xs text-emerald-100 opacity-80">{t.rating}</div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-3">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {MENU_ITEMS.map((item, index) => (
            <button 
              key={item.id}
              className={`w-full p-4 flex items-center justify-between group active:bg-gray-50 transition-colors ${index !== MENU_ITEMS.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center mr-3 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <item.icon size={18} />
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-6 mb-2 ml-1">{t.settings}</h3>
        
        <button 
          onClick={toggleLanguage}
          className="w-full bg-white p-4 rounded-xl shadow-sm flex items-center justify-between group active:scale-[0.98] transition-transform border border-gray-100"
        >
          <div className="flex items-center text-gray-700">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center mr-3">
              <Globe size={18} />
            </div>
            <span className="font-medium text-sm">{t.language}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <span className="mr-2 text-xs text-emerald-600 font-medium">{language === 'zh-TW' ? '繁體中文' : 'English'}</span>
            <ChevronRight size={16} />
          </div>
        </button>

        <button 
          onClick={handleLogout}
          className="w-full bg-white p-4 rounded-xl shadow-sm flex items-center justify-between group active:scale-[0.98] transition-transform border border-gray-100 text-red-500"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mr-3">
              <LogOut size={18} />
            </div>
            <span className="font-medium text-sm">{t.logout}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const MessagesListView = ({ t, chatList, setActiveChat, setCurrentView }) => (
  <div className="pb-24 pt-8 min-h-full bg-gray-50 flex flex-col">
     <div className="px-5 bg-white pb-4 shadow-sm z-10 sticky top-0">
        <h2 className="text-2xl font-bold text-gray-800">{t.messages}</h2>
     </div>
     <div className="px-5 mt-4 space-y-3">
       {chatList.map(chat => (
         <div 
           key={chat.id} 
           onClick={() => {
              setActiveChat({
                 ...chat,
                 messages: [{id:1, text: chat.lastMessage, sender: 'other', time: chat.time}] 
              });
              setCurrentView('chat');
           }}
           className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center active:scale-[0.98] transition-transform cursor-pointer"
         >
            <div className="relative">
              <img src={chat.avatar} className="w-14 h-14 rounded-full object-cover" alt={chat.owner} />
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {chat.unread}
                </div>
              )}
            </div>
            <div className="ml-4 flex-1">
               <div className="flex justify-between items-start">
                 <h3 className="font-bold text-gray-800">{chat.owner}</h3>
                 <span className="text-xs text-gray-400">{chat.time}</span>
               </div>
               <p className="text-xs text-emerald-600 font-medium mt-0.5">{chat.productName}</p>
               <p className="text-sm text-gray-500 mt-1 line-clamp-1">{chat.lastMessage}</p>
            </div>
         </div>
       ))}
     </div>
  </div>
);

const ChatView = ({ activeChat, t, setCurrentView }) => {
  const [msgInput, setMsgInput] = useState('');
  const [messages, setMessages] = useState(activeChat?.messages || []);
  
  // State for Rental Modal
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState('');

  const handleSend = () => {
    if(!msgInput.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: msgInput,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setMsgInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now()+1,
        text: '好的，沒問題！',
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const calculateTotal = () => {
    if (!returnDate) return 0;
    const start = new Date();
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; 
    return diffDays * activeChat.price;
  };

  const handleConfirmRental = () => {
    if (!returnDate) return;
    const total = calculateTotal();
    const confirmMsg = {
      id: Date.now(),
      text: `${t.rentalConfirmedPrefix} ${returnDate}。 ${t.totalPrice}: $${total}`,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    setMessages([...messages, confirmMsg]);
    setIsRentalModalOpen(false);
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col absolute inset-0 z-50">
       <div className="bg-white p-3 shadow-sm flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
          <div className="flex items-center">
            <button onClick={() => setCurrentView('messages')} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full mr-2">
              <ChevronLeft size={24} />
            </button>
            {activeChat?.productImage && (
              <img src={activeChat.productImage} className="w-10 h-10 rounded-lg object-cover border border-gray-200 mr-3" alt="product" />
            )}
            <div>
              <h3 className="font-bold text-gray-800 text-sm">{activeChat?.owner}</h3>
              <p className="text-[10px] text-emerald-600 truncate max-w-[120px]">{activeChat?.productName}</p>
            </div>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'me' 
                  ? 'bg-emerald-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
               }`}>
                  {msg.text}
               </div>
               <span className="text-[10px] text-gray-400 self-end ml-1 mr-1 mb-1">{msg.time}</span>
            </div>
          ))}
       </div>

       <div className="p-4 bg-white border-t border-gray-100 pb-safe">
          <div className="flex items-center gap-2">
            <input 
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              placeholder={t.typeMessage}
              className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-200"
            >
              <Send size={18} />
            </button>
          </div>
       </div>
    </div>
  );
};

export default function App() {
  const [appState, setAppState] = useState('splash');
  const [currentView, setCurrentView] = useState('home');
  const [language, setLanguage] = useState('zh-TW');
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [notification, setNotification] = useState(null);
  
  const [activeChat, setActiveChat] = useState(null);
  const [chatList, setChatList] = useState(MOCK_CHATS);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOwnerConfirmModalOpen, setIsOwnerConfirmModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReturnConfirmModalOpen, setIsReturnConfirmModalOpen] = useState(false);
  const [isReceiveReturnConfirmModalOpen, setIsReceiveReturnConfirmModalOpen] = useState(false);
  const [activeOrderTab, setActiveOrderTab] = useState('rentals');

  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (appState === 'splash') {
      const timer = setTimeout(() => {
        setAppState('login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleLogin = () => {
    setAppState('main');
  };

  const handleLogout = () => {
    setAppState('splash');
    setCurrentView('home'); 
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Logic to add product (omitted for brevity, assumed working)
    setIsAddModalOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh-TW' ? 'en' : 'zh-TW');
  };

  const handleAddToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
      showNotification(`${product.name} ${t.addedToCart}`);
    } else {
      showNotification(`${product.name} already in list`);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'renting':
      case 'renting_out':
        return 'bg-emerald-100 text-emerald-700';
      case 'completed':
      case 'returned':
        return 'bg-gray-100 text-gray-500';
      case 'pending':
      case 'invite':
        return 'bg-amber-100 text-amber-700';
      case 'unpaid':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'renting': return t.status_renting;
      case 'completed': return t.status_completed;
      case 'pending': return t.status_pending;
      case 'unpaid': return t.status_unpaid;
      case 'invite': return t.status_invite;
      case 'renting_out': return t.status_renting_out;
      case 'returned': return t.status_returned;
      default: return status;
    }
  };

  const handleOrderClick = (order) => {
    if (activeOrderTab === 'items' && order.status === 'invite') {
      setSelectedOrder(order);
      setIsOwnerConfirmModalOpen(true);
    }
    else if (activeOrderTab === 'rentals' && order.status === 'unpaid') {
      setSelectedOrder(order);
      setIsPaymentModalOpen(true);
    }
    else if (activeOrderTab === 'rentals' && order.status === 'renting') {
      setSelectedOrder(order);
      setIsReturnConfirmModalOpen(true);
    }
    else if (activeOrderTab === 'items' && order.status === 'renting_out') {
      setSelectedOrder(order);
      setIsReceiveReturnConfirmModalOpen(true);
    }
  };
  
  // Handlers for modals
  const handleOwnerConfirm = () => {
    const updatedOrders = orders.map(o => 
      o.id === selectedOrder.id ? { ...o, status: 'renting_out' } : o
    );
    setOrders(updatedOrders);
    setIsOwnerConfirmModalOpen(false);
    showNotification(t.orderConfirmed);
  };
  
  const handlePaymentConfirm = () => {
     const updatedOrders = orders.map(o => 
      o.id === selectedOrder.id ? { ...o, status: 'renting' } : o
    );
    setOrders(updatedOrders);
    setIsPaymentModalOpen(false);
    showNotification(t.paymentSuccess);
  };
  
  const handleReturnConfirm = () => {
    const updatedOrders = orders.map(o => 
      o.id === selectedOrder.id ? { ...o, status: 'completed' } : o
    );
    const newUnpaidOrder = {
      id: Date.now(),
      type: 'rental',
      name: 'Insta360 Go 3 (續租/加購)',
      status: 'unpaid',
      endDate: new Date(Date.now() + 86400000 * 2).toLocaleDateString(), 
      price: 450,
      image: 'https://i2.momoshop.com.tw/1748285482/goodsimg/0013/807/364/13807364_R.webp' 
    };
    setOrders([...updatedOrders, newUnpaidOrder]);
    setIsReturnConfirmModalOpen(false);
    showNotification(t.itemReturned);
  };

  const handleReceiveReturnConfirm = () => {
    const updatedOrders = orders.map(o => 
      o.id === selectedOrder.id ? { ...o, status: 'returned' } : o
    );
    const newInviteOrder = {
      id: Date.now() + 100,
      type: 'item',
      name: 'Dyson 吹風機 (週末預約)',
      status: 'invite',
      endDate: new Date(Date.now() + 86400000 * 5).toLocaleDateString(),
      price: 200,
      image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&q=80&w=200'
    };
    setOrders([...updatedOrders, newInviteOrder]);
    setIsReceiveReturnConfirmModalOpen(false);
    showNotification(t.itemReceived);
  };
  
  const handleCartCheckout = () => {
      if (cart.length === 0) return;
      const newOrders = cart.map(item => ({
        id: Date.now() + Math.random(),
        type: 'rental', 
        name: item.name,
        status: 'pending', 
        endDate: new Date(Date.now() + 86400000).toLocaleDateString(),
        image: item.images[0]
      }));
      setOrders([...newOrders, ...orders]);
      setCart([]);
      setIsCartOpen(false);
      setCurrentView('orders');
      showNotification(t.rentSuccess);
  };

  const handleAskOwner = (product) => {
    const chatContext = {
      id: Date.now(), 
      owner: product.owner,
      avatar: product.avatar,
      productName: product.name,
      productImage: product.images[0],
      price: product.price,
      messages: [
        { id: 1, text: `您好，我想詢問關於 ${product.name} 的租賃細節。`, sender: 'me', time: 'Now' }
      ]
    };
    setActiveChat(chatContext);
    setCurrentView('chat');
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 h-[100dvh] max-w-md mx-auto relative shadow-2xl overflow-hidden flex flex-col">
      
      {notification && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-[60] animate-in fade-in zoom-in-95 whitespace-nowrap">
          {notification}
        </div>
      )}

      {/* Main Content Switcher */}
      {appState === 'main' ? (
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          {currentView === 'home' && (
            <HomeView 
              products={products} 
              t={t} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              setSelectedProduct={setSelectedProduct}
              handleAddToCart={handleAddToCart}
              setCurrentView={setCurrentView}
              setIsCartOpen={setIsCartOpen}
              cartCount={cart.length}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}
          {currentView === 'search' && (
            <SearchView 
              products={products} 
              t={t} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              setSelectedProduct={setSelectedProduct}
              handleAddToCart={handleAddToCart}
            />
          )}
          {currentView === 'orders' && (
            <OrdersView 
              orders={orders}
              activeOrderTab={activeOrderTab}
              setActiveOrderTab={setActiveOrderTab}
              handleOrderClick={handleOrderClick}
              t={t}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
            />
          )}
          {currentView === 'profile' && (
            <ProfileView 
              t={t} 
              toggleLanguage={toggleLanguage} 
              handleLogout={handleLogout} 
              language={language}
            />
          )}
          {currentView === 'messages' && (
            <MessagesListView 
              t={t}
              chatList={chatList}
              setActiveChat={setActiveChat}
              setCurrentView={setCurrentView}
            />
          )}
          {currentView === 'chat' && (
            <ChatView 
              activeChat={activeChat} 
              t={t} 
              setCurrentView={setCurrentView} 
            />
          )}
        </div>
      ) : appState === 'login' ? (
        <LoginScreen onLogin={handleLogin} t={t} />
      ) : (
        <SplashScreen />
      )}

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          t={t}
          handleAddToCart={handleAddToCart}
          handleAskOwner={handleAskOwner}
        />
      )}

      {isCartOpen && (
        <CartModal 
           cart={cart} 
           onClose={() => setIsCartOpen(false)}
           removeFromCart={removeFromCart}
           handleCheckout={handleCartCheckout}
           t={t}
        />
      )}

      {isAddModalOpen && (
        <AddProductModal 
           onClose={() => setIsAddModalOpen(false)} 
           handleAddProduct={handleAddProduct} 
           t={t} 
        />
      )}

      {isOwnerConfirmModalOpen && selectedOrder && (
        <OwnerConfirmModal 
          isOpen={isOwnerConfirmModalOpen}
          onClose={() => setIsOwnerConfirmModalOpen(false)}
          onConfirm={handleOwnerConfirm}
          order={selectedOrder}
          t={t}
        />
      )}
      
      {isPaymentModalOpen && selectedOrder && (
        <PaymentModal 
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onConfirm={handlePaymentConfirm}
          order={selectedOrder}
          t={t}
        />
      )}

      {isReturnConfirmModalOpen && selectedOrder && (
        <ReturnConfirmModal 
          isOpen={isReturnConfirmModalOpen}
          onClose={() => setIsReturnConfirmModalOpen(false)}
          onConfirm={handleReturnConfirm}
          t={t}
        />
      )}

      {isReceiveReturnConfirmModalOpen && selectedOrder && (
        <ReceiveReturnConfirmModal 
          isOpen={isReceiveReturnConfirmModalOpen}
          onClose={() => setIsReceiveReturnConfirmModalOpen(false)}
          onConfirm={handleReceiveReturnConfirm}
          t={t}
        />
      )}

      {/* Bottom Navigation - Only show in main app state */}
      {appState === 'main' && (
        <div className="absolute bottom-0 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-center py-2 px-2 pb-safe z-40">
          <button 
            onClick={() => setCurrentView('home')}
            className={`p-2 flex flex-col items-center transition-colors ${currentView === 'home' ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            <Home size={24} strokeWidth={currentView === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-medium mt-1">{t.home}</span>
          </button>

          <button 
            onClick={() => setCurrentView('search')} 
            className={`p-2 flex flex-col items-center transition-colors ${currentView === 'search' ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            <Search size={24} strokeWidth={currentView === 'search' ? 2.5 : 2} />
            <span className="text-[10px] font-medium mt-1">{t.search}</span>
          </button>

          <div className="relative -top-5">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-transform"
            >
              <Plus size={28} strokeWidth={3} />
            </button>
          </div>

          <button 
            onClick={() => setCurrentView('orders')}
            className={`p-2 flex flex-col items-center transition-colors ${currentView === 'orders' ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            <FileText size={24} strokeWidth={currentView === 'orders' ? 2.5 : 2} />
            <span className="text-[10px] font-medium mt-1">{t.orders}</span>
          </button>

          <button 
            onClick={() => setCurrentView('profile')}
            className={`p-2 flex flex-col items-center transition-colors ${currentView === 'profile' ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            <User size={24} strokeWidth={currentView === 'profile' ? 2.5 : 2} />
            <span className="text-[10px] font-medium mt-1">{t.profile}</span>
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-fade-out {
          animation: fadeOut 0.5s ease-out 2s forwards;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s infinite ease-in-out;
        }
        @keyframes elasticBounce {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          80% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-elastic-bounce {
          animation: elasticBounce 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); filter: blur(5px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-fade-up {
          opacity: 0; /* Ensures it starts invisible */
          animation: fadeUp 0.8s ease-out 0.5s forwards;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--r, 0deg)); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
        .animate-splash-exit {
           animation: splashExit 0.8s ease-in-out 2s forwards;
        }
        @keyframes splashExit {
           0% { opacity: 1; transform: scale(1); }
           100% { opacity: 0; transform: scale(1.1); visibility: hidden; }
        }
        .animate-slide-in-left {
           animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideInLeft {
           from { transform: translateX(-100%); opacity: 0; }
           to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
           animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideInRight {
           from { transform: translateX(100%); opacity: 0; }
           to { transform: translateX(0); opacity: 1; }
        }
        .animate-give-item {
           animation: giveItem 2s ease-in-out infinite;
        }
        @keyframes giveItem {
           0%, 100% { transform: translateX(0); }
           50% { transform: translateX(40px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
}