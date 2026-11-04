import { useEffect, useRef, useState } from 'react'

// Muted background video that only downloads when it is near the screen,
// pauses while scrolled out of view, and shows a poster image meanwhile.
// Use `eager` for videos visible on first paint (page heroes).
// The poster defaults to the same path with .jpg (e.g. /videos/goats.jpg).
export default function LazyVideo({ src, poster, eager = false, ...props }) {
  const videoRef = useRef(null)
  const [load, setLoad] = useState(eager || typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const video = videoRef.current
    if (!video || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true)
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '300px 0px' }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={load ? src : undefined}
      poster={poster ?? src.replace(/\.mp4$/, '.jpg')}
      preload={load ? 'auto' : 'none'}
      autoPlay
      muted
      loop
      playsInline
      {...props}
    />
  )
}
