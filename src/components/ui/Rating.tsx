import { Star } from 'lucide-react'

type RatingProps = {
  rating: number
  reviewCount: number
  size?: 'sm' | 'md'
}

const sizes = {
  sm: { icon: 14, text: 'text-sm' },
  md: { icon: 16, text: 'text-base' },
}

export default function Rating({ rating, reviewCount, size = 'md' }: RatingProps) {
  const filledStars = Math.round(rating)

  return (
    <div className={`mt-3 flex items-center gap-2 ${sizes[size].text}`}>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={sizes[size].icon}
            className={star <= filledStars ? 'text-yellow-500' : 'text-nova-300'}
          />
        ))}
      </div>
      <span className="text-nova-500">{rating.toFixed(1)} ({reviewCount})</span>
    </div>
  )
}
