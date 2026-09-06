// Подбор по задаче: данные квиза и рекомендация товара из реального каталога.
// Зависит только от data/products.json — чистые функции, без UI.
import products from "../data/products.json";

export const TASKS = [
  {
    key: "immunity",
    label: "Иммунитет",
    hint: "сезон простуд, защитные силы",
    ids: ["fitosbor-krepkij-immunitet", "nabor-krepkij-immunitet"],
  },
  {
    key: "gut",
    label: "ЖКТ",
    hint: "пищеварение, комфорт после еды",
    ids: ["fitosbor-dlya-kishechnika", "seriya-02", "fitokompleks-zdorovoe-pishhevarenie"],
  },
  {
    key: "sleep",
    label: "Сон и нервы",
    hint: "засыпание, напряжение",
    ids: ["fitosbor-antistress", "seriya-51", "nabor-antistress"],
  },
  {
    key: "skin",
    label: "Кожа",
    hint: "чистота кожи, высыпания",
    ids: ["nabor-chistaya-kozha", "kollagen-s-vitaminom-s-160-g-2"],
  },
];

export const FORMAT_OPTIONS = [
  { key: "сбор", label: "Фитосбор", hint: "ложка трав на чашку кипятка" },
  { key: "капсулы", label: "Капсулы", hint: "брать с собой, без заваривания" },
  { key: "порошок", label: "Порошок", hint: "растворить в воде или добавить в еду" },
  { key: "набор", label: "Набор", hint: "готовый курс по системе врача" },
];

export const TASK_LABELS = Object.fromEntries(TASKS.map((t) => [t.key, t.label]));
export const FORMAT_LABELS = Object.fromEntries(FORMAT_OPTIONS.map((f) => [f.key, f.label]));

export function recommendProduct(taskKey, formatKey) {
  const task = TASKS.find((t) => t.key === taskKey);
  const list = (task ? task.ids : [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);
  if (list.length === 0) return products.find((p) => (p.badges || []).includes("hit")) || products[0] || null;
  const exact = formatKey ? list.find((p) => p.formatKey === formatKey) : null;
  return exact || list[0];
}
