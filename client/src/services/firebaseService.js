import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../config/firebase';

// Contact Messages Service
export const contactService = {
  // Add new contact message
  async addContactMessage(contactData) {
    try {
      const docRef = await addDoc(collection(db, 'contactMessages'), {
        ...contactData,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      return { id: docRef.id, success: true };
    } catch (error) {
      console.error('Error adding contact message:', error);
      throw error;
    }
  },

  // Get all contact messages
  async getContactMessages() {
    try {
      const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting contact messages:', error);
      throw error;
    }
  },

  // Update contact message status
  async updateContactStatus(messageId, status) {
    try {
      const messageRef = doc(db, 'contactMessages', messageId);
      await updateDoc(messageRef, { status });
      return { success: true };
    } catch (error) {
      console.error('Error updating contact status:', error);
      throw error;
    }
  },

  // Delete contact message
  async deleteContactMessage(messageId) {
    try {
      await deleteDoc(doc(db, 'contactMessages', messageId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting contact message:', error);
      throw error;
    }
  }
};

// Festival Images Service
export const festivalService = {
  // Upload festival image to Firebase Storage - OPTIMIZED with compression
  async uploadFestivalImage(file, festivalData) {
    try {
      // Compress image before upload
      const compressedFile = await this.compressImage(file);
      
      // Create unique filename with optimized extension
      const timestamp = Date.now();
      const optimizedFileName = `festival_${timestamp}_optimized.webp`;
      const storageRef = ref(storage, `festival-images/${optimizedFileName}`);
      
      // Upload compressed file
      const snapshot = await uploadBytes(storageRef, compressedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Save metadata to Firestore with optimization info
      const docRef = await addDoc(collection(db, 'festivalImages'), {
        ...festivalData,
        imageUrl: downloadURL,
        fileName: optimizedFileName,
        originalFileName: file.name,
        originalSize: file.size,
        compressedSize: compressedFile.size,
        compressionRatio: Math.round((1 - compressedFile.size / file.size) * 100),
        uploadedAt: serverTimestamp(),
        isActive: true
      });
      
      return { 
        id: docRef.id, 
        imageUrl: downloadURL, 
        success: true,
        compressionRatio: Math.round((1 - compressedFile.size / file.size) * 100)
      };
    } catch (error) {
      console.error('Error uploading festival image:', error);
      throw error;
    }
  },

  // Enhanced image compression for better performance
  async compressImage(file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Enhanced image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        // Try WebP first, fallback to JPEG
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              // Fallback to JPEG if WebP fails
              canvas.toBlob(resolve, 'image/jpeg', quality);
            }
          },
          'image/webp',
          quality
        );
      };
      
      img.onerror = () => {
        // Fallback: return original file if compression fails
        resolve(file);
      };
      
      img.src = URL.createObjectURL(file);
    });
  },

  // Get all festival images - FIXED to avoid composite index requirement
  async getFestivalImages() {
    try {
      // Simplified query to avoid composite index requirement
      const simpleQuery = query(
        collection(db, 'festivalImages'),
        orderBy('uploadedAt', 'desc')
      );
      const querySnapshot = await getDocs(simpleQuery);
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort by isActive in JavaScript instead of Firestore
      return results.sort((a, b) => {
        if (a.isActive !== b.isActive) {
          return b.isActive - a.isActive; // Active items first
        }
        return 0; // Keep original order for same active status
      });
    } catch (error) {
      console.error('Error getting festival images:', error);
      // Fallback to simple query if optimized query fails
      try {
        const fallbackQuery = query(collection(db, 'festivalImages'));
        const fallbackSnapshot = await getDocs(fallbackQuery);
        return fallbackSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (fallbackError) {
        console.error('Fallback query also failed:', fallbackError);
        throw error;
      }
    }
  },

  // Get only active festival images - FIXED to avoid composite index requirement
  async getActiveFestivalImages() {
    try {
      // Simplified query to avoid composite index requirement
      const q = query(
        collection(db, 'festivalImages'),
        orderBy('uploadedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(img => img.isActive);
      
      // Sort by isActive in JavaScript instead of Firestore
      return results.sort((a, b) => {
        if (a.isActive !== b.isActive) {
          return b.isActive - a.isActive; // Active items first
        }
        return 0; // Keep original order for same active status
      });
    } catch (error) {
      console.error('Error getting active festival images:', error);
      throw error;
    }
  },

  // Update festival image status
  async updateFestivalImageStatus(imageId, isActive) {
    try {
      const imageRef = doc(db, 'festivalImages', imageId);
      await updateDoc(imageRef, { isActive });
      return { success: true };
    } catch (error) {
      console.error('Error updating festival image status:', error);
      throw error;
    }
  },

  // Update festival image metadata (name, description, effect)
  async updateFestivalImageMetadata(imageId, metadata) {
    try {
      const imageRef = doc(db, 'festivalImages', imageId);
      await updateDoc(imageRef, {
        ...metadata,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating festival image metadata:', error);
      throw error;
    }
  },

  // Delete festival image
  async deleteFestivalImage(imageId, fileName) {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'festivalImages', imageId));
      
      // Delete from Storage
      const storageRef = ref(storage, `festival-images/${fileName}`);
      await deleteObject(storageRef);
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting festival image:', error);
      throw error;
    }
  }
};

// Company Data Service
export const companyService = {
  // Add new company
  async addCompany(companyData) {
    try {
      const docRef = await addDoc(collection(db, 'companies'), {
        ...companyData,
        createdAt: serverTimestamp()
      });
      return { id: docRef.id, success: true };
    } catch (error) {
      console.error('Error adding company:', error);
      throw error;
    }
  },

  // Get all companies
  async getCompanies() {
    try {
      const q = query(collection(db, 'companies'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting companies:', error);
      throw error;
    }
  },

  // Update company
  async updateCompany(companyId, companyData) {
    try {
      const companyRef = doc(db, 'companies', companyId);
      await updateDoc(companyRef, {
        ...companyData,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  },

  // Delete company
  async deleteCompany(companyId) {
    try {
      await deleteDoc(doc(db, 'companies', companyId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
    }
  }
};

// Branch Management Service
export const branchService = {
  // Add new branch
  async addBranch(branchData) {
    try {
      const docRef = await addDoc(collection(db, 'branches'), {
        ...branchData,
        createdAt: serverTimestamp()
      });
      return { id: docRef.id, success: true };
    } catch (error) {
      console.error('Error adding branch:', error);
      throw error;
    }
  },

  // Get all branches
  async getBranches() {
    try {
      const q = query(collection(db, 'branches'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting branches:', error);
      throw error;
    }
  },

  // Update branch
  async updateBranch(branchId, branchData) {
    try {
      const branchRef = doc(db, 'branches', branchId);
      await updateDoc(branchRef, {
        ...branchData,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating branch:', error);
      throw error;
    }
  },

  // Delete branch
  async deleteBranch(branchId) {
    try {
      await deleteDoc(doc(db, 'branches', branchId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting branch:', error);
      throw error;
    }
  },

  // Set main branch
  async setMainBranch(branchId) {
    try {
      // First, set all branches to not main
      const branches = await this.getBranches();
      const updatePromises = branches.map(branch => {
        if (branch.isMain) {
          const branchRef = doc(db, 'branches', branch.id);
          return updateDoc(branchRef, { isMain: false });
        }
        return Promise.resolve();
      });
      
      await Promise.all(updatePromises);
      
      // Then set the selected branch as main
      const branchRef = doc(db, 'branches', branchId);
      await updateDoc(branchRef, { isMain: true });
      
      return { success: true };
    } catch (error) {
      console.error('Error setting main branch:', error);
      throw error;
    }
  }
};

// Admin Settings Service
export const adminService = {
  // Get admin settings
  async getAdminSettings() {
    try {
      const q = query(collection(db, 'adminSettings'));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return null;
      }
      return querySnapshot.docs[0].data();
    } catch (error) {
      console.error('Error getting admin settings:', error);
      throw error;
    }
  },

  // Update admin settings
  async updateAdminSettings(settings) {
    try {
      const settingsRef = doc(db, 'adminSettings', 'main');
      await updateDoc(settingsRef, {
        ...settings,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating admin settings:', error);
      throw error;
    }
  }
};

// Utility function to convert Firestore timestamp to readable date
export const formatFirestoreDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  if (timestamp.toDate) {
    return timestamp.toDate().toLocaleString();
  }
  
  return new Date(timestamp).toLocaleString();
};

// Utility function to handle Firebase errors
export const handleFirebaseError = (error) => {
  console.error('Firebase Error:', error);
  
  switch (error.code) {
    case 'permission-denied':
      return 'Permission denied. Please check your authentication.';
    case 'unavailable':
      return 'Service temporarily unavailable. Please try again.';
    case 'storage/object-not-found':
      return 'File not found.';
    case 'storage/unauthorized':
      return 'Unauthorized access to storage.';
    default:
      return 'An error occurred. Please try again.';
  }
};

// Voucher Management Service
export const voucherService = {
  // Add new voucher
  async addVoucher(voucherData) {
    try {
      const docRef = await addDoc(collection(db, 'vouchers'), {
        ...voucherData,
        createdAt: serverTimestamp(),
        status: 'active',
        soldCount: 0
      });
      return { id: docRef.id, success: true };
    } catch (error) {
      console.error('Error adding voucher:', error);
      throw error;
    }
  },

  // Get all vouchers (including inactive for admin)
  async getVouchers() {
    try {
      const q = query(collection(db, 'vouchers'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting vouchers:', error);
      throw error;
    }
  },

  // Update voucher
  async updateVoucher(voucherId, voucherData) {
    try {
      const voucherRef = doc(db, 'vouchers', voucherId);
      await updateDoc(voucherRef, {
        ...voucherData,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating voucher:', error);
      throw error;
    }
  },

  // Delete voucher
  async deleteVoucher(voucherId) {
    try {
      await deleteDoc(doc(db, 'vouchers', voucherId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting voucher:', error);
      throw error;
    }
  },

  // Update voucher status
  async updateVoucherStatus(voucherId, status) {
    try {
      const voucherRef = doc(db, 'vouchers', voucherId);
      await updateDoc(voucherRef, {
        status,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating voucher status:', error);
      throw error;
    }
  }
};
