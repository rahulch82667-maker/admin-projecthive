import cloudinary from '../config/cloudinary';
import { UploadApiResponse, UploadApiOptions } from 'cloudinary';

/**
 * Uploads a file to Cloudinary.
 * @param fileData - The file data (URL, local path, or base64 string).
 * @param folder - The folder in Cloudinary to upload to.
 * @param options - Additional Cloudinary upload options.
 * @returns A promise that resolves with the upload result.
 */
export const uploadToCloudinary = async (
  fileData: string,
  folder: string = 'projecthive/projects',
  options: UploadApiOptions = {}
): Promise<UploadApiResponse> => {
  try {
    const result = await cloudinary.uploader.upload(fileData, {
      folder,
      resource_type: 'auto', // Automatically detect image, video, etc.
      ...options,
    });
    return result;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Failed to upload to Cloudinary');
  }
};

/**
 * Deletes a file from Cloudinary.
 * @param publicId - The public ID of the file to delete.
 * @returns A promise that resolves with the deletion result.
 */
export const deleteFromCloudinary = async (publicId: string): Promise<any> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary Deletion Error:', error);
    throw new Error('Failed to delete from Cloudinary');
  }
};
