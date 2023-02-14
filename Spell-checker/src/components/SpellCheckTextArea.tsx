export default function SpellCheckTextArea({
  text,
  setText,
  id,
}: {
  text: string
  setText: Function
  id: string
}) {
  // since basic is a subset of regular english, the built in OS spell check will be helpful here still
  return (
    <div className="bg-white border-2 border-solid border-slate-200 rounded-xl">
      <textarea
        value={text}
        onChange={e => {
          setText(e.target.value)
        }}
        rows={20}
        className="w-full"
        id={id}
      ></textarea>
    </div>
  )
}
