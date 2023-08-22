// cat image class

export default class CatImg {
    constructor(id, url, width, height, score, comments) {
        this.id = id;
        this.url = url;
        this.width = width;
        this.height = height;
        this.score = 0;
        this.comments = [];
    }

    upvote() {
        this.score ++;
    }

    downvote() {
        this.score --;
    }

    addComment(comment) {
        this.comments.push(comment);
    }

}

