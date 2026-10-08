// Official Sarinda Group Knowledge Base
// Structured source of truth for AI context injection. Never invent information.

export interface ConcernKnowledge {
  name: string;
  banglaName: string;
  category: string;
  address: string;
  banglaAddress: string;
  hours: string;
  hotline: string;
  description: string;
  highlights: string[];
  menuOrProducts?: Array<{
    name: string;
    banglaName: string;
    price: string | number;
    description?: string;
  }>;
  offers?: Array<{
    code: string;
    title: string;
    discount: string;
    details: string;
  }>;
  orderingInfo?: string;
}

export const SARINDA_GROUP_KNOWLEDGE = {
  company: {
    name: "Sarinda Group",
    banglaName: "সারিন্দা গ্রুপ",
    slogan: "Excellence in Hospitality, Heritage & Lifestyle",
    banglaSlogan: "ঐতিহ্য ও আধুনিক আতিথেয়তার বিশ্বস্ত প্রতীক",
    establishedYear: 2002,
    hqAddress: "CK Ghosh Road, Mymensingh-2200, Bangladesh",
    banglaHqAddress: "সি কে ঘোষ রোড, ময়মনসিংহ-২২০০, বাংলাদেশ",
    hotline: "+880 1852-363235",
    altHotline: "+880 1712-121434",
    email: "sarindamymen@gmail.com",
    about: "Sarinda Group is Mymensingh's premier lifestyle and hospitality brand with over 22 years of heritage. It operates award-winning restaurants, bakery chains, eco-resort, modern lighting & interior decor, and salon services.",
    banglaAbout: "সারিন্দা গ্রুপ ময়মনসিংহের শীর্ষস্থানীয় হসপিটালিটি ও লাইফস্টাইল ব্র্যান্ড। বিগত ২২ বছরেরও বেশি সময় ধরে ঐতিহ্যবাহী খাবার, কনফেকশনারি, রিসোর্ট, আলোকসজ্জা ও ইন্টেরিয়র সেবায় বিশ্বস্ততার সাথে সেবা দিয়ে আসছে।"
  },

  restaurant: {
    name: "Sarinda Restaurant & Catering",
    banglaName: "সারিন্দা রেস্তোরাঁ ও ক্যাটারিং",
    category: "Mughlai, Authentic Kacchi & Bengali Feasts",
    address: "CK Ghosh Road, Mymensingh-2200 (Near Town Hall & Ganginarpar)",
    banglaAddress: "সি কে ঘোষ রোড, ময়মনসিংহ-২২০০ (টাউন হল ও গাঙ্গিনারপাড়ের সন্নিকটে)",
    hours: "11:00 AM – 11:30 PM (Everyday / প্রতিদিন)",
    hotline: "+880 1852-363235",
    description: "Famous for authentic slow dum-cooked Kacchi Biryani, mustard oil Beef Tehari, Shahi Morog Polao, wedding-style Chicken Roast, and digestive cold Shahi Borhani.",
    banglaDescription: "পুরান ঢাকার আসল শাহী কাচ্চি বিরিয়ানি, খাঁটি সরিষার তেলের বিফ তেহারী, মোরগ পোলাও, বিয়ে বাড়ির চিকেন রোস্ট এবং ঠান্ডা শাহী বোরহানির জন্য ময়মনসিংহের সেরা ঠিকানা।",
    highlights: [
      "100% খাঁটি গাওয়া ঘি ও ঘানিভাঙা সরিষার তেলে রান্না",
      "কোনো কৃত্রিম রঙ বা ক্ষতিকর ফ্লেভার ব্যবহার করা হয় না",
      "পরিবারের জন্য ভিআইপি সাউন্ডপ্রুফ প্রাইভেট কেবিন",
      "ময়মনসিংহ শহরে ২৫-৪০ মিনিটে গরম হোম ডেলিভারি",
      "বিয়ে, জন্মদিন ও কর্পোরেট ইভেন্টের জন্য ক্যাটারিং সেবা"
    ],
    menu: [
      { name: "Special Kacchi Biryani (Half)", banglaName: "স্পেশাল কাচ্চি বিরিয়ানি (হাফ, খাসি)", price: 340, description: "খাসির মাংস, চিনিগুঁড়া চাল ও আলু" },
      { name: "Special Kacchi Biryani (Full)", banglaName: "স্পেশাল কাচ্চি বিরিয়ানি (ফুল, খাসি)", price: 590, description: "খাসির মাংস, চিনিগুঁড়া চাল ও আলু" },
      { name: "Special Kacchi Biryani (With Egg)", banglaName: "স্পেশাল কাচ্চি বিরিয়ানি (ডিমসহ)", price: 350, description: "ডিমসহ হাফ কাচ্চি" },
      { name: "Basmati Mutton Dum Biryani", banglaName: "বাসমতী মাটন দম বিরিয়ানি", price: 450, description: "বাসমতী চাল ও তুলতুলে খাসির মাংস" },
      { name: "Beef Tehari", banglaName: "সরিষার তেলের বিফ তেহারী", price: 290, description: "ঘানিভাঙা সরিষার তেল ও গরুর মাংসের তেহারী" },
      { name: "Shahi Morog Polao", banglaName: "ঐতিহ্যবাহী শাহী মোরগ পোলাও", price: 290, description: "আস্ত রোস্ট চিকেন লেগ ও ডিমসহ" },
      { name: "Biye Bari Chicken Roast", banglaName: "বিয়ে বাড়ির চিকেন রোস্ট", price: 180, description: "মিষ্টি-ঝাল বাদাম বাটা শাহী গ্রেভি" },
      { name: "Shahi Mutton Rezala", banglaName: "শাহী মাটন রেজালা", price: 320, description: "দই ও কাজুবাদামের রিচ গ্রেভি" },
      { name: "Mutton Rogan Josh", banglaName: "মাটন রোগান জোশ", price: 340, description: "কাশ্মীরি স্টাইল স্পাইসি মাটন" },
      { name: "Sarinda Royal Grand Platter", banglaName: "সারিন্দা রয়্যাল গ্র্যান্ড প্ল্যাটার", price: 990, description: "কাচ্চি, মোরগ পোলাও, রোস্ট, কাবাব, বোরহানি ও ফিরনি (৩-৪ জনের জন্য)" },
      { name: "Shahi Borhani (Glass)", banglaName: "শাহী বোরহানি (ছোট গ্লাস)", price: 75, description: "টক দই ও পুদিনার তৈরি ঠান্ডা ডাইজেস্টিভ" },
      { name: "Shahi Borhani (500ml Bottle)", banglaName: "শাহী বোরহানি (৫০০ মি.লি. বোতল)", price: 155, description: "৫০০ মি.লি. শেয়ারিং বোতল" },
      { name: "Shahi Borhani (1L Bottle)", banglaName: "শাহী বোরহানি (১ লিটার শেয়ারিং বোতল)", price: 325, description: "১ লিটার ফ্যামিলি বোতল" },
      { name: "Special Jali Kebab", banglaName: "স্পেশাল জালি কাবাব (পিস)", price: 50, description: "মুচমুচে ফ্রাইড বিফ/মাটন জালি কাবাব" },
      { name: "Zafrani Shahi Firni", banglaName: "জাফরানী শাহী ফিরনি", price: 70, description: "মাটির পাত্রে জমানো জাফরানী ক্ষীর" }
    ],
    offers: [
      { code: "SARINDA15", title: "Welcome Discount", discount: "15% Off", details: "প্রথম অনলাইন অর্ডারে ১৫% সরাসরি ছাড়" },
      { code: "FAMILY20", title: "Family Feast", discount: "20% Off", details: "৳১২০০ টাকার বেশি অর্ডারে ২০% বিশেষ ছাড়" }
    ],
    deliveryAreas: "সি কে ঘোষ রোড, গাঙ্গিনারপাড়, টাউন হল, চরপাড়া, নতুন বাজার, সানকিপাড়া এবং সমগ্র ময়মনসিংহ শহর। ডেলিভারি চার্জ: ৳৩০ - ৳৫০।"
  },

  bakery: {
    name: "Sarinda Bakery & Confectionery",
    banglaName: "সারিন্দা বেকারি অ্যান্ড কনফেকশনারি",
    category: "Fresh Artisan Breads, Cakes & Traditional Sweets",
    address: "CK Ghosh Road Outlet & Ganginarpar Branch, Mymensingh",
    banglaAddress: "সি কে ঘোষ রোড এবং গাঙ্গিনারপাড় শাখা, ময়মনসিংহ",
    hours: "8:00 AM – 10:30 PM (Everyday)",
    hotline: "+880 1852-363235",
    description: "Daily fresh baked artisan bread, custom birthday & wedding cakes, traditional Bangladeshi sweets (Roshogolla, Chamcham, Sandesh), cookies, and savory snacks.",
    banglaDescription: "প্রতিদিন ওভেনে প্রস্তুত ফ্রেশ পাউরুটি, প্রিমিয়াম জন্মদিনের কেক, ঐতিহ্যবাহী মিষ্টি (রসগোল্লা, চমচম, ছানার সন্দেশ), বিস্কুট ও পেস্ট্রি।",
    products: [
      { name: "Customized Fondant / Cream Birthday Cake", banglaName: "জন্মদিনের কাস্টমাইজড কেক", price: "৳৭০০ - ৳২,৫০০ (প্রতি পাউন্ড ৳৭০০+)" },
      { name: "Black Forest Pastry", banglaName: "ব্ল্যাক ফরেস্ট পেস্ট্রি", price: "৳৮০ প্রতি পিস" },
      { name: "Red Velvet Pastry", banglaName: "রেড ভেলভেট পেস্ট্রি", price: "৳১০০ প্রতি পিস" },
      { name: "Traditional Sweet Gift Box (1kg)", banglaName: "স্পেশাল মিষ্টির বক্স (১ কেজি)", price: "৳৪৫০ - ৳৬৫০" },
      { name: "Milk Bread / Multigrain Bread", banglaName: "মিল্ক ব্রেড ও মাল্টিগ্রেইন পাউরুটি", price: "৳৫৫ - ৳৯০" }
    ]
  },

  sorgorom: {
    name: "Sorgorom Restaurant & Cafe",
    banglaName: "সরগরম রেস্তোরাঁ ও ক্যাফে",
    category: "Traditional Bengali Feasts, 20+ Bhortas & Modern Cafe",
    address: "Station Road, Mymensingh",
    banglaAddress: "স্টেশন রোড, ময়মনসিংহ",
    hours: "7:30 AM – 11:00 PM (Everyday)",
    hotline: "+880 1852-363235",
    description: "Authentic deshi comfort dining with steamed rice, 20+ varieties of hand-mashed bhortas, local river fish curries, and modern coffee & snacks in the evening.",
    banglaDescription: "গরম ধোঁয়া ওঠা ভাতের সাথে ২০+ পদের দেশি ভর্তা, হাওরের তাজা মাছের ঝোল এবং সন্ধ্যায় আধুনিক কফি ও স্ন্যাকসের চমৎকার আড্ডা।"
  },

  resort: {
    name: "Sarinda Sobari Resort",
    banglaName: "সারিন্দা সভারী রিসোর্ট",
    category: "Eco-Luxury Nature Resort, Cottages & Day-Out Events",
    address: "Mymensingh Bypass Road (Green Eco Zone), Mymensingh",
    banglaAddress: "ময়মনসিংহ বাইপাস রোড (গ্রিন ইকো জোন), ময়মনসিংহ",
    hours: "Check-in: 12:00 PM | Check-out: 11:00 AM | Day out: 9:00 AM – 6:00 PM",
    hotline: "+880 1852-363235",
    description: "Tranquil nature resort featuring wooden duplex cottages, swimming pool, kids playground, fishing pond, barbecue station, and conference halls for weddings and corporate retreats.",
    banglaDescription: "সবুজ প্রকৃতির মাঝে প্রিমিয়াম কাঠের কটেজ, আধুনিক সুইমিং পুল, শিশুদের খেলার মাঠ, মাছ ধরার লেক এবং ফ্যামিলি ডে-আউট ও পিকনিক স্পট।"
  },

  lights: {
    name: "Sarinda Lights & Interior Décor",
    banglaName: "সারিন্দা লাইটস অ্যান্ড ইন্টেরিয়র",
    category: "Architectural Lighting, Chandeliers & Smart Home",
    address: "CK Ghosh Road, Mymensingh",
    banglaAddress: "সি কে ঘোষ রোড, ময়মনসিংহ",
    hours: "10:00 AM – 9:00 PM",
    hotline: "+880 1852-363235",
    description: "Exclusive crystal chandeliers, LED architectural fixtures, outdoor landscape illumination, and customized residential and commercial interior solutions.",
    banglaDescription: "রাজকীয় ঝাড়বাতি (Chandelier), আধুনিক এলইডি প্রোফাইল লাইট, গার্ডেন লাইটিং এবং বাসাবাড়ি ও শোরুমের নান্দনিক ইন্টেরিয়র আলোকসজ্জা।"
  }
};
