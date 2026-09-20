import http from "node:http";
import { PGlite } from "@electric-sql/pglite";
const db = new PGlite();
const identity = new Proxy({}, { get: () => (v) => v });
const schema = process.argv[2];
if (schema) { const fs = await import("node:fs"); await db.exec(fs.readFileSync(schema, "utf8")); }
async function run(q) {
  const r = await db.query(q.query, q.params, { rowMode: "array" });
  const t = (v, oid) => {
    if (v === null || v === undefined) return null;
    if (typeof v === "boolean") return v ? "t" : "f";
    if (v instanceof Date) return oid === 1082 ? v.toISOString().slice(0, 10) : v.toISOString();
    if (typeof v === "string" && oid === 1082) return v.slice(0, 10);
    if (Array.isArray(v)) return "{" + v.map((x) => (x === null ? "NULL" : '"' + String(x).replace(/"/g, '\\"') + '"')).join(",") + "}";
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  };
  const rows = r.rows.map((row) => row.map((v, i) => t(v, r.fields[i].dataTypeID)));
  return { fields: r.fields.map((f) => ({ name: f.name, dataTypeID: f.dataTypeID })), rows, rowCount: r.affectedRows ?? r.rows.length, command: "" };
}
http.createServer(async (req, res) => {
  let body = ""; req.on("data", (c) => (body += c));
  req.on("end", async () => {
    try {
      const j = JSON.parse(body || "{}");
      const out = j.queries ? { results: await Promise.all(j.queries.map(run)) } : await run(j);
      res.writeHead(200, { "content-type": "application/json" }); res.end(JSON.stringify(out));
    } catch (e) { console.error("SQL ERR:", e.message, "\n  ", (JSON.parse(body||"{}").query||"").slice(0,200)); res.writeHead(400, { "content-type": "application/json" }); res.end(JSON.stringify({ message: e.message })); }
  });
}).listen(5555, () => console.log("neon shim on 5555"));
