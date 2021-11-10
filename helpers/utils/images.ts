import axios from "axios";

export const getImagesFilesFromUrl = async (imagesUrl: string[]): Promise<File[]> => {
    const imagesFiles: File[] = [];
    console.log("IMAGES URLS IN FUNCTION: ", imagesUrl);
    try {
        for (let imageUrl of imagesUrl) {
            const res = await axios({
                method: "GET",
                url: imageUrl,
                responseType: "blob",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            var fileName = imageUrl.split("/")[imageUrl.split("/").length - 1].split("?")[0];

            var imageFile = new File([res.data], fileName, { type: res.data.type });
            imageFile = Object.assign(imageFile, {
                preview: URL.createObjectURL(res.data),
                url: URL.createObjectURL(res.data),
            });
            // imageFile.url = imageFile.preview;
            imagesFiles.push(imageFile);
        }
    } catch (error) {
        console.log(error);
    }

    return imagesFiles;
};
