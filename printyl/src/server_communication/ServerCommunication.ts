import {type Template, type TemplateField } from '../models/Template';

const documentsPath = 'documents'

export async function getTemplates(currentUrl: string, port: number): Promise<Template[]> {
    const headers = new Headers();
    headers.append('Origin', 'http://localhost:5173');
    headers.append('Content-Type', 'application/json');
    const request = new Request(`${currentUrl}:${port}/api/v1/${documentsPath}`, {
        method: 'GET',
        mode: 'cors',
        headers: headers
        }
    );
    const response = await fetch(request)
    return response.json()
}

interface Fields {
    [key: string]: TemplateField;
}

interface JsonResponse {
    fields: Fields;
}

export async function getTemplateForm(id: string, currentUrl: string, port: number) : Promise<TemplateField[]> {
    const request = new Request(`${currentUrl}:${port}/api/v1/${documentsPath}/${id}/form`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Origin': 'http://localhost:5173',
            'Content-Type': 'application/json'
        }
    });
    const response = await fetch(request);
    const json: JsonResponse = await response.json();
    const fields: TemplateField[] = Object.values(json.fields).map((field : TemplateField) => ({
        name: field.name,
        description: field.description,
        length: field.length,
        multiline: field.multiline,
        type: field.type
    }));
    return fields;
}
