const { auth } = require('../config/firebase');
require('dotenv').config();

const setupAdminUser = async () => {
  try {
    const adminEmail = 'admin@wyenfos.com';
    const adminPassword = 'WyenfosAdmin@2024';
    
    console.log('🔧 Setting up admin user in Firebase Auth...');
    
    // Check if user already exists
    try {
      const existingUser = await auth.getUserByEmail(adminEmail);
      console.log('✅ Admin user already exists:', existingUser.uid);
      console.log('📧 Email:', existingUser.email);
      console.log('👤 Display Name:', existingUser.displayName);
      console.log('🕐 Created:', existingUser.metadata.creationTime);
      return;
    } catch (error) {
      if (error.code !== 'auth/user-not-found') {
        throw error;
      }
    }
    
    // Create the admin user
    const userRecord = await auth.createUser({
      email: adminEmail,
      password: adminPassword,
      displayName: 'Wyenfos Admin',
      emailVerified: true
    });
    
    // Set custom claims for admin role
    await auth.setCustomUserClaims(userRecord.uid, {
      role: 'admin',
      isAdmin: true
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('🆔 UID:', userRecord.uid);
    console.log('📧 Email:', userRecord.email);
    console.log('👤 Display Name:', userRecord.displayName);
    console.log('🔐 Password:', adminPassword);
    console.log('');
    console.log('🎯 You can now use these credentials to login:');
    console.log('   Email:', adminEmail);
    console.log('   Password:', adminPassword);
    
  } catch (error) {
    console.error('❌ Error setting up admin user:', error);
    
    if (error.code === 'app/invalid-credential') {
      console.log('');
      console.log('⚠️  Firebase credentials not configured properly.');
      console.log('   Please check your .env file and Firebase configuration.');
      console.log('   The system will run in demo mode without Firebase Auth.');
    }
  }
};

// Run the setup
setupAdminUser();
