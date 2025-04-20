const API_URL = process.env.REACT_APP_API_URL || 'YOUR_API_GATEWAY_URL';

export const api = {
    async createBooking(bookingData: any) {
        console.log('Sending booking data:', bookingData);
        console.log('API URL:', API_URL);
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'createBooking',
                    data: bookingData
                })
            });
            const result = await response.json();
            console.log('API Response:', result);
            return result;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async getBookings() {
        console.log('Fetching bookings from:', API_URL);
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'getBookings'
                })
            });
            const result = await response.json();
            console.log('Get Bookings Response:', result);
            return result;
        } catch (error) {
            console.error('Get Bookings Error:', error);
            throw error;
        }
    },

    async getBooking(id: string) {
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'getBooking',
                    data: { id }
                })
            });
            return response.json();
        } catch (error) {
            console.error('Get Booking Error:', error);
            throw error;
        }
    }
}; 