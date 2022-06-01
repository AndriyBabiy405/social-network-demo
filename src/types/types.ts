export type PostType = {
    id: number,
    message: string, 
    likesCount: number
}

export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string, 
    mainlink: string
}

export type PhotosType = {
    small: string | null,
    large: string | null
}

export type ProfileType = {
    id: number,
    message: string, 
    likesCount: number,
    contacts: ContactsType,
    photos: PhotosType
}

export type UserType = {
    id: number,
    name: string, 
    status: string,
    photos: PhotosType
} 

export type MessageType = {
    id: number,
    message: string
}

export type DialogsType = {
    id: number, 
    name: string
}

