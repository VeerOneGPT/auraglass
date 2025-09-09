'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { GlassButton } from '../button/GlassButton';

export interface ColumnDef<T=any> { key: keyof T; header: string }
export interface GlassFormTableProps<T=any> { columns: ColumnDef<T>[]; rows: T[]; onChange: (rows:T[])=>void }

export function GlassFormTable<T=any>({ columns, rows, onChange }: GlassFormTableProps<T>) {
  const update = (ri: number, key: keyof T, v: any) => {
    const next = rows.slice();
    (next[ri] as any)[key] = v; onChange(next);
  };
  const add = () => onChange([...rows, {} as any]);
  const remove = (ri: number) => onChange(rows.filter((_,i)=>i!==ri));
  return (
    <div className="overflow-auto rounded-xl border border-white/15">
      <table className="w-full text-sm">
        <thead className="bg-white/5">
          <tr>
            {columns.map(c=> <th key={String(c.key)} className="text-left px-3 py-2 text-white/70">{c.header}</th>)}
            <th className="px-3 py-2" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="border-t border-white/10">
              {columns.map(c => (
                <td key={String(c.key)} className="px-3 py-2">
                  <input className="bg-transparent border border-white/20 rounded px-2 py-1 w-full" value={(r as any)[c.key] ?? ''} onChange={(e)=>update(ri, c.key, e.target.value)} />
                </td>
              ))}
              <td className="px-3 py-2 text-right">
                <GlassButton size="sm" variant="ghost" onClick={()=>remove(ri)}>Remove</GlassButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-2">
        <GlassButton size="sm" variant="secondary" onClick={add}>Add Row</GlassButton>
      </div>
    </div>
  );
}

export default GlassFormTable;

