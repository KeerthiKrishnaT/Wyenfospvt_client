import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './CashVapase.css';

const CashVapase = () => {
  const { t } = useTranslation();
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [currentVoucherIndex, setCurrentVoucherIndex] = useState(0);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Voucher data for slideshow
  const vouchers = [
    {
      id: 1,
      title: t('cashVapase.voucherTypes.grocery.title'),
      image: "/assets/customer1.png",
      description: t('cashVapase.voucherTypes.grocery.description')
    },
    {
      id: 2,
      title: t('cashVapase.voucherTypes.rental.title'),
      image: "/assets/customer2.png",
      description: t('cashVapase.voucherTypes.rental.description')
    },
    {
      id: 3,
      title: t('cashVapase.voucherTypes.health.title'),
      image: "/assets/customer3.png",
      description: t('cashVapase.voucherTypes.health.description')
    },
    {
      id: 4,
      title: t('cashVapase.voucherTypes.education.title'),
      image: "/assets/customer4.png",
      description: t('cashVapase.voucherTypes.education.description')
    },
    {
      id: 5,
      title: t('cashVapase.voucherTypes.gold.title'),
      image: "/assets/customer5.png",
      description: t('cashVapase.voucherTypes.gold.description')
    },
    {
      id: 6,
      title: t('cashVapase.voucherTypes.builders.title'),
      image: "/assets/customer6.png",
      description: t('cashVapase.voucherTypes.builders.description')
    },
    {
      id: 7,
      title: "Farmers Voucher",
      image: "/assets/customer7.png",
      description: "Introducing the Farmers Voucher, exclusively designed for agricultural purposes! This voucher streamlines the process for farmers to acquire essential supplies such as seeds, organic fertilizers, all types of farmings, agricultural equipment, and more."
    },
    {
      id: 8,
      title: "Tourism Voucher",
      image: "/assets/customer8.png",
      description: "Introducing the Tourism Voucher, dedicated exclusively to promoting tourism experiences! Tailored for travelers from India, this voucher simplifies the process of claiming tour expenses. Whether it's exploring local destinations or embarking on international adventures."
    },
    {
      id: 9,
      title: "Fuel Voucher",
      image: "/assets/customer9.png",
      description: "Introducing the Fuel Voucher, designed exclusively for covering fuel expenses! This voucher offers a streamlined solution for individuals, family, to manage their petroleum, petrol, diesel, house gas and gas purchases."
    },
    {
      id: 10,
      title: "Travel Voucher",
      image: "/assets/customer10.png",
      description: "Introducing the Travel Voucher, dedicated exclusively to facilitating travel experiences! Designed for travelers originating from India, this voucher simplifies the process of claiming travel expenses, bus tickets, train tickets, taxi fare, flight tickets, cruising tickets."
    },
    {
      id: 11,
      title: "Vehicle Voucher",
      image: "/assets/customer11.png",
      description: "Introducing the Vehicle Voucher, tailored exclusively for purchasing vehicles, including two, three, and four-wheelers. Simplifying the process of acquiring a new vehicle, this voucher allows users to upload their on-road purchase bill, covering vehicles up to 10 lakh rupees."
    }
  ];

  // Auto-advance slideshow with pause on hover
  useEffect(() => {
    if (isSlideshowPaused) return; // Don't advance if paused
    
    const interval = setInterval(() => {
      setCurrentVoucherIndex((prevIndex) => 
        (prevIndex + 1) % vouchers.length
      );
    }, 3000); // Change slide every 3 seconds (faster)

    return () => clearInterval(interval);
  }, [vouchers.length, isSlideshowPaused]);

  const nextVoucher = () => {
    setCurrentVoucherIndex((prevIndex) => 
      (prevIndex + 1) % vouchers.length
    );
  };

  const prevVoucher = () => {
    setCurrentVoucherIndex((prevIndex) => 
      prevIndex === 0 ? vouchers.length - 1 : prevIndex - 1
    );
  };

  const goToVoucher = (index) => {
    setCurrentVoucherIndex(index);
  };

  // Handle slideshow pause on hover
  const handleSlideshowMouseEnter = () => {
    setIsSlideshowPaused(true);
  };

  const handleSlideshowMouseLeave = () => {
    setIsSlideshowPaused(false);
  };

  return (
    <div className="cash-vapase-page">
      {/* Hero Section */}
      <div className="cash-hero">
        <div className="container-fluid">
          <div className="hero-content">
            <div className="hero-left">
              <h1 className="cash-title">{t('cashVapase.heroTitle')}</h1>
              <p className="cash-subtitle">{t('cashVapase.heroSubtitle')}</p>
            </div>
            <div className="hero-right">
              <div className="cash-logo-section">
                <img 
                  src="/assets/cashvapase.png" 
                  alt="Cash Vapase Logo" 
                  className="cash-vapase-logo"
                />
              </div>
            </div>
          </div>
          
          {/* Important GST Notice - Moved below hero content */}
          <div className="gst-notice-container">
            <div className="gst-notice">
              <div className="notice-icon">⚠️</div>
              <div className="notice-content">
                <h3>Important Notice - GST Bills Only</h3>
                <p><strong>Only GST Paid bills will get cash back. Other bills are not valid for cash rewards.</strong></p>
                <p>Please ensure your bills include GST to be eligible for Cash Vapase benefits. All vouchers require printed GST cash bills for reimbursement.</p>
                <p><em>Non-GST bills will not be accepted for any Cash Vapase voucher type.</em></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="cash-main">
        {/* Introduction Section */}
        <div className="cash-intro-section">
          <div className="container-fluid">
            <div className="intro-content">
              <div className="intro-text">
                <h2 className="intro-title">What is Cash Vapase?</h2>
                <div className="intro-description">
                  <p>
                    <strong>WYENFOS PVT LTD</strong> Introducing the world's first-ever Voucher Queue Bill Reimbursement System,
                    brought to you by our company through our cutting-edge mobile application, 'Cash Vapase'
                  </p>
                  <p>
                    Say goodbye to traditional expense tracking and hello to a seamless experience where you can effortlessly
                    convert your everyday GST-paid expenses into substantial savings. With <strong>Cash Vapase</strong>, only GST bills are eligible for reimbursement. Stay tuned as we prepare to launch this game-changing solution
                  </p>
                  <p className="gst-requirement-note">
                    <strong>Note:</strong> All Cash Vapase vouchers require printed GST cash bills for validation and reimbursement.
                  </p>
                </div>
              </div>
              <div className="intro-image">
                <img 
                  src="/assets/cashvapase1.png" 
                  alt="Cash Vapase Introduction" 
                  className="cash-intro-img"
                />
              </div>
            </div>
          </div>
        </div>

   

        {/* Milestone Section */}
        <div className="cash-milestone-section">
          <div className="container-fluid">
            <div className="milestone-content">
              <div className="milestone-visual">
                <div className="milestone-arrow">
                  ↓
                </div>
                <div className="milestone-text">
                  <p>
                    When the total amount of the vouchers processed reach an amount of <strong>Rs.50000</strong> (either through you or via any other 
                    registered users on all India basis) the company will reimburse <strong>100%</strong> to the first voucher in the queue from the profits 
                    earned
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outlets Section */}
        <div className="cash-outlets-section">
          <div className="container-fluid">
            <div className="outlets-content">
              <h2 className="section-title">OUTLETS</h2>
              <p className="outlets-description">
                These are customer purchase platforms. Outlets include any SSI units, Wholesalers, C&F, Sole Distributors, Manufacturers & Farmers. Registration free. Kindly note that 
                only purchases from our registered outlets will be eligible for full reimbursement. After registering with the outlets, for every purchase made for the inventory kept by 
                the firm, 100% of the bill amount is reimbursed. 20% of the customer purchase is held by the company. An amount equivalent to 20% purchased by our customers 
                from any registered wyenfos outlets, will be deducted from the total reimbursed amounts of the outlet without affecting their retail margins
              </p>
              
              <h3 className="benefits-title">BENEFITS</h3>
              <div className="benefits-list">
                <div className="benefit-item">1. Delivers 'quality' without the constraint of expense.</div>
                <div className="benefit-item">2. Smooth running of the business.</div>
                <div className="benefit-item">3. No risk of burden.</div>
                <div className="benefit-item">4. Value-driven strategies.</div>
                <div className="benefit-item">5. Develops earning capacity.</div>
                <div className="benefit-item">6. Limited expense.</div>
                <div className="benefit-item">7. No any bargains are made by the customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Customers Section */}
        <div className="cash-customers-section">
          <div className="container-fluid">
            <div className="customers-content">
              <h2 className="section-title">{t('cashVapase.customersTitle')}</h2>
              <p className="customers-description">
                {t('cashVapase.customersIntro')}
              </p>
              
              <h3 className="benefits-title">BENEFITS</h3>
              <div className="benefits-list">
                <div className="benefit-item">1. Increasing affordability: Reimbursement in turn increases purchasing power, thus increasing affordability.</div>
                <div className="benefit-item">2. Uninterrupted savings: Achieve the ultimate benefit of the continuous flow of savings.</div>
                <div className="benefit-item">3. Ease of use: Experience the benefits with simple steps.</div>
                <div className="benefit-item">4. 24*7 services: Access provided any time any day.</div>
                <div className="benefit-item">5. Improved opportunities: With the concept of reimbursement, Contributing to developing your- self and explore economic opportunities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps Section */}
        <div className="cash-process-section">
          <div className="container-fluid">
            <h2 className="section-title">How It Works</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-icon">
                  <img src="/assets/cashvapase2.png" alt="Upload Bills" className="step-img" />
                </div>
                <h3 className="step-title">Upload GST Bills</h3>
                <p className="step-description">Upload your GST-paid purchase bills through the Cash Vapase mobile application. Only printed GST cash bills are accepted.</p>
              </div>
              
              <div className="process-step">
                <div className="step-icon">
                  <img src="/assets/cashvapase3.png" alt="Queue System" className="step-img" />
                </div>
                <h3 className="step-title">Queue Processing</h3>
                <p className="step-description">Your bills enter our innovative queue-based reimbursement system</p>
              </div>
              
              <div className="process-step">
                <div className="step-icon">
                  <img src="/assets/cashvapase4.png" alt="Get Reimbursed" className="step-img" />
                </div>
                <h3 className="step-title">Get Reimbursed</h3>
                <p className="step-description">Receive 100% reimbursement when queue reaches Rs.50,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="cash-gallery-section">
          <div className="container-fluid">
            <h2 className="section-title">Cash Vapase Gallery</h2>
            
            {/* Centered GIF */}
            <div className="gallery-gif-center">
              <img 
                src="/assets/cashvapase5.gif" 
                alt="Cash Vapase Animation" 
                className="gallery-gif"
              />
            </div>

            {/* India Map Below GIF */}
            <div className="gallery-map-section">
              <img 
                src="/assets/cashvapase6.png" 
                alt="Cash Vapase India Map" 
                className="gallery-map"
              />
            </div>
          </div>
        </div>

        {/* Franchise Section */}
        <div className="cash-franchise-section">
          <div className="container-fluid">
            <h2 className="section-title">FRANCHISE</h2>
            <p className="franchise-description">
              The key responsibility of a Franchisee is to connect WYENFOS with purchase outlets by convincing them about this new concept of reimbursement.
            </p>
            
            <div className="franchise-areas">
              <h3 className="franchise-subtitle">FRANCHISE CAN PICK THEIR AREAS:</h3>
              <div className="franchise-list">
                <div className="franchise-item">PANCHAYATH</div>
                <div className="franchise-item">PANCHAYATH BASED FRANCHISE</div>
                <div className="franchise-item">MUNICIPALITY AND CORPORATIONS</div>
                <div className="franchise-item">WARD BASED FRANCHISE</div>
              </div>
            </div>

            <div className="franchise-benefits">
              <h3 className="franchise-subtitle">BY CHOOSING TO BE A FRANCHISE, YOU BECOME PRIVILEGED</h3>
              <div className="franchise-benefits-list">
                <div className="franchise-benefit">1. To enter into a new system of earnings at a nominal cost</div>
                <div className="franchise-benefit">2. To enjoy the best support system from all Co-ordinators: State, Zonal and District.</div>
                <div className="franchise-benefit">3. To have a better approach to outlets with simplified techniques</div>
                <div className="franchise-benefit">4. To overcome cash stringent situations with regular flow of earning</div>
                <div className="franchise-benefit">5. To enjoy flexible stress-free work hours</div>
                <div className="franchise-benefit">6. To improve and enjoy a better lifestyle</div>
              </div>
            </div>
          </div>
        </div>

        {/* New Formula Section */}
        <div className="cash-formula-section">
          <div className="container-fluid">
            <div className="formula-content">
              <div className="formula-text">
                <h2 className="formula-title">
                  <span className="title-main">Unveiling</span><br />
                  <span className="title-highlight">a New Formula</span><br />
                  <span className="title-main">for Savings</span>
                </h2>
              </div>
              <div className="formula-video">
                <div className="video-container">
                  <div className="video-placeholder">
                    <div className="placeholder-content">
                      <div className="placeholder-icon">🎥</div>
                      <h3>Cash Vapase Video</h3>
                      <p>Video content coming soon</p>
                      <div className="placeholder-image">
                        <img 
                          src="/assets/cashvapase.png" 
                          alt="Cash Vapase Preview" 
                          className="preview-image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Voucher Slideshow Section */}
        <div className="voucher-slideshow-section">
          <div className="container-fluid">
            <h2 className="section-title">CUSTOMER VOUCHERS</h2>
            <p className="customers-intro">
              <strong>GST Bills Required:</strong> Customers can avail full reimbursement of expenses by uploading their GST-paid purchase bills.<br />
              There exist limits on purchases. We assure timely reimbursement of your payments.<br />
              To avail full benefits ensure that you purchase from Wyenfos approved outlets.<br />
              <strong>(Only printed GST cash bills can be uploaded for all Cash Vapase vouchers - Non-GST bills will be rejected)</strong>
            </p>

            <div 
              className="slideshow-container"
              onMouseEnter={handleSlideshowMouseEnter}
              onMouseLeave={handleSlideshowMouseLeave}
            >
              <div className="voucher-slide-wrapper" key={currentVoucherIndex}>
                {/* Background Box - comes from bottom */}
                <div className="voucher-slide-background" key={`bg-${currentVoucherIndex}`}></div>
                
                {/* Title - comes from top */}
                <div className="voucher-slide-title" key={`title-${currentVoucherIndex}`}>
                  <h3>{vouchers[currentVoucherIndex]?.title || 'Loading...'}</h3>
                </div>

                {/* Content Container */}
                <div className="voucher-slide-content">
                  {/* Description - comes from left */}
                  <div className="voucher-slide-description" key={`desc-${currentVoucherIndex}`}>
                    <p>{vouchers[currentVoucherIndex]?.description || 'Loading description...'}</p>
                  </div>
                  
                  {/* Image - comes from right */}
                  <div className="voucher-slide-image" key={`img-${currentVoucherIndex}`}>
                    <img 
                      src={vouchers[currentVoucherIndex]?.image || '/assets/customer1.png'} 
                      alt={vouchers[currentVoucherIndex]?.title || 'Voucher'}
                      className="voucher-img"
                      onError={(e) => {
                        e.target.src = '/assets/customer1.png';
                      }}
                    />
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="slideshow-controls">
                  <button className="slide-btn prev-btn" onClick={prevVoucher} type="button">
                    &#8249;
                  </button>
                  <button className="slide-btn next-btn" onClick={nextVoucher} type="button">
                    &#8250;
                  </button>
                </div>

                {/* Slide Indicators */}
                <div className="slide-indicators">
                  {vouchers.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`indicator ${index === currentVoucherIndex ? 'active' : ''}`}
                      onClick={() => goToVoucher(index)}
                    />
                  ))}
                </div>



              </div>
            </div>
          </div>
        </div>

        {/* Outlet Section */}
        <div className="cash-outlet-section">
          <div className="container-fluid">
            <h2 className="section-title">OUTLET</h2>
            <p className="outlet-intro">
              These are outlets purchase platforms. Outlets include any SSI units, Wholesalers, C&F, Sole Distributors, Manufacturers & Raw material supplier. Registration free. Kindly note that only purchases from our registered outlets will be eligible for full reimbursement. After registering with the outlets, for every purchase made for the inventory kept by the firm, 100% of the bill amount is reimbursed. 20% of the customer purchase is held by the company. An amount equivalent to 20% purchased total bill's by our customers from any registered wyenfos outlets, will be deducted from the total reimbursed amounts of the outlet without affecting their retail margins (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)
            </p>

            {/* Rental Voucher for Outlets */}
            <div className="outlet-voucher-section">
              <h3 className="outlet-voucher-title">Rental Voucher</h3>
              <div className="outlet-voucher-content">
                <div className="outlet-voucher-image">
                  <img src="/assets/customer2.png" alt="Outlet Rental Voucher" className="outlet-voucher-img" />
                </div>
                <div className="outlet-voucher-text">
                  <p>Introducing the Rental Voucher, designed to ease the financial burden of renting spaces. With this voucher, An Outlets can upload rental bills for shops, and offices, securing a remarkable 100% reimbursement. Whether it's for personal or commercial purposes, this initiative ensures that every penny spent on renting is fully supported, providing businesses with financial relief and peace of mind. From finding the perfect space for living to establishing a thriving business location, the Rental Voucher empowers users to pursue their goals without worrying about rental expenses. With this support in place, the journey towards finding the ideal rental property becomes more accessible and rewarding, fostering a sense of stability and prosperity</p>
                </div>
              </div>
            </div>

            {/* Salary Voucher */}
            <div className="outlet-voucher-section">
              <h3 className="outlet-voucher-title">Salary Voucher</h3>
              <div className="outlet-voucher-content">
                <div className="outlet-voucher-image">
                  <img src="/assets/salaryvoucher.png" alt="Salary Voucher" className="outlet-voucher-img" />
                </div>
                <div className="outlet-voucher-text">
                  <p>Introducing the Salary Voucher, tailored exclusively for outlets. With this voucher, businesses can streamline staffs, workers, their salary reimbursement process by simply uploading their salary bills (not salary slip) and receiving a remarkable 100% reimbursement. Whether it's compensating employees for their hard work or maintaining operational efficiency, this initiative ensures that every penny spent on salaries is fully supported. By alleviating financial concerns related to payroll, the Salary Voucher empowers businesses to focus on growth and success, fostering a productive and motivated workforce. With this support in place, the journey towards building a thriving outlet becomes more manageable and rewarding for both employers and employees alike</p>
                </div>
              </div>
            </div>

            {/* Outlet Voucher */}
            <div className="outlet-voucher-section">
              <h3 className="outlet-voucher-title">Outlet Voucher</h3>
              <div className="outlet-voucher-content">
                <div className="outlet-voucher-image">
                  <img src="/assets/outletvoucher.png" alt="Outlet Voucher" className="outlet-voucher-img" />
                </div>
                <div className="outlet-voucher-text">
                  <p>Introducing the Outlet Voucher, exclusively reserved for authorized outlets including retailers, wholesalers, c&f, manufacturers, and raw material suppliers. This voucher offers a seamless solution for businesses to manage their expenses by allowing them to upload Gst cash bill's purchase bill's of sales & service goods, raw materials and secure a remarkable 100% reimbursement. this initiative ensures that every expense incurred by outlets is fully supported, fostering financial stability and growth. With the Outlet Voucher, businesses can confidently pursue their objectives, knowing that their expenditures are backed by comprehensive reimbursement, paving the way for sustained success and prosperity in the marketplace</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Franchise Section */}
        <div className="cash-franchise-vouchers-section">
          <div className="container-fluid">
            <h2 className="section-title">FRANCHISE</h2>
            <p className="franchise-intro">
              The key responsibility of a Franchise is to connect WYENFOS convincing them about this new concept of reimbursement. (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)
            </p>

            {/* Franchise Voucher */}
            <div className="franchise-voucher-section">
              <h3 className="franchise-voucher-title">Franchise Voucher</h3>
              <div className="franchise-voucher-content">
                <div className="franchise-voucher-image">
                  <img src="/assets/franchisevocher.png" alt="Franchise Voucher" className="franchise-voucher-img" />
                </div>
                <div className="franchise-voucher-text">
                  <p>Introducing the Franchise Voucher, designed exclusively for franchise operations. This voucher streamlines the reimbursement process for franchisees, allowing them to upload office equipment, furniture bill's, and receive a remarkable 100% reimbursement. Whether it's launching a new franchise location or expanding an existing one, this initiative ensures that every penny invested in the franchise is fully supported. By alleviating financial concerns related to franchise fees, the Franchise Voucher empowers entrepreneurs to focus on building and growing their franchise businesses with confidence. With this support in place, the path to success in the franchise industry becomes more accessible and rewarding, fostering a culture of entrepreneurship and innovation</p>
                </div>
              </div>
            </div>

            {/* Rental Voucher for Franchise */}
            <div className="franchise-voucher-section">
              <h3 className="franchise-voucher-title">Rental Voucher</h3>
              <div className="franchise-voucher-content">
                <div className="franchise-voucher-image">
                  <img src="/assets/customer2.png" alt="Franchise Rental Voucher" className="franchise-voucher-img" />
                </div>
                <div className="franchise-voucher-text">
                  <p>Introducing the Rental Voucher, designed to ease the financial burden of renting spaces. With this voucher, Franchise can upload rental bills of office, securing a remarkable 100% reimbursement. This initiative ensures that every penny spent on renting is fully supported, providing individuals and businesses with financial relief and peace of mind. From finding the perfect space for living to establishing a thriving business location, the Rental Voucher empowers users to pursue their goals without worrying about rental expenses. With this support in place, the journey towards finding the ideal rental property becomes more accessible and rewarding, fostering a sense of stability and prosperity</p>
                </div>
              </div>
            </div>

            {/* Salary Voucher for Franchise */}
            <div className="franchise-voucher-section">
              <h3 className="franchise-voucher-title">Salary Voucher</h3>
              <div className="franchise-voucher-content">
                <div className="franchise-voucher-image">
                  <img src="/assets/salaryvoucher.png" alt="Franchise Salary Voucher" className="franchise-voucher-img" />
                </div>
                <div className="franchise-voucher-text">
                  <p>Introducing the Salary Voucher, tailored exclusively for franchise. With this voucher, franchise can streamline their salary reimbursement process by simply uploading their salary bills (not for salary slip) and receiving a remarkable 100% reimbursement. Whether it's compensating employees for their hard work or maintaining operational efficiency, this initiative ensures that every penny spent on salaries is fully supported. By alleviating financial concerns related to payroll, the Salary Voucher empowers businesses to focus on growth and success, fostering a productive and motivated workforce. With this support in place, the journey towards building a thriving franchise becomes more manageable and rewarding for both employers and employees alike</p>
                </div>
              </div>
            </div>

            {/* Fuel Voucher for Franchise */}
            <div className="franchise-voucher-section">
              <h3 className="franchise-voucher-title">Fuel Voucher</h3>
              <div className="franchise-voucher-content">
                <div className="franchise-voucher-image">
                  <img src="/assets/Fuel-Voucher.png" alt="Franchise Fuel Voucher" className="franchise-voucher-img" />
                </div>
                <div className="franchise-voucher-text">
                  <p>Introducing the Fuel Voucher, designed exclusively for covering fuel expenses! This voucher offers a streamlined solution for Franchise to manage their petroleum, petrol, diesel, and gas purchases. By simply uploading their fuel purchase bills, users can secure a remarkable 100% reimbursement, ensuring that every expense incurred on fuel is fully supported. Whether it's for daily commuting, Franchise operations, or the Fuel Voucher provides financial relief and peace of mind, allowing individuals to focus on their activities without worrying about rising fuel costs. With this initiative, the burden of fuel expenses is significantly alleviated, empowering Franchise to navigate their journeys with efficiency and confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* District Co-ordinator Section */}
        <div className="cash-district-coordinator-section">
          <div className="container-fluid">
            <h2 className="section-title">DISTRICT CO-ORDINATOR</h2>
            <p className="district-intro">
              (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)
            </p>

            {/* District Co-ordinator Voucher */}
            <div className="district-voucher-section">
              <h3 className="district-voucher-title">District Co-ordinator Voucher</h3>
              <div className="district-voucher-content">
                <div className="district-voucher-image">
                  <img src="/assets/districtcoordinatorvocher.png" alt="District Co-ordinator Voucher" className="district-voucher-img" />
                </div>
                <div className="district-voucher-text">
                  <p>Introducing the District Co-ordinator Voucher designed to ease the financial burden of office stationery, office furniture's & District Co-ordinator fee can be uploaded can avail 100% reimbursement.</p>
                </div>
              </div>
            </div>

            {/* Rental Voucher for District Co-ordinator */}
            <div className="district-voucher-section">
              <h3 className="district-voucher-title">Rental Voucher</h3>
              <div className="district-voucher-content">
                <div className="district-voucher-image">
                  <img src="/assets/customer2.png" alt="District Rental Voucher" className="district-voucher-img" />
                </div>
                <div className="district-voucher-text">
                  <p>Introducing the Rental Voucher, designed to ease the financial burden of renting spaces. With this voucher, can upload rental bills of offices, securing a remarkable 100% reimbursement. this initiative ensures that every penny spent on renting is fully supported, providing businesses with financial relief and peace of mind. From to establishing a thriving business location, the Rental Voucher empowers users to pursue their goals without worrying about rental expenses. With this support in place, the journey towards finding the ideal rental property becomes more accessible and rewarding, fostering a sense of stability and prosperity</p>
                </div>
              </div>
            </div>

            {/* Salary Voucher for District Co-ordinator */}
            <div className="district-voucher-section">
              <h3 className="district-voucher-title">Salary Voucher</h3>
              <div className="district-voucher-content">
                <div className="district-voucher-image">
                  <img src="/assets/salaryvoucher.png" alt="District Salary Voucher" className="district-voucher-img" />
                </div>
                <div className="district-voucher-text">
                  <p>Introducing the Salary Voucher, With this voucher, can streamline their salary reimbursement process by simply uploading their salary bills (not for salary slip) and receiving a remarkable 100% reimbursement. Whether it's compensating employees for their hard work or maintaining operational efficiency, this initiative ensures that every penny spent on salaries is fully supported. By alleviating financial concerns related to payroll, the Salary Voucher empowers businesses to focus on growth and success, fostering a productive and motivated workforce. With this support in place, the journey towards becomes more manageable and rewarding for both employers and employees alike</p>
                </div>
              </div>
            </div>

            {/* Fuel Voucher for District Co-ordinator */}
            <div className="district-voucher-section">
              <h3 className="district-voucher-title">Fuel Voucher</h3>
              <div className="district-voucher-content">
                <div className="district-voucher-image">
                  <img src="/assets/Fuel-Voucher.png" alt="District Fuel Voucher" className="district-voucher-img" />
                </div>
                <div className="district-voucher-text">
                  <p>Introducing the Fuel Voucher, designed exclusively for covering fuel expenses! This voucher offers a streamlined solution to manage their petrol, diesel, purchases. By simply uploading their fuel purchase bills, can secure a remarkable 100% reimbursement, ensuring that expense incurred on fuel is fully supported. the Fuel Voucher provides financial relief and peace of mind, allowing to focus on their activities without worrying about rising fuel costs. With this initiative, the burden of fuel expenses is significantly alleviated, empowering to navigate their journeys with efficiency and confidence</p>
                </div>
              </div>
            </div>

            {/* District Co-ordinator GIF Section */}
            <div className="district-gif-section">
              <div className="district-gif-container">
                <img src="/assets/5xDL.gif" alt="District Co-ordinator Animation" className="district-gif" />
              </div>
            </div>
          </div>
        </div>

        {/* Zonal Co-ordinator Section */}
        <div className="cash-zonal-coordinator-section">
          <div className="container-fluid">
            <h2 className="section-title">ZONAL CO-ORDINATOR</h2>
            <p className="zonal-intro">
              (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)
            </p>

            {/* Zonal Co-ordinator Voucher */}
            <div className="zonal-voucher-section">
              <h3 className="zonal-voucher-title">Zonal Co-ordinator Voucher</h3>
              <div className="zonal-voucher-content">
                <div className="zonal-voucher-image">
                  <img src="/assets/zonalvoucher.png" alt="Zonal Co-ordinator Voucher" className="zonal-voucher-img" />
                </div>
                <div className="zonal-voucher-text">
                  <p>Introducing the Zonal Co-ordinator Voucher designed to ease the financial burden of office stationery, office furniture's & Zonal Co-ordinator Voucher fee can be uploaded can avail 100% reimbursement.</p>
                </div>
              </div>
            </div>

            {/* Rental Voucher for Zonal Co-ordinator */}
            <div className="zonal-voucher-section">
              <h3 className="zonal-voucher-title">Rental Voucher</h3>
              <div className="zonal-voucher-content">
                <div className="zonal-voucher-image">
                  <img src="/assets/customer2.png" alt="Zonal Rental Voucher" className="zonal-voucher-img" />
                </div>
                <div className="zonal-voucher-text">
                  <p>Introducing the Rental Voucher, designed to ease the financial burden of renting spaces. With this voucher, can upload rental bills of offices, securing a remarkable 100% reimbursement. this initiative ensures that every penny spent on renting is fully supported, providing businesses with financial relief and peace of mind. From to establishing a thriving business location, the Rental Voucher empowers users to pursue their goals without worrying about rental expenses. With this support in place, the journey towards finding the ideal rental property becomes more accessible and rewarding, fostering a sense of stability and prosperity</p>
                </div>
              </div>
            </div>

            {/* Salary Voucher for Zonal Co-ordinator */}
            <div className="zonal-voucher-section">
              <h3 className="zonal-voucher-title">Salary Voucher</h3>
              <div className="zonal-voucher-content">
                <div className="zonal-voucher-image">
                  <img src="/assets/salaryvoucher.png" alt="Zonal Salary Voucher" className="zonal-voucher-img" />
                </div>
                <div className="zonal-voucher-text">
                  <p>Introducing the Salary Voucher, With this voucher, can streamline their salary reimbursement process by simply uploading their salary bills (not for salary slip) and receiving a remarkable 100% reimbursement. Whether it's compensating employees for their hard work or maintaining operational efficiency, this initiative ensures that every penny spent on salaries is fully supported. By alleviating financial concerns related to payroll, the Salary Voucher empowers businesses to focus on growth and success, fostering a productive and motivated workforce. With this support in place, the journey towards becomes more manageable and rewarding for both employers and employees alike</p>
                </div>
              </div>
            </div>

            {/* Fuel Voucher for Zonal Co-ordinator */}
            <div className="zonal-voucher-section">
              <h3 className="zonal-voucher-title">Fuel Voucher</h3>
              <div className="zonal-voucher-content">
                <div className="zonal-voucher-image">
                  <img src="/assets/Fuel-Voucher.png" alt="Zonal Fuel Voucher" className="zonal-voucher-img" />
                </div>
                <div className="zonal-voucher-text">
                  <p>Introducing the Fuel Voucher, designed exclusively for covering fuel expenses! This voucher offers a streamlined solution to manage their petrol, diesel, purchases. By simply uploading their fuel purchase bills, can secure a remarkable 100% reimbursement, ensuring that expense incurred on fuel is fully supported. the Fuel Voucher provides financial relief and peace of mind, allowing to focus on their activities without worrying about rising fuel costs. With this initiative, the burden of fuel expenses is significantly alleviated, empowering to navigate their journeys with efficiency and confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State Co-ordinator Section */}
        <div className="cash-state-coordinator-section">
          <div className="container-fluid">
            <h2 className="section-title">STATE CO-ORDINATOR</h2>
            <p className="state-intro">
              (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)
            </p>

            {/* State Co-ordinator Voucher */}
            <div className="state-voucher-section">
              <h3 className="state-voucher-title">State Co-ordinator Voucher</h3>
              <div className="state-voucher-content">
                <div className="state-voucher-image">
                  <img src="/assets/statevoucher.png" alt="State Co-ordinator Voucher" className="state-voucher-img" />
                </div>
                <div className="state-voucher-text">
                  <p>Introducing the State Co-ordinator Voucher designed to ease the financial burden of office stationery, office furniture's & State Co-ordinator Voucher fee can be uploaded can avail 100% reimbursement.</p>
                </div>
              </div>
            </div>

            {/* Rental Voucher for State Co-ordinator */}
            <div className="state-voucher-section">
              <h3 className="state-voucher-title">Rental Voucher</h3>
              <div className="state-voucher-content">
                <div className="state-voucher-image">
                  <img src="/assets/customer2.png" alt="State Rental Voucher" className="state-voucher-img" />
                </div>
                <div className="state-voucher-text">
                  <p>Introducing the Rental Voucher, designed to ease the financial burden of renting spaces. With this voucher, can upload rental bills of offices, securing a remarkable 100% reimbursement. this initiative ensures that every penny spent on renting is fully supported, providing businesses with financial relief and peace of mind. From to establishing a thriving business location, the Rental Voucher empowers users to pursue their goals without worrying about rental expenses. With this support in place, the journey towards finding the ideal rental property becomes more accessible and rewarding, fostering a sense of stability and prosperity</p>
                </div>
              </div>
            </div>

            {/* Salary Voucher for State Co-ordinator */}
            <div className="state-voucher-section">
              <h3 className="state-voucher-title">Salary Voucher</h3>
              <div className="state-voucher-content">
                <div className="state-voucher-image">
                  <img src="/assets/salaryvoucher.png" alt="State Salary Voucher" className="state-voucher-img" />
                </div>
                <div className="state-voucher-text">
                  <p>Introducing the Salary Voucher, With this voucher, can streamline their salary reimbursement process by simply uploading their salary bills (not for salary slip) and receiving a remarkable 100% reimbursement. Whether it's compensating employees for their hard work or maintaining operational efficiency, this initiative ensures that every penny spent on salaries is fully supported. By alleviating financial concerns related to payroll, the Salary Voucher empowers businesses to focus on growth and success, fostering a productive and motivated workforce. With this support in place, the journey towards becomes more manageable and rewarding for both employers and employees alike</p>
                </div>
              </div>
            </div>

            {/* Fuel Voucher for State Co-ordinator */}
            <div className="state-voucher-section">
              <h3 className="state-voucher-title">Fuel Voucher</h3>
              <div className="state-voucher-content">
                <div className="state-voucher-image">
                  <img src="/assets/Fuel-Voucher.png" alt="State Fuel Voucher" className="state-voucher-img" />
                </div>
                <div className="state-voucher-text">
                  <p>Introducing the Fuel Voucher, designed exclusively for covering fuel expenses! This voucher offers a streamlined solution to manage their petrol, diesel, purchases. By simply uploading their fuel purchase bills, can secure a remarkable 100% reimbursement, ensuring that expense incurred on fuel is fully supported. the Fuel Voucher provides financial relief and peace of mind, allowing to focus on their activities without worrying about rising fuel costs. With this initiative, the burden of fuel expenses is significantly alleviated, empowering to navigate their journeys with efficiency and confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State Co-ordinator Controller (South Region) Section */}
        <div className="cash-state-controller-section">
          <div className="container-fluid">
            <h2 className="section-title">STATE CO-ORDINATOR<br />CONTROLLER (SOUTH REGION)</h2>
            <p className="state-controller-intro">
              (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)
            </p>

            {/* State Co-ordinator Controller Voucher */}
            <div className="state-controller-voucher-section">
              <h3 className="state-controller-voucher-title">State Co-ordinator Controller Voucher<br />(South)</h3>
              <div className="state-controller-voucher-content">
                <div className="state-controller-voucher-image">
                  <img src="/assets/statecoordinatorvoucher1.png" alt="State Co-ordinator Controller Voucher (South)" className="state-controller-voucher-img" />
                </div>
                <div className="state-controller-voucher-text">
                  <p>Introducing the State Co-ordinator Controller Voucher (south) designed to ease the financial burden of office stationery, office furniture's & State Co-ordinator Controller (south) Voucher fee can be uploaded can avail 100% reimbursement.</p>
                </div>
              </div>
            </div>

            {/* Rental Voucher for State Co-ordinator Controller */}
            <div className="state-controller-voucher-section">
              <h3 className="state-controller-voucher-title">Rental Voucher</h3>
              <div className="state-controller-voucher-content">
                <div className="state-controller-voucher-image">
                  <img src="/assets/customer2.png" alt="State Controller Rental Voucher" className="state-controller-voucher-img" />
                </div>
                <div className="state-controller-voucher-text">
                  <p>Introducing the Rental Voucher, designed to ease the financial burden of renting spaces. With this voucher, can upload rental bills of offices, securing a remarkable 100% reimbursement. this initiative ensures that every penny spent on renting is fully supported, providing businesses with financial relief and peace of mind. From to establishing a thriving business location, the Rental Voucher empowers users to pursue their goals without worrying about rental expenses. With this support in place, the journey towards finding the ideal rental property becomes more accessible and rewarding, fostering a sense of stability and prosperity</p>
                </div>
              </div>
            </div>

            {/* Salary Voucher for State Co-ordinator Controller */}
            <div className="state-controller-voucher-section">
              <h3 className="state-controller-voucher-title">Salary Voucher</h3>
              <div className="state-controller-voucher-content">
                <div className="state-controller-voucher-image">
                  <img src="/assets/salaryvoucher.png" alt="State Controller Salary Voucher" className="state-controller-voucher-img" />
                </div>
                <div className="state-controller-voucher-text">
                  <p>Introducing the Salary Voucher, With this voucher, can streamline their salary reimbursement process by simply uploading their salary bills (not for salary slip) and receiving a remarkable 100% reimbursement. Whether it's compensating employees for their hard work or maintaining operational efficiency, this initiative ensures that every penny spent on salaries is fully supported. By alleviating financial concerns related to payroll, the Salary Voucher empowers businesses to focus on growth and success, fostering a productive and motivated workforce. With this support in place, the journey towards becomes more manageable and rewarding for both employers and employees alike</p>
                </div>
              </div>
            </div>

            {/* Fuel Voucher for State Co-ordinator Controller */}
            <div className="state-controller-voucher-section">
              <h3 className="state-controller-voucher-title">Fuel Voucher</h3>
              <div className="state-controller-voucher-content">
                <div className="state-controller-voucher-image">
                  <img src="/assets/Fuel-Voucher.png" alt="State Controller Fuel Voucher" className="state-controller-voucher-img" />
                </div>
                <div className="state-controller-voucher-text">
                  <p>Introducing the Fuel Voucher, designed exclusively for covering fuel expenses! This voucher offers a streamlined solution to manage their petrol, diesel, purchases. By simply uploading their fuel purchase bills, can secure a remarkable 100% reimbursement, ensuring that expense incurred on fuel is fully supported. the Fuel Voucher provides financial relief and peace of mind, allowing to focus on their activities without worrying about rising fuel costs. With this initiative, the burden of fuel expenses is significantly alleviated, empowering to navigate their journeys with efficiency and confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State Co-ordinator Controller (North Region) Section */}
        <div className="cash-state-controller-north-section">
          <div className="container-fluid">
            <h2 className="section-title">STATE CO-ORDINATOR<br />CONTROLLER (NORTH REGION)</h2>
            <p className="state-controller-north-intro">
              (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)
            </p>

            {/* State Co-ordinator Controller Voucher (North) */}
            <div className="state-controller-north-voucher-section">
              <h3 className="state-controller-north-voucher-title">State Co-ordinator Controller Voucher<br />(North)</h3>
              <div className="state-controller-north-voucher-content">
                <div className="state-controller-north-voucher-image">
                  <img src="/assets/statecoordinatorvoucher1.png" alt="State Co-ordinator Controller Voucher (North)" className="state-controller-north-voucher-img" />
                </div>
                <div className="state-controller-north-voucher-text">
                  <p>Introducing the State Co-ordinator Controller Voucher (north) designed to ease the financial burden of office stationery, office furniture's & State Co-ordinator Controller (north) Voucher fee can be uploaded can avail 100% reimbursement.</p>
                </div>
              </div>
            </div>

            {/* Rental Voucher for State Co-ordinator Controller (North) */}
            <div className="state-controller-north-voucher-section">
              <h3 className="state-controller-north-voucher-title">Rental Voucher</h3>
              <div className="state-controller-north-voucher-content">
                <div className="state-controller-north-voucher-image">
                  <img src="/assets/customer2.png" alt="State Controller North Rental Voucher" className="state-controller-north-voucher-img" />
                </div>
                <div className="state-controller-north-voucher-text">
                  <p>Introducing the Rental Voucher, designed to ease the financial burden of renting spaces. With this voucher, can upload rental bills of offices, securing a remarkable 100% reimbursement. this initiative ensures that every penny spent on renting is fully supported, providing businesses with financial relief and peace of mind. From to establishing a thriving business location, the Rental Voucher empowers users to pursue their goals without worrying about rental expenses. With this support in place, the journey towards finding the ideal rental property becomes more accessible and rewarding, fostering a sense of stability and prosperity</p>
                </div>
              </div>
            </div>

            {/* Salary Voucher for State Co-ordinator Controller (North) */}
            <div className="state-controller-north-voucher-section">
              <h3 className="state-controller-north-voucher-title">Salary Voucher</h3>
              <div className="state-controller-north-voucher-content">
                <div className="state-controller-north-voucher-image">
                  <img src="/assets/salaryvoucher.png" alt="State Controller North Salary Voucher" className="state-controller-north-voucher-img" />
                </div>
                <div className="state-controller-north-voucher-text">
                  <p>Introducing the Salary Voucher, With this voucher, can streamline their salary reimbursement process by simply uploading their salary bills (not for salary slip) and receiving a remarkable 100% reimbursement. Whether it's compensating employees for their hard work or maintaining operational efficiency, this initiative ensures that every penny spent on salaries is fully supported. By alleviating financial concerns related to payroll, the Salary Voucher empowers businesses to focus on growth and success, fostering a productive and motivated workforce. With this support in place, the journey towards becomes more manageable and rewarding for both employers and employees alike</p>
                </div>
              </div>
            </div>

            {/* Fuel Voucher for State Co-ordinator Controller (North) */}
            <div className="state-controller-north-voucher-section">
              <h3 className="state-controller-north-voucher-title">Fuel Voucher</h3>
              <div className="state-controller-north-voucher-content">
                <div className="state-controller-north-voucher-image">
                  <img src="/assets/Fuel-Voucher.png" alt="State Controller North Fuel Voucher" className="state-controller-north-voucher-img" />
                </div>
                <div className="state-controller-north-voucher-text">
                  <p>Introducing the Fuel Voucher, designed exclusively for covering fuel expenses! This voucher offers a streamlined solution to manage their petrol, diesel, purchases. By simply uploading their fuel purchase bills, can secure a remarkable 100% reimbursement, ensuring that expense incurred on fuel is fully supported. the Fuel Voucher provides financial relief and peace of mind, allowing to focus on their activities without worrying about rising fuel costs. With this initiative, the burden of fuel expenses is significantly alleviated, empowering to navigate their journeys with efficiency and confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* District Co-ordinator Controller Section */}
        <div className="cash-district-controller-section">
          <div className="container-fluid">
            <h2 className="section-title">DISTRICT CO-ORDINATOR<br />CONTROLLER</h2>
            <p className="district-controller-intro">
              (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)
            </p>

            {/* District Co-ordinator Controller Voucher */}
            <div className="district-controller-voucher-section">
              <h3 className="district-controller-voucher-title">District Co-ordinator Controller Voucher</h3>
              <div className="district-controller-voucher-content">
                <div className="district-controller-voucher-image">
                  <img src="/assets/districtvoucher.png" alt="District Co-ordinator Controller Voucher" className="district-controller-voucher-img" />
                </div>
                <div className="district-controller-voucher-text">
                  <p>Introducing the District Co-ordinator Controller Voucher designed to ease the financial burden of office stationery, office furniture's & District Co-ordinator Controller Voucher fee can be uploaded can avail 100% reimbursement.</p>
                </div>
              </div>
            </div>

            {/* Rental Voucher for District Co-ordinator Controller */}
            <div className="district-controller-voucher-section">
              <h3 className="district-controller-voucher-title">Rental Voucher</h3>
              <div className="district-controller-voucher-content">
                <div className="district-controller-voucher-image">
                  <img src="/assets/customer2.png" alt="District Controller Rental Voucher" className="district-controller-voucher-img" />
                </div>
                <div className="district-controller-voucher-text">
                  <p>Introducing the Rental Voucher, designed to ease the financial burden of renting spaces. With this voucher, can upload rental bills of offices, securing a remarkable 100% reimbursement. this initiative ensures that every penny spent on renting is fully supported, providing businesses with financial relief and peace of mind. From to establishing a thriving business location, the Rental Voucher empowers users to pursue their goals without worrying about rental expenses. With this support in place, the journey towards finding the ideal rental property becomes more accessible and rewarding, fostering a sense of stability and prosperity</p>
                </div>
              </div>
            </div>

            {/* Salary Voucher for District Co-ordinator Controller */}
            <div className="district-controller-voucher-section">
              <h3 className="district-controller-voucher-title">Salary Voucher</h3>
              <div className="district-controller-voucher-content">
                <div className="district-controller-voucher-image">
                  <img src="/assets/salaryvoucher.png" alt="District Controller Salary Voucher" className="district-controller-voucher-img" />
                </div>
                <div className="district-controller-voucher-text">
                  <p>Introducing the Salary Voucher, With this voucher, can streamline their salary reimbursement process by simply uploading their salary bills (not for salary slip) and receiving a remarkable 100% reimbursement. Whether it's compensating employees for their hard work or maintaining operational efficiency, this initiative ensures that every penny spent on salaries is fully supported. By alleviating financial concerns related to payroll, the Salary Voucher empowers businesses to focus on growth and success, fostering a productive and motivated workforce. With this support in place, the journey towards becomes more manageable and rewarding for both employers and employees alike</p>
                </div>
              </div>
            </div>

            {/* Fuel Voucher for District Co-ordinator Controller */}
            <div className="district-controller-voucher-section">
              <h3 className="district-controller-voucher-title">Fuel Voucher</h3>
              <div className="district-controller-voucher-content">
                <div className="district-controller-voucher-image">
                  <img src="/assets/Fuel-Voucher.png" alt="District Controller Fuel Voucher" className="district-controller-voucher-img" />
                </div>
                <div className="district-controller-voucher-text">
                  <p>Introducing the Fuel Voucher, designed exclusively for covering fuel expenses! This voucher offers a streamlined solution to manage their petrol, diesel, purchases. By simply uploading their fuel purchase bills, can secure a remarkable 100% reimbursement, ensuring that expense incurred on fuel is fully supported. the Fuel Voucher provides financial relief and peace of mind, allowing to focus on their activities without worrying about rising fuel costs. With this initiative, the burden of fuel expenses is significantly alleviated, empowering to navigate their journeys with efficiency and confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* District Controller GIF Section */}
        <div className="district-controller-gif-section">
          <div className="container-fluid">
            <div className="district-controller-gif-container">
              <img src="/assets/thumb-up.gif" alt="District Controller Animation" className="district-controller-gif" />
            </div>
          </div>
        </div>

        {/* Zonal Co-ordinator Controller Section */}
        <div className="cash-zonal-controller-section">
          <div className="container-fluid">
            <h2 className="section-title">ZONAL CO-ORDINATOR<br />CONTROLLER</h2>
            <p className="zonal-controller-intro">
              (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)
            </p>

            {/* Zonal Co-ordinator Controller Voucher */}
            <div className="zonal-controller-voucher-section">
              <h3 className="zonal-controller-voucher-title">Zonal Co-ordinator Controller Voucher</h3>
              <div className="zonal-controller-voucher-content">
                <div className="zonal-controller-voucher-image">
                  <img src="/assets/zonalvoucher1.png" alt="Zonal Co-ordinator Controller Voucher" className="zonal-controller-voucher-img" />
                </div>
                <div className="zonal-controller-voucher-text">
                  <p>Introducing the Zonal Co-ordinator Controller Voucher designed to ease the financial burden of office stationery, office furniture's & Zonal Co-ordinator Controller Voucher fee can be uploaded can avail 100% reimbursement.</p>
                </div>
              </div>
            </div>

            {/* Salary Voucher for Zonal Co-ordinator Controller */}
            <div className="zonal-controller-voucher-section">
              <h3 className="zonal-controller-voucher-title">Salary Voucher</h3>
              <div className="zonal-controller-voucher-content">
                <div className="zonal-controller-voucher-image">
                  <img src="/assets/salaryvoucher.png" alt="Zonal Controller Salary Voucher" className="zonal-controller-voucher-img" />
                </div>
                <div className="zonal-controller-voucher-text">
                  <p>Introducing the Salary Voucher, With this voucher, can streamline their salary reimbursement process by simply uploading their salary bills (not for salary slip) and receiving a remarkable 100% reimbursement. Whether it's compensating employees for their hard work or maintaining operational efficiency, this initiative ensures that every penny spent on salaries is fully supported. By alleviating financial concerns related to payroll, the Salary Voucher empowers businesses to focus on growth and success, fostering a productive and motivated workforce. With this support in place, the journey towards becomes more manageable and rewarding for both employers and employees alike</p>
                </div>
              </div>
            </div>

            {/* Fuel Voucher for Zonal Co-ordinator Controller */}
            <div className="zonal-controller-voucher-section">
              <h3 className="zonal-controller-voucher-title">Fuel Voucher</h3>
              <div className="zonal-controller-voucher-content">
                <div className="zonal-controller-voucher-image">
                  <img src="/assets/Fuel-Voucher.png" alt="Zonal Controller Fuel Voucher" className="zonal-controller-voucher-img" />
                </div>
                <div className="zonal-controller-voucher-text">
                  <p>Introducing the Fuel Voucher, designed exclusively for covering fuel expenses! This voucher offers a streamlined solution to manage their petrol, diesel, purchases. By simply uploading their fuel purchase bills, can secure a remarkable 100% reimbursement, ensuring that expense incurred on fuel is fully supported. the Fuel Voucher provides financial relief and peace of mind, allowing to focus on their activities without worrying about rising fuel costs. With this initiative, the burden of fuel expenses is significantly alleviated, empowering to navigate their journeys with efficiency and confidence</p>
                </div>
              </div>
            </div>

            {/* Rental Voucher for Zonal Co-ordinator Controller */}
            <div className="zonal-controller-voucher-section">
              <h3 className="zonal-controller-voucher-title">Rental Voucher</h3>
              <div className="zonal-controller-voucher-content">
                <div className="zonal-controller-voucher-image">
                  <img src="/assets/customer2.png" alt="Zonal Controller Rental Voucher" className="zonal-controller-voucher-img" />
                </div>
                <div className="zonal-controller-voucher-text">
                  <p>Introducing the Rental Voucher, designed to ease the financial burden of renting spaces. With this voucher, can upload rental bills of offices, securing a remarkable 100% reimbursement. this initiative ensures that every penny spent on renting is fully supported, providing businesses with financial relief and peace of mind. From to establishing a thriving business location, the Rental Voucher empowers users to pursue their goals without worrying about rental expenses. With this support in place, the journey towards finding the ideal rental property becomes more accessible and rewarding, fostering a sense of stability and prosperity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Head South Section */}
        <div className="cash-regional-head-south-section">
          <div className="container-fluid">
            <h2 className="section-title">REGIONAL HEAD (SOUTH REGION)</h2>
            <p className="regional-head-south-intro">
              (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)
            </p>

            {/* Regional Head South Voucher */}
            <div className="regional-head-south-voucher-section">
              <h3 className="regional-head-south-voucher-title">Regional Head (South Region) Voucher</h3>
              <div className="regional-head-south-voucher-content">
                <div className="regional-head-south-voucher-image">
                  <img src="/assets/regionalvoucher.png" alt="Regional Head South Voucher" className="regional-head-south-voucher-img" />
                </div>
                <div className="regional-head-south-voucher-text">
                  <p>Introducing the Regional head Voucher (south) designed to ease the financial burden of office stationery, office furniture's & Regional head Voucher fee can be uploaded can avail 100% reimbursement.</p>
                </div>
              </div>
            </div>

            {/* Salary Voucher for Regional Head South */}
            <div className="regional-head-south-voucher-section">
              <h3 className="regional-head-south-voucher-title">Salary Voucher</h3>
              <div className="regional-head-south-voucher-content">
                <div className="regional-head-south-voucher-image">
                  <img src="/assets/salaryvoucher.png" alt="Regional Head South Salary Voucher" className="regional-head-south-voucher-img" />
                </div>
                <div className="regional-head-south-voucher-text">
                  <p>Introducing the Salary Voucher, With this voucher, can streamline their salary reimbursement process by simply uploading their salary bills (not for salary slip) and receiving a remarkable 100% reimbursement. Whether it's compensating employees for their hard work or maintaining operational efficiency, this initiative ensures that every penny spent on salaries is fully supported. By alleviating financial concerns related to payroll, the Salary Voucher empowers businesses to focus on growth and success, fostering a productive and motivated workforce. With this support in place, the journey towards becomes more manageable and rewarding for both employers and employees alike</p>
                </div>
              </div>
            </div>

            {/* Fuel Voucher for Regional Head South */}
            <div className="regional-head-south-voucher-section">
              <h3 className="regional-head-south-voucher-title">Fuel Voucher</h3>
              <div className="regional-head-south-voucher-content">
                <div className="regional-head-south-voucher-image">
                  <img src="/assets/Fuel-Voucher.png" alt="Regional Head South Fuel Voucher" className="regional-head-south-voucher-img" />
                </div>
                <div className="regional-head-south-voucher-text">
                  <p>Introducing the Fuel Voucher, designed exclusively for covering fuel expenses! This voucher offers a streamlined solution to manage their petrol, diesel, purchases. By simply uploading their fuel purchase bills, can secure a remarkable 100% reimbursement, ensuring that expense incurred on fuel is fully supported. the Fuel Voucher provides financial relief and peace of mind, allowing to focus on their activities without worrying about rising fuel costs. With this initiative, the burden of fuel expenses is significantly alleviated, empowering to navigate their journeys with efficiency and confidence</p>
                </div>
              </div>
            </div>

            {/* Rental Voucher for Regional Head South */}
            <div className="regional-head-south-voucher-section">
              <h3 className="regional-head-south-voucher-title">Rental Voucher</h3>
              <div className="regional-head-south-voucher-content">
                <div className="regional-head-south-voucher-image">
                  <img src="/assets/customer2.png" alt="Regional Head South Rental Voucher" className="regional-head-south-voucher-img" />
                </div>
                <div className="regional-head-south-voucher-text">
                  <p>Introducing the Rental Voucher, designed to ease the financial burden of renting spaces. With this voucher, can upload rental bills of offices, securing a remarkable 100% reimbursement. this initiative ensures that every penny spent on renting is fully supported, providing businesses with financial relief and peace of mind. From to establishing a thriving business location, the Rental Voucher empowers users to pursue their goals without worrying about rental expenses. With this support in place, the journey towards finding the ideal rental property becomes more accessible and rewarding, fostering a sense of stability and prosperity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Head North Section */}
        <div className="cash-regional-head-north-section">
          <div className="container-fluid">
            <h2 className="section-title">REGIONAL HEAD (NORTH REGION)</h2>
            <p className="regional-head-north-intro">
              (Only printed GST cash bill can be uploaded for all Cash vapase vouchers)
            </p>

            {/* Regional Head North Voucher */}
            <div className="regional-head-north-voucher-section">
              <h3 className="regional-head-north-voucher-title">Regional Head (North Region) Voucher</h3>
              <div className="regional-head-north-voucher-content">
                <div className="regional-head-north-voucher-image">
                  <img src="/assets/regionalvoucher.png" alt="Regional Head North Voucher" className="regional-head-north-voucher-img" />
                </div>
                <div className="regional-head-north-voucher-text">
                  <p>Introducing the Regional head Voucher (north) designed to ease the financial burden of office stationery, office furniture's & Regional head Voucher fee can be uploaded can avail 100% reimbursement.</p>
                </div>
              </div>
            </div>

            {/* Salary Voucher for Regional Head North */}
            <div className="regional-head-north-voucher-section">
              <h3 className="regional-head-north-voucher-title">Salary Voucher</h3>
              <div className="regional-head-north-voucher-content">
                <div className="regional-head-north-voucher-image">
                  <img src="/assets/salaryvoucher.png" alt="Regional Head North Salary Voucher" className="regional-head-north-voucher-img" />
                </div>
                <div className="regional-head-north-voucher-text">
                  <p>Introducing the Salary Voucher, With this voucher, can streamline their salary reimbursement process by simply uploading their salary bills (not for salary slip) and receiving a remarkable 100% reimbursement. Whether it's compensating employees for their hard work or maintaining operational efficiency, this initiative ensures that every penny spent on salaries is fully supported. By alleviating financial concerns related to payroll, the Salary Voucher empowers businesses to focus on growth and success, fostering a productive and motivated workforce. With this support in place, the journey towards becomes more manageable and rewarding for both employers and employees alike</p>
                </div>
              </div>
            </div>

            {/* Fuel Voucher for Regional Head North */}
            <div className="regional-head-north-voucher-section">
              <h3 className="regional-head-north-voucher-title">Fuel Voucher</h3>
              <div className="regional-head-north-voucher-content">
                <div className="regional-head-north-voucher-image">
                  <img src="/assets/Fuel-Voucher.png" alt="Regional Head North Fuel Voucher" className="regional-head-north-voucher-img" />
                </div>
                <div className="regional-head-north-voucher-text">
                  <p>Introducing the Fuel Voucher, designed exclusively for covering fuel expenses! This voucher offers a streamlined solution to manage their petrol, diesel, purchases. By simply uploading their fuel purchase bills, can secure a remarkable 100% reimbursement, ensuring that expense incurred on fuel is fully supported. the Fuel Voucher provides financial relief and peace of mind, allowing to focus on their activities without worrying about rising fuel costs. With this initiative, the burden of fuel expenses is significantly alleviated, empowering to navigate their journeys with efficiency and confidence</p>
                </div>
              </div>
            </div>

            {/* Rental Voucher for Regional Head North */}
            <div className="regional-head-north-voucher-section">
              <h3 className="regional-head-north-voucher-title">Rental Voucher</h3>
              <div className="regional-head-north-voucher-content">
                <div className="regional-head-north-voucher-image">
                  <img src="/assets/customer2.png" alt="Regional Head North Rental Voucher" className="regional-head-north-voucher-img" />
                </div>
                <div className="regional-head-north-voucher-text">
                  <p>Introducing the Rental Voucher, designed to ease the financial burden of renting spaces. With this voucher, can upload rental bills of offices, securing a remarkable 100% reimbursement. this initiative ensures that every penny spent on renting is fully supported, providing businesses with financial relief and peace of mind. From to establishing a thriving business location, the Rental Voucher empowers users to pursue their goals without worrying about rental expenses. With this support in place, the journey towards finding the ideal rental property becomes more accessible and rewarding, fostering a sense of stability and prosperity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Vouchers Gallery Section */}
        <div className="cash-all-vouchers-gallery-section">
          <div className="container-fluid">
            <h2 className="section-title">ALL VOUCHERS GALLERY</h2>
            <p className="vouchers-gallery-intro">
              Explore our comprehensive collection of Cash Vapase vouchers designed for every organizational level and purpose
            </p>
            
            <div className="vouchers-gallery-grid">
              <div className="voucher-gallery-item">
                <img src="/assets/salaryvoucher.png" alt="Salary Voucher" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Salary Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/regionalvoucher.png" alt="Regional Voucher" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Regional Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/customer1.png" alt="Customer Voucher 1" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Grocery Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/customer2.png" alt="Customer Voucher 2" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Rental Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/customer3.png" alt="Customer Voucher 3" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Health Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/customer5.png" alt="Customer Voucher 5" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Gold Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/customer4.png" alt="Customer Voucher 4" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Education Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/customer6.png" alt="Customer Voucher 6" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Builders Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/customer8.png" alt="Customer Voucher 8" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Tourisum Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/customer7.png" alt="Customer Voucher 7" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Farmers Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/customer9.png" alt="Customer Voucher 9" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Franchise Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/customer10.png" alt="Customer Voucher 10" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Travel Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/customer11.png" alt="Customer Voucher 11" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Vehicle Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/districtvoucher.png" alt="District Voucher" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">District Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/Fuel-Voucher.png" alt="Fuel Voucher" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Fuel Voucher</div>
              </div>
              
              <div className="voucher-gallery-item">
                <img src="/assets/outletvoucher.png" alt="Outlet Voucher" className="voucher-gallery-img" />
                <div className="voucher-gallery-title">Outlet Voucher</div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="cash-coming-soon-section">
          <div className="container-fluid">
            <h2 className="section-title">Cash Vapase</h2>
            <h3 className="coming-soon-subtitle">
              Your Path to Financial Freedom<br />
              <span className="coming-soon-tag">#Coming Soon</span>
            </h3>
            <div className="coming-soon-gif-container">
              <img 
                src="/assets/Thanks.gif" 
                alt="Cash Vapase Coming Soon Animation" 
                className="coming-soon-gif"
              />
            </div>
          </div>
        </div>

        {/* GST Requirement Highlight Section */}
        <div className="cash-gst-requirement-section">
          <div className="container-fluid">
            <div className="gst-requirement-banner">
              <div className="gst-banner-icon">📄</div>
              <div className="gst-banner-content">
                <h3>GST Bills Mandatory</h3>
                <p>All Cash Vapase vouchers require printed GST cash bills for validation and reimbursement. Non-GST bills will not be accepted under any voucher category.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="cash-faq-section">
          <div className="container-fluid">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-container">
              <div className="faq-item">
                <div 
                  className={`faq-question ${expandedFAQ === 0 ? 'active' : ''}`}
                  onClick={() => toggleFAQ(0)}
                >
                  <span>What is the Voucher Queue Bill Reimbursement System?</span>
                  <span className="faq-toggle">{expandedFAQ === 0 ? '−' : '+'}</span>
                </div>
                {expandedFAQ === 0 && (
                  <div className="faq-answer">
                    <p>
                      It's a revolutionary system where users upload their expense bills, and when the collective total 
                      reaches Rs.50,000, the first voucher in the queue gets 100% reimbursement from company profits.
                    </p>
                  </div>
                )}
              </div>

              <div className="faq-item">
                <div 
                  className={`faq-question ${expandedFAQ === 1 ? 'active' : ''}`}
                  onClick={() => toggleFAQ(1)}
                >
                  <span>How does the queue system work?</span>
                  <span className="faq-toggle">{expandedFAQ === 1 ? '−' : '+'}</span>
                </div>
                {expandedFAQ === 1 && (
                  <div className="faq-answer">
                    <p>
                      Bills are processed in a first-come, first-served basis. When you upload a bill, it enters the queue. 
                      As more users across India upload bills and the total reaches Rs.50,000, the first bill in the queue gets reimbursed.
                    </p>
                  </div>
                )}
              </div>

              <div className="faq-item">
                <div 
                  className={`faq-question ${expandedFAQ === 2 ? 'active' : ''}`}
                  onClick={() => toggleFAQ(2)}
                >
                  <span>When will Cash Vapase be available?</span>
                  <span className="faq-toggle">{expandedFAQ === 2 ? '−' : '+'}</span>
                </div>
                {expandedFAQ === 2 && (
                  <div className="faq-answer">
                    <p>
                      Cash Vapase is currently in development. Stay tuned for our official launch announcement. 
                      We're working hard to bring this game-changing solution to market soon.
                    </p>
                  </div>
                )}
              </div>

                <div className="faq-item">
                <div 
                  className={`faq-question ${expandedFAQ === 3 ? 'active' : ''}`}
                  onClick={() => toggleFAQ(3)}
                >
                  <span>What types of bills can I upload?</span>
                  <span className="faq-toggle">{expandedFAQ === 3 ? '−' : '+'}</span>
                </div>
                {expandedFAQ === 3 && (
                  <div className="faq-answer">
                    <p>
                      You can upload various everyday expense bills including groceries, utilities, dining, shopping, 
                      transportation, and other legitimate purchase receipts through our mobile application.
                    </p>
                    <p><strong>Important:</strong> Only printed GST cash bills are accepted. Bills without GST will not be eligible for reimbursement through any Cash Vapase voucher.</p>
                  </div>
                )}
              </div>

              <div className="faq-item">
                <div 
                  className={`faq-question ${expandedFAQ === 4 ? 'active' : ''}`}
                  onClick={() => toggleFAQ(4)}
                >
                  <span>Why are only GST bills accepted?</span>
                  <span className="faq-toggle">{expandedFAQ === 4 ? '−' : '+'}</span>
                </div>
                {expandedFAQ === 4 && (
                  <div className="faq-answer">
                    <p>
                      GST bills ensure proper documentation and compliance with tax regulations. They provide verified proof of purchase 
                      and help maintain the integrity of our reimbursement system. All Cash Vapase vouchers require GST bills for validation.
                    </p>
                    <p><strong>Note:</strong> Non-GST bills, handwritten receipts, or bills without proper GST details will be automatically rejected.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

  
      </div>
    </div>
  );
};

export default CashVapase;
