import { Component } from '@angular/core';
import { HelperService } from './helper.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'url-shortner';
  longUrl: any;
  shortUrl = null;
  loading = false;
  err = null;
  form: FormGroup;
  pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  constructor(private helper: HelperService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      url: [null, [Validators.required, Validators.pattern(this.pattern)]]
    });
  }

  onClick() {
    if (this.form.valid) {
      this.longUrl = this.form.value.url;
      this.loading = true;
      this.shortUrl = null;
      this.err = null;
      this.getShortUrl();
    }
  }

  async getShortUrl() {
    var res = await this.helper.getUrl({ longUrl: this.longUrl });
    if (res && res.success) {
      this.shortUrl = res.data.shortUrl;
      console.log(res.data);
    } else {
      this.err = res.msg || 'Bad Request!!';
    }
    this.loading = false;
  }


}
