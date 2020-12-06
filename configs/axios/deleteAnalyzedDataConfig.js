let deleteAnalyzedDataConfig = (uploadedPetImageId) => ({
    method: 'delete',
    url: `https://api.thecatapi.com/v1/images/${uploadedPetImageId}`,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': '3e7910c0-0e2f-4a59-8851-4b440fd9a0ea'
    },
    data: ''
})

module.exports = deleteAnalyzedDataConfig