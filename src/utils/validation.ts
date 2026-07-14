// タスク入力内容をチェックし、エラーメッセージを返す
export function validateTask(
  title: string,
  description: string,
  category: string,
  deadline: string
): string[] {
  // エラーメッセージを格納
  const errors: string[] = [];

  // タイトルの入力チェック
  if (!title.trim()) {
    errors.push("タイトルを入力してください。");
  }

  // 説明の入力チェック
  if (!description.trim()) {
    errors.push("説明を入力してください。");
  }

  // カテゴリの選択チェック
  if (!category) {
    errors.push("カテゴリを選択してください。");
  }

  // 締切日の入力チェック
  if (!deadline) {
    errors.push("期限を入力してください。");
  }

  // 今日の日付を取得（YYYY-MM-DD形式）
  const today = new Date().toISOString().split("T")[0];

  // 締切日が今日より前の場合はエラー
  if (deadline && deadline < today) {
    errors.push("締切は今日以降の日付を入力してください。");
  }

  // エラー一覧を返す
  return errors;
}