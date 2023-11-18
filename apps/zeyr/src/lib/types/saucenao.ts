export interface SauceResult {
	results: Result[];
}

interface Result {
	url: string;
	site: string;
	index: number;
	similarity: number;
	thumbnail: string;
	authorName?: string;
	authorUrl?: string;
	raw: Raw;
}

interface Raw {
	header: Header;
	data: Data;
}

interface Header {
	similarity: string;
	thumbnail: string;
	index_id: number;
	index_name: string;
	dupes: number;
	hidden: number;
}

interface Data {
	ext_urls: string[];
	path?: string;
	creator?: string;
	creator_name?: string;
	author_name: unknown;
	author_url?: string;
	title?: string;
	drawr_id?: number;
	member_name?: string;
	member_id?: number;
	pixiv_id?: number;
	created_at?: string;
	tweet_id?: string;
	twitter_user_id?: string;
	twitter_user_handle?: string;
}
