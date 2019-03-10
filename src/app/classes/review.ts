export const IOS = 'ios';
export const GOOGLE = 'google';
export class Review {
    public date: Date;
    public author: string;
    public title: string;
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
                this.title = null;
                this.text = comments[0].userComment.text;
                this.rating = parseFloat(comments[0].userComment.starRating);
            }
        } else if (type === IOS) {
            this.title = review.title[0];
            this.text = review.content[0]['_'];
            this.rating = parseFloat(review['im:rating'][0]);
            this.author = review.author[0].name[0];
            this.date = new Date(review.updated[0]);
        }
        this.type = type;
    }

    public isAndroid(): boolean { return this.type === GOOGLE}
    public isIOS(): boolean { return this.type === IOS}
}

/**EXAMPLE IOS REVIEW object
   * author: [{…}]
content: (2) [{…}, {…}]
id: ["3353379321"]
im:contentType: [{…}]
im:rating: ["5"]
im:version: ["3.4.0"]
im:voteCount: ["1"]
im:voteSum: ["0"]
link: [{…}]
title: ["New stuff"]
updated: ["2018-10-28T03:38:40-07:00"]
   */
