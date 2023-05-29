/**
 * SOURCE: https://github.com/sapphiredev/spinel/blob/main/src/lib/types/Mdn.d.ts
 */

export interface MdnAPI {
	documents?: MdnDocument[];
	metadata: MdnMetadata;
	suggestions: unknown[];
}

export interface MdnDocument {
	mdn_url: string;
	score: number;
	title: string;
	locale: string;
	slug: string;
	popularity: number;
	archived: boolean;
	summary: string;
	highlight: MdnHighlight;
}

interface MdnHighlight {
	body: string[];
	title: string[];
}

interface MdnMetadata {
	took_ms: number;
	total: MdnTotal;
	size: number;
	page: number;
}

interface MdnTotal {
	value: number;
	relation: string;
}
