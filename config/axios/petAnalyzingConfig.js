let petAnalyzingConfig = (uploadedPetImageId) => ({
    method: 'get',
    url: `https://api.thecatapi.com/v1/images/${uploadedPetImageId}/analysis`,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'DEMO-API-KEY'
    }
})

module.exports = petAnalyzingConfig