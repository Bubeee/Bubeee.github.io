import './channel.component.scss';

export class ChannelComponent {
  constructor(channelId, channelTitle, onClick) {
    this.channelId = channelId;
    this.channelTitle = channelTitle;
    this.onClick = onClick;
  }

  getHtml() {
    let template = `<div class='channel-item'>
      <p>
          ${this.channelTitle}
      </p>
      <div id='channel-${this.channelId}'></div>      
    </div>`;

    return template;
  }
}
