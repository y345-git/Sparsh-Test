import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function uploadImage(file: File): Promise<string> {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create a unique filename
    const uniqueId = uuidv4()
    const extension = file.name.split('.').pop()
    const filename = `${uniqueId}.${extension}`

    // Ensure the uploads directory exists
    const publicDir = join(process.cwd(), 'public', 'uploads')
    await mkdir(publicDir, { recursive: true })

    // Save the file to the public directory
    const filepath = join(publicDir, filename)
    await writeFile(filepath, buffer)

    // Return the public URL for the image
    return `/uploads/${filename}`
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Failed to upload image')
  }
} 