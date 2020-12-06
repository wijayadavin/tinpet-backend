let petUploadConfig = (data) => ({
    method: 'post',
    url: 'https://api.thecatapi.com/v1/images/upload',
    headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key': '3e7910c0-0e2f-4a59-8851-4b440fd9a0ea',
        ...data.getHeaders()
    },
    data: data
})

module.exports = petUploadConfig