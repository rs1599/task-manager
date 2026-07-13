type Props = {
    filter: "all" | "active" | "completed";
    setFilter: React.Dispatch<
        React.SetStateAction<"all" | "active" | "completed">
    >;

    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;

    categoryFilter: string;
    setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;

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
            <div className="filter-buttons">
                <button onClick={() => setFilter("all")}>
                    すべて
                </button>

                <button onClick={() => setFilter("active")} className="filter-button">
                    未完了
                </button>

                <button onClick={() => setFilter("completed")}>
                    完　了
                </button>
            </div>

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