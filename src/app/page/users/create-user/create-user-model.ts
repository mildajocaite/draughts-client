export interface CreateUserModel {
    email: string,
    firstname: string,
    lastname: string,
    phone: string
    role: string,
    password?: string
    boardCode?: string,
    coach?: string,
}