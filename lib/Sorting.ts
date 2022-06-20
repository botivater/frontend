import { GuildChannel } from "./api/types/GuildChannel";

export class Sorting {
    public static sortGuildChannelsByNameAsc(a: GuildChannel, b: GuildChannel) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    }

    public static sortGuildChannelsByNameDesc(a: GuildChannel, b: GuildChannel) {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
    }
}