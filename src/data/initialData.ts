import { MenuItem, Offer, Review } from '../types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'kacchi-special',
    name: 'Sarinda Royal Kacchi Biryani',
    banglaName: 'সারিন্দা স্পেশাল কাচ্চি বিরিয়ানি',
    category: 'Biryani',
    price: 390,
    originalPrice: 450,
    description: 'Slow-cooked fragrant chinigura rice with tender marinated mutton cuts, golden potato, shahi spices, and boiled egg. A true Dhaka heritage masterpiece.',
    banglaDescription: 'সুগন্ধি চিনিগুঁড়া চাল ও রসালো খাসির মাংসের সাথে নিখুঁত শাহী মসলা ও আলুর ঐতিহ্যবাহী কাচ্চি বিরিয়ানি। সাথে ডিম ও সালাদ।',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    isPopular: true,
    isSignature: true,
    isSpicy: false,
    isHalal: true,
    calories: 680,
    rating: 4.9,
    reviewsCount: 420,
    isAvailable: true,
    prepTime: '20-25 mins',
    addons: [
      { id: 'add-borhani', name: 'Traditional Shahi Borhani (250ml)', banglaName: 'শাহী বোরহানি (২৫০ মি.লি.)', price: 60 },
      { id: 'add-jali-kabab', name: 'Spiced Jali Kabab (1 pc)', banglaName: 'জালি কাবাব (১ পিস)', price: 50 },
      { id: 'add-firni', name: 'Zafrani Firni Pot', banglaName: 'জাফরানী ফিরনি পট', price: 70 }
    ]
  },
  {
    id: 'basmati-kacchi',
    name: 'Basmati Mutton Dum Biryani',
    banglaName: 'বাসমতী মাটন দম বিরিয়ানি',
    category: 'Biryani',
    price: 450,
    originalPrice: 510,
    description: 'Long grain aged basmati cooked in clay dum pot with succulent mutton chunks, saffron milk, and fried onions.',
    banglaDescription: 'দম পটে তৈরি প্রিমিয়াম বাসমতী চাল ও শাহী জাফরানের সুবাসে নরম তুলতুলে খাসির মাংসের দম বিরিয়ানি।',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80',
    isPopular: true,
    isSignature: false,
    isSpicy: false,
    isHalal: true,
    calories: 710,
    rating: 4.8,
    reviewsCount: 230,
    isAvailable: true,
    prepTime: '25-30 mins',
    addons: [
      { id: 'add-borhani', name: 'Traditional Shahi Borhani', banglaName: 'শাহী বোরহানি', price: 60 },
      { id: 'add-egg', name: 'Extra Boiled Egg', banglaName: 'অতিরিক্ত ডিম', price: 25 },
      { id: 'add-firni', name: 'Zafrani Firni Pot', banglaName: 'জাফরানী ফিরনি', price: 70 }
    ]
  },
  {
    id: 'dhaka-beef-tehari',
    name: 'Old Dhaka Beef Tehari',
    banglaName: 'পুরান ঢাকার খাঁটি বিফ তেহারি',
    category: 'Biryani',
    price: 290,
    originalPrice: 340,
    description: 'Fragrant short grain rice cooked in pure mustard oil with bite-sized spiced beef and fresh green chilies.',
    banglaDescription: 'খাঁটি সরিষার তেলে কাঁচামরিচের সুবাস আর নরম তুলতুলে গরুর মাংসের ঐতিহ্যবাহী পুরান ঢাকার তেহারি।',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1000&q=80',
    isPopular: true,
    isSignature: false,
    isSpicy: true,
    isHalal: true,
    calories: 620,
    rating: 4.7,
    reviewsCount: 190,
    isAvailable: true,
    prepTime: '15-20 mins',
    addons: [
      { id: 'add-borhani', name: 'Shahi Borhani', banglaName: 'বোরহানি', price: 60 },
      { id: 'add-salad', name: 'Fresh Cucumber Salad', banglaName: 'ফ্রেশ সালাদ', price: 20 }
    ]
  },
  {
    id: 'chicken-dum-biryani',
    name: 'Chicken Dum Biryani',
    banglaName: 'চিকেন দম বিরিয়ানি',
    category: 'Biryani',
    price: 280,
    originalPrice: 320,
    description: 'Richly seasoned chicken leg quarter cooked with ghee-infused Chinigura rice and fragrant caramelized beresta.',
    banglaDescription: 'ঘিয়ে ভাজা সুগন্ধি চিনিগুঁড়া চাল আর রসালো চিকেন লেগ পিসের দম বিরিয়ানি।',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1000&q=80',
    isPopular: false,
    isSignature: false,
    isSpicy: false,
    isHalal: true,
    calories: 590,
    rating: 4.6,
    reviewsCount: 145,
    isAvailable: true,
    prepTime: '20 mins',
    addons: [
      { id: 'add-borhani', name: 'Traditional Shahi Borhani', banglaName: 'শাহী বোরহানি', price: 60 },
      { id: 'add-egg', name: 'Extra Egg', banglaName: 'অতিরিক্ত ডিম', price: 25 }
    ]
  },
  {
    id: 'mutton-rezala',
    name: 'Shahi Mutton Rezala',
    banglaName: 'শাহী মাটন রেজালা',
    category: 'Mutton',
    price: 360,
    originalPrice: 420,
    description: 'Royal Mughlai style mutton cooked in a velvety yogurt, poppy seed, and cashew paste with dried mawa and keora essence.',
    banglaDescription: 'দই, কাজু বাদাম ও পোস্তদানার ঘন গ্রেভিতে রান্না করা খাসির মাংসের খাঁটি শাহী রেজালা।',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=1000&q=80',
    isPopular: true,
    isSignature: true,
    isSpicy: false,
    isHalal: true,
    calories: 510,
    rating: 4.9,
    reviewsCount: 310,
    isAvailable: true,
    prepTime: '20-25 mins',
    addons: [
      { id: 'add-rumali', name: 'Hot Butter Roomali Roti (2 pcs)', banglaName: 'বাটার রুমালী রুটি (২টি)', price: 50 },
      { id: 'add-polao', name: 'Basmati Plain Polao Plate', banglaName: 'বাসমতী পোলাও এক প্লেট', price: 120 }
    ]
  },
  {
    id: 'mutton-bhuna',
    name: 'Sarinda Special Mutton Bhuna',
    banglaName: 'সারিন্দা স্পেশাল মাটন ভুনা',
    category: 'Mutton',
    price: 370,
    description: 'Rich dark roasted mutton cooked in thick gravy with whole garam masala and caramelized onions.',
    banglaDescription: 'কষা পেঁয়াজ ও আস্ত গরম মসলায় তৈরি ঘন সুস্বাদু স্পেশাল মাটন ভুনা।',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=80',
    isPopular: false,
    isSignature: false,
    isSpicy: true,
    isHalal: true,
    calories: 540,
    rating: 4.8,
    reviewsCount: 160,
    isAvailable: true,
    prepTime: '20 mins',
    addons: [
      { id: 'add-rumali', name: 'Hot Roomali Roti (2 pcs)', banglaName: 'রুমালী রুটি (২টি)', price: 40 }
    ]
  },
  {
    id: 'shahi-chicken-roast',
    name: 'Dhaka Biye Bari Chicken Roast',
    banglaName: 'বিয়ে বাড়ি স্পেশাল চিকেন রোস্ট',
    category: 'Chicken',
    price: 180,
    originalPrice: 220,
    description: 'Traditional wedding feast chicken roast with sweet and savory golden caramelized gravy, fried onions, and raisins.',
    banglaDescription: 'ঐতিহ্যবাহী বিয়ে বাড়ির স্বাদে মিষ্টি-ঝাল গ্রেভি, বাদাম ও বেরেস্তায় মাখানো লোভনীয় চিকেন রোস্ট।',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
    isPopular: true,
    isSignature: false,
    isSpicy: false,
    isHalal: true,
    calories: 420,
    rating: 4.8,
    reviewsCount: 380,
    isAvailable: true,
    prepTime: '15 mins',
    addons: [
      { id: 'add-polao', name: 'Plain Shahi Polao', banglaName: 'শাহী পোলাও', price: 120 },
      { id: 'add-borhani', name: 'Shahi Borhani', banglaName: 'বোরহানি', price: 60 }
    ]
  },
  {
    id: 'butter-chicken-masala',
    name: 'Creamy Butter Chicken',
    banglaName: 'ক্রিমি বাটার চিকেন মাসালা',
    category: 'Chicken',
    price: 320,
    description: 'Tender tandoori chicken simmered in rich creamy tomato and butter silk gravy with fresh fenugreek.',
    banglaDescription: 'মাখনা ও টমেটো গ্রেভিতে রান্না করা অত্যন্ত নরম ক্রিমি বাটার চিকেন।',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1000&q=80',
    isPopular: true,
    isSignature: false,
    isSpicy: false,
    isHalal: true,
    calories: 490,
    rating: 4.7,
    reviewsCount: 215,
    isAvailable: true,
    prepTime: '20 mins',
    addons: [
      { id: 'add-naan', name: 'Garlic Butter Naan (2 pcs)', banglaName: 'গার্লিক বাটার নান (২টি)', price: 70 }
    ]
  },
  {
    id: 'prawn-malai-curry',
    name: 'Bengal Jumbo Prawn Malai Curry',
    banglaName: 'চিংড়ি মাছের মালাইকারি',
    category: 'Fish & Prawn',
    price: 420,
    originalPrice: 480,
    description: 'Tiger prawns simmered in fragrant coconut milk cream, green cardamom, and subtle whole spices.',
    banglaDescription: 'নারকেলের দুধের ঘন ক্রিমি গ্রেভিতে নরম গলদা চিংড়ির রাজকীয় মালাইকারি।',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80',
    isPopular: true,
    isSignature: true,
    isSpicy: false,
    isHalal: true,
    calories: 460,
    rating: 4.9,
    reviewsCount: 260,
    isAvailable: true,
    prepTime: '25 mins',
    addons: [
      { id: 'add-polao', name: 'Basmati Rice', banglaName: 'বাসমতী চালের ভাত', price: 90 }
    ]
  },
  {
    id: 'fish-dopiaza',
    name: 'Fresh Rui Fish Dopiaza',
    banglaName: 'তাজা রুই মাছের দোপেঁয়াজা',
    category: 'Fish & Prawn',
    price: 240,
    description: 'Local river Rui steak cooked with twice the onions, roasted cumin, and fragrant green coriander.',
    banglaDescription: 'নদীর তাজা রুই মাছের পেঁয়াজ ও টাটকা ধনেপাতায় কষা সুস্বাদু দোপেঁয়াজা।',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
    isPopular: false,
    isSignature: false,
    isSpicy: true,
    isHalal: true,
    calories: 380,
    rating: 4.5,
    reviewsCount: 95,
    isAvailable: true,
    prepTime: '20 mins'
  },
  {
    id: 'royal-platter-set',
    name: 'Sarinda Royal Grand Platter (Serves 2-3)',
    banglaName: 'সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার (২-৩ জন)',
    category: 'Set Menu',
    price: 990,
    originalPrice: 1190,
    description: 'Double portion Royal Kacchi Biryani, 2 pcs Shahi Chicken Roast, 2 pcs Jali Kabab, 2 Borhani (250ml), and 2 Zafrani Firni clay pots.',
    banglaDescription: '২ জনের জন্য ফুল প্যাকেজ: রয়্যাল কাচ্চি বিরিয়ানি, ২টি চিকেন রোস্ট, ২টি জালি কাবাব, ২টি শাহী বোরহানি ও ২টি জাফরানী ফিরনি।',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    isPopular: true,
    isSignature: true,
    isSpicy: false,
    isHalal: true,
    calories: 1450,
    rating: 5.0,
    reviewsCount: 512,
    isAvailable: true,
    prepTime: '25-30 mins',
    addons: [
      { id: 'extra-borhani', name: 'Extra Borhani Bottle', banglaName: 'অতিরিক্ত বোরহানি বোতল', price: 60 }
    ]
  },
  {
    id: 'executive-lunch-box',
    name: 'Executive Lunch Combo Box',
    banglaName: 'এক্সিকিউটিভ লাঞ্চ কম্বো বক্স',
    category: 'Set Menu',
    price: 260,
    description: 'Polao/Bhaat, 1 pc Chicken Roast or Curry, Special Dal Butter, Mustard Bhorta, and Salad.',
    banglaDescription: 'পোলাও/ভাত, ১ পিস চিকেন রোস্ট বা কারি, বাটার ডাল, স্পেশাল ভর্তা ও ফ্রেশ সালাদের পারফেক্ট কম্বো।',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    isPopular: false,
    isSignature: false,
    isSpicy: false,
    isHalal: true,
    calories: 580,
    rating: 4.6,
    reviewsCount: 118,
    isAvailable: true,
    prepTime: '15 mins'
  },
  {
    id: 'zafrani-firni',
    name: 'Shahi Zafrani Firni Pot',
    banglaName: 'শাহী জাফরানী মাটির ফিরনি',
    category: 'Dessert',
    price: 80,
    originalPrice: 95,
    description: 'Ground chinigura rice slowly simmered in thickened cow milk, saffron, cardamom, and garnished with roasted pistachios.',
    banglaDescription: 'মাটির হাড়িতে জমাট বাঁধা ঘন খাঁটি দুধ, জাফরান ও পেস্তা বাদামের শাহী ফিরনি।',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
    isPopular: true,
    isSignature: false,
    isSpicy: false,
    isHalal: true,
    calories: 220,
    rating: 4.9,
    reviewsCount: 340,
    isAvailable: true,
    prepTime: '5 mins'
  },
  {
    id: 'bogura-doi',
    name: 'Authentic Bogurar Mishti Doi',
    banglaName: 'বগুড়ার স্পেশাল লাল মিষ্টি দই',
    category: 'Dessert',
    price: 90,
    description: 'Traditional caramel-sweetened thick red curd crafted in earthenware clay pot.',
    banglaDescription: 'ঐতিহ্যবাহী বগুড়ার খাঁটি ঘন ও সুস্বাদু লাল মিষ্টি দই।',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=80',
    isPopular: false,
    isSignature: false,
    isSpicy: false,
    isHalal: true,
    calories: 240,
    rating: 4.8,
    reviewsCount: 190,
    isAvailable: true,
    prepTime: '5 mins'
  },
  {
    id: 'shahi-borhani-bottle',
    name: 'Heritage Shahi Borhani (500ml)',
    banglaName: 'শাহী বোরহানি বোতল (৫০০ মি.লি.)',
    category: 'Drinks',
    price: 110,
    originalPrice: 130,
    description: 'Thick yogurt blend infused with roasted cumin, black rock salt, mint, coriander, and green chili. Perfect digestive drink.',
    banglaDescription: 'টক দই, পুদিনা, ভাজা জিরা ও শাহী মসলার স্বাস্থ্যকর ও মুখরোচক বোরহানি।',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    isPopular: true,
    isSignature: true,
    isSpicy: false,
    isHalal: true,
    calories: 140,
    rating: 4.9,
    reviewsCount: 460,
    isAvailable: true,
    prepTime: '5 mins'
  },
  {
    id: 'lemon-mint-cooler',
    name: 'Fresh Lemon Mint Cooler',
    banglaName: 'ফ্রেশ লেমন মিন্ট কুলার',
    category: 'Drinks',
    price: 75,
    description: 'Refreshing chilled crushed ice drink made with fresh kaji lemon, garden mint, and pink salt.',
    banglaDescription: 'তাজা কাজী লেবু ও পুদিনা পাতার বরফ ঠান্ডা রিফ্রেশিং ড্রিংক।',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    isPopular: false,
    isSignature: false,
    isSpicy: false,
    isHalal: true,
    calories: 85,
    rating: 4.7,
    reviewsCount: 88,
    isAvailable: true,
    prepTime: '5 mins'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'offer-sarinda15',
    title: '15% Off On Your First Online Order',
    banglaTitle: 'প্রথম অনলাইন অর্ডারে ১৫% ছাড়!',
    code: 'SARINDA15',
    discountPercent: 15,
    maxDiscount: 150,
    minOrder: 500,
    validity: 'Valid until 31 October 2026',
    description: 'Use code SARINDA15 at checkout on minimum orders of ৳500 to enjoy instant 15% discount.',
    banglaDescription: 'যেকোনো ৫০০ টাকার বেশি অর্ডারে প্রোমোকোড SARINDA15 ব্যবহার করে জিতে নিন ১৫% ছাড় (সর্বোচ্চ ১৫০ টাকা)।',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    badge: 'NEW CUSTOMER SPECIAL'
  },
  {
    id: 'offer-royal20',
    title: 'Weekend Family Feast — Flat 20% Off',
    banglaTitle: 'উইকেন্ড ফ্যামিলি ফিস্ট — ২০% বিশেষ ছাড়',
    code: 'FAMILY20',
    discountPercent: 20,
    maxDiscount: 300,
    minOrder: 1200,
    validity: 'Friday & Saturday Only',
    description: 'Order food for your entire family and get 20% off when you order above ৳1200.',
    banglaDescription: 'শুক্রবার ও শনিবার ১২০০ টাকার বেশি অর্ডারে পরিবার সহ উপভোগ করুন ২০% বিশেষ ছাড়।',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    badge: 'WEEKEND EXCLUSIVE'
  },
  {
    id: 'offer-borhanifree',
    title: 'Free Shahi Borhani on Orders over ৳700',
    banglaTitle: '৭০০ টাকার অর্ডারে শাহী বোরহানি ফ্রি!',
    code: 'FREEBORHANI',
    discountPercent: 10,
    maxDiscount: 110,
    minOrder: 700,
    validity: 'Limited Time Deal',
    description: 'Complimentary traditional digestive Shahi Borhani bottle with any platter or order above ৳700.',
    banglaDescription: 'যেকোনো ৭০০ টাকার বেশি অর্ডারে ফ্রিতে পেয়ে যান আমাদের স্পেশাল শাহী বোরহানি।',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    badge: 'POPULAR COMBO'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Tanvir Ahmed',
    rating: 5,
    comment: 'The Royal Kacchi Biryani is by far the best in town! The mutton piece melted in my mouth, and the rice had the perfect fragrant aroma. Delivery took only 30 mins!',
    banglaComment: 'সারিন্দার কাচ্চি সত্যি অসাধারণ! মাংসটা এত নরম ছিল যে মুখে দিলেই মিলিয়ে যায়। বোরহানি আর ফিরনিও এক কথায় সেরা।',
    date: 'Yesterday',
    dishOrdered: 'Sarinda Royal Kacchi Biryani + Borhani',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-2',
    author: 'Nusrat Jahan',
    rating: 5,
    comment: 'Celebrated my sister’s birthday in the VIP family hall. The staff hospitality was top notch, and the Grand Platter was generous enough for our whole family. Highly recommended!',
    banglaComment: 'পরিবার নিয়ে ডিনার করার জন্য দারুণ পরিবেশ। গ্র্যান্ড প্ল্যাটারটা অনেক কোয়ান্টিটি ছিল এবং সব খাবার ছিল গরম ও ফ্রেশ।',
    date: '3 days ago',
    dishOrdered: 'Sarinda Royal Grand Platter',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-3',
    author: 'Mahmudur Rahman',
    rating: 5,
    comment: 'Their Mutton Rezala with hot roomali roti reminded me of traditional wedding feasts. Clean packaging, genuine taste, and fair pricing.',
    banglaComment: 'মাটন রেজালা আর রুমালী রুটি ছিল একদম বিয়ের বাড়ির মত খাঁটি স্বাদের। সার্ভিস ও প্যাকেজিং খুবই ভালো।',
    date: '1 week ago',
    dishOrdered: 'Shahi Mutton Rezala & Roomali Roti',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
];

export const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    title: 'Heritage Kacchi Biryani',
    category: 'Food'
  },
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    title: 'Royal Family Feast Platter',
    category: 'Food'
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    title: 'Warm & Welcoming Dining Ambiance',
    category: 'Ambiance'
  },
  {
    url: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80',
    title: 'Shahi Mutton Rezala',
    category: 'Food'
  },
  {
    url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    title: 'Family Gathering Table',
    category: 'Ambiance'
  },
  {
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    title: 'Zafrani Clay Pot Firni',
    category: 'Dessert'
  }
];
