"use client";

import { useMemo, useState } from "react";
import { categories, projects } from "@/content/projects";
import type { ProjectCategory } from "@/content/types";
import styles from "./ProjectExplorer.module.css";

type Filter = "all" | ProjectCategory;

/** Filterable, searchable list of every assignment. Table on wide screens, stacked rows on narrow. */
export function ProjectExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects
      .map((p, i) => ({ ...p, sn: String(i + 1).padStart(2, "0") }))
      .filter((r) => (filter === "all" || r.category === filter) && (!q || `${r.name} ${r.client}`.toLowerCase().includes(q)));
  }, [filter, query]);

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: projects.length },
    ...(Object.keys(categories) as ProjectCategory[]).map((k) => ({
      key: k,
      label: categories[k].label,
      count: projects.filter((p) => p.category === k).length,
    })),
  ];

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <div className={styles.filters} role="group" aria-label="Filter by discipline">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={styles.filter}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              <span className={styles.count}>{f.count}</span>
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <span className="visually-hidden">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search project or client"
          />
        </label>
      </div>

      <div className={styles.table} role="table" aria-label="Project experience">
        <div className={`${styles.row} ${styles.head}`} role="row">
          <span role="columnheader">SN</span>
          <span role="columnheader">Project</span>
          <span role="columnheader">Client</span>
          <span role="columnheader">Duration</span>
          <span role="columnheader">Location</span>
        </div>
        {rows.map((p) => (
          <div key={p.sn} className={styles.row} role="row">
            <span role="cell" className={styles.sn}>{p.sn}</span>
            <span role="cell" className={styles.name}>
              <span>{p.name}</span>
              <span className={styles.cat} style={{ color: categories[p.category].color }}>{categories[p.category].label}</span>
            </span>
            <span role="cell" className={styles.meta}>{p.client}</span>
            <span role="cell" className={styles.meta}>{p.duration}</span>
            <span role="cell" className={styles.meta}>{p.location}</span>
          </div>
        ))}
        {rows.length === 0 && <div className={styles.empty}>No projects match.</div>}
      </div>
      <p className="visually-hidden" aria-live="polite">{rows.length} projects shown</p>
    </div>
  );
}
