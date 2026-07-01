// Memory cache for discover data (expires in 5 minutes)
const discoverCache = new Map<string, {data: any; timestamp: number}>();
const CACHE_TTL_MS = 5 * 60 * 1000;

function getCachedDiscoverData(type: string): any | null {
  const cached = discoverCache.get(type);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }
  return null;
}

function setCachedDiscoverData(type: string, data: any) {
  discoverCache.set(type, {data, timestamp: Date.now()});
}

function extractJsonObject(str: string, startKeyword: string): any | null {
  const startIdx = str.indexOf(startKeyword);
  if (startIdx === -1) return null;

  let braceCount = 0;
  let inString = false;
  let escape = false;

  for (let i = startIdx; i < str.length; i++) {
    const char = str[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === '{') braceCount++;
      else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          const jsonCandidate = str.slice(startIdx, i + 1);
          try {
            return JSON.parse(jsonCandidate);
          } catch (e) {
            // ignore and continue
          }
        }
      }
    }
  }
  return null;
}

function extractLeaderboardSkills(payload: string): any[] | null {
  const startIdx = payload.indexOf('[{"source":');
  if (startIdx === -1) return null;

  const endMarker = '],"totalSkills":';
  let endIdx = payload.indexOf(endMarker, startIdx);
  if (endIdx === -1) {
    const fallbackMarker = '],"view":';
    endIdx = payload.indexOf(fallbackMarker, startIdx);
  }

  if (endIdx === -1) return null;

  const arrayStr = payload.slice(startIdx, endIdx + 1);
  try {
    return JSON.parse(arrayStr);
  } catch (e) {
    return null;
  }
}

export async function fetchAndParseDiscoverPage(type: 'all-time' | 'trending' | 'hot' | 'official'): Promise<any> {
  const cached = getCachedDiscoverData(type);
  if (cached) return cached;

  let url = 'https://skills.sh';
  if (type === 'trending') url = 'https://skills.sh/trending';
  else if (type === 'hot') url = 'https://skills.sh/hot';
  else if (type === 'official') url = 'https://skills.sh/official';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch discover page: ${response.statusText}`);
  }
  const content = await response.text();

  const regex = /self\.__next_f\.push\(\[1,\s*"([\s\S]*?)"\]\)/g;
  let match;
  let fullPayload = '';
  while ((match = regex.exec(content)) !== null) {
    const unescaped = match[1]
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\u0026/g, '&')
      .replace(/\\u003c/g, '<')
      .replace(/\\u003e/g, '>');
    fullPayload += unescaped;
  }

  if (type === 'official') {
    const officialData = extractJsonObject(fullPayload, '{"data":{"owners":');
    if (officialData && officialData.data && officialData.data.owners) {
      setCachedDiscoverData(type, officialData.data.owners);
      return officialData.data.owners;
    }
    const generalData = extractJsonObject(fullPayload, '{"data":');
    if (generalData && generalData.data && generalData.data.owners) {
      setCachedDiscoverData(type, generalData.data.owners);
      return generalData.data.owners;
    }
    return [];
  } else {
    const skills = extractLeaderboardSkills(fullPayload);
    if (skills) {
      const formatted = skills.map((s: any) => ({
        id: `${s.source}/${s.name}`,
        name: s.name,
        installs: s.installs,
        source: s.source,
      }));
      setCachedDiscoverData(type, formatted);
      return formatted;
    }
    return [];
  }
}
