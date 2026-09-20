type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 flex">
      <button
        type="button"
        className="flex-1 bg-black/40"
        onClick={onClose}
        aria-label="Close cart drawer"
      />
      <aside className="w-full max-w-md bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-nova-900">Your cart</h2>
          <button type="button" onClick={onClose} className="text-nova-500 hover:text-nova-900">
            Close
          </button>
        </div>
        <p className="text-sm text-nova-600">Cart details will appear here.</p>
      </aside>
    </div>
  )
}
