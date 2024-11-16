import { bucket } from '../../db/firebase'
import { UploadAndGetFile } from './_types'

class MediaService {
  url: string
  constructor(url: string) {
    this.url = url
  }
  getFileName() {
    const firstSplit = this.url.split('/')
    return firstSplit
      ? firstSplit[firstSplit?.length - 1].split('?')[0]
      : undefined
  }

  static async uploadAndGetFile(
    file: File,
    basePath: string
  ): Promise<UploadAndGetFile | undefined> {
    try {
      const fileName = `${Date.now()}_${file.name}`
      const destination = `uploads/${basePath}/${fileName}`
      const firebaseFile = bucket.file(destination)

      const writableStream = firebaseFile.createWriteStream({
        metadata: {
          contentType: file.type
        }
      })

      const fileBuffer = await file.arrayBuffer()
      // eslint-disable-next-line no-undef
      const buffer = Buffer.from(fileBuffer)

      writableStream.end(buffer)

      await new Promise((resolve, reject) => {
        writableStream.on('finish', () => {
          resolve(null)
        })
        writableStream.on('error', (error) => {
          console.error('Error uploading file:', error)
          reject(error)
        })
      })

      const twoYears = new Date().setFullYear(new Date().getFullYear() + 2)

      const [signedUrl] = await firebaseFile.getSignedUrl({
        action: 'read',
        expires: twoYears
      })
      const uploadedFile = {
        name: fileName,
        url: signedUrl
      }
      return uploadedFile
    } catch (err) {
      console.error('[uploadAndGetFileUrl -  Upload failed:', err)
    }
  }

  async deleteFile(folderName: string) {
    try {
      const fileName = this.getFileName()

      await bucket.deleteFiles({
        prefix: `uploads/${folderName}/${fileName}`
      })
    } catch (error) {
      console.error('[deleteFile -  Deletion  failed:', error)
    }
  }

  checkHasToDelete() {
    return this.getFileName()
  }
}

export default MediaService
