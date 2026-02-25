interface Props {
  url: string
  title: string
  onClose: () => void
}

export default function ImageModalWindow({ url, title, onClose }: Props) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        cursor: "zoom-out",
      }}
    >
      <img
        src={url}
        alt={title}
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  )
}
