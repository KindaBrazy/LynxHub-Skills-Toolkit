import { r as __toESM } from "../../rolldown-runtime.mjs";
import { a as SD, c as fD, d as require_src, i as RD, l as pD, n as LD, o as _D, r as MD, s as dD, t as ID, u as require_picocolors } from "./core.mjs";
import { stripVTControlCharacters } from "node:util";
import y from "node:process";
var import_picocolors = /* @__PURE__ */ __toESM(require_picocolors(), 1);
var import_src = require_src();
function ce() {
	return y.platform !== "win32" ? y.env.TERM !== "linux" : !!y.env.CI || !!y.env.WT_SESSION || !!y.env.TERMINUS_SUBLIME || y.env.ConEmuTask === "{cmd::Cmder}" || y.env.TERM_PROGRAM === "Terminus-Sublime" || y.env.TERM_PROGRAM === "vscode" || y.env.TERM === "xterm-256color" || y.env.TERM === "alacritty" || y.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
const V = ce(), u = (t, n) => V ? t : n, le = u("◆", "*"), L = u("■", "x"), W = u("▲", "x"), C = u("◇", "o"), ue = u("┌", "T"), o = u("│", "|"), d = u("└", "—"), k = u("●", ">"), P = u("○", " "), A = u("◻", "[•]"), T = u("◼", "[+]"), F = u("◻", "[ ]");
u("▪", "•");
const _ = u("─", "-"), me = u("╮", "+"), de = u("├", "+"), pe = u("╯", "+"), q = u("●", "•"), D = u("◆", "*"), U = u("▲", "!"), K = u("■", "x"), b = (t) => {
	switch (t) {
		case "initial":
		case "active": return import_picocolors.default.cyan(le);
		case "cancel": return import_picocolors.default.red(L);
		case "error": return import_picocolors.default.yellow(W);
		case "submit": return import_picocolors.default.green(C);
	}
}, G = (t) => {
	const { cursor: n, options: r, style: i } = t, s = t.maxItems ?? Number.POSITIVE_INFINITY, c = Math.max(process.stdout.rows - 4, 0), a = Math.min(c, Math.max(s, 5));
	let l = 0;
	n >= l + a - 3 ? l = Math.max(Math.min(n - a + 3, r.length - a), 0) : n < l + 2 && (l = Math.max(n - 2, 0));
	const $ = a < r.length && l > 0, g = a < r.length && l + a < r.length;
	return r.slice(l, l + a).map((p, v, f) => {
		const j = v === 0 && $, E = v === f.length - 1 && g;
		return j || E ? import_picocolors.default.dim("...") : i(p, v + l === n);
	});
}, ye = (t) => {
	const n = t.active ?? "Yes", r = t.inactive ?? "No";
	return new dD({
		active: n,
		inactive: r,
		initialValue: t.initialValue ?? !0,
		render() {
			const i = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`, s = this.value ? n : r;
			switch (this.state) {
				case "submit": return `${i}${import_picocolors.default.gray(o)}  ${import_picocolors.default.dim(s)}`;
				case "cancel": return `${i}${import_picocolors.default.gray(o)}  ${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}
${import_picocolors.default.gray(o)}`;
				default: return `${i}${import_picocolors.default.cyan(o)}  ${this.value ? `${import_picocolors.default.green(k)} ${n}` : `${import_picocolors.default.dim(P)} ${import_picocolors.default.dim(n)}`} ${import_picocolors.default.dim("/")} ${this.value ? `${import_picocolors.default.dim(P)} ${import_picocolors.default.dim(r)}` : `${import_picocolors.default.green(k)} ${r}`}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, ve = (t) => {
	const n = (r, i) => {
		const s = r.label ?? String(r.value);
		switch (i) {
			case "selected": return `${import_picocolors.default.dim(s)}`;
			case "active": return `${import_picocolors.default.green(k)} ${s} ${r.hint ? import_picocolors.default.dim(`(${r.hint})`) : ""}`;
			case "cancelled": return `${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}`;
			default: return `${import_picocolors.default.dim(P)} ${import_picocolors.default.dim(s)}`;
		}
	};
	return new LD({
		options: t.options,
		initialValue: t.initialValue,
		render() {
			const r = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`;
			switch (this.state) {
				case "submit": return `${r}${import_picocolors.default.gray(o)}  ${n(this.options[this.cursor], "selected")}`;
				case "cancel": return `${r}${import_picocolors.default.gray(o)}  ${n(this.options[this.cursor], "cancelled")}
${import_picocolors.default.gray(o)}`;
				default: return `${r}${import_picocolors.default.cyan(o)}  ${G({
					cursor: this.cursor,
					options: this.options,
					maxItems: t.maxItems,
					style: (i, s) => n(i, s ? "active" : "inactive")
				}).join(`
${import_picocolors.default.cyan(o)}  `)}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, fe = (t) => {
	const n = (r, i) => {
		const s = r.label ?? String(r.value);
		return i === "active" ? `${import_picocolors.default.cyan(A)} ${s} ${r.hint ? import_picocolors.default.dim(`(${r.hint})`) : ""}` : i === "selected" ? `${import_picocolors.default.green(T)} ${import_picocolors.default.dim(s)} ${r.hint ? import_picocolors.default.dim(`(${r.hint})`) : ""}` : i === "cancelled" ? `${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}` : i === "active-selected" ? `${import_picocolors.default.green(T)} ${s} ${r.hint ? import_picocolors.default.dim(`(${r.hint})`) : ""}` : i === "submitted" ? `${import_picocolors.default.dim(s)}` : `${import_picocolors.default.dim(F)} ${import_picocolors.default.dim(s)}`;
	};
	return new SD({
		options: t.options,
		initialValues: t.initialValues,
		required: t.required ?? !0,
		cursorAt: t.cursorAt,
		validate(r) {
			if (this.required && r.length === 0) return `Please select at least one option.
${import_picocolors.default.reset(import_picocolors.default.dim(`Press ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" space ")))} to select, ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" enter ")))} to submit`))}`;
		},
		render() {
			const r = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`, i = (s, c) => {
				const a = this.value.includes(s.value);
				return c && a ? n(s, "active-selected") : a ? n(s, "selected") : n(s, c ? "active" : "inactive");
			};
			switch (this.state) {
				case "submit": return `${r}${import_picocolors.default.gray(o)}  ${this.options.filter(({ value: s }) => this.value.includes(s)).map((s) => n(s, "submitted")).join(import_picocolors.default.dim(", ")) || import_picocolors.default.dim("none")}`;
				case "cancel": {
					const s = this.options.filter(({ value: c }) => this.value.includes(c)).map((c) => n(c, "cancelled")).join(import_picocolors.default.dim(", "));
					return `${r}${import_picocolors.default.gray(o)}  ${s.trim() ? `${s}
${import_picocolors.default.gray(o)}` : ""}`;
				}
				case "error": {
					const s = this.error.split(`
`).map((c, a) => a === 0 ? `${import_picocolors.default.yellow(d)}  ${import_picocolors.default.yellow(c)}` : `   ${c}`).join(`
`);
					return `${r + import_picocolors.default.yellow(o)}  ${G({
						options: this.options,
						cursor: this.cursor,
						maxItems: t.maxItems,
						style: i
					}).join(`
${import_picocolors.default.yellow(o)}  `)}
${s}
`;
				}
				default: return `${r}${import_picocolors.default.cyan(o)}  ${G({
					options: this.options,
					cursor: this.cursor,
					maxItems: t.maxItems,
					style: i
				}).join(`
${import_picocolors.default.cyan(o)}  `)}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, be = (t) => {
	const { selectableGroups: n = !0 } = t, r = (i, s, c = []) => {
		const a = i.label ?? String(i.value), l = typeof i.group == "string", $ = l && (c[c.indexOf(i) + 1] ?? { group: !0 }), g = l && $.group === !0, p = l ? n ? `${g ? d : o} ` : "  " : "";
		if (s === "active") return `${import_picocolors.default.dim(p)}${import_picocolors.default.cyan(A)} ${a} ${i.hint ? import_picocolors.default.dim(`(${i.hint})`) : ""}`;
		if (s === "group-active") return `${p}${import_picocolors.default.cyan(A)} ${import_picocolors.default.dim(a)}`;
		if (s === "group-active-selected") return `${p}${import_picocolors.default.green(T)} ${import_picocolors.default.dim(a)}`;
		if (s === "selected") {
			const f = l || n ? import_picocolors.default.green(T) : "";
			return `${import_picocolors.default.dim(p)}${f} ${import_picocolors.default.dim(a)} ${i.hint ? import_picocolors.default.dim(`(${i.hint})`) : ""}`;
		}
		if (s === "cancelled") return `${import_picocolors.default.strikethrough(import_picocolors.default.dim(a))}`;
		if (s === "active-selected") return `${import_picocolors.default.dim(p)}${import_picocolors.default.green(T)} ${a} ${i.hint ? import_picocolors.default.dim(`(${i.hint})`) : ""}`;
		if (s === "submitted") return `${import_picocolors.default.dim(a)}`;
		const v = l || n ? import_picocolors.default.dim(F) : "";
		return `${import_picocolors.default.dim(p)}${v} ${import_picocolors.default.dim(a)}`;
	};
	return new _D({
		options: t.options,
		initialValues: t.initialValues,
		required: t.required ?? !0,
		cursorAt: t.cursorAt,
		selectableGroups: n,
		validate(i) {
			if (this.required && i.length === 0) return `Please select at least one option.
${import_picocolors.default.reset(import_picocolors.default.dim(`Press ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" space ")))} to select, ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" enter ")))} to submit`))}`;
		},
		render() {
			const i = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`;
			switch (this.state) {
				case "submit": return `${i}${import_picocolors.default.gray(o)}  ${this.options.filter(({ value: s }) => this.value.includes(s)).map((s) => r(s, "submitted")).join(import_picocolors.default.dim(", "))}`;
				case "cancel": {
					const s = this.options.filter(({ value: c }) => this.value.includes(c)).map((c) => r(c, "cancelled")).join(import_picocolors.default.dim(", "));
					return `${i}${import_picocolors.default.gray(o)}  ${s.trim() ? `${s}
${import_picocolors.default.gray(o)}` : ""}`;
				}
				case "error": {
					const s = this.error.split(`
`).map((c, a) => a === 0 ? `${import_picocolors.default.yellow(d)}  ${import_picocolors.default.yellow(c)}` : `   ${c}`).join(`
`);
					return `${i}${import_picocolors.default.yellow(o)}  ${this.options.map((c, a, l) => {
						const $ = this.value.includes(c.value) || c.group === !0 && this.isGroupSelected(`${c.value}`), g = a === this.cursor;
						return !g && typeof c.group == "string" && this.options[this.cursor].value === c.group ? r(c, $ ? "group-active-selected" : "group-active", l) : g && $ ? r(c, "active-selected", l) : $ ? r(c, "selected", l) : r(c, g ? "active" : "inactive", l);
					}).join(`
${import_picocolors.default.yellow(o)}  `)}
${s}
`;
				}
				default: return `${i}${import_picocolors.default.cyan(o)}  ${this.options.map((s, c, a) => {
					const l = this.value.includes(s.value) || s.group === !0 && this.isGroupSelected(`${s.value}`), $ = c === this.cursor;
					return !$ && typeof s.group == "string" && this.options[this.cursor].value === s.group ? r(s, l ? "group-active-selected" : "group-active", a) : $ && l ? r(s, "active-selected", a) : l ? r(s, "selected", a) : r(s, $ ? "active" : "inactive", a);
				}).join(`
${import_picocolors.default.cyan(o)}  `)}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, Me = (t = "", n = "") => {
	const r = `
${t}
`.split(`
`), i = stripVTControlCharacters(n).length, s = Math.max(r.reduce((a, l) => {
		const $ = stripVTControlCharacters(l);
		return $.length > a ? $.length : a;
	}, 0), i) + 2, c = r.map((a) => `${import_picocolors.default.gray(o)}  ${import_picocolors.default.dim(a)}${" ".repeat(s - stripVTControlCharacters(a).length)}${import_picocolors.default.gray(o)}`).join(`
`);
	process.stdout.write(`${import_picocolors.default.gray(o)}
${import_picocolors.default.green(C)}  ${import_picocolors.default.reset(n)} ${import_picocolors.default.gray(_.repeat(Math.max(s - i - 1, 1)) + me)}
${c}
${import_picocolors.default.gray(de + _.repeat(s + 2) + pe)}
`);
}, xe = (t = "") => {
	process.stdout.write(`${import_picocolors.default.gray(d)}  ${import_picocolors.default.red(t)}

`);
}, Ie = (t = "") => {
	process.stdout.write(`${import_picocolors.default.gray(ue)}  ${t}
`);
}, Se = (t = "") => {
	process.stdout.write(`${import_picocolors.default.gray(o)}
${import_picocolors.default.gray(d)}  ${t}

`);
}, M = {
	message: (t = "", { symbol: n = import_picocolors.default.gray(o) } = {}) => {
		const r = [`${import_picocolors.default.gray(o)}`];
		if (t) {
			const [i, ...s] = t.split(`
`);
			r.push(`${n}  ${i}`, ...s.map((c) => `${import_picocolors.default.gray(o)}  ${c}`));
		}
		process.stdout.write(`${r.join(`
`)}
`);
	},
	info: (t) => {
		M.message(t, { symbol: import_picocolors.default.blue(q) });
	},
	success: (t) => {
		M.message(t, { symbol: import_picocolors.default.green(D) });
	},
	step: (t) => {
		M.message(t, { symbol: import_picocolors.default.green(C) });
	},
	warn: (t) => {
		M.message(t, { symbol: import_picocolors.default.yellow(U) });
	},
	warning: (t) => {
		M.warn(t);
	},
	error: (t) => {
		M.message(t, { symbol: import_picocolors.default.red(K) });
	}
}, J = `${import_picocolors.default.gray(o)}  `, x = {
	message: async (t, { symbol: n = import_picocolors.default.gray(o) } = {}) => {
		process.stdout.write(`${import_picocolors.default.gray(o)}
${n}  `);
		let r = 3;
		for await (let i of t) {
			i = i.replace(/\n/g, `
${J}`), i.includes(`
`) && (r = 3 + stripVTControlCharacters(i.slice(i.lastIndexOf(`
`))).length);
			const s = stripVTControlCharacters(i).length;
			r + s < process.stdout.columns ? (r += s, process.stdout.write(i)) : (process.stdout.write(`
${J}${i.trimStart()}`), r = 3 + stripVTControlCharacters(i.trimStart()).length);
		}
		process.stdout.write(`
`);
	},
	info: (t) => x.message(t, { symbol: import_picocolors.default.blue(q) }),
	success: (t) => x.message(t, { symbol: import_picocolors.default.green(D) }),
	step: (t) => x.message(t, { symbol: import_picocolors.default.green(C) }),
	warn: (t) => x.message(t, { symbol: import_picocolors.default.yellow(U) }),
	warning: (t) => x.warn(t),
	error: (t) => x.message(t, { symbol: import_picocolors.default.red(K) })
}, Y = ({ indicator: t = "dots" } = {}) => {
	const n = V ? [
		"◒",
		"◐",
		"◓",
		"◑"
	] : [
		"•",
		"o",
		"O",
		"0"
	], r = V ? 80 : 120, i = process.env.CI === "true";
	let s, c, a = !1, l = "", $, g = performance.now();
	const p = (m) => {
		a && N(m > 1 ? "Something went wrong" : "Canceled", m);
	}, v = () => p(2), f = () => p(1), j = () => {
		process.on("uncaughtExceptionMonitor", v), process.on("unhandledRejection", v), process.on("SIGINT", f), process.on("SIGTERM", f), process.on("exit", p);
	}, E = () => {
		process.removeListener("uncaughtExceptionMonitor", v), process.removeListener("unhandledRejection", v), process.removeListener("SIGINT", f), process.removeListener("SIGTERM", f), process.removeListener("exit", p);
	}, B = () => {
		if ($ === void 0) return;
		i && process.stdout.write(`
`);
		const m = $.split(`
`);
		process.stdout.write(import_src.cursor.move(-999, m.length - 1)), process.stdout.write(import_src.erase.down(m.length));
	}, R = (m) => m.replace(/\.+$/, ""), O = (m) => {
		const h = (performance.now() - m) / 1e3, w = Math.floor(h / 60), I = Math.floor(h % 60);
		return w > 0 ? `[${w}m ${I}s]` : `[${I}s]`;
	}, H = (m = "") => {
		a = !0, s = fD(), l = R(m), g = performance.now(), process.stdout.write(`${import_picocolors.default.gray(o)}
`);
		let h = 0, w = 0;
		j(), c = setInterval(() => {
			if (i && l === $) return;
			B(), $ = l;
			const I = import_picocolors.default.magenta(n[h]);
			if (i) process.stdout.write(`${I}  ${l}...`);
			else if (t === "timer") process.stdout.write(`${I}  ${l} ${O(g)}`);
			else {
				const z = ".".repeat(Math.floor(w)).slice(0, 3);
				process.stdout.write(`${I}  ${l}${z}`);
			}
			h = h + 1 < n.length ? h + 1 : 0, w = w < n.length ? w + .125 : 0;
		}, r);
	}, N = (m = "", h = 0) => {
		a = !1, clearInterval(c), B();
		const w = h === 0 ? import_picocolors.default.green(C) : h === 1 ? import_picocolors.default.red(L) : import_picocolors.default.red(W);
		l = R(m ?? l), t === "timer" ? process.stdout.write(`${w}  ${l} ${O(g)}
`) : process.stdout.write(`${w}  ${l}
`), E(), s();
	};
	return {
		start: H,
		stop: N,
		message: (m = "") => {
			l = R(m ?? l);
		}
	};
};
export { Y as a, ve as c, Se as i, xe as l, M as n, be as o, Me as r, fe as s, Ie as t, ye as u };
