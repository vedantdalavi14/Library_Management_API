// Utility functions
export const Utils = {
    // Parse JWT token
    parseJwt: (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    },

    // Format date
    formatDate: (dateString) => {
        return new Date(dateString).toLocaleDateString();
    },

    // Validate form fields
    validateFormFields: (fields) => {
        return Object.values(fields).every(field => field && field.trim() !== '');
    }
};
