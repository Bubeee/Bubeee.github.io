export class NewsComponent {
  constructor({ title, description, urlToSource, urlToImage }) {
    this.title = title;
    this.description = description;
    this.urlToSource = urlToSource;
    this.urlToImage = urlToImage;
  }

  getHtml() {
    const tempate = `<div class='news-item'>
      <a target='_blank' href='${this.url}' class='news-title'>
          ${this.title}
      </a>
      <p class='news-paragraph'>
          ${this.description}
      </p>
      <a target='_blank' href='${this.urlToSource}'>
          <img src='${this.urlToImage}' class='news-image'>
      </a>
    </div>`;

    return tempate;
  }
}
