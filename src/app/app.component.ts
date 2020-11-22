import { Component } from '@angular/core';
import { HelperService } from './helper.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'url-shortner';
  longUrl: any;
  shortUrl = null;

  constructor(private helper: HelperService) { }

  onClick() {
    if (this.validURL(this.longUrl)) {
      this.getShortUrl();
    } else {
      alert('Invalid Url');
    }
  }

  async getShortUrl() {
    var res = await this.helper.getUrl({ longUrl: this.longUrl });
    if (res && res.success) {
      this.shortUrl = res.data.shortUrl;
    } else {
      res && res.msg && alert(res.msg);
    }
  }

  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

}
