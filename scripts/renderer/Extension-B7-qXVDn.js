import { n as __commonJSMin, r as __toESM, t as require_react } from "./react-Pwm4Whwk.js";
import { r as importShared } from "./_virtual___federation_fn_import-ChPcBYrR.js";
import { t as require_jsx_runtime } from "./jsx-runtime-J7Dbn46L.js";
//#region node_modules/lodash-es/_freeGlobal.js
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
//#endregion
//#region node_modules/lodash-es/_root.js
/** Detect free variable `self`. */
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
//#endregion
//#region node_modules/lodash-es/_Symbol.js
/** Built-in value references. */
var Symbol$1 = (freeGlobal || freeSelf || Function("return this")()).Symbol;
//#endregion
//#region node_modules/lodash-es/_getRawTag.js
/** Used for built-in method references. */
var objectProto = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;
/**
* Used to resolve the
* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
* of values.
*/
var nativeObjectToString$1 = objectProto.toString;
/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
/**
* A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the raw `toStringTag`.
*/
function getRawTag(value) {
	var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
	try {
		value[symToStringTag$1] = void 0;
		var unmasked = true;
	} catch (e) {}
	var result = nativeObjectToString$1.call(value);
	if (unmasked) if (isOwn) value[symToStringTag$1] = tag;
	else delete value[symToStringTag$1];
	return result;
}
//#endregion
//#region node_modules/lodash-es/_objectToString.js
/**
* Used to resolve the
* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
* of values.
*/
var nativeObjectToString = Object.prototype.toString;
/**
* Converts `value` to a string using `Object.prototype.toString`.
*
* @private
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
*/
function objectToString(value) {
	return nativeObjectToString.call(value);
}
//#endregion
//#region node_modules/lodash-es/_baseGetTag.js
/** `Object#toString` result references. */
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
/**
* The base implementation of `getTag` without fallbacks for buggy environments.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the `toStringTag`.
*/
function baseGetTag(value) {
	if (value == null) return value === void 0 ? undefinedTag : nullTag;
	return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
//#endregion
//#region node_modules/lodash-es/isObjectLike.js
/**
* Checks if `value` is object-like. A value is object-like if it's not `null`
* and has a `typeof` result of "object".
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
* @example
*
* _.isObjectLike({});
* // => true
*
* _.isObjectLike([1, 2, 3]);
* // => true
*
* _.isObjectLike(_.noop);
* // => false
*
* _.isObjectLike(null);
* // => false
*/
function isObjectLike(value) {
	return value != null && typeof value == "object";
}
//#endregion
//#region node_modules/lodash-es/isSymbol.js
/** `Object#toString` result references. */
var symbolTag = "[object Symbol]";
/**
* Checks if `value` is classified as a `Symbol` primitive or object.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
* @example
*
* _.isSymbol(Symbol.iterator);
* // => true
*
* _.isSymbol('abc');
* // => false
*/
function isSymbol(value) {
	return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
//#endregion
//#region node_modules/lodash-es/_arrayMap.js
/**
* A specialized version of `_.map` for arrays without support for iteratee
* shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the new mapped array.
*/
function arrayMap(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length, result = Array(length);
	while (++index < length) result[index] = iteratee(array[index], index, array);
	return result;
}
//#endregion
//#region node_modules/lodash-es/isArray.js
/**
* Checks if `value` is classified as an `Array` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an array, else `false`.
* @example
*
* _.isArray([1, 2, 3]);
* // => true
*
* _.isArray(document.body.children);
* // => false
*
* _.isArray('abc');
* // => false
*
* _.isArray(_.noop);
* // => false
*/
var isArray$1 = Array.isArray;
//#endregion
//#region node_modules/lodash-es/_baseToString.js
/** Used as references for various `Number` constants. */
var INFINITY = Infinity;
/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
/**
* The base implementation of `_.toString` which doesn't convert nullish
* values to empty strings.
*
* @private
* @param {*} value The value to process.
* @returns {string} Returns the string.
*/
function baseToString(value) {
	if (typeof value == "string") return value;
	if (isArray$1(value)) return arrayMap(value, baseToString) + "";
	if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
//#endregion
//#region node_modules/lodash-es/toString.js
/**
* Converts `value` to a string. An empty string is returned for `null`
* and `undefined` values. The sign of `-0` is preserved.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
* @example
*
* _.toString(null);
* // => ''
*
* _.toString(-0);
* // => '-0'
*
* _.toString([1, 2, 3]);
* // => '1,2,3'
*/
function toString(value) {
	return value == null ? "" : baseToString(value);
}
//#endregion
//#region node_modules/lodash-es/_baseSlice.js
/**
* The base implementation of `_.slice` without an iteratee call guard.
*
* @private
* @param {Array} array The array to slice.
* @param {number} [start=0] The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the slice of `array`.
*/
function baseSlice(array, start, end) {
	var index = -1, length = array.length;
	if (start < 0) start = -start > length ? 0 : length + start;
	end = end > length ? length : end;
	if (end < 0) end += length;
	length = start > end ? 0 : end - start >>> 0;
	start >>>= 0;
	var result = Array(length);
	while (++index < length) result[index] = array[index + start];
	return result;
}
//#endregion
//#region node_modules/lodash-es/_castSlice.js
/**
* Casts `array` to a slice if it's needed.
*
* @private
* @param {Array} array The array to inspect.
* @param {number} start The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the cast slice.
*/
function castSlice(array, start, end) {
	var length = array.length;
	end = end === void 0 ? length : end;
	return !start && end >= length ? array : baseSlice(array, start, end);
}
//#endregion
//#region node_modules/lodash-es/_hasUnicode.js
/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");
/**
* Checks if `string` contains Unicode symbols.
*
* @private
* @param {string} string The string to inspect.
* @returns {boolean} Returns `true` if a symbol is found, else `false`.
*/
function hasUnicode(string) {
	return reHasUnicode.test(string);
}
//#endregion
//#region node_modules/lodash-es/_asciiToArray.js
/**
* Converts an ASCII `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function asciiToArray(string) {
	return string.split("");
}
//#endregion
//#region node_modules/lodash-es/_unicodeToArray.js
/** Used to compose unicode character classes. */
var rsAstralRange = "\\ud800-\\udfff", rsComboRange = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", rsVarRange = "\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */
var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
/** Used to compose unicode regexes. */
var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [
	rsNonAstral,
	rsRegional,
	rsSurrPair
].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [
	rsNonAstral + rsCombo + "?",
	rsCombo,
	rsRegional,
	rsSurrPair,
	rsAstral
].join("|") + ")";
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
/**
* Converts a Unicode `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function unicodeToArray(string) {
	return string.match(reUnicode) || [];
}
//#endregion
//#region node_modules/lodash-es/_stringToArray.js
/**
* Converts `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function stringToArray(string) {
	return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
//#endregion
//#region node_modules/lodash-es/_createCaseFirst.js
/**
* Creates a function like `_.lowerFirst`.
*
* @private
* @param {string} methodName The name of the `String` case method to use.
* @returns {Function} Returns the new case function.
*/
function createCaseFirst(methodName) {
	return function(string) {
		string = toString(string);
		var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
		var chr = strSymbols ? strSymbols[0] : string.charAt(0);
		var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
		return chr[methodName]() + trailing;
	};
}
//#endregion
//#region node_modules/lodash-es/upperFirst.js
/**
* Converts the first character of `string` to upper case.
*
* @static
* @memberOf _
* @since 4.0.0
* @category String
* @param {string} [string=''] The string to convert.
* @returns {string} Returns the converted string.
* @example
*
* _.upperFirst('fred');
* // => 'Fred'
*
* _.upperFirst('FRED');
* // => 'FRED'
*/
var upperFirst = createCaseFirst("toUpperCase");
//#endregion
//#region node_modules/lodash-es/capitalize.js
/**
* Converts the first character of `string` to upper case and the remaining
* to lower case.
*
* @static
* @memberOf _
* @since 3.0.0
* @category String
* @param {string} [string=''] The string to capitalize.
* @returns {string} Returns the capitalized string.
* @example
*
* _.capitalize('FRED');
* // => 'Fred'
*/
function capitalize(string) {
	return upperFirst(toString(string).toLowerCase());
}
var package_default = {
	name: "lynxhub",
	productName: "LynxHub",
	desktopName: "ai.kindabrazy.lynxhub.desktop",
	version: "3.5.6",
	type: "module",
	description: "Cross-platform, extensible terminal/browser for AI management",
	main: "./out/main/index.cjs",
	author: {
		"name": "KindaBrazy",
		"email": "kindofbrazy@gmail.com"
	},
	repository: {
		"type": "git",
		"url": "https://github.com/KindaBrazy/LynxHub"
	},
	license: "AGPL-3.0",
	homepage: "https://github.com/KindaBrazy/LynxHub",
	appDetails: {
		"title": "LynxHub",
		"buildNumber": 53,
		"detailedDescription": "Open-source, cross-platform terminal and browser, designed for managing AI. Highly modular and extensible, it's the all-in-one environment for AI power users.",
		"moduleApiVersion": "2.1.0",
		"extensionApiVersion": "2.2.0"
	},
	scripts: {
		"typecheck:node": "tsc --noEmit -p tsconfig.node.json --composite false",
		"typecheck:web": "tsc --noEmit -p tsconfig.web.json --composite false",
		"typecheck": "npm run typecheck:node && npm run typecheck:web",
		"fix-linter:web": "prettier --write src/renderer --list-different && eslint --fix src/renderer && tailwind-lint --auto --fix",
		"fix-linter:node": "prettier --write src/main --list-different && eslint --fix src/main",
		"fix-linter": "prettier --write src --list-different && eslint --fix src && tailwind-lint --auto --fix",
		"fix-linter-ext": "prettier --write extension --list-different && eslint --fix extension && tailwind-lint --config ./extension/src/renderer/index.css --fix",
		"validate:web": "npm run fix-linter:web && npm run typecheck:web",
		"validate:node": "npm run fix-linter:node && npm run typecheck:node",
		"validate:ext": "npm run fix-linter-ext && npm run typecheck",
		"validate": "npm run fix-linter && npm run typecheck",
		"preview": "electron-vite preview --noSandbox",
		"preview:skip": "electron-vite preview --noSandbox --skipBuild",
		"dev": "run-script-os",
		"dev:win32": "electron-vite dev",
		"dev:default": "electron-vite dev --noSandbox",
		"prof": "electron-vite dev -w --noSandbox -- --js-flags=\"--prof\"",
		"dev:srouce": "electron-vite dev -w --noSandbox --sourcemap",
		"postinstall": "node node_modules/electron/install.js && electron-builder install-app-deps",
		"build": "electron-vite build",
		"rebuild": "electron-builder node-gyp-rebuild",
		"removeDotExtension": "node fixExtension.js",
		"build:extension": "rimraf extension_out && electron-vite build --config extension/electron.vite.config.ts && npm run removeDotExtension",
		"build:module": "rimraf module_out && npx --prefix module rolldown --config module/rolldown.config.mjs",
		"build:unpack": "npm run build && electron-builder --dir --config electron-builder_x64.config.cjs",
		"build:win_x64": "npm run build && electron-builder --win --config electron-builder_x64.config.cjs --publish never",
		"build:win_arm": "npm run build && electron-builder --win --config electron-builder_arm.config.cjs --publish never",
		"build:win_portable_x64": "npm run build && electron-builder --win --config electron-builder-portable_x64.config.cjs --publish never",
		"build:win_portable_arm": "npm run build && electron-builder --win --config electron-builder-portable_arm.config.cjs --publish never",
		"build:linux_x64": "npm run build && electron-builder --linux --config electron-builder_x64.config.cjs --publish never",
		"build:linux_arm": "npm run build && electron-builder --linux --config electron-builder_arm.config.cjs --publish never",
		"build:linux_portable_x64": "npm run build && electron-builder --linux --config electron-builder-portable_x64.config.cjs --publish never",
		"build:linux_portable_arm": "npm run build && electron-builder --linux --config electron-builder-portable_arm.config.cjs --publish never",
		"build:mac_x64": "npm run build && electron-builder --mac --config electron-builder_x64.config.cjs --publish never",
		"build:mac_arm": "npm run build && electron-builder --mac --config electron-builder_arm.config.cjs --publish never",
		"build:linux-test": "npm run build && electron-builder --linux --config electron-builder-test.config.cjs --publish never",
		"release": "electron-builder",
		"publish": "electron-builder -p always --config electron-builder_x64.config.cjs"
	},
	dependencies: {
		"@electron-toolkit/preload": "^3.0.2",
		"@electron-toolkit/utils": "^4.0.0",
		"@originjs/vite-plugin-federation": "^1.4.1",
		"@sentry/electron": "^7.15.0",
		"@sentry/react": "^10.62.0",
		"axios": "^1.18.1",
		"fix-path": "^5.0.0",
		"fuse.js": "^7.4.2",
		"graceful-fs": "^4.2.11",
		"lowdb": "^7.0.1",
		"node-pty": "^1.2.0-beta.13",
		"prism-react-renderer": "^2.4.1",
		"react-syntax-highlighter": "^16.1.1",
		"semver": "^7.8.5",
		"tree-kill": "^1.2.2",
		"zustand": "^5.0.14"
	},
	devDependencies: {
		"@electron-toolkit/eslint-config-prettier": "^3.0.0",
		"@electron-toolkit/tsconfig": "^2.0.0",
		"@eslint/js": "^10.0.1",
		"@heroui/react": "^3.2.2",
		"@heroui/styles": "^3.2.2",
		"@icons-pack/react-simple-icons": "^13.13.0",
		"@number-flow/react": "^0.6.1",
		"@reduxjs/toolkit": "^2.12.0",
		"@sentry/vite-plugin": "^5.3.0",
		"@solar-icons/react-perf": "^2.1.1",
		"@tailwindcss/typography": "^0.5.20",
		"@tailwindcss/vite": "^4.3.2",
		"@types/decompress": "^4.2.7",
		"@types/fontfaceobserver": "^2.1.3",
		"@types/graceful-fs": "^4.1.9",
		"@types/lodash-es": "^4.17.12",
		"@types/node": "^24.13.2",
		"@types/react": "^19.2.17",
		"@types/react-dom": "^19.2.3",
		"@types/react-highlight-words": "^0.20.1",
		"@types/react-syntax-highlighter": "^15.5.13",
		"@types/semver": "^7.7.1",
		"@types/serve-handler": "^6.1.4",
		"@vitejs/plugin-react": "^6.0.3",
		"@xterm/addon-canvas": "^0.7.0",
		"@xterm/addon-clipboard": "^0.2.0",
		"@xterm/addon-fit": "^0.11.0",
		"@xterm/addon-ligatures": "^0.10.0",
		"@xterm/addon-progress": "^0.2.0",
		"@xterm/addon-search": "^0.16.0",
		"@xterm/addon-serialize": "^0.14.0",
		"@xterm/addon-unicode11": "^0.9.0",
		"@xterm/addon-web-links": "^0.12.0",
		"@xterm/addon-webgl": "^0.19.0",
		"@xterm/xterm": "^6.0.0",
		"chokidar": "^5.0.0",
		"decompress": "^4.2.1",
		"electron": "^43.1.0",
		"electron-builder": "^26.15.3",
		"electron-dl": "^4.0.0",
		"electron-log": "^5.4.4",
		"electron-updater": "^6.8.9",
		"electron-vite": "^6.0.0-beta.1",
		"eslint": "^10.6.0",
		"eslint-plugin-jsx-a11y": "^6.10.2",
		"eslint-plugin-perfectionist": "^5.10.0",
		"eslint-plugin-react": "^7.37.5",
		"eslint-plugin-react-hooks": "^7.1.1",
		"eslint-plugin-simple-import-sort": "^13.0.0",
		"fontfaceobserver": "^2.3.0",
		"framer-motion": "^12.42.2",
		"globals": "^17.7.0",
		"lodash-es": "^4.18.1",
		"lucide-react": "^1.24.0",
		"normalize-url": "^9.0.1",
		"ogl": "^1.0.11",
		"prettier": "^3.9.5",
		"react": "^19.2.7",
		"react-dom": "^19.2.7",
		"react-error-boundary": "^6.1.2",
		"react-highlight-words": "^0.21.0",
		"react-intersection-observer": "^10.0.3",
		"react-markdown": "^10.1.0",
		"react-redux": "^9.3.0",
		"rehype-highlight": "^7.0.2",
		"rehype-raw": "^7.0.0",
		"rehype-slug": "^6.0.0",
		"remark-gfm": "^4.0.1",
		"run-script-os": "^1.1.6",
		"simple-git": "^3.36.0",
		"tailwind-lint": "^0.12.0",
		"tailwindcss": "^4.3.2",
		"three": "^0.185.1",
		"typescript": "^6.0.3",
		"typescript-eslint": "^8.63.0",
		"vite": "^8.1.4"
	},
	allowScripts: {
		"electron": true,
		"esbuild": true,
		"node-pty": true,
		"@sentry/cli": true
	}
};
//#endregion
//#region src/common/consts/index.ts
/** Application name from package.json */
var APP_NAME = package_default.appDetails.title;
/** Application version from package.json */
var APP_VERSION = package_default.version;
package_default.appDetails.buildNumber;
package_default.description;
package_default.author.name;
package_default.appDetails.detailedDescription;
`${package_default.homepage}`;
package_default.author.email;
`${package_default.repository.url}`;
`${package_default.repository.url}`;
package_default.license;
package_default.appDetails.moduleApiVersion;
package_default.appDetails.extensionApiVersion;
/** Application version with 'V' prefix */
var APP_VERSION_V = `V${APP_VERSION}`;
`${APP_NAME}${APP_VERSION}`;
`${APP_NAME}${APP_VERSION_V}`;
APP_VERSION_V.split("-").map((v) => capitalize(v)).join(" ");
/**
* Page IDs used for navigation.
*/
var PageID = {
	home: "home_page",
	imageGen: "imageGen_page",
	textGen: "textGen_page",
	audioGen: "audioGen_page",
	tools: "tools_page",
	games: "games_page",
	others: "others_page",
	agents: "agents_page",
	dashboard: "dashboard_page",
	plugins: "plugins_page",
	settings: "settings_page"
};
PageID.home, PageID.imageGen, PageID.textGen, PageID.audioGen, PageID.tools, PageID.games, PageID.others, PageID.agents, PageID.dashboard, PageID.plugins, PageID.settings;
//#endregion
//#region src/renderer/mainWindow/utils/constants.tsx
/**
* Default tab descriptor used when creating or resetting tabs.
*/
var defaultTabItem = {
	id: "tab",
	title: "Home",
	isLoading: false,
	isTerminal: false,
	pageID: PageID.home,
	favIcon: {
		show: false,
		url: ""
	}
};
//#endregion
//#region node_modules/redux/dist/redux.mjs
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
`${/* @__PURE__ */ randomString()}`, `${/* @__PURE__ */ randomString()}`;
function isPlainObject$1(obj) {
	if (typeof obj !== "object" || obj === null) return false;
	let proto = obj;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
function isAction(action) {
	return isPlainObject$1(action) && "type" in action && typeof action.type === "string";
}
//#endregion
//#region node_modules/immer/dist/immer.mjs
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
	throw new Error(`[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`);
}
var O = Object;
var getPrototypeOf = O.getPrototypeOf;
var CONSTRUCTOR = "constructor";
var PROTOTYPE = "prototype";
var CONFIGURABLE = "configurable";
var ENUMERABLE = "enumerable";
var WRITABLE = "writable";
var VALUE = "value";
var isDraft = (value) => !!value && !!value[DRAFT_STATE];
function isDraftable(value) {
	if (!value) return false;
	return isPlainObject(value) || isArray(value) || !!value[DRAFTABLE] || !!value[CONSTRUCTOR]?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = O[PROTOTYPE][CONSTRUCTOR].toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject(value) {
	if (!value || !isObjectish(value)) return false;
	const proto = getPrototypeOf(value);
	if (proto === null || proto === O[PROTOTYPE]) return true;
	const Ctor = O.hasOwnProperty.call(proto, CONSTRUCTOR) && proto[CONSTRUCTOR];
	if (Ctor === Object) return true;
	if (!isFunction(Ctor)) return false;
	let ctorString = cachedCtorStrings.get(Ctor);
	if (ctorString === void 0) {
		ctorString = Function.toString.call(Ctor);
		cachedCtorStrings.set(Ctor, ctorString);
	}
	return ctorString === objectCtorString;
}
function each(obj, iter, strict = true) {
	if (getArchtype(obj) === 0) (strict ? Reflect.ownKeys(obj) : O.keys(obj)).forEach((key) => {
		iter(key, obj[key], obj);
	});
	else obj.forEach((entry, index) => iter(index, entry, obj));
}
function getArchtype(thing) {
	const state = thing[DRAFT_STATE];
	return state ? state.type_ : isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
var has = (thing, prop, type = getArchtype(thing)) => type === 2 ? thing.has(prop) : O[PROTOTYPE].hasOwnProperty.call(thing, prop);
var get = (thing, prop, type = getArchtype(thing)) => type === 2 ? thing.get(prop) : thing[prop];
var set = (thing, propOrOldValue, value, type = getArchtype(thing)) => {
	if (type === 2) thing.set(propOrOldValue, value);
	else if (type === 3) thing.add(value);
	else thing[propOrOldValue] = value;
};
function is(x, y) {
	if (x === y) return x !== 0 || 1 / x === 1 / y;
	else return x !== x && y !== y;
}
var isArray = Array.isArray;
var isMap = (target) => target instanceof Map;
var isSet = (target) => target instanceof Set;
var isObjectish = (target) => typeof target === "object";
var isFunction = (target) => typeof target === "function";
var isBoolean = (target) => typeof target === "boolean";
function isArrayIndex(value) {
	const n = +value;
	return Number.isInteger(n) && String(n) === value;
}
var latest = (state) => state.copy_ || state.base_;
var getFinalValue = (state) => state.modified_ ? state.copy_ : state.base_;
function shallowCopy(base, strict) {
	if (isMap(base)) return new Map(base);
	if (isSet(base)) return new Set(base);
	if (isArray(base)) return Array[PROTOTYPE].slice.call(base);
	const isPlain = isPlainObject(base);
	if (strict === true || strict === "class_only" && !isPlain) {
		const descriptors = O.getOwnPropertyDescriptors(base);
		delete descriptors[DRAFT_STATE];
		let keys = Reflect.ownKeys(descriptors);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const desc = descriptors[key];
			if (desc[WRITABLE] === false) {
				desc[WRITABLE] = true;
				desc[CONFIGURABLE] = true;
			}
			if (desc.get || desc.set) descriptors[key] = {
				[CONFIGURABLE]: true,
				[WRITABLE]: true,
				[ENUMERABLE]: desc[ENUMERABLE],
				[VALUE]: base[key]
			};
		}
		return O.create(getPrototypeOf(base), descriptors);
	} else {
		const proto = getPrototypeOf(base);
		if (proto !== null && isPlain) return { ...base };
		const obj = O.create(proto);
		return O.assign(obj, base);
	}
}
function freeze(obj, deep = false) {
	if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj)) return obj;
	if (getArchtype(obj) > 1) O.defineProperties(obj, {
		set: dontMutateMethodOverride,
		add: dontMutateMethodOverride,
		clear: dontMutateMethodOverride,
		delete: dontMutateMethodOverride
	});
	O.freeze(obj);
	if (deep) each(obj, (_key, value) => {
		freeze(value, true);
	}, false);
	return obj;
}
function dontMutateFrozenCollections() {
	die(2);
}
var dontMutateMethodOverride = { [VALUE]: dontMutateFrozenCollections };
function isFrozen(obj) {
	if (obj === null || !isObjectish(obj)) return true;
	return O.isFrozen(obj);
}
var PluginMapSet = "MapSet";
var PluginPatches = "Patches";
var PluginArrayMethods = "ArrayMethods";
var plugins = {};
function getPlugin(pluginKey) {
	const plugin = plugins[pluginKey];
	if (!plugin) die(0, pluginKey);
	return plugin;
}
var isPluginLoaded = (pluginKey) => !!plugins[pluginKey];
var currentScope;
var getCurrentScope = () => currentScope;
var createScope = (parent_, immer_) => ({
	drafts_: [],
	parent_,
	immer_,
	canAutoFreeze_: true,
	unfinalizedDrafts_: 0,
	handledSet_: /* @__PURE__ */ new Set(),
	processedForPatches_: /* @__PURE__ */ new Set(),
	mapSetPlugin_: isPluginLoaded(PluginMapSet) ? getPlugin(PluginMapSet) : void 0,
	arrayMethodsPlugin_: isPluginLoaded(PluginArrayMethods) ? getPlugin(PluginArrayMethods) : void 0
});
function usePatchesInScope(scope, patchListener) {
	if (patchListener) {
		scope.patchPlugin_ = getPlugin(PluginPatches);
		scope.patches_ = [];
		scope.inversePatches_ = [];
		scope.patchListener_ = patchListener;
	}
}
function revokeScope(scope) {
	leaveScope(scope);
	scope.drafts_.forEach(revokeDraft);
	scope.drafts_ = null;
}
function leaveScope(scope) {
	if (scope === currentScope) currentScope = scope.parent_;
}
var enterScope = (immer2) => currentScope = createScope(currentScope, immer2);
function revokeDraft(draft) {
	const state = draft[DRAFT_STATE];
	if (state.type_ === 0 || state.type_ === 1) state.revoke_();
	else state.revoked_ = true;
}
function processResult(result, scope) {
	scope.unfinalizedDrafts_ = scope.drafts_.length;
	const baseDraft = scope.drafts_[0];
	if (result !== void 0 && result !== baseDraft) {
		if (baseDraft[DRAFT_STATE].modified_) {
			revokeScope(scope);
			die(4);
		}
		if (isDraftable(result)) result = finalize(scope, result);
		const { patchPlugin_ } = scope;
		if (patchPlugin_) patchPlugin_.generateReplacementPatches_(baseDraft[DRAFT_STATE].base_, result, scope);
	} else result = finalize(scope, baseDraft);
	maybeFreeze(scope, result, true);
	revokeScope(scope);
	if (scope.patches_) scope.patchListener_(scope.patches_, scope.inversePatches_);
	return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value) {
	if (isFrozen(value)) return value;
	const state = value[DRAFT_STATE];
	if (!state) return handleValue(value, rootScope.handledSet_, rootScope);
	if (!isSameScope(state, rootScope)) return value;
	if (!state.modified_) return state.base_;
	if (!state.finalized_) {
		const { callbacks_ } = state;
		if (callbacks_) while (callbacks_.length > 0) callbacks_.pop()(rootScope);
		generatePatchesAndFinalize(state, rootScope);
	}
	return state.copy_;
}
function maybeFreeze(scope, value, deep = false) {
	if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) freeze(value, deep);
}
function markStateFinalized(state) {
	state.finalized_ = true;
	state.scope_.unfinalizedDrafts_--;
}
var isSameScope = (state, rootScope) => state.scope_ === rootScope;
var EMPTY_LOCATIONS_RESULT = [];
function updateDraftInParent(parent, draftValue, finalizedValue, originalKey) {
	const parentCopy = latest(parent);
	const parentType = parent.type_;
	if (originalKey !== void 0) {
		if (get(parentCopy, originalKey, parentType) === draftValue) {
			set(parentCopy, originalKey, finalizedValue, parentType);
			return;
		}
	}
	if (!parent.draftLocations_) {
		const draftLocations = parent.draftLocations_ = /* @__PURE__ */ new Map();
		each(parentCopy, (key, value) => {
			if (isDraft(value)) {
				const keys = draftLocations.get(value) || [];
				keys.push(key);
				draftLocations.set(value, keys);
			}
		});
	}
	const locations = parent.draftLocations_.get(draftValue) ?? EMPTY_LOCATIONS_RESULT;
	for (const location of locations) set(parentCopy, location, finalizedValue, parentType);
}
function registerChildFinalizationCallback(parent, child, key) {
	parent.callbacks_.push(function childCleanup(rootScope) {
		const state = child;
		if (!state || !isSameScope(state, rootScope)) return;
		rootScope.mapSetPlugin_?.fixSetContents(state);
		const finalizedValue = getFinalValue(state);
		updateDraftInParent(parent, state.draft_ ?? state, finalizedValue, key);
		generatePatchesAndFinalize(state, rootScope);
	});
}
function generatePatchesAndFinalize(state, rootScope) {
	if (state.modified_ && !state.finalized_ && (state.type_ === 3 || state.type_ === 1 && state.allIndicesReassigned_ || (state.assigned_?.size ?? 0) > 0)) {
		const { patchPlugin_ } = rootScope;
		if (patchPlugin_) {
			const basePath = patchPlugin_.getPath(state);
			if (basePath) patchPlugin_.generatePatches_(state, basePath, rootScope);
		}
		markStateFinalized(state);
	}
}
function handleCrossReference(target, key, value) {
	const { scope_ } = target;
	if (isDraft(value)) {
		const state = value[DRAFT_STATE];
		if (isSameScope(state, scope_)) state.callbacks_.push(function crossReferenceCleanup() {
			prepareCopy(target);
			updateDraftInParent(target, value, getFinalValue(state), key);
		});
	} else if (isDraftable(value)) target.callbacks_.push(function nestedDraftCleanup() {
		const targetCopy = latest(target);
		if (target.type_ === 3) {
			if (targetCopy.has(value)) handleValue(value, scope_.handledSet_, scope_);
		} else if (get(targetCopy, key, target.type_) === value) {
			if (scope_.drafts_.length > 1 && (target.assigned_.get(key) ?? false) === true && target.copy_) handleValue(get(target.copy_, key, target.type_), scope_.handledSet_, scope_);
		}
	});
}
function handleValue(target, handledSet, rootScope) {
	if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) return target;
	if (isDraft(target) || handledSet.has(target) || !isDraftable(target) || isFrozen(target)) return target;
	handledSet.add(target);
	each(target, (key, value) => {
		if (isDraft(value)) {
			const state = value[DRAFT_STATE];
			if (isSameScope(state, rootScope)) {
				set(target, key, getFinalValue(state), target.type_);
				markStateFinalized(state);
			}
		} else if (isDraftable(value)) handleValue(value, handledSet, rootScope);
	});
	return target;
}
function createProxyProxy(base, parent) {
	const baseIsArray = isArray(base);
	const state = {
		type_: baseIsArray ? 1 : 0,
		scope_: parent ? parent.scope_ : getCurrentScope(),
		modified_: false,
		finalized_: false,
		assigned_: void 0,
		parent_: parent,
		base_: base,
		draft_: null,
		copy_: null,
		revoke_: null,
		isManual_: false,
		callbacks_: void 0
	};
	let target = state;
	let traps = objectTraps;
	if (baseIsArray) {
		target = [state];
		traps = arrayTraps;
	}
	const { revoke, proxy } = Proxy.revocable(target, traps);
	state.draft_ = proxy;
	state.revoke_ = revoke;
	return [proxy, state];
}
var objectTraps = {
	get(state, prop) {
		if (prop === DRAFT_STATE) return state;
		let arrayPlugin = state.scope_.arrayMethodsPlugin_;
		const isArrayWithStringProp = state.type_ === 1 && typeof prop === "string";
		if (isArrayWithStringProp) {
			if (arrayPlugin?.isArrayOperationMethod(prop)) return arrayPlugin.createMethodInterceptor(state, prop);
		}
		const source = latest(state);
		if (!has(source, prop, state.type_)) return readPropFromProto(state, source, prop);
		const value = source[prop];
		if (state.finalized_ || !isDraftable(value)) return value;
		if (isArrayWithStringProp && state.operationMethod && arrayPlugin?.isMutatingArrayMethod(state.operationMethod) && isArrayIndex(prop)) return value;
		if (value === peek(state.base_, prop)) {
			prepareCopy(state);
			const childKey = state.type_ === 1 ? +prop : prop;
			const childDraft = createProxy(state.scope_, value, state, childKey);
			return state.copy_[childKey] = childDraft;
		}
		return value;
	},
	has(state, prop) {
		return prop in latest(state);
	},
	ownKeys(state) {
		return Reflect.ownKeys(latest(state));
	},
	set(state, prop, value) {
		const desc = getDescriptorFromProto(latest(state), prop);
		if (desc?.set) {
			desc.set.call(state.draft_, value);
			return true;
		}
		if (!state.modified_) {
			const current2 = peek(latest(state), prop);
			const currentState = current2?.[DRAFT_STATE];
			if (currentState && currentState.base_ === value) {
				state.copy_[prop] = value;
				state.assigned_.set(prop, false);
				return true;
			}
			if (is(value, current2) && (value !== void 0 || has(state.base_, prop, state.type_))) return true;
			prepareCopy(state);
			markChanged(state);
		}
		if (state.copy_[prop] === value && (value !== void 0 || prop in state.copy_) || Number.isNaN(value) && Number.isNaN(state.copy_[prop])) return true;
		state.copy_[prop] = value;
		state.assigned_.set(prop, true);
		handleCrossReference(state, prop, value);
		return true;
	},
	deleteProperty(state, prop) {
		prepareCopy(state);
		if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
			state.assigned_.set(prop, false);
			markChanged(state);
		} else state.assigned_.delete(prop);
		if (state.copy_) delete state.copy_[prop];
		return true;
	},
	getOwnPropertyDescriptor(state, prop) {
		const owner = latest(state);
		const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
		if (!desc) return desc;
		return {
			[WRITABLE]: true,
			[CONFIGURABLE]: state.type_ !== 1 || prop !== "length",
			[ENUMERABLE]: desc[ENUMERABLE],
			[VALUE]: owner[prop]
		};
	},
	defineProperty() {
		die(11);
	},
	getPrototypeOf(state) {
		return getPrototypeOf(state.base_);
	},
	setPrototypeOf() {
		die(12);
	}
};
var arrayTraps = {};
for (let key in objectTraps) {
	let fn = objectTraps[key];
	arrayTraps[key] = function() {
		const args = arguments;
		args[0] = args[0][0];
		return fn.apply(this, args);
	};
}
arrayTraps.deleteProperty = function(state, prop) {
	return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
	return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
	const state = draft[DRAFT_STATE];
	return (state ? latest(state) : draft)[prop];
}
function readPropFromProto(state, source, prop) {
	const desc = getDescriptorFromProto(source, prop);
	return desc ? VALUE in desc ? desc[VALUE] : desc.get?.call(state.draft_) : void 0;
}
function getDescriptorFromProto(source, prop) {
	if (!(prop in source)) return void 0;
	let proto = getPrototypeOf(source);
	while (proto) {
		const desc = Object.getOwnPropertyDescriptor(proto, prop);
		if (desc) return desc;
		proto = getPrototypeOf(proto);
	}
}
function markChanged(state) {
	if (!state.modified_) {
		state.modified_ = true;
		if (state.parent_) markChanged(state.parent_);
	}
}
function prepareCopy(state) {
	if (!state.copy_) {
		state.assigned_ = /* @__PURE__ */ new Map();
		state.copy_ = shallowCopy(state.base_, state.scope_.immer_.useStrictShallowCopy_);
	}
}
var Immer2 = class {
	constructor(config) {
		this.autoFreeze_ = true;
		this.useStrictShallowCopy_ = false;
		this.useStrictIteration_ = false;
		/**
		* The `produce` function takes a value and a "recipe function" (whose
		* return value often depends on the base state). The recipe function is
		* free to mutate its first argument however it wants. All mutations are
		* only ever applied to a __copy__ of the base state.
		*
		* Pass only a function to create a "curried producer" which relieves you
		* from passing the recipe function every time.
		*
		* Only plain objects and arrays are made mutable. All other objects are
		* considered uncopyable.
		*
		* Note: This function is __bound__ to its `Immer` instance.
		*
		* @param {any} base - the initial state
		* @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
		* @param {Function} patchListener - optional function that will be called with all the patches produced here
		* @returns {any} a new state, or the initial state if nothing was modified
		*/
		this.produce = (base, recipe, patchListener) => {
			if (isFunction(base) && !isFunction(recipe)) {
				const defaultBase = recipe;
				recipe = base;
				const self = this;
				return function curriedProduce(base2 = defaultBase, ...args) {
					return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
				};
			}
			if (!isFunction(recipe)) die(6);
			if (patchListener !== void 0 && !isFunction(patchListener)) die(7);
			let result;
			if (isDraftable(base)) {
				const scope = enterScope(this);
				const proxy = createProxy(scope, base, void 0);
				let hasError = true;
				try {
					result = recipe(proxy);
					hasError = false;
				} finally {
					if (hasError) revokeScope(scope);
					else leaveScope(scope);
				}
				usePatchesInScope(scope, patchListener);
				return processResult(result, scope);
			} else if (!base || !isObjectish(base)) {
				result = recipe(base);
				if (result === void 0) result = base;
				if (result === NOTHING) result = void 0;
				if (this.autoFreeze_) freeze(result, true);
				if (patchListener) {
					const p = [];
					const ip = [];
					getPlugin(PluginPatches).generateReplacementPatches_(base, result, {
						patches_: p,
						inversePatches_: ip
					});
					patchListener(p, ip);
				}
				return result;
			} else die(1, base);
		};
		this.produceWithPatches = (base, recipe) => {
			if (isFunction(base)) return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
			let patches, inversePatches;
			return [
				this.produce(base, recipe, (p, ip) => {
					patches = p;
					inversePatches = ip;
				}),
				patches,
				inversePatches
			];
		};
		if (isBoolean(config?.autoFreeze)) this.setAutoFreeze(config.autoFreeze);
		if (isBoolean(config?.useStrictShallowCopy)) this.setUseStrictShallowCopy(config.useStrictShallowCopy);
		if (isBoolean(config?.useStrictIteration)) this.setUseStrictIteration(config.useStrictIteration);
	}
	createDraft(base) {
		if (!isDraftable(base)) die(8);
		if (isDraft(base)) base = current(base);
		const scope = enterScope(this);
		const proxy = createProxy(scope, base, void 0);
		proxy[DRAFT_STATE].isManual_ = true;
		leaveScope(scope);
		return proxy;
	}
	finishDraft(draft, patchListener) {
		const state = draft && draft[DRAFT_STATE];
		if (!state || !state.isManual_) die(9);
		const { scope_: scope } = state;
		usePatchesInScope(scope, patchListener);
		return processResult(void 0, scope);
	}
	/**
	* Pass true to automatically freeze all copies created by Immer.
	*
	* By default, auto-freezing is enabled.
	*/
	setAutoFreeze(value) {
		this.autoFreeze_ = value;
	}
	/**
	* Pass true to enable strict shallow copy.
	*
	* By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
	*/
	setUseStrictShallowCopy(value) {
		this.useStrictShallowCopy_ = value;
	}
	/**
	* Pass false to use faster iteration that skips non-enumerable properties
	* but still handles symbols for compatibility.
	*
	* By default, strict iteration is enabled (includes all own properties).
	*/
	setUseStrictIteration(value) {
		this.useStrictIteration_ = value;
	}
	shouldUseStrictIteration() {
		return this.useStrictIteration_;
	}
	applyPatches(base, patches) {
		let i;
		for (i = patches.length - 1; i >= 0; i--) {
			const patch = patches[i];
			if (patch.path.length === 0 && patch.op === "replace") {
				base = patch.value;
				break;
			}
		}
		if (i > -1) patches = patches.slice(i + 1);
		const applyPatchesImpl = getPlugin(PluginPatches).applyPatches_;
		if (isDraft(base)) return applyPatchesImpl(base, patches);
		return this.produce(base, (draft) => applyPatchesImpl(draft, patches));
	}
};
function createProxy(rootScope, value, parent, key) {
	const [draft, state] = isMap(value) ? getPlugin(PluginMapSet).proxyMap_(value, parent) : isSet(value) ? getPlugin(PluginMapSet).proxySet_(value, parent) : createProxyProxy(value, parent);
	(parent?.scope_ ?? getCurrentScope()).drafts_.push(draft);
	state.callbacks_ = parent?.callbacks_ ?? [];
	state.key_ = key;
	if (parent && key !== void 0) registerChildFinalizationCallback(parent, state, key);
	else state.callbacks_.push(function rootDraftCleanup(rootScope2) {
		rootScope2.mapSetPlugin_?.fixSetContents(state);
		const { patchPlugin_ } = rootScope2;
		if (state.modified_ && patchPlugin_) patchPlugin_.generatePatches_(state, [], rootScope2);
	});
	return draft;
}
function current(value) {
	if (!isDraft(value)) die(10, value);
	return currentImpl(value);
}
function currentImpl(value) {
	if (!isDraftable(value) || isFrozen(value)) return value;
	const state = value[DRAFT_STATE];
	let copy;
	let strict = true;
	if (state) {
		if (!state.modified_) return state.base_;
		state.finalized_ = true;
		copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
		strict = state.scope_.immer_.shouldUseStrictIteration();
	} else copy = shallowCopy(value, true);
	each(copy, (key, childValue) => {
		set(copy, key, currentImpl(childValue));
	}, strict);
	if (state) state.finalized_ = false;
	return copy;
}
var produce = new Immer2().produce;
typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__;
function createAction(type, prepareAction) {
	function actionCreator(...args) {
		if (prepareAction) {
			let prepared = prepareAction(...args);
			if (!prepared) throw new Error(formatProdErrorMessage(0));
			return {
				type,
				payload: prepared.payload,
				..."meta" in prepared && { meta: prepared.meta },
				..."error" in prepared && { error: prepared.error }
			};
		}
		return {
			type,
			payload: args[0]
		};
	}
	actionCreator.toString = () => `${type}`;
	actionCreator.type = type;
	actionCreator.match = (action) => isAction(action) && action.type === type;
	return actionCreator;
}
function freezeDraftable(val) {
	return isDraftable(val) ? produce(val, () => {}) : val;
}
function getOrInsertComputed(map, key, compute) {
	if (map.has(key)) return map.get(key);
	return map.set(key, compute(key)).get(key);
}
function executeReducerBuilderCallback(builderCallback) {
	const actionsMap = {};
	const actionMatchers = [];
	let defaultCaseReducer;
	const builder = {
		addCase(typeOrActionCreator, reducer) {
			const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
			if (!type) throw new Error(formatProdErrorMessage(28));
			if (type in actionsMap) throw new Error(formatProdErrorMessage(29));
			actionsMap[type] = reducer;
			return builder;
		},
		addAsyncThunk(asyncThunk, reducers) {
			if (reducers.pending) actionsMap[asyncThunk.pending.type] = reducers.pending;
			if (reducers.rejected) actionsMap[asyncThunk.rejected.type] = reducers.rejected;
			if (reducers.fulfilled) actionsMap[asyncThunk.fulfilled.type] = reducers.fulfilled;
			if (reducers.settled) actionMatchers.push({
				matcher: asyncThunk.settled,
				reducer: reducers.settled
			});
			return builder;
		},
		addMatcher(matcher, reducer) {
			actionMatchers.push({
				matcher,
				reducer
			});
			return builder;
		},
		addDefaultCase(reducer) {
			defaultCaseReducer = reducer;
			return builder;
		}
	};
	builderCallback(builder);
	return [
		actionsMap,
		actionMatchers,
		defaultCaseReducer
	];
}
function isStateFunction(x) {
	return typeof x === "function";
}
function createReducer(initialState, mapOrBuilderCallback) {
	let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
	let getInitialState;
	if (isStateFunction(initialState)) getInitialState = () => freezeDraftable(initialState());
	else {
		const frozenInitialState = freezeDraftable(initialState);
		getInitialState = () => frozenInitialState;
	}
	function reducer(state = getInitialState(), action) {
		let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({ matcher }) => matcher(action)).map(({ reducer: reducer2 }) => reducer2)];
		if (caseReducers.filter((cr) => !!cr).length === 0) caseReducers = [finalDefaultCaseReducer];
		return caseReducers.reduce((previousState, caseReducer) => {
			if (caseReducer) if (isDraft(previousState)) {
				const result = caseReducer(previousState, action);
				if (result === void 0) return previousState;
				return result;
			} else if (!isDraftable(previousState)) {
				const result = caseReducer(previousState, action);
				if (result === void 0) {
					if (previousState === null) return previousState;
					throw Error("A case reducer on a non-draftable value must not return undefined");
				}
				return result;
			} else return produce(previousState, (draft) => {
				return caseReducer(draft, action);
			});
			return previousState;
		}, state);
	}
	reducer.getInitialState = getInitialState;
	return reducer;
}
var asyncThunkSymbol = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function getType(slice, actionKey) {
	return `${slice}/${actionKey}`;
}
function buildCreateSlice({ creators } = {}) {
	const cAT = creators?.asyncThunk?.[asyncThunkSymbol];
	return function createSlice2(options) {
		const { name, reducerPath = name } = options;
		if (!name) throw new Error(formatProdErrorMessage(11));
		const reducers = (typeof options.reducers === "function" ? options.reducers(buildReducerCreators()) : options.reducers) || {};
		const reducerNames = Object.keys(reducers);
		const context = {
			sliceCaseReducersByName: {},
			sliceCaseReducersByType: {},
			actionCreators: {},
			sliceMatchers: []
		};
		const contextMethods = {
			addCase(typeOrActionCreator, reducer2) {
				const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
				if (!type) throw new Error(formatProdErrorMessage(12));
				if (type in context.sliceCaseReducersByType) throw new Error(formatProdErrorMessage(13));
				context.sliceCaseReducersByType[type] = reducer2;
				return contextMethods;
			},
			addMatcher(matcher, reducer2) {
				context.sliceMatchers.push({
					matcher,
					reducer: reducer2
				});
				return contextMethods;
			},
			exposeAction(name2, actionCreator) {
				context.actionCreators[name2] = actionCreator;
				return contextMethods;
			},
			exposeCaseReducer(name2, reducer2) {
				context.sliceCaseReducersByName[name2] = reducer2;
				return contextMethods;
			}
		};
		reducerNames.forEach((reducerName) => {
			const reducerDefinition = reducers[reducerName];
			const reducerDetails = {
				reducerName,
				type: getType(name, reducerName),
				createNotation: typeof options.reducers === "function"
			};
			if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) handleThunkCaseReducerDefinition(reducerDetails, reducerDefinition, contextMethods, cAT);
			else handleNormalReducerDefinition(reducerDetails, reducerDefinition, contextMethods);
		});
		function buildReducer() {
			const [extraReducers = {}, actionMatchers = [], defaultCaseReducer = void 0] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
			const finalCaseReducers = {
				...extraReducers,
				...context.sliceCaseReducersByType
			};
			return createReducer(options.initialState, (builder) => {
				for (let key in finalCaseReducers) builder.addCase(key, finalCaseReducers[key]);
				for (let sM of context.sliceMatchers) builder.addMatcher(sM.matcher, sM.reducer);
				for (let m of actionMatchers) builder.addMatcher(m.matcher, m.reducer);
				if (defaultCaseReducer) builder.addDefaultCase(defaultCaseReducer);
			});
		}
		const selectSelf = (state) => state;
		const injectedSelectorCache = /* @__PURE__ */ new Map();
		const injectedStateCache = /* @__PURE__ */ new WeakMap();
		let _reducer;
		function reducer(state, action) {
			if (!_reducer) _reducer = buildReducer();
			return _reducer(state, action);
		}
		function getInitialState() {
			if (!_reducer) _reducer = buildReducer();
			return _reducer.getInitialState();
		}
		function makeSelectorProps(reducerPath2, injected = false) {
			function selectSlice(state) {
				let sliceState = state[reducerPath2];
				if (typeof sliceState === "undefined") {
					if (injected) sliceState = getOrInsertComputed(injectedStateCache, selectSlice, getInitialState);
				}
				return sliceState;
			}
			function getSelectors(selectState = selectSelf) {
				return getOrInsertComputed(getOrInsertComputed(injectedSelectorCache, injected, () => /* @__PURE__ */ new WeakMap()), selectState, () => {
					const map = {};
					for (const [name2, selector] of Object.entries(options.selectors ?? {})) map[name2] = wrapSelector(selector, selectState, () => getOrInsertComputed(injectedStateCache, selectState, getInitialState), injected);
					return map;
				});
			}
			return {
				reducerPath: reducerPath2,
				getSelectors,
				get selectors() {
					return getSelectors(selectSlice);
				},
				selectSlice
			};
		}
		const slice = {
			name,
			reducer,
			actions: context.actionCreators,
			caseReducers: context.sliceCaseReducersByName,
			getInitialState,
			...makeSelectorProps(reducerPath),
			injectInto(injectable, { reducerPath: pathOpt, ...config } = {}) {
				const newReducerPath = pathOpt ?? reducerPath;
				injectable.inject({
					reducerPath: newReducerPath,
					reducer
				}, config);
				return {
					...slice,
					...makeSelectorProps(newReducerPath, true)
				};
			}
		};
		return slice;
	};
}
function wrapSelector(selector, selectState, getInitialState, injected) {
	function wrapper(rootState, ...args) {
		let sliceState = selectState(rootState);
		if (typeof sliceState === "undefined") {
			if (injected) sliceState = getInitialState();
		}
		return selector(sliceState, ...args);
	}
	wrapper.unwrapped = selector;
	return wrapper;
}
var createSlice = /* @__PURE__ */ buildCreateSlice();
function buildReducerCreators() {
	function asyncThunk(payloadCreator, config) {
		return {
			_reducerDefinitionType: "asyncThunk",
			payloadCreator,
			...config
		};
	}
	asyncThunk.withTypes = () => asyncThunk;
	return {
		reducer(caseReducer) {
			return Object.assign({ [caseReducer.name](...args) {
				return caseReducer(...args);
			} }[caseReducer.name], { _reducerDefinitionType: "reducer" });
		},
		preparedReducer(prepare, reducer) {
			return {
				_reducerDefinitionType: "reducerWithPrepare",
				prepare,
				reducer
			};
		},
		asyncThunk
	};
}
function handleNormalReducerDefinition({ type, reducerName, createNotation }, maybeReducerWithPrepare, context) {
	let caseReducer;
	let prepareCallback;
	if ("reducer" in maybeReducerWithPrepare) {
		if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) throw new Error(formatProdErrorMessage(17));
		caseReducer = maybeReducerWithPrepare.reducer;
		prepareCallback = maybeReducerWithPrepare.prepare;
	} else caseReducer = maybeReducerWithPrepare;
	context.addCase(type, caseReducer).exposeCaseReducer(reducerName, caseReducer).exposeAction(reducerName, prepareCallback ? createAction(type, prepareCallback) : createAction(type));
}
function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
	return reducerDefinition._reducerDefinitionType === "asyncThunk";
}
function isCaseReducerWithPrepareDefinition(reducerDefinition) {
	return reducerDefinition._reducerDefinitionType === "reducerWithPrepare";
}
function handleThunkCaseReducerDefinition({ type, reducerName }, reducerDefinition, context, cAT) {
	if (!cAT) throw new Error(formatProdErrorMessage(18));
	const { payloadCreator, fulfilled, pending, rejected, settled, options } = reducerDefinition;
	const thunk = cAT(type, payloadCreator, options);
	context.exposeAction(reducerName, thunk);
	if (fulfilled) context.addCase(thunk.fulfilled, fulfilled);
	if (pending) context.addCase(thunk.pending, pending);
	if (rejected) context.addCase(thunk.rejected, rejected);
	if (settled) context.addMatcher(thunk.settled, settled);
	context.exposeCaseReducer(reducerName, {
		fulfilled: fulfilled || noop,
		pending: pending || noop,
		rejected: rejected || noop,
		settled: settled || noop
	});
}
function noop() {}
var listener = "listener";
var completed = "completed";
var cancelled = "cancelled";
`${cancelled}`;
`${completed}`;
`${listener}${cancelled}`;
`${listener}${completed}`;
var { assign } = Object;
var alm = "listenerMiddleware";
var addListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/add`), { withTypes: () => addListener });
`${alm}`;
var removeListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/remove`), { withTypes: () => removeListener });
function formatProdErrorMessage(code) {
	return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
//#endregion
//#region src/renderer/mainWindow/redux/reducers/tabs.ts
var { useSelector: useSelector$2 } = await importShared("react-redux");
var findUniqueTabId = (baseId, tabs) => {
	let idNumber = 1;
	let candidateId = baseId;
	while (tabs.some((tab) => tab.id === candidateId)) {
		candidateId = `${baseId}_${idNumber}`;
		idNumber += 1;
	}
	return candidateId;
};
var updateTabById = (tabs, tabID, updater) => tabs.map((tab) => tab.id === tabID ? updater(tab) : tab);
var tabsSlice = createSlice({
	name: "tabs",
	initialState: {
		tabs: [defaultTabItem],
		activeTab: defaultTabItem.id,
		activePage: defaultTabItem.pageID,
		prevTab: ""
	},
	reducers: {
		setTabState: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
		addTab: (state, action) => {
			const { background, ...nextTabPayload } = action.payload;
			const newID = findUniqueTabId(nextTabPayload.id, state.tabs);
			state.tabs.push({
				...nextTabPayload,
				id: newID
			});
			if (!background) {
				state.activeTab = newID;
				state.activePage = nextTabPayload.pageID;
			}
		},
		removeTab: (state, action) => {
			const tabIdToRemove = action.payload;
			const tabIndexToRemove = state.tabs.findIndex((tab) => tab.id === tabIdToRemove);
			state.tabs = state.tabs.filter((tab) => tab.id !== tabIdToRemove);
			if (state.activeTab === tabIdToRemove) if (state.tabs.length > 0) {
				const newActiveTabIndex = Math.min(tabIndexToRemove, state.tabs.length - 1);
				state.activeTab = state.tabs[newActiveTabIndex].id;
				state.activePage = state.tabs[newActiveTabIndex].pageID;
			} else {
				state.activeTab = defaultTabItem.id;
				state.activePage = defaultTabItem.pageID;
			}
			if (state.tabs.length <= 0) state.tabs = [defaultTabItem];
		},
		setActiveTab: (state, action) => {
			state.prevTab = state.activeTab;
			state.activeTab = action.payload;
			state.activePage = state.tabs.find((tab) => tab.id === action.payload)?.pageID || defaultTabItem.pageID;
		},
		switchTab: (state, action) => {
			if (state.tabs.length <= 1) return;
			const currentIndex = state.tabs.findIndex((tab) => tab.id === state.activeTab);
			if (currentIndex === -1) return;
			const direction = action.payload?.direction || "next";
			let nextIndex;
			if (direction === "next") nextIndex = (currentIndex + 1) % state.tabs.length;
			else nextIndex = (currentIndex - 1 + state.tabs.length) % state.tabs.length;
			state.prevTab = state.activeTab;
			state.activeTab = state.tabs[nextIndex].id;
			state.activePage = state.tabs[nextIndex].pageID;
		},
		setTabLoading: (state, action) => {
			const { tabID, isLoading } = action.payload;
			state.tabs = updateTabById(state.tabs, tabID, (tab) => ({
				...tab,
				isLoading
			}));
		},
		setActiveTabLoading: (state, action) => {
			state.tabs = updateTabById(state.tabs, state.activeTab, (tab) => ({
				...tab,
				isLoading: action.payload
			}));
		},
		setTabTitle: (state, action) => {
			const { tabID, title } = action.payload;
			state.tabs = updateTabById(state.tabs, tabID, (tab) => ({
				...tab,
				title
			}));
		},
		setTabIsTerminal: (state, action) => {
			const { tabID, isTerminal } = action.payload;
			state.tabs = updateTabById(state.tabs, tabID, (tab) => ({
				...tab,
				isTerminal
			}));
		},
		setActiveTabTitle: (state, action) => {
			state.tabs = updateTabById(state.tabs, state.activeTab, (tab) => ({
				...tab,
				title: action.payload
			}));
		},
		setTabFavIcon: (state, action) => {
			const { tabID, ...favIcon } = action.payload;
			state.tabs = updateTabById(state.tabs, tabID, (tab) => ({
				...tab,
				favIcon
			}));
		},
		setTabProgress: (state, action) => {
			const { tabID, progress } = action.payload;
			state.tabs = updateTabById(state.tabs, tabID, (tab) => ({
				...tab,
				progress
			}));
		},
		setActivePage: (state, action) => {
			const index = state.tabs.findIndex((tab) => tab.id === state.activeTab);
			if (index !== -1) {
				const { pageID, title, isTerminal } = action.payload;
				state.tabs[index] = {
					...state.tabs[index],
					pageID,
					title,
					isTerminal: isTerminal ?? false,
					favIcon: {
						show: false,
						url: ""
					}
				};
			}
			state.activePage = action.payload.pageID;
		}
	}
});
/**
* Hook to access tabs reducer state by key with inferred return type.
*/
var useTabsState = (key) => useSelector$2((state) => state.tabs[key]);
tabsSlice.actions;
tabsSlice.reducer;
//#endregion
//#region src/renderer/mainWindow/components/TabModal.tsx
var import_jsx_runtime = require_jsx_runtime();
var { Modal: Modal$4 } = await importShared("@heroui/react");
var { useEffect: useEffect$11, useState: useState$11 } = await importShared("react");
var { UNSAFE_PortalProvider } = await importShared("react-aria");
function TabModal({ isOpen, onOpenChange, children, size = "cover", isDismissable = false, backdropVariant, dialogClassName, containerClassName, isKeyboardDismissDisabled }) {
	const activeTab = useTabsState("activeTab");
	const [targetContainer, setTargetContainer] = useState$11(null);
	useEffect$11(() => {
		setTargetContainer(isOpen ? document.getElementById(`${activeTab}_wrapper`) : null);
	}, [isOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$4, {
		isOpen,
		onOpenChange,
		children: targetContainer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UNSAFE_PortalProvider, {
			getContainer: () => targetContainer,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$4.Backdrop, {
				className: "h-full",
				variant: backdropVariant,
				isDismissable,
				isKeyboardDismissDisabled,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$4.Container, {
					size,
					scroll: "inside",
					className: `h-full max-h-full ${containerClassName}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$4.Dialog, {
						className: size === "cover" ? `h-full max-h-full ${dialogClassName}` : dialogClassName,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UNSAFE_PortalProvider, {
							getContainer: () => document.body,
							children
						})
					})
				})
			})
		})
	});
}
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/lib/IconBase.mjs
var { forwardRef: e } = await importShared("react");
var r$25 = e((e, r) => {
	let { alt: i, color: a = `currentColor`, size: o = `1em`, mirrored: s = !1, children: c, ...l } = e;
	return (0, import_jsx_runtime.jsxs)(`svg`, {
		ref: r,
		xmlns: `http://www.w3.org/2000/svg`,
		width: o,
		height: o,
		color: a,
		fill: `none`,
		viewBox: `0 0 24 24`,
		transform: s ? `scale(-1, 1)` : void 0,
		...l,
		children: [!!i && (0, import_jsx_runtime.jsx)(`title`, { children: i }), c]
	});
});
r$25.displayName = `IconBase`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/arrows-action/BoldDuotone/Download.mjs
var { forwardRef: t$24 } = await importShared("react");
var i$20 = t$24((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M22 16.0003V15.0003C22 12.1718 21.9998 10.7581 21.1211 9.8794C20.2424 9.00072 18.8282 9.00072 15.9998 9.00072H7.99977C5.17135 9.00072 3.75713 9.00072 2.87845 9.8794C2 10.7579 2 12.1711 2 14.9981V15.0003V16.0003C2 18.8287 2 20.2429 2.87868 21.1216C3.75736 22.0003 5.17157 22.0003 8 22.0003H16H16C18.8284 22.0003 20.2426 22.0003 21.1213 21.1216C22 20.2429 22 18.8287 22 16.0003Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		fillRule: `evenodd`,
		clipRule: `evenodd`,
		d: `M12 1.25C11.5858 1.25 11.25 1.58579 11.25 2L11.25 12.9726L9.56943 11.0119C9.29986 10.6974 8.82639 10.661 8.51189 10.9306C8.1974 11.2001 8.16098 11.6736 8.43054 11.9881L11.4305 15.4881C11.573 15.6543 11.781 15.75 12 15.75C12.2189 15.75 12.4269 15.6543 12.5694 15.4881L15.5694 11.9881C15.839 11.6736 15.8026 11.2001 15.4881 10.9306C15.1736 10.661 14.7001 10.6974 14.4305 11.0119L12.75 12.9726L12.75 2C12.75 1.58579 12.4142 1.25 12 1.25Z`,
		fill: `currentColor`
	})]
}));
i$20.displayName = `Download`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/devices/BoldDuotone/CloudStorage.mjs
var { forwardRef: t$23 } = await importShared("react");
var i$19 = t$23((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		fillRule: `evenodd`,
		clipRule: `evenodd`,
		d: `M8.93934 14.4393C8.5 14.8787 8.5 15.5858 8.5 17V19C8.5 20.4142 8.5 21.1213 8.93934 21.5607C9.37868 22 10.0858 22 11.5 22H12.5C13.9142 22 14.6213 22 15.0607 21.5607C15.5 21.1213 15.5 20.4142 15.5 19V17C15.5 15.5858 15.5 14.8787 15.0607 14.4393C14.6213 14 13.9142 14 12.5 14H11.5C10.0858 14 9.37868 14 8.93934 14.4393ZM10.25 18C10.25 17.5858 10.5858 17.25 11 17.25H13C13.4142 17.25 13.75 17.5858 13.75 18C13.75 18.4142 13.4142 18.75 13 18.75H11C10.5858 18.75 10.25 18.4142 10.25 18Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M22 12.3529C22 15.2327 19.8188 17.6089 17 17.9563L15.5 17.9629V17C15.5 15.5858 15.5 14.8787 15.0607 14.4393C14.6213 14 13.9142 14 12.5 14H11.5C10.0858 14 9.37868 14 8.93934 14.4393C8.5 14.8787 8.5 15.5858 8.5 17V17.9934L7.00002 18H6.28571C3.91878 18 2 16.1038 2 13.7647C2 11.4256 3.91878 9.52941 6.28571 9.52941C6.56983 9.52941 6.8475 9.55673 7.11616 9.60887C6.88706 8.9978 6.7619 8.33687 6.7619 7.64706C6.7619 4.52827 9.32028 2 12.4762 2C15.4159 2 17.8371 4.19371 18.1551 7.01498C20.393 7.78024 22 9.88113 22 12.3529Z`,
		fill: `currentColor`
	})]
}));
i$19.displayName = `CloudStorage`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/devices/BoldDuotone/Laptop.mjs
var { forwardRef: t$22 } = await importShared("react");
var i$18 = t$22((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [
		(0, import_jsx_runtime.jsx)(`path`, {
			opacity: `0.5`,
			d: `M4.93833 3.58579C4.35254 4.17157 4.35254 5.11438 4.35254 7V14H19.6467V7C19.6467 5.11438 19.6467 4.17157 19.0609 3.58579C18.4751 3 17.5323 3 15.6467 3H8.35254C6.46692 3 5.52411 3 4.93833 3.58579Z`,
			fill: `currentColor`
		}),
		(0, import_jsx_runtime.jsx)(`path`, {
			fillRule: `evenodd`,
			clipRule: `evenodd`,
			d: `M21.3911 16.3358C21.4356 16.3818 21.4579 16.4048 21.4787 16.4276C21.7998 16.7802 21.9843 17.2358 21.999 17.7124C22 17.7433 22 17.7753 22 17.8393C22 17.9885 22 18.0631 21.996 18.1261C21.9325 19.1314 21.1314 19.9325 20.1261 19.996C20.0631 20 19.9885 20 19.8393 20H4.16068C4.01148 20 3.93688 20 3.87388 19.996C2.86865 19.9325 2.06749 19.1314 2.00398 18.1261C2 18.0631 2 17.9885 2 17.8393C2 17.7753 2 17.7433 2.00096 17.7124C2.01569 17.2358 2.20022 16.7802 2.52127 16.4276C2.54205 16.4048 2.56429 16.3819 2.60869 16.336L3.90311 15H20.0969L21.3911 16.3358ZM8.75 18C8.75 17.5858 9.08579 17.25 9.5 17.25H14.5C14.9142 17.25 15.25 17.5858 15.25 18C15.25 18.4142 14.9142 18.75 14.5 18.75H9.5C9.08579 18.75 8.75 18.4142 8.75 18Z`,
			fill: `currentColor`
		}),
		(0, import_jsx_runtime.jsx)(`path`, {
			d: `M12.75 5.75C12.75 6.16421 12.4142 6.5 12 6.5C11.5858 6.5 11.25 6.16421 11.25 5.75C11.25 5.33579 11.5858 5 12 5C12.4142 5 12.75 5.33579 12.75 5.75Z`,
			fill: `currentColor`
		})
	]
}));
i$18.displayName = `Laptop`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/folders/BoldDuotone/Folder.mjs
var { forwardRef: t$21 } = await importShared("react");
var i$17 = t$21((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M22 14V11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975V14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M12.25 10C12.25 9.58579 12.5858 9.25 13 9.25H18C18.4142 9.25 18.75 9.58579 18.75 10C18.75 10.4142 18.4142 10.75 18 10.75H13C12.5858 10.75 12.25 10.4142 12.25 10Z`,
		fill: `currentColor`
	})]
}));
i$17.displayName = `Folder`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/like/BoldDuotone/Star.mjs
var { forwardRef: t$20 } = await importShared("react");
var i$16 = t$20((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		d: `M18.4834 16.7674C17.8471 16.9195 17.1829 17 16.5 17C11.8056 17 8 13.1944 8 8.50001C8 8.01653 8.04036 7.54249 8.11791 7.08105C8.08172 7.11586 8.04432 7.14792 8.00494 7.17781C7.72433 7.39083 7.37485 7.46991 6.67589 7.62806L6.03954 7.77204C3.57986 8.32856 2.35002 8.60682 2.05742 9.54774C1.76482 10.4887 2.60325 11.4691 4.2801 13.4299L4.71392 13.9372C5.19042 14.4944 5.42868 14.773 5.53586 15.1177C5.64305 15.4624 5.60703 15.8341 5.53498 16.5776L5.4694 17.2544C5.21588 19.8706 5.08912 21.1787 5.85515 21.7602C6.62117 22.3417 7.77267 21.8116 10.0757 20.7512L10.6715 20.4768C11.3259 20.1755 11.6531 20.0249 12 20.0249C12.3469 20.0249 12.6741 20.1755 13.3285 20.4768L13.9243 20.7512C16.2273 21.8116 17.3788 22.3417 18.1449 21.7602C18.9109 21.1787 18.7841 19.8706 18.5306 17.2544L18.4834 16.7674Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M9.15302 5.40838L8.82532 5.99623C8.46538 6.64194 8.28541 6.96479 8.0048 7.17781C8.04418 7.14791 8.08158 7.11586 8.11777 7.08105C8.04022 7.54249 7.99986 8.01653 7.99986 8.50001C7.99986 13.1944 11.8054 17 16.4999 17C17.1828 17 17.8469 16.9195 18.4833 16.7674L18.4649 16.5776C18.3928 15.8341 18.3568 15.4624 18.464 15.1177C18.5712 14.773 18.8094 14.4944 19.2859 13.9372L19.7198 13.4299C21.3966 11.4691 22.235 10.4886 21.9424 9.54773C21.6498 8.60682 20.42 8.32856 17.9603 7.77203L17.324 7.62805C16.625 7.4699 16.2755 7.39083 15.9949 7.17781C15.7143 6.96479 15.5343 6.64194 15.1744 5.99624L14.8467 5.40837C13.58 3.13612 12.9467 2 11.9999 2C11.053 2 10.4197 3.13613 9.15302 5.40838Z`,
		fill: `currentColor`
	})]
}));
i$16.displayName = `Star`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/map/BoldDuotone/Compass.mjs
var { forwardRef: t$19 } = await importShared("react");
var i$15 = t$19((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M13.024 14.5601C13.5166 14.363 13.763 14.2645 13.9562 14.095C14.0055 14.0518 14.0518 14.0055 14.095 13.9562C14.2645 13.763 14.363 13.5166 14.5601 13.024C15.484 10.7142 15.946 9.5593 15.4977 8.89964C15.3914 8.74324 15.2565 8.60834 15.1001 8.50206C14.4405 8.0538 13.2856 8.51575 10.9758 9.43966C10.4831 9.63673 10.2368 9.73527 10.0435 9.90474C9.99429 9.94792 9.94792 9.99429 9.90474 10.0435C9.73527 10.2368 9.63673 10.4831 9.43966 10.9758C8.51575 13.2856 8.0538 14.4405 8.50206 15.1001C8.60834 15.2565 8.74324 15.3914 8.89964 15.4977C9.5593 15.946 10.7142 15.484 13.024 14.5601Z`,
		fill: `currentColor`
	})]
}));
i$15.displayName = `Compass`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/messages/BoldDuotone/Inbox.mjs
var { forwardRef: t$18 } = await importShared("react");
var i$14 = t$18((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M1 12C1 6.81455 1 4.22183 2.61091 2.61091C4.22183 1 6.81455 1 12 1C17.1854 1 19.7782 1 21.3891 2.61091C23 4.22183 23 6.81455 23 12C23 17.1854 23 19.7782 21.3891 21.3891C19.7782 23 17.1854 23 12 23C6.81455 23 4.22183 23 2.61091 21.3891C1 19.7782 1 17.1854 1 12Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M2.61091 21.3887C4.22183 22.9996 6.81455 22.9996 12 22.9996C17.1854 22.9996 19.7782 22.9996 21.3891 21.3887C22.8818 19.896 22.9913 17.5602 22.9994 13.0996H19.5237C18.528 13.0996 18.0302 13.0996 17.5926 13.3009C17.155 13.5022 16.831 13.8801 16.183 14.6361L16.183 14.6361L15.517 15.4131L15.517 15.4131C14.869 16.1691 14.545 16.5471 14.1074 16.7483C13.6698 16.9496 13.172 16.9496 12.1763 16.9496H11.8237C10.828 16.9496 10.3302 16.9496 9.89257 16.7483C9.45496 16.5471 9.13097 16.1691 8.48298 15.4131L7.81701 14.6361C7.16903 13.8801 6.84504 13.5022 6.40743 13.3009C5.96982 13.0996 5.47197 13.0996 4.47629 13.0996H1C1.00803 17.5602 1.11818 19.896 2.61091 21.3887Z`,
		fill: `currentColor`
	})]
}));
i$14.displayName = `Inbox`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/messages/BoldDuotone/PenNewSquare.mjs
var { forwardRef: t$17 } = await importShared("react");
var i$13 = t$17((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [
		(0, import_jsx_runtime.jsx)(`path`, {
			opacity: `0.5`,
			d: `M1 12C1 6.81455 1 4.22183 2.61091 2.61091C4.22183 1 6.81455 1 12 1C17.1854 1 19.7782 1 21.3891 2.61091C23 4.22183 23 6.81455 23 12C23 17.1854 23 19.7782 21.3891 21.3891C19.7782 23 17.1854 23 12 23C6.81455 23 4.22183 23 2.61091 21.3891C1 19.7782 1 17.1854 1 12Z`,
			fill: `currentColor`
		}),
		(0, import_jsx_runtime.jsx)(`path`, {
			d: `M13.9261 14.3018C14.1711 14.1107 14.3933 13.8885 14.8377 13.4441L20.378 7.90374C20.512 7.7698 20.4507 7.53909 20.2717 7.477C19.6178 7.25011 18.767 6.82414 17.9713 6.02835C17.1755 5.23257 16.7495 4.38186 16.5226 3.72788C16.4605 3.54892 16.2298 3.48761 16.0959 3.62156L10.5555 9.16192C10.1111 9.60634 9.88888 9.82854 9.69778 10.0736C9.47235 10.3626 9.27908 10.6753 9.12139 11.0062C8.98771 11.2867 8.88834 11.5848 8.68959 12.181L8.43278 12.9515L8.02443 14.1765L7.64153 15.3252C7.54373 15.6186 7.6201 15.9421 7.8388 16.1608C8.0575 16.3795 8.38099 16.4559 8.67441 16.3581L9.82308 15.9752L11.0481 15.5668L11.8186 15.31L11.8186 15.31C12.4148 15.1113 12.7129 15.0119 12.9934 14.8782C13.3243 14.7205 13.637 14.5273 13.9261 14.3018Z`,
			fill: `currentColor`
		}),
		(0, import_jsx_runtime.jsx)(`path`, {
			d: `M22.1127 6.16905C23.2952 4.98656 23.2952 3.06936 22.1127 1.88687C20.9302 0.704377 19.013 0.704377 17.8306 1.88687L17.6524 2.06499C17.4806 2.23687 17.4027 2.47695 17.4456 2.7162C17.4726 2.8667 17.5227 3.08674 17.6138 3.3493C17.796 3.87439 18.14 4.56368 18.788 5.21165C19.4359 5.85961 20.1252 6.20364 20.6503 6.38581C20.9129 6.4769 21.1329 6.52697 21.2834 6.55399C21.5227 6.59693 21.7627 6.51905 21.9346 6.34717L22.1127 6.16905Z`,
			fill: `currentColor`
		})
	]
}));
i$13.displayName = `PenNewSquare`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/money/BoldDuotone/VerifiedCheck.mjs
var { forwardRef: t$16 } = await importShared("react");
var i$12 = t$16((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M9.59236 3.20031C9.34886 3.40782 9.2271 3.51158 9.09706 3.59874C8.79896 3.79854 8.46417 3.93721 8.1121 4.00672C7.95851 4.03705 7.79903 4.04977 7.48008 4.07522L7.48007 4.07523C6.67869 4.13918 6.278 4.17115 5.94371 4.28923C5.17051 4.56233 4.56233 5.17051 4.28923 5.94371C4.17115 6.278 4.13918 6.67869 4.07523 7.48007L4.07522 7.48008C4.04977 7.79903 4.03705 7.95851 4.00672 8.1121C3.93721 8.46417 3.79854 8.79896 3.59874 9.09706C3.51158 9.2271 3.40781 9.34887 3.20028 9.59239L3.20027 9.5924C2.67883 10.2043 2.4181 10.5102 2.26522 10.8301C1.91159 11.57 1.91159 12.43 2.26522 13.1699C2.41811 13.4898 2.67883 13.7957 3.20027 14.4076L3.20031 14.4076C3.4078 14.6511 3.51159 14.7729 3.59874 14.9029C3.79854 15.201 3.93721 15.5358 4.00672 15.8879C4.03705 16.0415 4.04977 16.201 4.07522 16.5199L4.07523 16.5199C4.13918 17.3213 4.17115 17.722 4.28923 18.0563C4.56233 18.8295 5.17051 19.4377 5.94371 19.7108C6.27799 19.8288 6.67867 19.8608 7.48 19.9248L7.48008 19.9248C7.79903 19.9502 7.95851 19.963 8.1121 19.9933C8.46417 20.0628 8.79896 20.2015 9.09706 20.4013C9.22711 20.4884 9.34887 20.5922 9.5924 20.7997C10.2043 21.3212 10.5102 21.5819 10.8301 21.7348C11.57 22.0884 12.43 22.0884 13.1699 21.7348C13.4898 21.5819 13.7957 21.3212 14.4076 20.7997C14.6511 20.5922 14.7729 20.4884 14.9029 20.4013C15.201 20.2015 15.5358 20.0628 15.8879 19.9933C16.0415 19.963 16.201 19.9502 16.5199 19.9248L16.52 19.9248C17.3213 19.8608 17.722 19.8288 18.0563 19.7108C18.8295 19.4377 19.4377 18.8295 19.7108 18.0563C19.8288 17.722 19.8608 17.3213 19.9248 16.52L19.9248 16.5199C19.9502 16.201 19.963 16.0415 19.9933 15.8879C20.0628 15.5358 20.2015 15.201 20.4013 14.9029C20.4884 14.7729 20.5922 14.6511 20.7997 14.4076C21.3212 13.7957 21.5819 13.4898 21.7348 13.1699C22.0884 12.43 22.0884 11.57 21.7348 10.8301C21.5819 10.5102 21.3212 10.2043 20.7997 9.5924C20.5922 9.34887 20.4884 9.22711 20.4013 9.09706C20.2015 8.79896 20.0628 8.46417 19.9933 8.1121C19.963 7.95851 19.9502 7.79903 19.9248 7.48008L19.9248 7.48C19.8608 6.67867 19.8288 6.27799 19.7108 5.94371C19.4377 5.17051 18.8295 4.56233 18.0563 4.28923C17.722 4.17115 17.3213 4.13918 16.5199 4.07523L16.5199 4.07522C16.201 4.04977 16.0415 4.03705 15.8879 4.00672C15.5358 3.93721 15.201 3.79854 14.9029 3.59874C14.7729 3.51158 14.6511 3.40781 14.4076 3.20027C13.7957 2.67883 13.4898 2.41811 13.1699 2.26522C12.43 1.91159 11.57 1.91159 10.8301 2.26522C10.5102 2.4181 10.2043 2.67883 9.5924 3.20027L9.59236 3.20031Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M16.3736 9.86298C16.6914 9.54515 16.6914 9.02984 16.3736 8.71201C16.0557 8.39417 15.5404 8.39417 15.2226 8.71201L10.3723 13.5623L8.77753 11.9674C8.4597 11.6496 7.94439 11.6496 7.62656 11.9674C7.30873 12.2853 7.30873 12.8006 7.62656 13.1184L9.79685 15.2887C10.1147 15.6065 10.63 15.6065 10.9478 15.2887L16.3736 9.86298Z`,
		fill: `currentColor`
	})]
}));
i$12.displayName = `VerifiedCheck`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/nature/BoldDuotone/Fire.mjs
var { forwardRef: t$15 } = await importShared("react");
var i$11 = t$15((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M12.8324 21.8013C15.9583 21.1747 20 18.926 20 13.1112C20 7.8196 16.1267 4.29593 13.3415 2.67685C12.7235 2.31757 12 2.79006 12 3.50492V5.3334C12 6.77526 11.3938 9.40711 9.70932 10.5018C8.84932 11.0607 7.92052 10.2242 7.816 9.20388L7.73017 8.36604C7.6304 7.39203 6.63841 6.80075 5.85996 7.3946C4.46147 8.46144 3 10.3296 3 13.1112C3 20.2223 8.28889 22.0001 10.9333 22.0001C11.0871 22.0001 11.2488 21.9955 11.4171 21.9858C11.863 21.9296 11.4171 22.085 12.8324 21.8013Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M8 18.4442C8 21.064 10.1113 21.8742 11.4171 21.9858C11.863 21.9296 11.4171 22.085 12.8324 21.8013C13.871 21.4343 15 20.4922 15 18.4442C15 17.1465 14.1814 16.3459 13.5401 15.9711C13.3439 15.8564 13.1161 16.0008 13.0985 16.2273C13.0429 16.9454 12.3534 17.5174 11.8836 16.9714C11.4685 16.4889 11.2941 15.784 11.2941 15.3331V14.7439C11.2941 14.3887 10.9365 14.1533 10.631 14.3346C9.49507 15.0085 8 16.3949 8 18.4442Z`,
		fill: `currentColor`
	})]
}));
i$11.displayName = `Fire`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/security/BoldDuotone/ShieldCheck.mjs
var { forwardRef: t$14 } = await importShared("react");
var i$10 = t$14((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M3.37752 5.08241C3 5.62028 3 7.21907 3 10.4167V11.9914C3 17.6294 7.23896 20.3655 9.89856 21.5273C10.62 21.8424 10.9807 22 12 22C13.0193 22 13.38 21.8424 14.1014 21.5273C16.761 20.3655 21 17.6294 21 11.9914V10.4167C21 7.21907 21 5.62028 20.6225 5.08241C20.245 4.54454 18.7417 4.02996 15.7351 3.00079L15.1623 2.80472C13.595 2.26824 12.8114 2 12 2C11.1886 2 10.405 2.26824 8.83772 2.80472L8.26491 3.00079C5.25832 4.02996 3.75503 4.54454 3.37752 5.08241Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M15.0595 10.4995C15.3353 10.1905 15.3085 9.71643 14.9995 9.44055C14.6905 9.16468 14.2164 9.19152 13.9406 9.5005L10.9286 12.8739L10.0595 11.9005C9.78359 11.5915 9.30947 11.5647 9.0005 11.8406C8.69152 12.1164 8.66468 12.5905 8.94055 12.8995L10.3691 14.4995C10.5114 14.6589 10.7149 14.75 10.9286 14.75C11.1422 14.75 11.3457 14.6589 11.488 14.4995L15.0595 10.4995Z`,
		fill: `currentColor`
	})]
}));
i$10.displayName = `ShieldCheck`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/settings/BoldDuotone/SettingsMinimalistic.mjs
var { forwardRef: t$13 } = await importShared("react");
var i$9 = t$13((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		fillRule: `evenodd`,
		clipRule: `evenodd`,
		d: `M12.4277 2C11.3139 2 10.2995 2.6007 8.27081 3.80211L7.58466 4.20846C5.55594 5.40987 4.54158 6.01057 3.98466 7C3.42773 7.98943 3.42773 9.19084 3.42773 11.5937V12.4063C3.42773 14.8092 3.42773 16.0106 3.98466 17C4.54158 17.9894 5.55594 18.5901 7.58466 19.7915L8.27081 20.1979C10.2995 21.3993 11.3139 22 12.4277 22C13.5416 22 14.5559 21.3993 16.5847 20.1979L17.2708 19.7915C19.2995 18.5901 20.3139 17.9894 20.8708 17C21.4277 16.0106 21.4277 14.8092 21.4277 12.4063V11.5937C21.4277 9.19084 21.4277 7.98943 20.8708 7C20.3139 6.01057 19.2995 5.40987 17.2708 4.20846L16.5847 3.80211C14.5559 2.6007 13.5416 2 12.4277 2Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M12.4277 8.25C10.3567 8.25 8.67773 9.92893 8.67773 12C8.67773 14.0711 10.3567 15.75 12.4277 15.75C14.4988 15.75 16.1777 14.0711 16.1777 12C16.1777 9.92893 14.4988 8.25 12.4277 8.25Z`,
		fill: `currentColor`
	})]
}));
i$9.displayName = `SettingsMinimalistic`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/ui/BoldDuotone/CheckCircle.mjs
var { forwardRef: t$12 } = await importShared("react");
var i$8 = t$12((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z`,
		fill: `currentColor`
	})]
}));
i$8.displayName = `CheckCircle`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/ui/BoldDuotone/InfoCircle.mjs
var { forwardRef: t$11 } = await importShared("react");
var i$7 = t$11((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [
		(0, import_jsx_runtime.jsx)(`path`, {
			opacity: `0.5`,
			d: `M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z`,
			fill: `currentColor`
		}),
		(0, import_jsx_runtime.jsx)(`path`, {
			d: `M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z`,
			fill: `currentColor`
		}),
		(0, import_jsx_runtime.jsx)(`path`, {
			d: `M12 7C12.5523 7 13 7.44771 13 8C13 8.55229 12.5523 9 12 9C11.4477 9 11 8.55229 11 8C11 7.44771 11.4477 7 12 7Z`,
			fill: `currentColor`
		})
	]
}));
i$7.displayName = `InfoCircle`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/ui/BoldDuotone/TrashBin2.mjs
var { forwardRef: t$10 } = await importShared("react");
var i$6 = t$10((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		d: `M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z`,
		fill: `currentColor`
	})]
}));
i$6.displayName = `TrashBin2`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/users/BoldDuotone/User.mjs
var { forwardRef: t$9 } = await importShared("react");
var i$5 = t$9((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`circle`, {
		cx: `12`,
		cy: `6`,
		r: `4`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z`,
		fill: `currentColor`
	})]
}));
i$5.displayName = `User`;
//#endregion
//#region src/renderer/mainWindow/redux/reducers/settings.ts
var { useSelector: useSelector$1 } = await importShared("react-redux");
var settingsSlice = createSlice({
	initialState: {
		tooltipLevel: "essential",
		closeConfirm: true,
		closeTabConfirm: true,
		terminateAIConfirm: true,
		exitSignalConfirm: true,
		openLastSize: false,
		updatedModules: [],
		newModules: [],
		updateAvailable: false,
		dynamicAppTitle: false,
		openLinkExternal: false,
		hardwareAcceleration: true,
		disableLoadingAnimations: false,
		checkCustomUpdate: false,
		searchValue: "",
		searchWords: [],
		selectedSection: ""
	},
	name: "settings",
	reducers: {
		setSettingsState: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
		setSearchValue: (state, action) => {
			const searchValue = action.payload;
			state.searchValue = searchValue;
			state.searchWords = searchValue ? searchValue.split(/\s+/) : [];
		}
	}
});
/**
* Hook to access a single settings state field with key-safe typing.
*/
var useSettingsState = (name) => useSelector$1((state) => state.settings[name]);
settingsSlice.actions;
settingsSlice.reducer;
//#endregion
//#region src/renderer/mainWindow/pages/settings/SettingsSearchHighlight.tsx
var import_main = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (function(modules) {
		var installedModules = {};
		function __webpack_require__(moduleId) {
			if (installedModules[moduleId]) return installedModules[moduleId].exports;
			var module$1 = installedModules[moduleId] = {
				exports: {},
				id: moduleId,
				loaded: false
			};
			modules[moduleId].call(module$1.exports, module$1, module$1.exports, __webpack_require__);
			module$1.loaded = true;
			return module$1.exports;
		}
		__webpack_require__.m = modules;
		__webpack_require__.c = installedModules;
		__webpack_require__.p = "";
		return __webpack_require__(0);
	})([
		(function(module$2, exports$1, __webpack_require__) {
			module$2.exports = __webpack_require__(1);
		}),
		(function(module$3, exports$2, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports$2, "__esModule", { value: true });
			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { "default": obj };
			}
			exports$2["default"] = _interopRequireDefault(__webpack_require__(2))["default"];
			module$3.exports = exports$2["default"];
		}),
		(function(module$4, exports$3, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports$3, "__esModule", { value: true });
			var _extends = Object.assign || function(target) {
				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];
					for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
				}
				return target;
			};
			exports$3["default"] = Highlighter;
			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { "default": obj };
			}
			function _objectWithoutProperties(obj, keys) {
				var target = {};
				for (var i in obj) {
					if (keys.indexOf(i) >= 0) continue;
					if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
					target[i] = obj[i];
				}
				return target;
			}
			var _highlightWordsCore = __webpack_require__(3);
			var _react = __webpack_require__(4);
			var _memoizeOne2 = _interopRequireDefault(__webpack_require__(5));
			/**
			* Highlighter component
			* @param {object} props - Component properties
			* @param {string} [props.activeClassName] - The class name to be applied to an active match. Use along with `activeIndex`.
			* @param {number} [props.activeIndex] - Specify the match index that should be actively highlighted. Use along with `activeClassName`.
			* @param {object} [props.activeStyle] - The inline style to be applied to an active match. Use along with `activeIndex`.
			* @param {boolean} [props.autoEscape] - Escape characters in searchWords which are meaningful in regular expressions.
			* @param {string} [props.className] - CSS class name applied to the outer/wrapper `<span>`.
			* @param {(options: object) => Array<{start: number, end: number}>} [props.findChunks] - Use a custom function to search for matching chunks.  See the default `findChunks` function in `highlight-words-core` for signature.
			* @param {string|object} [props.highlightClassName] - CSS class name applied to highlighted text or object mapping search term matches to class names.
			* @param {object} [props.highlightStyle] - Inline styles applied to highlighted text.
			* @param {React.ComponentType|string} [props.highlightTag] - Type of tag to wrap around highlighted matches. Defaults to `mark` but can also be a React component (class or functional).
			* @param {(text: string) => string} [props.sanitize] - Process each search word and text to highlight before comparing.
			* @param {Array<string|RegExp>} props.searchWords - Array of search words. String search terms are automatically cast to RegExps unless `autoEscape` is true.
			* @param {string} props.textToHighlight - The text to highlight matches in.
			* @param {React.ComponentType|string} [props.unhighlightTag] - Type of tag applied to unhighlighted parts. Defaults to `span` but can also be a React component (class or functional).
			* @param {string} [props.unhighlightClassName] - CSS class name applied to unhighlighted text.
			* @param {object} [props.unhighlightStyle] - Inline styles applied to the unhighlighted text.
			* @param {object} [props.rest] - Additional attributes passed to the outer `<span>` element.
			*/
			function Highlighter(_ref) {
				var _ref$activeClassName = _ref.activeClassName;
				var activeClassName = _ref$activeClassName === void 0 ? "" : _ref$activeClassName;
				var _ref$activeIndex = _ref.activeIndex;
				var activeIndex = _ref$activeIndex === void 0 ? -1 : _ref$activeIndex;
				var activeStyle = _ref.activeStyle;
				var autoEscape = _ref.autoEscape;
				var _ref$caseSensitive = _ref.caseSensitive;
				var caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive;
				var className = _ref.className;
				var findChunks = _ref.findChunks;
				var _ref$highlightClassName = _ref.highlightClassName;
				var highlightClassName = _ref$highlightClassName === void 0 ? "" : _ref$highlightClassName;
				var _ref$highlightStyle = _ref.highlightStyle;
				var highlightStyle = _ref$highlightStyle === void 0 ? {} : _ref$highlightStyle;
				var _ref$highlightTag = _ref.highlightTag;
				var highlightTag = _ref$highlightTag === void 0 ? "mark" : _ref$highlightTag;
				var sanitize = _ref.sanitize;
				var searchWords = _ref.searchWords;
				var textToHighlight = _ref.textToHighlight;
				var _ref$unhighlightTag = _ref.unhighlightTag;
				var unhighlightTag = _ref$unhighlightTag === void 0 ? "span" : _ref$unhighlightTag;
				var _ref$unhighlightClassName = _ref.unhighlightClassName;
				var unhighlightClassName = _ref$unhighlightClassName === void 0 ? "" : _ref$unhighlightClassName;
				var unhighlightStyle = _ref.unhighlightStyle;
				var rest = _objectWithoutProperties(_ref, [
					"activeClassName",
					"activeIndex",
					"activeStyle",
					"autoEscape",
					"caseSensitive",
					"className",
					"findChunks",
					"highlightClassName",
					"highlightStyle",
					"highlightTag",
					"sanitize",
					"searchWords",
					"textToHighlight",
					"unhighlightTag",
					"unhighlightClassName",
					"unhighlightStyle"
				]);
				var chunks = (0, _highlightWordsCore.findAll)({
					autoEscape,
					caseSensitive,
					findChunks,
					sanitize,
					searchWords,
					textToHighlight
				});
				var HighlightTag = highlightTag;
				var highlightIndex = -1;
				var highlightClassNames = "";
				var highlightStyles = void 0;
				var memoizedLowercaseProps = (0, _memoizeOne2["default"])(function lowercaseProps(object) {
					var mapped = {};
					for (var key in object) mapped[key.toLowerCase()] = object[key];
					return mapped;
				});
				return (0, _react.createElement)("span", _extends({ className }, rest, { children: chunks.map(function(chunk, index) {
					var text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
					if (chunk.highlight) {
						highlightIndex++;
						var highlightClass = void 0;
						if (typeof highlightClassName === "object") if (!caseSensitive) {
							highlightClassName = memoizedLowercaseProps(highlightClassName);
							highlightClass = highlightClassName[text.toLowerCase()];
						} else highlightClass = highlightClassName[text];
						else highlightClass = highlightClassName;
						var isActive = highlightIndex === +activeIndex;
						highlightClassNames = highlightClass + " " + (isActive ? activeClassName : "");
						highlightStyles = isActive === true && activeStyle != null ? Object.assign({}, highlightStyle, activeStyle) : highlightStyle;
						var props = {
							children: text,
							className: highlightClassNames,
							key: index,
							style: highlightStyles
						};
						if (typeof HighlightTag !== "string") props.highlightIndex = highlightIndex;
						return (0, _react.createElement)(HighlightTag, props);
					} else return (0, _react.createElement)(unhighlightTag, {
						children: text,
						className: unhighlightClassName,
						key: index,
						style: unhighlightStyle
					});
				}) }));
			}
			module$4.exports = exports$3["default"];
		}),
		(function(module$5, exports$4) {
			module$5.exports = (function(modules) {
				var installedModules = {};
				function __webpack_require__(moduleId) {
					if (installedModules[moduleId]) return installedModules[moduleId].exports;
					var module$6 = installedModules[moduleId] = {
						exports: {},
						id: moduleId,
						loaded: false
					};
					modules[moduleId].call(module$6.exports, module$6, module$6.exports, __webpack_require__);
					module$6.loaded = true;
					return module$6.exports;
				}
				__webpack_require__.m = modules;
				__webpack_require__.c = installedModules;
				__webpack_require__.p = "";
				return __webpack_require__(0);
			})([
				(function(module$7, exports$5, __webpack_require__) {
					module$7.exports = __webpack_require__(1);
				}),
				(function(module$8, exports$6, __webpack_require__) {
					"use strict";
					Object.defineProperty(exports$6, "__esModule", { value: true });
					var _utils = __webpack_require__(2);
					Object.defineProperty(exports$6, "combineChunks", {
						enumerable: true,
						get: function get() {
							return _utils.combineChunks;
						}
					});
					Object.defineProperty(exports$6, "fillInChunks", {
						enumerable: true,
						get: function get() {
							return _utils.fillInChunks;
						}
					});
					Object.defineProperty(exports$6, "findAll", {
						enumerable: true,
						get: function get() {
							return _utils.findAll;
						}
					});
					Object.defineProperty(exports$6, "findChunks", {
						enumerable: true,
						get: function get() {
							return _utils.findChunks;
						}
					});
				}),
				(function(module$9, exports$7) {
					"use strict";
					Object.defineProperty(exports$7, "__esModule", { value: true });
					exports$7.findAll = function findAll(_ref) {
						var autoEscape = _ref.autoEscape, _ref$caseSensitive = _ref.caseSensitive, caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive, _ref$findChunks = _ref.findChunks, findChunks = _ref$findChunks === void 0 ? defaultFindChunks : _ref$findChunks, sanitize = _ref.sanitize, searchWords = _ref.searchWords, textToHighlight = _ref.textToHighlight;
						return fillInChunks({
							chunksToHighlight: combineChunks({ chunks: findChunks({
								autoEscape,
								caseSensitive,
								sanitize,
								searchWords,
								textToHighlight
							}) }),
							totalLength: textToHighlight ? textToHighlight.length : 0
						});
					};
					/**
					* Takes an array of {start:number, end:number} objects and combines chunks that overlap into single chunks.
					* @return {start:number, end:number}[]
					*/
					var combineChunks = exports$7.combineChunks = function combineChunks(_ref2) {
						var chunks = _ref2.chunks;
						chunks = chunks.sort(function(first, second) {
							return first.start - second.start;
						}).reduce(function(processedChunks, nextChunk) {
							if (processedChunks.length === 0) return [nextChunk];
							else {
								var prevChunk = processedChunks.pop();
								if (nextChunk.start <= prevChunk.end) {
									var endIndex = Math.max(prevChunk.end, nextChunk.end);
									processedChunks.push({
										start: prevChunk.start,
										end: endIndex
									});
								} else processedChunks.push(prevChunk, nextChunk);
								return processedChunks;
							}
						}, []);
						return chunks;
					};
					/**
					* Examine text for any matches.
					* If we find matches, add them to the returned array as a "chunk" object ({start:number, end:number}).
					* @return {start:number, end:number}[]
					*/
					var defaultFindChunks = function defaultFindChunks(_ref3) {
						var autoEscape = _ref3.autoEscape, caseSensitive = _ref3.caseSensitive, _ref3$sanitize = _ref3.sanitize, sanitize = _ref3$sanitize === void 0 ? identity : _ref3$sanitize, searchWords = _ref3.searchWords, textToHighlight = _ref3.textToHighlight;
						textToHighlight = sanitize(textToHighlight);
						return searchWords.filter(function(searchWord) {
							return searchWord;
						}).reduce(function(chunks, searchWord) {
							searchWord = sanitize(searchWord);
							if (autoEscape) searchWord = escapeRegExpFn(searchWord);
							var regex = new RegExp(searchWord, caseSensitive ? "g" : "gi");
							var match = void 0;
							while (match = regex.exec(textToHighlight)) {
								var start = match.index;
								var end = regex.lastIndex;
								if (end > start) chunks.push({
									start,
									end
								});
								if (match.index == regex.lastIndex) regex.lastIndex++;
							}
							return chunks;
						}, []);
					};
					exports$7.findChunks = defaultFindChunks;
					/**
					* Given a set of chunks to highlight, create an additional set of chunks
					* to represent the bits of text between the highlighted text.
					* @param chunksToHighlight {start:number, end:number}[]
					* @param totalLength number
					* @return {start:number, end:number, highlight:boolean}[]
					*/
					var fillInChunks = exports$7.fillInChunks = function fillInChunks(_ref4) {
						var chunksToHighlight = _ref4.chunksToHighlight, totalLength = _ref4.totalLength;
						var allChunks = [];
						var append = function append(start, end, highlight) {
							if (end - start > 0) allChunks.push({
								start,
								end,
								highlight
							});
						};
						if (chunksToHighlight.length === 0) append(0, totalLength, false);
						else {
							var lastIndex = 0;
							chunksToHighlight.forEach(function(chunk) {
								append(lastIndex, chunk.start, false);
								append(chunk.start, chunk.end, true);
								lastIndex = chunk.end;
							});
							append(lastIndex, totalLength, false);
						}
						return allChunks;
					};
					function identity(value) {
						return value;
					}
					function escapeRegExpFn(str) {
						return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
					}
				})
			]);
		}),
		(function(module$10, exports$8) {
			module$10.exports = require_react();
		}),
		(function(module$11, exports$9) {
			"use strict";
			var simpleIsEqual = function simpleIsEqual(a, b) {
				return a === b;
			};
			function index(resultFn) {
				var isEqual = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : simpleIsEqual;
				var lastThis = void 0;
				var lastArgs = [];
				var lastResult = void 0;
				var calledOnce = false;
				var isNewArgEqualToLast = function isNewArgEqualToLast(newArg, index) {
					return isEqual(newArg, lastArgs[index]);
				};
				return function result() {
					for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) newArgs[_key] = arguments[_key];
					if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) return lastResult;
					calledOnce = true;
					lastThis = this;
					lastArgs = newArgs;
					lastResult = resultFn.apply(this, newArgs);
					return lastResult;
				};
			}
			module$11.exports = index;
		})
	]);
})))(), 1);
/**
* Renders text matching the active settings search terminology with a highlight wrapper.
* Will render text minimally without highlights if empty or no text provided.
*/
var SettingsSearchHighlight = ({ text, children, className, highlightClassName }) => {
	const searchWords = useSettingsState("searchWords");
	const content = text ?? children ?? "";
	if (!content) return null;
	if (!searchWords || !searchWords.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_main.default, {
		className,
		searchWords,
		textToHighlight: content,
		highlightClassName: highlightClassName ?? "bg-warning/40 rounded-sm px-0.5",
		autoEscape: true
	});
};
//#endregion
//#region src/renderer/mainWindow/components/LynxSwitch.tsx
var { Description: Description$8, Surface, Switch } = await importShared("@heroui/react");
var { useCallback: useCallback$7, useEffect: useEffect$10, useState: useState$10 } = await importShared("react");
/**
* Customizable switch component with title, description, and search highlighting.
* Supports both controlled and uncontrolled modes.
*/
function LynxSwitch({ enabled = false, onEnabledChange, title, description, isDisabled, className, size = "md", thumbIcon, icon, variant = "default" }) {
	const [isSelected, setIsSelected] = useState$10(enabled);
	useEffect$10(() => {
		setIsSelected(enabled);
	}, [enabled]);
	const onChange = useCallback$7((selected) => {
		setIsSelected(selected);
		onEnabledChange?.(selected);
	}, [onEnabledChange]);
	const toggle = () => {
		setIsSelected(!isSelected);
		onEnabledChange?.(!isSelected);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Surface, {
		className: `px-3 py-2 rounded-2xl transition-colors duration-300 ${isDisabled ? "" : "cursor-pointer"} border-2 ${isSelected ? "border-accent/40" : "border-surface"} w-full shadow-surface`,
		variant,
		onClick: isDisabled ? void 0 : toggle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			size,
			onChange,
			isDisabled,
			isSelected,
			className: ["", className].join(" "),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Switch.Content, {
				className: "flex flex-row items-center justify-between w-full gap-x-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-row items-center gap-x-2",
					children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSearchHighlight, { text: title })
					})]
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$8, {
					className: "pointer-events-none p-0",
					children: typeof description === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSearchHighlight, {
						text: description,
						className: "text-xs text-muted"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: description
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch.Control, { children: thumbIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch.Thumb, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch.Icon, { children: thumbIcon }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch.Thumb, {}) })]
			})
		})
	});
}
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/arrows/LineDuotone/AltArrowDown.mjs
var { forwardRef: t$8 } = await importShared("react");
var r$8 = t$8((t, r) => (0, import_jsx_runtime.jsx)(r$25, {
	ref: r,
	...t,
	children: (0, import_jsx_runtime.jsx)(`path`, {
		d: `M19 9L12 15L5 9`,
		stroke: `currentColor`,
		strokeWidth: `1.5`,
		strokeLinecap: `round`,
		strokeLinejoin: `round`
	})
}));
r$8.displayName = `AltArrowDown`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/arrows/LineDuotone/AltArrowUp.mjs
var { forwardRef: t$7 } = await importShared("react");
var r$7 = t$7((t, r) => (0, import_jsx_runtime.jsx)(r$25, {
	ref: r,
	...t,
	children: (0, import_jsx_runtime.jsx)(`path`, {
		d: `M19 15L12 9L5 15`,
		stroke: `currentColor`,
		strokeWidth: `1.5`,
		strokeLinecap: `round`,
		strokeLinejoin: `round`
	})
}));
r$7.displayName = `AltArrowUp`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/arrows/LineDuotone/ArrowDown.mjs
var { forwardRef: t$6 } = await importShared("react");
var i$4 = t$6((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M12.75 4C12.75 3.58579 12.4142 3.25 12 3.25C11.5858 3.25 11.25 3.58579 11.25 4L12.75 4ZM11.25 4L11.25 20H12.75L12.75 4L11.25 4Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M18 14L12 20L6 14`,
		stroke: `currentColor`,
		strokeWidth: `1.5`,
		strokeLinecap: `round`,
		strokeLinejoin: `round`
	})]
}));
i$4.displayName = `ArrowDown`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/ui/LineDuotone/Pin.mjs
var { forwardRef: t$5 } = await importShared("react");
var i$3 = t$5((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		d: `M15.9894 4.9502L16.52 4.42014L16.52 4.42014L15.9894 4.9502ZM19.0717 8.03562L18.5411 8.56568L18.5411 8.56568L19.0717 8.03562ZM8.73845 19.429L8.20785 19.9591L8.73845 19.429ZM4.62176 15.3081L5.15236 14.7781L4.62176 15.3081ZM17.567 14.9943L17.3032 14.2922L17.567 14.9943ZM15.6499 15.7146L15.9137 16.4167L15.6499 15.7146ZM8.33227 8.38177L7.62805 8.12375H7.62805L8.33227 8.38177ZM9.02673 6.48636L9.73095 6.74438L9.02673 6.48636ZM5.84512 10.6735L6.04445 11.3965H6.04445L5.84512 10.6735ZM7.30174 10.1351L6.86354 9.52646L6.86354 9.52646L7.30174 10.1351ZM7.6759 9.79038L8.24673 10.2768H8.24673L7.6759 9.79038ZM14.2511 16.3805L14.7421 16.9475L14.7421 16.9475L14.2511 16.3805ZM13.3807 18.2012L12.6575 18.0022V18.0022L13.3807 18.2012ZM13.917 16.7466L13.3076 16.3094L13.3076 16.3094L13.917 16.7466ZM2.71854 12.7552L1.96855 12.76V12.76L2.71854 12.7552ZM2.93053 11.9521L2.28061 11.5778H2.28061L2.93053 11.9521ZM11.3053 21.3431L11.3064 20.5931H11.3064L11.3053 21.3431ZM12.0933 21.1347L11.7216 20.4833L11.7216 20.4833L12.0933 21.1347ZM11.6973 2.03606L11.8589 2.76845L11.6973 2.03606ZM15.4588 5.48026L18.5411 8.56568L19.6023 7.50556L16.52 4.42014L15.4588 5.48026ZM9.26905 18.8989L5.15236 14.7781L4.09116 15.8382L8.20785 19.9591L9.26905 18.8989ZM17.3032 14.2922L15.3861 15.0125L15.9137 16.4167L17.8308 15.6964L17.3032 14.2922ZM9.03649 8.63979L9.73095 6.74438L8.32251 6.22834L7.62805 8.12375L9.03649 8.63979ZM6.04445 11.3965C6.75591 11.2003 7.29726 11.0625 7.73995 10.7438L6.86354 9.52646C6.6906 9.65097 6.46608 9.72428 5.64578 9.95044L6.04445 11.3965ZM7.62805 8.12375C7.3351 8.92332 7.24345 9.14153 7.10507 9.30391L8.24673 10.2768C8.60048 9.86175 8.78237 9.33337 9.03649 8.63979L7.62805 8.12375ZM7.73995 10.7438C7.92704 10.6091 8.09719 10.4523 8.24673 10.2768L7.10507 9.30391C7.03377 9.38757 6.95268 9.46229 6.86354 9.52646L7.73995 10.7438ZM15.3861 15.0125C14.697 15.2714 14.1717 15.4571 13.7601 15.8135L14.7421 16.9475C14.9029 16.8082 15.1193 16.7152 15.9137 16.4167L15.3861 15.0125ZM14.1038 18.4001C14.3291 17.5813 14.4022 17.3569 14.5263 17.1838L13.3076 16.3094C12.9903 16.7517 12.853 17.2919 12.6575 18.0022L14.1038 18.4001ZM13.7601 15.8135C13.5904 15.9605 13.4385 16.1269 13.3076 16.3094L14.5263 17.1838C14.5888 17.0968 14.6612 17.0175 14.7421 16.9475L13.7601 15.8135ZM5.15236 14.7781C4.50623 14.1313 4.06806 13.691 3.78374 13.3338C3.49842 12.9753 3.46896 12.8201 3.46852 12.7505L1.96855 12.76C1.97223 13.3422 2.26135 13.8297 2.6101 14.2679C2.95984 14.7073 3.47123 15.2176 4.09116 15.8382L5.15236 14.7781ZM5.64578 9.95044C4.80056 10.1835 4.10403 10.3743 3.58304 10.5835C3.06349 10.792 2.57124 11.0732 2.28061 11.5778L3.58045 12.3264C3.61507 12.2663 3.717 12.146 4.14187 11.9755C4.56531 11.8055 5.16345 11.6394 6.04445 11.3965L5.64578 9.95044ZM3.46852 12.7505C3.46758 12.6016 3.50623 12.4553 3.58045 12.3264L2.28061 11.5778C2.07362 11.9372 1.96593 12.3452 1.96855 12.76L3.46852 12.7505ZM8.20785 19.9591C8.83172 20.5836 9.34472 21.0987 9.78654 21.4506C10.2271 21.8015 10.718 22.0922 11.3042 22.0931L11.3064 20.5931C11.237 20.593 11.0815 20.5644 10.7211 20.2773C10.3619 19.9912 9.91931 19.5499 9.26905 18.8989L8.20785 19.9591ZM12.6575 18.0022C12.4133 18.8897 12.2463 19.4924 12.0752 19.9188C11.9034 20.3467 11.7822 20.4487 11.7216 20.4833L12.4651 21.7861C12.9741 21.4956 13.2573 21.0004 13.4672 20.4775C13.6777 19.9532 13.8695 19.2516 14.1038 18.4001L12.6575 18.0022ZM11.3042 22.0931C11.7113 22.0937 12.1115 21.9879 12.4651 21.7861L11.7216 20.4833C11.5951 20.5555 11.452 20.5933 11.3064 20.5931L11.3042 22.0931ZM18.5411 8.56568C19.6046 9.63022 20.3403 10.3695 20.7918 10.9788C21.2353 11.5774 21.2864 11.8959 21.2322 12.1464L22.6983 12.4634C22.8882 11.5854 22.5383 10.8162 21.997 10.0857C21.4636 9.36592 20.6306 8.53486 19.6023 7.50556L18.5411 8.56568ZM17.8308 15.6964C19.1922 15.1849 20.2941 14.773 21.0771 14.3384C21.8719 13.8973 22.5084 13.3416 22.6983 12.4634L21.2322 12.1464C21.178 12.3968 21.0002 12.6655 20.3492 13.0268C19.6865 13.3946 18.7113 13.7632 17.3032 14.2922L17.8308 15.6964ZM16.52 4.42014C15.4841 3.3832 14.6481 2.54353 13.9246 2.00638C13.1909 1.46165 12.4175 1.10912 11.5357 1.30367L11.8589 2.76845C12.1086 2.71335 12.4278 2.7633 13.0305 3.21075C13.6434 3.66579 14.3877 4.40801 15.4588 5.48026L16.52 4.42014ZM9.73095 6.74438C10.2526 5.32075 10.6162 4.33403 10.9813 3.66315C11.3403 3.00338 11.6091 2.82357 11.8589 2.76845L11.5357 1.30367C10.6541 1.49819 10.1006 2.14332 9.6637 2.94618C9.23286 3.73793 8.82695 4.85154 8.32251 6.22834L9.73095 6.74438Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		opacity: `0.5`,
		d: `M1.4694 21.4697C1.17666 21.7627 1.1769 22.2376 1.46994 22.5304C1.76298 22.8231 2.23786 22.8229 2.5306 22.5298L1.4694 21.4697ZM7.18383 17.8719C7.47657 17.5788 7.47633 17.1039 7.18329 16.8112C6.89024 16.5185 6.41537 16.5187 6.12263 16.8117L7.18383 17.8719ZM2.5306 22.5298L7.18383 17.8719L6.12263 16.8117L1.4694 21.4697L2.5306 22.5298Z`,
		fill: `currentColor`
	})]
}));
i$3.displayName = `Pin`;
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.mjs
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/lucide-react/dist/esm/context.mjs
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var { createContext, useContext, useMemo: useMemo$3, createElement: createElement$2 } = await importShared("react");
var LucideContext = createContext({});
var useLucideContext = () => useContext(LucideContext);
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.mjs
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var { forwardRef: forwardRef$1, createElement: createElement$1 } = await importShared("react");
var Icon = forwardRef$1(({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
	return createElement$1("svg", {
		ref,
		...defaultAttributes,
		width: size ?? contextSize ?? defaultAttributes.width,
		height: size ?? contextSize ?? defaultAttributes.height,
		stroke: color ?? contextColor,
		strokeWidth: calculatedStrokeWidth,
		className: mergeClasses("lucide", contextClass, className),
		...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
		...rest
	}, [...iconNode.map(([tag, attrs]) => createElement$1(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var { forwardRef, createElement } = await importShared("react");
var createLucideIcon = (iconName, iconNode) => {
	const Component = forwardRef(({ className, ...props }, ref) => createElement(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BookOpen = createLucideIcon("book-open", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Plus = createLucideIcon("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SquarePen = createLucideIcon("square-pen", [["path", {
	d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
	key: "1m0v6g"
}], ["path", {
	d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
	key: "ohrbg2"
}]]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TrendingUp = createLucideIcon("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region extension/src/renderer/components/CreateSkillTab/agentPaths.ts
var AGENT_PATHS = {
	"aider-desk": {
		project: ".aider-desk/skills",
		global: "~/.aider-desk/skills",
		displayName: "AiderDesk"
	},
	amp: {
		project: ".agents/skills",
		global: "~/.config/agents/skills",
		displayName: "Amp"
	},
	replit: {
		project: ".agents/skills",
		global: "~/.config/agents/skills",
		displayName: "Replit"
	},
	universal: {
		project: ".agents/skills",
		global: "~/.config/agents/skills",
		displayName: "Universal"
	},
	antigravity: {
		project: ".agents/skills",
		global: "~/.gemini/antigravity/skills",
		displayName: "Antigravity"
	},
	"antigravity-cli": {
		project: ".agents/skills",
		global: "~/.gemini/antigravity-cli/skills",
		displayName: "Antigravity CLI"
	},
	astrbot: {
		project: "data/skills",
		global: "~/.astrbot/data/skills",
		displayName: "AstrBot"
	},
	"autohand-code": {
		project: ".autohand/skills",
		global: "~/.autohand/skills",
		displayName: "Autohand Code CLI"
	},
	augment: {
		project: ".augment/skills",
		global: "~/.augment/skills",
		displayName: "Augment"
	},
	bob: {
		project: ".bob/skills",
		global: "~/.bob/skills",
		displayName: "IBM Bob"
	},
	"claude-code": {
		project: ".claude/skills",
		global: "~/.claude/skills",
		displayName: "Claude Code"
	},
	openclaw: {
		project: "skills",
		global: "~/.openclaw/skills",
		displayName: "OpenClaw"
	},
	cline: {
		project: ".agents/skills",
		global: "~/.agents/skills",
		displayName: "Cline"
	},
	dexto: {
		project: ".agents/skills",
		global: "~/.agents/skills",
		displayName: "Dexto"
	},
	"kimi-code-cli": {
		project: ".agents/skills",
		global: "~/.agents/skills",
		displayName: "Kimi Code CLI"
	},
	loaf: {
		project: ".agents/skills",
		global: "~/.agents/skills",
		displayName: "Loaf"
	},
	warp: {
		project: ".agents/skills",
		global: "~/.agents/skills",
		displayName: "Warp"
	},
	zed: {
		project: ".agents/skills",
		global: "~/.agents/skills",
		displayName: "Zed"
	},
	"codearts-agent": {
		project: ".codeartsdoer/skills",
		global: "~/.codeartsdoer/skills",
		displayName: "CodeArts Agent"
	},
	codebuddy: {
		project: ".codebuddy/skills",
		global: "~/.codebuddy/skills",
		displayName: "CodeBuddy"
	},
	codemaker: {
		project: ".codemaker/skills",
		global: "~/.codemaker/skills",
		displayName: "Codemaker"
	},
	codestudio: {
		project: ".codestudio/skills",
		global: "~/.codestudio/skills",
		displayName: "Code Studio"
	},
	codex: {
		project: ".agents/skills",
		global: "~/.codex/skills",
		displayName: "Codex"
	},
	"command-code": {
		project: ".commandcode/skills",
		global: "~/.commandcode/skills",
		displayName: "Command Code"
	},
	continue: {
		project: ".continue/skills",
		global: "~/.continue/skills",
		displayName: "Continue"
	},
	cortex: {
		project: ".cortex/skills",
		global: "~/.snowflake/cortex/skills",
		displayName: "Cortex Code"
	},
	crush: {
		project: ".crush/skills",
		global: "~/.config/crush/skills",
		displayName: "Crush"
	},
	cursor: {
		project: ".agents/skills",
		global: "~/.cursor/skills",
		displayName: "Cursor"
	},
	deepagents: {
		project: ".agents/skills",
		global: "~/.deepagents/agent/skills",
		displayName: "Deep Agents"
	},
	devin: {
		project: ".devin/skills",
		global: "~/.config/devin/skills",
		displayName: "Devin for Terminal"
	},
	droid: {
		project: ".factory/skills",
		global: "~/.factory/skills",
		displayName: "Droid"
	},
	eve: {
		project: "agent/skills",
		global: "",
		displayName: "Eve"
	},
	firebender: {
		project: ".agents/skills",
		global: "~/.firebender/skills",
		displayName: "Firebender"
	},
	forgecode: {
		project: ".forge/skills",
		global: "~/.forge/skills",
		displayName: "ForgeCode"
	},
	"gemini-cli": {
		project: ".agents/skills",
		global: "~/.gemini/skills",
		displayName: "Gemini CLI"
	},
	"github-copilot": {
		project: ".agents/skills",
		global: "~/.copilot/skills",
		displayName: "GitHub Copilot"
	},
	goose: {
		project: ".goose/skills",
		global: "~/.config/goose/skills",
		displayName: "Goose"
	},
	"hermes-agent": {
		project: ".hermes/skills",
		global: "~/.hermes/skills",
		displayName: "Hermes Agent"
	},
	"inference-sh": {
		project: ".inferencesh/skills",
		global: "~/.inferencesh/skills",
		displayName: "inference.sh"
	},
	jazz: {
		project: ".jazz/skills",
		global: "~/.jazz/skills",
		displayName: "Jazz"
	},
	junie: {
		project: ".junie/skills",
		global: "~/.junie/skills",
		displayName: "Junie"
	},
	"iflow-cli": {
		project: ".iflow/skills",
		global: "~/.iflow/skills",
		displayName: "iFlow CLI"
	},
	kilo: {
		project: ".kilocode/skills",
		global: "~/.kilocode/skills",
		displayName: "Kilo Code"
	},
	"kiro-cli": {
		project: ".kiro/skills",
		global: "~/.kiro/skills",
		displayName: "Kiro CLI"
	},
	kode: {
		project: ".kode/skills",
		global: "~/.kode/skills",
		displayName: "Kode"
	},
	lingma: {
		project: ".lingma/skills",
		global: "~/.lingma/skills",
		displayName: "Lingma"
	},
	mcpjam: {
		project: ".mcpjam/skills",
		global: "~/.mcpjam/skills",
		displayName: "MCPJam"
	},
	"mistral-vibe": {
		project: ".vibe/skills",
		global: "~/.vibe/skills",
		displayName: "Mistral Vibe"
	},
	moxby: {
		project: ".moxby/skills",
		global: "~/.moxby/skills",
		displayName: "Moxby"
	},
	mux: {
		project: ".mux/skills",
		global: "~/.mux/skills",
		displayName: "Mux"
	},
	opencode: {
		project: ".agents/skills",
		global: "~/.config/opencode/skills",
		displayName: "OpenCode"
	},
	openhands: {
		project: ".openhands/skills",
		global: "~/.openhands/skills",
		displayName: "OpenHands"
	},
	ona: {
		project: ".ona/skills",
		global: "~/.ona/skills",
		displayName: "Ona"
	},
	pi: {
		project: ".pi/skills",
		global: "~/.pi/agent/skills",
		displayName: "Pi"
	},
	qoder: {
		project: ".qoder/skills",
		global: "~/.qoder/skills",
		displayName: "Qoder"
	},
	"qoder-cn": {
		project: ".qoder/skills",
		global: "~/.qoder-cn/skills",
		displayName: "Qoder CN"
	},
	"qwen-code": {
		project: ".qwen/skills",
		global: "~/.qwen/skills",
		displayName: "Qwen Code"
	},
	reasonix: {
		project: ".reasonix/skills",
		global: "~/.reasonix/skills",
		displayName: "Reasonix"
	},
	rovodev: {
		project: ".rovodev/skills",
		global: "~/.rovodev/skills",
		displayName: "Rovo Dev"
	},
	roo: {
		project: ".roo/skills",
		global: "~/.roo/skills",
		displayName: "Roo Code"
	},
	"tabnine-cli": {
		project: ".tabnine/agent/skills",
		global: "~/.tabnine/agent/skills",
		displayName: "Tabnine CLI"
	},
	terramind: {
		project: ".terramind/skills",
		global: "~/.terramind/skills",
		displayName: "Terramind"
	},
	tinycloud: {
		project: ".tinycloud/skills",
		global: "~/.tinycloud/skills",
		displayName: "Tinycloud"
	},
	trae: {
		project: ".trae/skills",
		global: "~/.trae/skills",
		displayName: "Trae"
	},
	"trae-cn": {
		project: ".trae/skills",
		global: "~/.trae-cn/skills",
		displayName: "Trae CN"
	},
	windsurf: {
		project: ".windsurf/skills",
		global: "~/.codeium/windsurf/skills",
		displayName: "Windsurf"
	},
	zencoder: {
		project: ".zencoder/skills",
		global: "~/.zencoder/skills",
		displayName: "Zencoder"
	},
	zenflow: {
		project: ".zencoder/skills",
		global: "~/.zencoder/skills",
		displayName: "Zenflow"
	},
	neovate: {
		project: ".neovate/skills",
		global: "~/.neovate/skills",
		displayName: "Neovate"
	},
	pochi: {
		project: ".pochi/skills",
		global: "~/.pochi/skills",
		displayName: "Pochi"
	},
	promptscript: {
		project: ".agents/skills",
		global: "",
		displayName: "PromptScript"
	},
	adal: {
		project: ".adal/skills",
		global: "~/.adal/skills",
		displayName: "AdaL"
	}
};
//#endregion
//#region extension/src/renderer/components/CreateSkillTab/index.tsx
var { Button: Button$9, Card: Card$3, Checkbox: Checkbox$5, Description: Description$7, Form, Input, Label: Label$5, ListBox: ListBox$3, ScrollShadow: ScrollShadow$3, Select: Select$3, Tabs: Tabs$3, TextArea, TextField, Typography: Typography$7 } = await importShared("@heroui/react");
var { useCallback: useCallback$6, useEffect: useEffect$9, useMemo: useMemo$2, useState: useState$9 } = await importShared("react");
var ipc$9 = window.electron.ipcRenderer;
function CreateSkillTab({ onCreated }) {
	const [name, setName] = useState$9("");
	const [description, setDescription] = useState$9("");
	const [scope, setScope] = useState$9("project");
	const [projectDirs, setProjectDirs] = useState$9([]);
	const [selectedProjectCwd, setSelectedProjectCwd] = useState$9("");
	const [agents, setAgents] = useState$9([]);
	const [selectedAgents, setSelectedAgents] = useState$9([]);
	const [agentFilter, setAgentFilter] = useState$9("");
	const [isInternal, setIsInternal] = useState$9(false);
	const [allowedTools, setAllowedTools] = useState$9([]);
	const [toolInput, setToolInput] = useState$9("");
	const [instructionsMode, setInstructionsMode] = useState$9("steps");
	const [whenToUse, setWhenToUse] = useState$9("");
	const [steps, setSteps] = useState$9(["First, do this", "Then, do that"]);
	const [customMarkdown, setCustomMarkdown] = useState$9("");
	const [isCreating, setIsCreating] = useState$9(false);
	const [creationSuccess, setCreationSuccess] = useState$9(false);
	const [creationError, setCreationError] = useState$9("");
	const [createdPaths, setCreatedPaths] = useState$9([]);
	const [isOverwriteModalOpen, setIsOverwriteModalOpen] = useState$9(false);
	const loadProjectDirs = useCallback$6(async () => {
		try {
			const dirs = await ipc$9.invoke("skills-manager:get-project-dirs");
			setProjectDirs(dirs || []);
			if (dirs && dirs.length > 0 && !selectedProjectCwd) setSelectedProjectCwd(dirs[0]);
		} catch (err) {
			console.error("Failed to load project directories:", err);
		}
	}, [selectedProjectCwd]);
	useEffect$9(() => {
		loadProjectDirs();
	}, [loadProjectDirs]);
	useEffect$9(() => {
		async function loadAgents() {
			try {
				const cliAgents = await ipc$9.invoke("skills-manager:get-agents");
				if (cliAgents && cliAgents.length > 0) {
					const mapped = cliAgents.map((a) => {
						const info = AGENT_PATHS[a.name] || {
							project: ".agents/skills",
							global: `~/.agents/skills`,
							displayName: a.displayName || a.name
						};
						return {
							name: a.name,
							displayName: info.displayName,
							project: info.project,
							global: info.global
						};
					});
					setAgents(mapped);
				} else {
					const standard = Object.entries(AGENT_PATHS).map(([key, info]) => ({
						name: key,
						displayName: info.displayName,
						project: info.project,
						global: info.global
					}));
					setAgents(standard);
				}
			} catch (err) {
				console.error("Failed to load agents:", err);
				const standard = Object.entries(AGENT_PATHS).map(([key, info]) => ({
					name: key,
					displayName: info.displayName,
					project: info.project,
					global: info.global
				}));
				setAgents(standard);
			}
		}
		loadAgents();
	}, []);
	const filteredAgents = useMemo$2(() => {
		if (!agentFilter.trim()) return agents;
		const query = agentFilter.toLowerCase();
		return agents.filter((a) => a.name.toLowerCase().includes(query) || a.displayName.toLowerCase().includes(query));
	}, [agents, agentFilter]);
	const isNameInvalid = useMemo$2(() => {
		if (!name) return false;
		return !/^[a-z0-9-]+$/.test(name);
	}, [name]);
	const isFormValid = useMemo$2(() => {
		if (!name.trim() || isNameInvalid) return false;
		if (!description.trim()) return false;
		if (selectedAgents.length === 0) return false;
		if (scope === "project" && !selectedProjectCwd) return false;
		return true;
	}, [
		name,
		isNameInvalid,
		description,
		selectedAgents,
		scope,
		selectedProjectCwd
	]);
	const handleAddTool = (e) => {
		e?.preventDefault();
		const trimmed = toolInput.trim();
		if (trimmed && !allowedTools.includes(trimmed)) {
			setAllowedTools([...allowedTools, trimmed]);
			setToolInput("");
		}
	};
	const handleRemoveTool = (tool) => {
		setAllowedTools(allowedTools.filter((t) => t !== tool));
	};
	const generatedMarkdown = useMemo$2(() => {
		let yaml = "---\n";
		yaml += `name: ${name.trim().toLowerCase() || "my-skill"}\n`;
		const descStr = description.trim().replace(/"/g, "\\\"") || "Brief explanation of what this skill does";
		yaml += `description: "${descStr}"\n`;
		let metadataYaml = "";
		if (isInternal) metadataYaml += "  internal: true\n";
		if (metadataYaml) yaml += "metadata:\n" + metadataYaml;
		if (allowedTools.length > 0) {
			yaml += "allowed-tools:\n";
			allowedTools.forEach((tool) => {
				yaml += `  - ${tool.trim()}\n`;
			});
		}
		yaml += "---\n\n";
		const displayName = name ? name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "My Skill";
		yaml += `# ${displayName}\n\n`;
		if (instructionsMode === "steps") {
			yaml += "## When to Use\n\n";
			yaml += `${whenToUse.trim() || "Describe the scenarios where this skill should be used."}\n\n`;
			yaml += "## Steps\n\n";
			if (steps.length > 0) steps.forEach((step, idx) => {
				yaml += `${idx + 1}. ${step.trim() || "Instruction step"}\n`;
			});
			else yaml += "1. First, do this\n2. Then, do that\n";
			yaml += "\n";
		} else yaml += `${customMarkdown.trim() || "# Instructions\n\nWrite your detailed custom markdown instructions here."}\n`;
		return yaml;
	}, [
		name,
		description,
		isInternal,
		allowedTools,
		instructionsMode,
		whenToUse,
		steps,
		customMarkdown
	]);
	const handleBrowseProjectFolder = async () => {
		try {
			const dir = await ipc$9.invoke("skills-manager:select-project-dir");
			if (dir) {
				const updated = await ipc$9.invoke("skills-manager:add-project-dir", dir);
				setProjectDirs(updated || []);
				setSelectedProjectCwd(dir);
			}
		} catch (err) {
			console.error("Failed to select project directory:", err);
		}
	};
	const handleCreateSkill = async (overwrite = false) => {
		if (!isFormValid) return;
		setIsCreating(true);
		setCreationError("");
		setCreationSuccess(false);
		try {
			const agentPaths = selectedAgents.map((agentName) => {
				const found = agents.find((a) => a.name === agentName);
				return {
					agent: agentName,
					path: found ? scope === "project" ? found.project : found.global : ".agents/skills"
				};
			});
			const result = await ipc$9.invoke("skills-manager:create-skill", name.trim().toLowerCase(), scope, scope === "project" ? selectedProjectCwd : void 0, agentPaths, generatedMarkdown, overwrite);
			if (result.success) {
				setCreationSuccess(true);
				setCreatedPaths(result.paths || []);
				setIsOverwriteModalOpen(false);
			} else if (result.exists) setIsOverwriteModalOpen(true);
			else setCreationError(result.error || "Failed to create skill file.");
		} catch (err) {
			console.error("Failed to create skill:", err);
			setCreationError(err.message || String(err));
		} finally {
			setIsCreating(false);
		}
	};
	const resetForm = () => {
		setName("");
		setDescription("");
		setSelectedAgents([]);
		setIsInternal(false);
		setAllowedTools([]);
		setToolInput("");
		setWhenToUse("");
		setSteps(["First, do this", "Then, do that"]);
		setCustomMarkdown("");
		setCreationSuccess(false);
		setCreationError("");
		setCreatedPaths([]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 flex gap-6 overflow-hidden h-full min-h-0 pt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 flex flex-col gap-5 overflow-y-auto px-1 scrollbar-thin",
				children: creationSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$3, {
					className: "p-6 bg-surface-secondary border border-emerald-500/20 text-center flex flex-col items-center justify-center gap-4 my-auto max-w-xl mx-auto rounded-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$8, { className: "size-16 text-emerald-500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$7, {
							className: "text-xl font-bold text-emerald-400",
							children: "Skill Created Successfully!"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Description$7, {
							className: "text-xs text-semi-muted mt-1 leading-relaxed",
							children: [
								"Your custom skill",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "text-accent bg-foreground/5 px-1.5 py-0.5 rounded font-JetBrainsMono",
									children: name.toLowerCase()
								}),
								" ",
								"has been created and wired into the agent directories."
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full text-left bg-black/20 p-3.5 border border-border/40 rounded-2xl flex flex-col gap-1.5 mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-semi-muted",
								children: "Created Locations:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-1 text-[11px] font-JetBrainsMono text-foreground/80 break-all select-all",
								children: createdPaths.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1.5 items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$17, { className: "size-3.5 shrink-0 text-LynxBlue/80 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p })]
								}, p))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$9, {
								size: "sm",
								variant: "ghost",
								onPress: resetForm,
								children: "Create Another"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$9, {
								size: "sm",
								onPress: onCreated,
								className: "bg-LynxPurple text-white",
								children: "View Installed Skills"
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form, {
					onSubmit: (e) => {
						e.preventDefault();
						handleCreateSkill();
					},
					className: "flex flex-col gap-5",
					children: [
						creationError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card$3, {
							className: "p-4 bg-danger/10 border border-danger/20 rounded-2xl flex flex-row gap-2.5 items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-danger text-sm font-semibold",
								children: creationError
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$5, {
								className: "text-xs font-semibold text-semi-muted",
								children: "Installation Scope"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$3, {
								selectedKey: scope,
								onSelectionChange: (key) => setScope(key),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$3.ListContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$3.List, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$3.Tab, {
									id: "project",
									children: "Project-scoped"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$3.Tab, {
									id: "global",
									children: "Global (User-level)"
								})] }) })
							})]
						}),
						scope === "project" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$5, {
									className: "text-xs font-semibold text-semi-muted",
									children: "Target Project Destination"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$3, {
										className: "flex-1",
										variant: "secondary",
										value: selectedProjectCwd,
										placeholder: "Select project folder...",
										onChange: (val) => setSelectedProjectCwd(val),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$3.Trigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$3.Value, {
											className: "font-JetBrainsMono text-sm",
											children: selectedProjectCwd || "Select a project folder..."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$3.Indicator, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$3.Popover, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$3, { children: projectDirs.map((dir) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$3.Item, {
											id: dir,
											textValue: dir,
											className: "font-JetBrainsMono text-xs",
											children: [dir, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$3.ItemIndicator, {})]
										}, dir)) }) })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$9, {
										variant: "secondary",
										onPress: handleBrowseProjectFolder,
										className: "flex items-center gap-1.5 shrink-0 px-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$17, { className: "size-4" }), " Browse"]
									})]
								}),
								projectDirs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-danger mt-0.5",
									children: "No project folders registered. Click \"Browse\" to register a workspace folder."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TextField, {
								isInvalid: isNameInvalid,
								isRequired: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$5, {
										className: "text-xs font-semibold text-semi-muted",
										children: "Skill Name (ID)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: name,
										variant: "secondary",
										onChange: (e) => setName(e.target.value),
										placeholder: "e.g. custom-git-summarizer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$7, {
										className: "text-[10px]",
										children: "Unique, lowercase with hyphens. Avoid spaces or special characters."
									}),
									isNameInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-danger",
										children: "Invalid name. Only lowercase letters, numbers, and hyphens are allowed."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TextField, {
								isRequired: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$5, {
										className: "text-xs font-semibold text-semi-muted",
										children: "Short Description"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
										onChange: (e) => {
											setDescription(e.target.value);
											const target = e.target;
											target.style.height = "auto";
											target.style.height = `${target.scrollHeight}px`;
										},
										rows: 1,
										variant: "secondary",
										value: description,
										placeholder: "e.g. Summarizes git branch differences and formats logs",
										className: "resize-none min-h-0 py-2 overflow-hidden leading-normal font-Nunito"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$7, {
										className: "text-[10px]",
										children: "Brief summary explaining when the agent should activate this skill."
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LynxSwitch, {
							description: "Mark this skill as internal. It will only be visible in the agent if `INSTALL_INTERNAL_SKILLS=1` is set.",
							variant: "secondary",
							enabled: isInternal,
							title: "Internal Skill",
							onEnabledChange: setIsInternal
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$5, {
									className: "text-xs font-semibold text-semi-muted",
									children: "Allowed Tools (Optional)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										onKeyDown: (e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												handleAddTool();
											}
										},
										value: toolInput,
										variant: "secondary",
										className: "flex-1 font-JetBrainsMono",
										placeholder: "e.g. run_command, read_file",
										onChange: (e) => setToolInput(e.target.value)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$9, {
										variant: "secondary",
										onPress: () => handleAddTool(),
										className: "shrink-0 gap-1 px-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add Tool"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$7, {
									className: "text-[10px] -mt-1",
									children: "Restricts the agent to execution of these specific tools when the skill is active. Type and hit Enter to add."
								}),
								allowedTools.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5 p-2 bg-black/10 border border-border/30 rounded-xl mt-1",
									children: allowedTools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 bg-LynxBlue/15 text-LynxBlue border border-LynxBlue/30 text-xs px-2.5 py-1 rounded-full font-JetBrainsMono",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tool }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `Remove tool ${tool}`,
											onClick: () => handleRemoveTool(tool),
											className: "hover:text-white transition-colors cursor-pointer ml-0.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
										})]
									}, tool))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$5, {
											className: "text-xs font-semibold text-semi-muted",
											children: "Target Coding Agents"
										}), selectedAgents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] bg-LynxPurple/20 text-LynxPurple px-1.5 py-0.5 rounded-full font-bold",
											children: selectedAgents.length
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-3 text-[10px] font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-LynxBlue hover:underline cursor-pointer",
											onClick: () => setSelectedAgents(agents.map((a) => a.name)),
											children: "Select All"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSelectedAgents([]),
											className: "text-semi-muted hover:underline cursor-pointer",
											children: "Clear Selection"
										})]
									})]
								}),
								selectedAgents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5 p-2 bg-black/5 border border-border/20 rounded-xl max-h-20 overflow-y-auto scrollbar-thin",
									children: selectedAgents.map((agentName) => {
										const agent = agents.find((a) => a.name === agentName);
										const displayName = agent ? agent.displayName : agentName;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 bg-LynxPurple/15 text-LynxPurple border border-LynxPurple/25 text-[10px] px-2 py-0.5 rounded-full font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: displayName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": `Deselect ${displayName}`,
												className: "hover:text-white transition-colors cursor-pointer ml-0.5",
												onClick: () => setSelectedAgents(selectedAgents.filter((name) => name !== agentName)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-2.5" })
											})]
										}, agentName);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$3, {
									className: "flex flex-col gap-2.5 p-3.5 bg-surface-secondary border border-border/40 rounded-2xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										variant: "secondary",
										value: agentFilter,
										onChange: (e) => setAgentFilter(e.target.value),
										placeholder: "Filter agents (e.g., claude, antigravity)...",
										fullWidth: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollShadow$3, {
										size: 15,
										className: "max-h-35 flex flex-col gap-2 pr-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs",
											children: [filteredAgents.map((a) => {
												const isSelected = selectedAgents.includes(a.name);
												const targetPath = scope === "project" ? a.project : a.global;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													onClick: () => {
														setSelectedAgents((prev) => prev.includes(a.name) ? prev.filter((n) => n !== a.name) : [...prev, a.name]);
													},
													className: `flex items-start gap-2.5 p-2 rounded-xl border transition-all cursor-pointer select-none ${isSelected ? "bg-LynxPurple/10 border-LynxPurple/30" : "bg-black/10 border-border/30 hover:border-border/60"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$5, {
														onChange: () => {},
														isSelected,
														"aria-label": `Select ${a.displayName}`,
														className: "mt-0.5 shrink-0 pointer-events-none"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col gap-0.5 overflow-hidden",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold text-foreground/90 leading-tight",
															children: a.displayName
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															title: targetPath,
															className: "text-[9px] text-semi-muted font-JetBrainsMono truncate",
															children: targetPath
														})]
													})]
												}, a.name);
											}), filteredAgents.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-center text-semi-muted text-xs py-4 col-span-2",
												children: "No agents match your filter."
											})]
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$5, {
									className: "text-xs font-semibold text-semi-muted",
									children: "Skill Instructions Format"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$3, {
									selectedKey: instructionsMode,
									onSelectionChange: (key) => setInstructionsMode(key),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$3.ListContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$3.List, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$3.Tab, {
										id: "steps",
										children: "Step-by-Step Builder"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$3.Tab, {
										id: "markdown",
										children: "Raw Markdown"
									})] }) })
								}),
								instructionsMode === "steps" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-4 p-4 bg-surface-secondary border border-border/40 rounded-2xl mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TextField, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$5, {
										className: "text-xs font-semibold text-foreground/95",
										children: "When to Use Scenarios"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
										placeholder: "Describe precisely when this skill should trigger (e.g. 'Use this skill when asked to write release notes or summarize commits.')",
										rows: 3,
										value: whenToUse,
										variant: "secondary",
										onChange: (e) => setWhenToUse(e.target.value)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$5, {
												className: "text-xs font-semibold text-foreground/95",
												children: "Instructions Steps"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-col gap-2",
												children: steps.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-2 items-center",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs font-bold text-semi-muted w-5 shrink-0 text-right",
															children: [idx + 1, "."]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															onChange: (e) => {
																const updated = [...steps];
																updated[idx] = e.target.value;
																setSteps(updated);
															},
															value: step,
															className: "flex-1",
															placeholder: `Step ${idx + 1} instructions`
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex gap-1 shrink-0",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$9, {
																	onPress: () => {
																		const updated = [...steps];
																		const temp = updated[idx];
																		updated[idx] = updated[idx - 1];
																		updated[idx - 1] = temp;
																		setSteps(updated);
																	},
																	size: "sm",
																	variant: "ghost",
																	isDisabled: idx === 0,
																	isIconOnly: true,
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$7, {})
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$9, {
																	onPress: () => {
																		const updated = [...steps];
																		const temp = updated[idx];
																		updated[idx] = updated[idx + 1];
																		updated[idx + 1] = temp;
																		setSteps(updated);
																	},
																	size: "sm",
																	variant: "ghost",
																	isDisabled: idx === steps.length - 1,
																	isIconOnly: true,
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$8, {})
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$9, {
																	size: "sm",
																	variant: "danger-soft",
																	isDisabled: steps.length <= 1,
																	onPress: () => setSteps(steps.filter((_, i) => i !== idx)),
																	isIconOnly: true,
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$6, {})
																})
															]
														})
													]
												}, idx))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$9, {
												size: "sm",
												variant: "tertiary",
												className: "w-fit h-8 mt-1",
												onPress: () => setSteps([...steps, ""]),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Add Step"]
											})
										]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-1 p-1 bg-surface-secondary border border-border/40 rounded-2xl mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TextField, {
										className: "full-width",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$5, {
											className: "text-xs font-semibold text-foreground/95 px-3 pt-2",
											children: "Custom Markdown Body"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
											placeholder: "# Instructions\n\nUse standard markdown tags here.\nFor example, list out bulleted lists or subheadings.",
											rows: 12,
											variant: "secondary",
											value: customMarkdown,
											onChange: (e) => setCustomMarkdown(e.target.value),
											className: "font-JetBrainsMono text-xs leading-relaxed px-1"
										})]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-3 mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$9, {
								size: "sm",
								type: "button",
								variant: "ghost",
								className: "px-5",
								onPress: resetForm,
								children: "Reset"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$9, {
								size: "sm",
								type: "submit",
								isDisabled: !isFormValid || isCreating,
								className: "bg-LynxPurple text-white px-7 font-bold",
								children: isCreating ? "Creating..." : "Create Skill"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-[40%] hidden lg:flex flex-col gap-3 min-w-[320px] max-w-120",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-4 text-semi-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold text-semi-muted",
						children: "Live Preview (SKILL.md)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$3, {
					className: "flex-1 flex flex-col p-4 bg-surface-secondary border border-border/40 rounded-3xl overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] font-bold font-JetBrainsMono text-semi-muted border-b border-border/20 pb-2 mb-3",
						children: [
							"PATH: ",
							scope === "project" ? "./" : "~/",
							selectedAgents.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-LynxBlue font-bold",
								children: [
									scope === "project" ? agents.find((a) => a.name === selectedAgents[0])?.project || ".agents/skills" : agents.find((a) => a.name === selectedAgents[0])?.global || "~/.agents/skills",
									"/",
									name.toLowerCase() || "my-skill",
									"/SKILL.md"
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "[Select Agent]/[Skill-Name]/SKILL.md" }),
							selectedAgents.length > 1 && ` (+${selectedAgents.length - 1} other agents)`
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollShadow$3, {
						className: "flex-1 pr-1 font-JetBrainsMono text-[11px] leading-relaxed text-foreground/80 overflow-y-auto whitespace-pre-wrap select-text selection:bg-LynxPurple/30 select-none",
						children: generatedMarkdown
					})]
				})]
			}),
			isOverwriteModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$3, {
					className: "max-w-md w-full p-5 bg-surface-secondary border border-border/50 rounded-3xl flex flex-col gap-4 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$3.Header, {
							className: "pb-0 px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card$3.Title, {
								className: "text-base font-bold text-foreground/90",
								children: "Skill Already Exists"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$3.Description, {
								className: "text-xs text-semi-muted mt-1 leading-normal",
								children: [
									"A custom skill directory with the name",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono",
										children: name.toLowerCase()
									}),
									" ",
									"already exists in one of the selected agent destinations."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$3.Content, {
							className: "py-2 text-xs text-semi-muted",
							children: [
								"Are you sure you want to overwrite it? This action will replace the existing",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "font-JetBrainsMono",
									children: "SKILL.md"
								}),
								" file in those directories."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$3.Footer, {
							className: "flex justify-end gap-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$9, {
								size: "sm",
								variant: "ghost",
								onPress: () => setIsOverwriteModalOpen(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$9, {
								size: "sm",
								variant: "danger",
								className: "px-5 font-semibold",
								onPress: () => handleCreateSkill(true),
								children: "Overwrite"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region extension/src/renderer/components/CreateSkillTab.tsx
var CreateSkillTab_default = CreateSkillTab;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/arrows/Linear/AltArrowDown.mjs
var { forwardRef: t$4 } = await importShared("react");
var r$4 = t$4((t, r) => (0, import_jsx_runtime.jsx)(r$25, {
	ref: r,
	...t,
	children: (0, import_jsx_runtime.jsx)(`path`, {
		d: `M19 9L12 15L5 9`,
		stroke: `currentColor`,
		strokeWidth: `1.5`,
		strokeLinecap: `round`,
		strokeLinejoin: `round`
	})
}));
r$4.displayName = `AltArrowDown`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/arrows/Linear/Refresh.mjs
var { forwardRef: t$3 } = await importShared("react");
var i$2 = t$3((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`path`, {
		d: `M3.67981 11.3333H2.92981H3.67981ZM3.67981 13L3.15157 13.5324C3.44398 13.8225 3.91565 13.8225 4.20805 13.5324L3.67981 13ZM5.88787 11.8657C6.18191 11.574 6.18377 11.0991 5.89203 10.8051C5.60029 10.511 5.12542 10.5092 4.83138 10.8009L5.88787 11.8657ZM2.52824 10.8009C2.2342 10.5092 1.75933 10.511 1.46759 10.8051C1.17585 11.0991 1.17772 11.574 1.47176 11.8657L2.52824 10.8009ZM18.6156 7.39279C18.8325 7.74565 19.2944 7.85585 19.6473 7.63892C20.0001 7.42199 20.1103 6.96007 19.8934 6.60721L18.6156 7.39279ZM12.0789 2.25C7.03155 2.25 2.92981 6.3112 2.92981 11.3333H4.42981C4.42981 7.15072 7.84884 3.75 12.0789 3.75V2.25ZM2.92981 11.3333L2.92981 13H4.42981L4.42981 11.3333H2.92981ZM4.20805 13.5324L5.88787 11.8657L4.83138 10.8009L3.15157 12.4676L4.20805 13.5324ZM4.20805 12.4676L2.52824 10.8009L1.47176 11.8657L3.15157 13.5324L4.20805 12.4676ZM19.8934 6.60721C18.287 3.99427 15.3873 2.25 12.0789 2.25V3.75C14.8484 3.75 17.2727 5.20845 18.6156 7.39279L19.8934 6.60721Z`,
		fill: `currentColor`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M20.3139 11L20.8411 10.4666C20.549 10.1778 20.0788 10.1778 19.7867 10.4666L20.3139 11ZM18.1004 12.1333C17.8058 12.4244 17.8031 12.8993 18.0942 13.1939C18.3854 13.4885 18.8603 13.4913 19.1549 13.2001L18.1004 12.1333ZM21.4729 13.2001C21.7675 13.4913 22.2424 13.4885 22.5335 13.1939C22.8247 12.8993 22.822 12.4244 22.5274 12.1332L21.4729 13.2001ZM5.31794 16.6061C5.1004 16.2536 4.6383 16.1442 4.28581 16.3618C3.93331 16.5793 3.82391 17.0414 4.04144 17.3939L5.31794 16.6061ZM11.8827 21.75C16.9451 21.75 21.0639 17.6915 21.0639 12.6667H19.5639C19.5639 16.8466 16.1332 20.25 11.8827 20.25V21.75ZM21.0639 12.6667V11H19.5639V12.6667H21.0639ZM19.7867 10.4666L18.1004 12.1333L19.1549 13.2001L20.8411 11.5334L19.7867 10.4666ZM19.7867 11.5334L21.4729 13.2001L22.5274 12.1332L20.8411 10.4666L19.7867 11.5334ZM4.04144 17.3939C5.65405 20.007 8.56403 21.75 11.8827 21.75V20.25C9.10023 20.25 6.66584 18.7903 5.31794 16.6061L4.04144 17.3939Z`,
		fill: `currentColor`
	})]
}));
i$2.displayName = `Refresh`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/search/Linear/Magnifier.mjs
var { forwardRef: t$2 } = await importShared("react");
var i$1 = t$2((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`circle`, {
		cx: `11.5`,
		cy: `11.5`,
		r: `9.5`,
		stroke: `currentColor`,
		strokeWidth: `1.5`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M18.5 18.5L22 22`,
		stroke: `currentColor`,
		strokeWidth: `1.5`,
		strokeLinecap: `round`
	})]
}));
i$1.displayName = `Magnifier`;
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/settings/Linear/Settings.mjs
var { forwardRef: t$1 } = await importShared("react");
var i = t$1((t, i) => (0, import_jsx_runtime.jsxs)(r$25, {
	ref: i,
	...t,
	children: [(0, import_jsx_runtime.jsx)(`circle`, {
		cx: `12`,
		cy: `12`,
		r: `3`,
		stroke: `currentColor`,
		strokeWidth: `1.5`
	}), (0, import_jsx_runtime.jsx)(`path`, {
		d: `M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z`,
		stroke: `currentColor`,
		strokeWidth: `1.5`
	})]
}));
i.displayName = `Settings`;
//#endregion
//#region extension/src/renderer/components/DiscoverSkillsTab/SkillCard.tsx
var { Button: Button$8, Card: Card$2, Checkbox: Checkbox$4, Chip: Chip$5, Link, Typography: Typography$6 } = await importShared("@heroui/react");
var { useEffect: useEffect$8, useState: useState$8 } = await importShared("react");
var ipc$8 = window.electron.ipcRenderer;
var getGithubUrl = (source) => {
	const parts = source.split("/");
	if (parts.length >= 2) return `https://github.com/${parts[0]}/${parts[1]}`;
	return null;
};
var formatInstalls = (num) => {
	if (num < 1e3) return num.toString();
	const suffixes = [
		"K",
		"M",
		"B",
		"T"
	];
	const magnitude = Math.min(Math.floor(Math.log10(num) / 3) - 1, suffixes.length - 1);
	if (magnitude < 0) return num.toString();
	const scaled = num / Math.pow(10, (magnitude + 1) * 3);
	return `${Math.floor(scaled)}${suffixes[magnitude]}`;
};
function SkillCard({ skill, rank, installed, onSelect, activeSubTab, isSelected, onToggleSelect }) {
	const githubUrl = getGithubUrl(skill.source);
	const [description, setDescription] = useState$8("");
	const [isLoadingDesc, setIsLoadingDesc] = useState$8(false);
	useEffect$8(() => {
		let active = true;
		const fetchDesc = async () => {
			setIsLoadingDesc(true);
			try {
				const res = await ipc$8.invoke("skills-manager:get-description", skill.source, skill.name);
				if (active) setDescription(res || "No description available.");
			} catch (err) {
				console.error("Failed to fetch skill description:", err);
			} finally {
				if (active) setIsLoadingDesc(false);
			}
		};
		fetchDesc();
		return () => {
			active = false;
		};
	}, [skill.source, skill.name]);
	let Icon = i$20;
	let iconClass = "text-semi-muted/80";
	if (activeSubTab === "trending") {
		Icon = TrendingUp;
		iconClass = "text-LynxBlue";
	} else if (activeSubTab === "hot") {
		Icon = i$11;
		iconClass = "text-LynxOrange";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$2, {
		className: "border border-border hover:border-foreground/10 hover:shadow-lg hover:shadow-black/20 transition flex flex-col justify-between h-full",
		variant: "secondary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$2.Header, {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between w-full min-h-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$4, {
						isSelected,
						"aria-label": `Select ${skill.name}`,
						onChange: () => onToggleSelect(skill),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$4.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$4.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$4.Indicator, {}) }) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 ml-auto",
						children: [rank !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center justify-center text-[10px] font-extrabold px-1.5 py-0.5 rounded-lg bg-LynxPurple/10 text-LynxPurple font-JetBrainsMono border border-LynxPurple/20 shrink-0",
							children: ["#", rank]
						}), installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$5, {
							variant: "secondary",
							className: "bg-success-soft text-success text-[10px] h-5 shrink-0",
							children: "Installed"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 w-full mt-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$6, {
							title: skill.name,
							className: "font-bold text-base text-wrap line-clamp-2 leading-snug",
							children: skill.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1 mt-1",
							children: githubUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								target: "_blank",
								onPress: () => window.open(githubUrl),
								className: "text-xs text-semi-muted hover:text-accent transition flex items-center gap-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: skill.source
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link.Icon, { className: "size-3 shrink-0" })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-semi-muted truncate",
								children: skill.source
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$6, {
							className: "text-xs text-semi-muted line-clamp-2 mt-2 leading-relaxed min-h-8",
							children: isLoadingDesc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-semi-muted/40 animate-pulse",
								children: "Loading description..."
							}) : description
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card$2.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs text-semi-muted font-JetBrainsMono",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `size-3.5 ${iconClass}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: skill.installs > 0 ? `${formatInstalls(skill.installs)} Downloads` : "New skill" })]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card$2.Footer, {
				className: "flex justify-end gap-2 border-t border-border-secondary/50 pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$8, {
					size: "sm",
					onPress: () => onSelect(skill),
					className: "w-full justify-center",
					children: [installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$9, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$20, { className: "size-4" }), installed ? "Configure / Re-install" : "Install"]
				})
			})
		]
	});
}
//#endregion
//#region extension/src/renderer/components/DiscoverSkillsTab/CreatorSkillsModal.tsx
var { Button: Button$7, Checkbox: Checkbox$3, Description: Description$6, InputGroup: InputGroup$3, Modal: Modal$3, ScrollShadow: ScrollShadow$2, Typography: Typography$5 } = await importShared("@heroui/react");
var { useEffect: useEffect$7, useState: useState$7 } = await importShared("react");
function CreatorSkillsModal({ selectedOwnerForSkills, onClose, isSkillInstalled, onSelectSkill, selectedSkills, onToggleSelectSkill }) {
	const [searchQuery, setSearchQuery] = useState$7("");
	const [limit, setLimit] = useState$7(30);
	useEffect$7(() => {
		if (selectedOwnerForSkills) {
			setSearchQuery("");
			setLimit(30);
		}
	}, [selectedOwnerForSkills]);
	useEffect$7(() => {
		setLimit(30);
	}, [searchQuery]);
	const filteredRepos = selectedOwnerForSkills?.repos.map((r) => {
		const filteredSkills = r.skills.filter((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.repo.toLowerCase().includes(searchQuery.toLowerCase()));
		return {
			...r,
			skills: filteredSkills
		};
	}).filter((r) => r.skills.length > 0) || [];
	const totalCount = filteredRepos.reduce((acc, r) => acc + r.skills.length, 0);
	let renderedCount = 0;
	const reposToRender = [];
	for (const r of filteredRepos) {
		if (renderedCount >= limit) break;
		const skillsToTake = r.skills.slice(0, limit - renderedCount);
		if (skillsToTake.length > 0) {
			reposToRender.push({
				...r,
				skills: skillsToTake
			});
			renderedCount += skillsToTake.length;
		}
	}
	const hasMore = totalCount > renderedCount;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabModal, {
		size: "lg",
		dialogClassName: "max-w-4xl! px-1",
		isOpen: !!selectedOwnerForSkills,
		onOpenChange: (open) => !open && onClose(),
		isDismissable: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$3.CloseTrigger, { onPress: onClose }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$3.Header, {
				className: "pb-3 font-Nunito w-full pr-10 pl-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-row items-center justify-between text-left gap-4 w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-row items-center justify-start gap-3.5 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							onError: (e) => {
								e.target.src = "https://github.com/github.png";
							},
							alt: selectedOwnerForSkills?.owner,
							src: `https://github.com/${selectedOwnerForSkills?.owner}.png`,
							className: "size-11 rounded-full border border-border/80 bg-black shrink-0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-center text-left min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$3.Heading, {
								className: "text-lg font-bold text-foreground leading-tight",
								children: selectedOwnerForSkills?.owner
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$6, {
								className: "text-xs text-semi-muted font-JetBrainsMono mt-0.5",
								children: "All Available Skills"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-90 shrink-0 mr-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup$3, {
							variant: "secondary",
							fullWidth: true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup$3.Prefix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$1, { className: "size-4 text-semi-muted" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup$3.Input, {
									value: searchQuery,
									placeholder: "Search creator skills...",
									onChange: (e) => setSearchQuery(e.target.value)
								}),
								searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup$3.Suffix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$7, {
									size: "sm",
									variant: "ghost",
									"aria-label": "Clear search",
									onPress: () => setSearchQuery(""),
									className: "h-5 w-5 min-w-5 p-0 hover:bg-white/10 rounded-full flex items-center justify-center",
									isIconOnly: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3 text-semi-muted" })
								}) })
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$3.Body, {
				className: "font-Nunito flex flex-col max-h-[70vh] pr-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollShadow$2, {
					className: "flex-1 overflow-y-auto flex flex-col gap-5 px-4 mt-2",
					children: filteredRepos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-16 text-semi-muted text-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography$5, {
							className: "text-sm font-semibold",
							children: [
								"No skills found matching \"",
								searchQuery,
								"\""
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$6, {
							className: "text-xs",
							children: "Try searching for a different keyword or name"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [reposToRender.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$5, {
							className: "text-xs font-semibold text-semi-muted font-JetBrainsMono bg-foreground/5 px-2.5 py-1 rounded-lg w-fit border border-border-secondary/20",
							children: r.repo
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-1",
							children: r.skills.map((skill) => {
								const registrySkill = {
									id: `${r.repo}/${skill.name}`,
									name: skill.name,
									installs: skill.installs,
									source: r.repo
								};
								const installed = isSkillInstalled(skill.name);
								const isSelected = selectedSkills.some((s) => s.id === registrySkill.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 px-2.5 py-2 rounded-xl bg-surface/30 transition-all duration-200 border cursor-pointer hover:shadow-sm active:scale-[0.99] " + (installed ? "border-success/30 bg-success/5 hover:bg-success/10" : "border-border-secondary/40 hover:border-foreground/10 hover:bg-foreground/5"),
									onClick: () => onToggleSelectSkill(registrySkill),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$3, {
											variant: "secondary",
											isSelected,
											className: "scale-90 origin-left",
											"aria-label": `Select ${skill.name}`,
											onChange: () => onToggleSelectSkill(registrySkill),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$3.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$3.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$3.Indicator, {}) }) })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0 pr-1 flex flex-col gap-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-semibold truncate text-foreground",
												children: skill.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] text-semi-muted truncate font-JetBrainsMono flex items-center gap-x-1",
												children: [
													formatInstalls(skill.installs),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$4, {})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$7, {
											onPress: () => {
												onClose();
												onSelectSkill(registrySkill);
											},
											className: "size-7 min-w-7 hover:bg-foreground/10 rounded-lg flex items-center justify-center shrink-0",
											size: "sm",
											variant: "ghost",
											onClick: (e) => e.stopPropagation(),
											isIconOnly: true,
											children: installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$9, { className: "size-3.5 text-semi-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$20, { className: "size-3.5 text-foreground" })
										})
									]
								}, `${r.repo}-${skill.name}`);
							})
						})]
					}, r.repo)), hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center mt-4 pb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$7, {
							className: "px-8 py-2 font-bold text-xs bg-foreground/5 hover:bg-foreground/10 border border-border-secondary/30 rounded-xl hover:border-LynxBlue/30 text-foreground transition-all duration-200",
							variant: "secondary",
							onPress: () => setLimit((prev) => prev + 30),
							children: [
								"Load More Skills (Showing ",
								renderedCount,
								" of ",
								totalCount,
								")"
							]
						})
					})] })
				})
			})
		]
	});
}
//#endregion
//#region extension/src/renderer/components/DiscoverSkillsTab/index.tsx
var { Button: Button$6, Card: Card$1, Checkbox: Checkbox$2, Description: Description$5, InputGroup: InputGroup$2, Label: Label$4, ListBox: ListBox$2, Pagination, ScrollShadow: ScrollShadow$1, Select: Select$2, Spinner: Spinner$4, Tabs: Tabs$2, Typography: Typography$4 } = await importShared("@heroui/react");
var { useCallback: useCallback$5, useEffect: useEffect$6, useState: useState$6 } = await importShared("react");
var ipc$7 = window.electron.ipcRenderer;
function DiscoverSkillsTab({ searchQuery, onSearchQueryChange, searchResults, isLoadingSearch, hasSearched, onSearch, isSkillInstalled, onSelectSkill, onSelectSkills }) {
	const [activeSubTab, setActiveSubTab] = useState$6("all-time");
	const [discoverSkills, setDiscoverSkills] = useState$6([]);
	const [officialOwners, setOfficialOwners] = useState$6([]);
	const [isLoadingDiscover, setIsLoadingDiscover] = useState$6(false);
	const [currentPage, setCurrentPage] = useState$6(1);
	const [itemsPerPage, setItemsPerPage] = useState$6(24);
	const [selectedOwnerForSkills, setSelectedOwnerForSkills] = useState$6(null);
	const [selectedSkills, setSelectedSkills] = useState$6([]);
	useEffect$6(() => {
		setSelectedSkills([]);
	}, [activeSubTab, searchQuery]);
	const toggleSelectSkill = useCallback$5((skill) => {
		setSelectedSkills((prev) => {
			if (prev.some((s) => s.id === skill.id)) return prev.filter((s) => s.id !== skill.id);
			else return [...prev, skill];
		});
	}, []);
	const loadDiscoverData = useCallback$5(async (tab) => {
		setIsLoadingDiscover(true);
		try {
			const res = await ipc$7.invoke("skills-manager:get-discover-data", tab);
			if (tab === "official") setOfficialOwners(res || []);
			else setDiscoverSkills(res || []);
		} catch (err) {
			console.error("Failed to load discover data:", err);
		} finally {
			setIsLoadingDiscover(false);
		}
	}, []);
	useEffect$6(() => {
		if (!searchQuery.trim()) loadDiscoverData(activeSubTab);
	}, [
		activeSubTab,
		searchQuery,
		loadDiscoverData
	]);
	const handleTabChange = (key) => {
		setActiveSubTab(key);
		onSearchQueryChange("");
		setCurrentPage(1);
	};
	useEffect$6(() => {
		setCurrentPage(1);
	}, [searchQuery]);
	const isSearching = searchQuery.trim() !== "" && (hasSearched || isLoadingSearch);
	const totalItems = isSearching ? searchResults.length : activeSubTab === "official" ? officialOwners.length : discoverSkills.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const effectivePage = Math.max(1, Math.min(currentPage, totalPages || 1));
	const startIndex = (effectivePage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentSkills = isSearching ? searchResults.slice(startIndex, endIndex) : activeSubTab === "official" ? [] : discoverSkills.slice(startIndex, endIndex);
	const isAllSelected = currentSkills.length > 0 && currentSkills.every((s) => selectedSkills.some((selected) => selected.id === s.id));
	const isSomeSelected = currentSkills.length > 0 && !isAllSelected && currentSkills.some((s) => selectedSkills.some((selected) => selected.id === s.id));
	const getPageNumbers = () => {
		const pages = [];
		if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) pages.push(i);
		else {
			pages.push(1);
			if (effectivePage > 3) pages.push("ellipsis");
			const start = Math.max(2, effectivePage - 1);
			const end = Math.min(totalPages - 1, effectivePage + 1);
			for (let i = start; i <= end; i++) pages.push(i);
			if (effectivePage < totalPages - 2) pages.push("ellipsis");
			pages.push(totalPages);
		}
		return pages;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 flex flex-col min-h-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 mb-6 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup$2, {
					className: "flex-1",
					variant: "secondary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup$2.Prefix, {
							className: "pl-3",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$1, { className: "size-4 text-semi-muted" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup$2.Input, {
							className: "pl-2",
							value: searchQuery,
							"aria-label": "Search skills registry",
							onKeyDown: (e) => e.key === "Enter" && onSearch(),
							onChange: (e) => onSearchQueryChange(e.target.value),
							placeholder: "Search skills (e.g. typescript, nextjs, convex)..."
						}),
						searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup$2.Suffix, {
							className: "pr-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$6, {
								size: "sm",
								variant: "ghost",
								"aria-label": "Clear search",
								onPress: () => onSearchQueryChange(""),
								className: "h-6 w-6 min-w-6 p-0 hover:bg-white/10 rounded-full flex items-center justify-center",
								isIconOnly: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5 text-semi-muted" })
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$6, {
					onPress: onSearch,
					variant: "secondary",
					isDisabled: !searchQuery.trim(),
					children: "Search"
				})]
			}),
			selectedSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-3 py-2 mb-4 rounded-2xl bg-LynxBlue/15 border border-LynxBlue/25 animate-in fade-in slide-in-from-top-2 duration-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography$4, {
						className: "text-sm font-semibold text-LynxBlue",
						children: [
							selectedSkills.length,
							" skill",
							selectedSkills.length === 1 ? "" : "s",
							" selected for installation"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$6, {
						size: "sm",
						variant: "ghost",
						className: "text-xs text-semi-muted",
						onPress: () => setSelectedSkills([]),
						children: "Clear Selection"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$6, {
					size: "sm",
					onPress: () => onSelectSkills(selectedSkills),
					className: "bg-LynxPurple text-white px-5 font-semibold",
					children: [
						"Install Selected (",
						selectedSkills.length,
						")"
					]
				})]
			}),
			isSearching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 flex flex-col min-h-0",
				children: isLoadingSearch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-20 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner$4, { size: "lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$5, {
						className: "text-sm text-semi-muted",
						children: "Searching registry..."
					})]
				}) : searchResults.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-12 text-semi-muted",
					children: [
						"No skills found matching \"",
						searchQuery,
						"\". Try another keyword."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center mb-3 px-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$2, {
							onChange: (checked) => {
								if (checked) setSelectedSkills((prev) => {
									const next = [...prev];
									currentSkills.forEach((s) => {
										if (!next.some((existing) => existing.id === s.id)) next.push(s);
									});
									return next;
								});
								else setSelectedSkills((prev) => prev.filter((s) => !currentSkills.some((c) => c.id === s.id)));
							},
							variant: "secondary",
							isSelected: isAllSelected,
							isIndeterminate: isSomeSelected,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox$2.Content, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$2.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$2.Indicator, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-semi-muted font-medium",
								children: "Select Page"
							})] })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-semi-muted font-medium text-nowrap",
								children: "Items per page:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$2, {
								onChange: (val) => {
									if (val !== null && val !== void 0) {
										setItemsPerPage(Number(val));
										setCurrentPage(1);
									}
								},
								className: "w-30",
								variant: "secondary",
								value: String(itemsPerPage),
								placeholder: String(itemsPerPage),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$2.Trigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$2.Value, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$2.Indicator, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$2.Popover, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$2, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$2.Item, {
										id: "12",
										textValue: "12",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$2.ItemIndicator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$4, { children: "12" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$2.Item, {
										id: "24",
										textValue: "24",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$2.ItemIndicator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$4, { children: "24" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$2.Item, {
										id: "48",
										textValue: "48",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$2.ItemIndicator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$4, { children: "48" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$2.Item, {
										id: "96",
										textValue: "96",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$2.ItemIndicator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$4, { children: "96" })]
									})
								] }) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-semi-muted font-JetBrainsMono ml-2 text-nowrap",
								children: [
									"Showing ",
									startIndex + 1,
									"–",
									Math.min(endIndex, totalItems),
									" of ",
									totalItems
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollShadow$1, {
					className: "grid grid-cols-1 gap-4 overflow-y-auto flex-1 min-h-0 pb-4 content-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2",
					children: searchResults.slice(startIndex, endIndex).map((skill) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillCard, {
							skill,
							installed: isSkillInstalled(skill.name),
							isSelected: selectedSkills.some((s) => s.id === skill.id),
							onSelect: onSelectSkill,
							activeSubTab,
							onToggleSelect: toggleSelectSkill
						}, skill.id);
					})
				})] })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 flex flex-col min-h-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$2, {
					selectedKey: activeSubTab,
					"aria-label": "Discover collections navigation",
					onSelectionChange: (key) => handleTabChange(String(key)),
					className: "flex-1 flex flex-col min-h-0 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$2.ListContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$2.List, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$2.Tab, {
								id: "all-time",
								className: "flex items-center gap-1.5 text-nowrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$16, { className: "size-4" }),
									"All Time",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$2.Indicator, {})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$2.Tab, {
								id: "trending",
								className: "flex items-center gap-1.5  text-nowrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-3.5" }),
									"Trending",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$2.Indicator, {})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$2.Tab, {
								id: "hot",
								className: "flex items-center gap-1.5  text-nowrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$11, { className: "size-4" }),
									"Hot",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$2.Indicator, {})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$2.Tab, {
								id: "official",
								className: "flex items-center gap-1.5  text-nowrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$12, { className: "size-4" }),
									"Official",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$2.Indicator, {})
								]
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								activeSubTab !== "official" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$2, {
									onChange: (checked) => {
										if (checked) setSelectedSkills((prev) => {
											const next = [...prev];
											currentSkills.forEach((s) => {
												if (!next.some((existing) => existing.id === s.id)) next.push(s);
											});
											return next;
										});
										else setSelectedSkills((prev) => prev.filter((s) => !currentSkills.some((c) => c.id === s.id)));
									},
									className: "mr-4",
									variant: "secondary",
									isSelected: isAllSelected,
									isIndeterminate: isSomeSelected,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox$2.Content, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$2.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$2.Indicator, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-semi-muted font-medium",
										children: "Select Page"
									})] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-semi-muted font-medium text-nowrap",
									children: "Items per page:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$2, {
									onChange: (val) => {
										if (val !== null && val !== void 0) {
											setItemsPerPage(Number(val));
											setCurrentPage(1);
										}
									},
									className: "w-30",
									variant: "secondary",
									value: String(itemsPerPage),
									placeholder: String(itemsPerPage),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$2.Trigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$2.Value, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$2.Indicator, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$2.Popover, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$2, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$2.Item, {
											id: "12",
											textValue: "12",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$2.ItemIndicator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$4, { children: "12" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$2.Item, {
											id: "24",
											textValue: "24",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$2.ItemIndicator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$4, { children: "24" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$2.Item, {
											id: "48",
											textValue: "48",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$2.ItemIndicator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$4, { children: "48" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$2.Item, {
											id: "96",
											textValue: "96",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$2.ItemIndicator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$4, { children: "96" })]
										})
									] }) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-semi-muted font-JetBrainsMono ml-2 text-nowrap",
									children: [
										"Showing ",
										startIndex + 1,
										"–",
										Math.min(endIndex, totalItems),
										" of ",
										totalItems
									]
								})
							]
						})]
					}), isLoadingDiscover ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-20 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner$4, { size: "lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$5, {
							className: "text-sm text-semi-muted",
							children: "Loading collection..."
						})]
					}) : activeSubTab === "official" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollShadow$1, {
						className: "flex-1 overflow-y-auto pb-4 px-2 min-h-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
							children: officialOwners.slice(startIndex, endIndex).map((owner) => {
								const totalInstalls = owner.repos.reduce((acc, r) => acc + r.totalInstalls, 0);
								const totalSkills = owner.repos.reduce((acc, r) => acc + r.skills.length, 0);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, {
									className: "border border-border hover:border-LynxBlue/40 cursor-pointer transition-all duration-300 flex flex-row items-center justify-between hover:bg-LynxBlue/5 hover:shadow-lg hover:shadow-LynxBlue/5 active:scale-[0.98] group",
									variant: "secondary",
									onClick: () => setSelectedOwnerForSkills(owner),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3.5 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											onError: (e) => {
												e.target.src = "https://github.com/github.png";
											},
											className: "size-12 rounded-full border border-border/80 bg-black group-hover:scale-105 transition-transform duration-300 shrink-0",
											alt: owner.owner,
											src: `https://github.com/${owner.owner}.png`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$4, {
												className: "font-bold text-base leading-tight group-hover:text-LynxBlue transition-colors duration-300",
												children: owner.owner
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Description$5, {
												className: "text-xs text-semi-muted font-JetBrainsMono mt-1.5 flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-semibold",
														children: [
															totalSkills,
															" ",
															totalSkills === 1 ? "skill" : "skills"
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-border/60",
														children: "•"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [formatInstalls(totalInstalls), " installs"] })
												]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center justify-center size-8 rounded-full bg-foreground/5 group-hover:bg-LynxBlue group-hover:text-white transition-all duration-300 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "size-4 stroke-current group-hover:translate-x-0.5 transition-transform duration-300",
											fill: "none",
											strokeWidth: "2.5",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M9 5l7 7-7 7",
												strokeLinecap: "round",
												strokeLinejoin: "round"
											})
										})
									})]
								}, owner.owner);
							})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollShadow$1, {
						className: "grid grid-cols-1 gap-4 overflow-y-auto flex-1 min-h-0 pb-4 content-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2",
						children: discoverSkills.slice(startIndex, endIndex).map((skill, index) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillCard, {
								skill,
								installed: isSkillInstalled(skill.name),
								isSelected: selectedSkills.some((s) => s.id === skill.id),
								onSelect: onSelectSkill,
								activeSubTab,
								rank: startIndex + index + 1,
								onToggleSelect: toggleSelectSkill
							}, skill.id);
						})
					})]
				})
			}),
			totalItems > 12 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center pt-4 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					className: "justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pagination.Content, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pagination.Previous, {
							isDisabled: effectivePage === 1,
							onPress: () => setCurrentPage(effectivePage - 1),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination.PreviousIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Previous" })]
						}) }),
						getPageNumbers().map((p, i) => p === "ellipsis" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination.Ellipsis, {}) }, `ellipsis-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination.Link, {
							isActive: p === effectivePage,
							onPress: () => setCurrentPage(p),
							children: p
						}) }, p)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pagination.Next, {
							isDisabled: effectivePage === totalPages,
							onPress: () => setCurrentPage(effectivePage + 1),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination.NextIcon, {})]
						}) })
					] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorSkillsModal, {
				onSelectSkill,
				selectedSkills,
				isSkillInstalled,
				onToggleSelectSkill: toggleSelectSkill,
				selectedOwnerForSkills,
				onClose: () => setSelectedOwnerForSkills(null)
			})
		]
	});
}
//#endregion
//#region extension/src/renderer/components/DiscoverSkillsTab.tsx
var DiscoverSkillsTab_default = DiscoverSkillsTab;
//#endregion
//#region extension/src/renderer/components/InstallCustomSkillModal.tsx
var { Button: Button$5, Description: Description$4, InputGroup: InputGroup$1, Modal: Modal$2, Typography: Typography$3 } = await importShared("@heroui/react");
var { useState: useState$5 } = await importShared("react");
var ipc$6 = window.electron.ipcRenderer;
function InstallCustomSkillModal({ isOpen, onClose, onProceed }) {
	const [customSource, setCustomSource] = useState$5("");
	const handleProceed = () => {
		const trimmed = customSource.trim();
		if (!trimmed) return;
		onProceed({
			id: trimmed,
			name: trimmed.split(/[/\\]/).filter(Boolean).pop() || trimmed,
			installs: 0,
			source: ""
		});
		setCustomSource("");
		onClose();
	};
	const handleSelectFolder = async () => {
		try {
			const dir = await ipc$6.invoke("skills-manager:select-project-dir");
			if (dir) setCustomSource(dir);
		} catch (err) {
			console.error("Failed to select local directory:", err);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabModal, {
		size: "lg",
		isOpen,
		dialogClassName: "max-w-2xl pb-3 px-1",
		onOpenChange: (open) => !open && onClose(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$2.CloseTrigger, { onPress: onClose }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal$2.Header, {
				className: "flex flex-col gap-y-1 px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$19, { className: "size-6 text-LynxPurple" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$2.Heading, {
						className: "text-lg font-bold",
						children: "Install Custom Skill"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$4, {
					className: "text-xs text-semi-muted",
					children: "Install a custom agent skill from a Git repository or local folder."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal$2.Body, {
				className: "flex flex-col gap-4 px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold text-semi-muted",
						children: "Custom Skill Source"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup$1, {
						variant: "secondary",
						className: "font-JetBrainsMono text-sm",
						fullWidth: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup$1.Input, {
							className: "px-3",
							value: customSource,
							onChange: (e) => setCustomSource(e.target.value),
							placeholder: "e.g., owner/repo or select a local folder path"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup$1.Suffix, {
							className: "pr-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$5, {
								size: "sm",
								variant: "ghost",
								onPress: handleSelectFolder,
								"aria-label": "Select local folder",
								className: "h-7 w-7 min-w-7 p-0 hover:bg-white/10 rounded-lg flex items-center justify-center",
								isIconOnly: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$17, { className: "size-4 text-semi-muted hover:text-white" })
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 p-3 bg-surface-secondary border border-border rounded-2xl text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$3, {
						className: "font-semibold text-foreground/90",
						children: "Supported Source Formats"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-2.5 mt-1 text-semi-muted leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground/80 font-JetBrainsMono",
									children: "GitHub Shorthand: "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono",
									children: "owner/repo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] pl-2 mt-0.5",
									children: "e.g., vercel-labs/agent-skills"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground/80 font-JetBrainsMono",
									children: "Full Repo URL: "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono",
									children: "https://github.com/owner/repo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] pl-2 mt-0.5",
									children: "e.g., https://github.com/vercel-labs/agent-skills"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground/80 font-JetBrainsMono",
									children: "Direct Path in Repo: "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono",
									children: "https://github.com/owner/repo/tree/main/skills/name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] pl-2 mt-0.5",
									children: "e.g., https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground/80 font-JetBrainsMono",
									children: "GitLab or Any Git URL: "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono",
									children: "https://gitlab.com/org/repo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] pl-2 mt-0.5",
									children: "e.g., git@github.com:vercel-labs/agent-skills.git"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground/80 font-JetBrainsMono",
									children: "Local Folder Path: "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono",
									children: "Select folder via browse button or type path"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] pl-2 mt-0.5",
									children: "Loads skills from a local directory path"
								})
							] })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal$2.Footer, {
				className: "pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$5, {
					size: "sm",
					className: "px-5",
					onPress: onClose,
					variant: "secondary",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$5, {
					size: "sm",
					onPress: handleProceed,
					isDisabled: !customSource.trim(),
					className: "bg-LynxPurple text-white px-5",
					children: "Proceed to Settings"
				})]
			})
		]
	});
}
//#endregion
//#region src/common/utils/toast.ts
var { DEFAULT_TOAST_TIMEOUT } = await importShared("@heroui/react");
function createToastFunction(queue) {
	const toastFn = (message, options) => {
		const timeout = options?.timeout !== void 0 ? options.timeout : DEFAULT_TOAST_TIMEOUT;
		return queue.add({
			title: message,
			description: options?.description,
			indicator: options?.indicator,
			variant: options?.variant || "default",
			actionProps: options?.actionProps,
			isLoading: options?.isLoading
		}, {
			timeout,
			onClose: () => {
				requestAnimationFrame(() => {
					options?.onClose?.();
				});
			}
		});
	};
	toastFn.success = (message, options) => {
		return toastFn(message, {
			...options,
			variant: "success"
		});
	};
	toastFn.danger = (message, options) => {
		return toastFn(message, {
			...options,
			variant: "danger"
		});
	};
	toastFn.info = (message, options) => {
		return toastFn(message, {
			...options,
			variant: "accent"
		});
	};
	toastFn.warning = (message, options) => {
		return toastFn(message, {
			...options,
			variant: "warning"
		});
	};
	toastFn.promise = (promise, options) => {
		const promiseFn = typeof promise === "function" ? promise() : promise;
		const loadingId = queue.add({
			title: options.loading,
			variant: "default",
			isLoading: true
		}, { timeout: 0 });
		promiseFn.then((data) => {
			const successMessage = typeof options.success === "function" ? options.success(data) : options.success;
			queue.close(loadingId);
			return toastFn.success(successMessage);
		}).catch((error) => {
			const errorMessage = typeof options.error === "function" ? options.error(error) : options.error;
			queue.close(loadingId);
			return toastFn.danger(errorMessage);
		});
		return loadingId;
	};
	toastFn.getQueue = () => queue.getQueue();
	toastFn.close = (key) => queue.close(key);
	toastFn.pauseAll = () => queue.pauseAll();
	toastFn.resumeAll = () => queue.resumeAll();
	toastFn.clear = () => queue.clear();
	return toastFn;
}
//#endregion
//#region src/renderer/mainWindow/layouts/ToastProviders.tsx
var { Toast, ToastContent, ToastDescription, ToastIndicator, ToastQueue, ToastTitle } = await importShared("@heroui/react");
var { memo } = await importShared("react");
var bottomQueue = new ToastQueue({ maxVisibleToasts: 3 });
var topQueue = new ToastQueue({ maxVisibleToasts: 3 });
createToastFunction(topQueue);
var bottomToast = createToastFunction(bottomQueue);
memo(() => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast.Provider, {
		placement: "top",
		queue: topQueue,
		children: ({ toast: toastItem }) => {
			const content = toastItem.content;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toast, {
				placement: "top",
				toast: toastItem,
				variant: content.variant,
				className: "border border-border notDraggable",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastIndicator, { variant: content.variant }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastContent, {
						className: "min-w-0 pr-4",
						children: [content.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastTitle, { children: content.title }) : null, content.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastDescription, { children: content.description }) : null]
					}),
					content.actionProps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast.ActionButton, { ...content.actionProps }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast.CloseButton, { className: "notDraggable" })
				]
			});
		}
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast.Provider, {
		queue: bottomQueue,
		placement: "bottom end",
		children: ({ toast: toastItem }) => {
			const content = toastItem.content;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toast, {
				toast: toastItem,
				placement: "bottom end",
				variant: content.variant,
				className: "border border-border py-4 px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastIndicator, { variant: content.variant }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastContent, {
						className: "min-w-0 pr-4",
						children: [content.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastTitle, { children: content.title }) : null, content.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastDescription, { children: content.description }) : null]
					}),
					content.actionProps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast.ActionButton, { ...content.actionProps }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast.CloseButton, {})
				]
			});
		}
	})] });
});
//#endregion
//#region extension/src/renderer/components/InstalledSkillsTab/ProjectFoldersPopover.tsx
var { Button: Button$4, Chip: Chip$4, Popover } = await importShared("@heroui/react");
function ProjectFoldersPopover({ projectDirs, getSkillsCountForDir, onRemoveProjectDir, onAddProjectDir }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$4, {
		size: "sm",
		variant: "secondary",
		"aria-label": "Manage project folders",
		isIconOnly: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, {})
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Content, {
		className: "w-120",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover.Dialog, {
			className: "flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Arrow, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$17, { className: "size-4 text-LynxBlue" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-foreground/90",
								children: "Project Folders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$4, {
								size: "sm",
								variant: "secondary",
								className: "bg-foreground/10 text-foreground/80 text-[10px] h-5 px-1.5 py-0",
								children: projectDirs.length
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-1.5 max-h-48 overflow-y-auto bg-surface-secondary border border-foreground/5 rounded-2xl p-2",
					children: projectDirs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-semi-muted text-center py-4",
						children: "No project folders registered"
					}) : projectDirs.map((dir) => {
						const count = getSkillsCountForDir(dir);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs py-1 px-2 hover:bg-foreground/5 rounded-lg group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 truncate",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									title: dir,
									className: "font-JetBrainsMono text-[10px] text-foreground/70 truncate",
									children: dir
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip$4, {
									size: "sm",
									variant: "secondary",
									className: "bg-foreground/5 text-foreground/50 text-[9px] h-4.5 py-0 px-1 shrink-0 ml-1.5",
									children: [
										count,
										" skill",
										count === 1 ? "" : "s"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$4, {
								className: "h-5 min-w-0 p-0 text-semi-muted hover:text-danger cursor-pointer border-none bg-transparent",
								size: "sm",
								variant: "ghost",
								onPress: () => onRemoveProjectDir(dir),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$6, { className: "size-3.5" })
							})]
						}, dir);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$4, {
					className: "w-full text-[11px] h-8 bg-LynxBlue/20 text-LynxBlue border-none hover:bg-LynxBlue/30 shrink-0",
					size: "sm",
					variant: "secondary",
					onPress: onAddProjectDir,
					children: "+ Add Project Folder"
				})
			]
		})
	})] });
}
//#endregion
//#region extension/src/renderer/components/InstalledSkillsTab/SkillsTable.tsx
var { Button: Button$3, Checkbox: Checkbox$1, Chip: Chip$3, cn: cn$1, Spinner: Spinner$3, Tooltip } = await importShared("@heroui/react");
var ipc$5 = window.electron.ipcRenderer;
function SkillsTable({ skills, selectedKeys, setSelectedKeys, selectedSkillsList, updatingSkills, deletingSkills, confirmDelete, bulkLoadingStatus, handleUpdate, handleDelete, toggleSelectSkill, showHeader = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1 w-full",
		children: [showHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 px-3 py-1.5 border-b border-foreground/5 text-xs font-semibold text-semi-muted select-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-8 shrink-0 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
						onChange: (checked) => {
							setSelectedKeys(checked ? new Set(skills.map((s) => `${s.name}-${s.scope}`)) : /* @__PURE__ */ new Set());
						},
						variant: "secondary",
						"aria-label": "Select all",
						isSelected: selectedSkillsList.length === skills.length && skills.length > 0,
						isIndeterminate: selectedSkillsList.length > 0 && selectedSkillsList.length < skills.length,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1.Indicator, {}) }) })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 min-w-0",
					children: "Name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-44 shrink-0",
					children: "Target Agents"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-12 shrink-0 text-center",
					children: "Location"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-20 shrink-0 text-right",
					children: "Actions"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-1 mt-1",
			children: skills.map((skill) => {
				const rowKey = `${skill.name}-${skill.scope}`;
				const isSelected = selectedKeys === "all" || selectedKeys.has(rowKey);
				const isUpdating = updatingSkills[skill.name];
				const isDeleting = deletingSkills[skill.name];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn$1("group flex items-center gap-4 py-1.5 px-3 hover:bg-foreground/5 rounded-xl border border-transparent transition-all duration-150", isSelected && "bg-foreground/3 border-foreground/10"),
					onClick: () => toggleSelectSkill(rowKey),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-8 shrink-0 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
								variant: "secondary",
								isSelected,
								"aria-label": `Select ${skill.name}`,
								onChange: () => toggleSelectSkill(rowKey),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1.Indicator, {}) }) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-sm text-foreground/90 truncate",
								children: skill.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$3, {
								className: cn$1("text-[10px] h-5 px-1.5 py-0 shrink-0 font-medium", skill.scope === "project" ? "bg-LynxBlue/15 text-LynxBlue border border-LynxBlue/20" : "bg-LynxPurple/15 text-LynxPurple border border-LynxPurple/20"),
								variant: "secondary",
								children: skill.scope === "project" ? "Project" : "Global"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-44 shrink-0 flex flex-wrap gap-1 items-center",
							children: skill.agents && skill.agents.length > 0 ? skill.agents.length <= 2 ? skill.agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$3, {
								className: "bg-foreground/10 text-foreground/80 text-[10px] h-5 py-0.5 shrink-0",
								children: agent
							}, agent)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [skill.agents.slice(0, 2).map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$3, {
								className: "bg-foreground/10 text-foreground/80 text-[10px] h-5 py-0.5 shrink-0",
								children: agent
							}, agent)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
								delay: 300,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip$3, {
									className: "bg-foreground/5 hover:bg-foreground/15 text-foreground/60 text-[10px] h-5 py-0.5 cursor-pointer shrink-0",
									children: [
										"+",
										skill.agents.length - 2,
										" more"
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip.Content, {
									showArrow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip.Arrow, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-1 p-1",
										children: skill.agents.slice(2).map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold",
											children: agent
										}, agent))
									})]
								})]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-semi-muted",
								children: "None"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 shrink-0 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
								delay: 300,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$3, {
									className: "size-8 min-w-0 p-0 text-semi-muted hover:text-LynxBlue cursor-pointer border-none bg-transparent hover:bg-foreground/5 rounded-full flex items-center justify-center",
									size: "sm",
									variant: "ghost",
									onPress: () => ipc$5.send("app:openPath", skill.path),
									isIconOnly: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$17, { className: "size-4" })
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip.Content, {
									showArrow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip.Arrow, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col max-w-80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold mb-0.5 text-foreground/90",
											children: "Skill Location"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-JetBrainsMono text-[10px] text-foreground/70 text-wrap break-all",
											children: skill.path
										})]
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-20 shrink-0 flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
								delay: 300,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$3, {
									className: "size-8 min-w-0 p-0 text-semi-muted hover:text-LynxBlue cursor-pointer border-none bg-transparent hover:bg-foreground/5 rounded-full flex items-center justify-center",
									size: "sm",
									variant: "ghost",
									isDisabled: isUpdating || isDeleting || !!bulkLoadingStatus,
									onPress: () => handleUpdate(skill.name, skill.scope === "global", skill.path),
									children: isUpdating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner$3, { size: "sm" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$2, { className: "size-4" })
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip.Content, {
									showArrow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip.Arrow, {}), "Update Skill"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
								delay: 300,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$3, {
									className: "size-8 min-w-0 p-0 text-semi-muted hover:text-danger cursor-pointer border-none bg-transparent hover:bg-danger/10 rounded-full flex items-center justify-center",
									size: "sm",
									variant: "ghost",
									isDisabled: isUpdating || isDeleting || !!bulkLoadingStatus,
									onPress: () => handleDelete(skill.name, skill.scope === "global", skill.path),
									children: isDeleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner$3, { size: "sm" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$6, { className: "size-4" })
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip.Content, {
									showArrow: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip.Arrow, {}), confirmDelete[skill.name] ? "Confirm Remove?" : "Remove Skill"]
								})]
							})]
						})
					]
				}, rowKey);
			})
		})]
	});
}
//#endregion
//#region extension/src/renderer/components/InstalledSkillsTab/useBulkActions.ts
var { useCallback: useCallback$4, useEffect: useEffect$5, useMemo: useMemo$1, useRef: useRef$2, useState: useState$4 } = await importShared("react");
var ipc$4 = window.electron.ipcRenderer;
function useBulkActions(installedSkills, onRefreshInstalled) {
	const [selectedKeys, setSelectedKeys] = useState$4(/* @__PURE__ */ new Set());
	const [confirmBulkDelete, setConfirmBulkDelete] = useState$4(false);
	const [bulkLoadingStatus, setBulkLoadingStatus] = useState$4(null);
	const confirmBulkDeleteTimeoutRef = useRef$2(null);
	useEffect$5(() => {
		return () => {
			if (confirmBulkDeleteTimeoutRef.current) clearTimeout(confirmBulkDeleteTimeoutRef.current);
		};
	}, []);
	useEffect$5(() => {
		setSelectedKeys((prev) => {
			if (prev === "all") return prev;
			const validKeys = new Set(installedSkills.map((s) => `${s.name}-${s.scope}`));
			const next = /* @__PURE__ */ new Set();
			const prevSet = prev;
			for (const k of prevSet) if (validKeys.has(String(k))) next.add(k);
			if (next.size !== prevSet.size) return next;
			return prev;
		});
	}, [installedSkills]);
	const selectedSkillsList = useMemo$1(() => {
		if (selectedKeys === "all") return installedSkills;
		const keysSet = selectedKeys;
		return installedSkills.filter((skill) => {
			const key = `${skill.name}-${skill.scope}`;
			return keysSet.has(key);
		});
	}, [selectedKeys, installedSkills]);
	const toggleSelectSkill = useCallback$4((skillKey) => {
		setSelectedKeys((prev) => {
			const next = new Set(prev === "all" ? [] : Array.from(prev));
			if (next.has(skillKey)) next.delete(skillKey);
			else next.add(skillKey);
			return next;
		});
	}, []);
	const handleBulkUpdate = useCallback$4(async (skillsToUpdate) => {
		if (skillsToUpdate.length === 0) return;
		setSelectedKeys(/* @__PURE__ */ new Set());
		setBulkLoadingStatus(`Preparing to update ${skillsToUpdate.length} skill(s)...`);
		let successCount = 0;
		let failCount = 0;
		for (let i = 0; i < skillsToUpdate.length; i++) {
			const skill = skillsToUpdate[i];
			setBulkLoadingStatus(`Updating skill ${i + 1} of ${skillsToUpdate.length}: "${skill.name}"...`);
			try {
				const res = await ipc$4.invoke("skills-manager:update", skill.name, skill.scope === "global", skill.path);
				if (res.success) successCount++;
				else {
					failCount++;
					console.error(`Failed to update ${skill.name}:`, res.error);
				}
			} catch (err) {
				failCount++;
				console.error(`Error updating ${skill.name}:`, err);
			}
		}
		setBulkLoadingStatus(null);
		await onRefreshInstalled();
		if (failCount === 0) bottomToast.success(`Successfully updated all ${successCount} skill(s)!`);
		else bottomToast.warning(`Updated ${successCount} skill(s), ${failCount} failed.`);
	}, [onRefreshInstalled]);
	const handleBulkRemove = useCallback$4(async (skillsToRemove) => {
		if (skillsToRemove.length === 0) return;
		setSelectedKeys(/* @__PURE__ */ new Set());
		setConfirmBulkDelete(false);
		setBulkLoadingStatus(`Preparing to remove ${skillsToRemove.length} skill(s)...`);
		let successCount = 0;
		let failCount = 0;
		for (let i = 0; i < skillsToRemove.length; i++) {
			const skill = skillsToRemove[i];
			setBulkLoadingStatus(`Removing skill ${i + 1} of ${skillsToRemove.length}: "${skill.name}"...`);
			try {
				const res = await ipc$4.invoke("skills-manager:remove", skill.name, skill.scope === "global", skill.path);
				if (res.success) successCount++;
				else {
					failCount++;
					console.error(`Failed to remove ${skill.name}:`, res.error);
				}
			} catch (err) {
				failCount++;
				console.error(`Error removing ${skill.name}:`, err);
			}
		}
		setBulkLoadingStatus(null);
		await onRefreshInstalled();
		if (failCount === 0) bottomToast.success(`Successfully removed all ${successCount} skill(s).`);
		else bottomToast.warning(`Removed ${successCount} skill(s), ${failCount} failed.`);
	}, [onRefreshInstalled]);
	return {
		selectedKeys,
		setSelectedKeys,
		selectedSkillsList,
		confirmBulkDelete,
		setConfirmBulkDelete,
		bulkLoadingStatus,
		handleBulkUpdate,
		handleBulkRemove,
		onPressBulkRemove: useCallback$4(() => {
			if (!confirmBulkDelete) {
				setConfirmBulkDelete(true);
				if (confirmBulkDeleteTimeoutRef.current) clearTimeout(confirmBulkDeleteTimeoutRef.current);
				confirmBulkDeleteTimeoutRef.current = setTimeout(() => {
					setConfirmBulkDelete(false);
				}, 3e3);
			} else {
				if (confirmBulkDeleteTimeoutRef.current) clearTimeout(confirmBulkDeleteTimeoutRef.current);
				handleBulkRemove(selectedSkillsList);
			}
		}, [
			confirmBulkDelete,
			selectedSkillsList,
			handleBulkRemove
		]),
		handleBulkActionOption: useCallback$4((key) => {
			const option = String(key);
			if (option === "all") handleBulkUpdate(installedSkills);
			else if (option === "project") {
				const filtered = installedSkills.filter((s) => s.scope === "project");
				handleBulkUpdate(filtered);
			} else if (option === "global") {
				const filtered = installedSkills.filter((s) => s.scope === "global");
				handleBulkUpdate(filtered);
			} else if (option.startsWith("agent-")) {
				const agentName = option.substring(6);
				const filtered = installedSkills.filter((s) => s.agents && s.agents.includes(agentName));
				handleBulkUpdate(filtered);
			}
		}, [installedSkills, handleBulkUpdate]),
		toggleSelectSkill
	};
}
//#endregion
//#region extension/src/renderer/components/InstalledSkillsTab/useSkillsGroups.ts
var React = await importShared("react");
var { useCallback: useCallback$3, useMemo } = React;
function useSkillsGroups(installedSkills, filterQuery, groupBy) {
	const getParentFolderPath = useCallback$3((filePath) => {
		const lastSlash = filePath.replace(/\\/g, "/").lastIndexOf("/");
		if (lastSlash === -1) return "Other";
		return filePath.substring(0, lastSlash);
	}, []);
	const filteredSkills = useMemo(() => {
		if (!filterQuery.trim()) return installedSkills;
		const query = filterQuery.toLowerCase().trim();
		return installedSkills.filter((skill) => skill.name.toLowerCase().includes(query) || skill.scope.toLowerCase().includes(query) || skill.path && skill.path.toLowerCase().includes(query) || skill.agents && skill.agents.some((agent) => agent.toLowerCase().includes(query)));
	}, [installedSkills, filterQuery]);
	const getSkillsCountForDir = useCallback$3((dir) => {
		const normDir = dir.replace(/\\/g, "/").toLowerCase();
		return installedSkills.filter((s) => {
			return s.path.replace(/\\/g, "/").toLowerCase().startsWith(normDir);
		}).length;
	}, [installedSkills]);
	const uniqueAgents = useMemo(() => {
		const agentsSet = /* @__PURE__ */ new Set();
		for (const skill of installedSkills) if (skill.agents) for (const agent of skill.agents) agentsSet.add(agent);
		return Array.from(agentsSet).sort();
	}, [installedSkills]);
	const folderGroups = useMemo(() => {
		const map = {};
		for (const skill of filteredSkills) {
			const parent = getParentFolderPath(skill.path);
			if (!map[parent]) map[parent] = [];
			map[parent].push(skill);
		}
		return Object.entries(map).map(([folderPath, skills]) => ({
			id: folderPath,
			title: folderPath,
			icon: React.createElement(i$17, { className: "size-4 text-LynxBlue" }),
			skills
		}));
	}, [filteredSkills, getParentFolderPath]);
	const scopeGroups = useMemo(() => {
		const map = {
			project: [],
			global: []
		};
		for (const skill of filteredSkills) map[skill.scope].push(skill);
		const groups = [];
		if (map.project.length > 0) groups.push({
			id: "project",
			title: "Project Scope",
			icon: React.createElement(i$18, { className: "size-4 text-LynxBlue" }),
			skills: map.project
		});
		if (map.global.length > 0) groups.push({
			id: "global",
			title: "Global Scope",
			icon: React.createElement(i$19, { className: "size-4 text-LynxPurple" }),
			skills: map.global
		});
		return groups;
	}, [filteredSkills]);
	const agentGroups = useMemo(() => {
		const map = {};
		const noAgentSkills = [];
		for (const skill of filteredSkills) if (skill.agents && skill.agents.length > 0) {
			const firstAgent = skill.agents[0];
			if (!map[firstAgent]) map[firstAgent] = [];
			map[firstAgent].push(skill);
		} else noAgentSkills.push(skill);
		const groups = Object.entries(map).map(([agentName, skills]) => ({
			id: agentName,
			title: `Agent: ${agentName}`,
			icon: React.createElement(i$5, { className: "size-4 text-LynxPurple" }),
			skills
		}));
		if (noAgentSkills.length > 0) groups.push({
			id: "none",
			title: "Common (No Target Agent)",
			icon: React.createElement(i$5, { className: "size-4 text-semi-muted" }),
			skills: noAgentSkills
		});
		return groups;
	}, [filteredSkills]);
	return {
		filteredSkills,
		currentGroups: useMemo(() => {
			if (groupBy === "folder") return folderGroups;
			if (groupBy === "scope") return scopeGroups;
			if (groupBy === "agents") return agentGroups;
			return [];
		}, [
			groupBy,
			folderGroups,
			scopeGroups,
			agentGroups
		]),
		uniqueAgents,
		getSkillsCountForDir
	};
}
//#endregion
//#region extension/src/renderer/components/InstalledSkillsTab/index.tsx
var { Accordion, Button: Button$2, Chip: Chip$2, cn, Description: Description$3, Dropdown, InputGroup, Label: Label$3, ListBox: ListBox$1, ScrollShadow, Select: Select$1, Separator: Separator$1, Spinner: Spinner$2, Typography: Typography$2 } = await importShared("@heroui/react");
var { useCallback: useCallback$2, useEffect: useEffect$4, useState: useState$3 } = await importShared("react");
var ipc$3 = window.electron.ipcRenderer;
function InstalledSkillsTab({ installedSkills, isLoadingInstalled, onRefreshInstalled, onSwitchTab, onInstallCustom }) {
	const [updatingSkills, setUpdatingSkills] = useState$3({});
	const [deletingSkills, setDeletingSkills] = useState$3({});
	const [confirmDelete, setConfirmDelete] = useState$3({});
	const [groupBy, setGroupBy] = useState$3("all");
	const [expandedKeys, setExpandedKeys] = useState$3(/* @__PURE__ */ new Set());
	const [filterQuery, setFilterQuery] = useState$3("");
	const [projectDirs, setProjectDirs] = useState$3([]);
	const { filteredSkills, currentGroups, uniqueAgents, getSkillsCountForDir } = useSkillsGroups(installedSkills, filterQuery, groupBy);
	const { selectedKeys, setSelectedKeys, selectedSkillsList, confirmBulkDelete, bulkLoadingStatus, handleBulkUpdate, onPressBulkRemove, handleBulkActionOption, toggleSelectSkill } = useBulkActions(installedSkills, onRefreshInstalled);
	const loadProjects = useCallback$2(async () => {
		try {
			const dirs = await ipc$3.invoke("skills-manager:get-project-dirs");
			setProjectDirs(dirs || []);
		} catch (err) {
			console.error("Failed to load project dirs:", err);
		}
	}, []);
	const loadGroupBy = useCallback$2(async () => {
		try {
			const savedGroupBy = await ipc$3.invoke("skills-manager:get-group-by");
			if (savedGroupBy) setGroupBy(savedGroupBy);
		} catch (err) {
			console.error("Failed to load group-by preference:", err);
		}
	}, []);
	const handleGroupByChange = useCallback$2(async (val) => {
		const targetGroup = val || "all";
		setGroupBy(targetGroup);
		try {
			await ipc$3.invoke("skills-manager:set-group-by", targetGroup);
		} catch (err) {
			console.error("Failed to save group-by preference:", err);
		}
	}, []);
	useEffect$4(() => {
		loadProjects();
		loadGroupBy();
	}, [loadProjects, loadGroupBy]);
	const handleAddProjectDir = useCallback$2(async () => {
		try {
			const dir = await ipc$3.invoke("skills-manager:select-project-dir");
			if (dir) {
				const updated = await ipc$3.invoke("skills-manager:add-project-dir", dir);
				setProjectDirs(updated || []);
				bottomToast.success("Project folder registered successfully!");
				await onRefreshInstalled();
			}
		} catch (err) {
			console.error("Failed to add project folder:", err);
		}
	}, [onRefreshInstalled]);
	const handleRemoveProjectDir = useCallback$2(async (dir) => {
		try {
			const updated = await ipc$3.invoke("skills-manager:remove-project-dir", dir);
			setProjectDirs(updated || []);
			bottomToast.success("Project folder unregistered.");
			await onRefreshInstalled();
		} catch (err) {
			console.error("Failed to remove project folder:", err);
		}
	}, [onRefreshInstalled]);
	useEffect$4(() => {
		if (currentGroups.length > 0) setExpandedKeys(/* @__PURE__ */ new Set([currentGroups[0].id]));
		else setExpandedKeys(/* @__PURE__ */ new Set());
	}, [currentGroups]);
	const handleUpdate = useCallback$2(async (name, isGlobal, path) => {
		setUpdatingSkills((prev) => ({
			...prev,
			[name]: true
		}));
		try {
			const res = await ipc$3.invoke("skills-manager:update", name, isGlobal, path);
			if (res.success) {
				bottomToast.success(`Successfully updated skill "${name}"!`);
				await onRefreshInstalled();
			} else bottomToast.danger(`Failed to update skill: ${res.error}`);
		} catch (err) {
			console.error("Update error:", err);
			bottomToast.danger(`Update error: ${err.message || String(err)}`);
		} finally {
			setUpdatingSkills((prev) => ({
				...prev,
				[name]: false
			}));
		}
	}, [onRefreshInstalled]);
	const handleDelete = useCallback$2(async (name, isGlobal, path) => {
		if (!confirmDelete[name]) {
			setConfirmDelete((prev) => ({
				...prev,
				[name]: true
			}));
			setTimeout(() => {
				setConfirmDelete((prev) => ({
					...prev,
					[name]: false
				}));
			}, 3e3);
			return;
		}
		setDeletingSkills((prev) => ({
			...prev,
			[name]: true
		}));
		try {
			const res = await ipc$3.invoke("skills-manager:remove", name, isGlobal, path);
			if (res.success) {
				bottomToast.success(`Successfully removed skill "${name}".`);
				await onRefreshInstalled();
			} else bottomToast.danger(`Failed to remove skill: ${res.error}`);
		} catch (err) {
			console.error("Remove error:", err);
			bottomToast.danger(`Remove error: ${err.message || String(err)}`);
		} finally {
			setDeletingSkills((prev) => ({
				...prev,
				[name]: false
			}));
			setConfirmDelete((prev) => ({
				...prev,
				[name]: false
			}));
		}
	}, [confirmDelete, onRefreshInstalled]);
	const renderSkillsTable = useCallback$2((skills, showHeader = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsTable, {
		skills,
		showHeader,
		selectedKeys,
		handleUpdate,
		handleDelete,
		confirmDelete,
		updatingSkills,
		deletingSkills,
		setSelectedKeys,
		bulkLoadingStatus,
		toggleSelectSkill,
		selectedSkillsList
	}), [
		selectedKeys,
		selectedSkillsList,
		updatingSkills,
		deletingSkills,
		confirmDelete,
		bulkLoadingStatus,
		handleUpdate,
		handleDelete,
		toggleSelectSkill
	]);
	if (isLoadingInstalled) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-20 gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner$2, { size: "lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$3, {
			className: "text-sm text-semi-muted",
			children: "Loading installed skills..."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "size-full flex flex-col overflow-hidden",
		children: installedSkills.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5 mx-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$7, {
					"aria-hidden": "true",
					className: "size-10 text-semi-muted mb-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$2, {
					className: "text-sm font-semibold",
					children: "No skills installed yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$3, {
					className: "text-xs text-semi-muted mt-1",
					children: "Head over to the 'Discover Skills' tab to install capabilities for your agents."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 mt-4",
					children: [onSwitchTab && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$2, {
						size: "sm",
						onPress: () => onSwitchTab("discover"),
						className: "bg-LynxPurple text-white px-5 hover:opacity-90 transition",
						children: "Browse Skills"
					}), onInstallCustom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$2, {
						size: "sm",
						variant: "secondary",
						onPress: onInstallCustom,
						className: "px-5 hover:opacity-90 transition",
						children: "Install Custom..."
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col overflow-hidden min-h-0",
			children: [
				bulkLoadingStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-3 py-2.5 bg-LynxBlue/15 border border-LynxBlue/25 rounded-xl mb-4 text-xs text-white/95 animate-pulse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner$2, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: bulkLoadingStatus
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center mb-4 gap-4 px-2",
					children: [selectedSkillsList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography$2, {
							className: "text-sm font-semibold text-LynxBlue",
							children: [
								selectedSkillsList.length,
								" skill",
								selectedSkillsList.length === 1 ? "" : "s",
								" selected"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$2, {
									size: "sm",
									variant: "secondary",
									className: "text-xs",
									isDisabled: !!bulkLoadingStatus,
									onPress: () => handleBulkUpdate(selectedSkillsList),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$2, { className: "size-3.5" }), "Update Selected"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$2, {
									size: "sm",
									className: "text-xs",
									variant: "danger-soft",
									onPress: onPressBulkRemove,
									isDisabled: !!bulkLoadingStatus,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$2, { className: "size-3.5" }), confirmBulkDelete ? "Confirm Remove?" : "Remove Selected"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$2, {
									size: "sm",
									variant: "ghost",
									isDisabled: !!bulkLoadingStatus,
									onPress: () => setSelectedKeys(/* @__PURE__ */ new Set()),
									className: "text-xs text-semi-muted hover:text-white",
									children: "Cancel"
								})
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$2, {
								className: "text-sm text-semi-muted",
								children: filterQuery.trim() ? `Found ${filteredSkills.length} of ${installedSkills.length} skills` : `Showing ${installedSkills.length} installed skill${installedSkills.length === 1 ? "" : "s"}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dropdown, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$2, {
								size: "sm",
								variant: "secondary",
								className: "text-xs",
								isDisabled: !!bulkLoadingStatus,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$2, { className: "size-3.5" }), "Update All"]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown.Popover, {
								className: "min-w-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dropdown.Menu, {
									onAction: handleBulkActionOption,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown.Item, {
											id: "all",
											textValue: "Update All",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label$3, { children: [
												"Update All (",
												installedSkills.length,
												")"
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown.Item, {
											id: "project",
											textValue: "Update Project Scope",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label$3, { children: [
												"Update Project Scope (",
												installedSkills.filter((s) => s.scope === "project").length,
												")"
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown.Item, {
											id: "global",
											textValue: "Update Global Scope",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label$3, { children: [
												"Update Global Scope (",
												installedSkills.filter((s) => s.scope === "global").length,
												")"
											] })
										}),
										uniqueAgents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, { className: "my-1" }),
										uniqueAgents.map((agent) => {
											const agentCount = installedSkills.filter((s) => s.agents && s.agents.includes(agent)).length;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown.Item, {
												id: `agent-${agent}`,
												textValue: `Update Agent: ${agent}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label$3, { children: [
													"Update Agent: ",
													agent,
													" (",
													agentCount,
													")"
												] })
											}, agent);
										})
									]
								})
							})] }),
							onInstallCustom && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$2, {
								size: "sm",
								variant: "secondary",
								className: "text-xs",
								onPress: onInstallCustom,
								isDisabled: !!bulkLoadingStatus,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Install Custom"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
								className: "w-64",
								variant: "secondary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup.Prefix, {
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$1, { className: "size-3.5 text-semi-muted" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup.Input, {
										value: filterQuery,
										className: "text-xs",
										"aria-label": "Filter skills",
										placeholder: "Filter skills...",
										onChange: (e) => setFilterQuery(e.target.value)
									}),
									filterQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup.Suffix, {
										className: "pr-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$2, {
											className: "h-5 w-5 min-w-5 p-0 hover:bg-foreground/10 rounded-full flex items-center justify-center",
											size: "sm",
											variant: "ghost",
											"aria-label": "Clear filter",
											onPress: () => setFilterQuery(""),
											isIconOnly: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3 text-semi-muted" })
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-semi-muted whitespace-nowrap ml-2",
								children: "Group by:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
								value: groupBy,
								className: "w-56",
								variant: "secondary",
								placeholder: "All Skills",
								onChange: handleGroupByChange,
								isDisabled: !!bulkLoadingStatus,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1.Trigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$1.Value, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$1.Indicator, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$1.Popover, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$1, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$1.Item, {
										id: "all",
										textValue: "All Skills",
										children: ["All Skills", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$1.ItemIndicator, {})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$1.Item, {
										id: "folder",
										textValue: "Folder",
										children: ["Folder", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$1.ItemIndicator, {})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$1.Item, {
										id: "scope",
										textValue: "Scope",
										children: ["Scope", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$1.ItemIndicator, {})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox$1.Item, {
										id: "agents",
										textValue: "Target Agent",
										children: ["Target Agent", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox$1.ItemIndicator, {})]
									})
								] }) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectFoldersPopover, {
								projectDirs,
								onAddProjectDir: handleAddProjectDir,
								getSkillsCountForDir,
								onRemoveProjectDir: handleRemoveProjectDir
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollShadow, {
					className: "flex-1 overflow-y-auto px-2",
					children: groupBy === "all" ? renderSkillsTable(filteredSkills, true) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
						expandedKeys,
						className: "flex flex-col gap-4 w-full",
						onExpandedChange: (keys) => setExpandedKeys(keys),
						hideSeparator: true,
						allowsMultipleExpanded: true,
						children: currentGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Accordion.Item, {
							id: group.id,
							className: "border border-foreground/5 rounded-2xl bg-foreground/2 pt-2 flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion.Heading, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Accordion.Trigger, {
								className: "flex items-center justify-between cursor-pointer select-none w-full text-left bg-transparent hover:bg-transparent border-none p-0 px-4 focus:outline-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 truncate",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$4, { className: cn("size-4 text-semi-muted transition-transform duration-200 shrink-0", !expandedKeys.has(group.id) && "-rotate-90") }),
										group.icon,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$2, {
											className: cn("font-semibold font-JetBrainsMono truncate", groupBy === "folder" ? "text-[12px] text-foreground/90" : "text-[13px] text-foreground/95"),
											title: group.title,
											children: group.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$2, {
											size: "sm",
											variant: "secondary",
											className: "bg-foreground/10 text-semi-muted text-[10px] h-5 py-0",
											children: group.skills.length
										})
									]
								}), groupBy === "folder" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "ml-auto",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$2, {
										className: "text-[10px] text-semi-muted hover:text-LynxBlue h-auto p-0 border-none bg-transparent min-w-0 cursor-pointer hover:bg-transparent",
										size: "sm",
										variant: "ghost",
										onPress: () => ipc$3.send("app:openPath", group.id),
										children: "Open Folder"
									})
								})]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion.Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion.Body, {
								className: "pt-3",
								children: renderSkillsTable(group.skills)
							}) })]
						}, group.id))
					})
				})
			]
		})
	});
}
//#endregion
//#region extension/src/renderer/components/InstalledSkillsTab.tsx
var InstalledSkillsTab_default = InstalledSkillsTab;
//#endregion
//#region extension/src/renderer/components/SkillInstallerModal/SecurityAudits.tsx
var { Chip: Chip$1, Label: Label$2, Spinner: Spinner$1, Typography: Typography$1 } = await importShared("@heroui/react");
function SecurityAudits({ isLoadingAudit, auditReport, auditReports = [] }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5 mt-2 bg-surface-secondary border border-border p-3 rounded-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label$2, {
			className: "text-xs font-semibold text-semi-muted flex items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$10, { className: "size-4 text-LynxPurple" }), "Security & Safety Audits"]
		}), isLoadingAudit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 py-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner$1, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-semi-muted",
				children: "Querying security reports..."
			})]
		}) : auditReports.length > 0 || auditReport && auditReport.audits && auditReport.audits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 mt-1",
			children: [(() => {
				const reports = auditReports.length > 0 ? auditReports : auditReport ? [auditReport] : [];
				return reports.map((report) => {
					const skillName = (report.slug || "").split("/").pop() || report.source || report.id?.split("/").pop() || "";
					const hasAudits = report.audits && report.audits.length > 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [reports.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$1, {
							className: "text-xs font-bold text-LynxBlue font-JetBrainsMono mt-1",
							children: skillName
						}), hasAudits ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
							children: report.audits.map((audit) => {
								const isFail = audit.status === "fail";
								const isWarn = audit.status === "warn";
								let badgeColor = "bg-success-soft text-success";
								if (isWarn) badgeColor = "bg-warning-soft text-warning";
								if (isFail) badgeColor = "bg-danger-soft text-danger";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between px-3 py-1.5 rounded-xl bg-surface border border-border",
									title: `${audit.provider}: ${audit.summary}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-semi-muted truncate",
											children: audit.provider
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$1, {
											size: "sm",
											className: `${badgeColor} text-[8px] h-4 shrink-0`,
											children: audit.status.toUpperCase()
										})]
									}), audit.riskLevel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] text-semi-muted font-JetBrainsMono truncate",
										children: audit.riskLevel
									})]
								}, audit.provider);
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$1, {
							className: "text-[10px] text-semi-muted italic mt-0.5",
							children: "No security audit records found for this skill."
						})]
					}, report.id || report.slug);
				});
			})(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$1, {
				className: "text-[10px] text-semi-muted mt-1 leading-normal",
				children: "Verdicts provided by Gen Agent Trust Hub, Socket, Snyk, Runlayer, ZeroLeaks."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography$1, {
			className: "text-[11px] text-semi-muted italic mt-1",
			children: "No security audit report found for this skill yet. Review before running."
		})]
	});
}
//#endregion
//#region extension/src/renderer/components/SkillInstallerModal/index.tsx
var { Autocomplete, Button: Button$1, Checkbox, Chip, Description: Description$2, EmptyState, Label: Label$1, ListBox, Modal: Modal$1, SearchField, Select, Separator, Spinner, Tabs: Tabs$1, Tag, TagGroup, useFilter } = await importShared("@heroui/react");
var { useCallback: useCallback$1, useEffect: useEffect$3, useState: useState$2 } = await importShared("react");
var ipc$2 = window.electron.ipcRenderer;
function SkillInstallerModal({ selectedSkills, onClose, onInstallSuccess }) {
	const { contains } = useFilter({ sensitivity: "base" });
	const [installScope, setInstallScope] = useState$2("project");
	const [installMethod, setInstallMethod] = useState$2("symlink");
	const [supportedAgents, setSupportedAgents] = useState$2([]);
	const [selectedAgents, setSelectedAgents] = useState$2(["antigravity"]);
	const [allAgents, setAllAgents] = useState$2(false);
	const [isInstalling, setIsInstalling] = useState$2(false);
	const [installProgressMessage, setInstallProgressMessage] = useState$2("");
	const [installResult, setInstallResult] = useState$2(null);
	const [projectDirs, setProjectDirs] = useState$2([]);
	const [selectedProjectCwd, setSelectedProjectCwd] = useState$2("");
	const onRemoveTags = useCallback$1((keys) => {
		setSelectedAgents((prev) => prev.filter((key) => !keys.has(key)));
	}, []);
	const [auditReports, setAuditReports] = useState$2([]);
	const [isLoadingAudit, setIsLoadingAudit] = useState$2(false);
	const loadProjects = useCallback$1(async () => {
		try {
			const dirs = await ipc$2.invoke("skills-manager:get-project-dirs");
			setProjectDirs(dirs || []);
			if (dirs && dirs.length > 0) setSelectedProjectCwd((prev) => dirs.includes(prev) ? prev : dirs[0]);
			else setSelectedProjectCwd("");
		} catch (err) {
			console.error("Failed to load project dirs:", err);
		}
	}, []);
	useEffect$3(() => {
		const loadAgents = async () => {
			try {
				const list = await ipc$2.invoke("skills-manager:get-agents");
				setSupportedAgents(list);
			} catch (err) {
				console.error("Failed to load agents list:", err);
			}
		};
		loadAgents();
		loadProjects();
	}, [loadProjects]);
	useEffect$3(() => {
		if (selectedSkills.length > 0) {
			setInstallScope("project");
			setInstallMethod("symlink");
			setSelectedAgents(["antigravity"]);
			setAllAgents(false);
			setIsInstalling(false);
			setInstallProgressMessage("");
			setInstallResult(null);
			setAuditReports([]);
			const loadAudits = async () => {
				setIsLoadingAudit(true);
				try {
					const allAudits = [];
					await Promise.all(selectedSkills.map(async (skill) => {
						const source = skill.source || skill.id?.split("/").slice(0, 2).join("/");
						const skillName = skill.name;
						if (source && skillName) {
							const res = await ipc$2.invoke("skills-manager:get-audit", source, skillName);
							if (res) allAudits.push(res);
						}
					}));
					setAuditReports(allAudits);
				} catch (err) {
					console.error("Failed to fetch security audits:", err);
				} finally {
					setIsLoadingAudit(false);
				}
			};
			loadAudits();
			loadProjects();
		}
	}, [selectedSkills, loadProjects]);
	const handleProjectSelectChange = useCallback$1(async (key) => {
		if (key === "add-new") try {
			const dir = await ipc$2.invoke("skills-manager:select-project-dir");
			if (dir) {
				const updated = await ipc$2.invoke("skills-manager:add-project-dir", dir);
				setProjectDirs(updated || []);
				setSelectedProjectCwd(dir);
			}
		} catch (err) {
			console.error("Failed to select directory:", err);
		}
		else setSelectedProjectCwd(key);
	}, []);
	const handleStartInstall = useCallback$1(async () => {
		if (selectedSkills.length === 0) return;
		setIsInstalling(true);
		setInstallResult(null);
		const agent = allAgents ? "*" : selectedAgents.join(" ");
		const isGlobal = installScope === "global";
		const isCopy = installMethod === "copy";
		const targetCwd = isGlobal ? void 0 : selectedProjectCwd;
		let successCount = 0;
		let failCount = 0;
		const errors = [];
		for (let i = 0; i < selectedSkills.length; i++) {
			const skill = selectedSkills[i];
			setInstallProgressMessage(`Installing skill ${i + 1} of ${selectedSkills.length}: "${skill.name}"...`);
			const source = skill.source ? skill.source.includes("/") ? `${skill.source}@${skill.name}` : `${skill.source}/${skill.name}` : skill.id || skill.name;
			try {
				const res = await ipc$2.invoke("skills-manager:add", source, isGlobal, agent, isCopy, targetCwd);
				if (res.success) successCount++;
				else {
					failCount++;
					errors.push(`"${skill.name}": ${res.error || "Failed to install"}`);
				}
			} catch (err) {
				failCount++;
				errors.push(`"${skill.name}": ${err.message || String(err)}`);
			}
		}
		if (failCount === 0) {
			setInstallResult({
				success: true,
				message: selectedSkills.length > 1 ? `Successfully installed all ${successCount} skills!` : `Successfully installed ${selectedSkills[0].name}!`
			});
			await onInstallSuccess();
		} else if (successCount === 0) setInstallResult({
			success: false,
			message: `Failed to install skills:\n${errors.join("\n")}`
		});
		else {
			setInstallResult({
				success: false,
				message: `Installed ${successCount} skill(s), ${failCount} failed:\n${errors.join("\n")}`
			});
			await onInstallSuccess();
		}
		setIsInstalling(false);
	}, [
		selectedSkills,
		installScope,
		installMethod,
		selectedAgents,
		allAgents,
		onInstallSuccess,
		selectedProjectCwd
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabModal, {
		size: "lg",
		isOpen: selectedSkills.length > 0,
		dialogClassName: "max-w-3xl pb-3 px-1",
		onOpenChange: (open) => !open && onClose(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$1.CloseTrigger, { onPress: onClose }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal$1.Header, {
				className: "flex flex-col gap-y-1 px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$19, { className: "size-6 text-LynxPurple" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$1.Heading, {
						className: "text-lg font-bold",
						children: selectedSkills.length > 1 ? `Install ${selectedSkills.length} Skills` : `Install ${selectedSkills[0]?.name}`
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$2, {
					className: "text-xs text-semi-muted",
					children: selectedSkills.length > 1 ? `Configure target agents and scope for the ${selectedSkills.length} selected skills.` : "Configure target agents and scope for this skill."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal$1.Body, {
				className: "flex flex-col gap-4 px-4",
				children: [
					selectedSkills.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5 p-2 bg-surface-secondary rounded-2xl max-h-24 overflow-y-auto shrink-0",
						children: selectedSkills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							size: "sm",
							variant: "secondary",
							className: "bg-surface px-1.5",
							children: s.name
						}, s.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "opacity-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
							className: "text-xs text-semi-muted",
							children: "Installation Scope"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1, {
							className: "w-full",
							selectedKey: installScope,
							"aria-label": "Installation Scope",
							onSelectionChange: (key) => setInstallScope(key),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1.ListContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1.List, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1.Tab, {
								id: "project",
								children: "Project-scoped"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1.Tab, {
								id: "global",
								children: "Global (User-level)"
							})] }) })
						})]
					}),
					installScope === "project" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
							className: "text-xs text-semi-muted",
							children: "Project Destination"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							variant: "secondary",
							isDisabled: isInstalling,
							value: selectedProjectCwd,
							placeholder: "Select project destination",
							onChange: (val) => handleProjectSelectChange(val),
							fullWidth: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select.Trigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Value, {
								className: "font-JetBrainsMono text-sm",
								children: selectedProjectCwd || "Select a project folder..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Indicator, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Popover, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox, { children: [
								projectDirs.map((dir) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox.Item, {
									id: dir,
									textValue: dir,
									className: "font-JetBrainsMono text-xs",
									children: [dir, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox.ItemIndicator, {})]
								}, dir)),
								projectDirs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "opacity-50" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox.Item, {
									id: "add-new",
									className: "text-accent gap-x-1 font-medium",
									textValue: "+ Register new project directory...",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }),
										"Register new project directory...",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox.ItemIndicator, {})
									]
								})
							] }) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
							className: "text-xs text-semi-muted",
							children: "Installation Method"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1, {
							className: "w-full",
							selectedKey: installMethod,
							"aria-label": "Installation Method",
							onSelectionChange: (key) => setInstallMethod(key),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1.ListContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1.List, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1.Tab, {
								id: "symlink",
								children: "Symlink (Recommended)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1.Tab, {
								id: "copy",
								children: "Copy Files"
							})] }) })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
								className: "text-xs text-semi-muted",
								children: "Target AI Agents"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								variant: "secondary",
								isSelected: allAgents,
								onChange: setAllAgents,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox.Content, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Control, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Indicator, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-semi-muted",
									children: "All Agents"
								})] })
							})]
						}), !allAgents && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Autocomplete, {
							variant: "secondary",
							value: selectedAgents,
							selectionMode: "multiple",
							placeholder: "Select target agents",
							onChange: (keys) => setSelectedAgents(keys),
							fullWidth: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Autocomplete.Trigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Autocomplete.Value, { children: ({ defaultChildren, isPlaceholder, state }) => {
								if (isPlaceholder || state.selectedItems.length === 0) return defaultChildren;
								const selectedItemsKeys = state.selectedItems.map((item) => item.key);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagGroup, {
									size: "sm",
									onRemove: onRemoveTags,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagGroup.List, { children: selectedItemsKeys.map((selectedItemKey) => {
										const agent = supportedAgents.find((s) => s.name === selectedItemKey);
										if (!agent) return null;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
											id: agent.name,
											children: agent.displayName
										}, agent.name);
									}) })
								});
							} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Autocomplete.Indicator, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Autocomplete.Popover, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Autocomplete.Filter, {
								filter: contains,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
									name: "search",
									variant: "secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SearchField.Group, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField.SearchIcon, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField.Input, { placeholder: "Search agents..." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField.ClearButton, {})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox, {
									renderEmptyState: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { children: "No agents found" }),
									children: supportedAgents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListBox.Item, {
										id: agent.name,
										textValue: agent.displayName,
										children: [agent.displayName, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBox.ItemIndicator, {})]
									}, agent.name))
								})]
							}) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityAudits, {
						auditReports,
						isLoadingAudit
					}),
					isInstalling && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-semi-muted",
							children: selectedSkills.length > 1 ? installProgressMessage : "Installing skill package via CLI..."
						})]
					}),
					installResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-start gap-2 p-3 rounded-xl text-xs ${installResult.success ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`,
						children: [installResult.success ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$8, { className: "size-4 shrink-0 mt-0.5 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$7, { className: "size-4 shrink-0 mt-0.5 text-danger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "break-all",
							children: installResult.message
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "opacity-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal$1.Footer, {
				className: "pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					isDisabled: isInstalling || !allAgents && selectedAgents.length === 0 || installScope === "project" && !selectedProjectCwd,
					size: "sm",
					onPress: handleStartInstall,
					className: "bg-LynxPurple text-white px-5",
					children: selectedSkills.length > 1 ? `Install ${selectedSkills.length} Skills` : "Install Skill"
				})
			})
		]
	});
}
//#endregion
//#region extension/src/renderer/components/SkillInstallerModal.tsx
var SkillInstallerModal_default = SkillInstallerModal;
//#endregion
//#region extension/src/renderer/SkillsManagerModal.tsx
var { Description: Description$1, Modal, Tabs, Typography } = await importShared("@heroui/react");
var { useCallback, useEffect: useEffect$2, useState: useState$1 } = await importShared("react");
var ipc$1 = window.electron.ipcRenderer;
function SkillsManagerModal() {
	const [isOpen, setIsOpen] = useState$1(false);
	const [activeTab, setActiveTab] = useState$1("installed");
	const [installedSkills, setInstalledSkills] = useState$1([]);
	const [isLoadingInstalled, setIsLoadingInstalled] = useState$1(false);
	const [searchQuery, setSearchQuery] = useState$1("");
	const [searchResults, setSearchResults] = useState$1([]);
	const [isLoadingSearch, setIsLoadingSearch] = useState$1(false);
	const [hasSearched, setHasSearched] = useState$1(false);
	const [selectedSkills, setSelectedSkills] = useState$1([]);
	const [isCustomInstallOpen, setIsCustomInstallOpen] = useState$1(false);
	useEffect$2(() => {
		const handleOpen = () => {
			setIsOpen(true);
			loadInstalledSkills();
		};
		window.addEventListener("open-skills-manager", handleOpen);
		return () => window.removeEventListener("open-skills-manager", handleOpen);
	}, []);
	useEffect$2(() => {
		if (!isOpen) ipc$1.invoke("skills-manager:clear-description-cache").catch((err) => {
			console.error("Failed to clear description cache:", err);
		});
	}, [isOpen]);
	const loadInstalledSkills = useCallback(async () => {
		setIsLoadingInstalled(true);
		try {
			const [projectSkills, globalSkills] = await Promise.all([ipc$1.invoke("skills-manager:list", false), ipc$1.invoke("skills-manager:list", true)]);
			const formattedProject = (projectSkills || []).map((s) => ({
				...s,
				scope: "project"
			}));
			const formattedGlobal = (globalSkills || []).map((s) => ({
				...s,
				scope: "global"
			}));
			const combined = [...formattedProject, ...formattedGlobal];
			setInstalledSkills(combined);
		} catch (err) {
			console.error("Failed to load installed skills:", err);
		} finally {
			setIsLoadingInstalled(false);
		}
	}, []);
	const handleSearch = useCallback(async () => {
		if (!searchQuery.trim()) return;
		setIsLoadingSearch(true);
		setHasSearched(true);
		try {
			const results = await ipc$1.invoke("skills-manager:search", searchQuery);
			setSearchResults(results || []);
		} catch (err) {
			console.error("Failed to search skills:", err);
			setSearchResults([]);
		} finally {
			setIsLoadingSearch(false);
		}
	}, [searchQuery]);
	const isSkillInstalled = useCallback((name) => {
		return installedSkills.some((s) => s.name.toLowerCase() === name.toLowerCase());
	}, [installedSkills]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabModal, {
			size: "cover",
			isOpen,
			dialogClassName: "pb-0",
			onOpenChange: setIsOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal.Body, {
				className: "flex flex-col px-0 h-full max-h-full p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$19, {
							"aria-hidden": "true",
							className: "size-8 text-LynxPurple"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							className: "text-xl font-bold tracking-wide",
							children: "Skills Manager"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description$1, {
							className: "text-xs text-semi-muted mt-0.5",
							children: "Manage and discover reusable instruction packages for your AI coding agents."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.CloseTrigger, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					selectedKey: activeTab,
					"aria-label": "Skills Manager navigation",
					onSelectionChange: (key) => setActiveTab(String(key)),
					className: "flex-1 flex flex-col min-h-0 pb-4 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.ListContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs.List, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs.Tab, {
								id: "installed",
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$14, { className: "size-3.5" }),
									"Installed",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Indicator, {})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs.Tab, {
								id: "discover",
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$15, { className: "size-4" }),
									"Discover",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Indicator, {})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs.Tab, {
								id: "create",
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$13, { className: "size-4" }),
									"Create",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Indicator, {})
								]
							})
						] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Panel, {
							id: "installed",
							className: "flex-1 flex flex-col overflow-hidden min-h-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstalledSkillsTab_default, {
								onSwitchTab: setActiveTab,
								installedSkills,
								isLoadingInstalled,
								onRefreshInstalled: loadInstalledSkills,
								onInstallCustom: () => setIsCustomInstallOpen(true)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Panel, {
							id: "discover",
							className: "flex-1 flex flex-col overflow-hidden min-h-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoverSkillsTab_default, {
								onSearch: handleSearch,
								searchQuery,
								hasSearched,
								searchResults,
								isLoadingSearch,
								onSelectSkills: setSelectedSkills,
								isSkillInstalled,
								onSearchQueryChange: setSearchQuery,
								onSelectSkill: (skill) => setSelectedSkills([skill])
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Panel, {
							id: "create",
							className: "flex-1 flex flex-col overflow-hidden min-h-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateSkillTab_default, { onCreated: () => {
								loadInstalledSkills();
								setActiveTab("installed");
							} })
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillInstallerModal_default, {
			selectedSkills,
			onClose: () => setSelectedSkills([]),
			onInstallSuccess: loadInstalledSkills
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallCustomSkillModal, {
			isOpen: isCustomInstallOpen,
			onClose: () => setIsCustomInstallOpen(false),
			onProceed: (skill) => setSelectedSkills([skill])
		})
	] });
}
//#endregion
//#region src/common/consts/ipcChannels/browser.ts
/**
* IPC channels for browser-related functionality.
* Handles tab management, navigation, zoom, volume, and other webview interactions.
*/
var browserChannels = {
	createBrowser: "browser:create-browser",
	removeBrowser: "browser:remove-browser",
	loadURL: "browser:load-url",
	setVisible: "browser:set-visible",
	openFindInPage: "browser:openFindInPage",
	openZoom: "browser:openZoom",
	openVolume: "browser:openVolume",
	onZoomChanged: "browser:on-zoom-changed",
	onLinkHover: "browser:on-link-hover",
	resizeLinkPreview: "browser:resize-link-preview",
	resizeBrowserView: "browser:resize-browser-view",
	findInPage: "browser:findInPage",
	stopFindInPage: "browser:stopFindInPage",
	onFoundInPage: "browser:on-found-in-page",
	setZoomFactor: "browser:setZoomFactor",
	focusWebView: "browser:focus-webview",
	clearCache: "browser:clear-cache",
	clearCookies: "browser:clear-cookies",
	reload: "browser:reload",
	focus: "browser:focus",
	stop: "browser:stop",
	goBack: "browser:goBack",
	goForward: "browser:goForward",
	toggleDevTools: "browser:toggle-devtools",
	onCanGo: "browser:on-can-go",
	isLoading: "browser:is-loading",
	onTitleChange: "browser:on-title-change",
	onFavIconChange: "browser:on-favicon-change",
	onUrlChange: "browser:on-url-change",
	onDomReady: "browser:on-dom-ready",
	getUserAgent: "browser:get-user-agent",
	updateUserAgent: "browser:update-user-agent",
	clearHistory: "browser:clear-history",
	onFailedLoadUrl: "browser:on-failed-load-url",
	onClearFailed: "browser:on-clear-failed",
	setVolume: "volume:set",
	setMuted: "volume:setMuted",
	getState: "volume:getState",
	updateTabVolume: "volume:updateTabVolume",
	updateTabMuted: "volume:updateTabMuted",
	onTabVolumeUpdate: "volume:onTabVolumeUpdate",
	onTabMutedUpdate: "volume:onTabMutedUpdate",
	onAudioStateChange: "volume:onAudioStateChange"
};
//#endregion
//#region src/renderer/shared/ipc/ipcEvents.ts
var listeners = {
	before: /* @__PURE__ */ new Set(),
	after: /* @__PURE__ */ new Set()
};
var channelListeners = {
	before: /* @__PURE__ */ new Map(),
	after: /* @__PURE__ */ new Map()
};
var getListenersForEvent = (event) => {
	const base = [...listeners[event.phase]];
	const perChannel = channelListeners[event.phase].get(event.channel);
	if (perChannel) base.push(...perChannel);
	return base;
};
var logHookError = (error) => {
	console.error("Extension renderer IPC hook failed:", error);
};
var runListenerSync = (listener, event) => {
	try {
		const result = listener(event);
		if (result && typeof result.then === "function") result.catch(logHookError);
	} catch (error) {
		logHookError(error);
	}
};
var runListener = async (listener, event) => {
	try {
		await listener(event);
	} catch (error) {
		logHookError(error);
	}
};
var emitRendererIpcEventSync = (event) => {
	for (const listener of getListenersForEvent(event)) runListenerSync(listener, event);
};
var emitRendererIpcEvent = async (event) => {
	for (const listener of getListenersForEvent(event)) await runListener(listener, event);
};
//#endregion
//#region src/renderer/shared/ipc/lynxIpc.ts
var ipc = window.electron.ipcRenderer;
var send = (channel, ...args) => {
	const eventStart = Date.now();
	const beforeEvent = {
		phase: "before",
		method: "send",
		channel,
		args: [...args],
		timestamp: eventStart
	};
	emitRendererIpcEventSync(beforeEvent);
	try {
		ipc.send(channel, ...args);
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "success",
			durationMs: Date.now() - eventStart
		});
	} catch (error) {
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "error",
			durationMs: Date.now() - eventStart,
			error
		});
		throw error;
	}
};
var sendSync = (channel, ...args) => {
	const eventStart = Date.now();
	const beforeEvent = {
		phase: "before",
		method: "sendSync",
		channel,
		args: [...args],
		timestamp: eventStart
	};
	emitRendererIpcEventSync(beforeEvent);
	try {
		const result = ipc.sendSync(channel, ...args);
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "success",
			durationMs: Date.now() - eventStart,
			result
		});
		return result;
	} catch (error) {
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "error",
			durationMs: Date.now() - eventStart,
			error
		});
		throw error;
	}
};
var invoke = async (channel, ...args) => {
	const eventStart = Date.now();
	const beforeEvent = {
		phase: "before",
		method: "invoke",
		channel,
		args: [...args],
		timestamp: eventStart
	};
	await emitRendererIpcEvent(beforeEvent);
	try {
		const result = await ipc.invoke(channel, ...args);
		await emitRendererIpcEvent({
			...beforeEvent,
			phase: "after",
			status: "success",
			durationMs: Date.now() - eventStart,
			result
		});
		return result;
	} catch (error) {
		await emitRendererIpcEvent({
			...beforeEvent,
			phase: "after",
			status: "error",
			durationMs: Date.now() - eventStart,
			error
		});
		throw error;
	}
};
var on = (channel, callback) => ipc.on(channel, (_, ...args) => {
	const typedArgs = args;
	const eventStart = Date.now();
	const beforeEvent = {
		phase: "before",
		method: "on",
		channel,
		args: [...typedArgs],
		timestamp: eventStart
	};
	emitRendererIpcEventSync(beforeEvent);
	try {
		const result = callback(...typedArgs);
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "success",
			durationMs: Date.now() - eventStart,
			result
		});
	} catch (error) {
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "error",
			durationMs: Date.now() - eventStart,
			error
		});
		throw error;
	}
});
var once = (channel, callback) => ipc.once(channel, (_, ...args) => {
	const typedArgs = args;
	const eventStart = Date.now();
	const beforeEvent = {
		phase: "before",
		method: "once",
		channel,
		args: [...typedArgs],
		timestamp: eventStart
	};
	emitRendererIpcEventSync(beforeEvent);
	try {
		const result = callback(...typedArgs);
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "success",
			durationMs: Date.now() - eventStart,
			result
		});
	} catch (error) {
		emitRendererIpcEventSync({
			...beforeEvent,
			phase: "after",
			status: "error",
			durationMs: Date.now() - eventStart,
			error
		});
		throw error;
	}
});
var lynxIpc = {
	send,
	sendSync,
	on,
	once,
	invoke
};
//#endregion
//#region src/renderer/shared/ipc/browser.ts
var invokeWithSoftTimeout = async (channel, timeoutMessage, ...args) => {
	try {
		await Promise.race([lynxIpc.invoke(channel, ...args), new Promise((_, reject) => setTimeout(() => reject(new Error(timeoutMessage)), 8e3))]);
	} catch {}
};
var browserIpc = {
	send: {
		resizeLinkPreview: (width) => lynxIpc.send(browserChannels.resizeLinkPreview, width),
		resizeBrowserView: (data) => lynxIpc.send(browserChannels.resizeBrowserView, data),
		createBrowser: (id) => lynxIpc.send(browserChannels.createBrowser, id),
		removeBrowser: (id) => lynxIpc.send(browserChannels.removeBrowser, id),
		loadURL: (id, url) => lynxIpc.send(browserChannels.loadURL, id, url),
		setVisible: (id, visible) => lynxIpc.send(browserChannels.setVisible, id, visible),
		openFindInPage: (id, customPosition) => lynxIpc.send(browserChannels.openFindInPage, id, customPosition),
		openZoom: (id, customPosition) => lynxIpc.send(browserChannels.openZoom, id, customPosition),
		openVolume: (data, customPosition) => lynxIpc.send(browserChannels.openVolume, data, customPosition),
		findInPage: (id, value, options) => lynxIpc.send(browserChannels.findInPage, id, value, options),
		stopFindInPage: (id, action) => lynxIpc.send(browserChannels.stopFindInPage, id, action),
		focusWebView: (id) => lynxIpc.send(browserChannels.focusWebView, id),
		setZoomFactor: (id, factor) => lynxIpc.send(browserChannels.setZoomFactor, id, factor),
		reload: (id) => lynxIpc.send(browserChannels.reload, id),
		focus: (id) => lynxIpc.send(browserChannels.focus, id),
		stop: (id) => lynxIpc.send(browserChannels.stop, id),
		goBack: (id) => lynxIpc.send(browserChannels.goBack, id),
		goForward: (id) => lynxIpc.send(browserChannels.goForward, id),
		toggleDevTools: (id) => lynxIpc.send(browserChannels.toggleDevTools, id),
		updateUserAgent: () => lynxIpc.send(browserChannels.updateUserAgent),
		clearHistory: (selected) => lynxIpc.send(browserChannels.clearHistory, selected),
		updateTabVolume: (tabId, volume) => lynxIpc.send(browserChannels.updateTabVolume, tabId, volume),
		updateTabMuted: (tabId, muted) => lynxIpc.send(browserChannels.updateTabMuted, tabId, muted)
	},
	on: {
		linkHover: (callback) => lynxIpc.on(browserChannels.onLinkHover, callback),
		canGoBackForward: (result) => lynxIpc.on(browserChannels.onCanGo, result),
		loading: (result) => lynxIpc.on(browserChannels.isLoading, result),
		titleChanged: (result) => lynxIpc.on(browserChannels.onTitleChange, result),
		favIconChanged: (result) => lynxIpc.on(browserChannels.onFavIconChange, result),
		urlChanged: (result) => lynxIpc.on(browserChannels.onUrlChange, result),
		domReady: (result) => lynxIpc.on(browserChannels.onDomReady, result),
		failedLoadUrl: (result) => lynxIpc.on(browserChannels.onFailedLoadUrl, result),
		clearFailed: (result) => lynxIpc.on(browserChannels.onClearFailed, result),
		onAudioStateChange: (callback) => lynxIpc.on(browserChannels.onAudioStateChange, callback),
		onTabVolumeUpdate: (callback) => lynxIpc.on(browserChannels.onTabVolumeUpdate, callback),
		onTabMutedUpdate: (callback) => lynxIpc.on(browserChannels.onTabMutedUpdate, callback),
		foundInPage: (callback) => lynxIpc.on(browserChannels.onFoundInPage, callback),
		onZoomChanged: (callback) => lynxIpc.on(browserChannels.onZoomChanged, callback)
	},
	invoke: {
		clearCache: () => lynxIpc.invoke(browserChannels.clearCache),
		clearCookies: () => lynxIpc.invoke(browserChannels.clearCookies),
		getUserAgent: (type) => lynxIpc.invoke(browserChannels.getUserAgent, type),
		setVolume: (id, volume) => invokeWithSoftTimeout(browserChannels.setVolume, "Volume set operation timed out", id, volume),
		setMuted: (id, muted) => invokeWithSoftTimeout(browserChannels.setMuted, "Mute set operation timed out", id, muted)
	}
};
//#endregion
//#region src/common/consts/ipcChannels/pty.ts
/**
* IPC channels for PTY (Pseudo-Terminal) operations.
* Handles terminal process management, input/output, resizing, and custom commands.
*/
var ptyChannels = {
	process: "pty-process",
	customProcess: "pty-custom-process",
	emptyProcess: "pty-custom-process",
	stopProcess: "pty-stop-process",
	customCommands: "pty-custom-commands",
	write: "pty-write",
	clear: "pty-clear",
	resize: "pty-resize",
	onData: "pty-on-data",
	onTitle: "pty-on-title",
	onExit: "pty-on-exit-code",
	onProgress: "pty-on-progress"
};
//#endregion
//#region src/renderer/shared/ipc/pty.ts
var ptyIpc = {
	process: (id, cardId) => lynxIpc.send(ptyChannels.process, id, cardId),
	customProcess: (id, dir, file) => lynxIpc.send(ptyChannels.customProcess, id, dir, file),
	emptyProcess: (id, dir) => lynxIpc.send(ptyChannels.emptyProcess, id, dir),
	customCommands: (id, commands, dir) => lynxIpc.send(ptyChannels.customCommands, id, commands, dir),
	stop: (id) => lynxIpc.send(ptyChannels.stopProcess, id),
	write: (id, data) => lynxIpc.send(ptyChannels.write, id, data),
	clear: (id) => lynxIpc.send(ptyChannels.clear, id),
	resize: (id, cols, rows) => lynxIpc.send(ptyChannels.resize, id, cols, rows),
	onData: (result) => lynxIpc.on(ptyChannels.onData, result),
	onTitle: (result) => lynxIpc.on(ptyChannels.onTitle, result),
	onExit: (result) => lynxIpc.on(ptyChannels.onExit, result)
};
//#endregion
//#region src/renderer/mainWindow/redux/reducers/cards.ts
var { useSelector } = await importShared("react-redux");
var buildRunningCardBase = (tabId, id) => ({
	tabId,
	id,
	webUIAddress: "",
	customAddress: "",
	currentAddress: "",
	browserTitle: "Browser",
	startTime: (/* @__PURE__ */ new Date()).toString()
});
var cardsSlice = createSlice({
	initialState: {
		autoUpdate: [],
		installedCards: [],
		pinnedCards: [],
		updateAvailable: [],
		updatingCards: [],
		runningCard: [],
		recentlyUsedCards: [],
		homeCategory: [],
		autoUpdateExtensions: [],
		updatingExtensions: void 0,
		duplicates: [],
		checkUpdateInterval: 0,
		activeTab: "",
		browserDomReadyIds: [],
		updateChecking: ""
	},
	name: "cards",
	reducers: {
		addUpdateAvailable: (state, action) => {
			if (!state.updateAvailable.includes(action.payload)) state.updateAvailable.push(action.payload);
		},
		setUpdateAvailable: (state, action) => {
			state.updateAvailable = action.payload;
		},
		setUpdateChecking: (state, action) => {
			state.updateChecking = action.payload;
		},
		removeUpdateAvailable: (state, action) => {
			state.updateAvailable = state.updateAvailable.filter((card) => card !== action.payload);
		},
		setUpdatingExtensions: (state, action) => {
			state.updatingExtensions = action.payload;
		},
		setUpdateInterval: (state, action) => {
			state.checkUpdateInterval = action.payload;
		},
		addUpdatingCard: (state, action) => {
			if (!state.updatingCards.some((card) => card.id === action.payload.id)) state.updatingCards.push(action.payload);
		},
		removeUpdatingCard: (state, action) => {
			const cardId = action.payload;
			state.updatingCards = state.updatingCards.filter((card) => card.id !== cardId);
		},
		setAutoUpdate: (state, action) => {
			state.autoUpdate = action.payload;
		},
		setAutoUpdateExtensions: (state, action) => {
			state.autoUpdateExtensions = action.payload;
		},
		setInstalledCards: (state, action) => {
			state.installedCards = action.payload;
		},
		setPinnedCards: (state, action) => {
			state.pinnedCards = action.payload;
		},
		setHomeCategory: (state, action) => {
			state.homeCategory = action.payload;
		},
		setRecentlyUsedCards: (state, action) => {
			state.recentlyUsedCards = action.payload;
		},
		setDuplicates: (state, action) => {
			state.duplicates = action.payload;
		},
		addDomReady: (state, action) => {
			if (!state.browserDomReadyIds.includes(action.payload)) state.browserDomReadyIds.push(action.payload);
		},
		addRunningEmpty: (state, action) => {
			const { tabId, type } = action.payload;
			const id = `${tabId}_${type}`;
			const currentView = type === "browser" ? "browser" : "terminal";
			state.runningCard.push({
				...buildRunningCardBase(tabId, id),
				type,
				currentView,
				isEmptyRunning: true
			});
			if (type !== "terminal") browserIpc.send.createBrowser(id);
			if (type !== "browser") ptyIpc.emptyProcess(id);
		},
		addRunningCard: (state, action) => {
			const { tabId, id } = action.payload;
			state.runningCard.push({
				...buildRunningCardBase(tabId, id),
				type: "both",
				currentView: "terminal",
				isEmptyRunning: false
			});
			browserIpc.send.createBrowser(id);
		},
		setRunningCardAddress: (state, action) => {
			const { tabId, address } = action.payload;
			state.runningCard = state.runningCard.map((card) => card.tabId === tabId ? {
				...card,
				webUIAddress: address
			} : card);
		},
		setRunningCardCustomAddress: (state, action) => {
			const { tabId, address } = action.payload;
			state.runningCard = state.runningCard.map((card) => card.tabId === tabId ? {
				...card,
				customAddress: address
			} : card);
		},
		setRunningCardCurrentAddress: (state, action) => {
			const { tabId, address } = action.payload;
			state.runningCard = state.runningCard.map((card) => card.tabId === tabId ? {
				...card,
				currentAddress: address
			} : card);
		},
		setRunningCardView: (state, action) => {
			const { tabId, view } = action.payload;
			state.runningCard = state.runningCard.map((card) => card.tabId === tabId ? {
				...card,
				currentView: view
			} : card);
		},
		setRunningCardBrowserTitle: (state, action) => {
			const { tabId, title } = action.payload;
			state.runningCard = state.runningCard.map((card) => card.tabId === tabId ? {
				...card,
				browserTitle: title
			} : card);
		},
		toggleRunningCardView: (state, action) => {
			if (!state.runningCard) return;
			const { tabId } = action.payload;
			state.runningCard = state.runningCard.map((card) => {
				const currentView = card.currentView === "browser" ? "terminal" : "browser";
				return card.tabId === tabId ? {
					...card,
					currentView
				} : card;
			});
		},
		stopRunningCard: (state, action) => {
			const id = state.runningCard.find((card) => card.tabId === action.payload.tabId)?.id;
			if (id) {
				browserIpc.send.removeBrowser(id);
				state.browserDomReadyIds = state.browserDomReadyIds.filter((item) => item !== id);
			}
			state.runningCard = state.runningCard.filter((card) => card.tabId !== action.payload.tabId);
		}
	}
});
/**
* Hook to access a single cards state field with key-safe typing.
*/
var useCardsState = (name) => useSelector((state) => state.cards[name]);
cardsSlice.actions;
cardsSlice.reducer;
//#endregion
//#region src/renderer/mainWindow/utils/hooks.tsx
var { Fragment, useEffect: useEffect$1, useRef: useRef$1, useState } = await importShared("react");
/**
* Hook to check if a card is pinned.
* @param cardId - The ID of the card to check
* @returns Boolean indicating if the card is pinned
*/
function useIsPinnedCard(cardId) {
	return useCardsState("pinnedCards").includes(cardId);
}
window.isPortable;
//#endregion
//#region src/common/utils/strings.ts
function getFallbackString(value) {
	return value.replace(/[^a-zA-Z0-9\s]/g, "").split(" ").map((item) => item.slice(0, 1).toUpperCase()).join("");
}
//#endregion
//#region src/common/consts/ipcChannels/storage.ts
/**
* IPC channels for storage utility operations.
* Handles card management, auto-updates, pinned items, and history.
*/
var storageUtilsChannels = {
	setSystemStartup: "storageUtils:setSystemStartup",
	addInstalledCard: "storageUtils:add-installed-card",
	removeInstalledCard: "storageUtils:remove-installed-card",
	onInstalledCards: "storageUtils:on-installed-cards",
	addAutoUpdateCard: "storageUtils:add-autoUpdate-card",
	removeAutoUpdateCard: "storageUtils:remove-autoUpdate-card",
	addAutoUpdateExtensions: "storageUtils:add-autoUpdate-extensions",
	removeAutoUpdateExtensions: "storageUtils:remove-autoUpdate-extensions",
	onAutoUpdateCards: "storageUtils:on-autoUpdate-cards",
	onAutoUpdateExtensions: "storageUtils:on-autoUpdate-extensions",
	onPinnedCardsChange: "storageUtils:on-pinned-cards",
	pinnedCards: "storageUtils:pinned-cards",
	recentlyUsedCards: "storageUtils:recently-used-cards",
	onRecentlyUsedCardsChange: "storageUtils:on-recently-used-cards",
	homeCategory: "storageUtils:home-category",
	onHomeCategory: "storageUtils:on-home-category",
	preCommands: "storageUtils:pre-commands",
	onPreCommands: "storageUtils:on-pre-commands",
	customRun: "storageUtils:custom-run",
	onCustomRun: "storageUtils:on-custom-run",
	customRunBehavior: "storageUtils:custom-run-behavior",
	preOpen: "storageUtils:pre-open",
	getCardArguments: "storageUtils:get-card-arguments",
	setCardArguments: "storageUtils:set-card-arguments",
	addBrowserRecent: "storageUtils:add-browser-recent",
	addBrowserFavorite: "storageUtils:add-browser-favorite",
	addBrowserHistory: "storageUtils:add-browser-history",
	addBrowserRecentFavIcon: "storageUtils:add-browser-recent-favicon",
	removeBrowserRecent: "storageUtils:remove-browser-recent",
	removeBrowserFavorite: "storageUtils:remove-browser-favorite",
	removeBrowserHistory: "storageUtils:remove-browser-favorite",
	setShowConfirm: "storage:set-show-confirm",
	onConfirmChange: "storage:on-confirm-change",
	addReadNotif: "storageUtils:add-read-notif",
	setCardTerminalPreCommands: "storageUtils:card-terminal-preCommands",
	unassignCard: "storageUtils:unassign-card",
	getBrowserHistoryData: "storageUtils:getBrowserHistoryData"
};
//#endregion
//#region src/renderer/shared/ipc/storage.ts
var storageUtilsIpc = {
	send: {
		addInstalledCard: (cardData) => lynxIpc.send(storageUtilsChannels.addInstalledCard, cardData),
		removeInstalledCard: (cardId) => lynxIpc.send(storageUtilsChannels.removeInstalledCard, cardId),
		addAutoUpdateCard: (cardId) => lynxIpc.send(storageUtilsChannels.addAutoUpdateCard, cardId),
		removeAutoUpdateCard: (cardId) => lynxIpc.send(storageUtilsChannels.removeAutoUpdateCard, cardId),
		addAutoUpdateExtensions: (cardId) => lynxIpc.send(storageUtilsChannels.addAutoUpdateExtensions, cardId),
		removeAutoUpdateExtensions: (cardId) => lynxIpc.send(storageUtilsChannels.removeAutoUpdateExtensions, cardId),
		updateCustomRunBehavior: (data) => lynxIpc.send(storageUtilsChannels.customRunBehavior, data),
		setSystemStartup: (startup) => lynxIpc.send(storageUtilsChannels.setSystemStartup, startup),
		addBrowserRecent: (recentEntry) => lynxIpc.send(storageUtilsChannels.addBrowserRecent, recentEntry),
		addBrowserFavorite: (favoriteEntry) => lynxIpc.send(storageUtilsChannels.addBrowserFavorite, favoriteEntry),
		addBrowserHistory: (historyEntry) => lynxIpc.send(storageUtilsChannels.addBrowserHistory, historyEntry),
		addBrowserRecentFavIcon: (url, favIcon, title) => lynxIpc.send(storageUtilsChannels.addBrowserRecentFavIcon, url, favIcon, title),
		removeBrowserRecent: (url) => lynxIpc.send(storageUtilsChannels.removeBrowserRecent, url),
		removeBrowserFavorite: (url) => lynxIpc.send(storageUtilsChannels.removeBrowserFavorite, url),
		removeBrowserHistory: (url) => lynxIpc.send(storageUtilsChannels.removeBrowserHistory, url),
		setShowConfirm: (type, enable) => lynxIpc.send(storageUtilsChannels.setShowConfirm, type, enable),
		addReadNotif: (id) => lynxIpc.send(storageUtilsChannels.addReadNotif, id),
		setCardTerminalPreCommands: (id, commands) => lynxIpc.send(storageUtilsChannels.setCardTerminalPreCommands, id, commands)
	},
	invoke: {
		pinnedCards: (opt, id, pinnedCards) => lynxIpc.invoke(storageUtilsChannels.pinnedCards, opt, id, pinnedCards),
		preCommands: (opt, data) => lynxIpc.invoke(storageUtilsChannels.preCommands, opt, data),
		customRun: (opt, data) => lynxIpc.invoke(storageUtilsChannels.customRun, opt, data),
		preOpen: (opt, open) => lynxIpc.invoke(storageUtilsChannels.preOpen, opt, open),
		getCardArguments: (cardId) => lynxIpc.invoke(storageUtilsChannels.getCardArguments, cardId),
		setCardArguments: (cardId, args) => lynxIpc.invoke(storageUtilsChannels.setCardArguments, cardId, args),
		recentlyUsedCards: (opt, id) => lynxIpc.invoke(storageUtilsChannels.recentlyUsedCards, opt, id),
		homeCategory: (opt, data) => lynxIpc.invoke(storageUtilsChannels.homeCategory, opt, data),
		unassignCard: (id, clearConfigs) => lynxIpc.invoke(storageUtilsChannels.unassignCard, id, clearConfigs),
		getBrowserHistoryData: () => lynxIpc.invoke(storageUtilsChannels.getBrowserHistoryData)
	},
	on: {
		onInstalledCards: (result) => lynxIpc.on(storageUtilsChannels.onInstalledCards, result),
		onAutoUpdateCards: (result) => lynxIpc.on(storageUtilsChannels.onAutoUpdateCards, result),
		onAutoUpdateExtensions: (result) => lynxIpc.on(storageUtilsChannels.onAutoUpdateExtensions, result),
		onPinnedCardsChange: (result) => lynxIpc.on(storageUtilsChannels.onPinnedCardsChange, result),
		onPreCommands: (result) => lynxIpc.on(storageUtilsChannels.onPreCommands, result),
		onCustomRun: (result) => lynxIpc.on(storageUtilsChannels.onCustomRun, result),
		onRecentlyUsedCardsChange: (result) => lynxIpc.on(storageUtilsChannels.onRecentlyUsedCardsChange, result),
		onHomeCategory: (result) => lynxIpc.on(storageUtilsChannels.onHomeCategory, result),
		onConfirmChange: (result) => lynxIpc.on(storageUtilsChannels.onConfirmChange, result)
	}
};
//#endregion
//#region src/common/consts/ipcChannels/actions.ts
/**
* IPC channels for collecting and transmitting user actions.
*/
var actionChannels = { logAction: "actions:logAction" };
//#endregion
//#region src/renderer/shared/ipc/actions.ts
var actionsIpc = { logAction: (payload) => lynxIpc.send(actionChannels.logAction, payload) };
//#endregion
//#region src/renderer/shared/sentry/Breadcrumbs.tsx
var { useEffect, useRef } = await importShared("react");
var isEnabled = true;
/**
* Adds an informational renderer breadcrumb when breadcrumb collection is enabled.
*/
function AddBreadcrumb_Renderer(message) {
	if (isEnabled) actionsIpc.logAction({
		category: "renderer-actions",
		message,
		level: "info"
	});
}
//#endregion
//#region node_modules/@solar-icons/react-perf/dist/icons/ui/Bold/Pin.mjs
var { forwardRef: t } = await importShared("react");
var r = t((t, r) => (0, import_jsx_runtime.jsx)(r$25, {
	ref: r,
	...t,
	children: (0, import_jsx_runtime.jsx)(`path`, {
		d: `M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z`,
		fill: `currentColor`
	})
}));
r.displayName = `Pin`;
//#endregion
//#region src/renderer/mainWindow/components/ToolsCard.tsx
var { Avatar, Button, Card, Description, Label } = await importShared("@heroui/react");
/**
* A card component for the Tools page, featuring a spotlight effect and hover animations.
*/
function ToolsCard({ id, title, description, icon, onPress, footer, avatarClassName }) {
	const isPinned = useIsPinnedCard(id || "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "w-75 h-46 relative group transform border border-surface  hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer",
		onClick: () => {
			AddBreadcrumb_Renderer(`Card Interaction: Clicked ToolsCard "${title}"`);
			if (id) storageUtilsIpc.invoke.recentlyUsedCards("update", id);
			onPress?.();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-2",
				children: [typeof icon === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
					className: `size-12 shrink-0 ring-LynxPurple ring-2 ${avatarClassName}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar.Image, {
						src: icon,
						alt: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar.Fallback, { children: getFallbackString(title) })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `size-12 rounded-full ring-2 ring-LynxPurple flex items-center justify-center  ${avatarClassName}`,
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col pointer-events-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: title })
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
				className: "line-clamp-3 text-xs",
				children: description
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Footer, {
				className: "justify-between flex items-center",
				children: [id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					onClick: (e) => e.stopPropagation(),
					className: "flex items-center gap-x-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "shrink-0 -translate-x-2 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100",
						onPress: () => {
							AddBreadcrumb_Renderer(`Pin ToolsCard: id:${id} , ${isPinned ? "remove" : "add"}`);
							storageUtilsIpc.invoke.pinnedCards(isPinned ? "remove" : "add", id);
						},
						size: "sm",
						variant: "ghost",
						isIconOnly: true,
						children: isPinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i$3, { className: "size-3" })
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}), footer]
			})
		]
	});
}
//#endregion
//#region extension/src/renderer/ToolsPage.tsx
function SkillsToolkitCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolsCard, {
		id: "skills-toolkit",
		onPress: () => {
			window.dispatchEvent(new CustomEvent("open-skills-manager"));
		},
		title: "Skills Manager",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-6 text-emerald-400" }),
		description: "Discover, install, update, and manage agent skills from the Vercel Labs registry."
	});
}
//#endregion
//#region extension/src/renderer/Extension.tsx
function InitialExtensions(lynxAPI) {
	lynxAPI.addModal(SkillsManagerModal);
	lynxAPI.cards.registerToolsCard?.({
		id: "skills-toolkit",
		title: "Skills Manager",
		description: "Discover, install, update, and manage agent skills from the Vercel Labs registry.",
		component: SkillsToolkitCard,
		where: "tools_page"
	});
	if (!lynxAPI.cards.registerToolsCard) lynxAPI.customizePages.tools.add.cardsContainer(SkillsToolkitCard);
}
//#endregion
export { InitialExtensions as t };
