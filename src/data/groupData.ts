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
  slogan: 'Excellence in Hospitality, Leisure & Modern Living',
  banglaSlogan: 'আতিথেয়তা, প্রাকৃতিক অবকাশ ও স্বাদের অনন্য মেলবন্ধন',
  establishedYear: 2008,
  hqAddress: '11 C.K. Ghosh Road, Mymensingh, Bangladesh',
  banglaHqAddress: '১১ সি.কে. ঘোষ রোড, ময়মনসিংহ',
  hotline: '+880 1712-121434',
  altHotline: '+880 1979-121434',
  email: 'contact@sarindagroup.com',
  stats: {
    experienceYears: '১৮+',
    sisterBrands: '৭টি',
    activeOutlets: '১৫+',
    teamMembers: '৫০০+',
    annualGuests: '১৫ লাখ+'
  },
  ventures: [
    {
      id: 'sarinda-restaurant',
      name: 'Sarinda Restaurant & Catering',
      banglaName: 'সারিন্দা রেস্টুরেন্ট অ্যান্ড ক্যাটারিং',
      category: 'Culinary & Fine Dining',
      banglaCategory: 'ঐতিহ্যবাহী রেস্তোরাঁ ও রাজকীয় ক্যাটারিং',
      established: '2008',
      tagline: 'Mymensingh’s Legendary Shahi Kacchi Biryani',
      banglaTagline: 'ময়মনসিংহের বিখ্যাত শাহী দম কাচ্চি ও খাঁটি স্বাদ',
      address: '11 C.K. Ghosh Road, Mymensingh',
      banglaAddress: '১১ সি.কে. ঘোষ রোড, ময়মনসিংহ',
      phone: '+880 1712-121434',
      altPhone: '+880 1979-121434',
      hours: '11:00 AM - 11:30 PM',
      banglaHours: 'সকাল ১১:০০ - রাত ১১:৩০',
      rating: 4.9,
      reviewsCount: 2450,
      heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'Slow-cooked Shahi Dam Kacchi Biryani, Mughlai delicacies, VIP private cabins, and grand banquet catering for up to 5,000 guests.',
      banglaDescription: 'খাঁটি ঘি ও গোপন মসলায় তামার ডেকে ঐতিহ্যবাহী দম কাচ্চি, খাসির রেজালা, ভিআইপি ফ্যামিলি কেবিন ও ৫০০০+ অতিথির রাজকীয় ক্যাটারিং।',
      highlights: [
        'Slow-cooked Kacchi Biryani with farm-fresh Mutton',
        'Air-conditioned VIP Family Cabins',
        'Grand Wedding & Corporate Catering',
        '35-Minute Fast City Delivery'
      ],
      banglaHighlights: [
        'খাঁটি খাসির মাংসের দম কাচ্চি ও মোরগ পোলাও',
        'পরিবারের জন্য নিরিবিলি ভিআইপি কেবিন',
        'বিয়ে ও করপোরেট রাজকীয় ক্যাটারিং',
        '৩৫ মিনিটে এক্সপ্রেস সিটি ডেলিভারি'
      ],
      badge: 'Flagship Restaurant',
      banglaBadge: 'মূল রেস্তোরাঁ',
      actionType: 'order_food'
    },
    {
      id: 'sobari-resort',
      name: 'Sarinda Sobari Resort',
      banglaName: 'সারিন্দা সবারি রিসোর্ট',
      category: 'Resort & Eco-Hospitality',
      banglaCategory: 'ইকো রিসোর্ট, সুইমিংপুল ও অবকাশ',
      established: '2022',
      tagline: 'The "Switzerland of Mymensingh" — Azure Pool & Cottages',
      banglaTagline: 'ময়মনসিংহের সুইজারল্যান্ড — সবুজ প্রকৃতি, সুইমিংপুল ও কটেজ',
      address: 'Akua Morolpara, Mymensingh',
      banglaAddress: 'আকুয়া মোড়লপাড়া, ময়মনসিংহ',
      phone: '+880 1979-121434',
      altPhone: '+880 1712-121434',
      hours: '24/7 (Day-out: 9 AM - 9 PM)',
      banglaHours: '২৪ ঘণ্টা খোলা (ডে ট্যুর: ৯:০০ - ৯:০০)',
      rating: 4.8,
      reviewsCount: 3120,
      heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'The viral eco-luxury paradise in Mymensingh with crystal swimming pools, rustic wooden cottages, day tours, and 100% redeemable food coupons.',
      banglaDescription: 'বিশাল সুইমিংপুল, নান্দনিক কাঠের কটেজ ও সবুজ প্রকৃতির স্বপ্নপুরী। ৫০০ টাকার প্রবেশ কুপন—যা রেস্তোরাঁর সুস্বাদু খাবারে ১০০% ব্যবহারযোগ্য।',
      highlights: [
        'Crystal Swimming Pool & Kids Water Zone',
        'Serene Duplex Wooden Eco-Cottages',
        '৳500 Entry Pass = 100% Food Coupon Credit',
        'Wedding Photoshoot & Corporate Lawn'
      ],
      banglaHighlights: [
        'ঝলমলে সুইমিংপুল ও নিরাপদ ওয়াটার জোন',
        'নান্দনিক কাঠের ডুপ্লেক্স ইকো-কটেজ',
        '৳ ৫০০ এন্ট্রি কুপন = ১০০% খাবারের ক্রেডিট',
        'ফ্যামিলি পিকনিক ও ফটোশুট স্পট'
      ],
      badge: 'Viral Eco Resort',
      banglaBadge: 'ভাইরাল ইকো রিসোর্ট',
      actionType: 'book_resort',
      pricingOrSpec: [
        {
          label: 'Day Out Food Coupon Pass',
          banglaLabel: 'ডে-আউট ফুড কুপন পাস',
          price: '৳ ৫০০ / জন',
          details: 'Full ৳500 is completely redeemable for mouthwatering meals at the resort restaurant.',
          banglaDetails: 'পুরো ৫০০ টাকার খাবার রিসোর্টের রেস্তোরাঁ থেকে উপভোগ করা যাবে।'
        },
        {
          label: 'Executive Wooden Cottage',
          banglaLabel: 'উডেন কটেজ রাত্রিযাপন',
          price: '৳ ৪,৫০০ / রাত',
          details: 'Includes AC, King Bed, Pool Access, Free Breakfast for 2, Wi-Fi & Garden View.',
          banglaDetails: 'এসি, কিং বেড, সুইমিংপুল অ্যাক্সেস ও ২ জনের ফ্রি ব্রেকফাস্ট।'
        },
        {
          label: 'Presidential Poolside Suite',
          banglaLabel: 'প্রেসিডেন্সিয়াল পুলসাইড স্যুট',
          price: '৳ ৭,০০০ / রাত',
          details: 'Duplex suite facing pool, private balcony, Jacuzzi shower, 4 guests capacity.',
          banglaDetails: 'ডুপ্লেক্স স্যুট, প্রাইভেট বারান্দা ও ৪ জনের ভিআইপি সুবিধা।'
        },
        {
          label: 'Wedding & Event Lawn',
          banglaLabel: 'ওয়েডিং ও ইভেন্ট লন',
          price: 'কাস্টম কোটেশন',
          details: 'Up to 1,500 guests capacity with stage lighting, sound system & Sarinda catering.',
          banglaDetails: '১৫০০ অতিথির ধারণক্ষমতা, লাইটিং ও এক্সক্লুসিভ ক্যাটারিং।'
        }
      ]
    },
    {
      id: 'sarinda-bakery',
      name: 'Sarinda Bakery & Confectionery',
      banglaName: 'সারিন্দা বেকারি অ্যান্ড কনফেকশনারি',
      category: 'Artisanal Bakery & Sweets',
      banglaCategory: 'ডিজাইনার কেক, পেস্ট্রি ও খাঁটি মিষ্টি',
      established: '2012',
      tagline: 'Custom 3D Celebration Cakes & Fresh Oven Bakes',
      banglaTagline: 'কাস্টম ডিজাইনার কেক, তাজা পেস্ট্রি ও খাঁটি মিষ্টি',
      address: 'Flagship: C.K. Ghosh Road | Outlets: Charpara & Notun Bazar',
      banglaAddress: 'প্রধান শাখা: সি.কে. ঘোষ রোড | শাখা: চরপাড়া ও নতুন বাজার',
      phone: '+880 1712-121434',
      altPhone: '+880 1834-535135',
      hours: '8:00 AM - 11:00 PM',
      banglaHours: 'সকাল ৮:০০ - রাত ১১:০০',
      rating: 4.9,
      reviewsCount: 1850,
      heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'Artisanal designer birthday and wedding cakes, warm flaky pastries, oven-baked cookies, and pure ghee traditional sweets across 3 outlets.',
      banglaDescription: 'জন্মদিন ও বিশেষ উৎসবের কাস্টম থিম কেক, ওভেনের তাজা পেস্ট্রি, বাটার কুকিজ ও খাঁটি ঘিয়ে তৈরি ঐতিহ্যবাহী মিষ্টি।',
      highlights: [
        'Custom 3D Fondant & Belgian Truffle Cakes',
        'Daily Live Baking: Patties, Croissants & Breads',
        'Pure Ghee Bengali Sweets & Rasmalai',
        '3 Convenient City Outlets in Mymensingh'
      ],
      banglaHighlights: [
        'কাস্টম ৩ডি ফন্ড্যান্ট ও চকোলেট ট্রাফেল কেক',
        'প্রতিদিন তাজা বেকড পাফ প্যাটিস ও পেস্ট্রি',
        'খাঁটি ঘিয়ে তৈরি মতিচুর লাড্ডু ও মিষ্টি',
        'ময়মনসিংহে ৩টি সুসজ্জিত আউটলেট'
      ],
      badge: 'Premier Bakery',
      banglaBadge: 'প্রিমিয়াম বেকারি',
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
          banglaAddress: 'চরপাড়া মেডিকেল গেট, ময়মনসিংহ',
          phone: '+880 1834-535135'
        },
        {
          name: 'Notun Bazar Branch',
          banglaName: 'নতুন বাজার শাখা',
          address: 'Notun Bazar Main Chowrasta, Mymensingh',
          banglaAddress: 'নতুন বাজার চৌরাস্তা, ময়মনসিংহ',
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
          details: 'Imported cream cheese frosting and velvety crumb.',
          banglaDetails: 'প্রিমিয়াম ক্রিম চিজ ফ্রস্টিং ও নরম ভেলভেট ক্রাম্ব।'
        },
        {
          label: 'Shahi Motichoor Ladoo (Pure Ghee)',
          banglaLabel: 'শাহী মতিচুর লাড্ডু (খাঁটি ঘি)',
          price: '৳ ৭০০ / কেজি',
          details: 'Prepared in pure ghee and garnished with pistachios.',
          banglaDetails: 'খাঁটি গাওয়া ঘিয়ে ভাজা ও পেস্তা বাদামে সাজানো।'
        },
        {
          label: 'Live Fresh Chicken Puff Patties',
          banglaLabel: 'লাইভ চিকেন পাফ প্যাটিস',
          price: '৳ ৭০ / পিস',
          details: 'Golden crispy flaky puff pastry filled with juicy chicken.',
          banglaDetails: 'মুচমুচে বাটার পাফ পেস্ট্রিতে রসালো চিকেন পুর।'
        }
      ]
    },
    {
      id: 'sorgorom-restaurant',
      name: 'Sorgorom Restaurant & Cafe',
      banglaName: 'সরগরম রেস্টুরেন্ট অ্যান্ড ক্যাফে',
      category: 'Sizzlers, Steaks & Cafe',
      banglaCategory: 'সিজলিং ফুড, ক্যাফে ও জমজমাট আড্ডা',
      established: '2018',
      tagline: 'Sizzling Steaks, Loaded Burgers & Cafe Vibes',
      banglaTagline: 'ধোঁয়া ওঠা সিজলার্স, মেগা বার্গার ও প্রাণবন্ত আড্ডা',
      address: 'Charpara Road, Mymensingh',
      banglaAddress: 'চরপাড়া রোড, ময়মনসিংহ',
      phone: '+880 1834-535135',
      altPhone: '+880 1712-121434',
      hours: '7:30 AM - 10:30 PM',
      banglaHours: 'সকাল ৭:৩০ - রাত ১০:৩০',
      rating: 4.7,
      reviewsCount: 1980,
      heroImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'The energetic youth hangout in Charpara famous for cast-iron sizzling steaks, loaded burgers, rich cold coffees, and authentic Bengali lunch curries.',
      banglaDescription: 'চরপাড়া মোড়ের সবচেয়ে প্রিয় আড্ডার স্থান—ধোঁয়া ওঠা সিজলিং স্টেক, ক্রিস্পি বার্গার, রিফ্রেশিং মকটেল ও খাঁটি বাঙালি খাবারের সমাহার।',
      highlights: [
        'Sizzling Beef & Chicken Cast-Iron Steaks',
        'Gourmet Double-Cheese Loaded Burgers',
        'Traditional Bhuna Beef & Rezala Lunch',
        'Espresso, Cold Coffee & Mocktail Bar'
      ],
      banglaHighlights: [
        'কাস্ট আয়রন তাওয়ায় ধোঁয়া ওঠা সিজলিং স্টেক',
        'ডাবল চিজ সমৃদ্ধ ক্রাঞ্চি মেগা বার্গার',
        'দুপুরের জনপ্রিয় খাঁটি ভুনা বিফ ও খাসির রেজালা',
        'রিফ্রেশিং মকটেল ও কোল্ড কফি বার'
      ],
      badge: 'Youth & Cafe Hangout',
      banglaBadge: 'জনপ্রিয় ক্যাফে',
      actionType: 'dine_sorgorom',
      pricingOrSpec: [
        {
          label: 'Sizzling Beef Pepper Steak',
          banglaLabel: 'সিজলিং বিফ পেপার স্টেক',
          price: '৳ ৪৯০',
          details: 'Prime beef steak served on smoking cast iron with sauteed veggies.',
          banglaDetails: 'ধোঁয়া ওঠা কাস্ট আয়রনে পরিবেশিত তুলতুলে বিফ স্টেক।'
        },
        {
          label: 'Sorgorom Double Crunch Burger',
          banglaLabel: 'সরগরম ডাবল ক্রাঞ্চ বার্গার',
          price: '৳ ৩২০',
          details: 'Double fried crispy chicken patties with melted cheddar.',
          banglaDetails: 'ডাবল ক্রিস্পি চিকেন প্যাটি ও গলিত চেডার চিজ।'
        },
        {
          label: 'Sizzling Hakka Chowmein',
          banglaLabel: 'সিজলিং হাক্কা চাউমিন',
          price: '৳ ৩৫০',
          details: 'Wok-tossed noodles with chicken, shrimp and bell peppers.',
          banglaDetails: 'চিকেন ও প্রন সমৃদ্ধ সুস্বাদু মিক্সড সিজলিং চাউমিন।'
        },
        {
          label: 'Blue Ocean Curacao Mocktail',
          banglaLabel: 'ব্লু ওশান কুরাসাও মকটেল',
          price: '৳ ১৮০',
          details: 'Refreshing citrus blue beverage garnished with fresh mint.',
          banglaDetails: 'লেমন-মিন্ট ব্লেন্ডেড বরফশীতল রিফ্রেশিং মকটেল।'
        }
      ]
    },
    {
      id: 'sarinda-lights',
      name: 'Sarinda Lights, Fans & Electricals',
      banglaName: 'সারিন্দা লাইটস, ফ্যান ও ইলেকট্রিক্যালস',
      category: 'Lighting, Fans & Interior',
      banglaCategory: 'ঝাড়বাতি, সিলিং ফ্যান ও আধুনিক লাইটিং',
      established: '2021',
      tagline: 'Luxury Chandeliers, Smart Ceiling Fans & Architectural Lighting',
      banglaTagline: 'রাজকীয় ক্রিস্টাল ঝাড়বাতি, লাক্সারি সিলিং ফ্যান ও স্মার্ট লাইটিং',
      address: 'C.K. Ghosh Road Commercial Area, Mymensingh',
      banglaAddress: 'সি.কে. ঘোষ রোড বাণিজ্যিক এলাকা, ময়মনসিংহ',
      phone: '+880 1712-121434',
      altPhone: '+880 1979-121434',
      hours: '10:00 AM - 9:00 PM',
      banglaHours: 'সকাল ১০:০০ - রাত ৯:০০',
      rating: 4.9,
      reviewsCount: 680,
      heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'Powering the night illumination of Sarinda Sobari Resort. Premium imported K9 crystal chandeliers, luxury smart BLDC ceiling fans, and architectural LED profiles.',
      banglaDescription: 'সবারি রিসোর্টের রাতের নান্দনিক আলোকসজ্জার রূপকার। আমদানিকৃত রাজকীয় ঝাড়বাতি, আধুনিক বিএলডিসি ডেকোরেটিভ ফ্যান ও স্মার্ট সিলিং লাইটিং সলিউশন।',
      highlights: [
        'Imported High-Purity K9 Crystal Chandeliers',
        'Luxury BLDC Energy-Saving Decorative Ceiling Fans',
        'Resort & Garden Waterproof Uplights (IP67)',
        'Magnetic Track Lighting & Complete Installation'
      ],
      banglaHighlights: [
        'আভিজাত্যপূর্ণ কে৯ ক্রিস্টাল ঝাড়বাতি',
        'বিদ্যুৎসাশ্রয়ী লাক্সারি ডেকোরেটিভ সিলিং ফ্যান',
        'আইপি৬৭ ওয়াটারপ্রুফ আউটডোর রিসোর্ট লাইট',
        'ম্যাগনেটিক ট্র্যাক ও ফুল প্রজেক্ট ইনস্টলেশন'
      ],
      badge: 'Lighting & Fans',
      banglaBadge: 'লাইটিং ও ফ্যান শোরুম',
      actionType: 'inquire_lights',
      pricingOrSpec: [
        {
          label: 'Imperial K9 Crystal Chandelier',
          banglaLabel: 'ইম্পেরিয়াল গ্র্যান্ড ক্রিস্টাল ঝাড়বাতি',
          price: '৳ ৩৫,০০০ - ৳ ১,২০,০০০',
          details: 'Multi-tiered genuine K9 crystal with remote control & tri-color dimming.',
          banglaDetails: 'মাল্টি-টায়ার পিওর ক্রিস্টাল, রিমোট কন্ট্রোল ও ট্রাই-কালার ডিমার সহ।'
        },
        {
          label: 'Sarinda Luxury BLDC Ceiling Fan',
          banglaLabel: 'লাক্সারি বিএলডিসি স্মার্ট সিলিং ফ্যান',
          price: '৳ ৮,৫০০ - ৳ ১৮,৫০০',
          details: 'Super silent BLDC motor, 65% energy saving, aerodynamic blades & remote.',
          banglaDetails: 'শব্দহীন বিএলডিসি মোটর, ৬৫% বিদ্যুৎসাশ্রয়ী, নান্দনিক ব্লেড ও রিমোট।'
        },
        {
          label: 'Resort Waterproof Garden Uplights',
          banglaLabel: 'আউটডোর রিসোর্ট ল্যান্ডস্কেপ লাইট (IP67)',
          price: '৳ ১,৮০০ - ৳ ৪,৫০০ / পিস',
          details: 'Heavy-duty waterproof die-cast aluminum casing for gardens & pools.',
          banglaDetails: '১০০% ওয়াটারপ্রুফ অ্যালুমিনিয়াম বডি, বাগান ও সুইমিংপুলের আলোকসজ্জা।'
        },
        {
          label: 'Smart Magnetic Track Light System',
          banglaLabel: 'স্মার্ট ম্যাগনেটিক ট্র্যাক লাইট সিস্টেম',
          price: '৳ ৩,২০০ / মিটার থেকে শুরু',
          details: 'Ultra-slim recessed magnetic track with directional LED spots.',
          banglaDetails: 'আধুনিক সিলিংয়ের জন্য স্লিম ম্যাগনেটিক ট্র্যাক ও ডিরেকশনাল স্পট।'
        }
      ]
    },
    {
      id: 'pizza-shuttle',
      name: 'Sarinda Pizza Shuttle',
      banglaName: 'সারিন্দা পিৎজা শাটল',
      category: 'Italian & Pizza Delivery',
      banglaCategory: 'ইতালিয়ান পিৎজা ও দ্রুত ডেলিভারি',
      established: '2016',
      tagline: 'Hot & Cheesy Oven-Baked Pizzas in 35 Mins',
      banglaTagline: 'গরম ও চিজি প্রিমিয়াম পিৎজা ৩৫ মিনিটে আপনার দরজায়',
      address: 'C.K. Ghosh Road / Charpara Outlet, Mymensingh',
      banglaAddress: 'সি.কে. ঘোষ রোড ও চরপাড়া আউটলেট, ময়মনসিংহ',
      phone: '+880 1712-121434',
      altPhone: '+880 1834-535135',
      hours: '12:00 PM - 11:30 PM',
      banglaHours: 'দুপুর ১২:০০ - রাত ১১:৩০',
      rating: 4.8,
      reviewsCount: 1120,
      heroImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'Hand-tossed artisan dough, whole-milk mozzarella cheese, and signature herbs baked fresh with 35-minute express city delivery.',
      banglaDescription: 'হাতে তৈরি ফ্রেশ ডো, ১০০% খাঁটি মোজারেলা চিজ ও স্পাইসি টপিংসে ওভেনে বেক করা গরম গরম পিৎজা দ্রুততম সময়ে ডেলিভারি।',
      highlights: [
        '100% Real Whole Mozzarella with Legendary Cheese Pull',
        'Stuffed Crust & Thin Crust Pizza Variations',
        '35-Minute Fast Delivery in Mymensingh',
        'Family Feast Combos with Garlic Bread'
      ],
      banglaHighlights: [
        '১০০% খাঁটি মোজারেলা চিজের চিজি পুল',
        'স্টাফড ক্রাস্ট ও থিন ক্রাস্ট পিৎজা',
        'ময়মনসিংহ শহরে ৩৫ মিনিটে ডেলিভারি',
        'গার্লিক ব্রেড ও উইংস সহ কম্বো অফার'
      ],
      badge: 'Express Pizza',
      banglaBadge: 'এক্সপ্রেস পিৎজা',
      actionType: 'order_pizza'
    },
    {
      id: 'starline-sparkle',
      name: 'Starline Sparkle Lifestyle & Grooming',
      banglaName: 'স্টারলাইন স্পার্কল লাইফস্টাইল সেলুন',
      category: 'Grooming & Lifestyle',
      banglaCategory: 'গ্রুমিং, বিউটি ও প্রিমিয়াম সেলুন',
      established: '2020',
      tagline: 'Modern Elegance — Signature Grooming & Wellness',
      banglaTagline: 'আধুনিক রুচি ও পরিপাটি জীবনের বিশ্বস্ত সেলুন',
      address: 'C.K. Ghosh Road, Mymensingh',
      banglaAddress: 'সি.কে. ঘোষ রোড, ময়মনসিংহ',
      phone: '+880 1979-121434',
      hours: '10:00 AM - 9:30 PM',
      banglaHours: 'সকাল ১০:০০ - রাত ৯:৩০',
      rating: 4.7,
      reviewsCount: 520,
      heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'Executive grooming parlour under Sarinda Group offering bridal makeovers, gent’s styling, skin therapy, and organic wellness.',
      banglaDescription: 'সারিন্দা গ্রুপের প্রিমিয়াম সেলুন উইং—হেয়ার কাট, ব্রাইডাল মেকওভার, স্কিন থেরাপি ও সম্পূর্ণ স্বাস্থ্যসম্মত রিফ্রেশিং স্পা সেবা।',
      highlights: [
        'Certified Stylists & Sanitized Suites',
        'Bridal, Groom & Event Special Makeovers',
        'Advanced Hair Spa & Organic Facials'
      ],
      banglaHighlights: [
        'দক্ষ স্টাইলিস্ট ও জীবাণুমুক্ত পরিবেশ',
        'বর-কনে ও উৎসবের মেকওভার প্যাকেজ',
        'অ্যাডভান্সড হেয়ার স্পা ও ফেসিয়াল'
      ],
      badge: 'Lifestyle & Spa',
      banglaBadge: 'লাইফস্টাইল ও স্পা',
      actionType: 'book_salon'
    }
  ],
  milestones: [
    {
      year: '২০০৮',
      title: 'Inception of Sarinda Restaurant',
      banglaTitle: 'সারিন্দা রেস্টুরেন্টের ঐতিহাসিক সূচনা',
      description: 'Started at CK Ghosh Road with authentic Mughlai and Bengali cuisine.',
      banglaDescription: 'সি.কে. ঘোষ রোডে খাঁটি মুঘলাই স্বাদ ও বাঙালি খাবারের অনন্য অঙ্গীকার নিয়ে শুরু।',
      brand: 'Sarinda Restaurant'
    },
    {
      year: '২০১২',
      title: 'Sarinda Bakery Launched',
      banglaTitle: 'সারিন্দা বেকারির বিস্তার',
      description: 'Live oven baking and traditional Bengali sweets expanded to 3 outlets.',
      banglaDescription: 'লাইভ ওভেন বেকিং ও খাঁটি ঘিয়ে তৈরি মিষ্টি নিয়ে ৩টি প্রধান শাখায় বিস্তার।',
      brand: 'Sarinda Bakery'
    },
    {
      year: '২০১৬',
      title: 'Pizza Shuttle Express',
      banglaTitle: 'পিৎজা শাটল ডেলিভারি',
      description: 'Pioneered 35-minute oven-baked hot pizza delivery in Mymensingh.',
      banglaDescription: 'ময়মনসিংহে দ্রুততম সময়ে গরম পিৎজা হোম ডেলিভারি সেবার বিপ্লব।',
      brand: 'Pizza Shuttle'
    },
    {
      year: '২০১৮',
      title: 'Sorgorom Restaurant Opened',
      banglaTitle: 'চরপাড়ায় সরগরম রেস্টুরেন্ট স্থাপন',
      description: 'Iconic hangout for sizzling cast-iron steaks, burgers and cafe ambiance.',
      banglaDescription: 'সিজলার্স, স্টেক, বার্গার ও প্রাণবন্ত আড্ডার প্রিয় ঠিকানা হিসেবে উদ্বোধন।',
      brand: 'Sorgorom Restaurant'
    },
    {
      year: '২০২১',
      title: 'Sarinda Lights & Fans Established',
      banglaTitle: 'সারিন্দা লাইটস ও ফ্যানের অভিষেক',
      description: 'Showroom for imported crystal chandeliers, designer fans & smart lighting.',
      banglaDescription: 'আমদানিকৃত ক্রিস্টাল ঝাড়বাতি, লাক্সারি ফ্যান ও আর্কিটেকচারাল লাইটিং প্রতিষ্ঠা।',
      brand: 'Sarinda Lights & Fans'
    },
    {
      year: '২০২২',
      title: 'Sarinda Sobari Resort Grand Launch',
      banglaTitle: 'সবারি রিসোর্টের রাজকীয় যাত্রা',
      description: 'Unveiled the viral eco-paradise acclaimed as the "Switzerland of Mymensingh".',
      banglaDescription: 'সুইমিংপুল ও কটেজ নিয়ে গড়ে ওঠে ময়মনসিংহের সুইজারল্যান্ড খ্যাত সবারি রিসোর্ট।',
      brand: 'Sarinda Sobari Resort'
    },
    {
      year: '২০২৬',
      title: 'Unified Digital Ecosystem',
      banglaTitle: 'সমন্বিত ডিজিটাল প্ল্যাটফর্ম',
      description: 'All 7 ventures united under one seamless omnichannel portal.',
      banglaDescription: 'গ্রুপের সকল অঙ্গপ্রতিষ্ঠানকে এক ডিজিটাল ছাতার নিচে নিয়ে আসা।',
      brand: 'Sarinda Group'
    }
  ],
  leadership: {
    chairman: {
      name: 'Haji Md. Rafiqul Islam',
      banglaName: 'হাজী মোঃ রফিকুল ইসলাম',
      role: 'Chairman, Sarinda Group',
      banglaRole: 'চেয়ারম্যান, সারিন্দা গ্রুপ',
      message: 'From day one in 2008, our foundation has been honesty, warm hospitality, and uncompromised quality for every guest.',
      banglaMessage: '২০০৮ সাল থেকে আমাদের মূল শক্তি সততা, অকৃত্রিম আতিথেয়তা ও গ্রাহকের শতভাগ সন্তুষ্টি।',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    managingDirector: {
      name: 'Engr. Tanvir Ahmed',
      banglaName: 'ইঞ্জি. তানভীর আহমেদ',
      role: 'Managing Director, Sarinda Group',
      banglaRole: 'ম্যানেজিং ডিরেক্টর, সারিন্দা গ্রুপ',
      message: 'We unite heritage taste, modern architecture, and digital convenience to elevate living in Mymensingh.',
      banglaMessage: 'ঐতিহ্যবাহী স্বাদ, নান্দনিক আর্কিটেকচার ও ডিজিটাল সেবাকে একত্রিত করে আমরা ময়মনসিংহের জীবনযাত্রাকে এগিয়ে নিচ্ছি।',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
    }
  }
};
