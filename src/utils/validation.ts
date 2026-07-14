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

  const today = new Date().toISOString().split("T")[0];

  if (deadline && deadline < today) {
    errors.push("締切は今日以降の日付を入力してください。");
  }

  return errors;
}