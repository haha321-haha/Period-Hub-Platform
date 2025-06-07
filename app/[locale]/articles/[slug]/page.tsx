import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import NSAIDInteractive from '@/components/NSAIDInteractive';
import NSAIDContent from '@/components/NSAIDContent';

// Types
type Locale = 'en' | 'zh';



// Generate metadata for the article
export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string }
}): Promise<Metadata> {
  const article = getArticleBySlug(slug, locale);
  
  if (!article) {
    return {
      title: 'Article Not Found | periodhub.health',
      description: 'The requested article could not be found.',
    };
  }

  const title = locale === 'zh' ? article.title_zh || article.title : article.title;
  const description = locale === 'zh' ? article.seo_description_zh || article.seo_description : article.seo_description;

  return {
    title: `${title} | periodhub.health`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [article.featured_image],
      type: 'article',
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string }
}) {
  unstable_setRequestLocale(locale);

  const article = getArticleBySlug(slug, locale);
  const relatedArticles = getRelatedArticles(slug, locale, 3);

  if (!article) {
    notFound();
  }

  const title = locale === 'zh' ? article.title_zh || article.title : article.title;
  const summary = locale === 'zh' ? article.summary_zh || article.summary : article.summary;
  const category = locale === 'zh' ? article.category_zh || article.category : article.category;
  const readingTime = locale === 'zh' ? article.reading_time_zh || article.reading_time : article.reading_time;

  // Check if this is the NSAID article that needs interactive components
  const isNSAIDArticle = slug === 'nsaid-menstrual-pain-professional-guide';

  console.log('🔍 Article page debug:', {
    slug,
    isNSAIDArticle,
    locale,
    articleTitle: article?.title
  });

  return (
    <>
      {/* Load NSAID interactive components if needed */}
      {isNSAIDArticle && <NSAIDInteractive locale={locale} />}

      <div className="space-y-8">
        {/* Back to Articles */}
        <div className="container-custom">
          <Link
            href={`/${locale}/articles`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {locale === 'zh' ? '返回文章列表' : 'Back to Articles'}
          </Link>
        </div>

      {/* Article Header */}
      <header className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Category and Date */}
          <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-4">
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
              {category}
            </span>
            <time dateTime={article.date}>
              {locale === 'zh' ? '发布于 ' : 'Published on '}{new Date(article.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
            </time>
            {readingTime && (
              <span>• {readingTime}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            {title}
          </h1>

          {/* Summary */}
          <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed">
            {summary}
          </p>

          {/* Author */}
          <div className="flex items-center text-neutral-600 mb-8">
            <span className="text-sm">
              {locale === 'zh' ? '作者：' : 'By '}{article.author}
            </span>
          </div>

          {/* Featured Image Placeholder */}
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg mb-8 bg-primary-100 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-primary-300"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none prose-primary prose-headings:text-neutral-800 prose-p:text-neutral-700 prose-li:text-neutral-700">
            {isNSAIDArticle ? (
              // For NSAID article, use custom client component
              <NSAIDContent content={article.content} />
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-primary-50">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="border border-gray-300 px-4 py-3 bg-primary-100 font-semibold text-left text-primary-800">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-gray-300 px-4 py-3 text-neutral-700">
                    {children}
                  </td>
                ),
                tr: ({ children }) => (
                  <tr className="even:bg-gray-50 hover:bg-primary-25">
                    {children}
                  </tr>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
            )}
          </div>
        </div>
      </main>

      {/* Medical Disclaimer */}
      <section className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-r-lg">
            <p className="font-bold mb-2">
              {locale === 'zh' ? '医疗免责声明' : 'Medical Disclaimer'}
            </p>
            <p className="text-sm">
              {locale === 'zh' 
                ? '此内容仅供参考，不能替代专业医疗建议。如有任何健康问题，或在做出与您的健康或治疗相关的任何决定之前，请务必咨询合格的医疗保健提供者。'
                : 'This content is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for any health concerns or before making any decisions related to your health or treatment.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-neutral-50 py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">
              {locale === 'zh' ? '相关文章' : 'Related Articles'}
            </h2>
            {relatedArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle) => {
                  const relatedTitle = locale === 'zh' ? relatedArticle.title_zh || relatedArticle.title : relatedArticle.title;
                  const relatedSummary = locale === 'zh' ? relatedArticle.summary_zh || relatedArticle.summary : relatedArticle.summary;
                  
                  return (
                    <Link
                      key={relatedArticle.slug}
                      href={`/${locale}/articles/${relatedArticle.slug}`}
                      className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-primary-600 mb-2">
                        {relatedTitle}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-3">
                        {relatedSummary}
                      </p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-primary-600 mb-2">
                  {locale === 'zh' ? '更多文章即将发布' : 'More Articles Coming Soon'}
                </h3>
                <p className="text-neutral-600">
                  {locale === 'zh'
                    ? '我们正在准备更多高质量的健康内容，敬请期待。'
                    : 'We are preparing more high-quality health content. Stay tuned.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
