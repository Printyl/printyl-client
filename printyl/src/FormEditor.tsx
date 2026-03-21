import { useMemo, useState, type FormEvent } from 'react';
import { type Template } from './models/Template';
import './FormEditor.css';

type FormEditorProps = {
    template: Template;
};

export default function FormEditor({ template }: FormEditorProps) {
    const fields = useMemo(() => template.fields ?? [], [template.fields]);
    const [values, setValues] = useState<Record<string, string>>({});

    const setFieldValue = (fieldId: string, value: string) => {
        setValues((previous) => ({
            ...previous,
            [fieldId]: value
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <main className="form-editor">
            <section className="form-editor__hero">
                <p className="form-editor__eyebrow">Template Editor</p>
                <h1 className="form-editor__title">{template.name}</h1>
                <p className="form-editor__description">{template.description}</p>
            </section>

            <form className="form-editor__form" onSubmit={handleSubmit}>
                <div className="form-editor__fields">
                    {fields.map((field, index) => {
                        const fieldId = `field-${index}`;
                        const maxLength: number | undefined = field.length === -1 ? undefined : field.length;
                        const value = values[fieldId] ?? '';
                        const showCounter = typeof maxLength === 'number';

                        return (
                            <article
                                key={fieldId}
                                className={`form-editor__field-card${field.multiline ? ' form-editor__field-card--full' : ''}`}
                            >
                                <label className="form-editor__label" htmlFor={fieldId}>
                                    {field.name}
                                </label>
                                <p className="form-editor__hint">{field.description}</p>

                                {field.multiline ? (
                                    <textarea
                                        id={fieldId}
                                        className="form-editor__input form-editor__input--multiline"
                                        value={value}
                                        maxLength={maxLength}
                                        onChange={(event) => setFieldValue(fieldId, event.target.value)}
                                    />
                                ) : (
                                    <input
                                        id={fieldId}
                                        className="form-editor__input"
                                        type="text"
                                        value={value}
                                        maxLength={maxLength}
                                        onChange={(event) => setFieldValue(fieldId, event.target.value)}
                                    />
                                )}

                                {showCounter && (
                                    <p className="form-editor__counter">
                                        {value.length}/{maxLength}
                                    </p>
                                )}
                            </article>
                        );
                    })}
                </div>

                <div className="form-editor__actions">
                    <button type="submit" className="form-editor__submit">Submit</button>
                </div>
            </form>
        </main>
    );
}
