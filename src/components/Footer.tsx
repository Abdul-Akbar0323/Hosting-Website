export default function Footer() {
  return (
    <footer className="bg-nova-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Novae. All rights reserved.</p>
        <p className="mt-2 text-nova-300">Simple ecommerce demo built with React and Tailwind.</p>
      </div>
    </footer>
  )
}
