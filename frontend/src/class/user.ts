

export default class User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public role: string,
        public hasPassword: boolean,
        ) {
        
    }
}