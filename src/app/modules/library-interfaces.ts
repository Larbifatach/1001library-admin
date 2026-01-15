// Library:: Api Reponses
export interface LibraryRespo {
  data: any;
  status: any;
}

// Library:: Accounts
export interface Uploader {
    id: number,
    full_name: string,
    email: string,
    phone: string,
    password: string,
    is_active: boolean,
    much: number,
}
export interface Moderator {
    id: number,
    full_name: string,
    email: string,
    phone: string,
    password: string,
    is_active: boolean,
    salary: number,
}

// Library:: Elements
export interface Category {
    id: number,
    // 
    name_en: string,
    name_fr: string,
    name_ar: string,
}
export interface SubCategory {
    id: number,
    // 
    name_en: string,
    name_fr: string,
    name_ar: string,
    //
    id_category: number | null,
}
export interface Year {
    id: number,
    // 
    name: string,
}
export interface Publisher {
    id: number,
    name: string,
}
export interface Lang {
    id: number,
    // 
    name_en: string,
    name_fr: string,
    name_ar: string,
    code: string,
}
export interface Seriess {
    id: number,
    // 
    name_en: string,
    name_fr: string,
    name_ar: string,
}

// Library:: Content
export interface Book {
    id: number,
    name_en: string,
    description_en: string,
    cover_url: string,
    //
    isbn_10: string,
    isbn_13: string,
    //
    id_year: number | null,
    id_publisher: number | null,
    id_lang: number | null,
    id_series: number | null,
    //
    sub_categories: any,
    authors: any,
    //
    volume: string,
    pages: string,
    edition: string,
    //
    is_active: boolean,
}
export interface Author {
    id: number,
    // 
    name_en: string,
    // 
    description_en: string,
    avatar_url: string,
}

// Library:: Download Links
export interface Downlink {
    id: number,
    // 
    size: string,
    unit: string,
    extension: string,
    download_url: string,
    //
    id_book: number | null,
    id_uploader: number | null,
}