export interface ApodItem {
  date: string
  explanation: string
  media_type: "image" | "video"
  title: string
  url: string
  hdurl?: string
}