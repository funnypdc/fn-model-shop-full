const BASE = process.env.NEXT_PUBLIC_ASSETS_BASE ?? ''
export const asset = (path: string) => `${BASE}${path}`
