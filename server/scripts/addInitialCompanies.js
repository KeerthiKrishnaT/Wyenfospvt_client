const { db } = require('../config/firebase');
require('dotenv').config();

const addInitialCompanies = async () => {
  try {
    console.log('🏢 Adding initial companies to Firebase...');
    
    const companies = [
      {
        name: 'Wyenfos Infotech',
        category: 'technology',
        description: 'Leading technology solutions providing software development, web applications, and digital transformation services. Where innovation Meets Excellence!',
        website: 'https://wyenfos.com',
        status: 'active',
        createdAt: new Date()
      },
      {
        name: 'Ayur4Life Herbals',
        category: 'healthcare', 
        description: 'Ayurvedic and herbal products manufacturer focused on natural wellness solutions, traditional medicine and organic health care products for modern living.',
        website: 'https://ayur4life.com',
        status: 'active',
        createdAt: new Date()
      },
      {
        name: 'Wyenfos Pure Drops',
        category: 'healthcare',
        description: 'Pure and natural water solutions provider offering premium quality drinking water, purification systems, and hydration solutions for healthy living.',
        website: 'https://wyenfospuredrops.com',
        status: 'active',
        createdAt: new Date()
      },
      {
        name: 'Cash Vapase',
        category: 'finance',
        description: 'Revolutionary financial services platform providing seamless digital payment services, bill tracking, and financial management tools.',
        website: 'https://cashvapase.com',
        status: 'active',
        createdAt: new Date()
      }
    ];

    for (const company of companies) {
      // Check if company already exists
      const existingCompany = await db.collection('companies')
        .where('name', '==', company.name)
        .get();
      
      if (existingCompany.empty) {
        const docRef = await db.collection('companies').add(company);
        console.log(`✅ Added ${company.name} with ID: ${docRef.id}`);
      } else {
        console.log(`⚠️  ${company.name} already exists, skipping...`);
      }
    }
    
    console.log('🎉 Initial companies setup complete!');
    console.log('📊 You can now view and manage these companies in the admin dashboard.');
    
  } catch (error) {
    console.error('❌ Error adding initial companies:', error);
    
    if (error.code === 'app/invalid-credential') {
      console.log('');
      console.log('⚠️  Firebase credentials not configured properly.');
      console.log('   Please check your .env file and Firebase configuration.');
    }
  }
};

// Run the setup
addInitialCompanies();
