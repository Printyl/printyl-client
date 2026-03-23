export type TemplateField = {
    name: string;
    description: string;
    length: number;
    multiline: boolean;
    type: string;
    value?: string;
};

export interface Template {
    id: string;
    name: string;
    description: string;
    fields?: TemplateField[];
}
