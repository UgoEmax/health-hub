import Navbar from "@/components/Navbar";
import HealthArticles from "@/components/HealthArticles";
import NewsletterForm from "@/components/NewsletterForm";

export default function Page() {
  return (
    <div className="bg-blue-50 px-4">
      <Navbar />

      <main>
        <section className="min-h-[50vh] flex flex-col items-center justify-center gap-4 py-16">


          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-700 text-center leading-tight">Health Knowledge in Your Hands</h1>

          <p className="max-w-2xl sm:text-lg text-base leading-relaxed text-gray-600 text-center">
            Know more about your health with simple, reliable health information.
          </p>
        </section>

        <HealthArticles />
        <NewsletterForm />
      </main>

    </div>
  )
}
