import Image from '../models/Image'

export default function LabelWithDefault({
  label,
  imagePaths,
  id,
}: {
  label: string
  imagePaths: Array<Image>
  id?: string
}) {
  const labelEl =
    id && id.length ? (
      <label className="text-2xl font-bold" htmlFor={id}>
        {label}
      </label>
    ) : (
      <h1 className="text-2xl font-bold">{label}</h1>
    )

  return (
    <div className="flex">
      {labelEl}
      {imagePaths.map(img => {
        return (
          <span key={img.src} className="ml-4">
            <img src={img.src} alt={img.alt} height={52} width={52} />
          </span>
        )
      })}
    </div>
  )
}
