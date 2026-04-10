import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { Readable } from 'stream'

const FOLDER = 'greathouses'

export function applyTransforms(url: string): string {
  // Insert f_auto,q_auto transform for all Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) return url
  if (url.includes('f_auto')) return url
  return url.replace('/upload/', '/upload/f_auto,q_auto/')
}

export async function uploadFromStream(
  stream: Readable,
  options: {
    folder?: string
    public_id?: string
    tags?: string[]
    resource_type?: 'image' | 'video' | 'raw' | 'auto'
  } = {}
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || FOLDER,
        public_id: options.public_id,
        tags: options.tags,
        resource_type: options.resource_type || 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Upload failed'))
        } else {
          resolve(result)
        }
      }
    )
    stream.pipe(uploadStream)
  })
}

export async function uploadFromBuffer(
  buffer: Buffer,
  options: {
    folder?: string
    public_id?: string
    tags?: string[]
    resource_type?: 'image' | 'video' | 'raw' | 'auto'
  } = {}
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: options.folder || FOLDER,
          public_id: options.public_id,
          tags: options.tags,
          resource_type: options.resource_type || 'image',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Upload failed'))
          } else {
            resolve(result)
          }
        }
      )
      .end(buffer)
  })
}

export async function deleteAsset(publicId: string, resourceType: 'image' | 'video' | 'raw' = 'image') {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}

export function getTransformedUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    crop?: string
    quality?: string | number
    format?: string
  } = {}
): string {
  const transformations: Record<string, string | number>[] = [
    { quality: options.quality ?? 'auto', fetch_format: options.format ?? 'auto' },
  ]

  if (options.width || options.height) {
    transformations[0].width = options.width ?? 'auto' as unknown as number
    transformations[0].height = options.height ?? 'auto' as unknown as number
    transformations[0].crop = options.crop ?? 'fill'
  }

  return cloudinary.url(publicId, {
    transformation: transformations,
    secure: true,
  })
}
