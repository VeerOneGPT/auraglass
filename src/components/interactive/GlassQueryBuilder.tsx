'use client';

import React from 'react';
import { GlassButton } from '../button/GlassButton';
import { cn } from '../../lib/utilsComprehensive';
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
      <div key={idx} className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
        <GlassSelect value={rule.field} onValueChange={(v) => { rule.field = v; update(value); }}>
          <GlassSelectTrigger className="w-40 glass-glass-glass-h-8 glass-glass-glass-text-sm">
            <GlassSelectValue placeholder="Field" />
          </GlassSelectTrigger>
          <GlassSelectContent>
            {fields.map(f => <GlassSelectItem key={f.id} value={f.id}>{f.label}</GlassSelectItem>)}
          </GlassSelectContent>
        </GlassSelect>
        <GlassSelect value={rule.op} onValueChange={(v) => { rule.op = v; update(value); }}>
          <GlassSelectTrigger className="w-28 glass-glass-glass-h-8 glass-glass-glass-text-sm">
            <GlassSelectValue placeholder="Op" />
          </GlassSelectTrigger>
          <GlassSelectContent>
            {['=','!=','>','>=','<','<=','contains'].map(op => (
              <GlassSelectItem key={op} value={op}>{op}</GlassSelectItem>
            ))}
          </GlassSelectContent>
        </GlassSelect>
        {field.type === 'select' ? (
          <GlassSelect
            value={rule.value ?? ''}
            onValueChange={(v) => {
              const next = v === '__clear__' ? '' : v;
              rule.value = next;
              update(value);
            }}
          >
            <GlassSelectTrigger className="glass-glass-glass-w-48 glass-glass-glass-h-8 glass-glass-glass-text-sm">
              <GlassSelectValue placeholder="Value" />
            </GlassSelectTrigger>
            <GlassSelectContent>
              <GlassSelectItem value="__clear__">—</GlassSelectItem>
              {field.options?.map(o => <GlassSelectItem key={o.value} value={o.value}>{o.label}</GlassSelectItem>)}
            </GlassSelectContent>
          </GlassSelect>
        ) : (
          <input value={rule.value ?? ''} onChange={(e) => { rule.value = e.target.value; update(value); }} className="glass-glass-glass-bg-transparent glass-glass-glass-border glass-glass-glass-border-white/20 glass-radius-md glass-glass-glass-px-2 glass-glass-glass-py-1 glass-glass-glass-text-sm" />
        )}
        <GlassButton size="sm" variant="ghost" onClick={(e) => { parent.rules.splice(idx, 1); update(value); }}>Remove</GlassButton>
      </div>
    );
  };

  const renderGroup = (group: RuleGroup, parent?: RuleGroup) => (
    <div className="glass-radius-xl glass-glass-glass-border glass-glass-glass-border-white/20 glass-glass-glass-p-3 glass-glass-glass-gap-2">
      <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
        <GlassSelect value={group.combinator} onValueChange={(v) => { group.combinator = v as any; update(value); }}>
          <GlassSelectTrigger className="glass-glass-glass-w-24 glass-glass-glass-h-8 glass-glass-glass-text-sm">
            <GlassSelectValue />
          </GlassSelectTrigger>
          <GlassSelectContent>
            <GlassSelectItem value="AND">AND</GlassSelectItem>
            <GlassSelectItem value="OR">OR</GlassSelectItem>
          </GlassSelectContent>
        </GlassSelect>
        <GlassButton size="sm" variant="secondary" onClick={(e) =>{ group.rules.push({ field: fields[0].id, op: '=', value: '' }); update(value); }}>+ Rule</GlassButton>
        <GlassButton size="sm" variant="ghost" onClick={(e) => { group.rules.push({ combinator: 'AND', rules: [] }); update(value); }}>+ Group</GlassButton>
        {parent && <GlassButton size="sm" variant="ghost" onClick={(e) => { parent.rules.splice(parent.rules.indexOf(group), 1); update(value); }}>Remove</GlassButton>}
      </div>
      <div className="glass-glass-glass-gap-2">
        {group.rules.map((r, i) => isGroup(r) ? (
          <div key={i}>{renderGroup(r, group)}</div>
        ) : renderRule(r as Rule, i, group))}
      </div>
    </div>
  );

  return <div className={cn('glass-gap-2', className)}>{renderGroup(value)}</div>;
}

export default GlassQueryBuilder;
