import type { Metadata } from 'next'

const siteUrl = 'https://shounaks.netlify.app'
const siteName = 'Shounak Bhalerao | Portfolio'
const defaultDescription = 'Full Stack Developer & Cybersecurity Expert — 5.5 years designing and shipping production-grade systems at scale.'

export function baseMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName,
      title: siteName,
      description: defaultDescription,
      images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: defaultDescription,
      images: ['/og-default.png'],
    },
  }
}

export function blogMetadata(post: {
  slug: string
  title: string
  excerpt?: string | null
  date: string
  image?: string | null
}): Metadata {
  const url = `${siteUrl}/blog/${post.slug}`
  const description = post.excerpt || defaultDescription
  const images = post.image
    ? [{ url: post.image, width: 1200, height: 630 }]
    : [{ url: '/og-default.png', width: 1200, height: 630 }]

  return {
    title: `${post.title} — Shounak Bhalerao`,
    description,
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description,
      images,
      siteName,
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: images.map(i => i.url),
    },
  }
}

export function jsonLdPerson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shounak Bhalerao',
    jobTitle: 'SDE 3 @ Atlassian',
    url: siteUrl,
    sameAs: [
      'https://github.com/Shounaks',
      'https://linkedin.com/in/shounak-bhalerao',
      `mailto:shounakbhalerao777@gmail.com`,
    ],
    email: 'shounakbhalerao777@gmail.com',
    alumniOf: ['Deakin University', 'DIEMS'],
    knowsAbout: [
      'Java', 'Kotlin', 'TypeScript', 'React', 'Spring Boot',
      'System Design', 'Cybersecurity', 'Cloud Infrastructure',
    ],
  }
}

export function jsonLdBlogPosting(post: {
  slug: string
  title: string
  excerpt?: string | null
  date: string
  image?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || defaultDescription,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Shounak Bhalerao',
      url: siteUrl,
    },
    image: post.image || '/og-default.png',
  }
}
