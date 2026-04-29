import { useEffect, useMemo, useState } from "react";
import { Filter, List, PencilLine, Plus, Search, Trash2, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  PROGRAM_DIRECTORY_SEED,
  type DeliveryMode,
  type ProgramDegree,
  type ProgramRecord,
  type ProgramStatus,
} from "../utils/programDirectoryData";

const MODE_DOT: Record<DeliveryMode, string> = {
  "on-campus": "bg-emerald-500",
  online: "bg-sky-500",
  hybrid: "bg-amber-500",
};

const DEGREE_TYPES = ["Doctorate", "Masters", "Bachelors", "Certificate"];
const STATUS_OPTIONS: ProgramStatus[] = ["draft", "published", "archived"];

export function ProgramDirectoryTool() {
  const [programs, setPrograms] = useState<ProgramRecord[]>(PROGRAM_DIRECTORY_SEED);
  const [query, setQuery] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState<"" | DeliveryMode>("");
  const [selectedId, setSelectedId] = useState(PROGRAM_DIRECTORY_SEED[0]?.id ?? "");
  const [viewMode, setViewMode] = useState<"editor" | "list">("editor");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const schools = useMemo(
    () => Array.from(new Set(programs.map((p) => p.school || p.category).filter(Boolean))).sort(),
    [programs]
  );

  const filteredPrograms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programs.filter((program) => {
      const school = program.school || program.category;
      if (q && !`${program.title} ${school} ${program.description}`.toLowerCase().includes(q)) {
        return false;
      }
      if (schoolFilter && school !== schoolFilter) return false;
      if (deliveryFilter && !program.degrees.some((d) => d.deliveryMode === deliveryFilter)) {
        return false;
      }
      return true;
    });
  }, [programs, query, schoolFilter, deliveryFilter]);

  const selectedProgram = programs.find((program) => program.id === selectedId) ?? filteredPrograms[0];
  const totalDegrees = programs.reduce((sum, item) => sum + item.degrees.length, 0);

  const upsertProgram = (programId: string, patch: Partial<ProgramRecord>) => {
    const normalized =
      patch.school !== undefined
        ? { ...patch, category: patch.school }
        : patch.category !== undefined
        ? { ...patch, school: patch.category }
        : patch;

    setPrograms((prev) => prev.map((item) => (item.id === programId ? { ...item, ...normalized } : item)));
  };

  const upsertDegree = (programId: string, degreeId: string, patch: Partial<ProgramDegree>) => {
    setPrograms((prev) =>
      prev.map((program) =>
        program.id !== programId
          ? program
          : { ...program, degrees: program.degrees.map((d) => (d.id === degreeId ? { ...d, ...patch } : d)) }
      )
    );
  };

  const removeDegree = (programId: string, degreeId: string) => {
    setPrograms((prev) =>
      prev.map((program) =>
        program.id !== programId ? program : { ...program, degrees: program.degrees.filter((d) => d.id !== degreeId) }
      )
    );
  };

  const addDegree = (programId: string) => {
    setPrograms((prev) =>
      prev.map((program) =>
        program.id !== programId
          ? program
          : {
              ...program,
              degrees: [
                ...program.degrees,
                {
                  id: `${programId}-d-${Date.now()}`,
                  degreeCategory: "",
                  type: "",
                  deliveryMode: "on-campus",
                  url: "",
                },
              ],
            }
      )
    );
  };

  const addProgram = () => {
    const school = schools[0] ?? "School of Teaching & Learning";
    const next: ProgramRecord = {
      id: `p_new_${Date.now()}`,
      title: "Untitled Program",
      school,
      category: school,
      description: "",
      image: "",
      status: "draft",
      degrees: [],
    };
    setPrograms((prev) => [next, ...prev]);
    setSelectedId(next.id);
    setViewMode("editor");
  };

  const toggleSelectedRow = (programId: string, checked: boolean) => {
    setSelectedRows((prev) => (checked ? Array.from(new Set([...prev, programId])) : prev.filter((id) => id !== programId)));
  };

  const toggleAllVisible = (checked: boolean) => {
    setSelectedRows((prev) => {
      if (!checked) return prev.filter((id) => !filteredPrograms.some((p) => p.id === id));
      return Array.from(new Set([...prev, ...filteredPrograms.map((p) => p.id)]));
    });
  };

  const deletePrograms = (ids: string[]) => {
    setPrograms((prev) => prev.filter((item) => !ids.includes(item.id)));
    setSelectedRows((prev) => prev.filter((id) => !ids.includes(id)));
    if (ids.includes(selectedId)) {
      const remaining = programs.find((item) => !ids.includes(item.id));
      setSelectedId(remaining?.id ?? "");
    }
  };

  const bulkSetSchool = (school: string) => {
    if (!school) return;
    setPrograms((prev) => prev.map((item) => (selectedRows.includes(item.id) ? { ...item, school, category: school } : item)));
  };

  const bulkSetStatus = (status: ProgramStatus) => {
    setPrograms((prev) => prev.map((item) => (selectedRows.includes(item.id) ? { ...item, status } : item)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs">
        <span className="px-2.5 py-1 rounded-full border bg-white">{programs.length} programs</span>
        <span className="px-2.5 py-1 rounded-full border bg-white">{totalDegrees} degree offerings</span>
      </div>

      {viewMode === "editor" ? (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm bg-white">
                <PencilLine className="h-3.5 w-3.5" />
                Editor
              </button>
              <button
                onClick={() => setViewMode("list")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm bg-white"
              >
                <List className="h-3.5 w-3.5" />
                List View
              </button>
            </div>
            <div className="relative">
              <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Search programs..." />
            </div>
            <div className="border rounded-lg bg-white max-h-[600px] overflow-auto">
              {filteredPrograms.map((program) => (
                <button
                  key={program.id}
                  onClick={() => setSelectedId(program.id)}
                  className={`w-full text-left px-4 py-3 border-b hover:bg-muted/40 ${selectedProgram?.id === program.id ? "bg-muted/60" : ""}`}
                >
                  <p className="font-medium text-sm">{program.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(program.school || program.category) ?? "Uncategorized"} · {program.degrees.length} offering
                    {program.degrees.length === 1 ? "" : "s"}
                  </p>
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            {selectedProgram ? (
              <ProgramEditor
                program={selectedProgram}
                schools={schools}
                onSave={(patch) => upsertProgram(selectedProgram.id, patch)}
                onDegreePatch={(degreeId, patch) => upsertDegree(selectedProgram.id, degreeId, patch)}
                onDegreeDelete={(degreeId) => removeDegree(selectedProgram.id, degreeId)}
                onAddDegree={() => addDegree(selectedProgram.id)}
              />
            ) : (
              <div className="border rounded-lg bg-white p-8 text-sm text-muted-foreground">Select a program to edit details.</div>
            )}
          </div>
        </div>
      ) : (
        <ListView
          programs={filteredPrograms}
          schools={schools}
          query={query}
          schoolFilter={schoolFilter}
          deliveryFilter={deliveryFilter}
          selectedRows={selectedRows}
          totalCount={programs.length}
          onQueryChange={setQuery}
          onSchoolFilterChange={setSchoolFilter}
          onDeliveryFilterChange={setDeliveryFilter}
          onSelectRow={toggleSelectedRow}
          onSelectAll={toggleAllVisible}
          onAddProgram={addProgram}
          onOpenEditor={(id) => {
            setSelectedId(id);
            setViewMode("editor");
          }}
          onProgramPatch={upsertProgram}
          onBulkSetSchool={bulkSetSchool}
          onBulkSetStatus={bulkSetStatus}
          onBulkDelete={() => deletePrograms(selectedRows)}
          onClearSelection={() => setSelectedRows([])}
        />
      )}
    </div>
  );
}

function ProgramEditor({
  program,
  schools,
  onSave,
  onDegreePatch,
  onDegreeDelete,
  onAddDegree,
}: {
  program: ProgramRecord;
  schools: string[];
  onSave: (patch: ProgramRecord) => void;
  onDegreePatch: (degreeId: string, patch: Partial<ProgramDegree>) => void;
  onDegreeDelete: (degreeId: string) => void;
  onAddDegree: () => void;
}) {
  const [draft, setDraft] = useState(program);
  useEffect(() => {
    setDraft(program);
  }, [program.id]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(program);

  return (
    <div className="border rounded-lg bg-white p-5 space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="text-xs text-muted-foreground">Program title</label>
          <Input className="mt-1" value={draft.title} onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">School</label>
          <select
            className="mt-1 w-full h-10 rounded-md border px-3 text-sm bg-white"
            value={draft.school || draft.category}
            onChange={(event) => setDraft((prev) => ({ ...prev, school: event.target.value, category: event.target.value }))}
          >
            {schools.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Image URL</label>
          <Input className="mt-1" value={draft.image} onChange={(event) => setDraft((prev) => ({ ...prev, image: event.target.value }))} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs text-muted-foreground">Description</label>
          <textarea
            className="mt-1 w-full min-h-[92px] rounded-md border px-3 py-2 text-sm"
            value={draft.description}
            onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Degree offerings</p>
            <p className="text-xs text-muted-foreground mt-1">
              Each offering pairs a degree type with a delivery mode. Filters on the public site read from this list.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">{draft.degrees.length} offerings</p>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={onAddDegree}>
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add degree offering
          </Button>
        </div>
        {draft.degrees.map((degree) => (
          <div key={degree.id} className="border rounded-md p-3">
            <div className="grid gap-3 md:grid-cols-12">
              <div className="md:col-span-3">
                <label className="text-xs text-muted-foreground">Degree type</label>
                <select
                  className="mt-1 h-10 rounded-md border px-3 text-sm bg-white w-full"
                  value={degree.degreeCategory ?? ""}
                  onChange={(event) => onDegreePatch(degree.id, { degreeCategory: event.target.value })}
                >
                  <option value="">- Select -</option>
                  {DEGREE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="text-xs text-muted-foreground">Abbreviation</label>
                <Input className="mt-1" value={degree.type} onChange={(event) => onDegreePatch(degree.id, { type: event.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-muted-foreground">Delivery mode</label>
                <select
                  className="mt-1 h-10 rounded-md border px-3 text-sm bg-white w-full"
                  value={degree.deliveryMode}
                  onChange={(event) => onDegreePatch(degree.id, { deliveryMode: event.target.value as DeliveryMode })}
                >
                  <option value="on-campus">On Campus</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="text-xs text-muted-foreground">Program URL</label>
                <Input className="mt-1" value={degree.url} onChange={(event) => onDegreePatch(degree.id, { url: event.target.value })} />
              </div>
              <div className="md:col-span-1 flex items-end justify-end">
                <Button variant="ghost" size="sm" className="text-red-600" onClick={() => onDegreeDelete(degree.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#003087] hover:bg-[#002866]" onClick={() => onSave(draft)} disabled={!dirty}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function ListView({
  programs,
  schools,
  selectedRows,
  query,
  schoolFilter,
  deliveryFilter,
  totalCount,
  onQueryChange,
  onSchoolFilterChange,
  onDeliveryFilterChange,
  onSelectRow,
  onSelectAll,
  onAddProgram,
  onBulkSetSchool,
  onBulkSetStatus,
  onBulkDelete,
  onProgramPatch,
  onClearSelection,
  onOpenEditor,
}: {
  programs: ProgramRecord[];
  schools: string[];
  selectedRows: string[];
  query: string;
  schoolFilter: string;
  deliveryFilter: "" | DeliveryMode;
  totalCount: number;
  onQueryChange: (value: string) => void;
  onSchoolFilterChange: (value: string) => void;
  onDeliveryFilterChange: (value: "" | DeliveryMode) => void;
  onSelectRow: (programId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onAddProgram: () => void;
  onBulkSetSchool: (school: string) => void;
  onBulkSetStatus: (status: ProgramStatus) => void;
  onBulkDelete: () => void;
  onProgramPatch: (programId: string, patch: Partial<ProgramRecord>) => void;
  onClearSelection: () => void;
  onOpenEditor: (programId: string) => void;
}) {
  const allVisibleSelected = programs.length > 0 && programs.every((program) => selectedRows.includes(program.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm bg-white">
          <PencilLine className="h-3.5 w-3.5" />
          Editor
        </button>
        <div className="relative flex-1 max-w-[340px]">
          <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input value={query} onChange={(event) => onQueryChange(event.target.value)} className="pl-9" placeholder="Search programs..." />
        </div>
        <Button className="bg-[#111111] hover:bg-[#222222] ml-auto" onClick={onAddProgram}>
          <Plus className="h-3.5 w-3.5 mr-1" />
          New Program
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        <select
          className="h-10 rounded-md border px-3 text-sm bg-white min-w-[220px]"
          value={schoolFilter}
          onChange={(event) => onSchoolFilterChange(event.target.value)}
        >
          <option value="">All schools</option>
          {schools.map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
        </select>
        <select
          className="h-10 rounded-md border px-3 text-sm bg-white min-w-[180px]"
          value={deliveryFilter}
          onChange={(event) => onDeliveryFilterChange(event.target.value as "" | DeliveryMode)}
        >
          <option value="">All delivery types</option>
          <option value="online">Online</option>
          <option value="on-campus">On Campus</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <span className="ml-auto text-xs text-muted-foreground">
          {programs.length} of {totalCount}
        </span>
      </div>

      {selectedRows.length > 0 && (
        <div className="bg-[#111111] text-white rounded-xl px-4 py-2.5 flex items-center gap-3">
          <span className="text-sm font-medium">{selectedRows.length} selected</span>
          <select
            className="h-8 rounded-md border border-white/20 px-2 text-xs bg-[#1e1e1e]"
            defaultValue=""
            onChange={(event) => event.target.value && onBulkSetStatus(event.target.value as ProgramStatus)}
          >
            <option value="">Set status</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            className="h-8 rounded-md border border-white/20 px-2 text-xs bg-[#1e1e1e]"
            defaultValue=""
            onChange={(event) => event.target.value && onBulkSetSchool(event.target.value)}
          >
            <option value="">Set school</option>
            {schools.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
          <button onClick={onBulkDelete} className="h-8 px-3 rounded-md text-xs bg-red-600 hover:bg-red-700 inline-flex items-center gap-1">
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
          <button onClick={onClearSelection} className="ml-auto text-white/70 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="border rounded-lg bg-white overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/20">
              <th className="px-3 py-2 text-left w-8">
                <input type="checkbox" checked={allVisibleSelected} onChange={(event) => onSelectAll(event.target.checked)} />
              </th>
              <th className="px-3 py-2 text-left uppercase text-[11px] text-muted-foreground">Title</th>
              <th className="px-3 py-2 text-left uppercase text-[11px] text-muted-foreground">School</th>
              <th className="px-3 py-2 text-left uppercase text-[11px] text-muted-foreground">Status</th>
              <th className="px-3 py-2 text-left uppercase text-[11px] text-muted-foreground">Offerings</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <tr key={program.id} className="border-b align-top">
                <td className="px-3 py-3">
                  <input type="checkbox" checked={selectedRows.includes(program.id)} onChange={(event) => onSelectRow(program.id, event.currentTarget.checked)} />
                </td>
                <td className="px-3 py-3 min-w-[280px]">
                  <button onClick={() => onOpenEditor(program.id)} className="font-medium hover:underline text-left">
                    {program.title}
                  </button>
                </td>
                <td className="px-3 py-3 min-w-[240px]">
                  <select
                    className="h-9 rounded-md border px-2 text-sm bg-white w-full"
                    value={program.school || program.category}
                    onChange={(event) => onProgramPatch(program.id, { school: event.target.value })}
                  >
                    {schools.map((school) => (
                      <option key={school} value={school}>
                        {school}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-3 min-w-[150px]">
                  <select
                    className="h-9 rounded-md border px-2 text-sm bg-white"
                    value={program.status}
                    onChange={(event) => onProgramPatch(program.id, { status: event.target.value as ProgramStatus })}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status[0].toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-3 min-w-[170px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{program.degrees.length}</span>
                    <div className="flex gap-1">
                      {program.degrees.slice(0, 4).map((degree) => (
                        <span key={degree.id} className={`w-2 h-2 rounded-full ${MODE_DOT[degree.deliveryMode]}`} />
                      ))}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {programs.length === 0 && <div className="p-5 text-sm text-muted-foreground">No programs match your search.</div>}
      </div>
    </div>
  );
}
