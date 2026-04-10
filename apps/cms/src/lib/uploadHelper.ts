// Tiny helper that Media.tsx wrongly imported
// Upload is handled directly by the API form post, not this helper
export async function uploadFromBuffer(_buffer: Buffer): Promise<never> {
  throw new Error('Use the API endpoint directly')
}
