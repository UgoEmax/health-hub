"use client";

import { useState, useEffect } from "react";

type Article = {
    id: number;
    title: string;
    body: string;
    tags: string[];
}

export default function HealthArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const articlesPerPage = 12;

    const fetchArticles = async () => {
        try {
            const skip = (page - 1) * articlesPerPage;

            const res = await fetch(`https://dummyjson.com/posts?limit=${articlesPerPage}&skip=${skip}`);

            if (!res.ok) {
                throw new Error("Failed to load articles");
            }

            const data: { posts: Article[]; total: number } = await res.json();

            setArticles(data.posts);
            setTotal(data.total);
        } catch (err) {
            setError("Could not load articles. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, [page]);

    const totalPages = Math.ceil(total / articlesPerPage);
    const categories = ["All", ...new Set(articles.flatMap((article) => article.tags)),
    ];

    const filteredArticles = articles.filter((article) => {
        const matchesSearch =
            `${article.title} ${article.body} ${article.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase())

        const matchesCategory = selectedCategory === "All" || article.tags.includes(selectedCategory);

        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return <div role="status" aria-live="polite" className="flex min-h-60 items-center justify-center"><p className="animate-pulse text-lg font-medium text-green-700">Loading articles...</p></div>
    }

    if (error) {
        return <div role="alert" className="flex min-h-60 flex-col items-center justify-center gap-3 px-4">
            <p className="text-lg font-semibold text-red-600">{error}</p>

            <button onClick={() => window.location.reload()} className="rounded-lg bg-green-700 px-5 py-2 text-white hover:bg-green-800">Try Again</button>
        </div>
    }

    return (
        <section className="px-4 py-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-green-700">Latest Articles</h2>

            <div className="mx-auto mb-8 flex max-w-xl flex-col gap-4 sm:flex-row">

                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." aria-label="Search articles" className="w-full rounded-xl border border-green-600 bg-white px-4 py-3 text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600" />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Filter by category"
                    className="rounded-xl border border-green-600 bg-white px-4 py-3 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 sm:h-full">
                    {categories.map((category) => (
                        <option key={category} value={category}>{category === "All" ? "All Categories" : category}</option>
                    ))}
                </select>
            </div>

            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">

                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <article key={article.id}
                            className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">

                            <p className="mb-3 text-sm text-green-700">{article.tags.join(", ")}</p>
                            <h3 className="mb-3 text-xl font-bold text-green-800">{article.title}</h3>
                            <p className="leading-relaxed text-green-600">{article.body}</p>

                        </article>


                    ))

                ) : (
                    <div className="col-span-full py-10 text-center text-gray-600">
                        <h3 className="mb-2 text-xl font-semibold text-green-500">No articles found.</h3>

                        <p className="text-green-500">Try another search term or select a different category</p>
                    </div>
                )
                }</div>

            <div className="mt-10 flex items-center justify-center gap-4 text-black/60">
                <button
                    onClick={() => setPage((current) => current - 1)}
                    disabled={page === 1}
                    className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600">Previous</button>

                <span>Page {page} of {totalPages}</span>

                <button
                    onClick={() => setPage((current) => current + 1)}
                    disabled={page === totalPages}
                    className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600">Next</button>
            </div>

        </section>
    )
}
