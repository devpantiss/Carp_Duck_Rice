import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { programDetails } from '../../data/programDetails'

// Live site address. If the domain changes, also update index.html, public/robots.txt and public/sitemap.xml.
export const SITE_URL = 'https://carp-duck-rice.vercel.app'
const SITE = 'Carp, Duck & Rice'
const DEFAULT_DESCRIPTION = 'An eco-livelihood park in Odisha where carp, ducks and rice are farmed together, supporting rural families through sustainable programs, training and field visits.'

// Title and description for each page (shown in Google results and link previews)
const pages = {
  '/': {
    title: 'Carp, Duck & Rice Livelihood Park – Integrated Farming in Odisha',
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: `About the Park – ${SITE}`,
    description: 'Carp, duck and rice come together as a practical model for ecological restoration, village income and hands-on learning in Odisha.',
  },
  '/what-we-do': {
    title: `Our Programs – ${SITE}`,
    description: 'Demonstration, training, restoration and community enterprise: explore the seven livelihood programs that take the integrated farming model beyond the park.',
  },
  '/park': {
    title: `Visit the Park – ${SITE}`,
    description: 'An integrated 40-acre living system where carp, duck, rice, livestock, agroforestry and heritage weaving sustain 150+ families.',
  },
  '/gallery': {
    title: `Gallery – ${SITE}`,
    description: 'Life through the lens: photos of Pondy Fish, Guavas AcreRise, Eastern Ghat Goats, Tamarind Grove, Tassar Fashion, Poultry and Tribey Coffee.',
  },
  '/contact': {
    title: `Plan Your Visit & Contact – ${SITE}`,
    description: 'Plan a visit to the Carp, Duck & Rice Livelihood Park near Bhubaneswar, Odisha. Opening hours, directions and how to get in touch.',
  },
  '/dashboard': { title: `Dashboard – ${SITE}`, noindex: true },
  '/dashboard/reports': { title: `Reports – ${SITE}`, noindex: true },
}

function getSeo(path) {
  if (pages[path]) return pages[path]
  const program = path.match(/^\/programs\/([^/]+)$/)
  if (program && programDetails[program[1]]) {
    const p = programDetails[program[1]]
    return { title: `${p.eyebrow} – ${SITE}`, description: `${p.subtitle} ${p.origin.lead}` }
  }
  if (path.startsWith('/dashboard')) return { title: `Dashboard – ${SITE}`, noindex: true }
  return { title: `Page Not Found – ${SITE}`, noindex: true, notFound: true }
}

// Create, update or remove a <meta> / <link> tag in <head>
function setTag(tag, attr, key, value, valueAttr = 'content') {
  let el = document.head.querySelector(`${tag}[${attr}="${key}"]`)
  if (value == null) { el?.remove(); return }
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute(valueAttr, value)
}

// Updates the page title, description, canonical URL and preview tags on every route change
export default function RouteSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const { title, description, noindex, notFound } = getSeo(pathname)
    const url = SITE_URL + pathname
    const desc = description ?? DEFAULT_DESCRIPTION

    document.title = title
    setTag('meta', 'name', 'description', desc)
    setTag('meta', 'name', 'robots', noindex ? 'noindex' : null)
    setTag('link', 'rel', 'canonical', notFound ? null : url, 'href')
    setTag('meta', 'property', 'og:title', title)
    setTag('meta', 'property', 'og:description', desc)
    setTag('meta', 'property', 'og:url', url)
    setTag('meta', 'name', 'twitter:title', title)
    setTag('meta', 'name', 'twitter:description', desc)
  }, [pathname])

  return null
}
