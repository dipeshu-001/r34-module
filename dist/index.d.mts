declare function r34_random({ gay_block }: {
    gay_block: boolean;
}): Promise<any[]>;
declare function r34_search({ search_tag, block_tags }: {
    search_tag?: string | undefined;
    block_tags?: never[] | undefined;
}): Promise<any[] | {
    status: number;
} | undefined>;

export { r34_random, r34_search };