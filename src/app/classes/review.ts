export const IOS = 'ios';
export const GOOGLE = 'google';
export class Review {
    public date: Date;
    public author: string;
    public text: string;
    public rating: number;
    public type: string;

    /**
     * @param review This breaks horrible if the data is not in the expected format
     * @param type Either 'google' or 'ios'
     */
    constructor(review: any, type: string) {
        if (type === GOOGLE) {
            let comments: any[] = review.comments;
            if (comments.length > 0) {
                this.date = new Date(comments[0].userComment.lastModified.seconds * 1000);
                this.author = review.authorName;
                this.text = comments[0].userComment.text;
                this.rating = comments[0].userComment.starRating;
            }
        } else if (type === IOS) {
            this.text = `${review.title[0]}: \n ${review.content[0]['_']}`;
            this.rating = parseInt(review['im:rating'][0]);
            this.author = review.author[0].name[0];
            this.date = new Date(review.updated[0]);
        }
        this.type = type;
    }
}

