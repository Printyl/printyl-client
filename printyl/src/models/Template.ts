export type TemplateField = {
    type: 'string';
    length: number;
    multiline: boolean;
};

export interface Template {
    id: string;
    name: string;
    description: string;
    fields?: Record<string, TemplateField>;
}
