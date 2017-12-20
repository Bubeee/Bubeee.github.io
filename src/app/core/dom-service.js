export class DomService {
  createChannelItemBlock(parentContainerSelector, dataItem, actionOnClick){
    let parentContainer = document.querySelector(parentContainerSelector);
    let childContainer = document.createElement('div');
    childContainer.classList.add('item');
    childContainer.classList.add('channel-item');
    childContainer.onclick = (event) => actionOnClick(event, dataItem);

    let channelTitle = document.createElement('p');
    channelTitle.innerText = dataItem.name;

    let newElement = document.createElement('div');
    newElement.id = `channel-${dataItem.id}`;

    childContainer.appendChild(channelTitle);
    childContainer.appendChild(newElement);

    parentContainer.appendChild(childContainer);
  }
    
  createNewsBlock(parentContainerSelector, dataItem) {
    let parentContainer = document.querySelector(parentContainerSelector);

    const innerHtml =
        `<div class='item news-item'>
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
    parentContainer.insertAdjacentHTML('beforeend',innerHtml);
  }

  createErrorBlock(currentChannelBlockSelector) {
    let currentChannelBlock = document.querySelector(currentChannelBlockSelector);
    let newElement = document.createElement("div");
    newElement.classList.add("item");
    newElement.classList.add("news-item-error");
    newElement.innerHTML = 'Sorry, there is no news for this channel or some error is occured. Try again later.'
    
    currentChannelBlock.appendChild(newElement);
  }
}