import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Smooth scroll to anchor element if it exists on the page
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        // Offset for the fixed navbar (approx 80-90px)
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - 90

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      // Instant scroll to the top of the page on route transition
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      })
    }
  }, [pathname, hash])

  return null
}
