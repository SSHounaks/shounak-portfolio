'use client';

import { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TreeNode {
  id: string;
  label: ReactNode;
  value?: ReactNode;
  children?: TreeNode[];
  defaultExpanded?: boolean;
  metadata?: Record<string, ReactNode>;
}

interface TreeTableProps {
  nodes: TreeNode[];
  columns?: { key: string; header: string }[];
  indentSize?: number;
  className?: string;
  showConnectors?: boolean;
}

function TreeNodeRow({
  node,
  depth,
  indentSize,
  showConnectors,
  isLast,
  parentPath,
  columns,
}: {
  node: TreeNode;
  depth: number;
  indentSize: number;
  showConnectors: boolean;
  isLast: boolean;
  parentPath: string;
  columns?: { key: string; header: string }[];
}) {
  const [expanded, setExpanded] = useState(node.defaultExpanded ?? true);
  const hasChildren = node.children && node.children.length > 0;

  const connector = isLast ? '└─' : '├─';
  const childConnector = isLast ? '  ' : '│ ';

  return (
    <>
      <tr className="border-b border-zinc-800/30 hover:bg-zinc-800/10 transition-colors">
        <td className="px-3 py-1.5 text-[12px]">
          <div className="flex items-center gap-1">
            {Array.from({ length: depth }).map((_, i) => (
              <span key={i} className="text-zinc-700 select-none" style={{ width: indentSize }}>
                {showConnectors ? childConnector : ''}
              </span>
            ))}
            {depth > 0 && showConnectors && (
              <span className="text-zinc-600 select-none">{connector}</span>
            )}
            {hasChildren && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors mr-0.5"
              >
                <span className="material-symbols-outlined text-[10px]">
                  {expanded ? 'expand_more' : 'chevron_right'}
                </span>
              </button>
            )}
            <span className="text-emerald-400/60 mr-1">&gt;</span>
            <span className="text-zinc-300">{node.label}</span>
          </div>
        </td>
        {columns && columns.length > 1 && columns.slice(1).map((col) => (
          <td key={col.key} className="px-3 py-1.5 text-[12px] text-zinc-400">
            {node.metadata?.[col.key] ?? '-'}
          </td>
        ))}
        {node.value !== undefined && (
          <td className="px-3 py-1.5 text-[12px] text-zinc-500 text-right">
            {node.value}
          </td>
        )}
      </tr>
      {hasChildren && expanded && node.children!.map((child, idx) => (
        <TreeNodeRow
          key={child.id}
          node={child}
          depth={depth + 1}
          indentSize={indentSize}
          showConnectors={showConnectors}
          isLast={idx === node.children!.length - 1}
          parentPath={`${parentPath}.${child.id}`}
          columns={columns}
        />
      ))}
    </>
  );
}

export function TreeTable({
  nodes,
  columns,
  indentSize = 16,
  className,
  showConnectors = true,
}: TreeTableProps) {
  return (
    <div className={cn('font-mono my-6 overflow-x-auto', className)}>
      <div className="flex items-center gap-2 mb-3 text-[10px] text-zinc-500 uppercase tracking-widest">
        <span className="text-emerald-500/60">//</span>
        <span>TREE</span>
      </div>
      <table className="w-full text-left border-collapse">
        {columns && columns.length > 0 && (
          <thead>
            <tr className="border-b border-zinc-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-2 text-zinc-400 font-bold text-[10px] uppercase tracking-wider"
                >
                  # {col.header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {nodes.map((node, idx) => (
            <TreeNodeRow
              key={node.id}
              node={node}
              depth={0}
              indentSize={indentSize}
              showConnectors={showConnectors}
              isLast={idx === nodes.length - 1}
              parentPath={node.id}
              columns={columns}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
