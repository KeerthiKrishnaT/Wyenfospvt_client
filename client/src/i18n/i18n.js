import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define translations inline to avoid import issues
const resources = {
  en: {
    translation: {
      "nav": {
        "home": "HOME",
        "about": "ABOUT US",
        "service": "SERVICE",
        "futureOutlook": "FUTURE OUTLOOK",
        "more": "MORE",
        "contact": "CONTACT US",
        "aim": "Our Aim",
        "mission": "Our Mission",
        "vision": "Our Vision",
        "wyenfosAds": "Wyenfos Ads",
        "legal": "Legal Docs"
      },
      "hero": {
        "title": "WYENFOS PRIVATE LIMITED",
        "subtitle": "WIPE YOUR EXPENDITURE NEW FORMULA OF SAVINGS",
        "description": "Leading the way in innovative solutions for digital transformation and sustainable business practices."
      },
      "contact": {
        "title": "CONTACT US",
        "getInTouch": "Get in Touch",
        "contactDetails": "Contact Details",
        "noBranches": "No branches configured yet. Please add branches through the admin dashboard.",
        "form": {
          "name": "Your name",
          "email": "Your email",
          "subject": "Subject",
          "message": "Message",
          "sendMessage": "Send Message"
        }
      },
      "about": {
        "title": "About Us",
        "whoWeAre": "Who We Are",
        "whoWeAreDesc": "Wyenfos Is an Indian based company with headquarters in Kerala, India. With the sole view on making life affordable, the company aims to uplift economic stability and promote savings. Income is a very important part of a person's life, so are expenses. It necessary for everyone to initiate saving to meet future expenses and emergencies. As the name insist, WYENFOS ie; wipe your expenditure new formula of savings; promotes savings Wyenfos delivers various services in the field, offline Ecommerce, education, transport, medical, etc. We help people wipe down their daily expenditure by converting expenses in to savings.",
        "affordableLiving": "Affordable Living Transforming Daily Expenses into Savings",
        "callUs": "Call Us",
        "phoneNumber": "91+ 70124 78846"
      },
      "services": {
        "title": "Our Services",
        "ourFeature": "OUR FEATURE",
        "exploreServices": "EXPLORE OUR CUTTING EDGE IT SOLUTION SERVICES",
        "softwareDevelopment": "SOFTWARE DEVELOPMENT",
        "mobileAppDevelopment": "MOBILE APP DEVELOPMENT",
        "graphicDesigning": "GRAPHIC DESIGNING",
        "webDevelopment": "WEB DEVELOPMENT",
        "empoweringNextGen": "Empowering the Next Generation Software Development at Our Company",
        "youthfulInnovation": "Youthful Innovation, World Record-Holding Talent Driving Exceptional Mobile App Development",
        "unleashingCreativity": "Unleashing Creativity Youthful Visionaries and Multifaceted Talent in Graphic Design",
        "webInnovation": "Web Innovation Unleashed Harnessing the Creative Power of Youth in Web Development & Design",
        "isoCertified": "An ISO 9001:2015 Certified company"
      },
      "aim": {
        "title": "Our Aim",
        "shortDesc": "We Aim to upgrade Indian living standards to match global lifestyle therefore assuring better quality of life to everyone",
        "detailedDesc": "Our company is dedicated to elevating the living standards of the Indian populace, aspiring to align them with global lifestyle benchmarks. With a steadfast commitment to enhancing the quality of life for all, we embark on a mission to bring about positive transformations in every aspect of daily living. By introducing innovative solutions, fostering sustainable practices, and fostering inclusive growth, we aim to create a harmonious environment where every individual can enjoy a higher quality of life that reflects the best global standards. Through our initiatives, we strive to bridge the gap and ensure that the benefits of progress and prosperity are accessible to everyone, contributing to a brighter and more equitable future for all."
      },
      "mission": {
        "title": "Our Mission",
        "shortDesc": "To Establish a secure Financial power in everyone's life where expensive becomes \"affordable\". We assure ultimate purchase privileges",
        "detailedDesc": "Our company is driven by a mission to establish a secure financial power in the lives of individuals, ensuring that what once seemed expensive becomes truly affordable. We believe in empowering everyone with the tools and resources needed to achieve financial stability and success. By offering innovative solutions and fostering a culture of financial well-being, we aspire to transform the perception of affordability, making it accessible to all. Our commitment is to create a financial landscape where individuals can confidently navigate their economic journey, breaking barriers to access and enabling a future where financial security is a reality for everyone."
      },
      "vision": {
        "title": "Our Vision",
        "shortDesc": "Our vision is to ease day to day life of all. We ensure better financial status by generation income with every purchase. We focus to improve the quality of life",
        "detailedDesc": "Our company is dedicated to simplifying the day-to-day lives of all individuals. Our primary aim is to enhance the overall well-being by ensuring a better financial status through income generation with every purchase. By focusing on the intersection of convenience and financial empowerment, we strive to make each transaction contribute to an improved quality of life. Through innovative solutions and a commitment to excellence, we seek to provide not just products or services but a pathway to a more secure and fulfilling life for everyone."
      },
      "wyenfosAds": {
        "title": "Wyenfos Ads",
        "heroTitle": "WYENFOS ADS",
        "heroSubtitle": "Advertising Solutions",
        "description": "Innovative advertising and marketing solutions to boost your business presence and reach your target audience effectively.",
        "newFace": "New Face in Advertising",
        "watchNow": "Watch now"
      },
      "ourCompanies": {
        "title": "Our Companies",
        "heroTitle": "Our Companies",
        "heroSubtitle": "Diverse Portfolio of Excellence Across Industries",
        "description": "Explore our diverse portfolio of companies, each excelling in their respective industries and contributing to our vision of innovation and excellence.",
        "visitWebsite": "Visit Website",
        "categories": {
          "technology": "Technology",
          "healthcare": "Healthcare & Wellness", 
          "water": "Water Solutions",
          "jewelry": "Jewelry & Precious Metals",
          "financial": "Financial Services",
          "fintech": "Financial Technology"
        },
        "companies": {
          "wyenfosInfotech": {
            "name": "Wyenfos Infotech",
            "description": "Leading technology solutions provider specializing in innovative software development, web applications, and digital transformation services. Where Innovation Meets Excellence!"
          },
          "ayur4life": {
            "name": "Ayur4Life Herbals India",
            "description": "Premium Ayurvedic and herbal products manufacturer focused on natural wellness solutions, traditional medicine, and holistic health care products for modern living."
          },
          "wyenfosPureDrops": {
            "name": "Wyenfos Pure Drops",
            "description": "Pure and natural water solutions provider offering premium quality drinking water, purification systems, and sustainable hydration solutions for healthy living."
          },
          "wyenfosGold": {
            "name": "Wyenfos Gold & Diamonds",
            "description": "Exquisite jewelry collection featuring premium gold ornaments, certified diamonds, and traditional designs crafted with modern techniques and authentic quality."
          },
          "cashVapase": {
            "name": "Cash Vapase",
            "description": "Revolutionary financial reimbursement platform offering 100% cashback on purchases through innovative voucher system and bill reimbursement solutions."
          },
          "wyenfosBills": {
            "name": "Wyenfos Bills",
            "description": "Comprehensive bill management and payment solutions platform providing seamless digital payment services, bill tracking, and financial management tools."
          }
        }
      },
      "ourKeyAttributes": {
        "title": "Our Key Attributes",
        "heroTitle": "OUR KEY ATTRIBUTES",
        "heroSubtitle": "What Makes Us Different",
        "description": "Discover the core values and attributes that define our company culture and drive our success in delivering exceptional services.",
        "crestm": "C R E S T M",
        "customerCentric": "Customer Centric: We value the vital role of our customers, thereby we are flexible to adapt and fulfill customer requirements.",
        "reliable": "Reliable: We ensure efficient and constant financial growth plans.",
        "efficient": "Efficient: We optimize your returns with existing earnings and purchasing power.",
        "secure": "Secure: We assure a genuine and safe status to each and everyone associated with us.",
        "transparent": "Transparent: We have adopted simple operations with factual communication by all and we challenge scrutiny of any kind.",
        "modest": "Modest: We have framed simple earning methods that everyone can follow and understand easily."
      },
      "home": {
        "title": "Home",
        "welcome": "Welcome to Wyenfos",
        "subtitle": "Professional web solutions that transform your business. We create innovative digital experiences that drive growth and success.",
        "ourServices": "Our Services",
        "getStarted": "Get Started",
        "whyChoose": "Why Choose Wyenfos?",
        "modernDev": "Modern Development",
        "modernDevDesc": "We use the latest technologies and best practices to create fast, scalable, and maintainable applications.",
        "responsiveDesign": "Responsive Design",
        "responsiveDesignDesc": "Our websites and applications work perfectly on all devices, from desktop to mobile.",
        "fastPerformance": "Fast Performance",
        "fastPerformanceDesc": "Optimized for speed and performance to provide the best user experience possible.",
        "secureReliable": "Secure & Reliable",
        "secureReliableDesc": "Built with security in mind, ensuring your data and applications are protected.",
        "webDevelopment": "Web Development",
        "webDevelopmentDesc": "Custom websites and web applications built with modern technologies.",
        "mobileApps": "Mobile Apps",
        "mobileAppsDesc": "Native and cross-platform mobile applications for iOS and Android.",
        "uiUxDesign": "UI/UX Design",
        "uiUxDesignDesc": "Beautiful and intuitive user interfaces that enhance user experience.",
        "learnMore": "Learn More",
        "readyToStart": "Ready to Start Your Project?",
        "discussVision": "Let's discuss how we can help bring your vision to life.",
        "contactUsToday": "Contact Us Today"
      },
      "mainContent": {
        "isoCertified": "An ISO 9001:2015 Certified Company",
        "aboutUsDesc": "WYENFOS PVT LTD Is an Indian based company with headquarters in Kerala, India. With the sole view on making life affordable, the company aims to uplift economic stability and promote savings. Income is a very important part of a person's life, so are expenses. It is necessary for everyone to initiate saving to meet future expenses and emergencies. As the name insist, WYENFOS ie; wipe your expenditure new formula of savings; promotes savings. Wyenfos delivers various services in the field, offline E-commerce, education, transport, medical, etc. We help people wipe down their daily expenditure by converting expenses into savings.",
        "elevateProsperity": "Elevate prosperity, Empowering Lives",
        "inspiringSavings": "Inspiring Savings",
        "transformIndia": "Transform India's Future Together",
        "ourAim": "Our Aim",
        "ourAimDesc": "We Aim to upgrade Indian living standards to match global lifestyle therefore assuring better quality of life to everyone.",
        "ourMission": "Our Mission",
        "ourMissionDesc": "To Establish a secure Financial power in everyone's life where expensive becomes affordable. We assure ultimate purchase privileges",
        "ourVision": "Our Vision",
        "ourVisionDesc": "Our vision is to ease day to day life of all. We ensure better financial status by generation income with every purchase. We focus to improve the quality of life purchase privileges",
        "ourKeyAttributes": "Our Key Attributes",
        "crestm": "CRESTM",
        "customerCentric": "Customer Centric: We value the vital role of our customers, thereby we are flexible to adapt and fulfill customer requirements.",
        "reliable": "Reliable: We ensure efficient and constant financial growth plans.",
        "efficient": "Efficient: We optimize your returns with existing earnings and purchasing power.",
        "secure": "Secure: We assure a genuine and safe status to each and everyone associated with us.",
        "transparent": "Transparent: We have adopted simple operations with factual communication by all and we challenge scrutiny of any kind.",
        "modest": "Modest: We have framed simple earning methods that everyone can follow and understand easily.",
        "culturalPride": "Cultural Pride,",
        "economicRise": "Economic Rise,",
        "lifesHighs": "Life's Highs with Wyenfos",
        "ourMilestone": "Our Milestone",
        "wyenfosAds": "WYENFOS ADS",
        "milestoneDesc": "#ComingSoon Prepare to embark on a revolutionary digital journey with the upcoming launch of the Wyenfos Ads Android app! We're thrilled to introduce a cutting-edge platform that not only transforms how you experience digital advertising but also empowers you to earn real-time money effortlessly. Wyenfos Ads is not just an app; it's a groundbreaking ecosystem where users can seamlessly watch ads and instantly earn money, turning their leisure time into a rewarding experience. As a user-centric platform, Wyenfos Ads believes in the power of community and collaboration. Soon, you'll have the opportunity to upload and host your ads on our platform, reaching a diverse audience hungry for engaging content. Whether you're an individual looking to make some extra cash or a business aiming to enhance your online presence, Wyenfos Ads offers low-cost ad hosting packages tailored to meet your needs. We're dedicated to democratizing digital advertising, making it accessible and beneficial for everyone. Get ready to boost your business, increase your earnings, and enjoy an immersive ad-watching experience like never before. Stay tuned for the launch of the Wyenfos Ads Android app where watching ads isn't just a pastime; it's a lucrative opportunity to watch, earn, and thrive!",
        "cashVapase": "CASH VAPASE",
        "cashVapaseDesc1": "#ComingSoon Exciting news is on the horizon as we unveil a groundbreaking innovation that will revolutionize the way you manage your expenses. Introducing the world's first-ever Voucher Queue Bill Reimbursement System, brought to you by our company through our cutting-edge mobile application, 'Cash Vapase'.",
        "cashVapaseDesc2": "Say goodbye to traditional expense tracking and hello to a seamless experience where you can effortlessly convert your everyday expenses into substantial savings. With Cash Vapase, managing your finances has never been more convenient.",
        "cashVapaseDesc3": "Stay tuned as we prepare to launch this game-changing solution, redefining the future of smart spending and ushering in a new era of financial empowerment. Your savings journey is about to take a remarkable turn be ready for Cash Vapase, where every expense transforms into an opportunity for financial growth.",
        "yourSavingsPartner": "Your Savings Partner",
        "whyJustWatch": "Why just watch? Earn while you're at it",
        "wyenfosAdsPutsMoney": "\"Wyenfos Ads\" puts money in your pocket",
        "transformViewingTime": "Transform your viewing time into earning time with Wyenfos Ads. Our revolutionary platform allows you to watch ads and earn real money instantly. No more passive viewing - every ad you watch becomes an opportunity to boost your income.",
        "joinThousands": "Join thousands of users who are already earning while they watch. With our user-friendly interface and instant payment system, you can start earning from day one. Turn your leisure time into a profitable activity with Wyenfos Ads.",
        "careersWithUs": "Careers with us",
        "sendYourCV": "Send Your CV@",
        "cvEmail": "wyenfospvtltd@gmail.com",
        "whatWeOffer": "What We Offer:",
        "realWorldExperience": "Real-World Experience: Work on actual projects that make an impact.",
        "skillDevelopment": "Skill Development: Enhance your skills in a supportive and innovative environment.",
        "certification": "Certification: Receive a work-experience certificate upon successful completion of your internship. Book your seats now."
      },
      "legal": {
        "title": "Legal Documents",
        "heroTitle": "LEGAL DOCUMENTS",
        "introTitle": "Official Company Documents",
        "introDesc": "Here are our official legal documents and certifications that establish WYENFOS Private Limited as a legitimate and certified business entity.",
        "panCard": "Company PAN Card",
        "panCardDesc": "Permanent Account Number issued by Income Tax Department, Government of India",
        "isoCert": "ISO 9001:2015 Certificate",
        "isoCertDesc": "Quality Management System certification from QRO - Quality Research Organization",
        "incorporation": "Certificate of Incorporation",
        "incorporationDesc": "Official incorporation certificate from Ministry of Corporate Affairs, Government of India",
        "companyInfo": "Company Information",
        "companyName": "Company Name:",
        "companyNameValue": "WYENFOS PRIVATE LIMITED",
        "cin": "Corporate Identity Number:",
        "pan": "PAN Number:",
        "incorporationDate": "Incorporation Date:",
        "incorporationDateValue": "February 2, 2021",
        "registeredAddress": "Registered Address:",
        "registeredAddressValue": "Thekkekara Arcade, Chelakottukara Junction, Thrissur",
        "isoCertification": "ISO Certification:",
        "isoCertificationValue": "ISO 9001:2015 Quality Management System",
        "legalNotice": "Legal Notice",
        "legalNoticeText1": "All documents displayed on this page are authentic and legally valid. WYENFOS Private Limited is a legally incorporated company under the Companies Act, 2013 (18 of 2013) and is compliant with all regulatory requirements.",
        "legalNoticeText2": "Our ISO 9001:2015 certification demonstrates our commitment to quality management systems and continuous improvement in our services including IT Services, Software Development, Programming and Implementation, Digital Vouchers, Franchises, Supermarkets, and Jewelleries.",
        "legalNoticeText3": "For verification of these documents or any legal inquiries, please contact us through our official channels."
      },
      "footer": {
        "quickLinks": "Quick Links",
        "getInTouch": "Get in Touch",
        "phone": "Phone",
        "email": "Email",
        "copyright": "Copyright©2024 Wyenfos pvt ltd. All Rights Reserved"
      },
      "cashVapase": {
        "title": "CASH VAPASE",
        "heroTitle": "CASH VAPASE",
        "heroSubtitle": "Digital Voucher Revolution",
        "heroDescription": "Experience the future of digital transactions with our innovative voucher system that transforms how you shop and save.",
        "customersTitle": "CUSTOMERS",
        "customersIntro": "Customers can avail full reimbursement of expenses by uploading their purchase bills. There exist limits on purchases. We assure timely reimbursement of your payments. To avail full benefits ensure that you purchase from Wyenfos approved outlets. (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)",
        "voucherTypes": {
          "grocery": {
            "title": "Grocery Voucher",
            "description": "With Cash vapase grocery voucher you can upload your purchase bills for general daily products like Fresh vegetables, Canned foods, Sauces, Various groceries, Spices & herbs, Oils/Vinegars, Refrigerated items, Dairy, Cheese, Frozen, Meat, Seafood, Baked goods, Snacks, Personal care, Kitchen, home care, Cleaning products, Other stuff, Pets food, Themed meals, and enjoy 100% reimbursement!"
          },
          "rental": {
            "title": "Rental Voucher",
            "description": "Introducing Cash vapase Rental voucher Your Ticket to 100% Reimbursement on Rental Bills! Say goodbye to the burden of rental expenses with Cash vapase Rental voucher where you can upload bills for houses, halls, lodge rent, room rent and receive reimbursement using our exclusive rental voucher."
          },
          "health": {
            "title": "Health Voucher",
            "description": "Introducing Cash vapase Health voucher Your Solution to Stress-Free Healthcare Expenses Cash vapase, you can wave goodbye to the financial strain of medical bill's. Upload your hospital bill's, medicine receipts, laboratory bill's, beauty parlour bill, and other health-related expenses, and receive an 100% reimbursement."
          },
          "education": {
            "title": "Education Voucher",
            "description": "Introducing Cash vapase Education Voucher Your Key to Seamless Education Expenses! With Cash vapase, say farewell to the financial strain of educational costs. Whether it's school or college fees, books, study materials, tuition fees, or any other education-related expenses, you can upload them and receive an amazing 100% reimbursement."
          },
          "gold": {
            "title": "Gold Voucher",
            "description": "Introducing Cash vapase Gold Voucher Your Pathway to Golden Returns! With Cash vapase your gold, silver, platinum, and diamond purchases become avenues for incredible rewards. Aadhaar card users can upload bill's for gold purchases up to 40 grams per person in 1 year, and silver, platinum, and diamond have no limit."
          },
          "builders": {
            "title": "Builders Voucher",
            "description": "Introducing the Builders Voucher! With this voucher, individuals can conveniently upload bill's for house construction, house purchase, hard ware, electrical, plumping, home furniture bills, renovation, and materials, receive a remarkable 100% reimbursement."
          }
        },
        "comingSoonTitle": "Coming Soon",
        "comingSoonSubtitle": "More Exciting Features",
        "comingSoonDescription": "We're continuously working to bring you more innovative voucher solutions and enhanced features to make your digital transaction experience even better.",
        "faqTitle": "Frequently Asked Questions",
        "whatIsCashVapase": "What is Cash Vapase?",
        "whatIsCashVapaseDesc": "WYENFOS PVT LTD Introducing the world's first-ever Voucher Queue Bill Reimbursement System, brought to you by our company through our cutting-edge mobile application, 'Cash Vapase'",
        "whatIsCashVapaseDesc2": "Say goodbye to traditional expense tracking and hello to a seamless experience where you can effortlessly convert your everyday expenses into substantial savings. With Cash Vapase, Stay tuned as we prepare to launch this game-changing solution",
        "milestoneDesc": "When the total amount of the vouchers processed reach an amount of Rs.50000 (either through you or via any other registered users on all India basis) the company will reimburse 100% to the first voucher in the queue from the profits earned",
        "outlets": "OUTLETS",
        "outletsDesc": "These are customer purchase platforms. Outlets include any SSI units, Wholesalers, C&F, Sole Distributors, Manufacturers & Farmers. Registration free. Kindly note that only purchases from our registered outlets will be eligible for full reimbursement. After registering with the outlets, for every purchase made for the inventory kept by the firm, 100% of the bill amount is reimbursed. 20% of the customer purchase is held by the company. An amount equivalent to 20% purchased by our customers from any registered wyenfos outlets, will be deducted from the total reimbursed amounts of the outlet without affecting their retail margins",
        "benefits": "BENEFITS",
        "benefit1": "Delivers 'quality' without the constraint of expense.",
        "benefit2": "Smooth running of the business.",
        "benefit3": "No risk of burden.",
        "benefit4": "Value-driven strategies.",
        "benefit5": "Develops earning capacity.",
        "benefit6": "Limited expense.",
        "benefit7": "No any bargains are made by the customers",
        "customerBenefit1": "Increasing affordability: Reimbursement in turn increases purchasing power, thus increasing affordability.",
        "customerBenefit2": "Uninterrupted savings: Achieve the ultimate benefit of the continuous flow of savings.",
        "customerBenefit3": "Ease of use: Experience the benefits with simple steps.",
        "customerBenefit4": "24*7 services: Access provided any time any day.",
        "customerBenefit5": "Improved opportunities: With the concept of reimbursement, Contributing to developing your- self and explore economic opportunities",
        "howItWorks": "How It Works",
        "uploadBills": "Upload Bills",
        "uploadBillsDesc": "Upload your purchase bills through the Cash Vapase mobile application",
        "queueProcessing": "Queue Processing",
        "queueProcessingDesc": "Your bills enter our innovative queue-based reimbursement system",
        "getReimbursed": "Get Reimbursed",
        "getReimbursedDesc": "Receive 100% reimbursement when queue reaches Rs.50,000",
        "gallery": "Cash Vapase Gallery",
        "franchise": "FRANCHISE",
        "franchiseDesc": "The key responsibility of a Franchisee is to connect WYENFOS with purchase outlets by convincing them about this new concept of reimbursement.",
        "franchiseAreas": "FRANCHISE CAN PICK THEIR AREAS:",
        "panchayath": "PANCHAYATH",
        "panchayathBased": "PANCHAYATH BASED FRANCHISE",
        "municipality": "MUNICIPALITY AND CORPORATIONS",
        "wardBased": "WARD BASED FRANCHISE",
        "franchisePrivileged": "BY CHOOSING TO BE A FRANCHISE, YOU BECOME PRIVILEGED",
        "franchisePrivilege1": "To enter into a new system of earnings at a nominal cost",
        "franchisePrivilege2": "To enjoy the best support system from all Co-ordinators: State, Zonal and District.",
        "franchisePrivilege3": "To have a better approach to outlets with simplified techniques",
        "franchisePrivilege4": "To overcome cash stringent situations with regular flow of earning",
        "franchisePrivilege5": "To enjoy flexible stress-free work hours",
        "franchisePrivilege6": "To improve and enjoy a better lifestyle",
        "newFormula": "Unveiling a New Formula for Savings",
        "customerVouchers": "CUSTOMER VOUCHERS",
        "faqs": {
          "howItWorks": {
            "question": "How does Cash Vapase work?",
            "answer": "Cash Vapase is a digital voucher system where you can upload your purchase bills and get reimbursement. Simply purchase from approved outlets, upload your GST bill, and receive your reimbursement."
          },
          "eligiblePurchases": {
            "question": "What purchases are eligible?",
            "answer": "All purchases from Wyenfos approved outlets are eligible. This includes groceries, fuel, rental payments, and other categories covered by our voucher system."
          },
          "reimbursementTime": {
            "question": "How long does reimbursement take?",
            "answer": "We ensure timely reimbursement of your payments. Processing typically takes 3-5 business days after bill verification."
          },
          "billRequirements": {
            "question": "What type of bills can I upload?",
            "answer": "Only printed GST cash bills can be uploaded for all Cash vapase vouchers. Digital screenshots or photos of bills are not accepted."
          }
        }
      }
    }
  },
  hi: {
    translation: {
      "nav": {
        "home": "मुख्य पृष्ठ",
        "about": "हमारे बारे में",
        "service": "सेवा",
        "futureOutlook": "भविष्य की दृष्टि",
        "more": "और भी",
        "contact": "संपर्क करें",
        "aim": "हमारा उद्देश्य",
        "mission": "हमारा मिशन",
        "vision": "हमारा विजन",
        "wyenfosAds": "व्येंफोस विज्ञापन",
        "legal": "कानूनी दस्तावेज"
      },
      "hero": {
        "title": "व्येंफोस प्राइवेट लिमिटेड",
        "subtitle": "अपने खर्च को मिटाएं बचत का नया फॉर्मूला",
        "description": "डिजिटल परिवर्तन और टिकाऊ व्यावसायिक प्रथाओं के लिए अभिनव समाधानों में अग्रणी।"
      },
      "contact": {
        "title": "हमसे संपर्क करें",
        "getInTouch": "संपर्क में रहें",
        "contactDetails": "संपर्क विवरण",
        "form": {
          "name": "आपका नाम",
          "email": "आपका ईमेल",
          "subject": "विषय",
          "message": "संदेश",
          "sendMessage": "संदेश भेजें"
        }
      },
      "about": {
        "title": "हमारे बारे में",
        "whoWeAre": "हम कौन हैं",
        "whoWeAreDesc": "व्येंफोस एक भारतीय आधारित कंपनी है जिसका मुख्यालय केरल, भारत में है। जीवन को सस्ता बनाने के एकमात्र दृष्टिकोण के साथ, कंपनी का उद्देश्य आर्थिक स्थिरता को बढ़ावा देना और बचत को बढ़ावा देना है। आय किसी व्यक्ति के जीवन का एक बहुत महत्वपूर्ण हिस्सा है, खर्च भी। भविष्य के खर्चों और आपात स्थितियों को पूरा करने के लिए हर किसी के लिए बचत शुरू करना आवश्यक है। जैसा कि नाम पर जोर देता है, व्येंफोस यानी; अपने खर्च को मिटाएं बचत का नया फॉर्मूला; बचत को बढ़ावा देता है व्येंफोस क्षेत्र में विभिन्न सेवाएं प्रदान करता है, ऑफ़लाइन ई-कॉमर्स, शिक्षा, परिवहन, चिकित्सा, आदि। हम लोगों को खर्चों को बचत में बदलकर उनके दैनिक खर्चों को मिटाने में मदद करते हैं।",
        "affordableLiving": "सस्ता जीवन दैनिक खर्चों को बचत में बदलना",
        "callUs": "हमें कॉल करें",
        "phoneNumber": "91+ 70124 78846"
      },
      "services": {
        "title": "हमारी सेवाएं"
      },
      "aim": {
        "title": "हमारा उद्देश्य"
      },
      "mission": {
        "title": "हमारा मिशन"
      },
      "vision": {
        "title": "हमारा विजन"
      },
      "wyenfosAds": {
        "title": "व्येंफोस विज्ञापन",
        "heroTitle": "व्येंफोस विज्ञापन",
        "heroSubtitle": "विज्ञापन समाधान",
        "description": "आपकी व्यावसायिक उपस्थिति को बढ़ावा देने और अपने लक्षित दर्शकों तक प्रभावी रूप से पहुंचने के लिए नवाचार विज्ञापन और विपणन समाधान।"
      },
      "ourCompanies": {
        "title": "हमारी कंपनियां",
        "heroTitle": "हमारी कंपनियां",
        "heroSubtitle": "उद्योगों में उत्कृष्टता का विविध पोर्टफोलियो",
        "description": "हमारी कंपनियों के विविध पोर्टफोलियो का अन्वेषण करें, जो अपने-अपने उद्योगों में उत्कृष्टता प्राप्त कर रही हैं और नवाचार और उत्कृष्टता के हमारे दृष्टिकोण में योगदान दे रही हैं।",
        "visitWebsite": "वेबसाइट पर जाएं",
        "categories": {
          "technology": "प्रौद्योगिकी",
          "healthcare": "स्वास्थ्य सेवा और कल्याण",
          "water": "जल समाधान", 
          "jewelry": "आभूषण और कीमती धातुएं",
          "financial": "वित्तीय सेवाएं",
          "fintech": "वित्तीय प्रौद्योगिकी"
        },
        "companies": {
          "wyenfosInfotech": {
            "name": "व्येंफोस इंफोटेक",
            "description": "अग्रणी प्रौद्योगिकी समाधान प्रदाता जो नवाचार सॉफ्टवेयर विकास, वेब एप्लिकेशन और डिजिटल परिवर्तन सेवाओं में विशेषज्ञता रखता है। जहां नवाचार मिलता है उत्कृष्टता से!"
          },
          "ayur4life": {
            "name": "आयुर4लाइफ हर्बल्स इंडिया",
            "description": "प्रीमियम आयुर्वेदिक और हर्बल उत्पाद निर्माता जो प्राकृतिक कल्याण समाधान, पारंपरिक चिकित्सा और आधुनिक जीवन के लिए समग्र स्वास्थ्य देखभाल उत्पादों पर केंद्रित है।"
          },
          "wyenfosPureDrops": {
            "name": "व्येंफोस प्योर ड्रॉप्स",
            "description": "शुद्ध और प्राकृतिक जल समाधान प्रदाता जो स्वस्थ जीवन के लिए प्रीमियम गुणवत्ता पेयजल, शुद्धीकरण प्रणाली और टिकाऊ हाइड्रेशन समाधान प्रदान करता है।"
          },
          "wyenfosGold": {
            "name": "व्येंफोस गोल्ड एंड डायमंड्स",
            "description": "उत्कृष्ट आभूषण संग्रह जिसमें प्रीमियम सोने के आभूषण, प्रमाणित हीरे और आधुनिक तकनीकों और प्रामाणिक गुणवत्ता के साथ तैयार पारंपरिक डिजाइन शामिल हैं।"
          },
          "cashVapase": {
            "name": "कैश वेपेस",
            "description": "क्रांतिकारी वित्तीय प्रतिपूर्ति प्लेटफॉर्म जो नवाचार वाउचर सिस्टम और बिल प्रतिपूर्ति समाधानों के माध्यम से खरीदारी पर 100% कैशबैक प्रदान करता है।"
          },
          "wyenfosBills": {
            "name": "व्येंफोस बिल्स",
            "description": "व्यापक बिल प्रबंधन और भुगतान समाधान प्लेटफॉर्म जो निर्बाध डिजिटल भुगतान सेवाएं, बिल ट्रैकिंग और वित्तीय प्रबंधन उपकरण प्रदान करता है।"
          }
        }
      },
      "ourKeyAttributes": {
        "title": "हमारी मुख्य विशेषताएं",
        "heroTitle": "हमारी मुख्य विशेषताएं",
        "heroSubtitle": "जो हमें अलग बनाता है",
        "description": "उन मुख्य मूल्यों और विशेषताओं की खोज करें जो हमारी कंपनी संस्कृति को परिभाषित करती हैं और असाधारण सेवाएं प्रदान करने में हमारी सफलता को प्रेरित करती हैं।"
      },
      "home": {
        "title": "मुख्य पृष्ठ",
        "welcome": "व्येंफोस में आपका स्वागत है",
        "subtitle": "पेशेवर वेब समाधान जो आपके व्यवसाय को बदलते हैं। हम नवाचार डिजिटल अनुभव बनाते हैं जो विकास और सफलता को बढ़ावा देते हैं।",
        "ourServices": "हमारी सेवाएं",
        "getStarted": "शुरू करें",
        "whyChoose": "व्येंफोस क्यों चुनें?",
        "modernDev": "आधुनिक विकास",
        "modernDevDesc": "हम तेज़, स्केलेबल और रखरखाव योग्य अनुप्रयोग बनाने के लिए नवीनतम तकनीकों और सर्वोत्तम प्रथाओं का उपयोग करते हैं।",
        "responsiveDesign": "उत्तरदायी डिज़ाइन",
        "responsiveDesignDesc": "हमारी वेबसाइटें और अनुप्रयोग डेस्कटॉप से मोबाइल तक सभी उपकरणों पर पूरी तरह से काम करते हैं।",
        "fastPerformance": "तेज़ प्रदर्शन",
        "fastPerformanceDesc": "सर्वोत्तम उपयोगकर्ता अनुभव प्रदान करने के लिए गति और प्रदर्शन के लिए अनुकूलित।",
        "secureReliable": "सुरक्षित और विश्वसनीय",
        "secureReliableDesc": "सुरक्षा को ध्यान में रखकर बनाया गया, यह सुनिश्चित करता है कि आपका डेटा और अनुप्रयोग सुरक्षित हैं।",
        "webDevelopment": "वेब विकास",
        "webDevelopmentDesc": "आधुनिक तकनीकों के साथ बनाए गए कस्टम वेबसाइट और वेब अनुप्रयोग।",
        "mobileApps": "मोबाइल ऐप्स",
        "mobileAppsDesc": "iOS और Android के लिए नेटिव और क्रॉस-प्लेटफॉर्म मोबाइल अनुप्रयोग।",
        "uiUxDesign": "UI/UX डिज़ाइन",
        "uiUxDesignDesc": "सुंदर और सहज उपयोगकर्ता इंटरफेस जो उपयोगकर्ता अनुभव को बढ़ाते हैं।",
        "learnMore": "और जानें",
        "readyToStart": "अपना प्रोजेक्ट शुरू करने के लिए तैयार हैं?",
        "discussVision": "आइए चर्चा करें कि हम आपके दृष्टिकोण को जीवन में कैसे ला सकते हैं।",
        "contactUsToday": "आज ही संपर्क करें"
      },
      "mainContent": {
        "isoCertified": "एक ISO 9001:2015 प्रमाणित कंपनी",
        "aboutUsDesc": "व्येंफोस पीवीटी लिमिटेड एक भारतीय आधारित कंपनी है जिसका मुख्यालय केरल, भारत में है। जीवन को सस्ता बनाने के एकमात्र दृष्टिकोण के साथ, कंपनी का उद्देश्य आर्थिक स्थिरता को बढ़ावा देना और बचत को बढ़ावा देना है। आय किसी व्यक्ति के जीवन का एक बहुत महत्वपूर्ण हिस्सा है, खर्च भी। भविष्य के खर्चों और आपात स्थितियों को पूरा करने के लिए हर किसी के लिए बचत शुरू करना आवश्यक है। जैसा कि नाम पर जोर देता है, व्येंफोस यानी; अपने खर्च को मिटाएं बचत का नया फॉर्मूला; बचत को बढ़ावा देता है। व्येंफोस क्षेत्र में विभिन्न सेवाएं प्रदान करता है, ऑफ़लाइन ई-कॉमर्स, शिक्षा, परिवहन, चिकित्सा, आदि। हम लोगों को खर्चों को बचत में बदलकर उनके दैनिक खर्चों को मिटाने में मदद करते हैं।",
        "elevateProsperity": "समृद्धि को बढ़ाएं, जीवन को सशक्त बनाएं",
        "inspiringSavings": "बचत को प्रेरित करना",
        "transformIndia": "भारत के भविष्य को एक साथ बदलें",
        "ourAim": "हमारा उद्देश्य",
        "ourAimDesc": "हम भारतीय जीवन स्तर को वैश्विक जीवनशैली से मेल खाने के लिए अपग्रेड करने का लक्ष्य रखते हैं इसलिए सभी के लिए बेहतर जीवन की गुणवत्ता सुनिश्चित करते हैं।",
        "ourMission": "हमारा मिशन",
        "ourMissionDesc": "हर किसी के जीवन में एक सुरक्षित वित्तीय शक्ति स्थापित करना जहां महंगा 'सस्ता' बन जाता है। हम अंतिम खरीदारी विशेषाधिकारों की गारंटी देते हैं",
        "ourVision": "हमारी दृष्टि",
        "ourVisionDesc": "हमारी दृष्टि सभी के दिन-प्रतिदिन के जीवन को आसान बनाना है। हम हर खरीदारी के साथ आय उत्पन्न करके बेहतर वित्तीय स्थिति सुनिश्चित करते हैं। हम जीवन की गुणवत्ता में सुधार पर ध्यान केंद्रित करते हैं",
        "ourKeyAttributes": "हमारी मुख्य विशेषताएं",
        "crestm": "CRESTM",
        "customerCentric": "ग्राहक केंद्रित: हम अपने ग्राहकों की महत्वपूर्ण भूमिका को महत्व देते हैं, इसलिए हम ग्राहक की आवश्यकताओं को पूरा करने के लिए अनुकूलित होने में लचीले हैं।",
        "reliable": "विश्वसनीय: हम कुशल और निरंतर वित्तीय विकास योजनाओं को सुनिश्चित करते हैं।",
        "efficient": "कुशल: हम मौजूदा कमाई और क्रय शक्ति के साथ आपके रिटर्न को अनुकूलित करते हैं।",
        "secure": "सुरक्षित: हम अपने साथ जुड़े हर व्यक्ति के लिए एक वास्तविक और सुरक्षित स्थिति की गारंटी देते हैं।",
        "transparent": "पारदर्शी: हमने सभी के साथ तथ्यात्मक संचार के साथ सरल संचालन अपनाया है और हम किसी भी प्रकार की जांच को चुनौती देते हैं।",
        "modest": "विनम्र: हमने सरल कमाई के तरीके तैयार किए हैं जिन्हें हर कोई आसानी से समझ और पालन कर सकता है।",
        "culturalPride": "सांस्कृतिक गर्व,",
        "economicRise": "आर्थिक उत्थान,",
        "lifesHighs": "व्येंफोस के साथ जीवन की ऊंचाइयां",
        "ourMilestone": "हमारा मील का पत्थर",
        "wyenfosAds": "व्येंफोस एड्स",
        "milestoneDesc": "#जल्द आ रहा है व्येंफोस एड्स Android ऐप के आगामी लॉन्च के साथ एक क्रांतिकारी डिजिटल यात्रा पर निकलने के लिए तैयार हो जाइए! हम एक अत्याधुनिक प्लेटफॉर्म पेश करने के लिए रोमांचित हैं जो न केवल आपके डिजिटल विज्ञापन अनुभव को बदलता है बल्कि आपको आसानी से रियल-टाइम पैसा कमाने में सशक्त बनाता है। व्येंफोस एड्स सिर्फ एक ऐप नहीं है; यह एक अभूतपूर्व पारिस्थितिकी तंत्र है जहां उपयोगकर्ता निर्बाध रूप से विज्ञापन देख सकते हैं और तुरंत पैसा कमा सकते हैं, अपने अवकाश समय को एक फायदेमंद अनुभव में बदल सकते हैं।",
        "cashVapase": "कैश वापसे",
        "cashVapaseDesc1": "#जल्द आ रहा है रोमांचक खबर क्षितिज पर है क्योंकि हम एक अभूतपूर्व नवाचार का अनावरण करते हैं जो आपके खर्चों को प्रबंधित करने के तरीके में क्रांति लाएगा। दुनिया के पहले वाउचर कतार बिल प्रतिपूर्ति प्रणाली का परिचय, हमारी कंपनी द्वारा हमारे अत्याधुनिक मोबाइल अनुप्रयोग 'कैश वापसे' के माध्यम से लाया गया।",
        "cashVapaseDesc2": "पारंपरिक खर्च ट्रैकिंग को अलविदा कहें और एक निर्बाध अनुभव का स्वागत करें जहां आप अपने रोजमर्रा के खर्चों को आसानी से पर्याप्त बचत में बदल सकते हैं। कैश वापसे के साथ, आपके वित्त का प्रबंधन कभी भी इतना सुविधाजनक नहीं रहा।",
        "cashVapaseDesc3": "जैसे ही हम इस गेम-चेंजिंग समाधान को लॉन्च करने की तैयारी करते हैं, स्मार्ट खर्च के भविष्य को फिर से परिभाषित करते हुए और वित्तीय सशक्तिकरण के नए युग की शुरुआत करते हुए, हमारे साथ बने रहें। आपकी बचत यात्रा एक उल्लेखनीय मोड़ लेने वाली है - कैश वापसे के लिए तैयार रहें, जहां हर खर्च वित्तीय विकास के अवसर में बदल जाता है।",
        "yourSavingsPartner": "आपका बचत साथी",
        "whyJustWatch": "क्यों सिर्फ देखें? जब आप इसमें हैं तो कमाएं",
        "wyenfosAdsPutsMoney": "\"व्येंफोस एड्स\" आपकी जेब में पैसा डालता है",
        "transformViewingTime": "व्येंफोस एड्स के साथ अपने देखने के समय को कमाई के समय में बदलें। हमारा क्रांतिकारी प्लेटफॉर्म आपको विज्ञापन देखने और तुरंत असली पैसा कमाने की अनुमति देता है। कोई और निष्क्रिय देखना नहीं - आप जो भी विज्ञापन देखते हैं वह आपकी आय बढ़ाने का अवसर बन जाता है।",
        "joinThousands": "हजारों उपयोगकर्ताओं में शामिल हों जो पहले से ही देखते समय कमा रहे हैं। हमारे उपयोगकर्ता-अनुकूल इंटरफेस और तत्काल भुगतान प्रणाली के साथ, आप पहले दिन से कमाना शुरू कर सकते हैं। व्येंफोस एड्स के साथ अपने अवकाश समय को एक लाभदायक गतिविधि में बदलें।",
        "careersWithUs": "हमारे साथ करियर",
        "sendYourCV": "अपना CV भेजें@",
        "cvEmail": "wyenfospvtltd@gmail.com",
        "whatWeOffer": "हम क्या प्रदान करते हैं:",
        "realWorldExperience": "वास्तविक दुनिया का अनुभव: वास्तविक परियोजनाओं पर काम करें जो प्रभाव डालती हैं।",
        "skillDevelopment": "कौशल विकास: एक सहायक और नवाचारी वातावरण में अपने कौशल को बढ़ाएं।",
        "certification": "प्रमाणन: अपनी इंटर्नशिप के सफल समापन पर एक कार्य-अनुभव प्रमाणपत्र प्राप्त करें। अब अपनी सीट बुक करें।"
      },
      "legal": {
        "title": "कानूनी दस्तावेज",
        "heroTitle": "कानूनी दस्तावेज",
        "introTitle": "आधिकारिक कंपनी दस्तावेज",
        "introDesc": "यहां हमारे आधिकारिक कानूनी दस्तावेज और प्रमाणपत्र हैं जो व्येंफोस प्राइवेट लिमिटेड को एक वैध और प्रमाणित व्यावसायिक इकाई के रूप में स्थापित करते हैं।",
        "companyInfo": "कंपनी की जानकारी",
        "legalNotice": "कानूनी सूचना"
      },
      "cashVapase": {
        "title": "कैश वेपेस",
        "heroTitle": "कैश वेपेस",
        "heroSubtitle": "डिजिटल वाउचर क्रांति",
        "heroDescription": "हमारी नवाचार वाउचर सिस्टम के साथ डिजिटल लेनदेन के भविष्य का अनुभव करें जो आपके खरीदारी और बचत के तरीके को बदल देती है।",
        "customersTitle": "ग्राहक",
        "customersIntro": "ग्राहक अपने खरीदारी के बिलों को अपलोड करके खर्च की पूर्ण प्रतिपूर्ति प्राप्त कर सकते हैं। खरीदारी पर सीमाएं हैं। हम आपके भुगतान की समय पर प्रतिपूर्ति का आश्वासन देते हैं। पूर्ण लाभ प्राप्त करने के लिए सुनिश्चित करें कि आप व्येंफोस अनुमोदित आउटलेट्स से खरीदारी करें। (सभी कैश वेपेस वाउचर के लिए केवल मुद्रित जीएसटी नकद बिल अपलोड किया जा सकता है)",
        "voucherTypes": {
          "grocery": {
            "title": "किराना वाउचर",
            "description": "कैश वेपेस किराना वाउचर के साथ आप सामान्य दैनिक उत्पादों जैसे ताजी सब्जियां, डिब्बाबंद खाद्य पदार्थ, सॉस, विभिन्न किराना सामान, मसाले और जड़ी-बूटियां, तेल/सिरका, रेफ्रिजेरेटेड आइटम, डेयरी, पनीर, फ्रोजन, मांस, समुद्री भोजन, बेक्ड सामान, स्नैक्स, व्यक्तिगत देखभाल, रसोई, घरेलू देखभाल, सफाई उत्पाद, अन्य सामान, पालतू जानवरों का भोजन, थीम्ड भोजन के लिए अपने खरीदारी बिल अपलोड कर सकते हैं और 100% प्रतिपूर्ति का आनंद ले सकते हैं!"
          },
          "rental": {
            "title": "किराया वाउचर",
            "description": "कैश वेपेस रेंटल वाउचर का परिचय आपका किराया बिलों पर 100% प्रतिपूर्ति का टिकट! कैश वेपेस रेंटल वाउचर के साथ किराया खर्चों के बोझ को अलविदा कहें जहां आप घरों, हॉल, लॉज किराया, कमरे के किराए के बिल अपलोड कर सकते हैं और हमारे विशेष रेंटल वाउचर का उपयोग करके प्रतिपूर्ति प्राप्त कर सकते हैं।"
          },
          "health": {
            "title": "स्वास्थ्य वाउचर",
            "description": "कैश वेपेस हेल्थ वाउचर का परिचय तनाव-मुक्त स्वास्थ्य सेवा खर्चों का आपका समाधान कैश वेपेस के साथ, आप चिकित्सा बिलों के वित्तीय तनाव को अलविदा कह सकते हैं। अपने अस्पताल के बिल, दवा की रसीदें, प्रयोगशाला के बिल, ब्यूटी पार्लर के बिल और अन्य स्वास्थ्य संबंधी खर्च अपलोड करें और 100% प्रतिपूर्ति प्राप्त करें।"
          },
          "education": {
            "title": "शिक्षा वाउचर",
            "description": "कैश वेपेस एजुकेशन वाउचर का परिचय निर्बाध शिक्षा खर्चों की आपकी चाबी! कैश वेपेस के साथ, शैक्षणिक लागतों के वित्तीय तनाव को अलविदा कहें। चाहे वह स्कूल या कॉलेज की फीस हो, किताबें, अध्ययन सामग्री, ट्यूशन फीस, या कोई अन्य शिक्षा संबंधी खर्च, आप उन्हें अपलोड कर सकते हैं और एक अद्भुत 100% प्रतिपूर्ति प्राप्त कर सकते हैं।"
          },
          "gold": {
            "title": "गोल्ड वाउचर",
            "description": "कैश वेपेस गोल्ड वाउचर का परिचय सुनहरे रिटर्न का आपका रास्ता! कैश वेपेस के साथ आपकी सोना, चांदी, प्लैटिनम और हीरे की खरीदारी अविश्वसनीय पुरस्कारों के रास्ते बन जाती है। आधार कार्ड उपयोगकर्ता 1 साल में प्रति व्यक्ति 40 ग्राम तक सोने की खरीदारी के लिए बिल अपलोड कर सकते हैं, और चांदी, प्लैटिनम और हीरे की कोई सीमा नहीं है।"
          },
          "builders": {
            "title": "बिल्डर्स वाउचर",
            "description": "बिल्डर्स वाउचर का परिचय! इस वाउचर के साथ, व्यक्ति आसानी से घर निर्माण, घर खरीदारी, हार्डवेयर, इलेक्ट्रिकल, प्लंबिंग, घरेलू फर्नीचर के बिल, नवीनीकरण और सामग्री के बिल अपलोड कर सकते हैं, एक उल्लेखनीय 100% प्रतिपूर्ति प्राप्त कर सकते हैं।"
          }
        },
        "comingSoonTitle": "जल्द आ रहा है",
        "comingSoonSubtitle": "और रोमांचक सुविधाएं",
        "comingSoonDescription": "हम लगातार आपके लिए अधिक नवाचार वाउचर समाधान और बेहतर सुविधाएं लाने के लिए काम कर रहे हैं ताकि आपका डिजिटल लेनदेन अनुभव और भी बेहतर हो सके।",
        "faqTitle": "अक्सर पूछे जाने वाले प्रश्न"
      }
    }
  },
  ml: {
    translation: {
      "nav": {
        "home": "ഹോം",
        "about": "ഞങ്ങളെക്കുറിച്ച്",
        "service": "സേവനം",
        "futureOutlook": "ഭാവി വീക്ഷണം",
        "more": "കൂടുതൽ",
        "contact": "ബന്ധപ്പെടുക",
        "aim": "ഞങ്ങളുടെ ലക്ഷ്യം",
        "mission": "ഞങ്ങളുടെ മിഷൻ",
        "vision": "ഞങ്ങളുടെ വിഷൻ",
        "wyenfosAds": "വൈൻഫോസ് പരസ്യങ്ങൾ",
        "legal": "നിയമപരമായ രേഖകൾ"
      },
      "hero": {
        "title": "വൈൻഫോസ് പ്രൈവറ്റ് ലിമിറ്റഡ്",
        "subtitle": "നിങ്ങളുടെ ചെലവ് മായ്ക്കുക സമ്പാദ്യത്തിന്റെ പുതിയ ഫോർമുല",
        "description": "ഡിജിറ്റൽ പരിവർത്തനത്തിനും സുസ്ഥിര ബിസിനസ് രീതികൾക്കുമായി നൂതന പരിഹാരങ്ങളിൽ മുൻപന്തിയിൽ."
      },
      "contact": {
        "title": "ഞങ്ങളെ ബന്ധപ്പെടുക",
        "getInTouch": "ബന്ധപ്പെടുക",
        "contactDetails": "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ",
        "form": {
          "name": "നിങ്ങളുടെ പേര്",
          "email": "നിങ്ങളുടെ ഇമെയിൽ",
          "subject": "വിഷയം",
          "message": "സന്ദേശം",
          "sendMessage": "സന്ദേശം അയയ്ക്കുക"
        }
      },
      "about": {
        "title": "ഞങ്ങളെക്കുറിച്ച്"
      },
      "services": {
        "title": "ഞങ്ങളുടെ സേവനങ്ങൾ"
      },
      "aim": {
        "title": "ഞങ്ങളുടെ ലക്ഷ്യം"
      },
      "mission": {
        "title": "ഞങ്ങളുടെ മിഷൻ"
      },
      "vision": {
        "title": "ഞങ്ങളുടെ വിഷൻ"
      },
      "wyenfosAds": {
        "title": "വൈൻഫോസ് പരസ്യങ്ങൾ",
        "heroTitle": "വൈൻഫോസ് പരസ്യങ്ങൾ",
        "heroSubtitle": "പരസ്യ പരിഹാരങ്ങൾ",
        "description": "നിങ്ങളുടെ ബിസിനസ് സാന്നിധ്യം വർദ്ധിപ്പിക്കാനും നിങ്ങളുടെ ലക്ഷ്യ പ്രേക്ഷകരിൽ ഫലപ്രദമായി എത്താനുമുള്ള നൂതന പരസ്യ, വിപണന പരിഹാരങ്ങൾ."
      },
      "ourCompanies": {
        "title": "ഞങ്ങളുടെ കമ്പനികൾ",
        "heroTitle": "ഞങ്ങളുടെ കമ്പനികൾ",
        "heroSubtitle": "വൈവിധ്യമാർന്ന ബിസിനസ് പോർട്ട്‌ഫോളിയോ",
        "description": "ഞങ്ങളുടെ വൈവിധ്യമാർന്ന കമ്പനികളുടെ പോർട്ട്‌ഫോളിയോ പര്യവേക്ഷണം ചെയ്യുക, ഓരോന്നും അതത് വ്യവസായങ്ങളിൽ മികവ് പുലർത്തുകയും നവീകരണത്തിന്റെയും മികവിന്റെയും ഞങ്ങളുടെ കാഴ്ചപ്പാടിലേക്ക് സംഭാവന നൽകുകയും ചെയ്യുന്നു."
      },
      "ourKeyAttributes": {
        "title": "ഞങ്ങളുടെ പ്രധാന ഗുണവിശേഷതകൾ",
        "heroTitle": "ഞങ്ങളുടെ പ്രധാന ഗുണവിശേഷതകൾ",
        "heroSubtitle": "ഞങ്ങളെ വ്യത്യസ്തരാക്കുന്നത്",
        "description": "ഞങ്ങളുടെ കമ്പനി സംസ്കാരത്തെ നിർവചിക്കുന്നതും അസാധാരണമായ സേവനങ്ങൾ നൽകുന്നതിലെ ഞങ്ങളുടെ വിജയത്തെ നയിക്കുന്നതുമായ പ്രധാന മൂല്യങ്ങളും ഗുണവിശേഷതകളും കണ്ടെത്തുക."
      },
      "home": {
        "title": "ഹോം"
      },
      "cashVapase": {
        "title": "കാഷ് വാപേസ്",
        "heroTitle": "കാഷ് വാപേസ്",
        "heroSubtitle": "ഡിജിറ്റൽ വൗച്ചർ വിപ്ലവം",
        "heroDescription": "നിങ്ങളുടെ ഷോപ്പിംഗ്, സേവിംഗ് രീതികൾ മാറ്റിമറിക്കുന്ന ഞങ്ങളുടെ നൂതന വൗച്ചർ സിസ്റ്റം ഉപയോഗിച്ച് ഡിജിറ്റൽ ഇടപാടുകളുടെ ഭാവി അനുഭവിക്കുക.",
        "customersTitle": "ഉപഭോക്താക്കൾ",
        "customersIntro": "ഉപഭോക്താക്കൾക്ക് അവരുടെ വാങ്ങൽ ബില്ലുകൾ അപ്‌ലോഡ് ചെയ്തുകൊണ്ട് ചെലവുകളുടെ പൂർണ്ണ തിരിച്ചടവ് ലഭിക്കും. വാങ്ങലുകളിൽ പരിധികളുണ്ട്. നിങ്ങളുടെ പേയ്‌മെന്റുകളുടെ സമയബന്ധിതമായ തിരിച്ചടവ് ഞങ്ങൾ ഉറപ്പുനൽകുന്നു. പൂർണ്ണ നേട്ടങ്ങൾ ലഭിക്കാൻ വൈൻഫോസ് അംഗീകൃത ഔട്ട്‌ലെറ്റുകളിൽ നിന്ന് വാങ്ങുന്നുവെന്ന് ഉറപ്പാക്കുക। (എല്ലാ കാഷ് വാപേസ് വൗച്ചറുകൾക്കും അച്ചടിച്ച ജിഎസ്ടി കാഷ് ബിൽ മാത്രമേ അപ്‌ലോഡ് ചെയ്യാൻ കഴിയൂ)"
      },
      "legal": {
        "title": "നിയമപരമായ രേഖകൾ",
        "heroTitle": "നിയമപരമായ രേഖകൾ",
        "companyInfo": "കമ്പനി വിവരങ്ങൾ",
        "legalNotice": "നിയമപരമായ അറിയിപ്പ്"
      }
    }
  },
  ta: {
    translation: {
      "nav": {
        "home": "முகப்பு",
        "about": "எங்களைப் பற்றி",
        "service": "சேவை",
        "futureOutlook": "எதிர்கால பார்வை",
        "more": "மேலும்",
        "contact": "தொடர்பு கொள்ளுங்கள்",
        "aim": "எங்கள் நோக்கம்",
        "mission": "எங்கள் இலக்கு",
        "vision": "எங்கள் தொலைநோக்கு",
        "wyenfosAds": "வைன்போஸ் விளம்பரங்கள்",
        "legal": "சட்ட ஆவணங்கள்"
      },
      "hero": {
        "title": "வைன்போஸ் பிரைவேட் லிமிடெட்",
        "subtitle": "உங்கள் செலவை அழித்து சேமிப்பின் புதிய வாய்ப்பாடு",
        "description": "டிஜிட்டல் மாற்றம் மற்றும் நிலையான வணிக நடைமுறைகளுக்கான புதுமையான தீர்வுகளில் முன்னணியில் உள்ளோம்."
      },
      "contact": {
        "title": "எங்களைத் தொடர்பு கொள்ளுங்கள்",
        "getInTouch": "தொடர்பில் இருங்கள்",
        "contactDetails": "தொடர்பு விவரங்கள்",
        "address": "முகவரி",
        "addressValue": "சிஜே டவர், இக்கண்ட வாரியர் ரோடு, திருச்சூர்",
        "phone": "தொலைபேசி",
        "email": "மின்னஞ்சல்",
        "companyName": "வைன்போஸ் பிரைவேட் லிமிடெட்",
        "selectBranch": "கிளையைத் தேர்ந்தெடுக்கவும்:",
        "noBranches": "இன்னும் எந்த கிளையும் கட்டமைக்கப்படவில்லை. தயவுசெய்து நிர்வாக டாஷ்போர்டு மூலம் கிளைகளைச் சேர்க்கவும்.",
        "customerSupport": "24/7 வாடிக்கையாளர் ஆதரவு",
        "customerSupportDesc": "எந்தவொரு கேள்விகள், கவலைகள் அல்லது உங்களுக்குத் தேவையான ஆதரவுக்காக எங்கள் அர்ப்பணிக்கப்பட்ட வாடிக்கையாளர் பராமரிப்பு குழு நாள் முழுவதும் கிடைக்கிறது. வைன்போஸுடன் உங்கள் அனுபவம் விதிவிலக்கானதாக இருக்க வேண்டும் என்பதை உறுதிப்படுத்த நாங்கள் இங்கே இருக்கிறோம்.",
        "callUs": "எங்களை அழைக்கவும்",
        "form": {
          "name": "பெயர்",
          "email": "மின்னஞ்சல்",
          "subject": "பொருள்",
          "message": "செய்தி",
          "sendMessage": "செய்தியை அனுப்பவும்"
        },
        "features": {
          "helpline": "24/7 உதவி வரி ஆதரவு",
          "liveChat": "நேரடி அரட்டை உதவி",
          "emailSupport": "மின்னஞ்சல் ஆதரவு"
        }
      },
      "about": {
        "title": "எங்களைப் பற்றி"
      },
      "services": {
        "title": "எங்கள் சேவைகள்"
      },
      "aim": {
        "title": "எங்கள் நோக்கம்"
      },
      "mission": {
        "title": "எங்கள் இலக்கு"
      },
      "vision": {
        "title": "எங்கள் தொலைநோக்கு"
      },
      "wyenfosAds": {
        "title": "வைன்போஸ் விளம்பரங்கள்"
      },
      "home": {
        "title": "முகப்பு"
      }
    }
  },
  te: {
    translation: {
      "nav": {
        "home": "హోమ్",
        "about": "మా గురించి",
        "service": "సేవ",
        "futureOutlook": "భవిష్యత్ దృష్టి",
        "contact": "మమ్మల్ని సంప్రదించండి"
      },
      "hero": {
        "title": "వైన్‌ఫోస్ ప్రైవేట్ లిమిటెడ్",
        "subtitle": "మీ ఖర్చులను తుడిచిపెట్టండి పొదుపు యొక్క కొత్త ఫార్ములా",
        "description": "డిజిటల్ పరివర్తన మరియు స్థిరమైన వ్యాపార పద్ధతుల కోసం వినూత్న పరిష్కారాలలో అగ్రగామిగా ఉంది."
      },
      "contact": {
        "title": "మమ్మల్ని సంప్రదించండి",
        "getInTouch": "సంప్రదించండి",
        "contactDetails": "సంప్రదింపు వివరాలు",
        "address": "చిరునామా",
        "addressValue": "సిజె టవర్, ఇక్కండ వారియర్ రోడ్, తిరుచ్చూర్",
        "phone": "ఫోన్",
        "email": "ఇమెయిల్",
        "companyName": "వైన్‌ఫోస్ ప్రైవేట్ లిమిటెడ్",
        "selectBranch": "శాఖను ఎంచుకోండి:",
        "noBranches": "ఇంకా ఏ శాఖలు కాన్ఫిగర్ చేయబడలేదు. దయచేసి అడ్మిన్ డాష్‌బోర్డ్ ద్వారా శాఖలను జోడించండి.",
        "customerSupport": "24/7 కస్టమర్ సపోర్ట్",
        "customerSupportDesc": "ఏదైనా ప్రశ్నలు, ఆందోళనలు లేదా మీకు అవసరమైన సహాయం కోసం మా అంకితభావంతో కూడిన కస్టమర్ కేర్ బృందం రోజంతా అందుబాటులో ఉంది. వైన్‌ఫోస్‌తో మీ అనుభవం అసాధారణమైనదిగా ఉండేలా చూసుకోవడానికి మేము ఇక్కడ ఉన్నాము.",
        "callUs": "మమ్మల్ని కాల్ చేయండి",
        "form": {
          "name": "పేరు",
          "email": "ఇమెయిల్",
          "subject": "విషయం",
          "message": "సందేశం",
          "sendMessage": "సందేశం పంపండి"
        },
        "features": {
          "helpline": "24/7 హెల్ప్‌లైన్ సపోర్ట్",
          "liveChat": "లైవ్ చాట్ సహాయం",
          "emailSupport": "ఇమెయిల్ సపోర్ట్"
        }
      }
    }
  },
  kn: {
    translation: {
      "nav": {
        "home": "ಮನೆ",
        "about": "ನಮ್ಮ ಬಗ್ಗೆ",
        "service": "ಸೇವೆ",
        "futureOutlook": "ಭವಿಷ್ಯದ ದೃಷ್ಟಿ",
        "contact": "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ"
      },
      "hero": {
        "title": "ವೈನ್‌ಫೋಸ್ ಪ್ರೈವೇಟ್ ಲಿಮಿಟೆಡ್",
        "subtitle": "ನಿಮ್ಮ ವೆಚ್ಚವನ್ನು ಅಳಿಸಿ ಉಳಿತಾಯದ ಹೊಸ ಸೂತ್ರ",
        "description": "ಡಿಜಿಟಲ್ ರೂಪಾಂತರ ಮತ್ತು ಸುಸ್ಥಿರ ವ್ಯಾಪಾರ ಅಭ್ಯಾಸಗಳಿಗಾಗಿ ನವೀನ ಪರಿಹಾರಗಳಲ್ಲಿ ಮುಂಚೂಣಿಯಲ್ಲಿದೆ."
      },
      "contact": {
        "title": "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
        "getInTouch": "ಸಂಪರ್ಕಿಸಿ",
        "contactDetails": "ಸಂಪರ್ಕ ವಿವರಗಳು",
        "address": "ವಿಳಾಸ",
        "addressValue": "ಸಿಜೆ ಟವರ್, ಇಕ್ಕಂಡ ವಾರಿಯರ್ ರೋಡ್, ತ್ರಿಶೂರು",
        "phone": "ಫೋನ್",
        "email": "ಇಮೇಲ್",
        "companyName": "ವೈನ್‌ಫೋಸ್ ಪ್ರೈವೇಟ್ ಲಿಮಿಟೆಡ್",
        "selectBranch": "ಶಾಖೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
        "noBranches": "ಇನ್ನೂ ಯಾವುದೇ ಶಾಖೆಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಆಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಮೂಲಕ ಶಾಖೆಗಳನ್ನು ಸೇರಿಸಿ.",
        "customerSupport": "24/7 ಗ್ರಾಹಕ ಬೆಂಬಲ",
        "customerSupportDesc": "ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು, ಕಾಳಜಿಗಳು ಅಥವಾ ನಿಮಗೆ ಅಗತ್ಯವಿರುವ ಬೆಂಬಲಕ್ಕಾಗಿ ನಮ್ಮ ಅರ್ಪಿತ ಗ್ರಾಹಕ ಕಾಳಜಿ ತಂಡ ರಾತ್ರಿ ಹಗಲು ಲಭ್ಯವಿದೆ. ವೈನ್‌ಫೋಸ್‌ನೊಂದಿಗೆ ನಿಮ್ಮ ಅನುಭವ ಅಸಾಧಾರಣವಾಗಿರಬೇಕು ಎಂದು ಖಚಿತಪಡಿಸಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ.",
        "callUs": "ನಮ್ಮನ್ನು ಕರೆ ಮಾಡಿ",
        "form": {
          "name": "ಹೆಸರು",
          "email": "ಇಮೇಲ್",
          "subject": "ವಿಷಯ",
          "message": "ಸಂದೇಶ",
          "sendMessage": "ಸಂದೇಶ ಕಳುಹಿಸಿ"
        },
        "features": {
          "helpline": "24/7 ಸಹಾಯ ರೇಖೆ ಬೆಂಬಲ",
          "liveChat": "ಲೈವ್ ಚಾಟ್ ಸಹಾಯ",
          "emailSupport": "ಇಮೇಲ್ ಬೆಂಬಲ"
        }
      }
    }
  },
  gu: {
    translation: {
      "nav": {
        "home": "હોમ",
        "about": "અમારા વિશે",
        "service": "સેવા",
        "futureOutlook": "ભાવિ દૃષ્ટિ",
        "more": "વધુ",
        "contact": "અમારો સંપર્ક કરો",
        "aim": "અમારો હેતુ",
        "mission": "અમારું મિશન",
        "vision": "અમારું વિઝન",
        "wyenfosAds": "વાયેનફોસ જાહેરાતો",
        "legal": "કાનૂની દસ્તાવેજો"
      },
      "hero": {
        "title": "વાયેનફોસ પ્રાઈવેટ લિમિટેડ",
        "subtitle": "તમારો ખર્ચ લૂછી નાખો બચતનું નવું સૂત્ર",
        "description": "ડિજિટલ પરિવર્તન અને ટકાઉ વ્યાપારિક પ્રથાઓ માટે નવીન ઉકેલોમાં અગ્રેસર."
      },
      "contact": {
        "title": "અમારો સંપર્ક કરો",
        "getInTouch": "સંપર્ક કરો",
        "contactDetails": "સંપર્ક વિગતો",
        "address": "સરનામું",
        "addressValue": "સીજે ટાવર, ઇક્કંડ વારિયર રોડ, થ્રિસૂર",
        "phone": "ફોન",
        "email": "ઇમેઇલ",
        "companyName": "વાયેનફોસ પ્રાઈવેટ લિમિટેડ",
        "selectBranch": "શાખા પસંદ કરો:",
        "noBranches": "હજુ સુધી કોઈ શાખાઓ કોન્ફિગર કરવામાં આવી નથી. કૃપા કરીને એડમિન ડેશબોર્ડ દ્વારા શાખાઓ ઉમેરો.",
        "customerSupport": "24/7 ગ્રાહક સહાય",
        "customerSupportDesc": "કોઈપણ પ્રશ્નો, ચિંતાઓ અથવા તમને જરૂરી સહાય માટે અમારી સમર્પિત ગ્રાહક સંભાળ ટીમ ચોવીસ કલાક ઉપલબ્ધ છે. વાયેનફોસ સાથે તમારો અનુભવ અસાધારણ હોવો જોઈએ તેની ખાતરી કરવા માટે અમે અહીં છીએ.",
        "callUs": "અમને કૉલ કરો",
        "form": {
          "name": "નામ",
          "email": "ઇમેઇલ",
          "subject": "વિષય",
          "message": "સંદેશ",
          "sendMessage": "સંદેશ મોકલો"
        },
        "features": {
          "helpline": "24/7 હેલ્પલાઇન સહાય",
          "liveChat": "લાઇવ ચેટ સહાય",
          "emailSupport": "ઇમેઇલ સહાય"
        }
      }
    }
  },
  mr: {
    translation: {
      "nav": {
        "home": "मुख्यपृष्ठ",
        "about": "आमच्याबद्दल",
        "service": "सेवा",
        "futureOutlook": "भविष्याचा दृष्टिकोन",
        "contact": "आमच्याशी संपर्क साधा"
      },
      "hero": {
        "title": "वायनफोस प्रायव्हेट लिमिटेड",
        "subtitle": "तुमचा खर्च पुसा बचतीचे नवीन सूत्र",
        "description": "डिजिटल परिवर्तन आणि शाश्वत व्यावसायिक पद्धतींसाठी नाविन्यपूर्ण उपायांमध्ये आघाडीवर."
      },
      "contact": {
        "title": "आमच्याशी संपर्क साधा",
        "getInTouch": "संपर्क साधा",
        "contactDetails": "संपर्क तपशील",
        "address": "पत्ता",
        "addressValue": "सीजे टॉवर, इक्कंड वारियर रोड, त्रिशूर",
        "phone": "फोन",
        "email": "ईमेल",
        "companyName": "वायनफोस प्रायव्हेट लिमिटेड",
        "selectBranch": "शाखा निवडा:",
        "noBranches": "अद्याप कोणत्याही शाखा कॉन्फिगर केल्या नाहीत. कृपया अॅडमिन डॅशबोर्डद्वारे शाखा जोडा.",
        "customerSupport": "24/7 ग्राहक सहाय्य",
        "customerSupportDesc": "कोणत्याही प्रश्नांसाठी, चिंतांसाठी किंवा तुम्हाला आवश्यक असलेल्या सहाय्यासाठी आमची समर्पित ग्राहक काळजी टीम चोवीस तास उपलब्ध आहे. वायनफोससह तुमचा अनुभव असाधारण असावा याची खात्री करण्यासाठी आम्ही येथे आहोत.",
        "callUs": "आम्हाला कॉल करा",
        "form": {
          "name": "नाव",
          "email": "ईमेल",
          "subject": "विषय",
          "message": "संदेश",
          "sendMessage": "संदेश पाठवा"
        },
        "features": {
          "helpline": "24/7 हेल्पलाइन सहाय्य",
          "liveChat": "लाइव्ह चॅट सहाय्य",
          "emailSupport": "ईमेल सहाय्य"
        }
      }
    }
  },
  pa: {
    translation: {
      "nav": {
        "home": "ਘਰ",
        "about": "ਸਾਡੇ ਬਾਰੇ",
        "service": "ਸੇਵਾ",
        "futureOutlook": "ਭਵਿੱਖ ਦਾ ਦ੍ਰਿਸ਼ਟੀਕੋਣ",
        "contact": "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ"
      },
      "hero": {
        "title": "ਵਾਈਨਫੋਸ ਪ੍ਰਾਈਵੇਟ ਲਿਮਿਟੇਡ",
        "subtitle": "ਆਪਣਾ ਖਰਚ ਮਿਟਾਓ ਬਚਤ ਦਾ ਨਵਾਂ ਫਾਰਮੂਲਾ",
        "description": "ਡਿਜਿਟਲ ਤਬਦੀਲੀ ਅਤੇ ਟਿਕਾਊ ਵਪਾਰਕ ਅਭਿਆਸਾਂ ਲਈ ਨਵੀਨਤਾਕਾਰੀ ਹੱਲਾਂ ਵਿੱਚ ਅਗਵਾਈ ਕਰ ਰਹੇ ਹਾਂ।"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: true, // Enable debug mode to troubleshoot translation issues
    
    keySeparator: '.', // Enable dot notation for nested keys like hero.title
    nsSeparator: false, // we do not use namespaces
    
    interpolation: {
      escapeValue: false // react already does escaping
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false // Disable suspense to avoid loading issues
    }
  });

export default i18n;
