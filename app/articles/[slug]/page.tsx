import Link from "next/link";

const articles = [
    {
        slug: "eating-well-every-day",
        title: "Eating Well Every Day",
        category: "Nutrition",
        description: "Simple ways to build healthier eating habits.",
        content: "Eating a balanced diet helps support your overall health. Include a variety of fruits, vegetables, whole grains, and protein sources in your meals.",
    },
    {
        slug: "understanding-mental-health",
        title: "Understanding Mental Health",
        category: "Mental Health",
        description: "Learn why mental well-being matters.",
        content: "Mental health is an important part of overall well-being. Sleep, social support, stress management, and professional care when needed can all play a role.",
    },
    {
        slug: "benefits-of-regular-exercise",
        title: "The Benefits of Regular Exercise",
        category: "Fitness",
        description: "Discover how movement supports your health.",
        content: "Regular physical activity can support cardiovascular health, strength, mood, and sleep. Choose activities that suit your abilities and build up gradually.",
    },
];


export default async function ArticlePage({ params, }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = articles.find((item) => item.slug === slug);

    if (!article) {
        return (
            <main className="mx-auto max-w-3xl px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-800">Article not found</h1>
                <Link href="/" className="mt-6 inline-block text-green-700 underline">Return Home</Link>
            </main>

        );
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-16">
            <p className="mb-3 font-medium text-green-700">{article.category}</p>
            <h1 className="mb-4 text-3xl font-bold text-gray-300 sm:text-4xl">{article.title}</h1>
            <p className="mb-8 text-lg text-gray-100">{article.description}</p>
            <div className="leading-8 text-gray-200">{article.content}</div>

            <Link href="/" className="mt-10 inline-block text-green-200 underline"> ← Back to HealthHub</Link>
        </main>
    )
}
