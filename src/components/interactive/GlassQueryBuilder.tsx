'use client';

import React from 'react';
import { GlassButton } from '../button/GlassButton';
import { cn } from '@/lib/utilsComprehensive';
import {
  Select as GlassSelect,
  SelectTrigger as GlassSelectTrigger,
  SelectValue as GlassSelectValue,
  SelectContent as GlassSelectContent,
  SelectItem as GlassSelectItem,
} from '../input/GlassSelectCompound'

export interface FieldDef { id: string; label: string; type: 'text'|'number'|'select'; options?: {label:string;value:string}[] }
export interface Rule { field: string; op: string; value: any }
export interface RuleGroup { combinator: 'AND'|'OR'; rules: (Rule|RuleGroup)[] }

export interface GlassQueryBuilderProps {
  fields: FieldDef[];
  value: RuleGroup;
  onChange: (v: RuleGroup) => void;
  className?: string;
}

function isGroup(x: any): x is RuleGroup { return x && Array.isArray((x as any).rules); }

export function GlassQueryBuilder({ fields, value, onChange, className }: GlassQueryBuilderProps) {
  const update = (group: RuleGroup) => onChange({ ...group });

  const renderRule = (rule: Rule, idx: number, parent: RuleGroup) => {
    const field = fields.find(f => f.id === rule.field) || fields[0];
    return (
      <div key={idx} className="flex items-center gap-2">
        <GlassSelect value={rule.field} onValueChange={(v)=>{ rule.field = v; update(value); }}>
          <GlassSelectTrigger className="w-40 h-8 text-sm">
            <GlassSelectValue placeholder="Field" />
          </GlassSelectTrigger>
          <GlassSelectContent>
            {fields.map(f => <GlassSelectItem key={f.id} value={f.id}>{f.label}</GlassSelectItem>)}
          </GlassSelectContent>
        </GlassSelect>
        <GlassSelect value={rule.op} onValueChange={(v)=>{ rule.op = v; update(value); }}>
          <GlassSelectTrigger className="w-28 h-8 text-sm">
            <GlassSelectValue placeholder="Op" />
          </GlassSelectTrigger>
          <GlassSelectContent>
            {['=','!=','>','>=','<','<=','contains'].map(op => (
              <GlassSelectItem key={op} value={op}>{op}</GlassSelectItem>
            ))}
          </GlassSelectContent>
        </GlassSelect>
        {field.type === 'select' ? (
          <GlassSelect value={rule.value ?? ''} onValueChange={(v)=>{ rule.value=v; update(value); }}>
            <GlassSelectTrigger className="w-48 h-8 text-sm">
              <GlassSelectValue placeholder="Value" />
            </GlassSelectTrigger>
            <GlassSelectContent>
              <GlassSelectItem value="">—</GlassSelectItem>
              {field.options?.map(o => <GlassSelectItem key={o.value} value={o.value}>{o.label}</GlassSelectItem>)}
            </GlassSelectContent>
          </GlassSelect>
        ) : (
          <input value={rule.value ?? ''} onChange={(e)=>{ rule.value=e.target.value; update(value); }} className="bg-transparent border border-white/20 rounded px-2 py-1 text-sm" />
        )}
        <GlassButton size="sm" variant="ghost" onClick={()=>{ parent.rules.splice(idx,1); update(value); }}>Remove</GlassButton>
      </div>
    );
  };

  const renderGroup = (group: RuleGroup, parent?: RuleGroup) => (
    <div className="rounded-xl border border-white/20 p-3 space-y-2">
      <div className="flex items-center gap-2">
        <GlassSelect value={group.combinator} onValueChange={(v)=>{ group.combinator = v as any; update(value); }}>
          <GlassSelectTrigger className="w-24 h-8 text-sm">
            <GlassSelectValue />
          </GlassSelectTrigger>
          <GlassSelectContent>
            <GlassSelectItem value="AND">AND</GlassSelectItem>
            <GlassSelectItem value="OR">OR</GlassSelectItem>
          </GlassSelectContent>
        </GlassSelect>
        <GlassButton size="sm" variant="secondary" onClick={()=>{ group.rules.push({ field: fields[0].id, op: '=', value: '' }); update(value); }}>+ Rule</GlassButton>
        <GlassButton size="sm" variant="ghost" onClick={()=>{ group.rules.push({ combinator: 'AND', rules: [] }); update(value); }}>+ Group</GlassButton>
        {parent && <GlassButton size="sm" variant="ghost" onClick={()=>{ parent.rules.splice(parent.rules.indexOf(group),1); update(value); }}>Remove</GlassButton>}
      </div>
      <div className="space-y-2">
        {group.rules.map((r, i) => isGroup(r) ? (
          <div key={i}>{renderGroup(r, group)}</div>
        ) : renderRule(r as Rule, i, group))}
      </div>
    </div>
  );

  return <div className={cn('space-y-2', className)}>{renderGroup(value)}</div>;
}

export default GlassQueryBuilder;
