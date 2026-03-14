import { useMemo, useState } from 'react';
import { type Template } from './models/Template';

type FormEditorProps = {
    template: Template;
};

export default function FormEditor({ template }: FormEditorProps) {
    const fields = useMemo(() => Object.entries(template.fields ?? {}), [template.fields]);
    const [values, setValues] = useState<Record<string, string>>({});

    const setFieldValue = (fieldId: string, value: string) => {
        setValues((previous) => ({
            ...previous,
            [fieldId]: value
        }));
    };

    return (
        <main>
            <h1>{template.name}</h1>
            <p>{template.description}</p>
            <form>
                {fields.map(([fieldId, field]) => {
                    const maxLength = field.length === -1 ? undefined : field.length;
                    const value = values[fieldId] ?? '';

                    return (
                        <div key={fieldId}>
                            <label htmlFor={fieldId}>{fieldId}</label>
                            {field.multiline ? (
                                <textarea
                                    id={fieldId}
                                    value={value}
                                    maxLength={maxLength}
                                    onChange={(event) => setFieldValue(fieldId, event.target.value)}
                                />
                            ) : (
                                <input
                                    id={fieldId}
                                    type="text"
                                    value={value}
                                    maxLength={maxLength}
                                    onChange={(event) => setFieldValue(fieldId, event.target.value)}
                                />
                            )}
                        </div>
                    );
                })}
            </form>
        </main>
    );
}
