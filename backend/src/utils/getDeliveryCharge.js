const axios = require("axios");

const deliveryPriceInfo = [
    { range: "0-5", price: 5 },
    { range: "5-10", price: 7 },
    { range: "10-20", price: 9 },
    { range: "20-2000", price: 10 }
];

/**
 * Get delivery charge based on shop and user location using Google Maps API
 * @param {Object} origin - { lat, long }
 * @param {Object} destination - { lat, long }
 * @param {String} apiKey - Google Maps API key
 * @returns {Object} { distanceKm, durationText, deliveryCharge }
 */
const getDeliveryCharge = async (origin, destination, apiKey) => {
    try {
        const url = "https://maps.googleapis.com/maps/api/distancematrix/json";
        const params = {
            origins: `${origin.lat},${origin.long}`,
            destinations: `${destination.lat},${destination.long}`,
            key: apiKey,
        };

        const response = await axios.get(url, { params });
        const data = response.data;

        if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
            const element = data.rows[0].elements[0];
            const distanceMeters = element.distance.value;
            const distanceKm = distanceMeters / 1000;
            const durationText = element.duration.text;

            let deliveryCharge = 10; // default
            for (const rangeObj of deliveryPriceInfo) {
                const [min, max] = rangeObj.range.split("-").map(Number);
                if (distanceKm >= min && distanceKm < max) {
                    deliveryCharge = rangeObj.price;
                    break;
                }
            }

            return {
                distanceKm: Number(distanceKm.toFixed(2)),
                durationText,
                deliveryCharge
            };
        } else {
            return {
                distanceKm: 0,
                durationText: "N/A",
                deliveryCharge: 10
            };
        }
    } catch (err) {
        console.error("Google Maps API error:", err.message);
        return {
            distanceKm: 0,
            durationText: "N/A",
            deliveryCharge: 10
        };
    }
};

module.exports = getDeliveryCharge;
