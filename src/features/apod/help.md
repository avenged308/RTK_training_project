export interface ApodItem {
  date: string;
  explanation: string;
  media_type: "image" | "video";
  title: string;
  url: string;
  hdurl?: string;
}
https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY

Mikhail Smokotnin  кому  Все 12:16
imageModal.tsx
ImageModal.tsx
interface Props {
  url: string;
  title: string;
  onClose: () => void;
}

export default function ImageModal({ url, title, onClose }: Props) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        cursor: "zoom-out"
      }}
    >
      <img
        src={url}
        alt={title}
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}

// Используем HD-качество, если доступно
          const imageUrl = item.hdurl ?? item.url;