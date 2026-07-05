export interface BookEntry {
  title: string;
  author: string;
  type: 'book' | 'paper' | 'article';
  category: string;
  image?: string;
  url?: string;
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
    url: "https://dataintensive.net/",
    status: "RECOMMENDED",
    description: "The definitive guide to reliable, scalable, and maintainable systems.",
    tags: ["distributed-systems", "architecture"],
  },
  {
    image: "/static/books/sah.webp",
    url: "https://www.amazon.in/Solutions-Architects-Handbook-Kick-start-architecture/dp/1835084230",
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
    url: "https://www.amazon.in/Principal-Upanisads-Prof-S-Radhakrishnan/dp/8172231245",
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
    url: "https://www.amazon.in/KIZUMONOGATARI-Wound-Tale-NISIOISIN/dp/1941220975",
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
    url: "https://arxiv.org/abs/1706.03762",
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
    url: "https://www.amazon.in/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/9355421982",
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
    url: "https://www.amazon.in/KOIMONOGATARI-Love-Tale-NISIOISIN/dp/194719433X",
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
    url: "https://www.amazon.in/Building-Multi-Tenant-SaaS-Architectures-Principles/dp/9355427395",
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
    url: "https://www.amazon.in/Thus-Spoke-Zarathustra-Penguin-Classics/dp/0140441182",
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
    url: "https://www.amazon.in/Platform-Engineering-Technical-Product-Leaders/dp/1098153642",
    title: "Platform Engineering: A Guide for Technical, Product, and People Leaders",
    author: "Camille Fournier",
    type: "book",
    category: "architecture",
    status: "PLANNED",
    description: "A leadership guide to building and running effective platform teams.",
    tags: ["architecture", "platform-engineering", "leadership"],
  },
];
