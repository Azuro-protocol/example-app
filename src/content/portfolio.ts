import data from './portfolio.json'


export type Social = { label: string; href: string }

export type Site = {
  name: string
  owner: string
  role: string
  tagline: string
  heroLead: string
  email: string
  location: string
  socials: Social[]
}

export type Fact = { label: string; value: string }

export type About = {
  title: string
  body: string[]
  facts: Fact[]
}

export type Service = {
  title: string
  description: string
  icon: string
}

export type Work = {
  title: string
  summary: string
  tags: string[]
}

export type Testimonial = {
  quote: string
  author: string
  role: string
}

export type PortfolioContent = {
  site: Site
  about: About
  services: Service[]
  work: Work[]
  testimonials: Testimonial[]
}

export const content = data as PortfolioContent

export const site = content.site
export const about = content.about
export const services = content.services
export const work = content.work
export const testimonials = content.testimonials
