import { branchService } from './firebaseService';

// Utility to load branches for public components like Footer
export const loadBranchesForPublic = async () => {
  try {
    // First try to get from localStorage
    const cachedBranches = localStorage.getItem('wyenfos_branches');
    if (cachedBranches) {
      const branches = JSON.parse(cachedBranches);
      if (branches.length > 0) {
        return branches;
      }
    }

    // If no cached data, fetch from Firebase
    console.log('Loading branches from Firebase...');
    const branches = await branchService.getBranches();
    
    // Cache the data for future use
    localStorage.setItem('wyenfos_branches', JSON.stringify(branches));
    
    return branches;
  } catch (error) {
    console.error('Error loading branches:', error);
    
    // If Firebase fails, return cached data or empty array
    const cachedBranches = localStorage.getItem('wyenfos_branches');
    if (cachedBranches) {
      return JSON.parse(cachedBranches);
    }
    
    return [];
  }
};

// Function to refresh branch data
export const refreshBranches = async () => {
  try {
    const branches = await branchService.getBranches();
    localStorage.setItem('wyenfos_branches', JSON.stringify(branches));
    return branches;
  } catch (error) {
    console.error('Error refreshing branches:', error);
    return [];
  }
};
