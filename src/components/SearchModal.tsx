type SearchModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-nova-900">Search products</h2>
          <button type="button" onClick={onClose} className="text-nova-500 hover:text-nova-900">
            Close
          </button>
        </div>
        <input
          type="search"
          placeholder="Search for product, collection, brand..."
          className="w-full rounded-xl border border-nova-200 bg-nova-50 px-4 py-3 text-base text-nova-900 focus:border-nova-500 focus:outline-none"
        />
      </div>
    </div>
  )
}
