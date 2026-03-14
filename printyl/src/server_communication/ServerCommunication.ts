import {type Template} from '../models/Template';

const documentsPath = 'documents'

export function getTemplates(currentUrl: string, port: number): Template[] {
    console.log(`Fetching templates from ${currentUrl}:${port}/${documentsPath}`)
    return []
    // return fetch(`${currentUrl}:${port}/${documentsPath}`)
}

export function getTemplateForm(id: string, currentUrl: string, port: number) {
    return fetch(`${currentUrl}:${port}/${documentsPath}/${id}/form`)
}
