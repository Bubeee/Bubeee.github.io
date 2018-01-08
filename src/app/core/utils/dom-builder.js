import { $ } from './';

export class DomBuilder {
  constructor() {
    if(!DomBuilder.instance){
      DomBuilder.instance = this;
    }    

    return DomBuilder.instance;
  }

  createChannelItemBlock(parentContainerSelector, dataItem, actionOnClick) {
    const innerHtml = `<div class='channel-item'>
      <p>
          ${dataItem.name}
      </p>
      <div id='channel-${dataItem.id}'></div>      
    </div>`;

    let parentContainer = $(parentContainerSelector);
    parentContainer.insertAdjacentHTML('beforeend', innerHtml);

    let childContainer = $(`#channel-${dataItem.id}`).parentElement;
    childContainer.onclick = event => actionOnClick(event, dataItem);
  }

  createNewsBlock(parentContainerSelector, dataItem) {
    let parentContainer = $(parentContainerSelector);

    const innerHtml = `<div class='news-item'>
            <a target='_blank' href='${dataItem.url}' class='news-title'>
                ${dataItem.title}
            </a>
            <p class='news-paragraph'>
                ${dataItem.description}
            </p>
            <a target='_blank' href='${dataItem.url}'>
                <img src='${dataItem.urlToImage}' class='news-image'>
            </a>
        </div>`;

    // let title = document.createElement("a");
    // title.innerHTML = dataItem.title;
    // title.href = dataItem.url;
    // title.classList.add("news-title");

    // let paragraph = document.createElement("p");
    // paragraph.innerHTML = dataItem.description;
    // paragraph.classList.add("news-paragraph");

    // let image = document.createElement("img");
    // image.setAttribute('src', dataItem.urlToImage);
    // image.onclick = () => {
    //   event.stopPropagation();
    //   location.href = dataItem.url;
    // };

    // image.classList.add("news-image");

    // newElement.appendChild(title);
    // newElement.appendChild(paragraph);
    // newElement.appendChild(image);
    // parentContainer.appendChild(newElement);
    
    parentContainer.insertAdjacentHTML('beforeend', innerHtml);
  }

  createErrorBlock(currentChannelBlockSelector) {
    const innerHtml = `<div class='news-error'>
      Sorry, there is no news for this channel or some error is occured. Try again later.
    </div>`;

    let currentChannelBlock = $(currentChannelBlockSelector);

    currentChannelBlock.insertAdjacentHTML('beforeend', innerHtml);
  }
}
