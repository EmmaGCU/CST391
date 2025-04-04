import {Tag} from './tags.model';

export interface Search {
    keyword: string,
    author: string,
    tags: Tag[],
    comments: {
        with: boolean,
        without: boolean,
        all: boolean
    }
}