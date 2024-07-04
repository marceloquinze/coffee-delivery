interface HighlightItemProps {
  text: string
  icon: React.ReactNode
  color: string
}

export function HighlightItem({ text, icon, color }: HighlightItemProps) {
  return (
    <div className="item">
      <span className={color}>{icon}</span>
      <p>{text}</p>
    </div>
  )
}
