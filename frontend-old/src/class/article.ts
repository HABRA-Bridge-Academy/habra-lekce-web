export default class Article{
    constructor(
        public id: string,
        public title: string,
        public content: any,
        public Public: boolean,
        public created: string,
        public meta: any
    ){}
}