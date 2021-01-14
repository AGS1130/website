const htmlTag = require("html-tag");

const path = require("path");
const popular = path.resolve(
  __dirname,
  "../templates/_data/popularArticles.yml"
);
const seoMetaTags = path.resolve(__dirname, "../templates/_data/metaTags.yml");
const tagsMap = path.resolve(__dirname, "../templates/_data/tagsMap.yml");
const postsDir = path.resolve(__dirname, "../templates/_posts");

const toHtml = (tags) =>
  tags
    .map(({ tagName, attributes, content }) =>
      htmlTag(tagName, attributes || {}, content)
    )
    .join("");

module.exports = (dato, root) => {
  /* Popular Articles */
  const popularArticles = dato.collectionsByType.popular.article.map(
    (article) => ({
      title: article.title,
      permalink: article.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[!@#$%^&*]/g, ""),
      backgroundImage: article.backgroundImage.toMap(),
    })
  );

  root.createDataFile(popular, "yaml", popularArticles);

  /* SEO Meta Tags */
  root.createDataFile(seoMetaTags, "yaml", {
    faviconMetaTags: toHtml(dato.site.faviconMetaTags),
  });

  /* Tags Map */
  const tags = dato.collectionsByType.tags.map((tag) => ({
    name: tag.tagName,
    image: tag.tagImage.toMap(),
  }));

  root.createDataFile(tagsMap, "yaml", tags);

  /* Posts Directory */
  root.directory(postsDir, (postsDir) => {
    dato.collectionsByType.articles.forEach((article) => {
      const date = new Date(article.date);
      const publicationDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;

      const title = article.title;
      const vanityUrl = title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[!@#$%^&*]/g, "");

      const backgroundImage = article.backgroundImage.toMap();
      const SEOMetaTags = toHtml(article.seoMetaTags);
      const postData = article.content.toMap();
      const tagsMap = article.tags.toMap();
      const tagNames = tagsMap.map(({ tagName }) => tagName);

      postsDir.createPost(`${publicationDate}-${vanityUrl}.md`, "yaml", {
        frontmatter: {
          title: article.title,
          description: article.description,
          backgroundImage: backgroundImage,
          layout: "post",
          date: date,
          tags: tagNames,
          postData: postData,
          permalink: vanityUrl,
          seoMetaTags: SEOMetaTags,
        },
      });
    });
  });
};
