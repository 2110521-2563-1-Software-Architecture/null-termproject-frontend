import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShorturlService } from "src/services/shorturl.service";

const formHasError = (fg: FormGroup) => {
  for (let key in fg.controls) {
    const control = fg.controls[key];
    if (control.errors != null) return true;
  } 
  return false;
}

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  
  validateForm!: FormGroup;
  
  @Input()
  isEditMode: boolean = false;
  @Input()
  id?: string;

  @Output()
  backClick = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private shortUrlService: ShorturlService,
  ) {}
  
  async submitForm() {
    if (formHasError(this.validateForm)) return;

    const {oldurl: realUrl, newurl: shortUrl} = this.validateForm.value;

      if (this.isEditMode && this.id != null) {
        const result = await this.shortUrlService.updateUrl({
          realUrl, oldShortUrl: this.id, newShortUrl: shortUrl,
        })
        console.log("update result", result);
      } else {
        const result = await this.shortUrlService.createUrl({
          realUrl, shortUrl
        })
        console.log('create result', result);
      }
      await this.shortUrlService.getMyUrls();
  }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      // title: [null, [Validators.required]],
      // REGEX from: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
      oldurl: [null, [Validators.required, Validators.pattern(/^(https?:)(\/\/([^/?#]*))([^?#]*)(\?([^#]*))?(#(.*))?$/)]],
      newurl: [null],
      remember: [true]
    });
    

    // trigger fetch
    this.ngOnChanges();
  }
  
  onBackClick() {
    this.backClick.emit('');
  }

  ngOnChanges() {
    // prevent change trigger first before form is initialized
    if (!this.validateForm) return;


    
    if (this.isEditMode && this.id) {
      this.validateForm.controls['newurl'].disable();
      this.shortUrlService.getUrl(this.id).then(url => {
        this.validateForm.controls['oldurl'].setValue(url.realUrl);
        this.validateForm.controls['newurl'].setValue(url.shortUrl);
      })    
    } else {
      this.validateForm.controls['oldurl'].setValue("");
      this.validateForm.controls['newurl'].setValue("");
    }
  }
}
