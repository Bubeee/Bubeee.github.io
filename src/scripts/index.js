import "isomorphic-fetch";
import { NewsService } from './news-service';

let newsService = new NewsService();
newsService.getChannels('.container');
