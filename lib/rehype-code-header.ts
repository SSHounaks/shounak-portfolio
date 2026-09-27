import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

export function rehypeCodeHeader() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'pre' || parent == null || index == null) return;

      const code = node.children.find((c): c is Element => c.type === 'element' && c.tagName === 'code');
      if (!code) return;

      const className = ((code.properties?.className as string[] | undefined) || []).join(' ');
      const lang = className.split('language-')[1] || 'code';

      const header: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: 'flex items-center justify-between px-4 py-2 border-b border-zinc-900 bg-zinc-900/40 text-xs text-zinc-400 select-none',
        },
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: { className: 'flex items-center gap-2' },
            children: [
              { type: 'element', tagName: 'span', properties: { className: 'w-2 h-2 rounded-full bg-zinc-700' }, children: [] },
              { type: 'element', tagName: 'span', properties: {}, children: [{ type: 'text', value: lang }] },
            ],
          },
          {
            type: 'element',
            tagName: 'button',
            properties: { className: 'hover:text-zinc-300 transition-colors text-[11px]', 'data-copy': '' },
            children: [{ type: 'text', value: 'Copy' }],
          },
        ],
      };

      const accent: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: 'absolute left-0 top-8 bottom-0 w-[2px] bg-emerald-500/0 group-hover:bg-emerald-500/40 transition-colors duration-300' },
        children: [],
      };

      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: 'relative rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden shadow-xl my-6 group' },
        children: [header, node, accent],
      };

      parent.children[index] = wrapper;
    });
  };
}
