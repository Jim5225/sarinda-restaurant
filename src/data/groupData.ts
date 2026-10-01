export interface GroupSisterConcern {
  id: string;
  name: string;
  banglaName: string;
  category: string;
  banglaCategory: string;
  established: string;
  tagline: string;
  banglaTagline: string;
  address: string;
  banglaAddress: string;
  phone: string;
  altPhone?: string;
  hours: string;
  banglaHours: string;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  galleryImages: string[];
  description: string;
  banglaDescription: string;
  highlights: string[];
  banglaHighlights: string[];
  badge?: string;
  banglaBadge?: string;
  actionType: 'order_food' | 'book_resort' | 'order_cake' | 'dine_sorgorom' | 'inquire_lights' | 'order_pizza' | 'book_salon';
  features?: {
    title: string;
    banglaTitle: string;
    description: string;
    banglaDescription: string;
    iconName: string;
  }[];
  pricingOrSpec?: {
    label: string;
    banglaLabel: string;
    price: string;
    details: string;
    banglaDetails: string;
  }[];
  branches?: {
    name: string;
    banglaName: string;
    address: string;
    banglaAddress: string;
    phone: string;
  }[];
}

export interface GroupMilestone {
  year: string;
  title: string;
  banglaTitle: string;
  description: string;
  banglaDescription: string;
  brand: string;
}

export interface GroupData {
  companyName: string;
  banglaCompanyName: string;
  slogan: string;
  banglaSlogan: string;
  establishedYear: number;
  hqAddress: string;
  banglaHqAddress: string;
  hotline: string;
  altHotline: string;
  email: string;
  stats: {
    experienceYears: string;
    sisterBrands: string;
    activeOutlets: string;
    teamMembers: string;
    annualGuests: string;
  };
  ventures: GroupSisterConcern[];
  milestones: GroupMilestone[];
  leadership: {
    chairman: {
      name: string;
      banglaName: string;
      role: string;
      banglaRole: string;
      message: string;
      banglaMessage: string;
      image: string;
    };
    managingDirector: {
      name: string;
      banglaName: string;
      role: string;
      banglaRole: string;
      message: string;
      banglaMessage: string;
      image: string;
    };
  };
}

