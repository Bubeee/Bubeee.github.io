import { NewsComponent } from '../../shared-components/news/news.component';
import './index.scss';

export function init(containerSelector) {
  let buttonContainerBlock = document.querySelector(containerSelector);

  if (buttonContainerBlock.childElementCount !== 0) {
    while (buttonContainerBlock.firstChild) {
      buttonContainerBlock.removeChild(buttonContainerBlock.firstChild);
    }   
    return;
  }

  let newsComponent = new NewsComponent();
  newsComponent.create(containerSelector);
}
