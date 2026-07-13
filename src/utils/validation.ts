export function validateTask(
  title: string,
  description: string,
  category: string,
  deadline: string
): string[] {
  const errors: string[] = [];

  if (!title.trim()) {
    errors.push("タイトルを入力してください。");
  }

  if (!description.trim()) {
    errors.push("説明を入力してください。");
  }

  if (!category) {
    errors.push("カテゴリを選択してください。");
  }

  if (!deadline) {
    errors.push("期限を入力してください。");
  }

  return errors;
}