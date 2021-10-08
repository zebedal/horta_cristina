import axios from "axios"

export const uploadImageCloudinary = async (selectedImage) => {
    let newImgUrl

    //upload image to cloudinary
    if (selectedImage && selectedImage.length > 0) {

        const formData = new FormData()
        formData.append('file', selectedImage[0].originFileObj)
        formData.append('upload_preset', "hyki21aw")
        formData.append('folder', "produtos")


        try {
            const imgUploadResponse = await axios.post(process.env.cloudinaryUrl, formData)
            newImgUrl = imgUploadResponse.data.url
            return newImgUrl
        } catch (e) {
           return message.error('Ocorreu em erro no carregamento da imagem', e.message)
        }

    } else return false
}

export  const isToday = (someDate) => {
    
    const today = new Date()
   
    return someDate.getDate() == today.getDate() 
  }