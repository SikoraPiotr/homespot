import { Button } from "@/components/atoms/Button/Button";

type AdminStringListProps = {
  id: string;
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  multiline?: boolean;
  addLabel?: string;
};

export function AdminStringList({
  id,
  label,
  values,
  onChange,
  multiline = true,
  addLabel = "Dodaj wiersz",
}: AdminStringListProps) {
  function updateAt(index: number, value: string) {
    onChange(values.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function removeAt(index: number) {
    onChange(values.filter((_, itemIndex) => itemIndex !== index));
  }

  function addItem() {
    onChange([...values, ""]);
  }

  return (
    <div className="admin__list-block">
      <h3 className="admin__list-title">{label}</h3>
      <div className="admin__list">
        {values.map((value, index) => (
          <div className="admin__list-item" key={`${id}-${index}`}>
            <div className="field">
              <label className="field__label" htmlFor={`${id}-${index}`}>
                {label} {index + 1}
              </label>
              {multiline ? (
                <textarea
                  className="field__control field__control--area"
                  id={`${id}-${index}`}
                  rows={3}
                  value={value}
                  onChange={(event) => updateAt(index, event.target.value)}
                />
              ) : (
                <input
                  className="field__control"
                  id={`${id}-${index}`}
                  value={value}
                  onChange={(event) => updateAt(index, event.target.value)}
                />
              )}
            </div>
            <Button variant="ghost" onClick={() => removeAt(index)} disabled={values.length <= 1}>
              Usuń
            </Button>
          </div>
        ))}
      </div>
      <Button variant="ghost" onClick={addItem}>
        {addLabel}
      </Button>
    </div>
  );
}
