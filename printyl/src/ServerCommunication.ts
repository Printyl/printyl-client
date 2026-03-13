const documentsPath = 'documents'

export function getTemplates(currentUrl: string, port: number) {
    return fetch(`${currentUrl}:${port}/${documentsPath}`)
}
