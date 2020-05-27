export interface User {
    id: number,
    email: string,
    firstname: string,
    lastname: string,
    phone: string
    role: string,
    password?: string
    boardCode?: string,
    boardName?: string,
    coachEmail?: string,
    coach?: User,
}