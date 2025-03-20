import { Tag } from '../tags/tags.model';

export interface Quote {
    quoteId: number,
    userId: number,
    authorId: number,
    authorFirst: string,
    authorLast: string,
    text: string,
    comments: string,
    dateAdded: Date, 
    tags: Tag[]
}