'use client';

import { TreeTable } from './tree-table';

// Hardcoded architecture layer tree for the observability blog post.
// Prop-free client component avoids RSC serialization issues with nested object arrays.
const nodes = [
  { id: 'edge', label: 'Client & Edge', children: [
    { id: 'browser', label: 'Browser / Mobile App' },
    { id: 'cdn', label: 'CDN & Global Edge Nodes' },
    { id: 'waf', label: 'WAF / API Gateway' },
  ]},
  { id: 'app', label: 'Application & Platform', children: [
    { id: 'k8s', label: 'Microservices on Kubernetes' },
    { id: 'mesh', label: 'Service Mesh (Envoy / Istio)' },
    { id: 'flags', label: 'Feature Flags & Identity Services' },
  ]},
  { id: 'data', label: 'Data & Async', children: [
    { id: 'db', label: 'Databases & Object Stores' },
    { id: 'cache', label: 'Caches & Search Indexes' },
    { id: 'queue', label: 'Queues, Streams & Background Workers' },
  ]},
  { id: 'llm', label: 'AI / LLM Stack', children: [
    { id: 'gateway', label: 'AI Gateway & Model Routing' },
    { id: 'retrieval', label: 'Retrieval Layer & Vector Stores' },
    { id: 'eval', label: 'Evaluation Pipelines' },
  ]},
  { id: '3p', label: 'Third-Party APIs', children: [
    { id: 'providers', label: 'External Providers & SaaS' },
    { id: 'integrations', label: 'Integration Platforms & Connectors' },
  ]},
];

export function TreeTableArch() {
  return <TreeTable nodes={nodes} />;
}
