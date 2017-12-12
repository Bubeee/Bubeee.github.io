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

    let newElement = document.createElement("div");
    newElement.classList.add("item");
    newElement.classList.add("news-item");
    newElement.onclick = (event) => event.stopPropagation();
  
    let title = document.createElement("a");
    title.innerHTML = dataItem.title;
    title.href = dataItem.url;
    title.classList.add("news-title");
  
    let paragraph = document.createElement("p");
    paragraph.innerHTML = dataItem.description;
    paragraph.classList.add("news-paragraph");
  
    let image = document.createElement("img");
    image.setAttribute('src', dataItem.urlToImage);
    image.onclick = () => {
      event.stopPropagation();
      location.href = dataItem.url;
    };
  
    image.classList.add("news-image");
  
    newElement.appendChild(title);
    newElement.appendChild(paragraph);
    newElement.appendChild(image);
    parentContainer.appendChild(newElement);
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