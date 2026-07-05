export interface BookEntry {
  title: string;
  author: string;
  type: 'book' | 'paper' | 'article';
  category: string;
  image?: string;
  description?: string;
  tags?: string[];
  status?: 'READ' | 'READING' | 'PLANNED' | 'RECOMMENDED';
}

export const books: BookEntry[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    type: "book",
    category: "distributed-systems",
    image: "/static/books/ddia.png",
    status: "RECOMMENDED",
    description: "The definitive guide to reliable, scalable, and maintainable systems.",
    tags: ["distributed-systems", "architecture"],
  },
  {
    image: "/static/books/sah.webp",
    title: "Solutions Architect's Handbook",
    author: "Saurabh Shrivastava",
    type: "book",
    category: "architecture",
    status: "READ",
    description: "A comprehensive guide to designing scalable, cost-effective solutions on AWS.",
    tags: ["architecture", "aws", "solutions-architecture"],
  },
  {
    image: "/static/books/upanishads.webp",
    title: "Principal Upanishads",
    author: "Swami Sivananda",
    type: "book",
    category: "self-improvement",
    status: "RECOMMENDED",
    description: "Ancient Indian philosophical texts exploring the nature of reality and self.",
    tags: ["self-help", "philosophy", "spirituality"],
  },
  {
    image: "/static/books/kizumonogatari.webp",
    title: "Kizumonogatari",
    author: "Nisio Isin",
    type: "book",
    category: "self-improvement",
    status: "RECOMMENDED",
    description: "A story of wounds, healing, and becoming human again.",
    tags: ["self-help", "fiction", "japanese"],
  },
  {
    image: "/static/books/attention.png",
    title: "Attention Is All You Need",
    author: "Vaswani et al.",
    type: "paper",
    category: "ml-systems",
    status: "READ",
    description: "The transformer architecture that revolutionised sequence modelling and foundation models.",
    tags: ["deep-learning", "nlp", "transformers"],
  },
  {
    image: "/static/books/hands-on-ml.jpg",
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    type: "book",
    category: "ml-systems",
    status: "READ",
    description: "Practical techniques for building ML systems with Scikit-Learn, Keras, and TensorFlow.",
    tags: ["machine-learning", "deep-learning", "python"],
  },
  {
    image: "/static/books/koimonogatari.webp",
    title: "Koimonogatari",
    author: "Nisio Isin",
    type: "book",
    category: "self-improvement",
    status: "RECOMMENDED",
    description: "Love stories that explore connection, loss, and the spaces between.",
    tags: ["fiction", "japanese"],
  },
  {
    image: "/static/books/multi-tenant-saas.jpg",
    title: "Building Multi-Tenant SaaS Architectures: Principles, Practices, and Patterns Using AWS",
    author: "Tod Golding",
    type: "book",
    category: "architecture",
    status: "PLANNED",
    description: "Architectural patterns for building multi-tenant SaaS solutions on AWS.",
    tags: ["architecture", "aws", "saas", "multi-tenant"],
  },
  {
    image: "/static/books/zarathustra.webp",
    title: "Thus Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    type: "book",
    category: "self-improvement",
    status: "READ",
    description: "A philosophical novel exploring the death of God, the Übermensch, and eternal recurrence.",
    tags: ["philosophy", "fiction"],
  },
  {
    image: "/static/books/platform-engineering.webp",
    title: "Platform Engineering: A Guide for Technical, Product, and People Leaders",
    author: "Camille Fournier",
    type: "book",
    category: "architecture",
    status: "PLANNED",
    description: "A leadership guide to building and running effective platform teams.",
    tags: ["architecture", "platform-engineering", "leadership"],
  },
];
