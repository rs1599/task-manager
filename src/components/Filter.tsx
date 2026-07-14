type Props = {
    // ステータス絞り込み
    filter: "all" | "active" | "completed";
    setFilter: React.Dispatch<
        React.SetStateAction<"all" | "active" | "completed">
    >;

    // 検索キーワード
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;

    // カテゴリ絞り込み
    categoryFilter: string;
    setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;

    // 並び替え
    sortOrder: "newest" | "oldest" | "deadline" | "title";
    setSortOrder: React.Dispatch<
        React.SetStateAction<
            "newest" | "oldest" | "deadline" | "title"
        >
    >;
};

function Filter({
    filter,
    setFilter,
    searchText,
    setSearchText,
    categoryFilter,
    setCategoryFilter,
    sortOrder,
    setSortOrder,
}: Props) {
    return (
        <>
            {/* タイトル・説明の検索 */}
            <div>
                <label htmlFor="search">検索</label>
                <input
                    id="search"
                    type="text"
                    placeholder="タイトル・説明で検索"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            {/* ステータスで絞り込み */}
            <div>
                <label htmlFor="statusFilter">
                    ステータス
                </label>

                <select
                    id="statusFilter"
                    value={filter}
                    onChange={(e) =>
                        setFilter(
                            e.target.value as
                            | "all"
                            | "active"
                            | "completed"
                        )
                    }
                >
                    <option value="all">すべて</option>
                    <option value="active">未完了</option>
                    <option value="completed">完了</option>
                </select>
            </div>

            {/* カテゴリで絞り込み */}
            <div>
                <label htmlFor="categoryFilter">カテゴリ</label>

                <select
                    id="categoryFilter"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">すべて</option>
                    <option value="学習">学習</option>
                    <option value="仕事">仕事</option>
                    <option value="プライベート">プライベート</option>
                    <option value="買い物">買い物</option>
                    <option value="その他">その他</option>
                </select>
            </div>

            {/* タスクの並び替え */}
            <div>
                <label htmlFor="sortOrder">並び替え</label>

                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) =>
                        setSortOrder(
                            e.target.value as
                            | "newest"
                            | "oldest"
                            | "deadline"
                            | "title"
                        )
                    }
                >
                    <option value="newest">新しい順</option>
                    <option value="oldest">古い順</option>
                    <option value="deadline">期限が近い順</option>
                    <option value="title">タイトル順</option>
                </select>
            </div>
        </>
    );
}

export default Filter;