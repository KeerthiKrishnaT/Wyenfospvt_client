// Simple event system for branch updates
class BranchEventEmitter {
  constructor() {
    this.listeners = [];
  }

  // Subscribe to branch updates
  subscribe(callback) {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Emit branch update event
  emit() {
    this.listeners.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error in branch event listener:', error);
      }
    });
  }
}

export const branchEvents = new BranchEventEmitter();