export const SARINDA_GROUP_DATA: GroupData = {
  companyName: 'Sarinda Group',
  banglaCompanyName: 'সারিন্দা গ্রুপ',
  slogan: 'Crafting Experiences in Hospitality, Living & Culinary Heritage',
  banglaSlogan: 'আতিথেয়তা, প্রাকৃতিক অবকাশ ও স্বাদের মেলবন্ধনে ময়মনসিংহের শীর্ষ শিল্পগোষ্ঠী',
  establishedYear: 2008,
  hqAddress: '11 C.K. Ghosh Road, Mymensingh-2200, Bangladesh',
  banglaHqAddress: '১১ সি.কে. ঘোষ রোড, ময়মনসিংহ-২২০০, বাংলাদেশ',
  hotline: '+880 1712-121434',
  altHotline: '+880 1979-121434',
  email: 'contact@sarindagroup.com',
  stats: {
    experienceYears: '18+',
    sisterBrands: '7',
    activeOutlets: '15+',
    teamMembers: '500+',
    annualGuests: '1.5M+'
  },
  ventures: [
    {
      id: 'sarinda-restaurant',
      name: 'Sarinda Restaurant & Catering',
      banglaName: 'সারিন্দা রেস্টুরেন্ট অ্যান্ড ক্যাটারিং',
      category: 'Culinary & Fine Dining',
      banglaCategory: 'ঐতিহ্যবাহী রেস্তোরাঁ ও রাজকীয় ক্যাটারিং',
      established: '2008',
      tagline: 'The Legendary Taste of Shahi Kacchi Biryani & Mughlai Feasts',
      banglaTagline: 'ময়মনসিংহের বিখ্যাত শাহী কাচ্চি ও মুঘলাই খাবারের বিশ্বস্ত ঠিকানা',
      address: '11 C.K. Ghosh Road, Mymensingh, Bangladesh',
      banglaAddress: '১১ সি.কে. ঘোষ রোড, ময়মনসিংহ',
      phone: '+880 1712-121434',
      altPhone: '+880 1979-121434',
      hours: '11:00 AM - 11:30 PM (Daily)',
      banglaHours: 'সকাল ১১:০০ - রাত ১১:৩০ (প্রতিদিন)',
      rating: 4.9,
      reviewsCount: 2450,
      heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80', // biryani
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', // interior
        'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80', // kebab
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'  // steak/meat
      ],
      description: 'The foundation of Sarinda Group. Renowned across Greater Mymensingh for legendary slow-cooked Kacchi Biryani, tender mutton rezala, authentic Bangladeshi feasts, and grand wedding catering.',
      banglaDescription: 'সারিন্দা গ্রুপের মূল ভিত্তি। ময়মনসিংহের সবচেয়ে জনপ্রিয় খাদ্যপ্রেমীদের তীর্থস্থান — খাঁটি ঘি ও মশলায় রান্না করা দম কাচ্চি বিরিয়ানি, খাসির রেজালা, তন্দুরি কাবাব এবং হাজার অতিথির রাজকীয় ক্যাটারিং সেবা।',
      highlights: [
        'Signature Slow-cooked Dam Kacchi Biryani with farm-fresh Mutton',
        'VIP Family Dining Cabins & Air-conditioned Banquet Space',
        'Full-scale Corporate, Wedding & Social Event Catering',
        'Online Food Ordering & 35-minute Express City Delivery'
      ],
      banglaHighlights: [
        'খাঁটি খাসির মাংসের দম কাচ্চি বিরিয়ানি ও স্পেশাল মোরগ পোলাও',
        'পরিবার ও ভিআইপি অতিথিদের জন্য শীতাতপ নিয়ন্ত্রিত আধুনিক কেবিন',
        'বিয়ে, জন্মদিন ও করপোরেট ইভেন্টের ৫০০-৩০০০ জনের ক্যাটারিং সুবিধা',
        'সরাসরি অনলাইন ফুড অর্ডারিং ও ৩৫ মিনিটে দ্রুততম হোম ডেলিভারি'
      ],
      badge: 'Flagship Culinary Brand',
      banglaBadge: 'মূল ফ্ল্যাগশিপ ব্র্যান্ড',
      actionType: 'order_food',
      features: [
        {
          title: 'Authentic Heritage Recipes',
          banglaTitle: 'ঐতিহ্যবাহী শাহী রন্ধনশৈলী',
          description: 'Slow-cooked in heavy copper degs using hand-ground spices and pure ghee.',
          banglaDescription: 'খাঁটি ঘি, সরিষার তেল ও গোপন মসলায় ভারী তামার ডেকে ঐতিহ্যবাহী দম রান্না।',
          iconName: 'Utensils'
        },
        {
          title: 'Dine-In, VIP Cabins & Catering',
          banglaTitle: 'ভিআইপি কেবিন ও বিশাল ক্যাটারিং',
          description: 'Spacious 200+ seat dining hall with dedicated family private cabins.',
          banglaDescription: '২০০+ আসনবিশিষ্ট বিশাল ডাইনিং এবং পরিবারের জন্য নিরিবিলি ভিআইপি কেবিন।',
          iconName: 'Crown'
        },
        {
          title: 'Express City Delivery',
          banglaTitle: 'দ্রুততম সিটি ডেলিভারি',
          description: 'Insulated hot-pack delivery across Mymensingh city within 30-40 minutes.',
          banglaDescription: 'থার্মাল সিলযুক্ত প্যাকেজিংয়ে গরম গরম খাবার ময়মনসিংহ শহরের যেকোনো প্রান্তে পৌঁছে দেওয়া হয়।',
          iconName: 'Truck'
        }
      ]
    },
    {
      id: 'sobari-resort',
      name: 'Sarinda Sobari Resort',
      banglaName: 'সারিন্দা সবারি রিসোর্ট',
      category: 'Resort & Eco-Hospitality',
      banglaCategory: 'বিলাসবহুল ইকো রিসোর্ট ও ডে-আউট কেন্দ্র',
      established: '2022',
      tagline: 'The "Switzerland of Mymensingh" — Azure Pool, Cottages & Green Serenity',
      banglaTagline: 'ময়মনসিংহের সুইজারল্যান্ড — সবুজ বৃক্ষরাজি, সুইমিংপুল ও নান্দনিক কটেজ',
      address: 'Akua Morolpara, Akua Abdul Mannan Road, Mymensingh',
      banglaAddress: 'আকুয়া মোড়লপাড়া, আকুয়া আব্দুল মান্নান রোড, ময়মনসিংহ',
      phone: '+880 1979-121434',
      altPhone: '+880 1712-121434',
      hours: 'Open 24 Hours (Day Out: 9:00 AM - 9:00 PM)',
      banglaHours: '২৪ ঘণ্টা খোলা (ডে ট্যুর: সকাল ৯:০০ - রাত ৯:০০)',
      rating: 4.8,
      reviewsCount: 3120,
      heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', // luxury resort pool
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', // luxury cottage room
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', // resort exterior
        'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80'  // night lighting & water
      ],
      description: 'The viral eco-luxury paradise in Mymensingh. Nestled in Akua Morolpara, Sarinda Sobari Resort features crystal-clear swimming pools, rustic wooden cottages, sprawling landscaped gardens, open-air BBQ pavilions, and premium event hosting.',
      banglaDescription: 'সামাজিক যোগাযোগ মাধ্যমে ভাইরাল হওয়া ময়মনসিংহের অন্যতম শ্রেষ্ঠ পর্যটন ও রিসোর্ট কেন্দ্র — যাকে অনেকেই ভালোবেসে বলেন ময়মনসিংহের "সুইজারল্যান্ড"। বিশাল সুইমিংপুল, নান্দনিক কাঠের কটেজ, সবুজ উদ্যান, শিশুদের খেলার পার্ক এবং উন্মুক্ত বারবিকিউ ডাইনিং।',
      highlights: [
        'Olympic-grade Crystal Clear Swimming Pool with kids wading section',
        'Premium Duplex & Single Wooden Eco-Cottages for overnight serene stays',
        'Day-Out Tour Pass with 100% Food Coupon Redemption (৳ 500 entry)',
        'Destination Wedding, Photoshoot & Corporate Conference Lawn'
      ],
      banglaHighlights: [
        'ঝলমলে সুইমিংপুল ও শিশুদের জন্য নিরাপদ ওয়াটার জোন',
        'রাত্রিযাপনের জন্য শীতাতপ নিয়ন্ত্রিত নান্দনিক কাঠের কটেজ ও স্যুট',
        '৳ ৫০০ টাকার প্রবেশ কুপন ব্যবস্থা — যা রেস্তোরাঁয় খাবারের জন্য ১০০% প্রযোজ্য',
        'ডে-ট্যুর, ফ্যামিলি পিকনিক, প্রি-ওয়েডিং ফটোশুট ও করপোরেট কনফারেন্স সুবিধা'
      ],
      badge: 'Top Viral Resort in Mymensingh',
      banglaBadge: 'ময়মনসিংহের সবচেয়ে জনপ্রিয় রিসোর্ট',
      actionType: 'book_resort',
      pricingOrSpec: [
        {
          label: 'Day Out Food Coupon Entry',
          banglaLabel: 'ডে-আউট প্রবেশ কুপন',
          price: '৳ ৫০০ / জনপ্রতি',
          details: 'Full ৳500 is completely redeemable for mouthwatering meals at the resort restaurant.',
          banglaDetails: 'পুরো ৫০০ টাকার খাবার রিসোর্টের রেস্তোরাঁ থেকে যেকোনো মেন্যুতে উপভোগ করতে পারবেন।'
        },
        {
          label: 'Executive Wooden Cottage',
          banglaLabel: 'এক্সিকিউটিভ উডেন কটেজ',
          price: '৳ ৪,৫০০ / রাত',
          details: 'Includes AC, King Bed, Pool Access, Free Breakfast for 2, Wi-Fi & Garden View.',
          banglaDetails: 'এসি, কিং সাইজ বেড, সুইমিংপুল অ্যাক্সেস, ২ জনের বুফে ব্রেকফাস্ট ও গার্ডেন ভিউ।'
        },
        {
          label: 'Presidential Poolside Suite',
          banglaLabel: 'প্রেসিডেন্সিয়াল পুলসাইড স্যুট',
          price: '৳ ৭,০০০ / রাত',
          details: 'Duplex suite facing pool, private balcony, Jacuzzi shower, 4 guests capacity.',
          banglaDetails: 'ডুপ্লেক্স কটেজ, সুইমিংপুল ভিউ প্রাইভেট বারান্দা, ৪ জনের আবাসন ও ভিআইপি সেবা।'
        },
        {
          label: 'Corporate / Wedding Lawn',
          banglaLabel: 'ওয়েডিং ও ইভেন্ট প্যাকেজ',
          price: 'কাস্টম কোটেশন',
          details: 'Up to 1,500 guests capacity with stage lighting, sound system & Sarinda catering.',
          banglaDetails: '১৫০০ অতিথির ধারণক্ষমতা, স্টেজ আলোকসজ্জা ও সারিন্দার এক্সক্লুসিভ ক্যাটারিং।'
        }
      ]
    },
    {
      id: 'sarinda-bakery',
      name: 'Sarinda Bakery & Confectionery',
      banglaName: 'সারিন্দা বেকারি অ্যান্ড কনফেকশনারি',
      category: 'Artisanal Bakery & Sweets',
      banglaCategory: 'আর্টিস্যানাল বেকারি, কেক ও খাঁটি মিষ্টি',
      established: '2012',
      tagline: 'Freshly Baked Celebration Cakes, Oven Pastries & Pure Sweets',
      banglaTagline: 'তাজা ওভেনে বেক করা ডিজাইনার কেক, পেস্ট্রি ও খাঁটি ঘিয়ে ভাজা মিষ্টি',
      address: 'Flagship: C.K. Ghosh Road | Branches: Charpara Mor & Notun Bazar',
      banglaAddress: 'প্রধান শাখা: সি.কে. ঘোষ রোড | শাখা: চরপাড়া মোড় ও নতুন বাজার',
      phone: '+880 1712-121434',
      altPhone: '+880 1834-535135',
      hours: '8:00 AM - 11:00 PM (Daily)',
      banglaHours: 'সকাল ৮:০০ - রাত ১১:০০ (প্রতিদিন)',
      rating: 4.9,
      reviewsCount: 1850,
      heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', // chocolate cake
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80', // croissants & pastries
        'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80', // desserts / sweets
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80'  // red velvet cake
      ],
      description: 'Mymensingh’s most beloved artisan bakery. We craft customized designer birthday cakes, velvety pastries, fresh oven breads, crunchy cookies, and authentic Bangladeshi sweets made with pure butter and ghee.',
      banglaDescription: 'ময়মনসিংহের অন্যতম প্রিয় বেকারি ব্র্যান্ড। প্রতিটি উৎসব ও জন্মদিনকে রাঙিয়ে তুলতে আমাদের রয়েছে এক্সক্লুসিভ কাস্টমাইজড কেক, মাখনের সুবাসিত পেস্ট্রি, টাটকা ওভেন ব্রেড ও খাঁটি ঘিয়ে তৈরি ঐতিহ্যবাহী মিষ্টি।',
      highlights: [
        '3D Custom Designer Birthday, Wedding & Anniversary Cakes',
        'Daily Live Baking: Croissants, Chicken Patties, Buns & Loaves',
        'Pure Ghee Bengali Sweets: Motichoor Ladoo, Rasmalai, Chamcham',
        '3 Prime Outlets in Mymensingh with Fast Home Delivery'
      ],
      banglaHighlights: [
        'জন্মদিন ও অ্যানিভার্সারির কাস্টম ডিজাইনার ৩ডি ফন্ড্যান্ট ও ট্রাফেল কেক',
        'প্রতিদিন ওভেনে তাজা বেকড ক্রিস্পি প্যাটিস, বাটার বান ও পেস্ট্রি',
        'খাঁটি ঘিয়ে তৈরি মতিচুর লাড্ডু, স্পঞ্জ রসগোল্লা, রসমালাই ও মিষ্টি',
        'ময়মনসিংহের ৩টি প্রধান পয়েন্টে আউটলেট ও দ্রুত ডেলিভারি'
      ],
      badge: 'Mymensingh Premier Bakery',
      banglaBadge: 'ময়মনসিংহের শীর্ষ বেকারি',
      actionType: 'order_cake',
      branches: [
        {
          name: 'C.K. Ghosh Road Flagship',
          banglaName: 'সি.কে. ঘোষ রোড প্রধান শাখা',
          address: '11 C.K. Ghosh Road, Mymensingh',
          banglaAddress: '১১ সি.কে. ঘোষ রোড, ময়মনসিংহ',
          phone: '+880 1712-121434'
        },
        {
          name: 'Charpara Mor Branch',
          banglaName: 'চরপাড়া মোড় শাখা',
          address: 'Charpara Medical Gate Road, Mymensingh',
          banglaAddress: 'চরপাড়া মেডিকেল গেট সংলগ্ন, ময়মনসিংহ',
          phone: '+880 1834-535135'
        },
        {
          name: 'Notun Bazar Branch',
          banglaName: 'নতুন বাজার শাখা',
          address: 'Notun Bazar Main Chowrasta, Mymensingh',
          banglaAddress: 'নতুন বাজার প্রধান চৌরাস্তা, ময়মনসিংহ',
          phone: '+880 1979-121434'
        }
      ],
      pricingOrSpec: [
        {
          label: 'Belgian Chocolate Truffle Cake',
          banglaLabel: 'বেলজিয়ান চকোলেট ট্রাফেল কেক',
          price: '৳ ১,২০০ / পাউন্ড',
          details: 'Rich dark Belgian chocolate ganache with moist sponge layer.',
          banglaDetails: 'খাঁটি বেলজিয়ান চকলেট গ্যানাশ ও নরম স্পঞ্জ লেয়ার।'
        },
        {
          label: 'Royal Red Velvet Cream Cheese',
          banglaLabel: 'রয়্যাল রেড ভেলভেট কেক',
          price: '৳ ১,৩০০ / পাউন্ড',
          details: 'Imported Philadelphia-style cream cheese frosting and velvety crumb.',
          banglaDetails: 'আমদানিকৃত ক্রিম চিজ ফ্রস্টিং ও মোলায়েম ভেলভেট ক্রাম্ব।'
        },
        {
          label: 'Shahi Motichoor Ladoo (Pure Ghee)',
          banglaLabel: 'শাহী মতিচুর লাড্ডু (খাঁটি ঘি)',
          price: '৳ ৭০০ / কেজি',
          details: 'Prepared in premium pure clarified butter and garnished with pistachios.',
          banglaDetails: 'খাঁটি গাওয়া ঘিয়ে ভাজা ও পেস্তা বাদামে সুসজ্জিত।'
        },
        {
          label: 'Live Fresh Chicken Puff Patties',
          banglaLabel: 'লাইভ চিকেন পাফ প্যাটিস',
          price: '৳ ৭০ / পিস',
          details: 'Golden crispy flaky puff pastry filled with spiced juicy chicken.',
          banglaDetails: 'মুচমুচে সোনালী বাটার পাফ পেস্ট্রিতে রসালো চিকেন পুর।'
        }
      ]
    },
    {
      id: 'sorgorom-restaurant',
      name: 'Sorgorom Restaurant & Cafe',
      banglaName: 'সরগরম রেস্টুরেন্ট অ্যান্ড ক্যাফে',
      category: 'Youth Hangout & Sizzlers',
      banglaCategory: 'সিজলিং ফুড, তরুণদের ক্যাফে ও আড্ডা',
      established: '2018',
      tagline: 'Smoking Hot Sizzlers, Juicy Burgers & Energetic Cafe Vibes',
      banglaTagline: 'ধোঁয়া ওঠা গরম সিজলার্স, রসালো বার্গার ও বন্ধুদের জমজমাট আড্ডা',
      address: 'Charpara Road, Mymensingh (Near Medical Area)',
      banglaAddress: 'চরপাড়া রোড (মেডিকেল সংলগ্ন), ময়মনসিংহ',
      phone: '+880 1834-535135',
      altPhone: '+880 1712-121434',
      hours: '7:30 AM - 10:30 PM (Daily)',
      banglaHours: 'সকাল ৭:৩০ - রাত ১০:৩০ (প্রতিদিন)',
      rating: 4.7,
      reviewsCount: 1980,
      heroImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', // sizzling steak
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', // burger
        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', // mocktail / drink
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'  // vibrant cafe vibe
      ],
      description: 'The liveliest youth and family hangout at Charpara, Mymensingh. Sorgorom is celebrated for its sizzling cast-iron platters, gourmet loaded burgers, authentic Bengali lunch items, rich cold coffees, and welcoming modern ambiance.',
      banglaDescription: 'ময়মনসিংহের তরুণ প্রজন্ম ও ভোজনরসিক পরিবারের অন্যতম পছন্দের ঠিকানা। চরপাড়া মোড়ের সরগরম বিখ্যাত তাদের ধোঁয়া ওঠা কাস্ট-আইরন সিজলিং প্ল্যাটিনাম ডিশ, রসালো মেগা বার্গার, থাই-চাইনিজ এবং বন্ধুদের প্রাণবন্ত আড্ডার জন্য।',
      highlights: [
        'Signature Sizzling Beef & Chicken Steaks with butter-herb glaze',
        'Gourmet Loaded Burgers with double cheese and house secret sauce',
        'Popular Bengali Lunch: Bhuna Beef, Rezala & Fragrant Polao',
        'Specialty Cold Coffee, Boba Shakes & Tropical Fruit Mocktails'
      ],
      banglaHighlights: [
        'কাস্ট আয়রন তাওয়ায় ধোঁয়া ওঠা সিজলিং বিফ ও চিকেন স্টেক',
        'ডাবল ক্রিস্পি চিকেন ও চিজি মেগা বাফেলো বার্গার',
        'দুপুরের জনপ্রিয় খাঁটি ভুনা বিফ, খাসির রেজালা ও কাচ্চি মেন্যু',
        'কোল্ড কফি, ফ্র্যাপে ও প্রাণজুড়ানো কালারফুল রিফ্রেশিং মকটেল'
      ],
      badge: 'Top Youth Hangout & Cafe',
      banglaBadge: 'জনপ্রিয় তরুণদের ক্যাফে',
      actionType: 'dine_sorgorom',
      pricingOrSpec: [
        {
          label: 'Sizzling Beef Pepper Steak',
          banglaLabel: 'সিজলিং বিফ পেপার স্টেক',
          price: '৳ ৪৯০',
          details: 'Prime beef steak served on smoking cast iron with sauteed veggies & mashed potato.',
          banglaDetails: 'ধোঁয়া ওঠা কাস্ট আয়রনে পরিবেশিত তুলতুলে বিফ স্টেক ও বাটার ভেজিটেবল।'
        },
        {
          label: 'Sorgorom Double Crunch Burger',
          banglaLabel: 'সরগরম ডাবল ক্রাঞ্চ বার্গার',
          price: '৳ ৩২০',
          details: 'Double fried crispy chicken patties, melted cheddar, lettuce & spicy garlic mayo.',
          banglaDetails: 'ডাবল ক্রিস্পি চিকেন প্যাটি, গলিত চেডার চিজ ও স্পাইসি গার্লিক মেয়ো।'
        },
        {
          label: 'Sizzling Hakka Chowmein',
          banglaLabel: 'সিজলিং হাক্কা চাউমিন',
          price: '৳ ৩৫০',
          details: 'Wok-tossed noodles with chicken, shrimp and bell peppers sizzling hot.',
          banglaDetails: 'চিকেন, প্রন ও ক্যাপসিকামের সুস্বাদু মিক্সড সিজলিং চাউমিন।'
        },
        {
          label: 'Blue Ocean Curacao Mocktail',
          banglaLabel: 'ব্লু ওশান কুরাসাও মকটেল',
          price: '৳ ১৮০',
          details: 'Refreshing citrus blue beverage garnished with fresh mint & crushed ice.',
          banglaDetails: 'লেমন-মিন্ট ও ব্লু কুরাসাও ব্লেন্ডেড বরফশীতল রিফ্রেশিং মকটেল।'
        }
      ]
    },
    {
      id: 'sarinda-lights',
      name: 'Sarinda Lights & Interior Décor',
      banglaName: 'সারিন্দা লাইটস অ্যান্ড ইন্টেরিয়র সলিউশনস',
      category: 'Architectural & Interior Lighting',
      banglaCategory: 'আধুনিক লাইটিং, ঝাড়বাতি ও ইন্টেরিয়র',
      established: '2021',
      tagline: 'Illuminating Elegance — Luxury Chandeliers, Smart LED & Architectural Lighting',
      banglaTagline: 'আলোকিত জীবনের রূপকার — রাজকীয় ক্রিস্টাল ঝাড়বাতি, স্মার্ট এলইডি ও রিসোর্ট লাইটিং',
      address: 'C.K. Ghosh Road Commercial Area, Mymensingh, Bangladesh',
      banglaAddress: 'সি.কে. ঘোষ রোড বাণিজ্যিক এলাকা, ময়মনসিংহ',
      phone: '+880 1712-121434',
      altPhone: '+880 1979-121434',
      hours: '10:00 AM - 9:00 PM (Saturday - Thursday)',
      banglaHours: 'সকাল ১০:০০ - রাত ৯:০০ (শনিবার - বৃহস্পতিবার)',
      rating: 4.9,
      reviewsCount: 680,
      heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80', // luxury crystal chandelier
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80', // pendant modern lamp
        'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80', // architectural resort lighting
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'  // luxury interior light
      ],
      description: 'The architectural lighting division of Sarinda Group. Powering the breathtaking nighttime illumination of Sarinda Sobari Resort, luxury duplex residences, banquets, and modern commercial spaces across Bangladesh with imported crystal chandeliers and smart LED lighting.',
      banglaDescription: 'সারিন্দা গ্রুপের আর্কিটেকচারাল লাইটিং ও ইন্টেরিয়র উইং। সারিন্দা সবারি রিসোর্টের চোখজুড়ানো রাতের আলোকসজ্জা যার হাত ধরে সৃষ্টি — সেই সারিন্দা লাইটস সরবরাহ করে আধুনিক রাজকীয় ঝাড়বাতি, ম্যাগনেটিক ট্র্যাক লাইট, আউটডোর গার্ডেন লাইট ও স্মার্ট এলইডি সলিউশন।',
      highlights: [
        'Imported High-Purity K9 Crystal Chandeliers for grand living rooms & banquets',
        'Outdoor Waterproof Landscape & Resort Illumination (Featured at Sobari Resort)',
        'Modern Magnetic Track Lights & Smart Ambient Dimmable Ceiling Profiles',
        'Turnkey Architectural Lighting Planning, Delivery & On-Site Installation'
      ],
      banglaHighlights: [
        'আভিজাত্যপূর্ণ কে৯ ক্রিস্টাল ঝাড়বাতি — ড্রয়িং রুম, কনভেনশন হল ও ডুপ্লেক্সের জন্য',
        'ওয়াটারপ্রুফ আউটডোর ল্যান্ডস্কেপ ও গার্ডেন লাইটিং (সবারি রিসোর্টে ব্যবহৃত)',
        'মডার্ন ম্যাগনেটিক ট্র্যাক লাইট ও স্মার্ট ওয়ার্ম হোয়াইট সিলিং প্রোফাইল',
        'অভিজ্ঞ ইঞ্জিনিয়ারদের দ্বারা সাইট ভিজিট, লাইটিং ডিজাইন ও কমপ্লিট ইনস্টলেশন'
      ],
      badge: 'Architectural Lighting Excellence',
      banglaBadge: 'প্রিমিয়াম ইন্টেরিয়র ও লাইটিং',
      actionType: 'inquire_lights',
      pricingOrSpec: [
        {
          label: 'Imperial K9 Grand Crystal Chandelier',
          banglaLabel: 'ইম্পেরিয়াল গ্র্যান্ড ক্রিস্টাল ঝাড়বাতি',
          price: '৳ ৩৫,০০০ - ৳ ১,২০,০০০',
          details: 'Multi-tiered genuine K9 leaded crystal with warm/cool adjustable LED drivers.',
          banglaDetails: 'মাল্টি-টায়ার পিওর ক্রিস্টাল, রিমোট কন্ট্রোল ও ট্রাই-কালার ডিমার সহ।'
        },
        {
          label: 'Resort & Landscape Garden Uplights (IP67)',
          banglaLabel: 'আউটডোর রিসোর্ট ল্যান্ডস্কেপ লাইট (IP67)',
          price: '৳ ১,৮০০ - ৳ ৪,৫০০ / পিস',
          details: 'Heavy-duty waterproof die-cast aluminum casing, warm 3000K accent beam.',
          banglaDetails: '১০০% ওয়াটারপ্রুফ অ্যালুমিনিয়াম বডি, বাগান ও গাছপালার মনোরম আলোকসজ্জা।'
        },
        {
          label: 'Smart Magnetic Track Light System',
          banglaLabel: 'স্মার্ট ম্যাগনেটিক ট্র্যাক লাইট সিস্টেম',
          price: '৳ ৩,২০০ / মিটার হতে শুরু',
          details: 'Recessed and surface-mounted ultra-slim track with adjustable spot & flood modules.',
          banglaDetails: 'আধুনিক সিলিংয়ের জন্য স্লিম ম্যাগনেটিক ট্র্যাক ও রিচার্জেবল ডিরেকশনাল স্পট।'
        },
        {
          label: 'Nordic Minimalist Dining Pendant',
          banglaLabel: 'নর্ডিক মিনিমালিস্ট ডাইনিং পেনড্যান্ট',
          price: '৳ ৪,৫০০ - ৳ ১২,০০০',
          details: 'Matte gold & black Scandinavian designer pendant lights for stylish dining areas.',
          banglaDetails: 'ম্যাট গোল্ড ফিনিশিং ও স্লো গ্লো লাইটিং সমৃদ্ধ আকর্ষণীয় পেনড্যান্ট।'
        }
      ]
    },
    {
      id: 'pizza-shuttle',
      name: 'Sarinda Pizza Shuttle',
      banglaName: 'সারিন্দা পিৎজা শাটল',
      category: 'Italian & Fast Food Delivery',
      banglaCategory: 'ইতালিয়ান পিৎজা ও ফাস্টফুড ডেলিভারি',
      established: '2016',
      tagline: 'Hot & Cheesy Oven-Baked Pizzas Delivered at Lightning Speed',
      banglaTagline: 'গরম ও চিজি প্রিমিয়াম পিৎজা আপনার দরজায় দ্রুততম সময়ে',
      address: 'C.K. Ghosh Road / Charpara Outlet, Mymensingh',
      banglaAddress: 'সি.কে. ঘোষ রোড ও চরপাড়া আউটলেট, ময়মনসিংহ',
      phone: '+880 1712-121434',
      altPhone: '+880 1834-535135',
      hours: '12:00 PM - 11:30 PM (Daily)',
      banglaHours: 'দুপুর ১২:০০ - রাত ১১:৩০ (প্রতিদিন)',
      rating: 4.8,
      reviewsCount: 1120,
      heroImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'The premier express pizza brand of Sarinda Group. Hand-tossed artisan dough, melted whole-milk mozzarella cheese, signature herbs and succulent toppings baked fresh and delivered piping hot.',
      banglaDescription: 'সারিন্দা গ্রুপের এক্সপ্রেস পিৎজা ব্র্যান্ড। হাতে তৈরি ফ্রেশ পিৎজা ডো, প্রিমিয়াম মজারেলা চিজ ও স্পাইসি টপিংস দিয়ে ওভেনে বেকড গরম গরম পিৎজা দ্রুততম সময়ে ডেলিভারি করা হয়।',
      highlights: [
        '100% Real Wisconsin-style Mozzarella with legendary cheese pull',
        'Stuffed Crust & Thin Crust Pizza variations in 8", 10" and 12" sizes',
        'Express 35-minute home delivery across all wards of Mymensingh',
        'Family Feast Combos with Cheesy Garlic Bread and Buffalo Wings'
      ],
      banglaHighlights: [
        '১০০% খাঁটি মজারেলা চিজের অসাধারণ চিজি পুল',
        'স্টাফড ক্রাস্ট, ডিপ ডিশ ও থিন ক্রাস্ট পিৎজার নানান ফ্লেভার',
        'ময়মনসিংহ শহরের সর্বত্র ৩৫ মিনিটে স্পিডি হোম ডেলিভারি',
        'গার্লিক ব্রেড ও স্পাইসি উইংস সহ আকর্ষণীয় কম্বো অফার'
      ],
      badge: 'City Favorite Pizza Delivery',
      banglaBadge: 'শহরের প্রিয় পিৎজা ডেলিভারি',
      actionType: 'order_pizza'
    },
    {
      id: 'starline-sparkle',
      name: 'Starline Sparkle Lifestyle & Grooming',
      banglaName: 'স্টারলাইন স্পার্কল লাইফস্টাইল সেলুন',
      category: 'Grooming & Lifestyle',
      banglaCategory: 'গ্রুমিং, বিউটি ও প্রিমিয়াম সেলুন',
      established: '2020',
      tagline: 'Modern Elegance — Signature Grooming, Hair Care & Wellness',
      banglaTagline: 'আধুনিক রুচি ও পরিপাটি জীবনের বিশ্বস্ত প্রিমিয়াম সেলুন',
      address: 'C.K. Ghosh Road, Mymensingh, Bangladesh',
      banglaAddress: 'সি.কে. ঘোষ রোড, ময়মনসিংহ',
      phone: '+880 1979-121434',
      hours: '10:00 AM - 9:30 PM (Daily)',
      banglaHours: 'সকাল ১০:০০ - রাত ৯:৩০ (প্রতিদিন)',
      rating: 4.7,
      reviewsCount: 520,
      heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'Executive salon and grooming parlour under Sarinda Group offering bridal makeovers, gent’s grooming, skin therapy, and luxury spa treatments.',
      banglaDescription: 'সারিন্দা গ্রুপের প্রিমিয়াম লাইফস্টাইল ও সেলুন উইং। আধুনিক হেয়ার কাট, ব্রাইডাল মেকওভার, স্কিন থেরাপি এবং স্বাস্থ্যসম্মত রিফ্রেশিং স্পা সেবা।',
      highlights: [
        'Certified Stylists & Hygienic Sanitized Equipment',
        'Bridal, Groom & Event Special Makeovers',
        'Advanced Hair Spa, Keratin & Organic Skin Facials'
      ],
      banglaHighlights: [
        'দক্ষ ও সার্টিফাইড স্টাইলিস্ট এবং সম্পূর্ণ জীবাণুমুক্ত পরিবেশ',
        'বর-কনে ও বিশেষ উৎসবের আকর্ষণীয় মেকওভার প্যাকেজ',
        'অ্যাডভান্সড হেয়ার স্পা, কেরাটিন ও স্কিন ফেসিয়াল ট্রিটমেন্ট'
      ],
      badge: 'Lifestyle & Wellness',
      banglaBadge: 'লাইফস্টাইল ও ওয়েলনেস',
      actionType: 'book_salon'
    }
  ],
  milestones: [
    {
      year: '2008',
      title: 'The Inception of Sarinda Restaurant',
      banglaTitle: 'সারিন্দা রেস্টুরেন্টের যাত্রা শুরু',
      description: 'Founded at CK Ghosh Road, Mymensingh with a commitment to pure Mughlai taste and high-hygiene Bengali dining.',
      banglaDescription: 'সি.কে. ঘোষ রোডে খাঁটি মুঘলাই স্বাদ ও স্বাস্থ্যকর বাঙালি খাবারের প্রতিশ্রুতি নিয়ে সারিন্দা রেস্টুরেন্টের জন্ম।',
      brand: 'Sarinda Restaurant'
    },
    {
      year: '2012',
      title: 'Sarinda Bakery & Confectionery Launched',
      banglaTitle: 'সারিন্দা বেকারির যাত্রা',
      description: 'Expanded into artisanal live bakery and traditional sweets, quickly expanding to three strategic outlets in Mymensingh.',
      banglaDescription: 'লাইভ ওভেন বেকারি ও খাঁটি ঘিয়ে ভাজা মিষ্টির সমাহার নিয়ে যাত্রা শুরু করে সারিন্দা বেকারি।',
      brand: 'Sarinda Bakery'
    },
    {
      year: '2016',
      title: 'Pizza Shuttle Express Introduced',
      banglaTitle: 'পিৎজা শাটল ডেলিভারির সূচনা',
      description: 'Pioneered rapid hot pizza delivery in Mymensingh with cheese-filled gourmet options.',
      banglaDescription: 'ময়মনসিংহে স্পিডি গরম পিৎজা ডেলিভারি সেবা নিশ্চিত করতে পিৎজা শাটলের সূচনা।',
      brand: 'Pizza Shuttle'
    },
    {
      year: '2018',
      title: 'Sorgorom Restaurant Opened at Charpara',
      banglaTitle: 'চরপাড়ায় সরগরম রেস্টুরেন্ট স্থাপন',
      description: 'Established the iconic youth hangout specializing in sizzling platters, steaks, burgers, and cafe ambiance.',
      banglaDescription: 'সিজলার্স, স্টেক, বার্গার ও ক্যাফে আড্ডার প্রিয় ঠিকানা হিসেবে চরপাড়ায় সরগরমের শুভ উদ্বোধন।',
      brand: 'Sorgorom Restaurant'
    },
    {
      year: '2020',
      title: 'Starline Sparkle Salon & Lifestyle Expansion',
      banglaTitle: 'স্টারলাইন স্পার্কল সেলুনের অভিষেক',
      description: 'Diversified into high-end personal grooming and bridal salon services.',
      banglaDescription: 'ব্যক্তিগত রূপচর্চা ও আধুনিক গ্রুমিং সেবার প্রসারে স্টারলাইন স্পার্কলের প্রতিষ্ঠা।',
      brand: 'Starline Sparkle'
    },
    {
      year: '2021',
      title: 'Sarinda Lights & Interior Décor Established',
      banglaTitle: 'সারিন্দা লাইটস অ্যান্ড ইন্টেরিয়রের যাত্রা',
      description: 'Formed architectural lighting consultancy supplying grand crystal chandeliers and smart landscape illumination.',
      banglaDescription: 'প্রিমিয়াম ক্রিস্টাল ঝাড়বাতি ও আউটডোর রিসোর্ট আলোকসজ্জার বিশ্বস্ত সমাধান হিসেবে প্রতিষ্ঠা।',
      brand: 'Sarinda Lights'
    },
    {
      year: '2022',
      title: 'Sarinda Sobari Resort — The Grand Opening',
      banglaTitle: 'সারিন্দা সবারি রিসোর্টের মহোৎসব',
      description: 'Unveiled the viral eco-paradise in Akua Morolpara, celebrated statewide as the "Switzerland of Mymensingh".',
      banglaDescription: 'আকুয়া মোড়লপাড়ায় সুইমিংপুল ও কটেজ নিয়ে গড়ে ওঠে ময়মনসিংহের সুইজারল্যান্ড খ্যাত সবারি রিসোর্ট।',
      brand: 'Sarinda Sobari Resort'
    },
    {
      year: '2025-2026',
      title: 'Unified Digital Ecosystem & Corporate Growth',
      banglaTitle: 'সারিন্দা গ্রুপ সমন্বিত ডিজিটাল প্ল্যাটফর্ম',
      description: 'Connecting all sister concerns under Sarinda Group with online ordering, resort booking, and smart POS.',
      banglaDescription: 'গ্রুপের সকল অঙ্গপ্রতিষ্ঠানকে এক ছাতার নিচে নিয়ে এসে ডিজিটাল সেবা ও আধুনিক বুকিং নিশ্চিতকরণ।',
      brand: 'Sarinda Group'
    }
  ],
  leadership: {
    chairman: {
      name: 'Haji Md. Rafiqul Islam',
      banglaName: 'হাজী মোঃ রফিকুল ইসলাম',
      role: 'Chairman, Sarinda Group',
      banglaRole: 'চেয়ারম্যান, সারিন্দা গ্রুপ',
      message: 'From day one in 2008, our unwavering focus has been honesty, hospitality, and uncompromised quality. We consider every resident of Mymensingh and every traveler a guest of our family.',
      banglaMessage: '২০০৮ সালে প্রথম যাত্রার দিন থেকেই আমাদের মূল লক্ষ্য ছিল সততা, খাঁটি আতিথেয়তা ও আপসহীন মান। ময়মনসিংহের প্রতিটি মানুষ এবং দেশ-বিদেশের অতিথিদের আমরা নিজেদের পরিবারের অংশ মনে করি।',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    managingDirector: {
      name: 'Engr. Tanvir Ahmed',
      banglaName: 'ইঞ্জি. তানভীর আহমেদ',
      role: 'Managing Director, Sarinda Group',
      banglaRole: 'ম্যানেজিং ডিরেক্টর, সারিন্দা গ্রুপ',
      message: 'By blending traditional Bengali warmth with cutting-edge architecture, hygienic culinary standards, and digital convenience, we are building a progressive lifestyle empire for generations.',
      banglaMessage: 'আমাদের লক্ষ্য ঐতিহ্যবাহী বাঙালি আবেগের সাথে আধুনিক আর্কিটেকচার, শতভাগ স্বাস্থ্যসম্মত খাদ্য প্রস্তুতপ্রণালী ও ডিজিটাল সেবাকে একত্রিত করে একটি আন্তর্জাতিক মানের লাইফস্টাইল প্রতিষ্ঠান গড়ে তোলা।',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
    }
  }
};
